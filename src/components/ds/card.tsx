import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Footprints,
  Info,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { BotaoLink } from "./botao";
import { IndicadorDeEstado, type EstadoDoPercurso } from "./indicadores";
import { icone as tokenIcone } from "./tokens";

/**
 * Cards do VIVA (documento 14, "Cards").
 *
 * Estrutura previsível em todas as variações:
 *   título → descrição curta → conteúdo principal → ação opcional.
 * Um card carrega uma função. Se precisar de várias, use vários cards.
 */
export type VarianteCard =
  | "informativo"
  | "proximo-passo"
  | "habilidade"
  | "biblioteca"
  | "registro"
  | "reflexao"
  | "rotina"
  | "experiencia"
  | "estado-atual"
  | "aviso";

const variantes: Record<VarianteCard, string> = {
  informativo: "border-border-default bg-surface-default",
  "proximo-passo":
    "border-feedback-continuidade/40 bg-feedback-continuidade-suave/50",
  habilidade: "border-border-default bg-surface-default",
  biblioteca: "border-border-default bg-surface-default",
  registro: "border-border-default bg-surface-muted",
  reflexao: "border-dashed border-border-default bg-surface-default",
  rotina: "border-border-default bg-surface-muted",
  experiencia:
    "border-feedback-continuidade/40 bg-feedback-continuidade-suave/40",
  "estado-atual": "border-action-primary/40 bg-feedback-information/40",
  aviso: "border-transparent bg-feedback-attention",
};

const textoDaVariante: Record<VarianteCard, string> = {
  informativo: "text-text-primary",
  "proximo-passo": "text-text-primary",
  habilidade: "text-text-primary",
  biblioteca: "text-text-primary",
  registro: "text-text-primary",
  reflexao: "text-text-primary",
  rotina: "text-text-primary",
  experiencia: "text-text-primary",
  "estado-atual": "text-text-primary",
  aviso: "text-feedback-attention-foreground",
};


export function Card({
  variante = "informativo",
  titulo,
  descricao,
  icone: Icone,
  acao,
  children,
  className,
  compacto = false,
}: {
  variante?: VarianteCard;
  /** Título curto do card. */
  titulo?: string;
  /** Descrição de apoio, uma frase. */
  descricao?: string;
  icone?: LucideIcon;
  /** Ação opcional — no máximo uma principal por card. */
  acao?: ReactNode;
  children?: ReactNode;
  className?: string;
  compacto?: boolean;
}) {
  return (
    <section
      className={cn(
        "rounded-3xl border shadow-suave",
        compacto ? "p-4" : "p-5 md:p-6",
        variantes[variante],
        textoDaVariante[variante],
        className,
      )}
    >
      {titulo || Icone ? (
        <div className="flex items-start gap-3">
          {Icone ? (
            <Icone
              className={cn(tokenIcone.medio, "mt-0.5 shrink-0")}
              aria-hidden
            />
          ) : null}
          {titulo ? (
            <h2 className="min-w-0 viva-subtitulo">{titulo}</h2>
          ) : null}
        </div>
      ) : null}

      {descricao ? (
        <p className={cn("viva-legenda text-text-secondary", titulo && "mt-2")}>
          {descricao}
        </p>
      ) : null}

      {children ? (
        <div className={cn(titulo || descricao ? "mt-4" : undefined)}>
          {children}
        </div>
      ) : null}

      {acao ? (
        <div className="mt-5 flex flex-wrap items-center gap-3">{acao}</div>
      ) : null}
    </section>
  );
}

/** Aviso curto em linha: amarelo suave, nunca urgência (doc 14). */
export function Aviso({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-start gap-2.5 rounded-2xl bg-feedback-attention px-4 py-3 viva-legenda text-feedback-attention-foreground">
      <Info className={cn(tokenIcone.padrao, "mt-0.5 shrink-0")} aria-hidden />
      <span>{children}</span>
    </p>
  );
}

/** Observação neutra em linha. */
export function Nota({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-2xl bg-background-secondary px-4 py-3 viva-legenda text-action-secondary-foreground">
      {children}
    </p>
  );
}

/* ------------------------------------------------ cards de conteúdo VIVA */

/**
 * Card de habilidade (documentos 08 e 14).
 * Mostra o que a pessoa está praticando, sem nota, nível ou comparação.
 */
