import { useCallback, useSyncExternalStore } from "react";

/**
 * Estado funcional do percurso VIVA — apenas armazenamento local.
 *
 * Sem backend, sem autenticação, sem IA, sem APIs externas.
 * Os dados são fictícios e servem para demonstrar o funcionamento
 * (documentos 05, 07, 08, 10 e 16). Nenhum dado real de saúde é usado.
 *
 * Relações previstas (documento 08):
 *   preparação → atividade → experiência → reflexão → estratégia
 *   experiência → dúvida ; estratégia → preparação futura
 */

export type AreaFuncional =
  "Deslocamento" | "Saúde" | "Compras" | "Convívio" | "Estudo e trabalho" | "Casa";

export type EstadoDoProximoPasso =
  | "disponivel"
  | "em-preparacao"
  | "pausado"
  | "em-andamento"
  | "pronto-para-reflexao"
  | "concluido"
  | "indisponivel"
  | "sem-atividade";

export type NivelDePreparacao = "pouca" | "media" | "maior";

export type Atividade = {
  id: string;
  titulo: string;
  descricao: string;
  area: AreaFuncional;
  duracao?: string;
  preparacao: NivelDePreparacao;
  estado: EstadoDoProximoPasso;
  /** Formas diferentes de participar da mesma atividade. */
  alternativas: string[];
};

export type Preparacao = {
  id: string;
  atividadeId: string;
  atividadeTitulo: string;
  objetivo?: string;
  contexto?: string;
  duracao?: string;
  estrategiaIds: string[];
  comoEstou: {
    energia?: number;
    desconforto?: number;
    previsibilidade?: number;
    apoio?: string;
    disposicao?: string;
  };
  alternativaEscolhida?: string;
  apoio?: string;
  podePausar?: boolean;
  decisao?: string;
  etapa: number;
  atualizadaEm: string;
};

export type Estrategia = {
  id: string;
  nome: string;
  descricao: string;
  quandoAjuda: string;
  area: AreaFuncional;
  comoUsar: string;
  observacoes?: string;
  queroExperimentar: boolean;
  jaUtilizei: boolean;
  foiUtil: boolean;
};

export type Experiencia = {
  id: string;
  atividade: string;
  onde?: string;
  quando: string;
  planejado?: string;
  aconteceu?: string;
  ajudou?: string;
  dificultou?: string;
  mudouPlano?: string;
  fezPausa?: string;
  teveApoio?: string;
  lembrarDepois?: string;
  reflexaoId?: string;
  duvidaIds: string[];
  atualizadaEm: string;
};

export type Reflexao = {
  id: string;
  experienciaId: string;
  respostas: Record<string, string>;
  concluidaEm?: string;
};

export type StatusDuvida =
  "quero-lembrar" | "quero-pesquisar" | "quero-conversar" | "respondida" | "arquivada";

export type Duvida = {
  id: string;
  texto: string;
  contexto?: string;
  area?: AreaFuncional;
  conversarCom?: string;
  prioridade: "quando-der" | "em-breve" | "importante-para-mim";
  observacoes?: string;
  status: StatusDuvida;
  experienciaId?: string;
  conteudoId?: string;
};

export type Continuidade = {
  ultimaAtividadeId?: string;
  ultimaVisitaEm?: string;
};

export type EstadoPercurso = {
  atividades: Atividade[];
  preparacoes: Preparacao[];
  estrategias: Estrategia[];
  experiencias: Experiencia[];
  reflexoes: Reflexao[];
  duvidas: Duvida[];
  continuidade: Continuidade;
};

/* -------------------------------------------------- dados de demonstração */

export const rotulosDeEstado: Record<EstadoDoProximoPasso, string> = {
  disponivel: "Esta atividade está disponível",
  "em-preparacao": "Preparação iniciada",
  pausado: "Pausado — retome quando fizer sentido",
  "em-andamento": "Em andamento",
  "pronto-para-reflexao": "Há uma reflexão disponível",
  concluido: "Você registrou esta experiência",
  indisponivel: "Não disponível nesta demonstração",
  "sem-atividade": "Não há atividade sugerida agora",
};

export const rotulosDePreparacao: Record<NivelDePreparacao, string> = {
  pouca: "Precisa de pouca preparação",
  media: "Precisa de alguma preparação",
  maior: "Costuma pedir mais preparação",
};

