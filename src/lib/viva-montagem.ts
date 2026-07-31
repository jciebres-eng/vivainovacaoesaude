/**
 * Montagem do percurso (Fase mobile).
 *
 * A pessoa monta o percurso escolhendo cartões, um de cada vez. Tudo fica
 * apenas neste dispositivo (localStorage), como nas demais partes do VIVA.
 *
 * Não existe pontuação, prazo, sequência obrigatória ou penalidade por
 * interromper (documentos 00, 03, 15 e 17). "Agora não" é uma resposta
 * legítima e reversível.
 */
import { useCallback, useEffect, useMemo, useState } from "react";

export type IdDeEtapa =
  | "situacao"
  | "objetivo"
  | "dificuldade"
  | "apoio"
  | "estrategias"
  | "conteudos";

export const etapasDaMontagem: {
  id: IdDeEtapa;
  pergunta: string;
  ajuda: string;
  multipla: boolean;
  rotuloResumo: string;
}[] = [
  {
    id: "situacao",
    pergunta: "Como você está?",
    ajuda: "Escolha uma opção.",
    multipla: false,
    rotuloResumo: "Situação",
  },
  {
    id: "objetivo",
    pergunta: "O que você quer fazer?",
    ajuda: "Escolha uma opção.",
    multipla: false,
    rotuloResumo: "Objetivo",
  },
  {
    id: "dificuldade",
    pergunta: "O que pode dificultar?",
    ajuda: "Escolha o que fizer sentido.",
    multipla: true,
    rotuloResumo: "O que pode dificultar",
  },
  {
    id: "apoio",
    pergunta: "O que pode ajudar?",
    ajuda: "Escolha o que fizer sentido.",
    multipla: true,
    rotuloResumo: "O que pode ajudar",
  },
  {
    id: "estrategias",
    pergunta: "Quais estratégias quer usar?",
    ajuda: "Escolha algumas.",
    multipla: true,
    rotuloResumo: "Estratégias",
  },
  {
    id: "conteudos",
    pergunta: "Quer incluir algum conteúdo?",
    ajuda: "Veja sugestões relacionadas.",
    multipla: true,
    rotuloResumo: "Biblioteca",
  },
];

export type EstadoDaMontagem = {
  perfilId: string;
  etapa: number;
  escolhas: Record<IdDeEtapa, string[]>;
  paraDepois: string[];
  pronto: boolean;
  atualizadoEm: string | null;
};

const CHAVE = "viva.montagem.v1";

export const montagemVazia: EstadoDaMontagem = {
  perfilId: "",
  etapa: 0,
  escolhas: {
    situacao: [],
    objetivo: [],
    dificuldade: [],
    apoio: [],
    estrategias: [],
    conteudos: [],
  },
  paraDepois: [],
  pronto: false,
  atualizadoEm: null,
};

function ler(): EstadoDaMontagem {
  try {
    const bruto = window.localStorage.getItem(CHAVE);
    if (!bruto) return montagemVazia;
    const dado = JSON.parse(bruto) as Partial<EstadoDaMontagem>;
    return {
      ...montagemVazia,
      ...dado,
      escolhas: { ...montagemVazia.escolhas, ...(dado.escolhas ?? {}) },
      paraDepois: dado.paraDepois ?? [],
    };
  } catch {
    return montagemVazia;
  }
}

export function useMontagem(perfilId: string) {
  const [estado, setEstado] = useState<EstadoDaMontagem>(montagemVazia);
  const [carregado, setCarregado] = useState(false);
  const [ultimaAcao, setUltimaAcao] = useState<{
    etapa: IdDeEtapa;
    cartaoId: string;
    incluido: boolean;
    etapaAnterior: number;
  } | null>(null);

  useEffect(() => {
    setEstado(ler());
    setCarregado(true);
  }, []);

  // Trocar de perfil recomeça a montagem: cada perfil é outra experiência.
  useEffect(() => {
    if (!carregado || !perfilId) return;
    setEstado((atual) => {
      if (atual.perfilId === perfilId) return atual;
      const novo = { ...montagemVazia, perfilId };
      return novo;
    });
  }, [carregado, perfilId]);

  useEffect(() => {
    if (!carregado) return;
    try {
      window.localStorage.setItem(CHAVE, JSON.stringify(estado));
    } catch {
      /* sem persistência: a montagem vale para esta sessão */
    }
  }, [estado, carregado]);

  const atualizar = useCallback((fn: (a: EstadoDaMontagem) => EstadoDaMontagem) => {
    setEstado((a) => ({ ...fn(a), atualizadoEm: new Date().toISOString() }));
  }, []);

  const incluir = useCallback(
    (etapa: IdDeEtapa, cartaoId: string, unica: boolean) => {
      setUltimaAcao({ etapa, cartaoId, incluido: true, etapaAnterior: estado.etapa });
      atualizar((a) => {
        const atuais = a.escolhas[etapa];
        const novos = unica ? [cartaoId] : atuais.includes(cartaoId) ? atuais : [...atuais, cartaoId]; // prettier-ignore
        return { ...a, escolhas: { ...a.escolhas, [etapa]: novos } };
      });
    },
    [atualizar, estado.etapa],
  );

  const remover = useCallback(
    (etapa: IdDeEtapa, cartaoId: string) => {
      atualizar((a) => ({
        ...a,
        escolhas: { ...a.escolhas, [etapa]: a.escolhas[etapa].filter((i) => i !== cartaoId) },
      }));
    },
    [atualizar],
  );

  const guardarParaDepois = useCallback(
    (cartaoId: string) => {
      atualizar((a) => ({
        ...a,
        paraDepois: a.paraDepois.includes(cartaoId) ? a.paraDepois : [...a.paraDepois, cartaoId],
      }));
    },
    [atualizar],
  );

  const registrarDescarte = useCallback(
    (etapa: IdDeEtapa, cartaoId: string) => {
      setUltimaAcao({ etapa, cartaoId, incluido: false, etapaAnterior: estado.etapa });
    },
    [estado.etapa],
  );

  const desfazer = useCallback(() => {
    if (!ultimaAcao) return;
    if (ultimaAcao.incluido) remover(ultimaAcao.etapa, ultimaAcao.cartaoId);
    atualizar((a) => ({ ...a, etapa: ultimaAcao.etapaAnterior }));
    setUltimaAcao(null);
  }, [ultimaAcao, remover, atualizar]);

  const irParaEtapa = useCallback(
    (indice: number) => {
      atualizar((a) => ({
        ...a,
        etapa: Math.max(0, Math.min(etapasDaMontagem.length - 1, indice)),
      }));
    },
    [atualizar],
  );

  const concluir = useCallback(() => atualizar((a) => ({ ...a, pronto: true })), [atualizar]);
  const recomecar = useCallback(
    () => atualizar(() => ({ ...montagemVazia, perfilId })),
    [atualizar, perfilId],
  );

  const iniciado = useMemo(
    () => Object.values(estado.escolhas).some((v) => v.length > 0),
    [estado.escolhas],
  );

  return {
    estado,
    carregado,
    iniciado,
    ultimaAcao,
    incluir,
    remover,
    guardarParaDepois,
    registrarDescarte,
    desfazer,
    irParaEtapa,
    concluir,
    recomecar,
    limparUltimaAcao: () => setUltimaAcao(null),
  };
}
