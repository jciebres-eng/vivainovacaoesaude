import { Link, type LinkProps } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { Card } from "@/components/ds";

/**
 * Blocos de tela das páginas de apoio (biblioteca, sobre, seus dados,
 * minha experiência). São composições finas sobre o Design System Humano
 * (`@/components/ds`) — nenhuma decisão visual nova é tomada aqui.
 *
 * O fluxo principal da pessoa vive em `/jornada` e usa o
 * `QuadroDoPercurso`.
 */

export function ScreenHeader({ title, intro }: { title: string; intro?: string }) {
  return (
    <header className="viva-fade">
      <h1 className="viva-titulo-pagina text-text-primary">{title}</h1>
      {intro ? <p className="mt-3 max-w-[58ch] viva-texto text-text-secondary">{intro}</p> : null}
    </header>
  );
}

export function Screen({ children }: { children: ReactNode }) {
  return <div className="viva-fade mt-8 space-y-6">{children}</div>;
}

/** Seção de conteúdo — card informativo do Design System. */
export function SectionCard({
  title,
  hint,
  children,
  className,
}: {
  title?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Card variante="informativo" titulo={title} descricao={hint} className={className}>
      {children}
    </Card>
  );
}

export { Aviso, Nota as Note } from "@/components/ds";

/** Ação terciária: apenas texto (documento 14, Botões). */
export function TextAction({
  children,
  onClick,
  to,
}: {
  children: ReactNode;
  onClick?: () => void;
  to?: string;
}) {
  const classe =
    "viva-tap inline-flex min-h-11 items-center gap-2 rounded-xl px-2 py-2 viva-legenda font-medium text-text-secondary underline underline-offset-4 hover:text-text-primary";
  if (to) {
    return (
      <Link to={to as LinkProps["to"]} className={classe}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={classe}>
      {children}
    </button>
  );
}
