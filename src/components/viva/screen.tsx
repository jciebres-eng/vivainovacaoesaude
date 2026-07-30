import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, ChevronDown, Pause, Settings2 } from "lucide-react";
import type { ReactNode } from "react";

import {
  BotaoLink,
  Card,
  Confirmacao as DSConfirmacao,
  MarcadorDeContinuidade,
  icone as tokenIcone,
} from "@/components/ds";
import { cn } from "@/lib/utils";
import { steps, type Step } from "@/lib/viva-data";

/**
 * Blocos de tela do percurso. São composições finas sobre o Design System
 * (`@/components/ds`) — nenhuma decisão visual nova é tomada aqui.
 */

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
  const anterior = step ? steps[step.step - 2] : undefined;

  return (
    <header className="viva-fade">
      {step ? (
        <div className="flex flex-wrap items-center justify-end gap-2">
          <div className="flex shrink-0 items-center gap-2">
            <BotaoLink
              to="/afastamento"
              tamanho="compacto"
              icone={Pause}
              className="text-text-secondary"
            >
              Pausar
            </BotaoLink>
            <BotaoLink
              to="/minha-experiencia"
              tamanho="compacto"
              icone={Settings2}
              className="text-text-secondary"
            >
              Minha experiência
            </BotaoLink>
          </div>
        </div>
      ) : null}

      {anterior ? (
        <div className="mt-3">
          <Link
            to={anterior.path as LinkProps["to"]}
            className="viva-tap inline-flex min-h-11 items-center gap-2 rounded-xl px-2 py-2 viva-legenda font-medium text-text-secondary hover:text-text-primary"
          >
            <ArrowLeft className={cn(tokenIcone.padrao, "shrink-0")} aria-hidden />
            Voltar para {anterior.short}
          </Link>
        </div>
      ) : null}

      {step ? (
        <div className="mt-4">
          <Trajetoria current={step.step} />
        </div>
      ) : null}

      <h1 className="mt-6 viva-titulo-pagina text-text-primary">{title}</h1>
      {intro ? (
        <p className="mt-3 max-w-[58ch] viva-texto text-text-secondary">{intro}</p>
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
 * Sem percentual, sem etapas restantes, sem atraso.
 */
export function Trajetoria({ current }: { current: number }) {
  return (
    <MarcadorDeContinuidade
      anterior={steps[current - 2]?.short}
      atual={steps[current - 1]?.short ?? ""}
      proximo={steps[current]?.short}
      rotulo="Onde você está no percurso"
    />
  );
}

/** Índice do percurso: acessível de dentro, nunca como menu permanente. */
export function IndicePercurso({ atual }: { atual: number }) {
  return (
    <details className="rounded-2xl border border-border-default bg-surface-default">
      <summary className="viva-tap flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-5 py-4 viva-legenda font-medium text-text-primary hover:bg-background-secondary">
        Ver todas as partes do percurso
        <ChevronDown className={cn(tokenIcone.padrao, "shrink-0")} aria-hidden />
      </summary>
      <ul className="border-t border-border-default p-2">
        {steps.map((s) => (
          <li key={s.id}>
            <Link
              to={s.path as LinkProps["to"]}
              aria-current={s.step === atual ? "step" : undefined}
              className={cn(
                "viva-anim flex min-h-11 items-center justify-between gap-3 rounded-xl px-3 py-2.5 viva-legenda",
                s.step === atual
                  ? "bg-feedback-information font-semibold text-feedback-information-foreground"
                  : "text-text-primary hover:bg-background-secondary",
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

/** Seção de conteúdo — card informativo do Design System. */
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
    <Card variante="informativo" titulo={title} descricao={hint} className={className}>
      {children}
    </Card>
  );
}

export { Aviso, Nota as Note } from "@/components/ds";

/**
 * Origem das sugestões (documentos 10 e 15): a pessoa sempre sabe de onde
 * veio uma recomendação e pode aceitar, ignorar ou modificar.
 */
export function OrigemDaSugestao({ children }: { children?: ReactNode }) {
  return (
    <p className="rounded-2xl border border-dashed border-border-default px-4 py-3 viva-legenda text-text-secondary">
      {children ??
        "Estas sugestões vêm de regras simples definidas neste protótipo, não de inteligência artificial. Você pode aceitar, ignorar ou modificar cada uma delas."}
    </p>
  );
}

export function Confirmacao(props: {
  children: ReactNode;
  visivel?: boolean;
}) {
  return <DSConfirmacao {...props} />;
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
          ? "border-action-primary bg-feedback-information"
          : "border-border-default bg-surface-default hover:bg-background-secondary",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "mt-0.5 grid h-5 w-5 shrink-0 place-items-center border",
          multiple ? "rounded-md" : "rounded-full",
          selected
            ? "border-action-primary bg-action-primary text-action-primary-foreground"
            : "border-input",
        )}
      >
        {selected ? <Check className={tokenIcone.pequeno} /> : null}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block viva-rotulo text-text-primary">{label}</span>
        {description ? (
          <span className="mt-1 block viva-legenda text-text-secondary">
            {description}
          </span>
        ) : null}
      </span>
      {/* Estado também em texto: nunca só cor (doc 14, Acessibilidade) */}
      {selected ? (
        <span className="shrink-0 viva-legenda text-text-secondary">
          selecionado
        </span>
      ) : null}
    </button>
  );
}

export function ChoiceList({ children }: { children: ReactNode }) {
  return <div className="space-y-3">{children}</div>;
}

/* ---------------------------------------------------------------- campos */

export {
  AreaDeTexto as TextArea,
  CampoTexto as TextInput,
  CampoBusca,
  CampoData,
  CampoHorario,
  CampoSelecao,
  CaixaDeSelecao,
  BotaoDeOpcao,
  Interruptor,
  ControleDeslizante,
  Chip,
  Botao,
  BotaoLink,
  BotaoIcone,
  Card,
  Dialogo,
  IndicadorDeEstado,
  EstadoDaInterface,
  Carregando,
} from "@/components/ds";

/** Compatibilidade: envelope de campo com rótulo visível. */
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
    <div className="block">
      <span className="block viva-rotulo text-text-primary">{label}</span>
      {hint ? (
        <span className="mt-1 block viva-legenda text-text-secondary">{hint}</span>
      ) : null}
      <div className="mt-2">{children}</div>
    </div>
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
    "viva-tap inline-flex min-h-11 items-center gap-2 rounded-xl px-2 py-2 viva-legenda font-medium text-text-secondary underline underline-offset-4 hover:text-text-primary";
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
    <footer className="mt-10 border-t border-border-default pt-6">
      {extra ? <div className="mb-4">{extra}</div> : null}
      {/* Um único botão principal por bloco de decisão (doc 14). */}
      <div className="flex flex-wrap items-center gap-3">
        {nextTo ? (
          <BotaoLink
            to={nextTo}
            variante="principal"
            icone={ArrowRight}
            iconePosicao="fim"
          >
            {nextLabel}
          </BotaoLink>
        ) : null}
        {backTo ? (
          <BotaoLink to={backTo} tamanho="compacto" icone={ArrowLeft}>
            {backLabel}
          </BotaoLink>
        ) : null}
      </div>
      {saved ? (
        <p className="mt-4 viva-legenda text-text-secondary">
          Suas escolhas ficam guardadas neste dispositivo. Você pode editar depois.
        </p>
      ) : null}
    </footer>
  );
}
