/**
 * AssistantStateMachine — o comportamento do Assistente Digital Vivo.
 *
 * Este módulo é puro: não conhece React, não conhece rede e não guarda
 * conteúdo de conversas. Ele apenas decide qual é o próximo estado do
 * assistente a partir de um evento, respeitando um tempo mínimo de
 * permanência para evitar piscadas (documentos 04, 13, 14 e 19).
 */

export type EstadoDoAssistente =
  | "idle"
  | "listening"
  | "transcribing"
  | "processing"
  | "organizing"
  | "suggesting"
  | "waiting"
  | "guiding"
  | "confirming"
  | "completed"
  | "error"
  | "offline"
  | "silent"
  | "minimized"
  | "lowStimulation"
  | "disabled";

export type EventoDoAssistente =
  | "APP_READY"
  | "VOICE_STARTED"
  | "VOICE_STOPPED"
  | "TRANSCRIPTION_STARTED"
  | "TRANSCRIPTION_READY"
  | "INTENT_PROCESSING"
  | "INTENT_UNCLEAR"
  | "JOURNEY_BUILDING"
  | "JOURNEY_READY"
  | "USER_CONFIRMATION_REQUIRED"
  | "USER_CONFIRMED"
  | "JOURNEY_STARTED"
  | "JOURNEY_PAUSED"
  | "JOURNEY_COMPLETED"
  | "NETWORK_LOST"
  | "NETWORK_RESTORED"
  | "GENERIC_ERROR"
  | "LOW_STIMULATION_ENABLED"
  | "LOW_STIMULATION_DISABLED"
  | "AGENT_MINIMIZED"
  | "AGENT_RESTORED"
  | "AGENT_DISABLED"
  | "AGENT_ENABLED"
  | "AGENT_SILENCED"
  | "USER_DISMISSED_ERROR";

/** Descrição acessível de cada estado. Sempre existe alternativa textual. */
export const descricaoDoEstado: Record<EstadoDoAssistente, { rotulo: string; leitor: string }> = {
  idle: { rotulo: "Estou por aqui", leitor: "Assistente disponível" },
  listening: { rotulo: "Estou ouvindo", leitor: "Assistente ouvindo" },
  transcribing: {
    rotulo: "Transformando sua fala em texto",
    leitor: "Transformando sua fala em texto",
  },
  processing: { rotulo: "Compreendendo sua solicitação", leitor: "Compreendendo sua solicitação" },
  organizing: { rotulo: "Organizando o percurso", leitor: "Organizando o percurso" },
  suggesting: {
    rotulo: "Encontrei algumas possibilidades",
    leitor: "Assistente apresentou possibilidades",
  },
  waiting: { rotulo: "A escolha é sua", leitor: "Assistente aguardando sua decisão" },
  guiding: { rotulo: "Acompanhando com você", leitor: "Assistente acompanhando o percurso" },
  confirming: { rotulo: "Confirmando com você", leitor: "Assistente pedindo confirmação" },
  completed: { rotulo: "Percurso encerrado", leitor: "Percurso preparado e encerrado" },
  error: { rotulo: "Não consegui agora", leitor: "Não foi possível concluir esta ação" },
  offline: { rotulo: "Sem conexão", leitor: "Sem conexão" },
  silent: { rotulo: "Modo silencioso", leitor: "Assistente em modo silencioso" },
  minimized: { rotulo: "Assistente reduzido", leitor: "Assistente reduzido" },
  lowStimulation: { rotulo: "Modo de baixa estimulação", leitor: "Assistente sem movimento" },
  disabled: { rotulo: "Assistente desligado", leitor: "Assistente desligado" },
};

/** Tempo mínimo (ms) que cada estado permanece antes de ser substituído. */
export const permanenciaMinima: Partial<Record<EstadoDoAssistente, number>> = {
  transcribing: 600,
  processing: 700,
  organizing: 900,
  suggesting: 500,
  confirming: 400,
  completed: 800,
};

/** Estados de presença: sobrepõem-se a qualquer outro estado. */
const presenciais: EstadoDoAssistente[] = ["disabled", "minimized", "silent", "lowStimulation"];

const transicoes: Record<EventoDoAssistente, EstadoDoAssistente | null> = {
  APP_READY: "idle",
  VOICE_STARTED: "listening",
  VOICE_STOPPED: "transcribing",
  TRANSCRIPTION_STARTED: "transcribing",
  TRANSCRIPTION_READY: "confirming",
  INTENT_PROCESSING: "processing",
  INTENT_UNCLEAR: "waiting",
  JOURNEY_BUILDING: "organizing",
  JOURNEY_READY: "suggesting",
  USER_CONFIRMATION_REQUIRED: "waiting",
  USER_CONFIRMED: "organizing",
  JOURNEY_STARTED: "guiding",
  JOURNEY_PAUSED: "waiting",
  JOURNEY_COMPLETED: "completed",
  NETWORK_LOST: "offline",
  NETWORK_RESTORED: null,
  GENERIC_ERROR: "error",
  LOW_STIMULATION_ENABLED: "lowStimulation",
  LOW_STIMULATION_DISABLED: null,
  AGENT_MINIMIZED: "minimized",
  AGENT_RESTORED: null,
  AGENT_DISABLED: "disabled",
  AGENT_ENABLED: "idle",
  AGENT_SILENCED: "silent",
  USER_DISMISSED_ERROR: "idle",
};

export type ContextoDaMaquina = {
  estado: EstadoDoAssistente;
  /** Estado ao qual retornar quando a presença/rede voltar ao normal. */
  anterior: EstadoDoAssistente;
  /** Marca de tempo em que o estado atual começou (ms). */
  desde: number;
};

export function estadoInicial(agora = 0): ContextoDaMaquina {
  return { estado: "idle", anterior: "idle", desde: agora };
}

/**
 * Aplica um evento. Retorna o mesmo contexto (mesma referência) quando nada
 * muda, para que a interface não precise renderizar novamente.
 */
export function aplicarEvento(
  contexto: ContextoDaMaquina,
  evento: EventoDoAssistente,
  agora = 0,
): ContextoDaMaquina {
  const atual = contexto.estado;

  // Desligado só sai com AGENT_ENABLED.
  if (atual === "disabled" && evento !== "AGENT_ENABLED") return contexto;

  if (evento === "NETWORK_RESTORED") {
    if (atual !== "offline") return contexto;
    return { estado: contexto.anterior, anterior: contexto.anterior, desde: agora };
  }

  if (evento === "AGENT_RESTORED" || evento === "LOW_STIMULATION_DISABLED") {
    if (!presenciais.includes(atual)) return contexto;
    return { estado: contexto.anterior, anterior: contexto.anterior, desde: agora };
  }

  const destino = transicoes[evento];
  if (!destino || destino === atual) return contexto;

  // Eventos de presença, rede e erro têm prioridade: ignoram permanência.
  const prioritario = presenciais.includes(destino) || destino === "offline" || destino === "error";

  if (!prioritario) {
    const minimo = permanenciaMinima[atual] ?? 0;
    if (minimo > 0 && agora - contexto.desde < minimo) return contexto;
  }

  const anterior = presenciais.includes(destino) || destino === "offline" ? atual : destino;
  return {
    estado: destino,
    anterior: presenciais.includes(anterior) ? "idle" : anterior,
    desde: agora,
  };
}

/** Indica se o estado representa movimento contínuo (loop). */
export function estadoEmLoop(estado: EstadoDoAssistente) {
  return !["completed", "confirming", "error", "offline", "lowStimulation", "disabled"].includes(
    estado,
  );
}
