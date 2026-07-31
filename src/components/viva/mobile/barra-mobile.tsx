import { Link, useRouterState, type LinkProps } from "@tanstack/react-router";
import { BookOpen, Home, Route as RouteIcon, UserRound } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { usePerfil } from "@/lib/viva-perfis";
import { PersonalizandoExperiencia } from "./perfis";
import { AberturaDinamica } from "./abertura";

/**
 * BarraMobile — quatro áreas, nada escondido, nada profundo
 * (documento 14, "Navegação"; documento 04, carga cognitiva).
 */
const areas: {
  to: LinkProps["to"];
  label: string;
  icone: typeof Home;
  combina: (p: string) => boolean;
}[] = [
  { to: "/", label: "Início", icone: Home, combina: (p) => p === "/" },
  {
    to: "/meu-percurso",
    label: "Meu percurso",
    icone: RouteIcon,
    combina: (p) => p.startsWith("/meu-percurso") ||
      p.startsWith("/montar") ||
      p.startsWith("/falar") ||
      p.startsWith("/realizar") ||
      p.startsWith("/compartilhar"),
  },
  {
    to: "/biblioteca",
    label: "Biblioteca",
    icone: BookOpen,
    combina: (p) => p.startsWith("/biblioteca"),
  },
  {
    to: "/perfil",
    label: "Perfil",
    icone: UserRound,
    combina: (p) =>
      p.startsWith("/perfil") ||
      p.startsWith("/minha-experiencia") ||
      p.startsWith("/seus-dados") ||
      p.startsWith("/sobre") ||
      p.startsWith("/documenta"),
  },
];

export function BarraMobile() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-border-default bg-surface-default/95 pb-[env(safe-area-inset-bottom)] backdrop-blur"
    >
      <ul className="mx-auto grid max-w-lg grid-cols-4">
        {areas.map((area) => {
          const ativo = area.combina(pathname);
          return (
            <li key={area.label}>
              <Link
                to={area.to}
                aria-current={ativo ? "page" : undefined}
                className={cn(
                  "viva-anim flex min-h-[3.75rem] flex-col items-center justify-center gap-1 px-1 py-2 text-[0.7rem] font-medium",
                  ativo ? "text-destaque-texto" : "text-text-secondary",
                )}
              >
                <span
                  className={cn(
                    "grid h-8 w-14 place-items-center rounded-full viva-anim",
                    ativo ? "bg-destaque-suave" : "bg-transparent",
                  )}
                >
                  <area.icone className="h-5 w-5" aria-hidden />
                </span>
                <span className="truncate">{area.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Casca mobile-first: conteúdo estreito, barra fixa embaixo. */
export function CascaMobile({ children }: { children: ReactNode }) {
  const { trocando } = usePerfil();
  return (
    <div className="min-h-dvh bg-background">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-surface-default focus:px-4 focus:py-2 focus:text-text-primary"
      >
        Ir para o conteúdo
      </a>
      <AberturaDinamica />
      {trocando ? <PersonalizandoExperiencia /> : null}
      <main id="conteudo" className="mx-auto w-full max-w-xl px-5 pb-32 pt-8 md:max-w-2xl md:pt-12">
        {children}
      </main>
      <BarraMobile />
    </div>
  );
}
