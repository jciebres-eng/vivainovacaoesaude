/**
 * Repositórios do JourneyMatch — contratos desacoplados da interface.
 *
 * Nesta etapa todas as implementações são MOCK e locais (memória +
 * localStorage). Quando entrarem banco de dados, mapas reais, mídia e
 * compartilhamento, basta trocar a implementação: nenhum componente lê
 * arrays diretamente (documentos 03, 15 e 16).
 */
import {
  catalogoDeMatch,
  situacoesDeMatch,
} from "./dados-demo";
import {
  grupoPorCategoria,
  type CategoriaDeMatch,
  type Feedback,
  type ItemDeMatch,
  type Journey,
  type JourneyChoice,
  type JourneyStep,
  type PerfilDemonstrativo,
  type Situation,
  type UserPreference,
} from "./tipos";

/* ------------------------------------------------------------------ */
/* Contratos                                                           */
/* ------------------------------------------------------------------ */

export type SituationRepository = {
  listar(): Promise<Situation[]>;
  buscar(texto: string): Promise<Situation[]>;
  porId(id: string): Promise<Situation | null>;
  itens(categoria: CategoriaDeMatch): Promise<ItemDeMatch[]>;
};

export type JourneyRepository = {
  listar(): Promise<Journey[]>;
  porId(id: string): Promise<Journey | null>;
  criar(situacao: Situation): Promise<Journey>;
  salvar(jornada: Journey): Promise<Journey>;
  remover(id: string): Promise<void>;
};

export type ProfileRepository = {
  perfil(): Promise<PerfilDemonstrativo>;
  preferencias(): Promise<UserPreference[]>;
  definirPreferencia(chave: string, valor: string): Promise<UserPreference[]>;
};

export type MediaRepository = {
  /** Preparado para mídia real; hoje devolve uma descrição textual. */
  resolver(fonte: string): Promise<{ tipo: string; url: string | null; descricao: string }>;
};

export type LocationRepository = {
  /** Preparado para Google Maps; hoje devolve pontos de referência fictícios. */
  sugerirLugares(termo: string): Promise<{ id: string; nome: string; referencia: string }[]>;
  pontoAtual(): Promise<{ latitude: number; longitude: number } | null>;
};

export type SharingRepository = {
  /** Preparado para compartilhamento real; hoje gera um link simulado. */
  criarLinkTemporario(jornadaId: string): Promise<{ url: string; expiraEm: string }>;
  encerrar(jornadaId: string): Promise<void>;
};

/* ------------------------------------------------------------------ */
/* Utilidades locais                                                   */
/* ------------------------------------------------------------------ */

const CHAVE_JORNADAS = "viva.match.jornadas.v1";
const CHAVE_PREFERENCIAS = "viva.match.preferencias.v1";

function agora() {
  return new Date().toISOString();
}

