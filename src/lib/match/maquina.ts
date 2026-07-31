/**
 * JourneyMatchEngine — a máquina de estados do fluxo principal.
 *
 * O fluxo do match não é controlado por dezenas de booleanos: existe um
 * estado único, explícito e observável. Estados de contexto (carregando,
 * vazio, erro, offline, movimento reduzido, baixa estimulação) ficam em
 * paralelo, porque acontecem em qualquer ponto do fluxo.
 */
import { assign, setup } from "xstate";

import type { CategoriaDeMatch, Journey } from "./tipos";

/** Sequência canônica das rodadas de match. */
export const sequenciaDeMatch: CategoriaDeMatch[] = [
  "need",
  "barrier",
  "strategy",
  "information",
  "training",
  "monitoring",
  "feedback",
];

export type EstadoDeContexto =
  | "loading"
  | "empty"
  | "error"
  | "offline"
  | "reducedMotion"
  | "lowStimulation";

export type ContextoDoMotor = {
  jornada: Journey | null;
  situacaoId: string | null;
  rodada: number;
  ultimaMensagem: string | null;
  contextos: EstadoDeContexto[];
};

export type EventoDoMotor =
  | { type: "BUSCAR" }
  | { type: "SITUACAO_ESCOLHIDA"; jornada: Journey }
  | { type: "AVANCAR" }
  | { type: "VOLTAR" }
  | { type: "ATUALIZAR"; jornada: Journey }
  | { type: "REVISAR" }
  | { type: "SIMULAR" }
  | { type: "PRONTO" }
  | { type: "EXECUTAR" }
  | { type: "PAUSAR" }
  | { type: "RETOMAR" }
  | { type: "CONCLUIR" }
  | { type: "FEEDBACK" }
  | { type: "PERSONALIZAR" }
  | { type: "SALVAR" }
  | { type: "ERRO"; mensagem: string }
  | { type: "RECUPERAR" }
  | { type: "CONTEXTO"; contexto: EstadoDeContexto; ativo: boolean };

export const journeyMatchMachine = setup({
  types: {
    context: {} as ContextoDoMotor,
    events: {} as EventoDoMotor,
    input: {} as { situacaoId?: string | null; jornada?: Journey | null },
  },
  guards: {
    temMaisRodadas: ({ context }) => context.rodada < sequenciaDeMatch.length - 1,
  },
  actions: {
    proximaRodada: assign({ rodada: ({ context }) => context.rodada + 1 }),
    rodadaAnterior: assign({ rodada: ({ context }) => Math.max(0, context.rodada - 1) }),
    guardarJornada: assign({
      jornada: ({ event, context }) =>
        event.type === "SITUACAO_ESCOLHIDA" || event.type === "ATUALIZAR"
          ? event.jornada
          : context.jornada,
    }),
  },
}).createMachine({
  id: "journeyMatch",
  context: ({ input }) => ({
    jornada: input?.jornada ?? null,
    situacaoId: input?.situacaoId ?? null,
    rodada: 0,
    ultimaMensagem: null,
    contextos: [],
  }),
  type: "parallel",
  states: {
    /** Estados de contexto que convivem com o fluxo. */
    ambiente: {
      on: {
        CONTEXTO: {
          actions: assign({
            contextos: ({ context, event }) =>
              event.ativo
                ? Array.from(new Set([...context.contextos, event.contexto]))
                : context.contextos.filter((c) => c !== event.contexto),
          }),
        },
      },
    },
    fluxo: {
      initial: "idle",
      on: {
        ATUALIZAR: { actions: "guardarJornada" },
        ERRO: {
          target: ".error",
          actions: assign({
            ultimaMensagem: ({ event }) => (event.type === "ERRO" ? event.mensagem : null),
          }),
        },
      },
      states: {
        idle: { on: { BUSCAR: "searching", SITUACAO_ESCOLHIDA: { target: "matchingNeeds", actions: "guardarJornada" } } },
        searching: { on: { AVANCAR: "selectingSituation", VOLTAR: "idle" } },
        selectingSituation: {
          on: {
            SITUACAO_ESCOLHIDA: { target: "matchingNeeds", actions: "guardarJornada" },
            VOLTAR: "searching",
          },
        },
        /**
         * Cada rodada avança o índice do match junto com o estado nomeado.
         * Sem a ação `proximaRodada` o fluxo trocava de estado mas continuava
         * pedindo a primeira pergunta.
         */
        matchingNeeds: {
          on: {
            AVANCAR: { target: "matchingBarriers", actions: "proximaRodada" },
            VOLTAR: "selectingSituation",
          },
        },
        matchingBarriers: {
          on: {
            AVANCAR: { target: "matchingStrategies", actions: "proximaRodada" },
            VOLTAR: { target: "matchingNeeds", actions: "rodadaAnterior" },
          },
        },
        matchingStrategies: {
          on: {
            AVANCAR: { target: "matchingInformation", actions: "proximaRodada" },
            VOLTAR: { target: "matchingBarriers", actions: "rodadaAnterior" },
          },
        },
        matchingInformation: {
          on: {
            AVANCAR: { target: "matchingTraining", actions: "proximaRodada" },
            VOLTAR: { target: "matchingStrategies", actions: "rodadaAnterior" },
          },
        },
        matchingTraining: {
          on: {
            AVANCAR: { target: "matchingMonitoring", actions: "proximaRodada" },
            VOLTAR: { target: "matchingInformation", actions: "rodadaAnterior" },
          },
        },
        matchingMonitoring: {
          on: {
            AVANCAR: { target: "matchingFeedback", actions: "proximaRodada" },
            VOLTAR: { target: "matchingTraining", actions: "rodadaAnterior" },
          },
        },
        matchingFeedback: {
          on: {
            AVANCAR: { target: "reviewingJourney", actions: "proximaRodada" },
            VOLTAR: { target: "matchingMonitoring", actions: "rodadaAnterior" },
          },
        },
        reviewingJourney: {
          on: {
            SIMULAR: "simulating",
            PRONTO: "readyToExecute",
            PERSONALIZAR: "personalizing",
            VOLTAR: { target: "matchingFeedback", actions: "rodadaAnterior" },
          },
        },

        simulating: { on: { PRONTO: "readyToExecute", REVISAR: "reviewingJourney" } },
        readyToExecute: { on: { EXECUTAR: "executing", REVISAR: "reviewingJourney" } },
        executing: { on: { PAUSAR: "paused", CONCLUIR: "completing" } },
        paused: { on: { RETOMAR: "executing", CONCLUIR: "completing" } },
        completing: { on: { FEEDBACK: "collectingFeedback", SALVAR: "saved" } },
        collectingFeedback: { on: { PERSONALIZAR: "personalizing", SALVAR: "saved" } },
        personalizing: { on: { SALVAR: "saved", REVISAR: "reviewingJourney" } },
        saved: { on: { REVISAR: "reviewingJourney", BUSCAR: "searching" } },
        error: { on: { RECUPERAR: "reviewingJourney", BUSCAR: "searching" } },
      },
    },
  },
});

/** Mapeia a rodada do match para o estado do fluxo. */
export const estadoPorCategoria: Record<string, string> = {
  need: "matchingNeeds",
  barrier: "matchingBarriers",
  strategy: "matchingStrategies",
  information: "matchingInformation",
  training: "matchingTraining",
  monitoring: "matchingMonitoring",
  feedback: "matchingFeedback",
};
