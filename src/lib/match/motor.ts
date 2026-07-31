/**
 * useJourneyMatchEngine — a ponte entre a máquina de estados, os repositórios
 * e a interface. Os componentes não guardam regra de fluxo: eles pedem a
 * próxima rodada, aceitam, descartam ou desfazem.
 */
import { useMachine } from "@xstate/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  journeyMatchMachine,
  sequenciaDeMatch,
  type EstadoDeContexto,
} from "./maquina";
import {
  aplicarEscolha,
  desfazerUltimaEscolha,
  repositorios,
} from "./repositorios";
import type { CategoriaDeMatch, ItemDeMatch, Journey } from "./tipos";

export type StatusDoMotor = "loading" | "empty" | "error" | "pronto";

export function useJourneyMatchEngine(opcoes: {
  situacaoId?: string | null;
  jornadaId?: string | null;
}) {
  const [estado, enviar] = useMachine(journeyMatchMachine, {
    input: { situacaoId: opcoes.situacaoId ?? null },
  });
  const [jornada, setJornada] = useState<Journey | null>(null);
  const [itens, setItens] = useState<Record<string, ItemDeMatch[]>>({});
  const [status, setStatus] = useState<StatusDoMotor>("loading");
  const [aviso, setAviso] = useState<string | null>(null);
  const descartadas = useRef<Set<string>>(new Set());

  const rodada = estado.context.rodada;
  const categoria: CategoriaDeMatch | undefined = sequenciaDeMatch[rodada];

  /** Carrega (ou cria) a jornada e o catálogo de itens. */
  useEffect(() => {
    let vivo = true;
    (async () => {
      try {
        setStatus("loading");
        let atual: Journey | null = null;
        if (opcoes.jornadaId) {
          atual = await repositorios.jornadas.porId(opcoes.jornadaId);
        } else if (opcoes.situacaoId) {
          const situacao = await repositorios.situacoes.porId(opcoes.situacaoId);
          if (situacao) {
            // Recarregar a página não recomeça o percurso: um rascunho da
            // mesma situação é retomado onde estava.
            const existentes = await repositorios.jornadas.listar();
            atual =
              existentes.find(
                (j) => j.situacaoId === situacao.id && j.estado === "rascunho",
              ) ?? (await repositorios.jornadas.criar(situacao));
          }
        }
        const carregados: Record<string, ItemDeMatch[]> = {};
        for (const cat of sequenciaDeMatch) {
          carregados[cat] = await repositorios.situacoes.itens(cat);
        }
        if (!vivo) return;
        setItens(carregados);
        setJornada(atual);
        setStatus(atual ? "pronto" : "empty");
        if (atual) {
          enviar({ type: "SITUACAO_ESCOLHIDA", jornada: atual });
          // Retomar na pergunta onde a pessoa parou.
          for (const cat of sequenciaDeMatch) {
            if (atual.escolhas.some((e) => e.categoria === cat)) enviar({ type: "AVANCAR" });
            else break;
          }
        }
      } catch {
        if (vivo) {
          setStatus("error");
          enviar({ type: "ERRO", mensagem: "Não foi possível abrir este percurso." });
        }
      }
    })();
    return () => {
      vivo = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opcoes.jornadaId, opcoes.situacaoId]);

  /** Contexto de ambiente (offline, movimento reduzido, baixa estimulação). */
  const marcarContexto = useCallback(
    (contexto: EstadoDeContexto, ativo: boolean) => enviar({ type: "CONTEXTO", contexto, ativo }),
    [enviar],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const online = () => marcarContexto("offline", false);
    const offline = () => marcarContexto("offline", true);
    marcarContexto("offline", !window.navigator.onLine);
    window.addEventListener("online", online);
    window.addEventListener("offline", offline);
    return () => {
      window.removeEventListener("online", online);
      window.removeEventListener("offline", offline);
    };
  }, [marcarContexto]);

  const persistir = useCallback(async (proxima: Journey) => {
    const salva = await repositorios.jornadas.salvar(proxima);
    setJornada(salva);
    enviar({ type: "ATUALIZAR", jornada: salva });
    return salva;
  }, [enviar]);

  const opcoesDaRodada = useMemo(() => {
    if (!categoria) return [];
    const usados = new Set((jornada?.escolhas ?? []).map((e) => e.itemId));
    return (itens[categoria] ?? []).filter(
      (i) => !usados.has(i.id) && !descartadas.current.has(i.id),
    );
  }, [categoria, itens, jornada]);

  const aceitar = useCallback(
    async (item: ItemDeMatch) => {
      if (!jornada) return;
      setAviso(`${item.titulo} entrou no seu percurso.`);
      await persistir(aplicarEscolha(jornada, item, true));
    },
    [jornada, persistir],
  );

  const descartar = useCallback(
    async (item: ItemDeMatch) => {
      if (!jornada) return;
      descartadas.current.add(item.id);
      setAviso(`${item.titulo} não entrou. Você pode trazer de volta.`);
      await persistir(aplicarEscolha(jornada, item, false));
    },
    [jornada, persistir],
  );

  const desfazer = useCallback(async () => {
    if (!jornada) return;
    const { jornada: proxima, desfeita } = desfazerUltimaEscolha(jornada);
    if (!desfeita) return;
    descartadas.current.delete(desfeita.itemId);
    setAviso(`Escolha desfeita: ${desfeita.titulo}.`);
    await persistir(proxima);
  }, [jornada, persistir]);

  const avancar = useCallback(() => enviar({ type: "AVANCAR" }), [enviar]);
  const voltar = useCallback(() => enviar({ type: "VOLTAR" }), [enviar]);

  const fluxo = String(estado.value.fluxo ?? "idle");

  return {
    estado,
    fluxo,
    contextos: estado.context.contextos,
    jornada,
    status,
    aviso,
    categoria,
    rodada,
    totalDeRodadas: sequenciaDeMatch.length,
    opcoesDaRodada,
    aceitar,
    descartar,
    desfazer,
    avancar,
    voltar,
    marcarContexto,
    persistir,
    enviar,
  };
}

export type MotorDoMatch = ReturnType<typeof useJourneyMatchEngine>;
