import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

/**
 * Minha Experiência — personalização explícita do VIVA (Fase 5).
 *
 * Princípios (documentos 00, 03, 04, 10, 15 e 16):
 * - a plataforma adapta a experiência, nunca a pessoa;
 * - nada é inferido: toda preferência nasce de uma escolha consciente;
 * - nenhuma configuração muda sozinha, em nenhuma circunstância;
 * - tudo é reversível e permanece apenas neste dispositivo (localStorage);
 * - sem IA, sem rastreamento, sem analytics, sem nuvem, sem perfis ocultos.
 */

/* ------------------------------------------------------------------ tipos */

export type Linguagem = "essencial" | "equilibrada" | "detalhada";
export type Densidade = "reduzida" | "intermediaria" | "completa";
export type TamanhoDePasso = "pequenos" | "medios" | "amplos";
export type Ritmo = "livre" | "tranquilo" | "continuo";
export type IntensidadeDeNotificacao =
  | "silencioso"
  | "essencial"
  | "moderado"
  | "personalizado";
export type CanalDeNotificacao =
  | "continuidade"
  | "preparacao"
  | "revisao"
  | "biblioteca"
  | "lembretes";
export type ModoDeNavegacao = "guiado" | "exploracao" | "foco";
export type Tema = "claro" | "escuro" | "automatico";
export type Contraste = "padrao" | "aumentado";
export type Fonte = "padrao" | "ampliada";
export type Espacamento = "compacto" | "confortavel" | "ampliado";
export type Cantos = "suaves" | "discretos";
export type ModoDeSom = "sem-sons" | "discretos";
export type LarguraDeLinha = "curtas" | "confortavel" | "longas";

export type Preferencias = {
  linguagem: Linguagem;
  densidade: Densidade;
  tamanhoDePasso: TamanhoDePasso;
  ritmo: Ritmo;
  notificacoes: {
    intensidade: IntensidadeDeNotificacao;
    canais: Record<CanalDeNotificacao, boolean>;
  };
  navegacao: ModoDeNavegacao;
  aparencia: {
    tema: Tema;
    contraste: Contraste;
    fonte: Fonte;
    espacamento: Espacamento;
    cantos: Cantos;
  };
  movimento: {
    reduzirAnimacoes: boolean;
    removerTransicoes: boolean;
    semEfeitosDecorativos: boolean;
  };
  sons: {
    modo: ModoDeSom;
    feedbackTatil: boolean;
  };
  estrategias: string[];
  leitura: {
    largura: LarguraDeLinha;
    destacarSubtitulos: boolean;
    ocultarComplementares: boolean;
  };
  apoio: {
    exemplos: boolean;
    dicas: boolean;
    lembretesDeEstrategia: boolean;
    resumos: boolean;
  };
  demonstracao: {
    perfil: string;
  };
};

export const preferenciasPadrao: Preferencias = {
  linguagem: "equilibrada",
  densidade: "intermediaria",
  tamanhoDePasso: "medios",
  ritmo: "livre",
  notificacoes: {
    intensidade: "silencioso",
    canais: {
      continuidade: false,
      preparacao: false,
      revisao: false,
      biblioteca: false,
      lembretes: false,
    },
  },
  navegacao: "exploracao",
  aparencia: {
    tema: "claro",
    contraste: "padrao",
    fonte: "padrao",
    espacamento: "confortavel",
    cantos: "suaves",
  },
  movimento: {
    reduzirAnimacoes: false,
    removerTransicoes: false,
    semEfeitosDecorativos: false,
  },
  sons: {
    modo: "sem-sons",
    feedbackTatil: false,
  },
  estrategias: [],
  leitura: {
    largura: "confortavel",
    destacarSubtitulos: false,
    ocultarComplementares: false,
  },
  apoio: {
    exemplos: false,
    dicas: false,
    lembretesDeEstrategia: false,
    resumos: false,
  },
  demonstracao: {
    perfil: "lucas",
  },
};

/* ----------------------------------------------------- catálogo de rótulos */

export const estrategiasSugeridas: { id: string; nome: string; apoio: string }[] =
  [
    {
      id: "dividir",
      nome: "Dividir atividades em partes",
      apoio: "Fazer por etapas, uma de cada vez.",
    },
    {
      id: "preparar-materiais",
      nome: "Preparar materiais antes",
      apoio: "Deixar tudo separado antes de começar.",
    },
    {
      id: "lembretes-escritos",
      nome: "Usar lembretes escritos",
      apoio: "Anotar o que não quero esquecer.",
    },
    {
      id: "pausas",
      nome: "Fazer pausas",
      apoio: "Parar quando precisar, sem justificar.",
    },
    {
      id: "reduzir-estimulos",
      nome: "Reduzir estímulos",
      apoio: "Procurar um lugar mais silencioso ou com menos gente.",
    },
    {
      id: "fones",
      nome: "Utilizar fones",
      apoio: "Diminuir o ruído do ambiente.",
    },
    {
      id: "revisar-antes-de-sair",
      nome: "Revisar antes de sair",
      apoio: "Conferir o que levo e o caminho antes de começar.",
    },
  ];

