/**
 * ProfileExperienceEngine — o motor de personalização radical do VIVA.
 *
 * Fonte: documentos 04 (UX neuroinclusiva), 10 (regras de personalização),
 * 13/14 (identidade e Design System) e 17 (psicologia do design).
 *
 * Um "modo de experiência" não é um diagnóstico nem uma persona: é a forma
 * como a mesma informação é apresentada. Ao trocar de modo, mudam paleta,
 * fundo, luminosidade, contraste, forma do assistente, densidade, tamanho
 * dos cards, quantidade de texto, ritmo das transições, preferência
 * audiovisual, intensidade de movimento, linguagem e ordem das sugestões.
 *
 * Os componentes leem apenas tokens `--profile-*`. Nenhuma cor fixa.
 */
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

export type IdDeModo = "visual" | "objetivo" | "calmo" | "audiovisual";

export type DensidadeDeInformacao = "minima" | "media" | "alta";

export type ModoDeExperiencia = {
  id: IdDeModo;
  nome: string;
  resumo: string;
  /** Uma linha sobre o que muda de fato — nunca linguagem clínica. */
  oQueMuda: string;
  /** Tokens aplicados na raiz do documento. */
  tokens: Record<string, string>;
  /** Decisões estruturais que os componentes consultam. */
  densidade: DensidadeDeInformacao;
  /** Quantos cards de escolha aparecem ao mesmo tempo na pilha. */
  cardsSimultaneos: number;
  /** Proporção da área visual dentro de cada card. */
  proporcaoDaMidia: number;
  /** Intensidade do gesto: rotação e elasticidade do swipe. */
  intensidadeDoMovimento: 0 | 1 | 2 | 3;
  /** Preferência audiovisual: o que abre primeiro dentro de uma etapa. */
  midiaPreferida: "imagem" | "video" | "audio" | "texto";
  /** Linguagem: quanto de apoio textual aparece. */
  linguagem: "curta" | "direta" | "essencial" | "descritiva";
  /** Ordem das decisões apresentadas na montagem do percurso. */
  ordemDasSugestoes: ("local" | "forma" | "rota" | "estrategia" | "conteudo" | "alternativa")[];
  /** Formato da prévia do percurso montado. */
  formatoDoPercurso: "trilha" | "resumo" | "etapa-unica" | "galeria";
};

const base = {
  "--profile-radius": "1.5rem",
  "--profile-spacing": "1rem",
  "--profile-card-scale": "1",
  "--profile-motion-duration": "260ms",
  "--profile-motion-intensity": "1",
  "--profile-media-ratio": "68%",
  "--profile-information-density": "1",
  "--profile-assistant-scale": "1",
  "--profile-assistant-glow": "0.16",
};

