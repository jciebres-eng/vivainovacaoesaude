/**
 * Percursos — núcleo único do copiloto.
 *
 * Um percurso nasce de uma intenção (falada, escrita ou escolhida), é editado
 * pela pessoa, pode ser realizado passo a passo, registrado e retomado depois.
 * Tudo é guardado apenas neste dispositivo, sem servidor e sem IA externa
 * (documentos 03, 09, 10 e 15).
 */
import { useCallback, useSyncExternalStore } from "react";

import { situacaoPorId, situacoes, type MeioDeDeslocamento, type Situacao } from "./viva-situacoes";

const CHAVE = "viva:percursos:v1";

export type EstadoDoPercurso = "rascunho" | "pronto" | "em-andamento" | "pausado" | "concluido";

export const rotulosDeEstado: Record<EstadoDoPercurso, string> = {
  rascunho: "Em construção",
  pronto: "Pronto quando você quiser",
  "em-andamento": "Em andamento",
  pausado: "Em pausa",
  concluido: "Concluído",
};

export type FaseDoPercurso = "preparar" | "aprender" | "ensaiar" | "realizar" | "registrar";

export const fasesDoPercurso: { id: FaseDoPercurso; titulo: string; convite: string }[] = [
  { id: "preparar", titulo: "Preparar", convite: "Organizar o que precisa existir antes." },
  { id: "aprender", titulo: "Aprender", convite: "Ler algo curto que ajude nesta situação." },
  { id: "ensaiar", titulo: "Ensaiar", convite: "Passar pelas etapas mentalmente, sem sair do lugar." },
  { id: "realizar", titulo: "Realizar", convite: "Um passo por vez, com pausa sempre disponível." },
  { id: "registrar", titulo: "Registrar", convite: "Contar como foi, com suas palavras." },
];

export type Etapa = {
  id: string;
  titulo: string;
  apoio: string;
  minutos: number;
  referencia?: string;
  concluida: boolean;
};

export type EstrategiaEscolhida = {
  id: string;
  titulo: string;
  frase: string;
  motivo: string;
};

export type Alternativa = { id: string; titulo: string; frase: string };

export type Registro = {
  id: string;
  criadoEm: number;
  comoFoi: string;
  ajudou: string;
  dificultou: string;
  ajuste: string;
};

export type Percurso = {
  id: string;
  titulo: string;
  situacaoId: string;
  intencao: string;
  criadoEm: number;
  atualizadoEm: number;
  origem: string;
  destino: string;
  meio: MeioDeDeslocamento;
  horario: string;
  etapas: Etapa[];
  estrategias: EstrategiaEscolhida[];
  alternativas: Alternativa[];
  conteudos: string[];
  observacoes: string;
  estado: EstadoDoPercurso;
  etapaAtual: number;
  favorito: boolean;
  registros: Registro[];
};

type Guardado = { percursos: Percurso[]; ativo: string | null };

const vazio: Guardado = { percursos: [], ativo: null };

let cache: Guardado = vazio;
let carregado = false;
const ouvintes = new Set<() => void>();

function ler(): Guardado {
  if (typeof window === "undefined") return vazio;
  try {
    const bruto = window.localStorage.getItem(CHAVE);
    if (!bruto) return vazio;
    const dados = JSON.parse(bruto) as Guardado;
    return { percursos: dados.percursos ?? [], ativo: dados.ativo ?? null };
  } catch {
    return vazio;
  }
}

function garantirCarga() {
  if (!carregado && typeof window !== "undefined") {
    cache = ler();
    carregado = true;
  }
  return cache;
}

function gravar(proximo: Guardado) {
  cache = proximo;
  carregado = true;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(CHAVE, JSON.stringify(proximo));
    } catch {
      /* espaço indisponível: a experiência continua em memória */
    }
  }
  ouvintes.forEach((o) => o());
}

function id() {
  return Math.random().toString(36).slice(2, 10);
}

function agora() {
  return Date.now();
}

function atualizarPercurso(percursoId: string, mudanca: (p: Percurso) => Percurso) {
  const atual = garantirCarga();
  gravar({
    ...atual,
    percursos: atual.percursos.map((p) =>
      p.id === percursoId ? { ...mudanca(p), atualizadoEm: agora() } : p,
    ),
  });
}

/** Cria um percurso a partir de uma situação do catálogo. Nada fica travado. */
export function criarPercurso(situacao: Situacao, intencao = ""): Percurso {
  const novo: Percurso = {
    id: id(),
    titulo: situacao.titulo,
    situacaoId: situacao.id,
    intencao,
    criadoEm: agora(),
    atualizadoEm: agora(),
    origem: situacao.origemSugerida,
    destino: situacao.destinoSugerido,
    meio: situacao.meioSugerido,
    horario: sugerirHorario(situacao.id) ?? situacao.horarioSugerido,
    etapas: situacao.etapas.map((e) => ({ ...e, concluida: false })),
    estrategias: [],
    alternativas: situacao.alternativas.slice(0, 2),
    conteudos: situacao.conteudos.slice(0, 2),
    observacoes: "",
    estado: "rascunho",
    etapaAtual: 0,
    favorito: false,
    registros: [],
  };
  const atual = garantirCarga();
  gravar({ percursos: [novo, ...atual.percursos], ativo: novo.id });
  return novo;
}

