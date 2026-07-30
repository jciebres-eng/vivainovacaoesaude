import { AlertCircle } from "lucide-react";
import { useId, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import { icone as tokenIcone } from "./tokens";

/**
 * Campos de entrada do VIVA (documento 14, "Campos" e documento 04).
 *
 * Regras válidas para todos os campos:
 * - rótulo sempre visível (o placeholder nunca substitui o rótulo);
 * - texto de apoio opcional, ligado ao campo por aria-describedby;
 * - estados de foco, erro e desabilitado previsíveis;
 * - mensagem de validação clara, associada ao campo e nunca só por cor.
 */

type BaseCampo = {
  rotulo: string;
  apoio?: string;
  erro?: string;
  obrigatorio?: boolean;
  disabled?: boolean;
  className?: string;
};

const campoBase =
  "w-full rounded-2xl border bg-surface-default px-4 py-3 viva-texto text-text-primary placeholder:text-text-secondary disabled:cursor-not-allowed disabled:opacity-55";

const bordaCampo = (erro?: string) =>
  erro ? "border-feedback-error" : "border-input";

/** Envelope comum: rótulo, apoio, campo e mensagem de validação. */
export function Campo({
  rotulo,
  apoio,
  erro,
  obrigatorio,
  className,
  children,
  htmlFor,
  apoioId,
  erroId,
}: BaseCampo & {
  children: ReactNode;
  htmlFor: string;
  apoioId: string;
  erroId: string;
}) {
  return (
    <div className={cn("block", className)}>
      <label htmlFor={htmlFor} className="block viva-rotulo text-text-primary">
        {rotulo}
        {obrigatorio ? (
          <span className="ml-1 viva-legenda text-text-secondary">
            (necessário)
          </span>
        ) : null}
      </label>
      {apoio ? (
        <p id={apoioId} className="mt-1 viva-legenda text-text-secondary">
          {apoio}
        </p>
      ) : null}
      <div className="mt-2">{children}</div>
      {erro ? (
        <p
          id={erroId}
          role="alert"
          className="mt-2 flex items-start gap-2 viva-legenda text-feedback-error"
        >
          <AlertCircle
            className={cn(tokenIcone.padrao, "mt-0.5 shrink-0")}
            aria-hidden
          />
          <span>{erro}</span>
        </p>
      ) : null}
    </div>
  );
}

function useCampoIds(erro?: string, apoio?: string) {
  const id = useId();
  const apoioId = `${id}-apoio`;
  const erroId = `${id}-erro`;
  const describedBy =
    [apoio ? apoioId : null, erro ? erroId : null].filter(Boolean).join(" ") ||
    undefined;
  return { id, apoioId, erroId, describedBy };
}

type InputProps = BaseCampo &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "className" | "id">;

export function CampoTexto({
  rotulo,
  apoio,
  erro,
  obrigatorio,
  className,
  ...rest
}: InputProps) {
  const { id, apoioId, erroId, describedBy } = useCampoIds(erro, apoio);
  return (
    <Campo
      rotulo={rotulo}
      apoio={apoio}
      erro={erro}
      obrigatorio={obrigatorio}
      className={className}
      htmlFor={id}
      apoioId={apoioId}
      erroId={erroId}
    >
      <input
        {...rest}
        id={id}
        aria-describedby={describedBy}
        aria-invalid={erro ? true : undefined}
        className={cn(campoBase, bordaCampo(erro))}
      />
    </Campo>
  );
}

export function CampoBusca(props: InputProps) {
  return <CampoTexto type="search" {...props} />;
}

export function CampoData(props: InputProps) {
  return <CampoTexto type="date" {...props} />;
}

export function CampoHorario(props: InputProps) {
  return <CampoTexto type="time" {...props} />;
}

export function AreaDeTexto({
  rotulo,
  apoio,
  erro,
  obrigatorio,
  className,
  ...rest
}: BaseCampo &
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "className" | "id">) {
  const { id, apoioId, erroId, describedBy } = useCampoIds(erro, apoio);
  return (
    <Campo
      rotulo={rotulo}
      apoio={apoio}
      erro={erro}
      obrigatorio={obrigatorio}
      className={className}
      htmlFor={id}
      apoioId={apoioId}
      erroId={erroId}
    >
      <textarea
        {...rest}
        id={id}
        aria-describedby={describedBy}
        aria-invalid={erro ? true : undefined}
        className={cn(campoBase, bordaCampo(erro), "min-h-28")}
      />
    </Campo>
  );
}

export function CampoSelecao({
  rotulo,
  apoio,
  erro,
  obrigatorio,
  className,
  opcoes,
  ...rest
}: BaseCampo &
  Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "className" | "id"> & {
    opcoes: { valor: string; label: string }[];
  }) {
  const { id, apoioId, erroId, describedBy } = useCampoIds(erro, apoio);
  return (
    <Campo
      rotulo={rotulo}
      apoio={apoio}
      erro={erro}
      obrigatorio={obrigatorio}
      className={className}
      htmlFor={id}
      apoioId={apoioId}
      erroId={erroId}
    >
      <select
        {...rest}
        id={id}
        aria-describedby={describedBy}
        aria-invalid={erro ? true : undefined}
        className={cn(campoBase, bordaCampo(erro), "min-h-11")}
      >
        {opcoes.map((o) => (
          <option key={o.valor} value={o.valor}>
            {o.label}
          </option>
        ))}
      </select>
    </Campo>
  );
}

/** Caixa de seleção (várias respostas possíveis). */
export function CaixaDeSelecao({
  rotulo,
  apoio,
  marcada,
  onChange,
  disabled,
}: {
  rotulo: string;
  apoio?: string;
  marcada: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  const id = useId();
  return (
    <div className="flex items-start gap-3">
      <input
        id={id}
        type="checkbox"
        checked={marcada}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-5 w-5 shrink-0 rounded-md border border-input accent-[var(--action-primary,var(--primary))]"
      />
      <label htmlFor={id} className="min-w-0">
        <span className="block viva-rotulo text-text-primary">{rotulo}</span>
        {apoio ? (
          <span className="block viva-legenda text-text-secondary">{apoio}</span>
        ) : null}
      </label>
    </div>
  );
}

/** Botão de opção (uma resposta entre várias). */
export function BotaoDeOpcao({
  rotulo,
  apoio,
  nome,
  selecionado,
  onSelect,
  disabled,
}: {
  rotulo: string;
  apoio?: string;
  nome: string;
  selecionado: boolean;
  onSelect: () => void;
  disabled?: boolean;
}) {
  const id = useId();
  return (
    <div className="flex items-start gap-3">
      <input
        id={id}
        type="radio"
        name={nome}
        checked={selecionado}
        disabled={disabled}
        onChange={onSelect}
        className="mt-1 h-5 w-5 shrink-0 border border-input accent-[var(--primary)]"
      />
      <label htmlFor={id} className="min-w-0">
        <span className="block viva-rotulo text-text-primary">{rotulo}</span>
        {apoio ? (
          <span className="block viva-legenda text-text-secondary">{apoio}</span>
        ) : null}
      </label>
    </div>
  );
}

/** Interruptor: estado sempre também em palavras, nunca só em cor. */
export function Interruptor({
  rotulo,
  apoio,
  valor,
  textoLigado = "Ativado",
  textoDesligado = "Desativado",
  onToggle,
  disabled,
}: {
  rotulo: string;
  apoio?: string;
  valor: boolean;
  textoLigado?: string;
  textoDesligado?: string;
  onToggle: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
      <span className="min-w-0">
        <span className="block viva-rotulo text-text-primary">{rotulo}</span>
        {apoio ? (
          <span className="block viva-legenda text-text-secondary">{apoio}</span>
        ) : null}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={valor}
        aria-label={rotulo}
        disabled={disabled}
        onClick={onToggle}
        className={cn(
          "viva-tap min-h-11 shrink-0 rounded-full border px-5 py-2.5 viva-legenda font-medium",
          valor
            ? "border-action-primary bg-action-primary text-action-primary-foreground"
            : "border-border-default-default bg-surface-default text-text-secondary",
        )}
      >
        {valor ? textoLigado : textoDesligado}
      </button>
    </div>
  );
}

/** Controle deslizante com valor sempre legível em texto. */
export function ControleDeslizante({
  rotulo,
  apoio,
  valor,
  min = 0,
  max = 10,
  passo = 1,
  formatarValor,
  onChange,
  disabled,
}: {
  rotulo: string;
  apoio?: string;
  valor: number;
  min?: number;
  max?: number;
  passo?: number;
  formatarValor?: (v: number) => string;
  onChange: (v: number) => void;
  disabled?: boolean;
}) {
  const id = useId();
  return (
    <div>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <label htmlFor={id} className="min-w-0 viva-rotulo text-text-primary">
          {rotulo}
        </label>
        <span className="shrink-0 viva-legenda text-text-secondary">
          {formatarValor ? formatarValor(valor) : valor}
        </span>
      </div>
      {apoio ? (
        <p className="mt-1 viva-legenda text-text-secondary">{apoio}</p>
      ) : null}
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={passo}
        value={valor}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 h-11 w-full accent-[var(--primary)]"
      />
    </div>
  );
}