export function CardDeHabilidade({
  nome,
  descricao,
  estado,
  contexto,
  para,
  acaoRotulo = "Ver habilidade",
}: {
  nome: string;
  descricao?: string;
  estado?: EstadoDoPercurso;
  /** Onde essa habilidade costuma aparecer na vida da pessoa. */
  contexto?: string;
  para?: string;
  acaoRotulo?: string;
}) {
  return (
    <Card variante="habilidade" icone={Sparkles} titulo={nome} descricao={descricao}>
      {contexto ? (
        <p className="viva-legenda text-text-secondary">Costuma aparecer: {contexto}</p>
      ) : null}
      <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <span className="min-w-0">
          {estado ? <IndicadorDeEstado estado={estado} /> : null}
        </span>
        {para ? (
          <BotaoLink to={para} tamanho="compacto" icone={ArrowRight} iconePosicao="fim">
            {acaoRotulo}
          </BotaoLink>
        ) : null}
      </div>
    </Card>
  );
}

/**
 * Card de reflexão (documentos 09 e 13).
 * Uma pergunta aberta. Nunca corrige, nunca pontua, pode ficar sem resposta.
 */
export function CardDeReflexao({
  pergunta,
  apoio,
  resposta,
  children,
  acao,
}: {
  pergunta: string;
  apoio?: string;
  /** Resposta já registrada, se houver. */
  resposta?: string;
  children?: ReactNode;
  acao?: ReactNode;
}) {
  return (
    <Card
      variante="reflexao"
      icone={MessageCircle}
      titulo={pergunta}
      descricao={apoio ?? "Responder é opcional. Não existe resposta certa."}
      acao={acao}
    >
      {resposta ? (
        <blockquote className="border-l-2 border-border-default pl-4 viva-apoio text-text-primary">
          {resposta}
        </blockquote>
      ) : null}
      {children}
    </Card>
  );
}

/**
 * Card de rotina (documentos 10 e 14, "Tempo").
 * Orienta o ritmo sem cobrar frequência; o lembrete é sempre desligável.
 */
export function CardDeRotina({
  titulo,
  quando,
  descricao,
  estado,
  acao,
}: {
  titulo: string;
  /** Quando costuma acontecer — em palavras, não em meta. */
  quando: string;
  descricao?: string;
  estado?: EstadoDoPercurso;
  acao?: ReactNode;
}) {
  return (
    <Card variante="rotina" icone={CalendarDays} titulo={titulo} descricao={descricao} acao={acao}>
      <p className="viva-legenda text-text-secondary">{quando}</p>
      {estado ? (
        <div className="mt-3">
          <IndicadorDeEstado estado={estado} />
        </div>
      ) : null}
      <p className="mt-3 viva-legenda text-text-secondary">
        Se um dia não acontecer, tudo bem. A rotina espera por você.
      </p>
    </Card>
  );
}

/**
 * Card de biblioteca (documento 11).
 * Conteúdo de apoio: formato e duração ficam visíveis antes de abrir.
 */
export function CardDeBiblioteca({
  titulo,
  resumo,
  formato,
  duracao,
  para,
  acaoRotulo = "Abrir conteúdo",
}: {
  titulo: string;
  resumo?: string;
  /** Texto, áudio, vídeo curto… */
  formato?: string;
  duracao?: string;
  para?: string;
  acaoRotulo?: string;
}) {
  return (
    <Card
      variante="biblioteca"
      icone={BookOpen}
      titulo={titulo}
      descricao={resumo}
      acao={
        para ? (
          <BotaoLink to={para} tamanho="compacto" icone={ArrowRight} iconePosicao="fim">
            {acaoRotulo}
          </BotaoLink>
        ) : undefined
      }
    >
      {formato || duracao ? (
        <p className="viva-legenda text-text-secondary">
          {[formato, duracao].filter(Boolean).join(" · ")}
        </p>
      ) : null}
    </Card>
  );
}

/**
 * Card de experiência (documentos 07 e 13).
 * Registra o que aconteceu na vida real. Sem sucesso, sem falha, sem nota:
 * qualquer participação conta, inclusive a parcial.
 */
export function CardDeExperiencia({
  titulo,
  quando,
  comoFoi,
  oQueAjudou,
  estado,
  acao,
}: {
  titulo: string;
  quando: string;
  /** Descrição da pessoa, com as palavras dela. */
  comoFoi?: string;
  oQueAjudou?: string;
  estado?: EstadoDoPercurso;
  acao?: ReactNode;
}) {
  return (
    <Card variante="experiencia" icone={Footprints} titulo={titulo} acao={acao}>
      <p className="viva-legenda text-text-secondary">{quando}</p>
      {comoFoi ? <p className="mt-3 viva-apoio text-text-primary">{comoFoi}</p> : null}
      {oQueAjudou ? (
        <p className="mt-3 viva-legenda text-text-secondary">O que ajudou: {oQueAjudou}</p>
      ) : null}
      {estado ? (
        <div className="mt-4">
          <IndicadorDeEstado estado={estado} />
        </div>
      ) : null}
    </Card>
  );
}