export const rotulosDeStatusDuvida: Record<StatusDuvida, string> = {
  "quero-lembrar": "Quero lembrar",
  "quero-pesquisar": "Quero pesquisar",
  "quero-conversar": "Quero conversar com alguém",
  respondida: "Respondida",
  arquivada: "Arquivada",
};

export const estrategiasSugeridas: Omit<Estrategia, "id">[] = [
  {
    nome: "Escolher horários mais tranquilos",
    descricao: "Ir ao local em um horário com menos gente e menos ruído.",
    quandoAjuda: "Ambientes movimentados ou barulhentos",
    area: "Compras",
    comoUsar: "Verificar antes qual horário costuma ser mais calmo.",
    queroExperimentar: true,
    jaUtilizei: false,
    foiUtil: false,
  },
  {
    nome: "Preparar perguntas por escrito",
    descricao: "Deixar as perguntas anotadas antes de uma conversa.",
    quandoAjuda: "Consultas, atendimentos e conversas com prazo curto",
    area: "Saúde",
    comoUsar: "Escrever no celular ou em papel e levar junto.",
    queroExperimentar: false,
    jaUtilizei: true,
    foiUtil: true,
  },
  {
    nome: "Fazer uma pausa antes de continuar",
    descricao: "Sair alguns minutos do ambiente e voltar depois.",
    quandoAjuda: "Quando o ambiente fica intenso demais",
    area: "Convívio",
    comoUsar: "Combinar consigo mesmo um lugar de pausa antes de começar.",
    queroExperimentar: false,
    jaUtilizei: true,
    foiUtil: true,
  },
  {
    nome: "Utilizar uma rota alternativa",
    descricao: "Ter um segundo caminho pensado antes de sair.",
    quandoAjuda: "Deslocamentos com transporte imprevisível",
    area: "Deslocamento",
    comoUsar: "Anotar a alternativa junto do plano principal.",
    queroExperimentar: true,
    jaUtilizei: false,
    foiUtil: false,
  },
  {
    nome: "Levar um objeto de conforto",
    descricao: "Levar algo que ajuda a se regular: fone, água, objeto tátil.",
    quandoAjuda: "Situações longas ou pouco previsíveis",
    area: "Deslocamento",
    comoUsar: "Deixar preparado na véspera.",
    queroExperimentar: true,
    jaUtilizei: false,
    foiUtil: false,
  },
  {
    nome: "Pedir instruções em etapas",
    descricao: "Pedir que a informação venha em partes menores.",
    quandoAjuda: "Atendimentos com muitas informações de uma vez",
    area: "Saúde",
    comoUsar: "Dizer: “pode me explicar uma parte de cada vez?”.",
    queroExperimentar: true,
    jaUtilizei: false,
    foiUtil: false,
  },
  {
    nome: "Avisar previamente sobre uma necessidade",
    descricao: "Contar antes o que ajuda você naquela situação.",
    quandoAjuda: "Consultas, atendimentos e visitas",
    area: "Convívio",
    comoUsar: "Enviar mensagem antes ou avisar na chegada.",
    queroExperimentar: false,
    jaUtilizei: false,
    foiUtil: false,
  },
  {
    nome: "Dividir uma tarefa em partes menores",
    descricao: "Fazer só uma parte hoje e o restante em outro momento.",
    quandoAjuda: "Atividades longas ou com muitas etapas",
    area: "Casa",
    comoUsar: "Escolher qual parte fazer primeiro.",
    queroExperimentar: true,
    jaUtilizei: false,
    foiUtil: false,
  },
];

export const apoiosDePreparacao = [
  "Levar fones ou protetor auricular",
  "Escolher horário com menor movimento",
  "Preparar uma rota alternativa",
  "Levar água",
  "Avisar uma pessoa de confiança",
  "Escrever perguntas antes",
  "Combinar uma pausa",
  "Utilizar comunicação por texto",
  "Pedir acompanhamento",
];

