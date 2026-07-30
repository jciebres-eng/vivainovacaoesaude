import { useSyncExternalStore } from "react";

/**
 * Estado do percurso principal do VIVA (Fase 3) — apenas armazenamento local.
 *
 * Sem backend, sem autenticação, sem API, sem Supabase, sem IA. Tudo o que a
 * pessoa registra fica neste dispositivo e pode ser apagado por ela a
 * qualquer momento (documentos 03, 15 e 16).
 */

const CHAVE = "viva:percurso-humano:v1";

export type EtapaDoPercurso =
  | "entrada"
  | "momento"
  | "objetivo"
  | "resumo"
  | "preparacao"
  | "atividade"
  | "registro"
  | "reflexao"
  | "proximo-passo"
  | "encerramento";

/** Linguagem de estado permitida (documento 13). Nada de "falhou"/"atrasado". */
export type EstadoDoRegistro =
  | "preparado"
  | "iniciado"
  | "pausado"
  | "registrado"
  | "encerrado"
  | "retomado";

export type MomentoAtual = {
  comoEstou: string | null;
  energia: string | null;
  contexto: string | null;
  ritmo: string | null;
  estimulos: string | null;
  pulado: boolean;
};

export type PreparacaoDoPercurso = {
  estrategias: string[];
  ritmo: "breve" | "padrao" | "partes";
  textoReduzido: boolean;
  baixaEstimulacao: boolean;
  precisaPausa: boolean;
  pronta: boolean;
};

export type RegistroDoPercurso = {
  comoFoi: string | null;
  emMinhasPalavras: string;
  ajudou: string[];
  dificultou: string[];
  ajuste: string | null;
  guardadoEm?: string;
};

export type ReflexaoDoPercurso = {
  respostas: Record<string, string>;
  guardadaEm?: string;
};

export type EventoDaLinhaDoTempo = {
  id: string;
  quando: string;
  estado: EstadoDoRegistro;
  titulo: string;
  detalhe?: string;
};

export type Jornada = {
  etapa: EtapaDoPercurso;
  categoriaId: string | null;
  objetivoId: string | null;
  momento: MomentoAtual;
  preparacao: PreparacaoDoPercurso;
  atividade: {
    estado: "nao-iniciada" | "iniciada" | "pausada" | "concluida";
    etapaAtual: number;
    respostas: Record<string, string>;
  };
  registro: RegistroDoPercurso | null;
  reflexao: ReflexaoDoPercurso | null;
  proximoPassoId: string | null;
  salvoParaDepois: boolean;
  linhaDoTempo: EventoDaLinhaDoTempo[];
};

export const jornadaVazia: Jornada = {
  etapa: "entrada",
  categoriaId: null,
  objetivoId: null,
  momento: {
    comoEstou: null,
    energia: null,
    contexto: null,
    ritmo: null,
    estimulos: null,
    pulado: false,
  },
  preparacao: {
    estrategias: [],
    ritmo: "padrao",
    textoReduzido: false,
    baixaEstimulacao: false,
    precisaPausa: false,
    pronta: false,
  },
  atividade: { estado: "nao-iniciada", etapaAtual: 0, respostas: {} },
  registro: null,
  reflexao: null,
  proximoPassoId: null,
  salvoParaDepois: false,
  linhaDoTempo: [],
};

/* ------------------------------------------------------------ store */

let estado: Jornada = jornadaVazia;
let carregado = false;
const ouvintes = new Set<() => void>();

function ler(): Jornada {
  if (typeof window === "undefined") return jornadaVazia;
  try {
    const bruto = window.localStorage.getItem(CHAVE);
    if (!bruto) return jornadaVazia;
    const salvo = JSON.parse(bruto) as Partial<Jornada>;
    return {
      ...jornadaVazia,
      ...salvo,
      momento: { ...jornadaVazia.momento, ...salvo.momento },
      preparacao: { ...jornadaVazia.preparacao, ...salvo.preparacao },
      atividade: { ...jornadaVazia.atividade, ...salvo.atividade },
      linhaDoTempo: salvo.linhaDoTempo ?? [],
    };
  } catch {
    return jornadaVazia;
  }
}

function gravar(proximo: Jornada) {
  estado = proximo;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(CHAVE, JSON.stringify(proximo));
    } catch {
      /* armazenamento indisponível: a demonstração segue em memória */
    }
  }
  ouvintes.forEach((o) => o());
}

function inscrever(ouvinte: () => void) {
  if (!carregado) {
    carregado = true;
    estado = ler();
  }
  ouvintes.add(ouvinte);
  return () => ouvintes.delete(ouvinte);
}

function instantaneo() {
  if (!carregado && typeof window !== "undefined") {
    carregado = true;
    estado = ler();
  }
  return estado;
}

function instantaneoServidor() {
  return jornadaVazia;
}

export function useJornada() {
  return useSyncExternalStore(inscrever, instantaneo, instantaneoServidor);
}

function atualizar(fn: (atual: Jornada) => Jornada) {
  gravar(fn(instantaneo()));
}

function agora() {
  return new Date().toISOString();
}

/* ----------------------------------------------------------- ações */

