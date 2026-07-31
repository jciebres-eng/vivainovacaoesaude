/**
 * AberturaImersiva — a primeira coisa que a pessoa vê.
 *
 * Não é splash de marca nem carregamento falso. São três respiros curtos
 * (entre 1,5 s e 2,5 s): o ambiente aparece, o assistente ganha forma e a
 * pergunta de intenção se apresenta. Sem painel, sem números, sem menu.
 *
 * Pode ser pulada, respeita movimento reduzido e aparece uma vez por sessão
 * (documentos 04, 13, 17, 19).
 */
import { useEffect, useState } from "react";

import { FormaViva } from "@/components/viva/agente/avatar";
import { cn } from "@/lib/utils";
import { useModo } from "@/lib/viva-modos";

type Fase = "ambiente" | "forma" | "intencao" | "fim";

export function AberturaImersiva({
  pergunta = "O que você quer fazer hoje?",
  onFim,
}: {
  pergunta?: string;
  onFim?: () => void;
}) {
  const { modo, movimentoReduzido } = useModo();
  const semMovimento = movimentoReduzido || modo.intensidadeDoMovimento === 0;
  const [fase, setFase] = useState<Fase | null>(null);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem("viva.abertura.v2") === "vista") {
        setFase("fim");
        return;
      }
      window.sessionStorage.setItem("viva.abertura.v2", "vista");
    } catch {
      /* sem sessionStorage: a abertura simplesmente aparece */
    }

    const total = semMovimento ? 1500 : 2400;
    setFase("ambiente");
    const t1 = window.setTimeout(() => setFase("forma"), total * 0.25);
    const t2 = window.setTimeout(() => setFase("intencao"), total * 0.55);
    const t3 = window.setTimeout(() => {
      setFase("fim");
      onFim?.();
    }, total);
    return () => [t1, t2, t3].forEach(window.clearTimeout);
  }, [semMovimento, onFim]);

  if (fase === null || fase === "fim") return null;

  const encerrar = () => {
    setFase("fim");
    onFim?.();
  };

  return (
    <div
      role="status"
      aria-live="polite"
      onClick={encerrar}
      className="fixed inset-0 z-50 grid place-items-center px-8"
      style={{
        background: `radial-gradient(120% 100% at 50% 0%, var(--profile-secondary), var(--profile-background))`,
        transition: semMovimento ? "none" : "background 600ms ease-out",
      }}
    >
      <div className="w-full max-w-sm text-center">
        <div
          className={cn(
            "mx-auto grid place-items-center",
            !semMovimento && fase !== "ambiente" ? "viva-fade" : "",
          )}
          style={{
            opacity: fase === "ambiente" ? 0 : 1,
            transform: `scale(${fase === "ambiente" ? 0.9 : 1})`,
            transition: semMovimento ? "none" : "opacity 500ms ease-out, transform 700ms ease-out",
          }}
        >
          <FormaViva tamanho="large" />
        </div>

        <p
          className="mt-6 viva-subtitulo text-[var(--profile-text)]"
          style={{
            opacity: fase === "intencao" ? 1 : 0,
            transform: `translateY(${fase === "intencao" ? 0 : 8}px)`,
            transition: semMovimento ? "none" : "opacity 450ms ease-out, transform 450ms ease-out",
          }}
        >
          {pergunta}
        </p>

        <button
          type="button"
          onClick={encerrar}
          className="viva-tap mt-8 min-h-11 rounded-full px-5 viva-legenda text-[var(--profile-muted)] underline underline-offset-4"
        >
          Começar agora
        </button>
      </div>
    </div>
  );
}

/**
 * ProfileMorphTransition — véu discreto durante a troca de modo.
 * A interface se desfaz e se recompõe: a pessoa percebe que tudo mudou de
 * propósito, sem susto e sem piscada.
 */
export function ProfileMorphTransition() {
  const { fase, proximo, movimentoReduzido } = useModo();
  if (fase === "parado" || movimentoReduzido) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40"
      style={{
        background: "var(--profile-background)",
        opacity: fase === "desfazendo" ? 0.85 : 0,
        transition: "opacity 400ms ease-in-out",
      }}
    >
      <div className="grid h-full place-items-center">
        <p className="viva-legenda text-[var(--profile-muted)]">
          {proximo ? `Preparando o modo ${proximo.nome.toLowerCase()}` : ""}
        </p>
      </div>
    </div>
  );
}
