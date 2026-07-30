// Dados fictícios da demonstração VIVA.
// Fonte de autoridade: documentos da biblioteca (esp. 06, 07, 08, 09, 10, 11, 12).
// Nenhuma regra de negócio nesta etapa — apenas conteúdo para navegação.

export type StepId =
  | "perfil"
  | "sistema"
  | "objetivo"
  | "contexto"
  | "barreiras"
  | "opcoes"
  | "habilidades"
  | "estrategias"
  | "biblioteca"
  | "preparacao"
  | "simulacao"
  | "afastamento"
  | "registro"
  | "revisao"
  | "proximo-passo"
  | "linha-do-tempo";

export type Step = {
  id: StepId;
  step: number;
  path: string;
  title: string;
  short: string;
  action: string;
};

/** Percurso de 16 etapas (documento 12, seções 5 e 86). */
export const steps: Step[] = [
  { id: "perfil", step: 1, path: "/perfil", title: "Escolha um perfil", short: "Perfil", action: "Selecionar um perfil." },
  { id: "sistema", step: 2, path: "/sistema", title: "Meu sistema hoje", short: "Meu sistema", action: "Confirmar ou editar o resumo inicial." },
  { id: "objetivo", step: 3, path: "/objetivo", title: "O que você deseja realizar?", short: "Objetivo", action: "Definir o objetivo do percurso." },
  { id: "contexto", step: 4, path: "/contexto", title: "Meu contexto", short: "Contexto", action: "Informar os elementos mais relevantes do contexto." },
  { id: "barreiras", step: 5, path: "/barreiras", title: "O que pode dificultar ou ajudar?", short: "Barreiras", action: "Selecionar barreiras e facilitadores relevantes." },
  { id: "opcoes", step: 6, path: "/opcoes", title: "Compare suas opções", short: "Opções", action: "Escolher uma opção principal e uma alternativa." },
  { id: "habilidades", step: 7, path: "/habilidades", title: "Habilidades que quero desenvolver", short: "Habilidades", action: "Escolher uma ou mais habilidades." },
  { id: "estrategias", step: 8, path: "/estrategias", title: "Estratégias possíveis", short: "Estratégias", action: "Escolher, rejeitar ou adaptar estratégias." },
  { id: "biblioteca", step: 9, path: "/biblioteca", title: "Conteúdos relacionados", short: "Biblioteca", action: "Consultar ou salvar um conteúdo." },
  { id: "preparacao", step: 10, path: "/preparacao", title: "Prepare sua experiência", short: "Preparação", action: "Confirmar o plano da experiência." },
  { id: "simulacao", step: 11, path: "/simulacao", title: "Deseja praticar alguma parte antes?", short: "Simulação", action: "Escolher simular ou continuar sem simulação." },
  { id: "afastamento", step: 12, path: "/afastamento", title: "Seu plano está pronto", short: "Sair da tela", action: "Sair da plataforma para realizar a atividade." },
  { id: "registro", step: 13, path: "/registro", title: "Como foi sua experiência?", short: "Registro", action: "Registrar como foi a experiência." },
  { id: "revisao", step: 14, path: "/revisao", title: "Revisão de estratégias", short: "Revisão", action: "Rever o que manter, adaptar ou deixar de usar." },
  { id: "proximo-passo", step: 15, path: "/proximo-passo", title: "Qual o próximo passo?", short: "Próximo passo", action: "Escolher o próximo passo." },
  { id: "linha-do-tempo", step: 16, path: "/linha-do-tempo", title: "Minha trajetória", short: "Linha do tempo", action: "Visualizar a trajetória." },
];

export const totalSteps = steps.length;

export function getStep(id: StepId): Step {
  const found = steps.find((s) => s.id === id);
  if (!found) throw new Error(`Etapa desconhecida: ${id}`);
  return found;
}

export function nextStep(id: StepId): Step | undefined {
  return steps[steps.findIndex((s) => s.id === id) + 1];
}

export function prevStep(id: StepId): Step | undefined {
  const index = steps.findIndex((s) => s.id === id);
  return index > 0 ? steps[index - 1] : undefined;
}

