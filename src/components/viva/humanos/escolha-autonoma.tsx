import { Check, type LucideIcon } from "lucide-react";
import { useId } from "react";

import { cn } from "@/lib/utils";
import { icone as tokenIcone } from "@/components/ds";

/**
 * EscolhaAutonomaGroup — padrão de escolha do VIVA (documentos 00, 04 e 13).
 *
 * Tudo que a plataforma sugere é possibilidade, nunca comando. Por isso:
 * - a escolha é sempre opcional e reversível;
 * - existe sempre uma saída ("prefiro não responder", "decidir depois");
 * - nenhuma opção é apresentada como melhor, correta ou esperada;
 * - o estado escolhido aparece em palavra e ícone, nunca só em cor (doc 04).
 *
 * Usa campos nativos (radio/checkbox), então a navegação por teclado, o foco
 * visível e a leitura por leitores de tela funcionam sem código extra.
 */
export type OpcaoAutonoma = {
  id: string;
  rotulo: string;
  apoio?: string;
  icone?: LucideIcon;
  desabilitada?: boolean;
};

export function EscolhaAutonomaGroup({
  titulo,
  apoio,
  opcoes,
  valor,
  valores,
  multipla = false,
  onEscolher,
  nota = "Nenhuma escolha aqui é melhor que a outra, e você pode mudar depois.",
  colunas = "duas",
  desabilitado = false,
  className,
}: {
  titulo: string;
  apoio?: string;
  opcoes: OpcaoAutonoma[];
  /** Escolha única. */
  valor?: string | null;
  /** Escolha múltipla. */
  valores?: string[];
  multipla?: boolean;
  onEscolher: (id: string) => void;
  /** Lembrete de que a escolha é livre. Passe `null` para omitir. */
  nota?: string | null;
  colunas?: "uma" | "duas";
  desabilitado?: boolean;
  className?: string;
}) {
  const nome = useId();
  const selecionado = (id: string) => (multipla ? (valores ?? []).includes(id) : valor === id);

  return (
    <fieldset className={cn("min-w-0", className)} disabled={desabilitado}>
      <legend className="viva-rotulo text-text-primary">{titulo}</legend>
      {apoio ? <p className="mt-1 viva-legenda text-text-secondary">{apoio}</p> : null}

      <div className={cn("mt-3 grid gap-2", colunas === "duas" ? "sm:grid-cols-2" : undefined)}>
        {opcoes.map((opcao) => {
          const marcada = selecionado(opcao.id);
          const Icone = opcao.icone;
          return (
            <label
              key={opcao.id}
              className={cn(
                "viva-tap flex min-h-11 cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3",
                marcada
                  ? "border-action-primary bg-feedback-information/50"
                  : "border-border-default-default bg-surface-default hover:bg-background-secondary",
                (opcao.desabilitada || desabilitado) && "cursor-not-allowed opacity-55",
                "focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--ring)]",
              )}
            >
              <input
                type={multipla ? "checkbox" : "radio"}
                name={multipla ? `${nome}-${opcao.id}` : nome}
                checked={marcada}
                disabled={opcao.desabilitada || desabilitado}
                onChange={() => onEscolher(opcao.id)}
                className="sr-only"
              />
              <span
                aria-hidden
                className={cn(
                  "mt-0.5 grid h-5 w-5 shrink-0 place-items-center border",
                  multipla ? "rounded-md" : "rounded-full",
                  marcada
                    ? "border-action-primary bg-action-primary text-action-primary-foreground"
                    : "border-input bg-surface-default",
                )}
              >
                {marcada ? <Check className="h-3.5 w-3.5" /> : null}
              </span>

              <span className="min-w-0">
                <span className="flex items-center gap-2 viva-rotulo text-text-primary">
                  {Icone ? (
                    <Icone
                      className={cn(tokenIcone.padrao, "shrink-0 text-text-secondary")}
                      aria-hidden
                    />
                  ) : null}
                  {opcao.rotulo}
                </span>
                {opcao.apoio ? (
                  <span className="mt-0.5 block viva-legenda text-text-secondary">
                    {opcao.apoio}
                  </span>
                ) : null}
                {marcada ? (
                  <span className="mt-1 block viva-legenda font-medium text-text-secondary">
                    Escolhido
                  </span>
                ) : null}
              </span>
            </label>
          );
        })}
      </div>

      {nota ? <p className="mt-3 viva-legenda text-text-secondary">{nota}</p> : null}
    </fieldset>
  );
}

/**
 * Linha de ações de uma sugestão: uma ação principal e saídas sempre visíveis
 * (modificar, escolher outra, recusar, decidir depois).
 */
export function AcoesAutonomas({
  principal,
  secundarias,
  nota,
}: {
  principal?: React.ReactNode;
  secundarias?: React.ReactNode;
  nota?: string;
}) {
  return (
    <div className="mt-5">
      <div className="flex flex-wrap items-center gap-3">
        {principal}
        {secundarias}
      </div>
      {nota ? <p className="mt-3 viva-legenda text-text-secondary">{nota}</p> : null}
    </div>
  );
}
