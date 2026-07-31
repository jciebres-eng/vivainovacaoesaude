/**
 * JourneySwipeDeck — a pilha de escolhas visuais.
 *
 * O gesto horizontal existe porque é o modo mais rápido de dizer "isso serve"
 * ou "não serve" com uma mão só. Não há linguagem afetiva, coração, curtida
 * ou pontuação: aceitar significa "incluir no meu percurso" e descartar
 * significa "não quero esta opção" (documentos 04, 17).
 *
 * Toda ação de gesto tem equivalente por botão e por teclado, e todo
 * resultado é anunciado por leitor de tela.
 */
import { Check, Undo2, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import { useModo } from "@/lib/viva-modos";

export type ItemDaPilha = {
  id: string;
  /** Nome curto usado nos avisos acessíveis. */
  rotulo: string;
  conteudo: ReactNode;
};

const LIMITE = 96;

export function JourneySwipeDeck({
  itens,
  onAceitar,
  onDescartar,
  onFim,
  rotuloAceitar = "Incluir no meu percurso",
  rotuloDescartar = "Não quero esta opção",
  vazio,
}: {
  itens: ItemDaPilha[];
  onAceitar: (id: string) => void;
  onDescartar: (id: string) => void;
  onFim?: () => void;
  rotuloAceitar?: string;
  rotuloDescartar?: string;
  vazio?: ReactNode;
}) {
  const { modo, movimentoReduzido } = useModo();
  const [indice, setIndice] = useState(0);
  const [arrasto, setArrasto] = useState(0);
  const [saindo, setSaindo] = useState<"aceito" | "descartado" | null>(null);
  const [aviso, setAviso] = useState("");
  const [ultimo, setUltimo] = useState<{ id: string; acao: "aceito" | "descartado" } | null>(null);
  const inicio = useRef<number | null>(null);

  useEffect(() => {
    setIndice(0);
  }, [itens.length === 0]);

  const intensidade = movimentoReduzido ? 0 : modo.intensidadeDoMovimento;
  const atual = itens[indice];
  const proximos = itens.slice(indice + 1, indice + Math.max(1, modo.cardsSimultaneos));

  const decidir = useCallback(
    (acao: "aceito" | "descartado") => {
      if (!atual) return;
      setSaindo(acao);
      setUltimo({ id: atual.id, acao });
      setAviso(
        acao === "aceito"
          ? `${atual.rotulo} incluído no seu percurso.`
          : `${atual.rotulo} descartado. Você pode trazer de volta.`,
      );
      const finalizar = () => {
        if (acao === "aceito") onAceitar(atual.id);
        else onDescartar(atual.id);
        setSaindo(null);
        setArrasto(0);
        setIndice((i) => {
          const proximo = i + 1;
          if (proximo >= itens.length) onFim?.();
          return proximo;
        });
      };
      if (intensidade === 0) finalizar();
      else window.setTimeout(finalizar, 220);
    },
    [atual, intensidade, itens.length, onAceitar, onDescartar, onFim],
  );

  const desfazer = useCallback(() => {
    if (!ultimo) return;
    setIndice((i) => Math.max(0, i - 1));
    setAviso(`${ultimo.acao === "aceito" ? "Inclusão" : "Descarte"} desfeito.`);
    setUltimo(null);
  }, [ultimo]);

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

  const rotacao = intensidade === 0 ? 0 : (arrasto / 20) * (intensidade / 2);
  const deslocamento =
    saindo === "aceito" ? 420 : saindo === "descartado" ? -420 : arrasto;

  return (
    <div>
      <div className="relative">
        {proximos.map((item, i) => (
          <div
            key={item.id}
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 origin-top"
            style={{
              transform: `translateY(${(i + 1) * 10}px) scale(${1 - (i + 1) * 0.03})`,
              opacity: 0.5 - i * 0.15,
              zIndex: 0,
            }}
          >
            {item.conteudo}
          </div>
        ))}

        <div
          role="group"
          aria-label={`Opção ${indice + 1} de ${itens.length}: ${atual.rotulo}`}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault();
              decidir("aceito");
            }
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              decidir("descartado");
            }
          }}
          onPointerDown={(e) => {
            if (intensidade === 0) return;
            inicio.current = e.clientX;
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            if (inicio.current == null) return;
            setArrasto(e.clientX - inicio.current);
          }}
          onPointerUp={() => {
            if (inicio.current == null) return;
            const d = arrasto;
            inicio.current = null;
            if (d > LIMITE) decidir("aceito");
            else if (d < -LIMITE) decidir("descartado");
            else setArrasto(0);
          }}
          onPointerCancel={() => {
            inicio.current = null;
            setArrasto(0);
          }}
          className={cn(
            "relative z-10 touch-pan-y outline-none",
            "focus-visible:ring-2 focus-visible:ring-[var(--profile-primary)] focus-visible:ring-offset-2",
          )}
          style={{
            transform: `translateX(${deslocamento}px) rotate(${rotacao}deg)`,
            transition:
              inicio.current == null
                ? `transform var(--profile-motion-duration) ease-out, opacity var(--profile-motion-duration) ease-out`
                : "none",
            opacity: saindo ? 0 : 1,
            borderRadius: "var(--profile-radius)",
          }}
        >
          {atual.conteudo}

          {intensidade > 0 && Math.abs(arrasto) > 24 ? (
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute top-4 rounded-full px-3 py-1 viva-legenda font-semibold",
                arrasto > 0
                  ? "right-4 bg-[var(--profile-primary)] text-[var(--profile-surface)]"
                  : "left-4 border border-[var(--profile-border)] bg-[var(--profile-surface)] text-[var(--profile-muted)]",
              )}
            >
              {arrasto > 0 ? "Incluir" : "Não agora"}
            </span>
          ) : null}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => decidir("descartado")}
          aria-label={rotuloDescartar}
          className="viva-tap grid h-14 w-14 place-items-center rounded-full border border-[var(--profile-border)] bg-[var(--profile-surface)] text-[var(--profile-muted)]"
        >
          <X className="h-6 w-6" aria-hidden />
        </button>
        <button
          type="button"
          onClick={desfazer}
          disabled={!ultimo}
          aria-label="Desfazer a última decisão"
          className="viva-tap grid h-12 w-12 place-items-center rounded-full border border-[var(--profile-border)] text-[var(--profile-muted)] disabled:opacity-40"
        >
          <Undo2 className="h-5 w-5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => decidir("aceito")}
          aria-label={rotuloAceitar}
          className="viva-tap grid h-14 w-14 place-items-center rounded-full bg-[var(--profile-primary)] text-[var(--profile-surface)]"
        >
          <Check className="h-6 w-6" aria-hidden />
        </button>
      </div>

      <p className="mt-2 text-center viva-legenda text-[var(--profile-muted)]">
        Deslize, use os botões ou as setas do teclado. Nada é definitivo.
      </p>
      <p aria-live="polite" className="sr-only">
        {aviso}
      </p>
    </div>
  );
}