/* ---------------------------------------------------------------- perfis */

export type Persona = {
  id: string;
  nome: string;
  tema: string;
  resumo: string;
  objetivoSugerido: string;
};

export const personas: Persona[] = [
  {
    id: "lucas",
    nome: "Lucas",
    tema: "Mobilidade e faculdade",
    resumo:
      "Utiliza mapas simples, prefere instruções escritas e quer ir à faculdade com mais autonomia.",
    objetivoSugerido: "Chegar à faculdade com mais autonomia",
  },
  {
    id: "mariana",
    nome: "Mariana",
    tema: "Alimentação e compras",
    resumo:
      "Organiza listas no celular, sente desconforto com ambientes muito cheios e quer fazer compras sozinha.",
    objetivoSugerido: "Fazer as compras da semana no meu tempo",
  },
  {
    id: "rafael",
    nome: "Rafael",
    tema: "Trabalho e reuniões",
    resumo:
      "Trabalha com apoio da equipe, prefere combinar assuntos por escrito antes das reuniões.",
    objetivoSugerido: "Participar de reuniões com mais previsibilidade",
  },
  {
    id: "ana",
    nome: "Ana",
    tema: "Saúde e consultas",
    resumo:
      "Acompanha consultas com apoio da irmã e quer organizar perguntas antes do atendimento.",
    objetivoSugerido: "Ir a uma consulta e falar o que preciso",
  },
];

/* -------------------------------------------------- meu sistema hoje (3) */

export const meuSistema = [
  {
    titulo: "O que já consigo fazer",
    itens: ["utilizar mapas simples", "enviar mensagens", "reconhecer prédios conhecidos"],
  },
  {
    titulo: "Recursos que possuo",
    itens: ["celular", "internet móvel", "cartão de transporte"],
  },
  { titulo: "Apoio disponível", itens: ["mãe por mensagem"] },
  {
    titulo: "Preferências",
    itens: ["instruções escritas", "ambientes com menos ruído"],
  },
  {
    titulo: "Necessidades sensoriais",
    itens: ["evitar ruído intenso por muito tempo", "pausas quando necessário"],
  },
];

/* -------------------------------------------------------- objetivos (4) */

export const objetivosSugeridos = [
  "Chegar à faculdade com mais autonomia",
  "Utilizar transporte público",
  "Conhecer uma nova rota",
  "Pedir ajuda durante um trajeto",
  "Ainda não sei",
  "Criar outro objetivo",
];

/* --------------------------------------------------------- contexto (5) */

export const contextoBlocos = [
  {
    titulo: "Transporte disponível",
    tipo: "multipla" as const,
    opcoes: ["Ônibus", "Caminhada", "Transporte por aplicativo", "Apoio de outra pessoa"],
    marcados: ["Ônibus"],
  },
  {
    titulo: "Quanto posso gastar?",
    tipo: "unica" as const,
    opcoes: ["Sem custo", "Até R$ 10", "Outro valor"],
    marcados: ["Até R$ 10"],
  },
  {
    titulo: "Internet durante a atividade",
    tipo: "unica" as const,
    opcoes: ["Sim", "Limitada", "Não"],
    marcados: ["Sim"],
  },
  {
    titulo: "Horários possíveis",
    tipo: "multipla" as const,
    opcoes: ["Manhã", "Tarde", "Fim de tarde", "Noite"],
    marcados: ["Fim de tarde"],
  },
];

/* ---------------------------------------------- barreiras / facilitadores */

export const fatores = [
  { id: "ruido", nome: "Ruído intenso", padrao: "dificulta" },
  { id: "mapa", nome: "Celular com mapa", padrao: "ajuda" },
  { id: "rota", nome: "Mudança de rota", padrao: "dificulta" },
  { id: "lotacao", nome: "Ônibus lotado", padrao: "depende" },
  { id: "apoio", nome: "Apoio remoto por mensagem", padrao: "ajuda" },
];

export const respostasFator = ["dificulta", "ajuda", "depende da situação"];

/* ------------------------------------------------- comparação de opções */

export type Opcao = {
  id: string;
  nome: string;
  criterios: { rotulo: string; valor: string }[];
};

