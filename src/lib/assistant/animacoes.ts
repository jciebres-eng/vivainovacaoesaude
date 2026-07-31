/**
 * AssistantAnimationManager — decide qual ativo cada estado usa.
 *
 * Nenhum componente importa arquivos Lottie diretamente. Aqui ficam:
 * o mapa estado → ativo, o carregamento sob demanda com cache e a escolha
 * automática do equivalente estático quando o movimento precisa ser reduzido
 * ou quando o JSON não está disponível (documentos 04, 14 e 19).
 */
import type { EstadoDoAssistente } from "./estados";

export type TamanhoDoAssistente = "hero" | "large" | "medium" | "small" | "minimized";

export const tamanhoEmPixels: Record<TamanhoDoAssistente, number> = {
  hero: 176,
  large: 128,
  medium: 96,
  small: 64,
  minimized: 40,
};

/** Nome-base do ativo por estado. Os arquivos finais do After Effects
 *  substituem os provisórios sem alterar esta tabela. */
export const ativoPorEstado: Record<EstadoDoAssistente, string> = {
  idle: "assistant-idle",
  listening: "assistant-listening",
  transcribing: "assistant-transcribing",
  processing: "assistant-processing",
  organizing: "assistant-organizing",
  suggesting: "assistant-suggesting",
  waiting: "assistant-waiting",
  guiding: "assistant-guiding",
  confirming: "assistant-confirming",
  completed: "assistant-completed",
  error: "assistant-error",
  offline: "assistant-offline",
  silent: "assistant-silent",
  minimized: "assistant-minimized",
  lowStimulation: "assistant-low-stimulation",
  disabled: "assistant-low-stimulation",
};

/** Equivalente estático de cada estado. Todos os estados têm um. */
export const estaticoPorEstado: Record<EstadoDoAssistente, string> = {
  idle: "assistant-idle",
  listening: "assistant-listening",
  transcribing: "assistant-processing",
  processing: "assistant-processing",
  organizing: "assistant-processing",
  suggesting: "assistant-idle",
  waiting: "assistant-idle",
  guiding: "assistant-idle",
  confirming: "assistant-idle",
  completed: "assistant-completed",
  error: "assistant-error",
  offline: "assistant-offline",
  silent: "assistant-idle",
  minimized: "assistant-idle",
  lowStimulation: "assistant-idle",
  disabled: "assistant-offline",
};

/* Importação preguiçosa: o bundler gera um chunk por animação e só o
   estado em uso é baixado. */
const carregadores = import.meta.glob("../../assets/assistant/lottie/*.json");
const estaticos = import.meta.glob("../../assets/assistant/static/*.svg", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const cache = new Map<string, unknown>();

export function urlEstatica(estado: EstadoDoAssistente): string | null {
  const nome = estaticoPorEstado[estado];
  const chave = Object.keys(estaticos).find((c) => c.endsWith(`/${nome}.svg`));
  return chave ? estaticos[chave] : null;
}

export function lottieDisponivel(estado: EstadoDoAssistente) {
  const nome = ativoPorEstado[estado];
  return Object.keys(carregadores).some((c) => c.endsWith(`/${nome}.json`));
}

/**
 * Carrega o JSON de um estado. Nunca lança: se o arquivo estiver ausente ou
 * inválido, devolve `null` e a interface usa a imagem estática.
 */
export async function carregarAnimacao(estado: EstadoDoAssistente): Promise<unknown | null> {
  const nome = ativoPorEstado[estado];
  if (cache.has(nome)) return cache.get(nome) ?? null;

  const chave = Object.keys(carregadores).find((c) => c.endsWith(`/${nome}.json`));
  if (!chave) {
    cache.set(nome, null);
    return null;
  }

  try {
    const modulo = (await carregadores[chave]()) as { default?: unknown };
    const dados = modulo?.default ?? modulo;
    if (!dados || typeof dados !== "object" || !("layers" in (dados as object))) {
      cache.set(nome, null);
      return null;
    }
    cache.set(nome, dados);
    return dados;
  } catch {
    cache.set(nome, null);
    return null;
  }
}

/** Libera o cache — usado em testes e ao desligar o assistente. */
export function limparCacheDeAnimacoes() {
  cache.clear();
}

/**
 * Regra única de decisão: com movimento reduzido, baixa estimulação, agente
 * desligado ou ativo ausente, usamos sempre a versão estática.
 */
export function deveUsarEstatico(opcoes: {
  estado: EstadoDoAssistente;
  movimentoReduzido: boolean;
  baixaEstimulacao: boolean;
  lottieHabilitado: boolean;
}) {
  const { estado, movimentoReduzido, baixaEstimulacao, lottieHabilitado } = opcoes;
  if (!lottieHabilitado) return true;
  if (movimentoReduzido || baixaEstimulacao) return true;
  if (estado === "disabled" || estado === "lowStimulation") return true;
  return !lottieDisponivel(estado);
}

/** Limite de alerta para ativos grandes (documento de auditoria Lottie). */
export const limiteDeTamanhoKb = 150;