export const percursos = {
  criar: criarPercurso,

  duplicar(percursoId: string) {
    const atual = garantirCarga();
    const base = atual.percursos.find((p) => p.id === percursoId);
    if (!base) return null;
    const copia: Percurso = {
      ...base,
      id: id(),
      titulo: `${base.titulo} (nova versão)`,
      criadoEm: agora(),
      atualizadoEm: agora(),
      estado: "rascunho",
      etapaAtual: 0,
      registros: [],
      etapas: base.etapas.map((e) => ({ ...e, concluida: false })),
    };
    gravar({ percursos: [copia, ...atual.percursos], ativo: copia.id });
    return copia;
  },

  remover(percursoId: string) {
    const atual = garantirCarga();
    gravar({
      percursos: atual.percursos.filter((p) => p.id !== percursoId),
      ativo: atual.ativo === percursoId ? null : atual.ativo,
    });
  },

  definirAtivo(percursoId: string | null) {
    gravar({ ...garantirCarga(), ativo: percursoId });
  },

  editar(percursoId: string, campos: Partial<Pick<Percurso, "titulo" | "origem" | "destino" | "meio" | "horario" | "observacoes">>) {
    atualizarPercurso(percursoId, (p) => ({ ...p, ...campos }));
  },

  favoritar(percursoId: string, favorito: boolean) {
    atualizarPercurso(percursoId, (p) => ({ ...p, favorito }));
  },

  adicionarEtapa(percursoId: string, etapa: { titulo: string; apoio?: string; minutos?: number }) {
    atualizarPercurso(percursoId, (p) => ({
      ...p,
      etapas: [
        ...p.etapas,
        {
          id: id(),
          titulo: etapa.titulo,
          apoio: etapa.apoio ?? "",
          minutos: etapa.minutos ?? 10,
          concluida: false,
        },
      ],
    }));
  },

  editarEtapa(percursoId: string, etapaId: string, campos: Partial<Etapa>) {
    atualizarPercurso(percursoId, (p) => ({
      ...p,
      etapas: p.etapas.map((e) => (e.id === etapaId ? { ...e, ...campos } : e)),
    }));
  },

  removerEtapa(percursoId: string, etapaId: string) {
    atualizarPercurso(percursoId, (p) => ({
      ...p,
      etapas: p.etapas.filter((e) => e.id !== etapaId),
      etapaAtual: 0,
    }));
  },

  moverEtapa(percursoId: string, etapaId: string, direcao: -1 | 1) {
    atualizarPercurso(percursoId, (p) => {
      const i = p.etapas.findIndex((e) => e.id === etapaId);
      const j = i + direcao;
      if (i < 0 || j < 0 || j >= p.etapas.length) return p;
      const etapas = [...p.etapas];
      [etapas[i], etapas[j]] = [etapas[j], etapas[i]];
      return { ...p, etapas };
    });
  },

  alternarEstrategia(percursoId: string, estrategia: EstrategiaEscolhida) {
    atualizarPercurso(percursoId, (p) => ({
      ...p,
      estrategias: p.estrategias.some((e) => e.id === estrategia.id)
        ? p.estrategias.filter((e) => e.id !== estrategia.id)
        : [...p.estrategias, estrategia],
    }));
  },

  alternarConteudo(percursoId: string, conteudoId: string) {
    atualizarPercurso(percursoId, (p) => ({
      ...p,
      conteudos: p.conteudos.includes(conteudoId)
        ? p.conteudos.filter((c) => c !== conteudoId)
        : [...p.conteudos, conteudoId],
    }));
  },

  alternarAlternativa(percursoId: string, alternativa: Alternativa) {
    atualizarPercurso(percursoId, (p) => ({
      ...p,
      alternativas: p.alternativas.some((a) => a.id === alternativa.id)
        ? p.alternativas.filter((a) => a.id !== alternativa.id)
        : [...p.alternativas, alternativa],
    }));
  },

  marcarPronto(percursoId: string) {
    atualizarPercurso(percursoId, (p) => ({ ...p, estado: p.estado === "rascunho" ? "pronto" : p.estado }));
  },

  iniciar(percursoId: string) {
    percursos.definirAtivo(percursoId);
    atualizarPercurso(percursoId, (p) => ({ ...p, estado: "em-andamento", etapaAtual: 0 }));
  },

  avancar(percursoId: string) {
    atualizarPercurso(percursoId, (p) => {
      const etapas = p.etapas.map((e, i) => (i === p.etapaAtual ? { ...e, concluida: true } : e));
      const proxima = Math.min(p.etapaAtual + 1, p.etapas.length - 1);
      const fim = p.etapaAtual >= p.etapas.length - 1;
      return {
        ...p,
        etapas,
        etapaAtual: proxima,
        estado: fim ? "concluido" : p.estado,
      };
    });
  },

  voltar(percursoId: string) {
    atualizarPercurso(percursoId, (p) => ({ ...p, etapaAtual: Math.max(0, p.etapaAtual - 1) }));
  },

  pausar(percursoId: string) {
    atualizarPercurso(percursoId, (p) => ({ ...p, estado: "pausado" }));
  },

  retomar(percursoId: string) {
    atualizarPercurso(percursoId, (p) => ({ ...p, estado: "em-andamento" }));
  },

  encerrar(percursoId: string) {
    atualizarPercurso(percursoId, (p) => ({ ...p, estado: "concluido" }));
    percursos.definirAtivo(null);
  },

  registrar(percursoId: string, registro: Omit<Registro, "id" | "criadoEm">) {
    atualizarPercurso(percursoId, (p) => ({
      ...p,
      estado: "concluido",
      registros: [{ ...registro, id: id(), criadoEm: agora() }, ...p.registros],
    }));
  },

  apagarTudo() {
    gravar(vazio);
  },
};

