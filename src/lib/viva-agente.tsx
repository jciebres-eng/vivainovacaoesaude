/**
 * JourneyAgent — o copiloto vivo do VIVA.
 *
 * Este módulo guarda apenas o *estado* do assistente: em que momento da
 * conversa ele está, se está visível, silencioso ou desligado. Ele não
 * interpreta nada sozinho (isso é do IntentInterpreter em `viva-situacoes.ts`)
 * e não guarda o conteúdo das conversas.
 *
 * Princípios (documentos 03, 04, 15 e 19): o agente nunca decide pela pessoa,
 * sempre explica o que está fazendo e pode ser silenciado ou desativado sem
 * que nenhuma função da plataforma deixe de existir.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  aplicarEvento,
  estadoInicial,
  type ContextoDaMaquina,
  type EstadoDoAssistente,
  type EventoDoAssistente,
} from "@/lib/assistant/estados";

export type EstadoDoAgente =
  | "disponivel"
  | "ouvindo"
  | "pensando"
  | "interpretando"
  | "organizando"
  | "mostrando-percurso"
  | "mostrando-estrategia"
  | "aguardando-decisao"
  | "acompanhando"
  | "concluido"
  | "erro"
  | "offline"
  | "silencioso"
  | "desativado";

export type PresencaDoAgente = "ativo" | "minimizado" | "silencioso" | "desativado";

type DescricaoDeEstado = {
  /** Frase curta mostrada ao lado do agente. */
  rotulo: string;
  /** Descrição para leitores de tela e para o modo sem movimento. */
  descricao: string;
  /** Nome da animação de respiro. Sempre há alternativa estática. */
  animacao: "respirar" | "ondular" | "pulsar" | "girar" | "assentar" | "nenhuma";
};

export const estadosDoAgente: Record<EstadoDoAgente, DescricaoDeEstado> = {
  disponivel: {
    rotulo: "Estou por aqui",
    descricao: "O assistente está disponível e esperando, sem pressa.",
    animacao: "respirar",
  },
  ouvindo: {
    rotulo: "Estou ouvindo",
    descricao: "O assistente está ouvindo sua fala. Nada é gravado.",
    animacao: "ondular",
  },
  pensando: {
    rotulo: "Estou lendo o que você disse",
    descricao: "O assistente está lendo o que foi dito.",
    animacao: "pulsar",
  },
  interpretando: {
    rotulo: "Entendendo a intenção",
    descricao: "O assistente está relacionando sua frase a situações conhecidas.",
    animacao: "pulsar",
  },
  organizando: {
    rotulo: "Organizando o percurso",
    descricao: "O assistente está montando as etapas do percurso.",
    animacao: "girar",
  },
  "mostrando-percurso": {
    rotulo: "Aqui está o percurso",
    descricao: "O assistente apresentou um percurso possível.",
    animacao: "assentar",
  },
  "mostrando-estrategia": {
    rotulo: "Algumas estratégias possíveis",
    descricao: "O assistente apresentou estratégias que podem ajudar.",
    animacao: "assentar",
  },
  "aguardando-decisao": {
    rotulo: "A escolha é sua",
    descricao: "O assistente está aguardando sua decisão. Nada acontece sozinho.",
    animacao: "respirar",
  },
  acompanhando: {
    rotulo: "Acompanhando com você",
    descricao: "O assistente está acompanhando o percurso em andamento.",
    animacao: "respirar",
  },
  concluido: {
    rotulo: "Percurso encerrado",
    descricao: "O percurso foi encerrado. Não há avaliação nem cobrança.",
    animacao: "assentar",
  },
  erro: {
    rotulo: "Não consegui agora",
    descricao: "Algo não funcionou. Você pode tentar de novo ou seguir por toques.",
    animacao: "nenhuma",
  },
  offline: {
    rotulo: "Sem conexão",
    descricao: "Sem internet no momento. O que está neste aparelho continua funcionando.",
    animacao: "nenhuma",
  },
  silencioso: {
    rotulo: "Modo silencioso",
    descricao: "O assistente está visível, mas não escreve mensagens.",
    animacao: "respirar",
  },
  desativado: {
    rotulo: "Assistente desligado",
    descricao: "O assistente está desligado. Todas as funções continuam disponíveis.",
    animacao: "nenhuma",
  },
};

/**
 * Ponte entre os estados em português usados pela interface e os nomes
 * técnicos da AssistantStateMachine, que nomeiam os ativos de animação.
 */
export const estadoTecnico: Record<EstadoDoAgente, EstadoDoAssistente> = {
  disponivel: "idle",
  ouvindo: "listening",
  pensando: "transcribing",
  interpretando: "processing",
  organizando: "organizing",
  "mostrando-percurso": "suggesting",
  "mostrando-estrategia": "suggesting",
  "aguardando-decisao": "waiting",
  acompanhando: "guiding",
  concluido: "completed",
  erro: "error",
  offline: "offline",
  silencioso: "silent",
  desativado: "disabled",
};

