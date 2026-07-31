import { Info } from "lucide-react";

import { cn } from "@/lib/utils";
import { estaEmModoDemonstrativo, textoDoModoDemonstrativo } from "@/lib/providers/registry";

/**
 * SeloDemonstrativo — informa, sem alarmar, que os dados são fictícios.
 *
 * Aparece apenas onde há dados de serviços (lugares, rotas, mapas, conteúdo).
 * Nunca ocupa a ação principal da tela (documentos 03, 13, 14 e 15).
 */
export function SeloDemonstrativo({
  texto = textoDoModoDemonstrativo,
  className,
  sempreVisivel = false,
}: {
  texto?: string;
  className?: string;
  sempreVisivel?: boolean;
}) {
  if (!sempreVisivel && !estaEmModoDemonstrativo()) return null;

  return (
    <p
      className={cn(
        "flex items-start gap-2 rounded-2xl border border-border-default bg-surface-muted px-4 py-3 viva-apoio text-text-secondary",
        className,
      )}
    >
      <Info aria-hidden className="mt-0.5 size-4 shrink-0" />
      <span>{texto}</span>
    </p>
  );
}

/** Etiqueta curta para usar ao lado de um dado específico. */
export function OrigemDoDado({ provedor, aviso }: { provedor: string; aviso?: string }) {
  return (
    <span className="viva-apoio text-text-secondary">
      Fonte: {provedor}
      {aviso ? ` — ${aviso}` : ""}
    </span>
  );
}