export const jornada = {
  irPara(etapa: EtapaDoPercurso) {
    atualizar((a) => ({ ...a, etapa }));
  },

  registrarMomento(parcial: Partial<MomentoAtual>) {
    atualizar((a) => ({ ...a, momento: { ...a.momento, ...parcial } }));
  },

  pularMomento() {
    atualizar((a) => ({ ...a, momento: { ...a.momento, pulado: true } }));
  },

  escolherCategoria(categoriaId: string | null) {
    atualizar((a) => ({ ...a, categoriaId, objetivoId: null }));
  },

  escolherObjetivo(objetivoId: string, titulo: string) {
    atualizar((a) => ({
      ...a,
      objetivoId,
      etapa: "resumo",
      salvoParaDepois: false,
      linhaDoTempo: adicionar(a.linhaDoTempo, {
        estado: "preparado",
        titulo,
        detalhe: "Objetivo escolhido",
      }),
    }));
  },

  ajustarPreparacao(parcial: Partial<PreparacaoDoPercurso>) {
    atualizar((a) => ({ ...a, preparacao: { ...a.preparacao, ...parcial } }));
  },

  comecarAtividade(titulo: string) {
    atualizar((a) => ({
      ...a,
      etapa: "atividade",
      preparacao: { ...a.preparacao, pronta: true },
      atividade: {
        ...a.atividade,
        estado: a.atividade.estado === "pausada" ? "iniciada" : "iniciada",
      },
      linhaDoTempo: adicionar(a.linhaDoTempo, {
        estado: a.atividade.estado === "pausada" ? "retomado" : "iniciado",
        titulo,
        detalhe:
          a.atividade.estado === "pausada"
            ? "Atividade retomada"
            : "Atividade iniciada",
      }),
    }));
  },

  responderEtapa(id: string, texto: string) {
    atualizar((a) => ({
      ...a,
      atividade: {
        ...a.atividade,
        respostas: { ...a.atividade.respostas, [id]: texto },
      },
    }));
  },

  irParaEtapaDaAtividade(indice: number) {
    atualizar((a) => ({
      ...a,
      atividade: { ...a.atividade, etapaAtual: Math.max(0, indice) },
    }));
  },

  pausarAtividade(titulo: string) {
    atualizar((a) => ({
      ...a,
      atividade: { ...a.atividade, estado: "pausada" },
      linhaDoTempo: adicionar(a.linhaDoTempo, {
        estado: "pausado",
        titulo,
        detalhe: "Percurso preservado neste dispositivo",
      }),
    }));
  },

  salvarParaDepois(titulo: string) {
    atualizar((a) => ({
      ...a,
      salvoParaDepois: true,
      atividade: {
        ...a.atividade,
        estado: a.atividade.estado === "iniciada" ? "pausada" : a.atividade.estado,
      },
      linhaDoTempo: adicionar(a.linhaDoTempo, {
        estado: "pausado",
        titulo,
        detalhe: "Salvo para retomar depois",
      }),
    }));
  },

  concluirAtividade(titulo: string) {
    atualizar((a) => ({
      ...a,
      atividade: { ...a.atividade, estado: "concluida" },
      linhaDoTempo: adicionar(a.linhaDoTempo, {
        estado: "registrado",
        titulo,
        detalhe: "Atividade percorrida até a última etapa",
      }),
    }));
  },

  guardarRegistro(registro: RegistroDoPercurso, titulo: string) {
    atualizar((a) => ({
      ...a,
      registro: { ...registro, guardadoEm: agora() },
      etapa: "reflexao",
      linhaDoTempo: adicionar(a.linhaDoTempo, {
        estado: "registrado",
        titulo,
        detalhe: "Experiência registrada com suas palavras",
      }),
    }));
  },

  guardarReflexao(respostas: Record<string, string>, titulo: string) {
    atualizar((a) => ({
      ...a,
      reflexao: { respostas, guardadaEm: agora() },
      etapa: "proximo-passo",
      linhaDoTempo: adicionar(a.linhaDoTempo, {
        estado: "registrado",
        titulo,
        detalhe: "Reflexão guardada",
      }),
    }));
  },

  removerReflexao() {
    atualizar((a) => ({ ...a, reflexao: null }));
  },

  escolherProximoPasso(id: string, titulo: string) {
    atualizar((a) => ({
      ...a,
      proximoPassoId: id,
      linhaDoTempo: adicionar(a.linhaDoTempo, {
        estado: "preparado",
        titulo,
        detalhe: "Próximo passo escolhido",
      }),
    }));
  },

  encerrar(titulo: string) {
    atualizar((a) => ({
      ...a,
      etapa: "encerramento",
      linhaDoTempo: adicionar(a.linhaDoTempo, {
        estado: "encerrado",
        titulo,
        detalhe: "Percurso encerrado por agora",
      }),
    }));
  },

  reiniciarPercurso() {
    atualizar((a) => ({
      ...jornadaVazia,
      linhaDoTempo: a.linhaDoTempo,
    }));
  },

  apagarTudo() {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(CHAVE);
      } catch {
        /* nada a fazer */
      }
    }
    gravar(jornadaVazia);
  },
};

function adicionar(
  atual: EventoDaLinhaDoTempo[],
  evento: Omit<EventoDaLinhaDoTempo, "id" | "quando">,
): EventoDaLinhaDoTempo[] {
  return [
    ...atual,
    {
      ...evento,
      id: `${Date.now()}-${atual.length}`,
      quando: agora(),
    },
  ];
}

/* --------------------------------------------------------- utilidades */

export const rotulosDeEstadoDoRegistro: Record<EstadoDoRegistro, string> = {
  preparado: "Preparado",
  iniciado: "Iniciado",
  pausado: "Pausado",
  registrado: "Registrado",
  encerrado: "Encerrado",
  retomado: "Retomado",
};

export function existePercursoEmAberto(j: Jornada) {
  return (
    j.objetivoId !== null &&
    j.etapa !== "encerramento" &&
    (j.atividade.estado === "pausada" ||
      j.atividade.estado === "iniciada" ||
      j.salvoParaDepois ||
      j.etapa !== "entrada")
  );
}

export function dataLegivel(iso: string) {
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}
