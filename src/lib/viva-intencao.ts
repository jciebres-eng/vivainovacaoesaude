/**
 * IntentInterpreterService — interpretação local de intenção.
 *
 * Regras simples de palavras-chave, executadas neste dispositivo.
 * Sem IA externa, sem chave de API, sem envio de dados.
 * A interpretação é sempre apresentada à pessoa para confirmação
 * (documentos 03, 11 e 15: transparência e decisão do usuário).
 */

export type IdDeContexto =
  | "compras"
  | "mobilidade"
  | "saude"
  | "trabalho"
  | "academico"
  | "indefinido";

export type Contexto = {
  id: IdDeContexto;
  titulo: string;
  /** Frase devolvida à pessoa: "Entendi: você quer…" */
  confirmacao: string;
  exemplos: string[];
};

export const contextos: Record<IdDeContexto, Contexto> = {
  compras: {
    id: "compras",
    titulo: "Ida ao mercado",
    confirmacao: "você quer organizar uma ida ao mercado",
    exemplos: ["Preciso ir ao mercado.", "Quero organizar minhas compras."],
  },
  mobilidade: {
    id: "mobilidade",
    titulo: "Transporte público",
    confirmacao: "você quer se preparar para usar o transporte público",
    exemplos: ["Quero pegar um ônibus.", "Preciso ir de metrô."],
  },
  saude: {
    id: "saude",
    titulo: "Consulta de saúde",
    confirmacao: "você quer se preparar para uma consulta",
    exemplos: ["Tenho uma consulta.", "Vou ao médico amanhã."],
  },
  trabalho: {
    id: "trabalho",
    titulo: "Situação de trabalho",
    confirmacao: "você quer se preparar para uma situação de trabalho",
    exemplos: ["Preciso me preparar para uma reunião."],
  },
  academico: {
    id: "academico",
    titulo: "Contexto acadêmico",
    confirmacao: "você quer se preparar para um dia na universidade",
    exemplos: ["Tenho aula na faculdade."],
  },
  indefinido: {
    id: "indefinido",
    titulo: "Ainda não está claro",
    confirmacao: "ainda não consegui entender o que você precisa",
    exemplos: [],
  },
};

const regras: { contexto: IdDeContexto; termos: string[] }[] = [
  {
    contexto: "compras",
    termos: ["mercado", "supermercado", "compras", "comprar", "feira", "farmácia", "farmacia"],
  },
  {
    contexto: "mobilidade",
    termos: ["ônibus", "onibus", "transporte", "ponto", "metrô", "metro", "trem", "deslocar"],
  },
  {
    contexto: "saude",
    termos: ["consulta", "médico", "medico", "clínica", "clinica", "exame", "dentista", "posto"],
  },
  {
    contexto: "trabalho",
    termos: ["reunião", "reuniao", "emprego", "trabalho", "entrevista", "escritório", "escritorio"],
  },
  {
    contexto: "academico",
    termos: ["aula", "faculdade", "universidade", "prova", "campus", "professor"],
  },
];

function normalizar(texto: string) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export type Interpretacao = {
  texto: string;
  contexto: Contexto;
  /** Termos que levaram a esta leitura — sempre mostrados à pessoa. */
  termosReconhecidos: string[];
};

/** Interpreta uma frase falada ou digitada. Nunca decide sozinho. */
export function interpretarIntencao(texto: string): Interpretacao {
  const alvo = normalizar(texto);
  const encontrados: { contexto: IdDeContexto; termo: string }[] = [];

  for (const regra of regras) {
    for (const termo of regra.termos) {
      if (alvo.includes(normalizar(termo))) encontrados.push({ contexto: regra.contexto, termo });
    }
  }

  if (encontrados.length === 0) {
    return { texto, contexto: contextos.indefinido, termosReconhecidos: [] };
  }

  const primeiro = encontrados[0].contexto;
  return {
    texto,
    contexto: contextos[primeiro],
    termosReconhecidos: encontrados.filter((e) => e.contexto === primeiro).map((e) => e.termo),
  };
}

export const exemplosDeFala = [
  "Preciso ir ao mercado.",
  "Quero pegar um ônibus.",
  "Tenho uma consulta.",
  "Preciso me preparar para uma reunião.",
  "Quero organizar minhas compras.",
];
