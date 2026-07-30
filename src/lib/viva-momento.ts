import { useCallback, useSyncExternalStore } from "react";

/**
 * "Meu momento": estado atual opcional, preferências locais da Home e
 * marcações de conteúdo. Tudo fica apenas neste dispositivo.
 *
 * Nada aqui é interpretado, pontuado ou classificado como bom ou ruim
 * (documentos 15 e 16). O registro é sempre opcional.
 */

export type OpcaoDeMomento = string | undefined;

export type EstadoAtual = {
  energia?: string;
  pausa?: string;
  ambiente?: string;
  disposicao?: string;
  apoio?: string;
  registradoEm?: string;
};

export type PreferenciasDaHome = {
  mostrarEstadoAtual: boolean;
  mostrarRegistrosRecentes: boolean;
  conteudosRelacionados: 0 | 1 | 2 | 3;
  /** Estratégias antes da biblioteca, na coluna secundária. */
  estrategiasPrimeiro: boolean;
};

export type MarcacoesDeConteudo = {
  /** Conteúdos guardados para depois. */
  salvos: string[];
  /** Conteúdos marcados como úteis pela própria pessoa. */
  uteis: string[];
};

export type EstadoMomento = {
  nome: string;
  estadoAtual: EstadoAtual;
  preferencias: PreferenciasDaHome;
  conteudos: MarcacoesDeConteudo;
};

export const perguntasDoMomento: {
  chave: keyof Omit<EstadoAtual, "registradoEm">;
  titulo: string;
  opcoes: string[];
}[] = [
  {
    chave: "energia",
    titulo: "Energia disponível",
    opcoes: [
      "Tenho pouca energia agora",
      "Tenho alguma energia",
      "Sinto que posso começar algo",
      "Prefiro não registrar",
    ],
  },
  {
    chave: "pausa",
    titulo: "Necessidade de pausa",
    opcoes: [
      "Quero fazer uma pausa",
      "Posso continuar com calma",
      "Não tenho certeza",
      "Prefiro não registrar",
    ],
  },
  {
    chave: "ambiente",
    titulo: "Conforto com o ambiente de agora",
    opcoes: [
      "O ambiente está tranquilo",
      "O ambiente está intenso",
      "Depende do momento",
      "Prefiro não registrar",
    ],
  },
  {
    chave: "disposicao",
    titulo: "Disposição para iniciar algo",
    opcoes: [
      "Prefiro apenas observar",
      "Posso começar algo pequeno",
      "Quero continuar o que comecei",
      "Prefiro não registrar",
    ],
  },
  {
    chave: "apoio",
    titulo: "Necessidade de apoio",
    opcoes: [
      "Gostaria de apoio de alguém",
      "Prefiro fazer sozinho(a) agora",
      "Não tenho certeza",
      "Prefiro não registrar",
    ],
  },
];

/** Indica pouca energia sem qualquer leitura clínica: é o que a pessoa escreveu. */
export function indicouPoucaEnergia(estado: EstadoAtual) {
  return estado.energia === "Tenho pouca energia agora" || estado.pausa === "Quero fazer uma pausa";
}

export const preferenciasPadrao: PreferenciasDaHome = {
  mostrarEstadoAtual: true,
  mostrarRegistrosRecentes: true,
  conteudosRelacionados: 3,
  estrategiasPrimeiro: false,
};

function inicial(): EstadoMomento {
  return {
    nome: "Alex",
    estadoAtual: {},
    preferencias: preferenciasPadrao,
    conteudos: { salvos: [], uteis: ["pausa"] },
  };
}

/* ------------------------------------------------------------ armazenamento */

const CHAVE = "viva:momento:v1";

let estado: EstadoMomento = inicial();
let erroDeArmazenamento: string | null = null;
let carregado = false;
const ouvintes = new Set<() => void>();

function avisar() {
  ouvintes.forEach((o) => o());
}

function ler(): EstadoMomento {
  try {
    const bruto = window.localStorage.getItem(CHAVE);
    if (!bruto) return inicial();
    const salvo = JSON.parse(bruto) as Partial<EstadoMomento>;
    return {
      ...inicial(),
      ...salvo,
      preferencias: { ...preferenciasPadrao, ...(salvo.preferencias ?? {}) },
      conteudos: { ...inicial().conteudos, ...(salvo.conteudos ?? {}) },
    };
  } catch {
    return inicial();
  }
}

/** Grava e informa, em linguagem simples, quando não foi possível salvar. */
function gravar(proximo: EstadoMomento) {
  estado = proximo;
  try {
    window.localStorage.setItem(CHAVE, JSON.stringify(proximo));
    erroDeArmazenamento = null;
  } catch {
    erroDeArmazenamento = "Não foi possível salvar esta alteração neste dispositivo.";
  }
  avisar();
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

const instantaneoServidor = inicial();

export function useMomento() {
  const dados = useSyncExternalStore(
    assinar,
    () => estado,
    () => instantaneoServidor,
  );
  const erro = useSyncExternalStore(
    assinar,
    () => erroDeArmazenamento,
    () => null,
  );

  const registrarMomento = useCallback(
    (chave: keyof Omit<EstadoAtual, "registradoEm">, valor: OpcaoDeMomento) =>
      gravar({
        ...estado,
        estadoAtual: {
          ...estado.estadoAtual,
          [chave]: valor,
          registradoEm: new Date().toISOString().slice(0, 10),
        },
      }),
    [],
  );

  const limparMomento = useCallback(() => gravar({ ...estado, estadoAtual: {} }), []);

  const definirPreferencia = useCallback(
    (patch: Partial<PreferenciasDaHome>) =>
      gravar({
        ...estado,
        preferencias: { ...estado.preferencias, ...patch },
      }),
    [],
  );

  const alternarConteudo = useCallback(
    (lista: keyof MarcacoesDeConteudo, id: string) =>
      gravar({
        ...estado,
        conteudos: {
          ...estado.conteudos,
          [lista]: estado.conteudos[lista].includes(id)
            ? estado.conteudos[lista].filter((c) => c !== id)
            : [...estado.conteudos[lista], id],
        },
      }),
    [],
  );

  const tentarNovamente = useCallback(() => gravar(estado), []);

  const dispensarErro = useCallback(() => {
    erroDeArmazenamento = null;
    avisar();
  }, []);

  const restaurarMomento = useCallback(() => gravar(inicial()), []);

  return {
    ...dados,
    erro,
    registrarMomento,
    limparMomento,
    definirPreferencia,
    alternarConteudo,
    tentarNovamente,
    dispensarErro,
    restaurarMomento,
  };
}
