import { Link, type LinkProps } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Info,
  Pause,
  Settings2,
} from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { steps, type Step } from "@/lib/viva-data";

/* ------------------------------------------------------------- cabeçalho */

export function ScreenHeader({
  step,
  title,
  intro,
}: {
  step?: Step;
  title: string;
  intro?: string;
}) {
  return (
    <header className="viva-fade">
      {step ? (
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
          <p className="min-w-0 viva-legenda text-muted-foreground">
            Você está em <span className="font-semibold text-foreground">{step.short}</span>
          </p>
          <div className="flex shrink-0 items-center gap-2">
            <Link
              to="/afastamento"
              className="viva-tap inline-flex min-h-11 items-center gap-1.5 rounded-full border border-border px-4 py-2 viva-legenda text-muted-foreground hover:bg-secondary"
            >
              <Pause className="h-3.5 w-3.5" aria-hidden />
              Pausar
            </Link>
            <Link
              to="/configuracoes"
              className="viva-tap inline-flex min-h-11 items-center gap-1.5 rounded-full border border-border px-4 py-2 viva-legenda text-muted-foreground hover:bg-secondary"
            >
              <Settings2 className="h-3.5 w-3.5" aria-hidden />
              Ajustes
            </Link>
          </div>
        </div>
      ) : null}

      {step ? <Trajetoria current={step.step} /> : null}

      <h1 className="mt-6 viva-titulo text-foreground">{title}</h1>
      {intro ? (
        <p className="mt-3 max-w-[58ch] text-muted-foreground">{intro}</p>
      ) : null}

      {step ? (
        <div className="mt-6">
          <IndicePercurso atual={step.step} />
        </div>
      ) : null}
    </header>
  );
}

/**
 * Trajetória, não progresso (documento 13, "Relação com o progresso").
 * Sem percentual, sem barra de desempenho, sem etapas restantes, sem atraso.
 * A orientação é textual: o que veio antes, onde você está, o que vem depois.
 */
export function Trajetoria({ current }: { current: number }) {
  const anterior = steps[current - 2];
  const atual = steps[current - 1];
  const proximo = steps[current];

  return (
    <nav aria-label="Onde você está no percurso" className="mt-4">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 viva-legenda text-muted-foreground">
        <li>{anterior ? anterior.short : "Começo do percurso"}</li>
        <li aria-hidden className="text-border">
          ·
        </li>
        <li className="font-semibold text-foreground">
          {atual ? atual.short : ""}
          <span className="sr-only"> (você está aqui)</span>
        </li>
        <li aria-hidden className="text-border">
          ·
        </li>
        <li>{proximo ? proximo.short : "Última parte do percurso"}</li>
      </ol>
    </nav>
  );
}