function estadoInicial(): EstadoPercurso {
  const estrategias = estrategiasSugeridas.map((e, i) => ({
    ...e,
    id: `estrategia-${i + 1}`,
  }));

  return {
    atividades: [
      {
        id: "trajeto-conhecido",
        titulo: "Preparar um trajeto conhecido",
        descricao: "Organizar um percurso que você já fez outras vezes.",
        area: "Deslocamento",
        duracao: "cerca de 40 minutos",
        preparacao: "media",
        estado: "disponivel",
        alternativas: [
          "Fazer o trajeto acompanhado por alguém de confiança",
          "Fazer apenas parte do caminho e voltar",
          "Escolher um horário de menor movimento",
          "Preparar hoje e realizar em outro dia",
        ],
      },
      {
        id: "perguntas-consulta",
        titulo: "Organizar perguntas para uma consulta",
        descricao: "Deixar por escrito o que você quer perguntar.",
        area: "Saúde",
        duracao: "cerca de 15 minutos",
        preparacao: "pouca",
        estado: "em-preparacao",
        alternativas: [
          "Escrever apenas uma pergunta",
          "Pedir que alguém escreva junto com você",
          "Enviar as perguntas por mensagem antes",
          "Deixar para outro momento",
        ],
      },
      {
        id: "compra-simples",
        titulo: "Planejar uma compra simples",
        descricao: "Montar uma lista curta e escolher onde comprar.",
        area: "Compras",
        duracao: "cerca de 30 minutos",
        preparacao: "media",
        estado: "pausado",
        alternativas: [
          "Montar a lista e comprar acompanhado",
          "Escolher um mercado já conhecido",
          "Ir em horário de menor movimento",
          "Utilizar retirada no local",
          "Apenas visitar o ambiente, sem comprar",
          "Preparar hoje e deixar a compra para outro dia",
        ],
      },
      {
        id: "ambiente-intenso",
        titulo: "Escolher uma estratégia para ambiente intenso",
        descricao: "Decidir antes o que pode ajudar em um lugar movimentado.",
        area: "Convívio",
        duracao: "cerca de 10 minutos",
        preparacao: "pouca",
        estado: "disponivel",
        alternativas: [
          "Escolher uma única estratégia para experimentar",
          "Combinar uma pausa com alguém",
          "Ficar por pouco tempo e sair quando quiser",
        ],
      },
      {
        id: "registrar-experiencia",
        titulo: "Registrar como foi uma experiência",
        descricao: "Guardar o que aconteceu, com as suas palavras.",
        area: "Estudo e trabalho",
        duracao: "cerca de 10 minutos",
        preparacao: "pouca",
        estado: "pronto-para-reflexao",
        alternativas: [
          "Registrar apenas uma frase",
          "Registrar por etapas, ao longo do dia",
          "Registrar depois, quando quiser",
        ],
      },
    ],
    preparacoes: [
      {
        id: "preparacao-1",
        atividadeId: "perguntas-consulta",
        atividadeTitulo: "Organizar perguntas para uma consulta",
        objetivo: "Sair da consulta com as minhas dúvidas respondidas.",
        contexto: "Unidade de saúde do bairro",
        duracao: "cerca de 15 minutos",
        estrategiaIds: ["estrategia-2", "estrategia-6"],
        comoEstou: { energia: 6, desconforto: 3, previsibilidade: 5 },
        alternativaEscolhida: "Escrever apenas uma pergunta",
        apoio: "Minha irmã por mensagem",
        podePausar: true,
        decisao: "Quero começar hoje",
        etapa: 2,
        atualizadaEm: "2026-07-28",
      },
    ],
    estrategias,
    experiencias: [
      {
        id: "experiencia-1",
        atividade: "Compra pequena no mercado do bairro",
        onde: "Mercado perto de casa",
        quando: "2026-07-26",
        planejado: "Comprar cinco itens da lista.",
        aconteceu: "Comprei quatro itens e saí antes da fila aumentar.",
        ajudou: "Ir em horário mais tranquilo e levar fones.",
        dificultou: "O som do ambiente aumentou perto do caixa.",
        mudouPlano: "Sim, deixei um item para depois.",
        fezPausa: "Sim, parei alguns minutos do lado de fora.",
        teveApoio: "Não precisei desta vez.",
        lembrarDepois: "Levar a lista já separada por corredor.",
        duvidaIds: ["duvida-1"],
        atualizadaEm: "2026-07-26",
      },
    ],
    reflexoes: [],
    duvidas: [
      {
        id: "duvida-1",
        texto: "Posso pedir para o atendimento ser em um lugar mais silencioso?",
        contexto: "Surgiu durante uma compra no mercado",
        area: "Compras",
        conversarCom: "Profissional de saúde",
        prioridade: "quando-der",
        status: "quero-conversar",
        experienciaId: "experiencia-1",
      },
    ],
    continuidade: {
      ultimaAtividadeId: "perguntas-consulta",
      ultimaVisitaEm: "2026-07-28",
    },
  };
}

