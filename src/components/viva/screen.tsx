import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Pause, Settings2 } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { totalSteps, type Step } from "@/lib/viva-data";

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
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Etapa {step.step} de {totalSteps}
          </span>
          <div className="flex shrink-0 items-center gap-2">
            <Link
              to="/afastamento"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary"
            >
              <Pause className="h-3.5 w-3.5" aria-hidden />
              Pausar
            </Link>
            <Link
              to="/configuracoes"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary"
            >
              <Settings2 className="h-3.5 w-3.5" aria-hidden />
              Ajustes
            </Link>
          </div>
        </div>
      ) : null}

      {step ? <StepProgress current={step.step} /> : null}

      <h1 className="mt-6 text-2xl font-bold leading-snug text-foreground md:text-[2rem]">
        {title}
      </h1>
      {intro ? (
        <p className="mt-3 max-w-[58ch] text-muted-foreground">{intro}</p>
      ) : null}
    </header>
  );
}

export function StepProgress({ current }: { current: number }) {
  const pct = Math.round((current / totalSteps) * 100);
  return (
    <div className="mt-3">
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-secondary"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={totalSteps}
        aria-valuenow={current}
        aria-label={`Etapa ${current} de ${totalSteps}`}
      >
        <div
          className="viva-progress h-full rounded-full bg-primary"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
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
        "rounded-2xl border border-border bg-card p-5 md:p-6",
        className,
      )}
    >
      {title ? (
        <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {title}
        </h2>
      ) : null}
      {hint ? <p className="mt-2 text-sm text-muted-foreground">{hint}</p> : null}
      <div className={title || hint ? "mt-4" : undefined}>{children}</div>
    </section>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-xl bg-secondary px-4 py-3 text-sm text-secondary-foreground">
      {children}
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
}: {
  label: string;
  description?: string;
  selected: boolean;
  multiple?: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "viva-tap flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors",
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
          selected ? "border-primary bg-primary text-primary-foreground" : "border-border",
        )}
      >
        {selected ? <Check className="h-3.5 w-3.5" /> : null}
      </span>
      <span className="min-w-0">
        <span className="block font-medium text-card-foreground">{label}</span>
        {description ? (
          <span className="mt-1 block text-sm text-muted-foreground">
            {description}
          </span>
        ) : null}
      </span>
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
      <span className="block text-sm font-medium text-foreground">{label}</span>
      {hint ? (
        <span className="mt-1 block text-sm text-muted-foreground">{hint}</span>
      ) : null}
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-xl border border-input bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        props.className,
      )}
    />
  );
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "min-h-28 w-full rounded-xl border border-input bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        props.className,
      )}
    />
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
        "viva-tap rounded-full border px-4 py-2 text-sm font-medium transition-colors",
        selected
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-card-foreground hover:bg-secondary",
      )}
    >
      {label}
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
        {backTo ? (
          <Link
            to={backTo}
            className="viva-tap inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-card-foreground transition-colors hover:bg-secondary"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {backLabel}
          </Link>
        ) : null}
        {nextTo ? (
          <Link
            to={nextTo}
            className="viva-tap inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:flex-none"
          >
            {nextLabel}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        ) : null}
      </div>
      {saved ? (
        <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <Check className="h-3.5 w-3.5" aria-hidden />
          Salvo automaticamente
        </p>
      ) : null}
    </footer>
  );
}
