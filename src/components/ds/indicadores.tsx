import { Check, CircleDashed, Loader2, PauseCircle, Play } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { icone as tokenIcone } from "./tokens";

/**
 * Indicadores de estado do VIVA (documento 13, "Relação com o progresso").
 *
 * Nada aqui compara pessoas, pontua desempenho ou cobra prazo. A linguagem
 * permitida é de continuidade: em preparação, em andamento, você pode
 * continuar, concluído, pausado, retomar quando desejar.
 * Termos proibidos: falhou, atrasado, incompleto, baixo desempenho.
 */
export type EstadoDoPercurso =
  "em-preparacao" | "em-andamento" | "pode-continuar" | "concluido" | "pausado" | "retomar";

const rotulos: Record<EstadoDoPercurso, string> = {
  "em-preparacao": "Em preparação",
  "em-andamento": "Em andamento",
  "pode-continuar": "Você pode continuar",
  concluido: "Concluído",
  pausado: "Pausado",
  retomar: "Retomar quando desejar",
};

const aparencias: Record<EstadoDoPercurso, string> = {
  "em-preparacao": "bg-surface-muted text-text-secondary",
  "em-andamento": "bg-feedback-information text-feedback-information-foreground",
  "pode-continuar": "bg-feedback-information text-feedback-information-foreground",
  concluido: "bg-feedback-continuidade-suave text-feedback-continuidade-foreground",
  pausado: "bg-surface-muted text-text-secondary",
  retomar: "bg-surface-muted text-text-secondary",
};

const icones: Record<EstadoDoPercurso, typeof Check> = {
  "em-preparacao": CircleDashed,
  "em-andamento": Play,
  "pode-continuar": Play,
  concluido: Check,
  pausado: PauseCircle,
  retomar: PauseCircle,
};

/** Indicador de estado: cor + ícone + palavra. Nunca só cor. */
export function IndicadorDeEstado({ estado, texto }: { estado: EstadoDoPercurso; texto?: string }) {
  const Icone = icones[estado];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 viva-legenda font-medium",
        aparencias[estado],
      )}
    >
      <Icone className={cn(tokenIcone.pequeno, "shrink-0")} aria-hidden />
      {texto ?? rotulos[estado]}
    </span>
  );
}

/**
 * Marcador de continuidade: mostra onde a pessoa está entre partes de um
 * percurso, sem percentual, sem contagem regressiva e sem cobrança.
 */
export function MarcadorDeContinuidade({
  anterior,
  atual,
  proximo,
  rotulo = "Onde você está",
}: {
  anterior?: string;
  atual: string;
  proximo?: string;
  rotulo?: string;
}) {
  return (
    <nav aria-label={rotulo}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 viva-legenda text-text-secondary">
        <li>{anterior ?? "Começo do percurso"}</li>
        <li aria-hidden className="text-border-default">
          ·
        </li>
        <li className="font-semibold text-text-primary">
          {atual}
          <span className="sr-only"> (você está aqui)</span>
        </li>
        <li aria-hidden className="text-border-default">
          ·
        </li>
        <li>{proximo ?? "Última parte do percurso"}</li>
      </ol>
    </nav>
  );
}

/**
 * Barra de continuidade. Usada apenas quando a pessoa pede uma noção visual
 * de percurso; nunca acompanhada de percentual ou de meta a bater.
 */
export function BarraDeContinuidade({
  partes,
  atual,
  rotulo = "Partes já visitadas do percurso",
}: {
  partes: number;
  atual: number;
  rotulo?: string;
}) {
  return (
    <div role="group" aria-label={rotulo}>
      <div className="flex gap-1" aria-hidden>
        {Array.from({ length: partes }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full",
              i < atual ? "bg-feedback-continuidade" : "bg-surface-muted",
            )}
          />
        ))}
      </div>
      <p className="mt-2 viva-legenda text-text-secondary">
        Você já passou por {atual} de {partes} partes. Não há prazo.
      </p>
    </div>
  );
}

/** Etapas de percurso em lista, com estado por palavra. */
export function EtapasDoPercurso({
  etapas,
}: {
  etapas: { id: string; titulo: string; estado: EstadoDoPercurso }[];
}) {
  return (
    <ol className="space-y-2">
      {etapas.map((e) => (
        <li
          key={e.id}
          className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl bg-surface-muted px-4 py-3"
        >
          <span className="min-w-0 truncate viva-apoio text-text-primary">{e.titulo}</span>
          <IndicadorDeEstado estado={e.estado} />
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------- estados da interface */

/** Carregando: texto sempre presente, sem pulsação contínua de conteúdo. */
export function Carregando({ texto = "Carregando esta parte…" }: { texto?: string }) {
  return (
    <p
      role="status"
      aria-live="polite"
      className="flex items-center gap-2.5 rounded-2xl bg-surface-muted px-4 py-3 viva-apoio text-text-secondary"
    >
      <Loader2 className={cn(tokenIcone.padrao, "animate-spin")} aria-hidden />
      {texto}
    </p>
  );
}

/**
 * Mensagem de estado: vazio, concluído, indisponível, erro, sem conexão e
 * conteúdo não encontrado. Sempre neutra e orientada ao próximo passo.
 */
export type TipoDeEstado =
  "vazio" | "concluido" | "indisponivel" | "erro" | "sem-conexao" | "nao-encontrado";

const mensagensPadrao: Record<TipoDeEstado, { titulo: string; texto: string }> = {
  vazio: {
    titulo: "Ainda não há registros aqui.",
    texto: "Você pode começar quando fizer sentido.",
  },
  concluido: {
    titulo: "Suas alterações foram salvas.",
    texto: "Você pode editar isto depois, quando quiser.",
  },
  indisponivel: {
    titulo: "Esta parte não está disponível agora.",
    texto: "Você pode seguir por outro caminho e voltar mais tarde.",
  },
  erro: {
    titulo: "Não foi possível carregar esta informação.",
    texto: "Tente novamente ou retorne mais tarde.",
  },
  "sem-conexao": {
    titulo: "Você está sem conexão.",
    texto: "Suas escolhas continuam guardadas neste dispositivo.",
  },
  "nao-encontrado": {
    titulo: "Não encontramos este conteúdo.",
    texto: "Ele pode ter mudado de lugar. Nada do que você escolheu se perdeu.",
  },
};

export function EstadoDaInterface({
  tipo,
  titulo,
  texto,
  acao,
}: {
  tipo: TipoDeEstado;
  titulo?: string;
  texto?: string;
  acao?: ReactNode;
}) {
  const padrao = mensagensPadrao[tipo];
  return (
    <div
      role={tipo === "erro" || tipo === "sem-conexao" ? "alert" : "status"}
      className="rounded-3xl border border-dashed border-border-default bg-surface-default p-6 text-center"
    >
      <p className="viva-subtitulo text-text-primary">{titulo ?? padrao.titulo}</p>
      <p className="mt-2 viva-apoio text-text-secondary">{texto ?? padrao.texto}</p>
      {acao ? <div className="mt-5 flex flex-wrap justify-center gap-3">{acao}</div> : null}
    </div>
  );
}

/** Confirmação discreta de que algo foi guardado. */
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
        "flex items-center gap-2 viva-legenda text-text-secondary",
        visivel ? "opacity-100" : "opacity-0",
      )}
    >
      <Check
        className={cn(tokenIcone.pequeno, "shrink-0 text-feedback-continuidade")}
        aria-hidden
      />
      <span>{children}</span>
    </p>
  );
}