/* ------------------------------------------- cenários de demonstração (17) */

export type Cenario = "primeiro-acesso" | "atividade-iniciada" | "apos-experiencia";

export const rotulosDeCenario: Record<Cenario, string> = {
  "primeiro-acesso": "Primeiro acesso",
  "atividade-iniciada": "Com atividade iniciada",
  "apos-experiencia": "Depois de uma experiência",
};

function estadoPrimeiroAcesso(): EstadoPercurso {
  const base = estadoInicial();
  return {
    atividades: base.atividades.map((a) => ({ ...a, estado: "disponivel" })),
    preparacoes: [],
    estrategias: [],
    experiencias: [],
    reflexoes: [],
    duvidas: [],
    continuidade: {},
  };
}

function estadoAposExperiencia(): EstadoPercurso {
  const base = estadoInicial();
  return {
    ...base,
    atividades: base.atividades.map((a) =>
      a.id === "perguntas-consulta" ? { ...a, estado: "pronto-para-reflexao" } : a,
    ),
    experiencias: [
      {
        id: "experiencia-2",
        atividade: "Consulta na unidade de saúde do bairro",
        onde: "Unidade de saúde do bairro",
        quando: "2026-07-29",
        planejado: "Levar as perguntas por escrito.",
        aconteceu: "Consegui fazer duas das três perguntas.",
        ajudou: "Ter as perguntas anotadas antes.",
        dificultou: "A sala de espera estava cheia.",
        duvidaIds: [],
        atualizadaEm: "2026-07-29",
      },
      ...base.experiencias,
    ],
    continuidade: {
      ultimaAtividadeId: "perguntas-consulta",
      ultimaVisitaEm: "2026-07-29",
    },
  };
}

export function estadoDoCenario(cenario: Cenario): EstadoPercurso {
  if (cenario === "primeiro-acesso") return estadoPrimeiroAcesso();
  if (cenario === "apos-experiencia") return estadoAposExperiencia();
  return estadoInicial();
}

/* ------------------------------------------------------------ armazenamento */

const CHAVE = "viva:percurso:v1";

let estado: EstadoPercurso = estadoInicial();
let carregado = false;
const ouvintes = new Set<() => void>();

function ler(): EstadoPercurso {
  try {
    const bruto = window.localStorage.getItem(CHAVE);
    if (!bruto) return estadoInicial();
    return { ...estadoInicial(), ...(JSON.parse(bruto) as EstadoPercurso) };
  } catch {
    return estadoInicial();
  }
}

function gravar(proximo: EstadoPercurso) {
  estado = proximo;
  try {
    window.localStorage.setItem(CHAVE, JSON.stringify(proximo));
  } catch {
    /* armazenamento indisponível — a demonstração segue em memória */
  }
  ouvintes.forEach((o) => o());
}

function assinar(ouvinte: () => void) {
  if (!carregado) {
    carregado = true;
    estado = ler();
  }
  ouvintes.add(ouvinte);
  ouvinte();
  return () => {
    ouvintes.delete(ouvinte);
  };
}

const instantaneoServidor = estadoInicial();

