import { Link, useRouterState } from "@tanstack/react-router";
import { Leaf } from "lucide-react";
import type { ReactNode } from "react";

import { AssistenteFlutuante } from "@/components/viva/agente/flutuante";
import { AberturaDinamica } from "@/components/viva/mobile/abertura";
import { PersonalizandoExperiencia } from "@/components/viva/mobile/perfis";
import { areasPrincipais, BarraMobile } from "@/components/viva/mobile/barra-mobile";
import { cn } from "@/lib/utils";
import { useExperiencia } from "@/lib/viva-experiencia";
import { usePerfil } from "@/lib/viva-perfis";

/**
 * CascaViva — a única casca da aplicação.
 *
 * Mesma lógica de navegação em todos os tamanhos de tela: cinco áreas na
 * barra inferior no celular, as mesmas cinco na coluna lateral no desktop
 * (documentos 12, 14 e 24). O Assistente é flutuante e opcional.
 */
export function CascaViva({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { trocando } = usePerfil();
  const { preferencias } = useExperiencia();
  const baixaEstimulacao = preferencias.estimulos === "baixo";

  return (
    <div className="min-h-dvh bg-background">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-surface-default focus:px-4 focus:py-2 focus:text-text-primary"
      >
        Ir para o conteúdo
      </a>

      <AberturaDinamica baixaEstimulacao={baixaEstimulacao} />
      {trocando ? <PersonalizandoExperiencia /> : null}

      <div className="mx-auto flex w-full max-w-6xl">
        <NavLateral pathname={pathname} />
        <div className="min-w-0 flex-1">
          <main
            id="conteudo"
            className="mx-auto w-full max-w-xl px-5 pb-32 pt-8 md:max-w-2xl md:px-10 md:pb-20 md:pt-12"
          >
            {children}
          </main>
        </div>
      </div>

      <BarraMobile />
      <AssistenteFlutuante />
    </div>
  );
}

function NavLateral({ pathname }: { pathname: string }) {
  return (
    <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-r border-border-default bg-sidebar md:flex">
      <div className="px-5 py-7">
        <Link to="/" className="flex items-center gap-3 rounded-xl" aria-label="VIVA — início">
          <span
            aria-hidden
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-salvia-suave text-salvia"
          >
            <Leaf className="h-4 w-4" />
          </span>
          <span className="min-w-0">
            <span className="block truncate viva-subtitulo text-sidebar-foreground">VIVA</span>
            <span className="block truncate viva-legenda text-text-secondary">Demonstração</span>
          </span>
        </Link>
      </div>

      <nav aria-label="Navegação principal" className="min-h-0 flex-1 px-3">
        <ul className="space-y-1">
          {areasPrincipais.map((area) => {
            const ativo = area.combina(pathname);
            return (
              <li key={area.label}>
                <Link
                  to={area.to}
                  aria-current={ativo ? "page" : undefined}
                  className={cn(
                    "viva-anim flex min-h-11 items-center gap-3 rounded-xl px-3 py-3 text-[0.95rem]",
                    ativo
                      ? "bg-accent font-semibold text-accent-foreground"
                      : "text-sidebar-foreground hover:bg-background-secondary",
                  )}
                >
                  <area.icone className="h-[1.15rem] w-[1.15rem] shrink-0" aria-hidden />
                  <span className="truncate">{area.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <p className="px-5 pb-6 viva-legenda text-text-secondary">
        Você decide o ritmo. Pode sair e voltar quando quiser.
      </p>
    </aside>
  );
}