export const modosDeExperiencia: ModoDeExperiencia[] = [
  {
    id: "visual",
    nome: "Visual e previsível",
    resumo: "Imagens grandes, pouca leitura, uma escolha por vez.",
    oQueMuda: "Cards amplos, sequência linear, movimento lento e mapa simplificado.",
    densidade: "minima",
    cardsSimultaneos: 3,
    proporcaoDaMidia: 0.72,
    intensidadeDoMovimento: 2,
    midiaPreferida: "imagem",
    linguagem: "curta",
    ordemDasSugestoes: ["local", "forma", "rota", "estrategia", "conteudo", "alternativa"],
    formatoDoPercurso: "trilha",
    tokens: {
      ...base,
      "--profile-background": "oklch(0.972 0.014 96)",
      "--profile-surface": "oklch(0.992 0.006 96)",
      "--profile-card": "oklch(0.996 0.004 96)",
      "--profile-primary": "oklch(0.5 0.062 205)",
      "--profile-secondary": "oklch(0.93 0.026 190)",
      "--profile-accent": "oklch(0.86 0.05 155)",
      "--profile-text": "oklch(0.29 0.018 215)",
      "--profile-muted": "oklch(0.5 0.018 215)",
      "--profile-border": "oklch(0.9 0.014 180)",
      "--profile-radius": "1.75rem",
      "--profile-spacing": "1.15rem",
      "--profile-card-scale": "1.04",
      "--profile-motion-duration": "420ms",
      "--profile-motion-intensity": "1",
      "--profile-media-ratio": "72%",
      "--profile-information-density": "0.8",
      "--profile-assistant-scale": "1.1",
      "--profile-assistant-glow": "0.2",
    },
  },
  {
    id: "objetivo",
    nome: "Objetivo e direto",
    resumo: "Mais contraste, cards compactos, atalhos e números.",
    oQueMuda: "Menos animação, percurso resumido, informação numérica visível.",
    densidade: "alta",
    cardsSimultaneos: 4,
    proporcaoDaMidia: 0.52,
    intensidadeDoMovimento: 1,
    midiaPreferida: "texto",
    linguagem: "direta",
    ordemDasSugestoes: ["local", "rota", "forma", "estrategia", "alternativa", "conteudo"],
    formatoDoPercurso: "resumo",
    tokens: {
      ...base,
      "--profile-background": "oklch(0.955 0.006 220)",
      "--profile-surface": "oklch(0.995 0.003 220)",
      "--profile-card": "oklch(1 0 0)",
      "--profile-primary": "oklch(0.4 0.075 235)",
      "--profile-secondary": "oklch(0.915 0.02 235)",
      "--profile-accent": "oklch(0.72 0.09 200)",
      "--profile-text": "oklch(0.22 0.02 230)",
      "--profile-muted": "oklch(0.42 0.02 230)",
      "--profile-border": "oklch(0.84 0.014 230)",
      "--profile-radius": "0.9rem",
      "--profile-spacing": "0.7rem",
      "--profile-card-scale": "0.94",
      "--profile-motion-duration": "150ms",
      "--profile-motion-intensity": "0.6",
      "--profile-media-ratio": "52%",
      "--profile-information-density": "1.35",
      "--profile-assistant-scale": "0.85",
      "--profile-assistant-glow": "0.08",
    },
  },
  {
    id: "calmo",
    nome: "Baixa estimulação",
    resumo: "Paleta reduzida, quase sem movimento, uma etapa por tela.",
    oQueMuda: "Animação estática, sem profundidade, apenas o essencial visível.",
    densidade: "minima",
    cardsSimultaneos: 1,
    proporcaoDaMidia: 0.6,
    intensidadeDoMovimento: 0,
    midiaPreferida: "texto",
    linguagem: "essencial",
    ordemDasSugestoes: ["local", "forma", "estrategia", "rota", "alternativa", "conteudo"],
    formatoDoPercurso: "etapa-unica",
    tokens: {
      ...base,
      "--profile-background": "oklch(0.966 0.003 95)",
      "--profile-surface": "oklch(0.986 0.002 95)",
      "--profile-card": "oklch(0.99 0.001 95)",
      "--profile-primary": "oklch(0.44 0.028 210)",
      "--profile-secondary": "oklch(0.944 0.005 180)",
      "--profile-accent": "oklch(0.9 0.008 190)",
      "--profile-text": "oklch(0.3 0.01 215)",
      "--profile-muted": "oklch(0.49 0.008 215)",
      "--profile-border": "oklch(0.905 0.004 180)",
      "--profile-radius": "1.1rem",
      "--profile-spacing": "1.25rem",
      "--profile-card-scale": "1",
      "--profile-motion-duration": "0ms",
      "--profile-motion-intensity": "0",
      "--profile-media-ratio": "58%",
      "--profile-information-density": "0.7",
      "--profile-assistant-scale": "0.95",
      "--profile-assistant-glow": "0",
    },
  },
  {
    id: "audiovisual",
    nome: "Audiovisual e exploratório",
    resumo: "Vídeos e fotos dominantes, áudio de contexto, swipe evidente.",
    oQueMuda: "Navegação por descoberta, sequências visuais e cards com movimento.",
    densidade: "media",
    cardsSimultaneos: 4,
    proporcaoDaMidia: 0.78,
    intensidadeDoMovimento: 3,
    midiaPreferida: "video",
    linguagem: "descritiva",
    ordemDasSugestoes: ["local", "conteudo", "forma", "rota", "estrategia", "alternativa"],
    formatoDoPercurso: "galeria",
    tokens: {
      ...base,
      "--profile-background": "oklch(0.945 0.022 300)",
      "--profile-surface": "oklch(0.985 0.012 300)",
      "--profile-card": "oklch(0.995 0.008 300)",
      "--profile-primary": "oklch(0.48 0.09 300)",
      "--profile-secondary": "oklch(0.92 0.035 300)",
      "--profile-accent": "oklch(0.72 0.1 20)",
      "--profile-text": "oklch(0.27 0.025 300)",
      "--profile-muted": "oklch(0.47 0.025 300)",
      "--profile-border": "oklch(0.88 0.025 300)",
      "--profile-radius": "2rem",
      "--profile-spacing": "1.05rem",
      "--profile-card-scale": "1.06",
      "--profile-motion-duration": "340ms",
      "--profile-motion-intensity": "1.6",
      "--profile-media-ratio": "78%",
      "--profile-information-density": "1.05",
      "--profile-assistant-scale": "1.2",
      "--profile-assistant-glow": "0.3",
    },
  },
];