/** Eventos da máquina traduzidos para o estado visível da interface. */
const estadoPorEvento: Partial<Record<EventoDoAssistente, EstadoDoAgente>> = {
  APP_READY: "disponivel",
  VOICE_STARTED: "ouvindo",
  VOICE_STOPPED: "pensando",
  TRANSCRIPTION_STARTED: "pensando",
  TRANSCRIPTION_READY: "interpretando",
  INTENT_PROCESSING: "interpretando",
  INTENT_UNCLEAR: "aguardando-decisao",
  JOURNEY_BUILDING: "organizando",
  JOURNEY_READY: "mostrando-percurso",
  USER_CONFIRMATION_REQUIRED: "aguardando-decisao",
  USER_CONFIRMED: "organizando",
  JOURNEY_STARTED: "acompanhando",
  JOURNEY_PAUSED: "aguardando-decisao",
  JOURNEY_COMPLETED: "concluido",
  GENERIC_ERROR: "erro",
  USER_DISMISSED_ERROR: "disponivel",
};

const CHAVE = "viva:agente:v1";

type Guardado = { presenca: PresencaDoAgente; memoriaAutorizada: boolean };

function ler(): Guardado {
  if (typeof window === "undefined") return { presenca: "ativo", memoriaAutorizada: false };
  try {
    const bruto = window.localStorage.getItem(CHAVE);
    if (!bruto) return { presenca: "ativo", memoriaAutorizada: false };
    const dados = JSON.parse(bruto) as Partial<Guardado>;
    return {
      presenca: dados.presenca ?? "ativo",
      memoriaAutorizada: Boolean(dados.memoriaAutorizada),
    };
  } catch {
    return { presenca: "ativo", memoriaAutorizada: false };
  }
}

type ValorDoAgente = {
  estado: EstadoDoAgente;
  descricao: DescricaoDeEstado;
  presenca: PresencaDoAgente;
  memoriaAutorizada: boolean;
  online: boolean;
  /** Muda o estado do agente. Ignorado quando o agente está desativado. */
  irPara: (estado: EstadoDoAgente) => void;
  /** Estado técnico correspondente, usado pelas animações do assistente. */
  estadoTecnicoAtual: EstadoDoAssistente;
  /** Envia um evento à máquina de estados do assistente. */
  enviar: (evento: EventoDoAssistente) => void;
  definirPresenca: (presenca: PresencaDoAgente) => void;
  autorizarMemoria: (autorizada: boolean) => void;
};

const Contexto = createContext<ValorDoAgente | null>(null);

export function AgenteProvider({ children }: { children: ReactNode }) {
  const [presenca, setPresenca] = useState<PresencaDoAgente>("ativo");
  const [memoriaAutorizada, setMemoria] = useState(false);
  const [estado, setEstado] = useState<EstadoDoAgente>("disponivel");
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const guardado = ler();
    setPresenca(guardado.presenca);
    setMemoria(guardado.memoriaAutorizada);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setOnline(window.navigator.onLine);
    const sobe = () => setOnline(true);
    const cai = () => setOnline(false);
    window.addEventListener("online", sobe);
    window.addEventListener("offline", cai);
    return () => {
      window.removeEventListener("online", sobe);
      window.removeEventListener("offline", cai);
    };
  }, []);

  const guardar = useCallback((proximo: Guardado) => {
    try {
      window.localStorage.setItem(CHAVE, JSON.stringify(proximo));
    } catch {
      /* sem armazenamento: as escolhas valem só nesta sessão */
    }
  }, []);

  const definirPresenca = useCallback(
    (proxima: PresencaDoAgente) => {
      setPresenca(proxima);
      guardar({ presenca: proxima, memoriaAutorizada });
    },
    [guardar, memoriaAutorizada],
  );

  const autorizarMemoria = useCallback(
    (autorizada: boolean) => {
      setMemoria(autorizada);
      guardar({ presenca, memoriaAutorizada: autorizada });
    },
    [guardar, presenca],
  );

  const irPara = useCallback((proximo: EstadoDoAgente) => setEstado(proximo), []);

  const estadoEfetivo: EstadoDoAgente =
    presenca === "desativado"
      ? "desativado"
      : !online
        ? "offline"
        : presenca === "silencioso" && estado === "disponivel"
          ? "silencioso"
          : estado;

  const valor = useMemo<ValorDoAgente>(
    () => ({
      estado: estadoEfetivo,
      descricao: estadosDoAgente[estadoEfetivo],
      presenca,
      memoriaAutorizada,
      online,
      irPara,
      definirPresenca,
      autorizarMemoria,
    }),
    [estadoEfetivo, presenca, memoriaAutorizada, online, irPara, definirPresenca, autorizarMemoria],
  );

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export function useAgente() {
  const valor = useContext(Contexto);
  if (!valor) throw new Error("useAgente precisa estar dentro de <AgenteProvider>.");
  return valor;
}
