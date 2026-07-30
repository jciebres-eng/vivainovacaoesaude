import { Link, type LinkProps } from "@tanstack/react-router";
import { Loader2, type LucideIcon } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";
import { icone as tokenIcone } from "./tokens";

/**
 * Botões do VIVA (documento 14, "Botões").
 *
 * Variantes: principal, secundário, terciário e destrutivo — com ou sem ícone,
 * e uma forma somente-ícone que sempre exige rótulo acessível.
 * Estados cobertos: padrão, hover, foco, pressionado, desabilitado e carregando.
 *
 * Regra de composição: no máximo um botão principal por bloco de decisão.
 */
export type VarianteBotao =
  | "principal"
  | "secundario"
  | "terciario"
  | "destrutivo";

export type TamanhoBotao = "padrao" | "compacto";

const base =
  "viva-tap inline-flex items-center justify-center gap-2 rounded-full font-semibold disabled:pointer-events-none";

const variantes: Record<VarianteBotao, string> = {
  principal:
    "bg-action-primary text-action-primary-foreground hover:bg-action-primary-hover active:bg-action-primary/95",
  secundario:
    "border border-border-default-default bg-surface-default text-text-primary hover:bg-background-secondary",
  terciario:
    "text-text-secondary underline underline-offset-4 hover:text-text-primary",
  destrutivo:
    "border border-feedback-error/40 bg-surface-default text-feedback-error hover:bg-feedback-error/10",
};

const tamanhos: Record<TamanhoBotao, string> = {
  padrao: "min-h-11 px-6 py-3 viva-texto-botao",
  compacto: "min-h-11 px-4 py-2.5 viva-legenda font-medium",
};

type Comuns = {
  variante?: VarianteBotao;
  tamanho?: TamanhoBotao;
  icone?: LucideIcon;
  /** Posição do ícone em relação ao rótulo. */
  iconePosicao?: "inicio" | "fim";
  carregando?: boolean;
  /** Texto anunciado enquanto carrega. */
  textoCarregando?: string;
  className?: string;
  children?: ReactNode;
};

export type BotaoProps = Comuns &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function Botao({
  variante = "secundario",
  tamanho = "padrao",
  icone: Icone,
  iconePosicao = "inicio",
  carregando = false,
  textoCarregando = "Carregando…",
  className,
  children,
  disabled,
  type = "button",
  ...rest
}: BotaoProps) {
  const conteudo = carregando ? textoCarregando : children;
  return (
    <button
      {...rest}
      type={type}
      disabled={disabled || carregando}
      aria-busy={carregando || undefined}
      className={cn(base, variantes[variante], tamanhos[tamanho], className)}
    >
      {carregando ? (
        <Loader2 className={cn(tokenIcone.padrao, "animate-spin")} aria-hidden />
      ) : Icone && iconePosicao === "inicio" ? (
        <Icone className={tokenIcone.padrao} aria-hidden />
      ) : null}
      {conteudo}
      {!carregando && Icone && iconePosicao === "fim" ? (
        <Icone className={tokenIcone.padrao} aria-hidden />
      ) : null}
    </button>
  );
}

/** Mesma aparência do botão, mas navega. Use sempre que a ação for ir a outro lugar. */
export function BotaoLink({
  to,
  variante = "secundario",
  tamanho = "padrao",
  icone: Icone,
  iconePosicao = "inicio",
  className,
  children,
}: Comuns & { to: string }) {
  return (
    <Link
      to={to as LinkProps["to"]}
      className={cn(base, variantes[variante], tamanhos[tamanho], className)}
    >
      {Icone && iconePosicao === "inicio" ? (
        <Icone className={tokenIcone.padrao} aria-hidden />
      ) : null}
      {children}
      {Icone && iconePosicao === "fim" ? (
        <Icone className={tokenIcone.padrao} aria-hidden />
      ) : null}
    </Link>
  );
}

/**
 * Botão somente com ícone. O rótulo é obrigatório e vira nome acessível —
 * nunca existe ícone sem nome (doc 04).
 */
export function BotaoIcone({
  icone: Icone,
  rotulo,
  variante = "secundario",
  className,
  ...rest
}: Omit<BotaoProps, "children" | "icone" | "tamanho"> & {
  icone: LucideIcon;
  rotulo: string;
}) {
  return (
    <button
      {...rest}
      type={rest.type ?? "button"}
      aria-label={rotulo}
      title={rotulo}
      className={cn(
        base,
        variantes[variante],
        "min-h-11 min-w-11 px-3",
        className,
      )}
    >
      <Icone className={tokenIcone.medio} aria-hidden />
    </button>
  );
}

/** Chip de seleção: escolha rápida entre poucas opções, com estado em texto. */
export function Chip({
  label,
  selected,
  onClick,
  disabled,
}: {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={cn(
        "viva-tap min-h-11 rounded-full border px-4 py-2 viva-legenda font-medium",
        selected
          ? "border-action-primary bg-action-primary text-action-primary-foreground"
          : "border-border-default-default bg-surface-default text-text-primary hover:bg-background-secondary",
      )}
    >
      {label}
    </button>
  );
}
