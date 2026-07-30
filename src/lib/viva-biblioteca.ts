import { useCallback, useSyncExternalStore } from "react";

/**
 * Biblioteca VIVA — estado local (Fase 4).
 *
 * Tudo o que a pessoa salva, adapta, relaciona ou reflete fica apenas neste
 * dispositivo, em localStorage. Sem backend, sem login, sem API, sem IA e sem
 * qualquer interpretação automática do que foi escrito (documentos 03, 15, 16).
 *
 * Não existem pontuações, estrelas, sequências de dias ou estatísticas de
 * produtividade. As marcações são pessoais e reversíveis.
 */

const CHAVE = "viva:biblioteca:v1";

export type MarcacaoDeUtilidade = "util" | "muito-util" | "revisar";

export const rotulosDeUtilidade: Record<MarcacaoDeUtilidade, string> = {
  util: "Foi útil",
  "muito-util": "Foi muito útil",
  revisar: "Quero revisar novamente",
};

export type AdaptacaoPessoal = {
  observacoes: string;
  resumoPessoal: string;
  lembrete: string;
  /** Índices de blocos que a pessoa preferiu ocultar na sua versão. */
  blocosOcultos: number[];
  /** Índices de blocos destacados na sua versão. */
  blocosDestacados: number[];
  atualizadaEm: string;
};

export type ReflexaoDeConteudo = {
  id: string;
  conteudoId: string;
  respostas: Record<string, string>;
  criadaEm: string;
  atualizadaEm: string;
  percurso?: string;
};

export type ItemDoPlano = {
  id: string;
  conteudoId: string;
  quando: string;
  criadoEm: string;
};

export type RelacaoComExperiencia = {
  id: string;
  conteudoId: string;
  experiencia: string;
  observacao?: string;
  criadaEm: string;
};

export type EstrategiaAdotada = {
  id: string;
  nome: string;
  comoAjuda: string;
  conteudoId: string;
  adicionadaEm: string;
};

export type Acesso = { ultimoEm: string; vezes: number };

export type EstadoDaBiblioteca = {
  salvos: string[];
  uteis: Record<string, MarcacaoDeUtilidade>;
  acessos: Record<string, Acesso>;
  adaptacoes: Record<string, AdaptacaoPessoal>;
  reflexoes: ReflexaoDeConteudo[];
  plano: ItemDoPlano[];
  relacoes: RelacaoComExperiencia[];
  estrategias: EstrategiaAdotada[];
  /** Conforto de leitura, guardado por dispositivo. */
  leitura: {
    baixaEstimulacao: boolean;
    fonteAmpliada: boolean;
  };
};

export const bibliotecaVazia: EstadoDaBiblioteca = {
  salvos: [],
  uteis: {},
  acessos: {},
  adaptacoes: {},
  reflexoes: [],
  plano: [],
  relacoes: [],
  estrategias: [],
  leitura: { baixaEstimulacao: false, fonteAmpliada: false },
};

export const adaptacaoVazia: AdaptacaoPessoal = {
  observacoes: "",
  resumoPessoal: "",
  lembrete: "",
  blocosOcultos: [],
  blocosDestacados: [],
  atualizadaEm: "",
};

let estado: EstadoDaBiblioteca = bibliotecaVazia;
let carregado = false;
const ouvintes = new Set<() => void>();

function ler(): EstadoDaBiblioteca {
  if (typeof window === "undefined") return bibliotecaVazia;
  try {
    const bruto = window.localStorage.getItem(CHAVE);
    if (!bruto) return bibliotecaVazia;
    const dados = JSON.parse(bruto) as Partial<EstadoDaBiblioteca>;
    return {
      ...bibliotecaVazia,
      ...dados,
      leitura: { ...bibliotecaVazia.leitura, ...(dados.leitura ?? {}) },
    };
  } catch {
    return bibliotecaVazia;
  }
}

function gravar(novo: EstadoDaBiblioteca) {
  estado = novo;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(CHAVE, JSON.stringify(novo));
    } catch {
      /* espaço indisponível: a sessão continua funcionando em memória */
    }
  }
  ouvintes.forEach((o) => o());
}

function assinar(ouvinte: () => void) {
  if (!carregado) {
    carregado = true;
    estado = ler();
  }
  ouvintes.add(ouvinte);
  return () => ouvintes.delete(ouvinte);
}

const instantaneoServidor = bibliotecaVazia;

export function novoId(prefixo: string) {
  return `${prefixo}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 6)}`;
}

export function dataLegivel(iso: string) {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return "";
  }
}

