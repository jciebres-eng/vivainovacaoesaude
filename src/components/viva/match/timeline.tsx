/**
 * TimelineDoPercurso — "Meu percurso".
 *
 * Cada escolha aceita entra aqui, agrupada por etapa da jornada. Existem dois
 * modos: compacto (durante o match, sem tirar o foco do card) e completo (na
 * revisão). Não há pontuação, nota nem porcentagem de desempenho.
 */
import { AnimatePresence, motion } from "motion/react";
import { Check, Circle } from "lucide-react";

import { cn } from "@/lib/utils";
import { gruposDaTimeline, type Journey, type JourneyStep } from "@/lib/match/tipos";
import { useModo } from "@/lib/viva-modos";

function agruparEtapas(etapas: JourneyStep[]) {
  return gruposDaTimeline
    .map((grupo) => ({
      ...grupo,
      etapas: etapas.filter((e) => e.grupo === grupo.id),
    }))
    .filter((g) => g.etapas.length > 0);
}

export function TimelineDoPercurso({
  jornada,
  modo: modoDaTimeline = "compacto",
  className,
}: {
  jornada: Journey | null;
  modo?: "compacto" | "completo";
  className?: string;
}) {
  const { movimentoReduzido } = useModo();
  if (!jornada) return null;

  const grupos = agruparEtapas(jornada.etapas);
  const compacto = modoDaTimeline === "compacto";

  return (
    <section aria-label="Meu percurso" className={cn("space-y-2", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="viva-subtitulo text-[var(--profile-text)]">Meu percurso</h2>
        <p className="viva-legenda text-[var(--profile-muted)]">
          {jornada.etapas.length} {jornada.etapas.length === 1 ? "etapa" : "etapas"}
        </p>
      </div>

      {compacto ? (
        <ul className="-mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-1" aria-live="polite">
          <AnimatePresence initial={false}>
            {jornada.etapas.map((etapa) => (
              <motion.li
                key={etapa.id}
                layout={!movimentoReduzido}
                initial={movimentoReduzido ? undefined : { opacity: 0, scale: 0.9 }}
                animate={movimentoReduzido ? undefined : { opacity: 1, scale: 1 }}
                exit={movimentoReduzido ? undefined : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="w-36 shrink-0 snap-start border border-[var(--profile-border)] bg-[var(--profile-card)] p-2"
                style={{ borderRadius: "var(--profile-radius)" }}
              >
                <p className="viva-legenda text-[var(--profile-muted)]">
                  {gruposDaTimeline.find((g) => g.id === etapa.grupo)?.titulo}
                </p>
                <p className="line-clamp-2 viva-legenda font-semibold text-[var(--profile-text)]">
                  {etapa.titulo}
                </p>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      ) : (
        <ol className="space-y-4">
          {grupos.map((grupo) => (
            <li key={grupo.id}>
              <p className="viva-legenda font-semibold text-[var(--profile-primary)]">
                {grupo.titulo}
              </p>
              <ul className="mt-1 space-y-1">
                {grupo.etapas.map((etapa) => (
                  <li key={etapa.id} className="flex items-start gap-2">
                    <span aria-hidden className="mt-0.5 text-[var(--profile-muted)]">
                      {etapa.fixa ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Circle className="h-4 w-4" />
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className="block viva-legenda font-medium text-[var(--profile-text)]">
                        {etapa.titulo}
                        {etapa.opcional ? (
                          <span className="ml-2 viva-legenda text-[var(--profile-muted)]">
                            opcional
                          </span>
                        ) : null}
                      </span>
                      {etapa.apoio ? (
                        <span className="block viva-legenda text-[var(--profile-muted)]">
                          {etapa.apoio}
                        </span>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      )}

      {jornada.etapas.length === 0 ? (
        <p className="viva-legenda text-[var(--profile-muted)]">
          Cada escolha sua entra aqui, na ordem em que você decidir.
        </p>
      ) : null}
    </section>
  );
}
