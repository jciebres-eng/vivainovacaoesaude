/**
 * Tipos do JourneyMatch — a montagem visual do percurso.
 *
 * "Match" aqui significa compatibilidade entre a situação, o objetivo, as
 * barreiras percebidas e as estratégias possíveis. Nunca afeto, nunca
 * pontuação, nunca ranking (documentos 07, 10, 17 e 23).
 *
 * Tudo é local e fictício. Estes tipos são o contrato que as futuras
 * integrações (mapas, mídia, compartilhamento) deverão respeitar.
 */
import type { CenaVisual } from "@/components/viva/visual/visual-base";

export type CategoriaDeMatch =
  | "situation"
  | "need"
  | "barrier"
  | "strategy"
  | "information"
  | "training"
  | "monitoring"
  | "feedback";

export type IntensidadeSensorial = "baixa" | "media" | "alta";

export type FormatoDeItem = "leitura" | "audio" | "video" | "pratica" | "checklist" | "conversa";

/** Base visual de todo card do match. */
export type ItemDeMatch = {
  id: string;
  categoria: CategoriaDeMatch;
  titulo: string;
  /** Uma linha, opcional: o card é predominantemente gráfico. */
  descricao?: string;
  /** Texto revelado só nos detalhes. */
  detalhes?: string;
  etiqueta?: string;
  duracao?: string;
  intensidade?: IntensidadeSensorial;
  formato?: FormatoDeItem;
  cena: CenaVisual;
  /** Preparado para mídia real (etapa futura): thumb, vídeo curto ou Lottie. */
  midia?: { tipo: "imagem" | "video" | "lottie"; fonte: string; descricao: string };
};

export type Situation = ItemDeMatch & {
  categoria: "situation";
  /** Vínculo com o catálogo de situações já existente. */
  situacaoId: string;
  contexto: string;
};

export type Need = ItemDeMatch & { categoria: "need" };
export type Barrier = ItemDeMatch & { categoria: "barrier" };
export type Strategy = ItemDeMatch & { categoria: "strategy"; responde?: string[] };
export type InformationResource = ItemDeMatch & { categoria: "information" };
export type TrainingResource = ItemDeMatch & { categoria: "training" };
export type MonitoringPreference = ItemDeMatch & { categoria: "monitoring" };
export type FeedbackFormat = ItemDeMatch & { categoria: "feedback" };

export type GrupoDaTimeline =
  | "situacao"
  | "objetivo"
  | "barreiras"
  | "estrategias"
  | "informacoes"
  | "treinamento"
  | "simulacao"
  | "realizacao"
  | "monitoramento"
  | "feedback";

export const gruposDaTimeline: { id: GrupoDaTimeline; titulo: string }[] = [
  { id: "situacao", titulo: "Situação" },
  { id: "objetivo", titulo: "Objetivo" },
  { id: "barreiras", titulo: "Possíveis barreiras" },
  { id: "estrategias", titulo: "Estratégias" },
  { id: "informacoes", titulo: "Informações" },
  { id: "treinamento", titulo: "Treinamento" },
  { id: "simulacao", titulo: "Simulação" },
  { id: "realizacao", titulo: "Realização" },
  { id: "monitoramento", titulo: "Monitoramento" },
  { id: "feedback", titulo: "Feedback" },
];

export const grupoPorCategoria: Record<CategoriaDeMatch, GrupoDaTimeline> = {
  situation: "situacao",
  need: "objetivo",
  barrier: "barreiras",
  strategy: "estrategias",
  information: "informacoes",
  training: "treinamento",
  monitoring: "monitoramento",
  feedback: "feedback",
};

export type JourneyChoice = {
  id: string;
  categoria: CategoriaDeMatch;
  itemId: string;
  titulo: string;
  aceito: boolean;
  em: string;
};

export type JourneyStep = {
  id: string;
  grupo: GrupoDaTimeline;
  titulo: string;
  apoio?: string;
  /** Etapas estruturais ou de segurança não são movidas em silêncio. */
  fixa: boolean;
  opcional: boolean;
  itemId?: string;
  categoria?: CategoriaDeMatch;
};

export type EstadoDaJornada =
  | "rascunho"
  | "pronto"
  | "em-andamento"
  | "pausado"
  | "concluido";

export type Feedback = {
  formatoId: string;
  formatoTitulo: string;
  nota?: string;
  em: string;
};

export type Journey = {
  id: string;
  situacaoId: string;
  titulo: string;
  estado: EstadoDaJornada;
  criadoEm: string;
  atualizadoEm: string;
  escolhas: JourneyChoice[];
  etapas: JourneyStep[];
  feedback?: Feedback;
};

export type UserPreference = { chave: string; valor: string };

export type PerfilDemonstrativo = {
  id: string;
  nome: string;
  frase: string;
  preferencias: UserPreference[];
};

/** Rótulos e perguntas de cada rodada de match. Uma pergunta por tela. */
export const rotulosDeMatch: Record<
  CategoriaDeMatch,
  { titulo: string; pergunta: string; aceitar: string; descartar: string }
> = {
  situation: {
    titulo: "Situação",
    pergunta: "Qual situação você quer preparar?",
    aceitar: "Escolher esta situação",
    descartar: "Não é esta",
  },
  need: {
    titulo: "Objetivo",
    pergunta: "O que você quer que aconteça?",
    aceitar: "Adicionar ao meu percurso",
    descartar: "Agora não",
  },
  barrier: {
    titulo: "Possíveis barreiras",
    pergunta: "O que pode tornar isso mais difícil hoje?",
    aceitar: "Isso pode acontecer comigo",
    descartar: "Não é o meu caso",
  },
  strategy: {
    titulo: "Estratégias",
    pergunta: "O que pode ajudar no caminho?",
    aceitar: "Quero usar esta estratégia",
    descartar: "Agora não",
  },
  information: {
    titulo: "Informações",
    pergunta: "Quer ver algo antes de ir?",
    aceitar: "Guardar no percurso",
    descartar: "Agora não",
  },
  training: {
    titulo: "Treinamento",
    pergunta: "Quer ensaiar alguma parte antes?",
    aceitar: "Quero ensaiar isso",
    descartar: "Agora não",
  },
  monitoring: {
    titulo: "Monitoramento",
    pergunta: "Como você quer acompanhar isso durante?",
    aceitar: "Prefiro assim",
    descartar: "Não desta forma",
  },
  feedback: {
    titulo: "Feedback",
    pergunta: "Como você prefere registrar depois?",
    aceitar: "Prefiro assim",
    descartar: "Não desta forma",
  },
};