function assinar(ouvinte: () => void) {
  ouvintes.add(ouvinte);
  return () => ouvintes.delete(ouvinte);
}

export function usePercursos() {
  const estado = useSyncExternalStore(
    assinar,
    () => garantirCarga(),
    () => vazio,
  );
  const porId = useCallback(
    (percursoId: string | undefined) => estado.percursos.find((p) => p.id === percursoId) ?? null,
    [estado.percursos],
  );
  const ativo = estado.percursos.find((p) => p.id === estado.ativo) ?? null;
  return {
    lista: estado.percursos,
    ativo,
    porId,
    favoritos: estado.percursos.filter((p) => p.favorito),
    concluidos: estado.percursos.filter((p) => p.estado === "concluido"),
    emAndamento: estado.percursos.filter(
      (p) => p.estado === "em-andamento" || p.estado === "pausado",
    ),
  };
}

export function usePercurso(percursoId: string | undefined) {
  const { porId } = usePercursos();
  return porId(percursoId);
}

/* ------------------------------------------------------------------ memória */

/**
 * Memória do copiloto: só o que a própria pessoa registrou neste aparelho.
 * Nenhuma inferência sobre diagnóstico, humor ou desempenho (documento 15).
 */
export function memoriaDoCopiloto() {
  const { percursos: lista } = garantirCarga();
  const concluidos = lista.filter((p) => p.registros.length > 0);
  const contagem = new Map<string, number>();
  const estrategias = new Map<string, { titulo: string; vezes: number }>();

  for (const p of lista) {
    contagem.set(p.situacaoId, (contagem.get(p.situacaoId) ?? 0) + 1);
    for (const e of p.estrategias) {
      const atual = estrategias.get(e.id);
      estrategias.set(e.id, { titulo: e.titulo, vezes: (atual?.vezes ?? 0) + 1 });
    }
  }

  const situacoesFrequentes = [...contagem.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([sid, vezes]) => ({ situacao: situacaoPorId(sid), vezes }))
    .filter((s): s is { situacao: Situacao; vezes: number } => Boolean(s.situacao));

  const estrategiasFrequentes = [...estrategias.values()].sort((a, b) => b.vezes - a.vezes);

  return {
    totalDePercursos: lista.length,
    totalDeRegistros: concluidos.reduce((s, p) => s + p.registros.length, 0),
    situacoesFrequentes,
    estrategiasFrequentes,
    ultimoRegistro: lista
      .flatMap((p) => p.registros.map((r) => ({ percurso: p, registro: r })))
      .sort((a, b) => b.registro.criadoEm - a.registro.criadoEm)[0] ?? null,
  };
}

/** Horário mais usado pela pessoa nesta mesma situação, se houver. */
export function sugerirHorario(situacaoId: string) {
  const { percursos: lista } = garantirCarga();
  const anteriores = lista.filter((p) => p.situacaoId === situacaoId && p.registros.length > 0);
  return anteriores[0]?.horario ?? null;
}

/** Situações oferecidas quando a pessoa ainda não escreveu nada. */
export function situacoesSugeridas(limite = 4) {
  const memoria = memoriaDoCopiloto();
  const frequentes = memoria.situacoesFrequentes.map((s) => s.situacao);
  const restantes = situacoes.filter((s) => !frequentes.some((f) => f.id === s.id));
  return [...frequentes, ...restantes].slice(0, limite);
}