export const rotulosDeCanal: Record<CanalDeNotificacao, string> = {
  continuidade: "Continuidade do percurso",
  preparacao: "Preparação de atividades",
  revisao: "Revisão depois da experiência",
  biblioteca: "Novidades da biblioteca",
  lembretes: "Lembretes pessoais",
};

/* --------------------------------------------------------------- contexto */

const CHAVE = "viva:minha-experiencia";

type ContextoDaExperiencia = {
  preferencias: Preferencias;
  hidratado: boolean;
  /** Aplica um ajuste e anuncia a mudança de forma transparente. */
  ajustar: (patch: PatchDePreferencias, mensagem?: string) => void;
  alternarEstrategia: (id: string) => void;
  alternarCanal: (canal: CanalDeNotificacao) => void;
  restaurarPadroes: () => void;
  limparPreferencias: () => void;
  /** Última mensagem de transparência (lida por leitores de tela). */
  aviso: string | null;
  dispensarAviso: () => void;
};

type PatchDePreferencias = {
  [K in keyof Preferencias]?: Preferencias[K] extends object
    ? Partial<Preferencias[K]>
    : Preferencias[K];
};

const Contexto = createContext<ContextoDaExperiencia | null>(null);

function mesclar(base: Preferencias, patch: PatchDePreferencias): Preferencias {
  const proximo: Preferencias = { ...base };
  for (const chave of Object.keys(patch) as (keyof Preferencias)[]) {
    const valor = patch[chave];
    if (valor === undefined) continue;
    const atual = base[chave];
    if (
      atual !== null &&
      typeof atual === "object" &&
      !Array.isArray(atual) &&
      typeof valor === "object" &&
      !Array.isArray(valor)
    ) {
      // @ts-expect-error mesclagem rasa de grupos de preferências
      proximo[chave] = { ...atual, ...valor };
    } else {
      // @ts-expect-error atribuição direta de valor simples
      proximo[chave] = valor;
    }
  }
  return proximo;
}

function ler(): Preferencias | null {
  try {
    const bruto = window.localStorage.getItem(CHAVE);
    if (!bruto) return null;
    return mesclar(preferenciasPadrao, JSON.parse(bruto));
  } catch {
    return null;
  }
}

function gravar(p: Preferencias) {
  try {
    window.localStorage.setItem(CHAVE, JSON.stringify(p));
  } catch {
    /* armazenamento indisponível: as preferências valem só nesta sessão */
  }
}