export const opcoes: Opcao[] = [
  {
    id: "onibus",
    nome: "Ônibus",
    criterios: [
      { rotulo: "Custo", valor: "baixo" },
      { rotulo: "Tempo", valor: "45 min" },
      { rotulo: "Ruído", valor: "alto" },
      { rotulo: "Mudanças", valor: "1" },
      { rotulo: "Previsibilidade", valor: "média" },
    ],
  },
  {
    id: "aplicativo",
    nome: "Transporte por aplicativo",
    criterios: [
      { rotulo: "Custo", valor: "alto" },
      { rotulo: "Tempo", valor: "25 min" },
      { rotulo: "Ruído", valor: "menor" },
      { rotulo: "Mudanças", valor: "0" },
      { rotulo: "Previsibilidade", valor: "alta" },
    ],
  },
  {
    id: "caminhada",
    nome: "Caminhada com apoio",
    criterios: [
      { rotulo: "Custo", valor: "sem custo" },
      { rotulo: "Tempo", valor: "60 min" },
      { rotulo: "Ruído", valor: "variável" },
      { rotulo: "Mudanças", valor: "0" },
      { rotulo: "Previsibilidade", valor: "média" },
    ],
  },
];

/* ------------------------------------------------------- habilidades (8) */

export const habilidades = [
  "Planejar o trajeto",
  "Reconhecer o ponto de descida",
  "Pedir ajuda oralmente",
  "Pedir ajuda por mensagem",
  "Preparar-se para mudanças",
];

export const jaConsigo = ["Utilizar mapas simples", "Enviar mensagens"];

/* ------------------------------------------------------- estratégias (9) */

export type Estrategia = {
  id: string;
  titulo: string;
  motivo: string;
};

export const estrategias: Estrategia[] = [
  {
    id: "mensagem",
    titulo: "Preparar uma mensagem para pedir informação",
    motivo: "Apareceu porque você informou preferência por comunicação escrita.",
  },
  {
    id: "rota-alternativa",
    titulo: "Salvar uma rota alternativa antes de sair",
    motivo: "Apareceu porque você indicou que mudanças de rota dificultam.",
  },
  {
    id: "protetor",
    titulo: "Levar protetor auditivo para o trajeto",
    motivo: "Apareceu porque você indicou desconforto com ruído intenso.",
  },
];

export const respostasEstrategia = [
  "Quero utilizar",
  "Talvez",
  "Já utilizei",
  "Não funciona para mim",
  "Quero adaptar",
];

export const formasAdaptacao = [
  "Mostrar mensagem no celular",
  "Enviar mensagem antes",
  "Pedir apoio de outra pessoa",
  "Escrever outra forma",
];

/* -------------------------------------------------------- biblioteca (10) */

export type Conteudo = {
  id: string;
  titulo: string;
  categoria: string;
  minutos: number;
  resumo: string;
  passos: string[];
};

export const conteudos: Conteudo[] = [
  {
    id: "rota-alternativa",
    titulo: "Como preparar uma rota alternativa",
    categoria: "Mobilidade",
    minutos: 2,
    resumo:
      "Uma rota alternativa ajuda quando a primeira opção não está disponível.",
    passos: [
      "Salve outro trajeto.",
      "Identifique um ponto de retorno.",
      "Defina quem pode ajudar.",
      "Considere interromper.",
    ],
  },
  {
    id: "pedir-informacao",
    titulo: "Como pedir informação por mensagem",
    categoria: "Comunicação",
    minutos: 2,
    resumo:
      "Uma mensagem pronta reduz o esforço de falar em um momento de tensão.",
    passos: [
      "Escreva a pergunta antes de sair.",
      "Use uma frase curta e direta.",
      "Deixe a mensagem salva no celular.",
      "Combine quem responde, se precisar.",
    ],
  },
  {
    id: "ruido",
    titulo: "Como reduzir o impacto do ruído",
    categoria: "Sensorial",
    minutos: 3,
    resumo:
      "Pequenos ajustes podem tornar um ambiente intenso mais suportável.",
    passos: [
      "Escolha horários com menos movimento.",
      "Leve protetor auditivo ou fone.",
      "Combine pausas no trajeto.",
      "Identifique um lugar mais calmo.",
    ],
  },
  {
    id: "pausa",
    titulo: "Quando fazer uma pausa",
    categoria: "Autorregulação",
    minutos: 2,
    resumo: "Pausar é parte do plano, não uma falha do plano.",
    passos: [
      "Reconheça sinais de cansaço.",
      "Escolha antes onde pode parar.",
      "Avise a pessoa de apoio, se quiser.",
      "Retome no seu tempo.",
    ],
  },
];

