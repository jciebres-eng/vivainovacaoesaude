/**
 * JourneyMatchComposer — a montagem progressiva do percurso.
 *
 * Uma pergunta por tela, um deck por rodada, e a timeline "Meu percurso"
 * crescendo a cada escolha aceita. O fluxo é conduzido pela máquina de
 * estados; este componente só apresenta (documentos 07, 12, 17 e 24).
 */
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

import { deckPorCategoria } from "@/components/viva/match/decks";
import { TimelineDoPercurso } from "@/components/viva/match/timeline";
import { useJourneyMatchEngine } from "@/lib/match/motor";
import { rotulosDeMatch } from "@/lib/match/tipos";
import { useModo } from "@/lib/viva-modos";

export function JourneyMatchComposer({
  situacaoId,
  jornadaId,
}: {
  situacaoId?: string;
  jornadaId?: string;
}) {
  const motor = useJourneyMatchEngine({ situacaoId, jornadaId });
  const { movimentoReduzido } = useModo();
  const navigate = useNavigate();

  if (motor.status === "loading") {
    return (
      <p aria-live="polite" className="viva-legenda text-[var(--profile-muted)]">
        Abrindo seu percurso…
      </p>
    );
  }

  if (motor.status === "empty") {
    return (
      <p aria-live="polite" className="viva-legenda text-[var(--profile-muted)]">
        Não encontramos essa situação. Você pode escolher outra no catálogo.
      </p>
    );
  }

  if (motor.status === "error") {
    return (
      <p aria-live="polite" className="viva-legenda text-[var(--profile-text)]">
        Algo não abriu como esperado. Você pode tentar de novo, nada foi perdido.
      </p>
    );
  }

  const categoria = motor.categoria;
  const jornada = motor.jornada;
  const Deck = categoria ? deckPorCategoria[categoria] : null;
  const podeDesfazer = (jornada?.escolhas ?? []).some((e) => e.categoria !== "situation");
  const concluido = !categoria;

  return (
    <div className="space-y-5">
      <header className="space-y-1">
        <p className="viva-legenda text-[var(--profile-muted)]">
          {concluido
            ? "Percurso montado"
            : `Escolha ${motor.rodada + 1} de ${motor.totalDeRodadas} · ${rotulosDeMatch[categoria].titulo}`}
        </p>
        <h1 className="viva-titulo text-[var(--profile-text)]">{jornada?.titulo}</h1>
      </header>

      <TimelineDoPercurso jornada={jornada} modo="compacto" />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={categoria ?? "fim"}
          initial={movimentoReduzido ? undefined : { opacity: 0, y: 12 }}
          animate={movimentoReduzido ? undefined : { opacity: 1, y: 0 }}
          exit={movimentoReduzido ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {concluido || !Deck ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[var(--profile-primary)]">
                <CheckCircle2 className="h-5 w-5" aria-hidden />
                <p className="viva-subtitulo">Percurso montado do seu jeito</p>
              </div>
              <p className="viva-legenda text-[var(--profile-muted)]">
                Você pode revisar, reorganizar ou mudar qualquer parte agora ou depois.
              </p>
              <button
                type="button"
                onClick={() =>
                  jornada &&
                  navigate({ to: "/jornada/$journeyId/revisar", params: { journeyId: jornada.id } })
                }
                className="viva-tap inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--profile-primary)] px-5 viva-texto-botao text-[var(--profile-surface)]"
              >
                Revisar meu percurso
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </div>
          ) : (
            <Deck
              itens={motor.opcoesDaRodada}
              onAceitar={(item) => void motor.aceitar(item)}
              onDescartar={(item) => void motor.descartar(item)}
              onDesfazer={() => void motor.desfazer()}
              podeDesfazer={podeDesfazer}
              onFim={motor.avancar}
              vazio={
                <div className="space-y-3">
                  <p className="viva-legenda text-[var(--profile-muted)]">
                    Sem mais opções aqui. Podemos seguir.
                  </p>
                  <button
                    type="button"
                    onClick={motor.avancar}
                    className="viva-tap inline-flex min-h-11 items-center rounded-full bg-[var(--profile-primary)] px-5 viva-texto-botao text-[var(--profile-surface)]"
                  >
                    Continuar
                  </button>
                </div>
              }
            />
          )}
        </motion.div>
      </AnimatePresence>

      {!concluido ? (
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={motor.voltar}
            disabled={motor.rodada === 0}
            className="viva-tap inline-flex min-h-11 items-center gap-2 viva-legenda text-[var(--profile-primary)] underline disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Escolha anterior
          </button>
          <button
            type="button"
            onClick={motor.avancar}
            className="viva-tap min-h-11 viva-legenda text-[var(--profile-primary)] underline"
          >
            Pular esta escolha
          </button>
        </div>
      ) : null}

      <p aria-live="polite" className="sr-only">
        {motor.aviso}
      </p>
      {motor.contextos.includes("offline") ? (
        <p className="viva-legenda text-[var(--profile-muted)]">
          Você está sem conexão. Isso não interrompe nada: tudo fica neste aparelho.
        </p>
      ) : null}
    </div>
  );
}
