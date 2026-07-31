import { Compass, MapPin, Pause } from "lucide-react";

import { cn } from "@/lib/utils";
import type { EtapaDoTrajeto } from "@/lib/viva-trajeto";

/**
 * Mapa simulado — representação demonstrativa, sem GPS e sem rastreamento.
 *
 * Um traço com pontos de referência em palavras. Sem satélite, sem ruas,
 * sem endereço: apenas o suficiente para orientar (documentos 04 e 15).
 */
export function MapaSimulado({
  etapas,
  etapaAtual,
  pausado = false,
  mostrarPosicao = true,
  compacto = false,
}: {
  etapas: EtapaDoTrajeto[];
  etapaAtual: number;
  pausado?: boolean;
  mostrarPosicao?: boolean;
  compacto?: boolean;
}) {
  const total = Math.max(1, etapas.length - 1);
  const progresso = Math.min(1, etapaAtual / total);

  return (
    <figure
      className={cn(
        "rounded-3xl border border-border-default bg-surface-muted/60 p-5",
        compacto ? "" : "pb-6",
      )}
    >
      <figcaption className="flex items-center gap-2 viva-legenda text-text-secondary">
        <Compass className="h-4 w-4 shrink-0" aria-hidden />
        Mapa demonstrativo — posição aproximada, sem localização real.
      </figcaption>

      <div className="relative mt-5 h-2 rounded-full bg-border-default/60">
        <div
          className="viva-anim absolute inset-y-0 left-0 rounded-full bg-destaque"
          style={{ width: `${progresso * 100}%` }}
        />
        {mostrarPosicao ? (
          <span
            aria-hidden
            className={cn(
              "viva-anim absolute -top-2.5 grid h-7 w-7 -translate-x-1/2 place-items-center rounded-full border-2 border-surface-default bg-destaque text-action-primary-foreground",
              pausado && "opacity-60",
            )}
            style={{ left: `${progresso * 100}%` }}
          >
            {pausado ? (
              <Pause className="h-3.5 w-3.5" aria-hidden />
            ) : (
              <MapPin className="h-3.5 w-3.5" aria-hidden />
            )}
          </span>
        ) : null}
      </div>

      <ol className="mt-6 space-y-2">
        {etapas.map((etapa, i) => {
          const atual = i === etapaAtual;
          const passou = i < etapaAtual;
          return (
            <li key={etapa.id} className="flex items-start gap-3">
              <span
                aria-hidden
                className={cn(
                  "mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full",
                  atual ? "bg-destaque" : passou ? "bg-destaque/40" : "bg-border-default",
                )}
              />
              <span className="min-w-0">
                <span
                  className={cn(
                    "block viva-apoio",
                    atual ? "font-semibold text-text-primary" : "text-text-secondary",
                  )}
                >
                  {etapa.referencia}
                  {atual ? <span className="sr-only"> (etapa atual)</span> : null}
                </span>
              </span>
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
