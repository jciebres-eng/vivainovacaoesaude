import { Link } from "@tanstack/react-router";
import { ArrowLeft, Home, PauseCircle } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Moldura das telas do percurso (documentos 04, 13 e 14).
 *
 * Durante o percurso a navegação global desaparece: ficam apenas voltar,
 * início, pausa e salvar para depois. Uma finalidade por tela, uma ação
 * principal, e sempre a informação do que acontece em seguida.
 */
export function QuadroDoPercurso({
  titulo,
  finalidade,
  etapa,
  voltarPara,
  aoVoltar,
  aoPausar,
  aoSalvarParaDepois,
  depois,
  baixaEstimulacao = false,
  children,
}: {
  titulo: string;
  finalidade?: string;
  /** Indicação discreta: "Etapa 2 de 4". Nunca percentual ou pontuação. */
  etapa?: string;
  voltarPara?: string;
  aoVoltar?: () => void;
  aoPausar?: () => void;
  aoSalvarParaDepois?: () => void;
  /** O que acontecerá depois desta tela. */
  depois?: string;
  baixaEstimulacao?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-2xl px-4 pb-16 pt-6 md:px-6",
        baixaEstimulacao && "max-w-xl",
      )}
    >
      <nav aria-label="Navegação do percurso" className="flex flex-wrap items-center gap-2">
        {aoVoltar ? (
          <button
            type="button"
            onClick={aoVoltar}
            className="viva-tap inline-flex min-h-11 items-center gap-2 rounded-full px-3 viva-legenda text-text-secondary hover:bg-background-secondary"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Voltar
          </button>
        ) : voltarPara ? (
          <Link
            to={voltarPara}
            className="viva-tap inline-flex min-h-11 items-center gap-2 rounded-full px-3 viva-legenda text-text-secondary hover:bg-background-secondary"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Voltar
          </Link>
        ) : null}

        <Link
          to="/jornada"
          className="viva-tap inline-flex min-h-11 items-center gap-2 rounded-full px-3 viva-legenda text-text-secondary hover:bg-background-secondary"
        >
          <Home className="size-4" aria-hidden />
          Início do percurso
        </Link>

        {aoPausar ? (
          <button
            type="button"
            onClick={aoPausar}
            className="viva-tap inline-flex min-h-11 items-center gap-2 rounded-full px-3 viva-legenda text-text-secondary hover:bg-background-secondary"
          >
            <PauseCircle className="size-4" aria-hidden />
            Fazer uma pausa
          </button>
        ) : null}

        {aoSalvarParaDepois ? (
          <button
            type="button"
            onClick={aoSalvarParaDepois}
            className="viva-tap inline-flex min-h-11 items-center rounded-full px-3 viva-legenda text-text-secondary hover:bg-background-secondary"
          >
            Salvar e continuar depois
          </button>
        ) : null}
      </nav>

      <header className="mt-6">
        {etapa ? <p className="viva-legenda text-text-secondary">{etapa}</p> : null}
        <h1 className="mt-1 viva-titulo text-text-primary">{titulo}</h1>
        {finalidade ? <p className="mt-2 viva-apoio text-text-secondary">{finalidade}</p> : null}
      </header>

      <div className={cn("mt-6 space-y-5", baixaEstimulacao && "space-y-4")}>{children}</div>

      {depois ? (
        <p className="mt-8 rounded-2xl bg-surface-muted px-4 py-3 viva-legenda text-text-secondary">
          {depois}
        </p>
      ) : null}
    </div>
  );
}
