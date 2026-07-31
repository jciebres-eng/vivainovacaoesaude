import { Link, useRouterState, type LinkProps } from "@tanstack/react-router";
import { BookOpen, Home, Route as RouteIcon, Sprout, UserRound } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Navegação principal do VIVA — cinco áreas, nada escondido, nada profundo
 * (documentos 04, 14 e 24). O Assistente não ocupa área de navegação:
 * ele permanece flutuante e opcional.
 */
export type AreaPrincipal = {
  to: LinkProps["to"];
  label: string;
  icone: typeof Home;
  combina: (p: string) => boolean;
};

export const areasPrincipais: AreaPrincipal[] = [
  { to: "/", label: "Início", icone: Home, combina: (p) => p === "/" },
  {
    to: "/meu-percurso",
    label: "Jornadas",
    icone: RouteIcon,
    combina: (p) =>
      p.startsWith("/meu-percurso") || p.startsWith("/percurso") || p.startsWith("/compartilhar"),
  },
  {
    to: "/biblioteca",
    label: "Biblioteca",
    icone: BookOpen,
    combina: (p) => p.startsWith("/biblioteca"),
  },
  {
    to: "/evolucao",
    label: "Evolução",
    icone: Sprout,
    combina: (p) => p.startsWith("/evolucao") || p.startsWith("/favoritos"),
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
      p.startsWith("/documenta") ||
      p.startsWith("/demonstracao"),
  },
];

export function BarraMobile() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-border-default bg-surface-default/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
    >
      <ul className="mx-auto grid max-w-lg grid-cols-5">
        {areasPrincipais.map((area) => {
          const ativo = area.combina(pathname);
          return (
            <li key={area.label}>
              <Link
                to={area.to}
                aria-current={ativo ? "page" : undefined}
                className={cn(
                  "viva-anim flex min-h-[3.75rem] flex-col items-center justify-center gap-1 px-1 py-2 text-[0.68rem] font-medium",
                  ativo ? "text-destaque-texto" : "text-text-secondary",
                )}
              >
                <span
                  className={cn(
                    "grid h-8 w-12 place-items-center rounded-full viva-anim",
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
