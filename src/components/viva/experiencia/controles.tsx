import { cn } from "@/lib/utils";

/**
 * Controles de "Minha experiência".
 * Cada escolha é explícita, com rótulo em linguagem humana e explicação
 * do efeito real. Nenhum controle usa apenas cor para indicar estado.
 */

export type Opcao<T extends string> = {
  id: T;
  rotulo: string;
  apoio?: string;
};

export function GrupoDeOpcoes<T extends string>({
  legenda,
  descricao,
  opcoes,
  valor,
  onEscolher,
  colunas = 3,
}: {
  legenda: string;
  descricao?: string;
  opcoes: Opcao<T>[];
  valor: T;
  onEscolher: (id: T) => void;
  colunas?: 1 | 2 | 3;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="viva-rotulo text-text-primary">{legenda}</legend>
      {descricao ? <p className="mt-1 viva-legenda text-text-secondary">{descricao}</p> : null}
      <div
        className={cn(
          "mt-3 grid gap-2",
          colunas === 1 && "grid-cols-1",
          colunas === 2 && "sm:grid-cols-2",
          colunas === 3 && "sm:grid-cols-3",
        )}
      >
        {opcoes.map((opcao) => {
          const ativo = opcao.id === valor;
          return (
            <button
              key={opcao.id}
              type="button"
              aria-pressed={ativo}
              onClick={() => onEscolher(opcao.id)}
              className={cn(
                "viva-tap min-h-11 rounded-2xl border px-4 py-3 text-left",
                ativo
                  ? "border-action-primary bg-accent text-text-primary"
                  : "border-border-default bg-surface-default text-text-secondary hover:bg-background-secondary",
              )}
            >
              <span className="flex items-baseline justify-between gap-2">
                <span className="viva-rotulo">{opcao.rotulo}</span>
                <span className="viva-legenda text-text-secondary">{ativo ? "Em uso" : ""}</span>
              </span>
              {opcao.apoio ? (
                <span className="mt-1 block viva-legenda text-text-secondary">{opcao.apoio}</span>
              ) : null}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

/** Aviso de transparência: explica o que mudou, sem interromper. */
export function AvisoDeAjuste({
  mensagem,
  onFechar,
}: {
  mensagem: string | null;
  onFechar: () => void;
}) {
  return (
    <div aria-live="polite" className="min-h-0">
      {mensagem ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border-default bg-background-secondary px-4 py-3">
          <p className="viva-legenda text-text-secondary">{mensagem}</p>
          <button
            type="button"
            onClick={onFechar}
            className="viva-tap min-h-11 rounded-full px-3 viva-legenda font-medium text-text-primary underline underline-offset-4"
          >
            Entendi
          </button>
        </div>
      ) : null}
    </div>
  );
}