/** Índice do percurso: acessível de dentro, nunca como menu permanente. */
export function IndicePercurso({ atual }: { atual: number }) {
  return (
    <details className="rounded-2xl border border-border bg-card">
      <summary className="viva-tap flex cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-5 py-4 viva-legenda font-medium text-card-foreground hover:bg-secondary">
        Ver todas as partes do percurso
        <ChevronDown className="h-4 w-4 shrink-0" aria-hidden />
      </summary>
      <ul className="border-t border-border p-2">
        {steps.map((s) => (
          <li key={s.id}>
            <Link
              to={s.path as LinkProps["to"]}
              aria-current={s.step === atual ? "step" : undefined}
              className={cn(
                "viva-anim flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 viva-legenda",
                s.step === atual
                  ? "bg-accent font-semibold text-accent-foreground"
                  : "text-card-foreground hover:bg-secondary",
              )}
            >
              <span className="truncate">{s.short}</span>
              {s.step === atual ? (
                <span className="shrink-0 viva-legenda">você está aqui</span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}

/* ------------------------------------------------------------------ corpo */

export function Screen({ children }: { children: ReactNode }) {
  return <div className="viva-fade mt-8 space-y-6">{children}</div>;
}

export function SectionCard({
  title,
  hint,
  children,
  className,
}: {
  title?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-3xl border border-border bg-card p-5 shadow-suave md:p-6",
        className,
      )}
    >
      {title ? (
        <h2 className="viva-subtitulo text-card-foreground">{title}</h2>
      ) : null}
      {hint ? (
        <p className="mt-2 viva-legenda text-muted-foreground">{hint}</p>
      ) : null}
      <div className={title || hint ? "mt-4" : undefined}>{children}</div>
    </section>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-2xl bg-secondary px-4 py-3 viva-legenda text-secondary-foreground">
      {children}
    </p>
  );
}

/** Aviso importante — amarelo suave, nunca urgência (doc 14). */
export function Aviso({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-start gap-2.5 rounded-2xl bg-atencao px-4 py-3 viva-legenda text-atencao-foreground">
      <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      <span>{children}</span>
    </p>
  );
}

/**
 * Origem das sugestões (documentos 10 e 15): a pessoa sempre sabe de onde
 * veio uma recomendação e pode aceitar, ignorar ou modificar.
 */
export function OrigemDaSugestao({ children }: { children?: ReactNode }) {
  return (
    <p className="rounded-2xl border border-dashed border-border px-4 py-3 viva-legenda text-muted-foreground">
      {children ??
        "Estas sugestões vêm de regras simples definidas neste protótipo, não de inteligência artificial. Você pode aceitar, ignorar ou modificar cada uma delas."}
    </p>
  );
}

/** Confirmação textual do resultado de uma ação (doc 13, Confirmações). */
export function Confirmacao({
  children,
  visivel = true,
}: {
  children: ReactNode;
  visivel?: boolean;
}) {
  return (
    <p
      role="status"
      aria-live="polite"
      className={cn(
        "flex items-center gap-2 viva-legenda text-muted-foreground",
        visivel ? "opacity-100" : "opacity-0",
      )}
    >
      <Check className="h-3.5 w-3.5 shrink-0 text-salvia" aria-hidden />
      <span>{children}</span>
    </p>
  );
}

/* --------------------------------------------------------------- escolhas */

export function ChoiceItem({
  label,
  description,
  selected,
  multiple,
  onSelect,
  disabled,
}: {
  label: string;
  description?: string;
  selected: boolean;
  multiple?: boolean;
  onSelect: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      aria-pressed={selected}
      className={cn(
        "viva-tap flex w-full items-start gap-3 rounded-2xl border p-4 text-left",
        selected
          ? "border-primary bg-accent"
          : "border-border bg-card hover:bg-secondary",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "mt-0.5 grid h-5 w-5 shrink-0 place-items-center border",
          multiple ? "rounded-md" : "rounded-full",
          selected
            ? "border-primary bg-primary text-primary-foreground"
            : "border-input",
        )}
      >
        {selected ? <Check className="h-3.5 w-3.5" /> : null}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-medium text-card-foreground">{label}</span>
        {description ? (
          <span className="mt-1 block viva-legenda text-muted-foreground">
            {description}
          </span>
        ) : null}
      </span>
      {/* Estado também em texto: nunca só cor (doc 14, Acessibilidade) */}
      {selected ? (
        <span className="shrink-0 viva-legenda text-muted-foreground">
          selecionado
        </span>
      ) : null}
    </button>
  );
}

export function ChoiceList({ children }: { children: ReactNode }) {
  return <div className="space-y-3">{children}</div>;
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="block font-medium text-foreground">{label}</span>
      {hint ? (
        <span className="mt-1 block viva-legenda text-muted-foreground">
          {hint}
        </span>
      ) : null}
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

const campoBase =
  "w-full rounded-2xl border border-input bg-card px-4 py-3 text-base text-foreground placeholder:text-muted-foreground disabled:opacity-55";

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(campoBase, props.className)} />;
}

export function TextArea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  return (
    <textarea {...props} className={cn("min-h-28", campoBase, props.className)} />
  );
}

export function Chip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "viva-tap rounded-full border px-4 py-2 viva-legenda font-medium",
        selected
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-card-foreground hover:bg-secondary",
      )}
    >
      {label}
    </button>
  );
}

/* ---------------------------------------------------------------- botões */

/** Botão terciário: apenas texto (doc 14, Botões). */
export function TextAction({
  children,
  onClick,
  to,
}: {
  children: ReactNode;
  onClick?: () => void;
  to?: string;
}) {
  const classe =
    "viva-tap inline-flex items-center gap-2 rounded-xl px-2 py-2 viva-legenda font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground";
  if (to) {
    return (
      <Link to={to as LinkProps["to"]} className={classe}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={classe}>
      {children}
    </button>
  );
}

/* ---------------------------------------------------------------- rodapé */

export function ScreenFooter({
  backTo,
  backLabel = "Voltar",
  nextTo,
  nextLabel = "Continuar",
  saved = true,
  extra,
}: {
  backTo?: string;
  backLabel?: string;
  nextTo?: string;
  nextLabel?: string;
  saved?: boolean;
  extra?: ReactNode;
}) {
  return (
    <footer className="mt-10 border-t border-border pt-6">
      {extra ? <div className="mb-4">{extra}</div> : null}
      <div className="flex flex-wrap items-center gap-3">
        {nextTo ? (
          <Link
            to={nextTo as LinkProps["to"]}
            className="viva-tap inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-primary-foreground hover:bg-primary/90 sm:flex-none"
          >
            {nextLabel}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        ) : null}
        {backTo ? (
          <Link
            to={backTo as LinkProps["to"]}
            className="viva-tap inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3.5 viva-legenda font-medium text-card-foreground hover:bg-secondary"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {backLabel}
          </Link>
        ) : null}
      </div>
      {saved ? (
        <p className="mt-4 viva-legenda text-muted-foreground">
          Suas escolhas ficam guardadas neste dispositivo. Você pode editar depois.
        </p>
      ) : null}
    </footer>
  );
}
