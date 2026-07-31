import { Bookmark, Check, Undo2, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { AcoesDoCartao, CardDeEscolha, type CartaoBase } from "./cartoes";

/**
 * StackDeCards — a pessoa monta o percurso um cartão por vez.
 *
 * Fluidez inspirada em pilhas de cartões, mas sem competição, sem contagem
 * e sem irreversibilidade: tudo pode ser desfeito e retomado depois.
 * Gestos são atalhos; os botões abaixo fazem exatamente o mesmo.
 */

export type DecisaoDoCartao = "incluir" | "descartar" | "salvar";

const LIMIAR = 84;

export function StackDeCards({
  cartoes,
  selecionados,
  rotuloIncluir = "Incluir",
  onDecisao,
  onDetalhes,
  onFim,
}: {
  cartoes: CartaoBase[];
  selecionados: string[];
  rotuloIncluir?: string;
  onDecisao: (cartao: CartaoBase, decisao: DecisaoDoCartao) => void;
  onDetalhes: (cartao: CartaoBase) => void;
  onFim?: () => void;
}) {
  const [indice, setIndice] = useState(0);
  const [arraste, setArraste] = useState<{ x: number; y: number } | null>(null);
  const [saida, setSaida] = useState<DecisaoDoCartao | null>(null);
  const inicio = useRef<{ x: number; y: number } | null>(null);

  const cartao = cartoes[indice];
  const proximo = cartoes[indice + 1];

  const decidir = useCallback(
    (decisao: DecisaoDoCartao) => {
      if (!cartao) return;
      setSaida(decisao);
      setArraste(null);
      window.setTimeout(() => {
        onDecisao(cartao, decisao);
        setSaida(null);
        setIndice((i) => {
          const novo = i + 1;
          if (novo >= cartoes.length) onFim?.();
          return novo;
        });
      }, 180);
    },
    [cartao, cartoes.length, onDecisao, onFim],
  );

  if (!cartao) {
    return (
      <div className="rounded-3xl border border-dashed border-border-default bg-surface-default p-6 text-center">
        <p className="viva-texto text-text-primary">Você viu todas as opções desta etapa.</p>
        <p className="mt-2 viva-apoio text-text-secondary">
          Pode seguir adiante ou rever as opções quando quiser.
        </p>
      </div>
    );
  }

  const dx = arraste?.x ?? 0;
  const dy = arraste?.y ?? 0;
  const transform = saida
    ? saida === "incluir"
      ? "translateX(120%) rotate(6deg)"
      : saida === "descartar"
        ? "translateX(-120%) rotate(-6deg)"
        : "translateY(-120%)"
    : `translate(${dx}px, ${Math.min(dy, 0)}px) rotate(${dx / 26}deg)`;

  const dica =
    dx > LIMIAR / 2
      ? "incluir"
      : dx < -LIMIAR / 2
        ? "descartar"
        : dy < -LIMIAR / 2
          ? "salvar"
          : null;

  return (
    <div>
      <div className="relative">
        {proximo ? (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-3 top-3 -z-10 h-full rounded-3xl border border-border-default bg-surface-muted/70"
          />
        ) : null}

        <div
          className={cn("touch-pan-y select-none", saida || !arraste ? "viva-anim" : "")}
          style={{ transform, opacity: saida ? 0 : 1 }}
          onPointerDown={(e) => {
            if ((e.target as HTMLElement).closest("button")) return;
            inicio.current = { x: e.clientX, y: e.clientY };
          }}
          onPointerMove={(e) => {
            if (!inicio.current) return;
            setArraste({ x: e.clientX - inicio.current.x, y: e.clientY - inicio.current.y });
          }}
          onPointerUp={() => {
            const atual = arraste;
            inicio.current = null;
            setArraste(null);
            if (!atual) return;
            if (atual.x > LIMIAR) decidir("incluir");
            else if (atual.x < -LIMIAR) decidir("descartar");
            else if (atual.y < -LIMIAR) decidir("salvar");
          }}
          onPointerCancel={() => {
            inicio.current = null;
            setArraste(null);
          }}
        >
          <CardDeEscolha
            cartao={cartao}
            selecionado={selecionados.includes(cartao.id)}
            acoes={
              <AcoesDoCartao
                nomeDoCartao={cartao.titulo}
                rotuloIncluir={rotuloIncluir}
                onIncluir={() => decidir("incluir")}
                onDescartar={() => decidir("descartar")}
                onSalvar={() => decidir("salvar")}
                onDetalhes={() => onDetalhes(cartao)}
              />
            }
          />
        </div>

        {dica ? (
          <p
            aria-hidden
            className="viva-anim mt-3 text-center viva-legenda font-medium text-destaque-texto"
          >
            {dica === "incluir"
              ? "Soltar para incluir"
              : dica === "descartar"
                ? "Soltar para deixar de fora"
                : "Soltar para guardar para depois"}
          </p>
        ) : null}
      </div>

      <p className="mt-4 text-center viva-legenda text-text-secondary">
        Opção {Math.min(indice + 1, cartoes.length)} de {cartoes.length}. Você pode arrastar o
        cartão ou usar os botões.
      </p>
    </div>
  );
}

/** IndicadorDeEtapa — orientação sem barra de desempenho. */
export function IndicadorDeEtapa({
  etapas,
  atual,
  onIr,
}: {
  etapas: { id: string; rotuloResumo: string }[];
  atual: number;
  onIr: (indice: number) => void;
}) {
  return (
    <nav aria-label="Etapas do percurso">
      <ol className="flex items-center gap-2">
        {etapas.map((etapa, i) => {
          const ativo = i === atual;
          const visto = i < atual;
          return (
            <li key={etapa.id} className="flex-1">
              <button
                type="button"
                onClick={() => onIr(i)}
                aria-current={ativo ? "step" : undefined}
                aria-label={`Etapa ${i + 1} de ${etapas.length}: ${etapa.rotuloResumo}${ativo ? " (atual)" : visto ? " (já escolhida)" : ""}`}
                className="viva-tap flex min-h-11 w-full items-end pb-1"
              >
                <span
                  className={cn(
                    "block h-1.5 w-full rounded-full viva-anim",
                    ativo
                      ? "bg-destaque"
                      : visto
                        ? "bg-destaque/40"
                        : "bg-border-default",
                  )}
                />
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** BotãoDesfazer — toda decisão é reversível (documento 17). */
export function BotaoDesfazer({
  visivel,
  descricao,
  onDesfazer,
}: {
  visivel: boolean;
  descricao: string;
  onDesfazer: () => void;
}) {
  if (!visivel) return null;
  return (
    <div
      role="status"
      className="viva-fade flex items-center justify-between gap-3 rounded-2xl border border-border-default bg-surface-muted px-4 py-3"
    >
      <p className="min-w-0 viva-legenda text-text-secondary">{descricao}</p>
      <button
        type="button"
        onClick={onDesfazer}
        className="viva-tap inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-3 viva-legenda font-medium text-text-primary underline underline-offset-4"
      >
        <Undo2 className="h-4 w-4" aria-hidden />
        Desfazer
      </button>
    </div>
  );
}

/** Legenda dos gestos, sempre acompanhada das ações equivalentes. */
export function LegendaDeGestos() {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1 viva-legenda text-text-secondary">
      <li className="inline-flex items-center gap-1.5">
        <Check className="h-3.5 w-3.5" aria-hidden /> Direita: incluir
      </li>
      <li className="inline-flex items-center gap-1.5">
        <X className="h-3.5 w-3.5" aria-hidden /> Esquerda: agora não
      </li>
      <li className="inline-flex items-center gap-1.5">
        <Bookmark className="h-3.5 w-3.5" aria-hidden /> Para cima: depois
      </li>
    </ul>
  );
}