export const modoPadrao = modosDeExperiencia[0];

export function modoPorId(id: string | null | undefined) {
  return modosDeExperiencia.find((m) => m.id === id) ?? modoPadrao;
}

/* ------------------------------------------------------------------ estado */

const CHAVE = "viva.modo.v1";

export type FaseDoMorph = "parado" | "desfazendo" | "recompondo";

type ValorDoModo = {
  modo: ModoDeExperiencia;
  fase: FaseDoMorph;
  /** Modo que está entrando, durante a transformação. */
  proximo: ModoDeExperiencia | null;
  movimentoReduzido: boolean;
  trocarModo: (id: IdDeModo) => void;
};

const Contexto = createContext<ValorDoModo | null>(null);

function aplicarTokens(modo: ModoDeExperiencia) {
  if (typeof document === "undefined") return;
  const raiz = document.documentElement;
  for (const [chave, valor] of Object.entries(modo.tokens)) {
    raiz.style.setProperty(chave, valor);
  }
  raiz.setAttribute("data-modo", modo.id);
}

export function ModoProvider({ children }: { children: ReactNode }) {
  const [id, setId] = useState<IdDeModo>(modoPadrao.id);
  const [fase, setFase] = useState<FaseDoMorph>("parado");
  const [proximoId, setProximoId] = useState<IdDeModo | null>(null);
  const [movimentoReduzido, setMovimentoReduzido] = useState(false);
  const temporizadores = useRef<number[]>([]);

  useEffect(() => {
    try {
      const salvo = window.localStorage.getItem(CHAVE) as IdDeModo | null;
      if (salvo && modosDeExperiencia.some((m) => m.id === salvo)) setId(salvo);
    } catch {
      /* sem armazenamento: seguimos no modo padrão */
    }
    const consulta = window.matchMedia("(prefers-reduced-motion: reduce)");
    setMovimentoReduzido(consulta.matches);
    const ouvir = () => setMovimentoReduzido(consulta.matches);
    consulta.addEventListener("change", ouvir);
    return () => consulta.removeEventListener("change", ouvir);
  }, []);

  const modo = useMemo(() => modoPorId(id), [id]);

  useEffect(() => {
    aplicarTokens(modo);
  }, [modo]);

  useEffect(
    () => () => {
      temporizadores.current.forEach((t) => window.clearTimeout(t));
    },
    [],
  );

  const trocarModo = useCallback(
    (novo: IdDeModo) => {
      if (novo === id) return;
      try {
        window.localStorage.setItem(CHAVE, novo);
      } catch {
        /* a troca vale para esta sessão */
      }

      const semMovimento = movimentoReduzido || modoPorId(novo).intensidadeDoMovimento === 0;
      if (semMovimento) {
        setId(novo);
        setFase("parado");
        setProximoId(null);
        return;
      }

      // ProfileMorphTransition: desfaz, transforma tokens, recompõe.
      setProximoId(novo);
      setFase("desfazendo");
      const a = window.setTimeout(() => {
        setId(novo);
        setFase("recompondo");
      }, 420);
      const b = window.setTimeout(() => {
        setFase("parado");
        setProximoId(null);
      }, 1050);
      temporizadores.current.push(a, b);
    },
    [id, movimentoReduzido],
  );

  const valor = useMemo<ValorDoModo>(
    () => ({
      modo,
      fase,
      proximo: proximoId ? modoPorId(proximoId) : null,
      movimentoReduzido,
      trocarModo,
    }),
    [modo, fase, proximoId, movimentoReduzido, trocarModo],
  );

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export function useModo() {
  const ctx = useContext(Contexto);
  if (!ctx) throw new Error("useModo precisa estar dentro de ModoProvider.");
  return ctx;
}

/** Texto de apoio ajustado ao modo: a mesma informação, outra extensão. */
export function ajustarTexto(modo: ModoDeExperiencia, curto: string, longo: string) {
  if (modo.linguagem === "essencial" || modo.linguagem === "direta") return curto;
  if (modo.linguagem === "descritiva") return longo;
  return curto;
}
