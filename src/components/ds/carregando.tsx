import { cn } from "@/lib/utils";

/**
 * Estados de carregamento (documentos 04 e 14).
 * Sempre discretos: a estrutura da página permanece, o movimento é mínimo e
 * a mensagem explica o que está acontecendo, sem urgência.
 */

/** Bloco neutro que ocupa o lugar de um conteúdo que ainda está chegando. */
export function Esqueleto({
  className,
  arredondado = "media",
}: {
  className?: string;
  arredondado?: "media" | "grande";
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "block animate-pulse bg-surface-muted",
        arredondado === "grande" ? "rounded-2xl" : "rounded-xl",
        className,
      )}
    />
  );
}

/**
 * Tela em preparação: mantém o desenho da página (título, texto, cartão)
 * enquanto o conteúdo chega, com uma mensagem breve para leitores de tela.
 */
export function TelaEmPreparacao({
  mensagem = "Preparando esta etapa…",
}: {
  mensagem?: string;
}) {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-10 md:px-10 md:py-14">
      <p role="status" aria-live="polite" className="viva-legenda text-text-secondary">
        {mensagem}
      </p>

      <div className="mt-6 space-y-4">
        <Esqueleto className="h-8 w-2/3" />
        <Esqueleto className="h-4 w-full" />
        <Esqueleto className="h-4 w-4/5" />
      </div>

      <div className="mt-10 space-y-4">
        <Esqueleto className="h-36 w-full" arredondado="grande" />
        <Esqueleto className="h-24 w-full" arredondado="grande" />
      </div>
    </div>
  );
}
