import { Link, useRouterState, type LinkProps } from "@tanstack/react-router";
import {
  BookOpen,
  Clock3,
  Compass,
  FileText,
  Home,
  Settings2,
  Sparkles,
} from "lucide-react";
import { useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import { steps } from "@/lib/viva-data";

type To = LinkProps["to"];

const atalhos: { to: To; label: string; icon: typeof Home }[] = [
  { to: "/", label: "Início", icon: Home },
  { to: "/biblioteca", label: "Biblioteca", icon: BookOpen },
  { to: "/linha-do-tempo", label: "Linha do tempo", icon: Clock3 },
  { to: "/configuracoes", label: "Ajustes", icon: Settings2 },
  { to: "/documentacao", label: "Documentos", icon: FileText },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex w-full max-w-7xl">
        <SideNav pathname={pathname} />
        <div className="min-w-0 flex-1">
          <main className="px-5 pb-28 pt-8 md:px-10 md:pb-16 md:pt-12">
            <div className="mx-auto max-w-3xl">{children}</div>
          </main>
        </div>
      </div>
      <BottomNav pathname={pathname} />
    </div>
  );
}

function SideNav({ pathname }: { pathname: string }) {
  const [aberto, setAberto] = useState(true);

  return (
    <aside
      className={cn(
        "viva-anim sticky top-0 hidden h-screen shrink-0 flex-col border-r border-border bg-sidebar md:flex",
        aberto ? "w-72" : "w-[4.5rem]",
      )}
    >
      <div className="flex items-center gap-2 px-4 py-6">
        <Link
          to="/"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground"
          aria-label="VIVA — início"
        >
          <Sparkles className="h-4 w-4" aria-hidden />
        </Link>
        {aberto ? (
          <div className="min-w-0">
            <p className="truncate font-bold tracking-tight text-sidebar-foreground">
              VIVA
            </p>
            <p className="truncate text-xs text-muted-foreground">
              Demonstração
            </p>
          </div>
        ) : null}
      </div>

      <nav className="min-h-0 flex-1 overflow-y-auto px-3 pb-6">
        {aberto ? (
          <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Percurso
          </p>
        ) : null}
        <ul className="space-y-1">
          {steps.map((s) => {
            const ativo = pathname === s.path;
            return (
              <li key={s.id}>
                <Link
                  to={s.path as To}
                  className={cn(
                    "viva-anim flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
                    ativo
                      ? "bg-accent font-semibold text-accent-foreground"
                      : "text-sidebar-foreground hover:bg-secondary",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs",
                      ativo
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-muted-foreground",
                    )}
                  >
                    {s.step}
                  </span>
                  {aberto ? <span className="truncate">{s.short}</span> : null}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="my-4 border-t border-border" />

        <ul className="space-y-1">
          {atalhos.map((a) => {
            const ativo = pathname === a.to;
            return (
              <li key={a.label}>
                <Link
                  to={a.to}
                  className={cn(
                    "viva-anim flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
                    ativo
                      ? "bg-accent font-semibold text-accent-foreground"
                      : "text-sidebar-foreground hover:bg-secondary",
                  )}
                >
                  <a.icon className="h-4 w-4 shrink-0" aria-hidden />
                  {aberto ? <span className="truncate">{a.label}</span> : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        className="m-3 flex items-center justify-center gap-2 rounded-xl border border-border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary"
      >
        <Compass className="h-3.5 w-3.5" aria-hidden />
        {aberto ? "Recolher menu" : null}
      </button>
    </aside>
  );
}

function BottomNav({ pathname }: { pathname: string }) {
  const atual = steps.find((s) => s.path === pathname);
  const percurso = atual ?? steps[0];

  const itens: { to: To; label: string; icon: typeof Home }[] = [
    { to: percurso.path as To, label: "Percurso", icon: Compass },
    { to: "/biblioteca", label: "Biblioteca", icon: BookOpen },
    { to: "/linha-do-tempo", label: "Trajetória", icon: Clock3 },
    { to: "/configuracoes", label: "Ajustes", icon: Settings2 },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-card/95 backdrop-blur md:hidden">
      <ul className="mx-auto grid max-w-md grid-cols-4">
        {itens.map((item) => {
          const ativo =
            pathname === item.to ||
            (item.label === "Percurso" && Boolean(atual));
          return (
            <li key={item.label}>
              <Link
                to={item.to}
                className={cn(
                  "flex flex-col items-center gap-1 py-3 text-[0.7rem] font-medium transition-colors",
                  ativo ? "text-primary" : "text-muted-foreground",
                )}
              >
                <item.icon className="h-5 w-5" aria-hidden />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
