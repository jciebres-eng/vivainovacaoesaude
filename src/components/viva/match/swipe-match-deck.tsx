/**
 * SwipeMatchDeck — a pilha de escolhas visuais do match.
 *
 * O gesto existe porque é a forma mais rápida de dizer "isso serve" ou "não
 * serve" com uma mão só. Não há coração, curtida, pontuação nem ranking:
 * direita adiciona ao percurso, esquerda deixa para depois, cima abre
 * detalhes (documentos 04, 17 e 23).
 *
 * Toda ação de gesto tem equivalente por botão e por teclado, e todo
 * resultado é anunciado por leitor de tela.
 */
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { Check, ChevronUp, Undo2, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

import { MatchCard, descricaoAcessivel } from "@/components/viva/match/match-card";
import { cn } from "@/lib/utils";
import type { ItemDeMatch } from "@/lib/match/tipos";
import { rotulosDeMatch } from "@/lib/match/tipos";
import { useModo } from "@/lib/viva-modos";

const LIMITE = 96;

export type SwipeMatchDeckProps = {
  itens: ItemDeMatch[];
  onAceitar: (item: ItemDeMatch) => void;
  onDescartar: (item: ItemDeMatch) => void;
  onDesfazer?: () => void;
  podeDesfazer?: boolean;
  onFim?: () => void;
  /** Conteúdo mostrado quando não há mais opções nesta rodada. */
  vazio?: ReactNode;
  /** Rótulos vindos da categoria; podem ser sobrescritos. */
  rotuloAceitar?: string;
  rotuloDescartar?: string;
  /** Renderização alternativa do card (mídia própria, por exemplo). */
  renderCard?: (item: ItemDeMatch) => ReactNode;
};

export function SwipeMatchDeck({
  itens,
  onAceitar,
  onDescartar,
  onDesfazer,
  podeDesfazer = false,
  onFim,
  vazio,
  rotuloAceitar,
  rotuloDescartar,
  renderCard,
}: SwipeMatchDeckProps) {
  const { modo, movimentoReduzido } = useModo();
  const [indice, setIndice] = useState(0);
  const [detalhesAbertos, setDetalhesAbertos] = useState(false);
  const [aviso, setAviso] = useState("");
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const arrastando = useRef(false);

  const intensidade = movimentoReduzido ? 0 : modo.intensidadeDoMovimento;
  const semMovimento = intensidade === 0;

  const rotate = useTransform(x, [-240, 0, 240], semMovimento ? [0, 0, 0] : [-9, 0, 9]);
  const scale = useTransform(x, [-240, 0, 240], semMovimento ? [1, 1, 1] : [0.97, 1, 0.97]);
  const dicaAdicionar = useTransform(x, [24, 120], [0, 1]);
  const dicaAgoraNao = useTransform(x, [-120, -24], [1, 0]);

  const atual = itens[indice];
  const proximos = itens.slice(indice + 1, indice + Math.max(1, modo.cardsSimultaneos));

  useEffect(() => {
    setIndice(0);
  }, [itens.length === 0]);

  useEffect(() => {
    setDetalhesAbertos(false);
    x.set(0);
    y.set(0);
  }, [indice, x, y]);

  const decidir = useCallback(
    (acao: "aceito" | "descartado") => {
      if (!atual) return;
      const rotulos = rotulosDeMatch[atual.categoria];
      setAviso(
        acao === "aceito"
          ? `${atual.titulo} entrou no seu percurso.`
          : `${atual.titulo} ficou de fora. Você pode desfazer.`,
      );
      void rotulos;
      const concluir = () => {
        if (acao === "aceito") onAceitar(atual);
        else onDescartar(atual);
        setIndice((i) => {
          const proximo = i + 1;
          if (proximo >= itens.length) onFim?.();
          return proximo;
        });
      };
      if (semMovimento) {
        concluir();
        return;
      }
      animate(x, acao === "aceito" ? 420 : -420, { duration: 0.22, ease: "easeOut" }).then(concluir);
    },
    [atual, itens.length, onAceitar, onDescartar, onFim, semMovimento, x],
  );

  if (!atual) {
    return (
      <div aria-live="polite" className="py-6 text-center">
        {vazio ?? (
          <p className="viva-legenda text-[var(--profile-muted)]">
            Você viu todas as opções desta escolha.
          </p>
        )}
      </div>
    );
  }

  const rotulos = rotulosDeMatch[atual.categoria];

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="relative">
        {proximos.map((item, i) => (
          <div
            key={item.id}
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 origin-top"
            style={{
              transform: `translateY(${(i + 1) * 10}px) scale(${1 - (i + 1) * 0.03})`,
              opacity: 0.45 - i * 0.15,
            }}
          >
            <MatchCard item={item} />
          </div>
        ))}

        <motion.div
          role="group"
          aria-roledescription="Card de escolha"
          aria-label={`Opção ${indice + 1} de ${itens.length}. ${descricaoAcessivel(atual)}`}
          tabIndex={0}
          drag={semMovimento ? false : true}
          dragSnapToOrigin
          dragElastic={0.35}
          dragMomentum={false}
          style={{ x, y, rotate, scale, borderRadius: "var(--profile-radius)" }}
          onDragStart={() => {
            arrastando.current = true;
          }}
          onDragEnd={(_, info) => {
            arrastando.current = false;
            const dx = info.offset.x;
            const dy = info.offset.y;
            if (dy < -LIMITE && Math.abs(dy) > Math.abs(dx)) {
              setDetalhesAbertos(true);
              setAviso(`Detalhes de ${atual.titulo} abertos.`);
              return;
            }
            if (dx > LIMITE) decidir("aceito");
            else if (dx < -LIMITE) decidir("descartado");
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault();
              decidir("aceito");
            }
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              decidir("descartado");
            }
            if (e.key === "ArrowUp") {
              e.preventDefault();
              setDetalhesAbertos((a) => !a);
            }
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setDetalhesAbertos((a) => !a);
            }
          }}
          onClick={() => {
            if (!arrastando.current) setDetalhesAbertos((a) => !a);
          }}
          className={cn(
            "relative z-10 cursor-pointer touch-pan-y outline-none",
            "focus-visible:ring-2 focus-visible:ring-[var(--profile-primary)] focus-visible:ring-offset-2",
          )}
        >
          {renderCard ? renderCard(atual) : <MatchCard item={atual} />}

          {!semMovimento ? (
            <>
              <motion.span
                aria-hidden
                style={{ opacity: dicaAdicionar }}
                className="pointer-events-none absolute right-4 top-4 rounded-full bg-[var(--profile-primary)] px-3 py-1 viva-legenda font-semibold text-[var(--profile-surface)]"
              >
                Adicionar
              </motion.span>
              <motion.span
                aria-hidden
                style={{ opacity: dicaAgoraNao }}
                className="pointer-events-none absolute left-4 top-4 rounded-full border border-[var(--profile-border)] bg-[var(--profile-surface)] px-3 py-1 viva-legenda font-semibold text-[var(--profile-muted)]"
              >
                Agora não
              </motion.span>
            </>
          ) : null}
        </motion.div>
      </div>

      {atual.detalhes ? (
        <div className="mt-3">
          <button
            type="button"
            onClick={() => setDetalhesAbertos((a) => !a)}
            aria-expanded={detalhesAbertos}
            className="viva-tap inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--profile-border)] px-4 viva-legenda text-[var(--profile-text)]"
          >
            <ChevronUp
              className={cn("h-4 w-4 transition-transform", detalhesAbertos && "rotate-180")}
              aria-hidden
            />
            {detalhesAbertos ? "Ocultar detalhes" : "Ver detalhes"}
          </button>
          {detalhesAbertos ? (
            <div
              className="mt-2 border border-[var(--profile-border)] p-3 viva-legenda text-[var(--profile-text)]"
              style={{ borderRadius: "var(--profile-radius)" }}
            >
              {atual.detalhes}
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => decidir("descartado")}
          aria-label={rotuloDescartar ?? rotulos.descartar}
          className="viva-tap grid h-14 w-14 place-items-center rounded-full border border-[var(--profile-border)] bg-[var(--profile-surface)] text-[var(--profile-muted)]"
        >
          <X className="h-6 w-6" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => {
            onDesfazer?.();
            setIndice((i) => Math.max(0, i - 1));
          }}
          disabled={!podeDesfazer}
          aria-label="Desfazer a última escolha"
          className="viva-tap grid h-12 w-12 place-items-center rounded-full border border-[var(--profile-border)] text-[var(--profile-muted)] disabled:opacity-40"
        >
          <Undo2 className="h-5 w-5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => decidir("aceito")}
          aria-label={rotuloAceitar ?? rotulos.aceitar}
          className="viva-tap grid h-14 w-14 place-items-center rounded-full bg-[var(--profile-primary)] text-[var(--profile-surface)]"
        >
          <Check className="h-6 w-6" aria-hidden />
        </button>
      </div>

      <p className="mt-2 text-center viva-legenda text-[var(--profile-muted)]">
        Deslize para o lado, para cima (detalhes), toque no card, use os botões ou as setas do
        teclado. Nada é definitivo.
      </p>

      <p aria-live="polite" className="sr-only">
        {aviso}
      </p>
    </div>
  );
}