export function novoId(prefixo: string) {
  return `${prefixo}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

/** Acesso ao percurso guardado neste dispositivo. */
export function usePercurso() {
  const dados = useSyncExternalStore(
    assinar,
    () => estado,
    () => instantaneoServidor,
  );

  const atualizar = useCallback((mudanca: (anterior: EstadoPercurso) => EstadoPercurso) => {
    gravar(mudanca(estado));
  }, []);

  const salvarPreparacao = useCallback(
    (preparacao: Preparacao) =>
      atualizar((a) => ({
        ...a,
        preparacoes: a.preparacoes.some((p) => p.id === preparacao.id)
          ? a.preparacoes.map((p) => (p.id === preparacao.id ? preparacao : p))
          : [preparacao, ...a.preparacoes],
        atividades: a.atividades.map((at) =>
          at.id === preparacao.atividadeId && at.estado === "disponivel"
            ? { ...at, estado: "em-preparacao" }
            : at,
        ),
        continuidade: {
          ultimaAtividadeId: preparacao.atividadeId,
          ultimaVisitaEm: preparacao.atualizadaEm,
        },
      })),
    [atualizar],
  );

  const removerPreparacao = useCallback(
    (id: string) =>
      atualizar((a) => ({
        ...a,
        preparacoes: a.preparacoes.filter((p) => p.id !== id),
      })),
    [atualizar],
  );

  const definirEstadoDaAtividade = useCallback(
    (id: string, estadoNovo: EstadoDoProximoPasso) =>
      atualizar((a) => ({
        ...a,
        atividades: a.atividades.map((at) => (at.id === id ? { ...at, estado: estadoNovo } : at)),
        continuidade: { ...a.continuidade, ultimaAtividadeId: id },
      })),
    [atualizar],
  );

  const salvarEstrategia = useCallback(
    (estrategia: Estrategia) =>
      atualizar((a) => ({
        ...a,
        estrategias: a.estrategias.some((e) => e.id === estrategia.id)
          ? a.estrategias.map((e) => (e.id === estrategia.id ? estrategia : e))
          : [estrategia, ...a.estrategias],
      })),
    [atualizar],
  );

  const removerEstrategia = useCallback(
    (id: string) =>
      atualizar((a) => ({
        ...a,
        estrategias: a.estrategias.filter((e) => e.id !== id),
      })),
    [atualizar],
  );

  const salvarExperiencia = useCallback(
    (experiencia: Experiencia) =>
      atualizar((a) => ({
        ...a,
        experiencias: a.experiencias.some((e) => e.id === experiencia.id)
          ? a.experiencias.map((e) => (e.id === experiencia.id ? experiencia : e))
          : [experiencia, ...a.experiencias],
      })),
    [atualizar],
  );

  const removerExperiencia = useCallback(
    (id: string) =>
      atualizar((a) => ({
        ...a,
        experiencias: a.experiencias.filter((e) => e.id !== id),
      })),
    [atualizar],
  );

  const salvarReflexao = useCallback(
    (reflexao: Reflexao) =>
      atualizar((a) => ({
        ...a,
        reflexoes: a.reflexoes.some((r) => r.id === reflexao.id)
          ? a.reflexoes.map((r) => (r.id === reflexao.id ? reflexao : r))
          : [reflexao, ...a.reflexoes],
        experiencias: a.experiencias.map((e) =>
          e.id === reflexao.experienciaId ? { ...e, reflexaoId: reflexao.id } : e,
        ),
      })),
    [atualizar],
  );

  const salvarDuvida = useCallback(
    (duvida: Duvida) =>
      atualizar((a) => ({
        ...a,
        duvidas: a.duvidas.some((d) => d.id === duvida.id)
          ? a.duvidas.map((d) => (d.id === duvida.id ? duvida : d))
          : [duvida, ...a.duvidas],
        experiencias: duvida.experienciaId
          ? a.experiencias.map((e) =>
              e.id === duvida.experienciaId && !e.duvidaIds.includes(duvida.id)
                ? { ...e, duvidaIds: [...e.duvidaIds, duvida.id] }
                : e,
            )
          : a.experiencias,
      })),
    [atualizar],
  );

  const removerDuvida = useCallback(
    (id: string) =>
      atualizar((a) => ({
        ...a,
        duvidas: a.duvidas.filter((d) => d.id !== id),
      })),
    [atualizar],
  );

  const restaurarDemonstracao = useCallback(() => gravar(estadoInicial()), []);

  /** Troca o cenário fictício apresentado na demonstração. */
  const aplicarCenario = useCallback((cenario: Cenario) => gravar(estadoDoCenario(cenario)), []);

  return {
    ...dados,
    salvarPreparacao,
    removerPreparacao,
    definirEstadoDaAtividade,
    salvarEstrategia,
    removerEstrategia,
    salvarExperiencia,
    removerExperiencia,
    salvarReflexao,
    salvarDuvida,
    removerDuvida,
    restaurarDemonstracao,
    aplicarCenario,
  };
}
