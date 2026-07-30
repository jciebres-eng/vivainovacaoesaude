import { Link, useRouterState, type LinkProps } from "@tanstack/react-router";
import {
  BookOpen,
  Clock3,
  Leaf,
  Route as RouteIcon,
  Settings2,
  ShieldCheck,
} from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { steps } from "@/lib/viva-data";

type To = LinkProps["to"];

/**
 * Navegação: no máximo cinco itens principais (documento 14, Navegação).
 * As 16 etapas do percurso não são menu — vivem dentro do próprio percurso.
 */
const itensPrincipais: {
  to: To;
  label: string;
  icon: typeof BookOpen;
  combina: (p: string) => boolean;
}[] = [
  {
    to: "/perfil",
    label: "Percurso",
    icon: RouteIcon,
    combina: (p) => steps.some((s) => p.startsWith(s.path)) && !p.startsWith("/biblioteca") && !p.startsWith("/linha-do-tempo"),
  },
  {
    to: "/biblioteca",
    label: "Biblioteca",
    icon: BookOpen,
    combina: (p) => p.startsWith("/biblioteca"),
  },
  {
    to: "/linha-do-tempo",
    label: "Trajetória",
    icon: Clock3,
    combina: (p) => p.startsWith("/linha-do-tempo"),
  },
  {
    to: "/configuracoes",
    label: "Ajustes",
    icon: Settings2,
    combina: (p) => p.startsWith("/configuracoes"),
  },
  {
    to: "/sobre",
    label: "Sobre o VIVA",
    icon: ShieldCheck,
    combina: (p) =>
      p.startsWith("/sobre") ||
      p.startsWith("/seus-dados") ||
      p.startsWith("/documenta"),
  },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-dvh bg-background">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-card focus:px-4 focus:py-2 focus:text-card-foreground"
      >
        Ir para o conteúdo
      </a>
      <div className="mx-auto flex w-full max-w-7xl">
        <SideNav pathname={pathname} />
        <div className="min-w-0 flex-1">
          <main
            id="conteudo"
            className="px-5 pb-28 pt-8 md:px-10 md:pb-16 md:pt-12"
          >
            <div className="mx-auto max-w-3xl">{children}</div>
          </main>
        </div>
      </div>
      <BottomNav pathname={pathname} />
    </div>
  );
}

function SideNav({ pathname }: { pathname: string }) {
  return (
    <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r border-border bg-sidebar md:flex">
      <div className="px-5 py-7">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-xl"
          aria-label="VIVA — página inicial"
        >
          <span
            aria-hidden
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-salvia-suave text-salvia"
          >
            <Leaf className="h-4 w-4" />
          </span>
          <span className="min-w-0">
            <span className="block truncate viva-subtitulo text-sidebar-foreground">
              VIVA
            </span>
            <span className="block truncate viva-legenda text-muted-foreground">
              Demonstração
            </span>
          </span>
        </Link>
      </div>

      <nav aria-label="Navegação principal" className="min-h-0 flex-1 px-3">
        <ul className="space-y-1">
          {itensPrincipais.map((item) => {
            const ativo = item.combina(pathname);
            return (
              <li key={item.label}>
                <Link
                  to={item.to}
                  aria-current={ativo ? "page" : undefined}
                  className={cn(
                    "viva-anim flex items-center gap-3 rounded-xl px-3 py-3 text-[0.95rem]",
                    ativo
                      ? "bg-accent font-semibold text-accent-foreground"
                      : "text-sidebar-foreground hover:bg-secondary",
                  )}
                >
                  <item.icon className="h-[1.15rem] w-[1.15rem] shrink-0" aria-hidden />
                  <span className="truncate">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <p className="px-5 pb-6 viva-legenda text-muted-foreground">
        Você decide o ritmo. Pode sair e voltar quando quiser.
      </p>
    </aside>
  );
}

function BottomNav({ pathname }: { pathname: string }) {
  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-card/95 backdrop-blur md:hidden"
    >
      <ul className="mx-auto grid max-w-xl grid-cols-5">
        {itensPrincipais.map((item) => {
          const ativo = item.combina(pathname);
          return (
            <li key={item.label}>
              <Link
                to={item.to}
                aria-current={ativo ? "page" : undefined}
                className={cn(
                  "viva-anim flex min-h-[3.75rem] flex-col items-center justify-center gap-1 px-1 py-2 text-[0.68rem] font-medium",
                  ativo ? "text-primary" : "text-muted-foreground",
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" aria-hidden />
                <span className="truncate">
                  {item.label === "Sobre o VIVA" ? "Sobre" : item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