export function novoId(prefixo: string) {
  return `${prefixo}-${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;
}

function lerLista<T>(chave: string, padrao: T): T {
  if (typeof window === "undefined") return padrao;
  try {
    const bruto = window.localStorage.getItem(chave);
    return bruto ? (JSON.parse(bruto) as T) : padrao;
  } catch {
    return padrao;
  }
}

function escrever(chave: string, valor: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(chave, JSON.stringify(valor));
  } catch {
    /* armazenamento indisponível: a experiência continua em memória */
  }
}

function normalizar(texto: string) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/** Etapas estruturais que existem em toda jornada. */
export function etapasBase(situacao: Situation): JourneyStep[] {
  return [
    {
      id: novoId("step"),
      grupo: "situacao",
      titulo: situacao.titulo,
      apoio: situacao.descricao,
      fixa: true,
      opcional: false,
      itemId: situacao.id,
      categoria: "situation",
    },
    {
      id: novoId("step"),
      grupo: "simulacao",
      titulo: "Simular antes de ir",
      apoio: "Uma passada rápida pelas etapas, sem compromisso.",
      fixa: false,
      opcional: true,
    },
    {
      id: novoId("step"),
      grupo: "realizacao",
      titulo: "Realizar no seu ritmo",
      apoio: "Uma etapa por vez, com pausa e saída sempre disponíveis.",
      fixa: true,
      opcional: false,
    },
    {
      id: novoId("step"),
      grupo: "feedback",
      titulo: "Registrar como foi",
      apoio: "Do jeito que você preferir, ou não registrar.",
      fixa: false,
      opcional: true,
    },
  ];
}

/* ------------------------------------------------------------------ */
/* Implementações mock                                                 */
/* ------------------------------------------------------------------ */

export class MockSituationRepository implements SituationRepository {
  async listar() {
    return situacoesDeMatch;
  }

  async buscar(texto: string) {
    const alvo = normalizar(texto).trim();
    if (!alvo) return situacoesDeMatch;
    return situacoesDeMatch.filter(
      (s) =>
        normalizar(s.titulo).includes(alvo) ||
        normalizar(s.descricao ?? "").includes(alvo) ||
        normalizar(s.contexto).includes(alvo),
    );
  }

  async porId(id: string) {
    return (
      situacoesDeMatch.find((s) => s.id === id || s.situacaoId === id) ?? null
    );
  }

  async itens(categoria: CategoriaDeMatch) {
    return catalogoDeMatch[categoria] as ItemDeMatch[];
  }
}

export class MockJourneyRepository implements JourneyRepository {
  async listar() {
    return lerLista<Journey[]>(CHAVE_JORNADAS, []);
  }

  async porId(id: string) {
    const todas = await this.listar();
    return todas.find((j) => j.id === id) ?? null;
  }

  async criar(situacao: Situation) {
    const jornada: Journey = {
      id: novoId("journey"),
      situacaoId: situacao.situacaoId,
      titulo: situacao.titulo,
      estado: "rascunho",
      criadoEm: agora(),
      atualizadoEm: agora(),
      escolhas: [
        {
          id: novoId("choice"),
          categoria: "situation",
          itemId: situacao.id,
          titulo: situacao.titulo,
          aceito: true,
          em: agora(),
        },
      ],
      etapas: etapasBase(situacao),
    };
    const todas = await this.listar();
    escrever(CHAVE_JORNADAS, [jornada, ...todas]);
    return jornada;
  }

  async salvar(jornada: Journey) {
    const atualizada: Journey = { ...jornada, atualizadoEm: agora() };
    const todas = await this.listar();
    const existe = todas.some((j) => j.id === jornada.id);
    escrever(
      CHAVE_JORNADAS,
      existe ? todas.map((j) => (j.id === jornada.id ? atualizada : j)) : [atualizada, ...todas],
    );
    return atualizada;
  }

  async remover(id: string) {
    const todas = await this.listar();
    escrever(
      CHAVE_JORNADAS,
      todas.filter((j) => j.id !== id),
    );
  }
}

export class MockProfileRepository implements ProfileRepository {
  async perfil() {
    return {
      id: "perfil-demo",
      nome: "Alex",
      frase: "Perfil único de demonstração. Todas as situações estão disponíveis.",
      preferencias: await this.preferencias(),
    };
  }

  async preferencias() {
    return lerLista<UserPreference[]>(CHAVE_PREFERENCIAS, []);
  }

  async definirPreferencia(chave: string, valor: string) {
    const atuais = await this.preferencias();
    const proximas = [...atuais.filter((p) => p.chave !== chave), { chave, valor }];
    escrever(CHAVE_PREFERENCIAS, proximas);
    return proximas;
  }
}

export class MockMediaRepository implements MediaRepository {
  async resolver(fonte: string) {
    return {
      tipo: fonte.startsWith("mock://") ? "demonstrativo" : "externo",
      url: null,
      descricao: "Mídia demonstrativa. Nesta etapa, nada é carregado de fora do aparelho.",
    };
  }
}

export class MockLocationRepository implements LocationRepository {
  async sugerirLugares(termo: string) {
    const base = termo.trim() || "ponto";
    return [
      { id: "lugar-1", nome: `${base} do bairro`, referencia: "Perto da praça" },
      { id: "lugar-2", nome: `${base} do centro`, referencia: "Ao lado do terminal" },
      { id: "lugar-3", nome: `${base} do shopping`, referencia: "Entrada principal" },
    ];
  }

  async pontoAtual() {
    return null;
  }
}

export class MockSharingRepository implements SharingRepository {
  async criarLinkTemporario(jornadaId: string) {
    return {
      url: `/acompanhar/${jornadaId}-demo`,
      expiraEm: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    };
  }

  async encerrar() {
    /* nada a fazer no mock */
  }
}

/* ------------------------------------------------------------------ */
/* Fonte de dados: aparelho ou nuvem                                   */
/* ------------------------------------------------------------------ */

const locais = {
  situacoes: new MockSituationRepository() as SituationRepository,
  jornadas: new MockJourneyRepository() as JourneyRepository,
  perfil: new MockProfileRepository() as ProfileRepository,
  midia: new MockMediaRepository() as MediaRepository,
  localizacao: new MockLocationRepository() as LocationRepository,
  compartilhamento: new MockSharingRepository() as SharingRepository,
};

let atuais = { ...locais };

/** Quem está identificado passa a guardar o percurso na nuvem da própria conta. */
export function usarNuvem(fontes: {
  situacoes: SituationRepository;
  jornadas: JourneyRepository;
  perfil: ProfileRepository;
  compartilhamento: SharingRepository;
}) {
  atuais = { ...locais, ...fontes };
}

/** Volta para o aparelho: modo demonstrativo, sem conta e sem servidor. */
export function usarAparelho() {
  atuais = { ...locais };
}

export const repositoriosLocais = locais;

/**
 * Ponto único de acesso. Nenhuma tela sabe se o dado vem do aparelho ou da
 * nuvem — a troca acontece aqui, em silêncio.
 */
export const repositorios = {
  get situacoes() {
    return atuais.situacoes;
  },
  get jornadas() {
    return atuais.jornadas;
  },
  get perfil() {
    return atuais.perfil;
  },
  get midia() {
    return atuais.midia;
  },
  get localizacao() {
    return atuais.localizacao;
  },
  get compartilhamento() {
    return atuais.compartilhamento;
  },
};


/** Aplica uma escolha aceita na jornada, criando a etapa correspondente. */
export function aplicarEscolha(jornada: Journey, item: ItemDeMatch, aceito: boolean): Journey {
  const escolha: JourneyChoice = {
    id: novoId("choice"),
    categoria: item.categoria,
    itemId: item.id,
    titulo: item.titulo,
    aceito,
    em: agora(),
  };
  const escolhas = [...jornada.escolhas, escolha];
  if (!aceito) return { ...jornada, escolhas };

  const etapa: JourneyStep = {
    id: novoId("step"),
    grupo: grupoPorCategoria[item.categoria],
    titulo: item.titulo,
    apoio: item.descricao,
    fixa: false,
    opcional: item.categoria === "information" || item.categoria === "training",
    itemId: item.id,
    categoria: item.categoria,
  };
  return { ...jornada, escolhas, etapas: [...jornada.etapas, etapa] };
}

/** Desfaz a última escolha registrada, removendo a etapa se houver. */
export function desfazerUltimaEscolha(jornada: Journey): {
  jornada: Journey;
  desfeita: JourneyChoice | null;
} {
  const ultima = [...jornada.escolhas].reverse().find((e) => e.categoria !== "situation");
  if (!ultima) return { jornada, desfeita: null };
  return {
    jornada: {
      ...jornada,
      escolhas: jornada.escolhas.filter((e) => e.id !== ultima.id),
      etapas: ultima.aceito
        ? jornada.etapas.filter((e) => !(e.itemId === ultima.itemId && !e.fixa))
        : jornada.etapas,
    },
    desfeita: ultima,
  };
}

export function registrarFeedback(jornada: Journey, feedback: Feedback): Journey {
  return { ...jornada, feedback, estado: "concluido" };
}