/** Acesso à biblioteca pessoal guardada neste dispositivo. */
export function useBiblioteca() {
  const dados = useSyncExternalStore(
    assinar,
    () => estado,
    () => instantaneoServidor,
  );

  const atualizar = useCallback(
    (mudanca: (anterior: EstadoDaBiblioteca) => EstadoDaBiblioteca) =>
      gravar(mudanca(estado)),
    [],
  );

  const registrarAcesso = useCallback(
    (conteudoId: string) =>
      atualizar((a) => ({
        ...a,
        acessos: {
          ...a.acessos,
          [conteudoId]: {
            ultimoEm: new Date().toISOString(),
            vezes: (a.acessos[conteudoId]?.vezes ?? 0) + 1,
          },
        },
      })),
    [atualizar],
  );

  const alternarSalvo = useCallback(
    (conteudoId: string) =>
      atualizar((a) => ({
        ...a,
        salvos: a.salvos.includes(conteudoId)
          ? a.salvos.filter((id) => id !== conteudoId)
          : [conteudoId, ...a.salvos],
      })),
    [atualizar],
  );

  const marcarUtilidade = useCallback(
    (conteudoId: string, marcacao: MarcacaoDeUtilidade | null) =>
      atualizar((a) => {
        const uteis = { ...a.uteis };
        if (marcacao === null || uteis[conteudoId] === marcacao) {
          delete uteis[conteudoId];
        } else {
          uteis[conteudoId] = marcacao;
        }
        return { ...a, uteis };
      }),
    [atualizar],
  );

  const salvarAdaptacao = useCallback(
    (conteudoId: string, mudanca: Partial<AdaptacaoPessoal>) =>
      atualizar((a) => ({
        ...a,
        adaptacoes: {
          ...a.adaptacoes,
          [conteudoId]: {
            ...adaptacaoVazia,
            ...(a.adaptacoes[conteudoId] ?? {}),
            ...mudanca,
            atualizadaEm: new Date().toISOString(),
          },
        },
      })),
    [atualizar],
  );

  const apagarAdaptacao = useCallback(
    (conteudoId: string) =>
      atualizar((a) => {
        const adaptacoes = { ...a.adaptacoes };
        delete adaptacoes[conteudoId];
        return { ...a, adaptacoes };
      }),
    [atualizar],
  );

  const alternarBloco = useCallback(
    (conteudoId: string, indice: number, campo: "ocultos" | "destacados") =>
      atualizar((a) => {
        const atual = a.adaptacoes[conteudoId] ?? adaptacaoVazia;
        const chave = campo === "ocultos" ? "blocosOcultos" : "blocosDestacados";
        const lista = atual[chave];
        return {
          ...a,
          adaptacoes: {
            ...a.adaptacoes,
            [conteudoId]: {
              ...atual,
              [chave]: lista.includes(indice)
                ? lista.filter((i) => i !== indice)
                : [...lista, indice],
              atualizadaEm: new Date().toISOString(),
            },
          },
        };
      }),
    [atualizar],
  );

  const salvarReflexao = useCallback(
    (reflexao: Omit<ReflexaoDeConteudo, "criadaEm" | "atualizadaEm"> & {
      criadaEm?: string;
    }) =>
      atualizar((a) => {
        const agora = new Date().toISOString();
        const existe = a.reflexoes.some((r) => r.id === reflexao.id);
        return {
          ...a,
          reflexoes: existe
            ? a.reflexoes.map((r) =>
                r.id === reflexao.id
                  ? { ...r, ...reflexao, atualizadaEm: agora }
                  : r,
              )
            : [
                {
                  ...reflexao,
                  criadaEm: reflexao.criadaEm ?? agora,
                  atualizadaEm: agora,
                },
                ...a.reflexoes,
              ],
        };
      }),
    [atualizar],
  );

  const apagarReflexao = useCallback(
    (id: string) =>
      atualizar((a) => ({
        ...a,
        reflexoes: a.reflexoes.filter((r) => r.id !== id),
      })),
    [atualizar],
  );

  const adicionarAoPlano = useCallback(
    (conteudoId: string, quando: string) =>
      atualizar((a) => ({
        ...a,
        plano: [
          {
            id: novoId("plano"),
            conteudoId,
            quando,
            criadoEm: new Date().toISOString(),
          },
          ...a.plano.filter(
            (p) => !(p.conteudoId === conteudoId && p.quando === quando),
          ),
        ],
      })),
    [atualizar],
  );

  const removerDoPlano = useCallback(
    (id: string) =>
      atualizar((a) => ({ ...a, plano: a.plano.filter((p) => p.id !== id) })),
    [atualizar],
  );

  const relacionarComExperiencia = useCallback(
    (conteudoId: string, experiencia: string, observacao?: string) =>
      atualizar((a) => ({
        ...a,
        relacoes: [
          {
            id: novoId("relacao"),
            conteudoId,
            experiencia,
            observacao,
            criadaEm: new Date().toISOString(),
          },
          ...a.relacoes,
        ],
      })),
    [atualizar],
  );

  const removerRelacao = useCallback(
    (id: string) =>
      atualizar((a) => ({
        ...a,
        relacoes: a.relacoes.filter((r) => r.id !== id),
      })),
    [atualizar],
  );

  const adotarEstrategia = useCallback(
    (estrategia: Omit<EstrategiaAdotada, "adicionadaEm">) =>
      atualizar((a) =>
        a.estrategias.some((e) => e.id === estrategia.id)
          ? a
          : {
              ...a,
              estrategias: [
                { ...estrategia, adicionadaEm: new Date().toISOString() },
                ...a.estrategias,
              ],
            },
      ),
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

  const definirLeitura = useCallback(
    (mudanca: Partial<EstadoDaBiblioteca["leitura"]>) =>
      atualizar((a) => ({ ...a, leitura: { ...a.leitura, ...mudanca } })),
    [atualizar],
  );

  const apagarTudo = useCallback(() => gravar(bibliotecaVazia), []);

  return {
    dados,
    registrarAcesso,
    alternarSalvo,
    marcarUtilidade,
    salvarAdaptacao,
    apagarAdaptacao,
    alternarBloco,
    salvarReflexao,
    apagarReflexao,
    adicionarAoPlano,
    removerDoPlano,
    relacionarComExperiencia,
    removerRelacao,
    adotarEstrategia,
    removerEstrategia,
    definirLeitura,
    apagarTudo,
  };
}

/** Perguntas opcionais da reflexão (nenhuma resposta é obrigatória). */
export const perguntasDeReflexao = [
  { chave: "atencao", texto: "O que chamou sua atenção?" },
  { chave: "experimentar", texto: "Há algo que gostaria de experimentar?" },
  { chave: "lembrou", texto: "Este conteúdo lembra alguma experiência?" },
  { chave: "guardar", texto: "Gostaria de guardar alguma observação?" },
];