/* ------------------------------------------------------- preparação (11) */

export const planoResumo = {
  antes: [
    "celular carregado",
    "cartão de transporte",
    "rota principal",
    "rota alternativa",
    "protetor auditivo",
  ],
  durante: [
    "acompanhar pontos de referência",
    "pedir ajuda por mensagem, se preciso",
  ],
  seMudar: [
    "utilizar rota alternativa",
    "avisar pessoa de apoio",
    "interromper, se necessário",
  ],
};

/* -------------------------------------------------------- simulação (12) */

export const opcoesSimulacao = [
  "Não quero simular",
  "Revisar a sequência",
  "Praticar pedido de ajuda",
  "Visualizar mudança de rota",
];

export const respostasSituacao = [
  "Perguntar oralmente",
  "Mostrar uma mensagem no celular",
  "Enviar mensagem para apoio",
  "Interromper a simulação",
];

/* --------------------------------------------------------- registro (13) */

export const resultadosExperiencia = [
  "Realizei como planejei",
  "Realizei com mudanças",
  "Realizei parcialmente",
  "Não foi possível",
  "Decidi não realizar",
  "Precisei interromper",
  "Quero registrar depois",
];

export const ajudou = ["Protetor auditivo", "Rota salva", "Apoio por mensagem"];
export const dificultou = ["Lotação", "Identificação do ponto", "Atraso do ônibus"];

/* --------------------------------------------------------- revisão (14) */

export const revisaoEstrategias = [
  { titulo: "Rota alternativa salva", situacao: "Funcionou" },
  { titulo: "Mensagem pronta para pedir informação", situacao: "Funcionou em parte" },
  { titulo: "Protetor auditivo", situacao: "Funcionou" },
  { titulo: "Sair no horário planejado", situacao: "Quero adaptar" },
];

export const decisoesRevisao = ["Manter", "Adaptar", "Deixar de usar"];

export const proximosPassos = [
  "Repetir o trajeto com adaptações",
  "Repetir em outro horário",
  "Fazer um trecho menor",
  "Escolher outro objetivo",
  "Pausar por agora",
];

/* ----------------------------------------------------- linha do tempo (16) */

export type RegistroLinha = {
  data: string;
  tipo: string;
  titulo: string;
  descricao: string;
};

export const linhaDoTempo: RegistroLinha[] = [
  {
    data: "24 JUL",
    tipo: "Objetivos",
    titulo: "Objetivo criado",
    descricao: "Chegar à faculdade com mais autonomia",
  },
  {
    data: "25 JUL",
    tipo: "Estratégias",
    titulo: "Estratégias escolhidas",
    descricao: "Rota salva, proteção auditiva e apoio por mensagem",
  },
  {
    data: "26 JUL",
    tipo: "Experiências",
    titulo: "Experiência realizada",
    descricao: "Percurso feito com mudanças",
  },
  {
    data: "26 JUL",
    tipo: "Estratégias",
    titulo: "Estratégia adaptada",
    descricao: "Sair 35 minutos antes",
  },
  {
    data: "27 JUL",
    tipo: "Dúvidas",
    titulo: "Dúvida registrada",
    descricao: "Como saber se o ônibus mudou de itinerário?",
  },
  {
    data: "28 JUL",
    tipo: "Conteúdos",
    titulo: "Conteúdo salvo",
    descricao: "Como preparar uma rota alternativa",
  },
];

export const filtrosLinha = [
  "Todos",
  "Objetivos",
  "Experiências",
  "Estratégias",
  "Dúvidas",
  "Conteúdos",
];
