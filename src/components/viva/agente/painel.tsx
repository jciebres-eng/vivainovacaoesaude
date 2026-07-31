import { EyeOff, Minimize2, Power, VolumeX } from "lucide-react";

import { cn } from "@/lib/utils";
import { useAgente, type PresencaDoAgente } from "@/lib/viva-agente";
import { FormaViva } from "./avatar";

/**
 * PainelDoAgente — a presença do copiloto no topo da experiência.
 *
 * Mostra em que estado o agente está, com palavras, e oferece os quatro
 * controles previstos no documento 19: minimizar, silenciar, ocultar e
 * desligar. Nada some da plataforma quando o agente é desligado.
 */
const controles: { presenca: PresencaDoAgente; rotulo: string; icone: typeof EyeOff }[] = [
  { presenca: "minimizado", rotulo: "Minimizar", icone: Minimize2 },
  { presenca: "silencioso", rotulo: "Silenciar", icone: VolumeX },
  { presenca: "desativado", rotulo: "Desligar", icone: Power },
];

export function PainelDoAgente({ frase }: { frase?: string }) {
  const { descricao, presenca, definirPresenca, estado } = useAgente();
  const silencioso = presenca === "silencioso";

  if (presenca === "desativado") {
    return (
      <section
        aria-label="Assistente"
        className="rounded-3xl border border-border-default bg-surface-muted p-4"
      >
        <p className="viva-apoio text-text-primary">
          O assistente está desligado. Tudo continua funcionando por toques.
        </p>
        <button
          type="button"
          onClick={() => definirPresenca("ativo")}
          className="viva-tap mt-3 min-h-11 rounded-full border border-border-default bg-surface-default px-5 viva-legenda font-medium text-text-primary"
        >
          Ligar o assistente
        </button>
      </section>
    );
  }

  if (presenca === "minimizado") {
    return (
      <section aria-label="Assistente" className="flex items-center gap-3">
        <FormaViva tamanho={40} />
        <p className="viva-legenda text-text-secondary">{descricao.rotulo}</p>
        <button
          type="button"
          onClick={() => definirPresenca("ativo")}
          className="viva-tap ml-auto min-h-11 rounded-full px-4 viva-legenda font-medium text-text-primary underline underline-offset-4"
        >
          Ampliar
        </button>
      </section>
    );
  }

  return (
    <section
      aria-label="Assistente"
      className="rounded-3xl border border-border-default bg-surface-default p-5 shadow-suave"
    >
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4">
        <FormaViva tamanho={72} className="shrink-0" />
        <div className="min-w-0">
          <p className="viva-legenda text-text-secondary" aria-live="polite">
            {descricao.rotulo}
          </p>
          {!silencioso && frase ? (
            <p className="mt-1 viva-texto text-text-primary">{frase}</p>
          ) : null}
          <p className="mt-1 sr-only">{descricao.descricao}</p>
        </div>
      </div>

      <ul className="mt-4 flex flex-wrap gap-2">
        {controles.map((c) => {
          const ativo = presenca === c.presenca;
          const Icone = c.icone;
          return (
            <li key={c.presenca}>
              <button
                type="button"
                aria-pressed={ativo}
                onClick={() => definirPresenca(ativo ? "ativo" : c.presenca)}
                className={cn(
                  "viva-tap inline-flex min-h-11 items-center gap-2 rounded-full border px-4 viva-legenda font-medium",
                  ativo
                    ? "border-action-primary bg-surface-muted text-text-primary"
                    : "border-border-default text-text-secondary",
                )}
              >
                <Icone className="h-4 w-4" aria-hidden />
                {ativo ? `${c.rotulo}: ligado` : c.rotulo}
              </button>
            </li>
          );
        })}
      </ul>

      {estado === "offline" ? (
        <p className="mt-3 viva-legenda text-text-secondary">
          Sem conexão agora. Seus percursos deste aparelho continuam disponíveis.
        </p>
      ) : null}
    </section>
  );
}
