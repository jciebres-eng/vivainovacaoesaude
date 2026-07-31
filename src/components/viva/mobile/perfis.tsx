import { Check, ChevronRight, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { perfis, usePerfil, type Perfil } from "@/lib/viva-perfis";

/**
 * Perfis de Demonstração.
 *
 * A troca de perfil é uma das ações mais visíveis do VIVA — nunca escondida
 * em configurações. Ao trocar, toda a experiência é reorganizada: saudação,
 * objetivo, cartões, estratégias, conteúdos, cor de destaque e ordem dos
 * blocos. A identidade visual do VIVA permanece.
 */

export function PerfilCard({
  perfil,
  ativo,
  onEscolher,
}: {
  perfil: Perfil;
  ativo: boolean;
  onEscolher: () => void;
}) {
  const Icone = perfil.icone;
  return (
    <button
      type="button"
      onClick={onEscolher}
      aria-pressed={ativo}
      className={cn(
        "viva-tap flex w-56 shrink-0 snap-start flex-col items-start gap-3 rounded-3xl border bg-surface-default p-4 text-left shadow-suave",
        ativo ? "border-2 border-destaque" : "border-border-default",
      )}
      style={
        ativo
          ? undefined
          : ({
              "--destaque-suave": perfil.destaqueSuave,
              "--destaque-texto": perfil.destaqueTexto,
            } as React.CSSProperties)
      }
    >
      <span
        aria-hidden
        className="grid h-11 w-11 place-items-center rounded-2xl bg-destaque-suave text-destaque-texto"
      >
        <Icone className="h-5 w-5" />
      </span>
      <span className="min-w-0">
        <span className="block viva-subtitulo text-text-primary">{perfil.nome}</span>
        <span className="block viva-legenda text-text-secondary">{perfil.contexto}</span>
      </span>
      <span
        className={cn(
          "inline-flex items-center gap-1.5 viva-legenda font-medium",
          ativo ? "text-destaque-texto" : "text-text-secondary",
        )}
      >
        {ativo ? (
          <>
            <Check className="h-4 w-4" aria-hidden /> Em uso
          </>
        ) : (
          <>
            Usar este perfil <ChevronRight className="h-4 w-4" aria-hidden />
          </>
        )}
      </span>
    </button>
  );
}

export function SeletorDePerfil({ titulo = "Perfis de demonstração" }: { titulo?: string }) {
  const { perfil, trocarPerfil } = usePerfil();

  return (
    <section aria-labelledby="perfis-titulo">
      <div className="flex items-baseline justify-between gap-3">
        <h2 id="perfis-titulo" className="viva-titulo-secao text-text-primary">
          {titulo}
        </h2>
      </div>
      <p className="mt-1 viva-apoio text-text-secondary">
        Toque em um perfil. A experiência inteira se reorganiza.
      </p>
      <ul className="-mx-5 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2">
        {perfis.map((p) => (
          <li key={p.id} className="flex">
            <PerfilCard
              perfil={p}
              ativo={p.id === perfil.id}
              onEscolher={() => trocarPerfil(p.id)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Animação curta de transição entre perfis. */
export function PersonalizandoExperiencia() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 grid place-items-center bg-background/95 px-6 backdrop-blur-sm"
    >
      <div className="viva-fade flex flex-col items-center text-center">
        <span
          aria-hidden
          className="grid h-16 w-16 place-items-center rounded-full bg-destaque-suave text-destaque-texto"
        >
          <Sparkles className="h-6 w-6 animate-pulse" />
        </span>
        <p className="mt-5 viva-subtitulo text-text-primary">Personalizando sua experiência…</p>
        <p className="mt-1 viva-apoio text-text-secondary">Um instante.</p>
      </div>
    </div>
  );
}