export function ExperienciaProvider({ children }: { children: ReactNode }) {
  const [preferencias, setPreferencias] =
    useState<Preferencias>(preferenciasPadrao);
  const [hidratado, setHidratado] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);
  const temporizador = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [temaDoSistema, setTemaDoSistema] = useState<"claro" | "escuro">(
    "claro",
  );

  useEffect(() => {
    const salvo = ler();
    if (salvo) setPreferencias(salvo);
    setHidratado(true);
  }, []);

  // Preferência de tema do sistema — observada, nunca gravada como escolha.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const aplicar = () => setTemaDoSistema(mq.matches ? "escuro" : "claro");
    aplicar();
    mq.addEventListener("change", aplicar);
    return () => mq.removeEventListener("change", aplicar);
  }, []);

  const anunciar = useCallback((mensagem: string) => {
    setAviso(mensagem);
    if (temporizador.current) clearTimeout(temporizador.current);
    temporizador.current = setTimeout(() => setAviso(null), 6000);
  }, []);

  const ajustar = useCallback(
    (patch: PatchDePreferencias, mensagem?: string) => {
      setPreferencias((atual) => {
        const proximo = mesclar(atual, patch);
        gravar(proximo);
        return proximo;
      });
      anunciar(
        mensagem ??
          "Sua preferência foi aplicada. Você pode alterá-la quando desejar.",
      );
    },
    [anunciar],
  );

  const alternarEstrategia = useCallback(
    (id: string) => {
      setPreferencias((atual) => {
        const jaTem = atual.estrategias.includes(id);
        const proximo: Preferencias = {
          ...atual,
          estrategias: jaTem
            ? atual.estrategias.filter((e) => e !== id)
            : [...atual.estrategias, id],
        };
        gravar(proximo);
        return proximo;
      });
      anunciar(
        "Sua lista de estratégias foi atualizada. Elas são possibilidades, não obrigações.",
      );
    },
    [anunciar],
  );

  const alternarCanal = useCallback(
    (canal: CanalDeNotificacao) => {
      setPreferencias((atual) => {
        const proximo: Preferencias = {
          ...atual,
          notificacoes: {
            intensidade: "personalizado",
            canais: {
              ...atual.notificacoes.canais,
              [canal]: !atual.notificacoes.canais[canal],
            },
          },
        };
        gravar(proximo);
        return proximo;
      });
      anunciar(
        "Sua preferência de avisos foi aplicada. Nesta demonstração, os avisos são apenas simulados.",
      );
    },
    [anunciar],
  );

  const restaurarPadroes = useCallback(() => {
    setPreferencias(preferenciasPadrao);
    gravar(preferenciasPadrao);
    anunciar("As configurações voltaram ao padrão inicial.");
  }, [anunciar]);

  const limparPreferencias = useCallback(() => {
    setPreferencias(preferenciasPadrao);
    try {
      window.localStorage.removeItem(CHAVE);
    } catch {
      /* ignora */
    }
    anunciar("Suas preferências foram apagadas deste dispositivo.");
  }, [anunciar]);

  // Aplica ao documento — imediatamente, sem recarregar a página.
  useEffect(() => {
    if (!hidratado) return;
    const raiz = document.documentElement;
    const { aparencia, movimento, leitura, navegacao } = preferencias;

    const escuro =
      aparencia.tema === "escura" ||
      aparencia.tema === "escuro" ||
      (aparencia.tema === "automatico" && temaDoSistema === "escuro");

    raiz.classList.toggle("dark", escuro);
    raiz.dataset.contraste = aparencia.contraste;
    raiz.dataset.texto = aparencia.fonte === "ampliada" ? "grande" : "padrao";
    raiz.dataset.espaco = aparencia.espacamento;
    raiz.dataset.cantos = aparencia.cantos;
    raiz.dataset.linhas = leitura.largura;
    raiz.dataset.navegacao = navegacao;
    raiz.classList.toggle(
      "viva-sem-animacao",
      movimento.reduzirAnimacoes || movimento.removerTransicoes,
    );
    raiz.classList.toggle(
      "viva-sem-decoracao",
      movimento.semEfeitosDecorativos,
    );
  }, [preferencias, hidratado, temaDoSistema]);

  const valor = useMemo(
    () => ({
      preferencias,
      hidratado,
      ajustar,
      alternarEstrategia,
      alternarCanal,
      restaurarPadroes,
      limparPreferencias,
      aviso,
      dispensarAviso: () => setAviso(null),
    }),
    [
      preferencias,
      hidratado,
      ajustar,
      alternarEstrategia,
      alternarCanal,
      restaurarPadroes,
      limparPreferencias,
      aviso,
    ],
  );

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export function useExperiencia() {
  const ctx = useContext(Contexto);
  if (!ctx) {
    throw new Error("useExperiencia precisa estar dentro de ExperienciaProvider");
  }
  return ctx;
}

/* ------------------------------------------------------------- utilitários */

/** Escolhe o texto conforme o estilo de linguagem escolhido pela pessoa. */
export function textoPorLinguagem(
  linguagem: Linguagem,
  textos: { essencial: string; equilibrada?: string; detalhada?: string },
) {
  if (linguagem === "essencial") return textos.essencial;
  if (linguagem === "detalhada") {
    return textos.detalhada ?? textos.equilibrada ?? textos.essencial;
  }
  return textos.equilibrada ?? textos.essencial;
}

const ordemDeDensidade: Record<Densidade, number> = {
  reduzida: 0,
  intermediaria: 1,
  completa: 2,
};

/** Um bloco aparece quando a densidade escolhida alcança o nível pedido. */
export function densidadeAlcanca(atual: Densidade, minimo: Densidade) {
  return ordemDeDensidade[atual] >= ordemDeDensidade[minimo];
}

/** Largura de leitura em caracteres, conforme a preferência de linhas. */
export const larguraDeLeitura: Record<LarguraDeLinha, string> = {
  curtas: "max-w-[48ch]",
  confortavel: "max-w-[66ch]",
  longas: "max-w-[86ch]",
};

/** Estimativas de tempo só existem em ritmo tranquilo (doc 04: sem pressão). */
export function mostrarEstimativaDeTempo(preferencias: Preferencias) {
  return preferencias.ritmo === "tranquilo";
}

/** Número de itens por tela, conforme o tamanho de passo escolhido. */
export const itensPorPasso: Record<TamanhoDePasso, number> = {
  pequenos: 1,
  medios: 3,
  amplos: 6,
};

/** Um canal está ativo conforme a intensidade escolhida. */
export function canalAtivo(
  preferencias: Preferencias,
  canal: CanalDeNotificacao,
) {
  const { intensidade, canais } = preferencias.notificacoes;
  if (intensidade === "silencioso") return false;
  if (intensidade === "essencial") {
    return canal === "continuidade" || canal === "preparacao";
  }
  if (intensidade === "moderado") return canal !== "lembretes";
  return canais[canal];
}

export function novoIdLocal(prefixo: string) {
  return `${prefixo}-${Math.random().toString(36).slice(2, 9)}`;
}
