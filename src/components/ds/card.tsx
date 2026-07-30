import type { LucideIcon } from "lucide-react";
import { Info } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { icone as tokenIcone } from "./tokens";

/**
 * Cards do VIVA (documento 14, "Cards").
 *
 * Estrutura previsível em todas as variações:
 *   título → descrição curta → conteúdo principal → ação opcional.
 * Um card carrega uma função. Se precisar de várias, use vários cards.
 */
export type VarianteCard =
  | "informativo"
  | "proximo-passo"
  | "habilidade"
  | "biblioteca"
  | "registro"
  | "reflexao"
  | "rotina"
  | "experiencia"
  | "estado-atual"
  | "aviso";

const variantes: Record<VarianteCard, string> = {
  informativo: "border-border-default bg-surface-default",
  "proximo-passo":
    "border-feedback-continuidade/40 bg-feedback-continuidade-suave/50",
  habilidade: "border-border-default bg-surface-default",
  biblioteca: "border-border-default bg-surface-default",
  registro: "border-border-default bg-surface-muted",
  reflexao: "border-dashed border-border-default bg-surface-default",
  rotina: "border-border-default bg-surface-muted",
  experiencia:
    "border-feedback-continuidade/40 bg-feedback-continuidade-suave/40",
  "estado-atual": "border-action-primary/40 bg-feedback-information/40",
  aviso: "border-transparent bg-feedback-attention",
};

const textoDaVariante: Record<VarianteCard, string> = {
  informativo: "text-text-primary",
  "proximo-passo": "text-text-primary",
  habilidade: "text-text-primary",
  biblioteca: "text-text-primary",
  registro: "text-text-primary",
  reflexao: "text-text-primary",
  rotina: "text-text-primary",
  experiencia: "text-text-primary",
  "estado-atual": "text-text-primary",
  aviso: "text-feedback-attention-foreground",
};


export function Card({
  variante = "informativo",
  titulo,
  descricao,
  icone: Icone,
  acao,
  children,
  className,
  compacto = false,
}: {
  variante?: VarianteCard;
  /** Título curto do card. */
  titulo?: string;
  /** Descrição de apoio, uma frase. */
  descricao?: string;
  icone?: LucideIcon;
  /** Ação opcional — no máximo uma principal por card. */
  acao?: ReactNode;
  children?: ReactNode;
  className?: string;
  compacto?: boolean;
}) {
  return (
    <section
      className={cn(
        "rounded-3xl border shadow-suave",
        compacto ? "p-4" : "p-5 md:p-6",
        variantes[variante],
        textoDaVariante[variante],
        className,
      )}
    >
      {titulo || Icone ? (
        <div className="flex items-start gap-3">
          {Icone ? (
            <Icone
              className={cn(tokenIcone.medio, "mt-0.5 shrink-0")}
              aria-hidden
            />
          ) : null}
          {titulo ? (
            <h2 className="min-w-0 viva-subtitulo">{titulo}</h2>
          ) : null}
        </div>
      ) : null}

      {descricao ? (
        <p className={cn("viva-legenda text-text-secondary", titulo && "mt-2")}>
          {descricao}
        </p>
      ) : null}

      {children ? (
        <div className={cn(titulo || descricao ? "mt-4" : undefined)}>
          {children}
        </div>
      ) : null}

      {acao ? (
        <div className="mt-5 flex flex-wrap items-center gap-3">{acao}</div>
      ) : null}
    </section>
  );
}

/** Aviso curto em linha: amarelo suave, nunca urgência (doc 14). */
export function Aviso({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-start gap-2.5 rounded-2xl bg-feedback-attention px-4 py-3 viva-legenda text-feedback-attention-foreground">
      <Info className={cn(tokenIcone.padrao, "mt-0.5 shrink-0")} aria-hidden />
      <span>{children}</span>
    </p>
  );
}

/** Observação neutra em linha. */
export function Nota({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-2xl bg-background-secondary px-4 py-3 viva-legenda text-action-secondary-foreground">
      {children}
    </p>
  );
}
