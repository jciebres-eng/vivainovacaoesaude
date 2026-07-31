import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * SuperficieDeCartao — a superfície básica da camada móvel: cantos amplos,
 * contraste suave e nenhum ornamento (documento 14).
 */
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
        "rounded-3xl border p-5",
        destacado
          ? "border-destaque bg-destaque-suave"
          : "border-border-default bg-surface-default",
        className,
      )}
    >
      {children}
    </div>
  );
}
