import { Check, Info, X, Bookmark, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Cartões do VIVA mobile.
 *
 * Um cartão responde uma pergunta e nada mais (documento 14, "Cards"):
 * ícone, título, frase curta, categoria. As ações são sempre visíveis em
 * botões — o gesto é atalho, nunca a única forma de agir (documento 04).
 */

export type CartaoBase = {
  id: string;
  titulo: string;
  frase: string;
  categoria: string;
  icone: LucideIcon;
  detalhes?: string;
};

export function EtiquetaDeCategoria({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-surface-muted px-3 py-1 viva-legenda text-text-secondary">
      {children}
    </span>
  );
}

export function IconeDoCartao({ icone: Icone }: { icone: LucideIcon }) {
  return (
    <span
      aria-hidden
      className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-destaque-suave text-destaque-texto"
    >
      <Icone className="h-5 w-5" />
    </span>
  );
}

/** Superfície comum a todos os cartões. */
export function SuperficieDeCartao({
  children,
  className,
  destacado = false,
}: {
  children: ReactNode;
  className?: string;
  destacado?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border bg-surface-default p-5 shadow-suave",
        destacado ? "border-destaque/40" : "border-border-default",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * CardDeEscolha — usado na montagem do percurso.
 * Serve também como CardDeSituação, CardDeEstratégia e CardDaBiblioteca:
 * a diferença está apenas na categoria e nas ações oferecidas.
 */
export function CardDeEscolha({
  cartao,
  acoes,
  selecionado = false,
}: {
  cartao: CartaoBase;
  acoes?: ReactNode;
  selecionado?: boolean;
}) {
  return (
    <SuperficieDeCartao destacado={selecionado}>
      <div className="flex items-start gap-4">
        <IconeDoCartao icone={cartao.icone} />
        <div className="min-w-0 flex-1">
          <EtiquetaDeCategoria>{cartao.categoria}</EtiquetaDeCategoria>
          <h3 className="mt-3 viva-subtitulo text-text-primary">{cartao.titulo}</h3>
          <p className="mt-1 viva-apoio text-text-secondary">{cartao.frase}</p>
          {selecionado ? (
            <p className="mt-3 inline-flex items-center gap-2 viva-legenda font-medium text-destaque-texto">
              <Check className="h-4 w-4" aria-hidden />
              No seu percurso
            </p>
          ) : null}
        </div>
      </div>
      {acoes ? <div className="mt-5">{acoes}</div> : null}
    </SuperficieDeCartao>
  );
}

/** Ações do cartão em botões amplos — alternativa completa aos gestos. */
export function AcoesDoCartao({
  onIncluir,
  onDescartar,
  onSalvar,
  onDetalhes,
  rotuloIncluir = "Incluir",
  nomeDoCartao,
}: {
  onIncluir: () => void;
  onDescartar: () => void;
  onSalvar: () => void;
  onDetalhes: () => void;
  rotuloIncluir?: string;
  nomeDoCartao: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={onIncluir}
        aria-label={`${rotuloIncluir}: ${nomeDoCartao}`}
        className="viva-tap col-span-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-destaque px-6 py-3 viva-texto-botao font-semibold text-action-primary-foreground"
      >
        <Check className="h-5 w-5" aria-hidden />
        {rotuloIncluir}
      </button>
      <button
        type="button"
        onClick={onDescartar}
        aria-label={`Agora não: ${nomeDoCartao}`}
        className="viva-tap inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border-default bg-surface-default px-4 py-3 viva-legenda font-medium text-text-primary"
      >
        <X className="h-4 w-4" aria-hidden />
        Agora não
      </button>
      <button
        type="button"
        onClick={onSalvar}
        aria-label={`Salvar para depois: ${nomeDoCartao}`}
        className="viva-tap inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border-default bg-surface-default px-4 py-3 viva-legenda font-medium text-text-primary"
      >
        <Bookmark className="h-4 w-4" aria-hidden />
        Depois
      </button>
      <button
        type="button"
        onClick={onDetalhes}
        aria-label={`Ver detalhes: ${nomeDoCartao}`}
        className="viva-tap col-span-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-full viva-legenda font-medium text-text-secondary underline underline-offset-4"
      >
        <Info className="h-4 w-4" aria-hidden />
        Ver detalhes
      </button>
    </div>
  );
}
