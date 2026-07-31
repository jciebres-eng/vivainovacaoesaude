/**
 * Perfis de demonstração do VIVA.
 *
 * Fonte: documentos 06 (personas e contextos), 10 (regras de personalização),
 * 11 (biblioteca) e 13/14 (identidade e design).
 *
 * Cada perfil reorganiza a experiência inteira: saudação, objetivo, situações,
 * dificuldades, apoios, estratégias, conteúdos relacionados, cor de destaque,
 * ícones e ordem dos blocos. Nada aqui é inferido automaticamente — a pessoa
 * escolhe o perfil e pode trocar a qualquer momento.
 *
 * Dados fictícios. Sem backend, sem IA, sem inferência sobre pessoas reais.
 */
import {
  Briefcase,
  Bus,
  GraduationCap,
  HeartPulse,
  ShoppingBasket,
  type LucideIcon,
} from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartaoDeEscolha = {
  id: string;
  titulo: string;
  frase: string;
  categoria: string;
  icone: LucideIcon;
  detalhes?: string;
};

export type BlocoDaHome = "continuar" | "novo" | "estrategias" | "biblioteca";

export type Perfil = {
  id: string;
  nome: string;
  contexto: string;
  saudacao: string;
  perguntaDeAbertura: string;
  objetivoPrincipal: string;
  icone: LucideIcon;
  /** Cor de destaque: muda a percepção sem trocar a identidade do VIVA. */
  destaque: string;
  destaqueSuave: string;
  destaqueTexto: string;
  /** Ordem dos blocos da Home (documento 10: prioridade dos módulos). */
  ordemDaHome: BlocoDaHome[];
  /** Intensidade das orientações: quanto de apoio textual aparece. */
  intensidade: "leve" | "media" | "detalhada";
  situacoes: CartaoDeEscolha[];
  objetivos: CartaoDeEscolha[];
  dificuldades: CartaoDeEscolha[];
  apoios: CartaoDeEscolha[];
  estrategias: CartaoDeEscolha[];
  /** Ids de conteúdos da Biblioteca relacionados a este contexto. */
  conteudos: string[];
};

const c = (
  id: string,
  titulo: string,
  frase: string,
  categoria: string,
  icone: LucideIcon,
  detalhes?: string,
): CartaoDeEscolha => ({ id, titulo, frase, categoria, icone, detalhes });

import {
  BatteryLow,
  Bell,
  BookMarked,
  CalendarClock,
  ClipboardList,
  CloudSun,
  Compass,
  Coffee,
  Ear,
  Footprints,
  Hand,
  Headphones,
  ListChecks,
  MapPin,
  MessageSquare,
  Moon,
  NotebookPen,
  Pill,
  Route as RouteIcon,
  Smile,
  Sparkles,
  Timer,
  Users,
  Volume2,
  Wind,
} from "lucide-react";

export const perfis: Perfil[] = [
  {
    id: "ana",
    nome: "Ana",
    contexto: "Primeiro emprego",
    saudacao: "Olá, Ana",
    perguntaDeAbertura: "Como posso ajudar você agora?",
    objetivoPrincipal: "Participar de uma reunião com mais previsibilidade",
    icone: Briefcase,
    destaque: "oklch(0.5 0.075 245)",
    destaqueSuave: "oklch(0.935 0.028 245)",
    destaqueTexto: "oklch(0.33 0.05 245)",
    ordemDaHome: ["continuar", "novo", "estrategias", "biblioteca"],
    intensidade: "media",
    situacoes: [
      c("ana-s1", "Dia comum", "Nada fora do previsto até agora.", "Rotina", CloudSun),
      c("ana-s2", "Cansaço", "A energia está mais baixa hoje.", "Energia", BatteryLow),
      c("ana-s3", "Ansiedade antes da reunião", "Penso no que vou precisar falar.", "Trabalho", Bell), // prettier-ignore
      c("ana-s4", "Tudo bem", "Estou com disposição para organizar algo.", "Disposição", Smile),
    ],
    objetivos: [
      c("ana-o1", "Participar de uma reunião", "Saber o que vem antes e depois.", "Trabalho", Users),
      c("ana-o2", "Organizar minha semana", "Ver os compromissos em poucos blocos.", "Rotina", CalendarClock), // prettier-ignore
      c("ana-o3", "Pedir um esclarecimento", "Combinar por escrito antes de falar.", "Comunicação", MessageSquare), // prettier-ignore
    ],
    dificuldades: [
      c("ana-d1", "Muitas pessoas falando", "Fica difícil acompanhar o assunto.", "Ambiente", Volume2), // prettier-ignore
      c("ana-d2", "Não saber a pauta", "A ordem dos assuntos me pega de surpresa.", "Previsibilidade", ClipboardList), // prettier-ignore
      c("ana-d3", "Reunião longa", "Depois de um tempo perco o fio.", "Ritmo", Timer),
    ],
    apoios: [
      c("ana-a1", "Pauta escrita", "Receber os tópicos antes ajuda.", "Preparação", NotebookPen),
      c("ana-a2", "Uma pessoa de referência", "Alguém que eu possa perguntar depois.", "Apoio", Users), // prettier-ignore
      c("ana-a3", "Pausa combinada", "Cinco minutos no meio já mudam o dia.", "Ritmo", Coffee),
    ],
    estrategias: [
      c("ana-e1", "Anotar três perguntas antes", "Deixo pronto o que preciso dizer.", "Preparação", NotebookPen), // prettier-ignore
      c("ana-e2", "Chegar cinco minutos antes", "Entro na sala com o ambiente mais calmo.", "Ambiente", Timer), // prettier-ignore
      c("ana-e3", "Combinar retorno por escrito", "Confirmo depois o que ficou combinado.", "Comunicação", MessageSquare), // prettier-ignore
      c("ana-e4", "Respiração antes de entrar", "Um minuto parada, sem pressa.", "Autorregulação", Wind), // prettier-ignore
    ],
    conteudos: ["organizar-rotina", "planejar-pausas", "ambientes-intensos", "estrategias-de-estimulos"], // prettier-ignore
  },
  {
    id: "bruno",
    nome: "Bruno",
    contexto: "Universidade",
    saudacao: "Olá, Bruno",
    perguntaDeAbertura: "Como posso ajudar você agora?",
    objetivoPrincipal: "Organizar o estudo da semana sem rigidez",
    icone: GraduationCap,
    destaque: "oklch(0.49 0.07 155)",
    destaqueSuave: "oklch(0.935 0.03 155)",
    destaqueTexto: "oklch(0.32 0.05 155)",
    ordemDaHome: ["novo", "continuar", "biblioteca", "estrategias"],
    intensidade: "leve",
    situacoes: [
      c("bru-s1", "Concentrado", "Consigo estudar por um tempo.", "Foco", Sparkles),
      c("bru-s2", "Disperso", "Começo e paro várias vezes.", "Foco", Compass),
      c("bru-s3", "Sala cheia", "O ambiente hoje está intenso.", "Ambiente", Volume2),
      c("bru-s4", "Sono ruim", "Dormi pouco esta noite.", "Energia", Moon),
    ],
    objetivos: [
      c("bru-o1", "Organizar o estudo da semana", "Poucos blocos, sem lista enorme.", "Estudo", ListChecks), // prettier-ignore
      c("bru-o2", "Assistir a uma aula até o fim", "Com pausas combinadas.", "Aula", GraduationCap),
      c("bru-o3", "Falar com um professor", "Preparar a pergunta antes.", "Comunicação", MessageSquare), // prettier-ignore
    ],
    dificuldades: [
      c("bru-d1", "Ruído na sala", "Conversas paralelas atrapalham.", "Ambiente", Ear),
      c("bru-d2", "Muitas tarefas ao mesmo tempo", "Não sei por onde começar.", "Organização", ClipboardList), // prettier-ignore
      c("bru-d3", "Aulas longas", "Depois de uma hora fica pesado.", "Ritmo", Timer),
    ],
    apoios: [
      c("bru-a1", "Fone de ouvido", "Reduz o ruído da sala.", "Sensorial", Headphones),
      c("bru-a2", "Lugar perto da porta", "Facilita sair para uma pausa.", "Ambiente", MapPin),
      c("bru-a3", "Colega de referência", "Alguém para confirmar o combinado.", "Apoio", Users),
    ],
    estrategias: [
      c("bru-e1", "Blocos de 25 minutos", "Estudo um bloco e paro.", "Ritmo", Timer),
      c("bru-e2", "Uma tarefa por vez", "Escolho só a próxima.", "Organização", ListChecks),
      c("bru-e3", "Pausa a cada aula", "Cinco minutos fora da sala.", "Autorregulação", Coffee),
      c("bru-e4", "Anotar em poucas palavras", "Registro só o essencial.", "Estudo", NotebookPen),
    ],
    conteudos: ["organizar-rotina", "planejar-pausas", "estrategias-de-estimulos", "ambientes-intensos"], // prettier-ignore
  },
  {
    id: "carla",
    nome: "Carla",
    contexto: "Supermercado",
    saudacao: "Olá, Carla",
    perguntaDeAbertura: "Como posso ajudar você agora?",
    objetivoPrincipal: "Fazer as compras da semana no meu tempo",
    icone: ShoppingBasket,
    destaque: "oklch(0.52 0.085 70)",
    destaqueSuave: "oklch(0.94 0.035 75)",
    destaqueTexto: "oklch(0.36 0.06 65)",
    ordemDaHome: ["novo", "biblioteca", "continuar", "estrategias"],
    intensidade: "media",
    situacoes: [
      c("car-s1", "Tranquila", "Hoje dá para sair com calma.", "Disposição", Smile),
      c("car-s2", "Com pressa", "Tenho pouco tempo disponível.", "Tempo", Timer),
      c("car-s3", "Sensível a barulho", "Sons altos incomodam mais hoje.", "Sensorial", Ear),
      c("car-s4", "Cansada", "Prefiro algo curto.", "Energia", BatteryLow),
    ],
    objetivos: [
      c("car-o1", "Fazer as compras da semana", "Com uma lista visual e curta.", "Compras", ShoppingBasket), // prettier-ignore
      c("car-o2", "Montar a lista antes de sair", "Poucos itens por categoria.", "Planejamento", ListChecks), // prettier-ignore
      c("car-o3", "Organizar as refeições", "Sem precisar decidir na hora.", "Alimentação", ClipboardList), // prettier-ignore
    ],
    dificuldades: [
      c("car-d1", "Fila no caixa", "Esperar em pé por muito tempo.", "Ambiente", Users),
      c("car-d2", "Corredores cheios", "Muita gente e muito estímulo.", "Ambiente", Volume2),
      c("car-d3", "Decidir na hora", "Escolher no meio do movimento cansa.", "Decisão", Compass),
    ],
    apoios: [
      c("car-a1", "Lista no celular", "Marco o que já peguei.", "Planejamento", ListChecks),
      c("car-a2", "Horário mais vazio", "Ir cedo muda bastante.", "Ambiente", CloudSun),
      c("car-a3", "Pausa no meio", "Parar um pouco antes do caixa.", "Ritmo", Coffee),
    ],
    estrategias: [
      c("car-e1", "Lista por corredor", "Sigo uma ordem só.", "Planejamento", ListChecks),
      c("car-e2", "Ir em horário calmo", "Escolho o começo da manhã.", "Ambiente", CloudSun),
      c("car-e3", "Levar protetor auditivo", "Reduz o impacto do som.", "Sensorial", Headphones),
      c("car-e4", "Combinar quando parar", "Se ficar intenso, eu paro.", "Autorregulação", Hand),
    ],
    conteudos: ["planejar-compras", "organizar-refeicoes", "ambientes-intensos", "planejar-pausas"],
  },
  {
    id: "daniel",
    nome: "Daniel",
    contexto: "Transporte",
    saudacao: "Olá, Daniel",
    perguntaDeAbertura: "Como posso ajudar você agora?",
    objetivoPrincipal: "Chegar ao destino com um caminho combinado",
    icone: Bus,
    destaque: "oklch(0.5 0.08 300)",
    destaqueSuave: "oklch(0.935 0.03 300)",
    destaqueTexto: "oklch(0.33 0.055 300)",
    ordemDaHome: ["continuar", "novo", "biblioteca", "estrategias"],
    intensidade: "detalhada",
    situacoes: [
      c("dan-s1", "Pronto para sair", "Estou com tempo antes do horário.", "Rotina", Footprints),
      c("dan-s2", "Insegurança com o trajeto", "Não conheço bem esse caminho.", "Mobilidade", Compass), // prettier-ignore
      c("dan-s3", "Ônibus lotado", "O horário costuma ser cheio.", "Ambiente", Users),
      c("dan-s4", "Atrasado", "O horário mudou de última hora.", "Imprevisto", Timer),
    ],
    objetivos: [
      c("dan-o1", "Ir a um lugar novo", "Com o caminho combinado antes.", "Mobilidade", MapPin),
      c("dan-o2", "Comparar dois trajetos", "Escolher o que faz mais sentido hoje.", "Mobilidade", RouteIcon), // prettier-ignore
      c("dan-o3", "Lidar com um atraso", "Saber o que fazer se mudar.", "Imprevisto", Timer),
    ],
    dificuldades: [
      c("dan-d1", "Baldeação", "Trocar de linha no meio do caminho.", "Trajeto", RouteIcon),
      c("dan-d2", "Ônibus cheio", "Muita gente e pouco espaço.", "Ambiente", Users),
      c("dan-d3", "Sem internet", "O mapa pode não abrir.", "Tecnologia", Compass),
    ],
    apoios: [
      c("dan-a1", "Rota alternativa salva", "Um segundo caminho já definido.", "Trajeto", RouteIcon),
      c("dan-a2", "Mensagem pronta", "Texto salvo para pedir informação.", "Comunicação", MessageSquare), // prettier-ignore
      c("dan-a3", "Ponto de retorno", "Um lugar conhecido para voltar.", "Segurança", MapPin),
    ],
    estrategias: [
      c("dan-e1", "Salvar uma rota alternativa", "Se a primeira falhar, tenho outra.", "Trajeto", RouteIcon), // prettier-ignore
      c("dan-e2", "Sair com folga", "Quinze minutos antes.", "Tempo", Timer),
      c("dan-e3", "Mensagem pronta no celular", "Peço informação sem precisar falar.", "Comunicação", MessageSquare), // prettier-ignore
      c("dan-e4", "Definir um ponto de retorno", "Sei onde posso parar.", "Segurança", MapPin),
    ],
    conteudos: ["comparar-trajetos", "rota-alternativa", "pedir-informacao", "lidar-com-atraso"],
  },
  {
    id: "helena",
    nome: "Helena",
    contexto: "Consulta médica",
    saudacao: "Olá, Helena",
    perguntaDeAbertura: "Como posso ajudar você agora?",
    objetivoPrincipal: "Ir à consulta e falar o que preciso",
    icone: HeartPulse,
    destaque: "oklch(0.54 0.1 30)",
    destaqueSuave: "oklch(0.94 0.035 35)",
    destaqueTexto: "oklch(0.37 0.07 30)",
    ordemDaHome: ["continuar", "biblioteca", "novo", "estrategias"],
    intensidade: "detalhada",
    situacoes: [
      c("hel-s1", "Preocupada", "Penso no que preciso perguntar.", "Saúde", HeartPulse),
      c("hel-s2", "Organizada", "Já separei os documentos.", "Organização", ClipboardList),
      c("hel-s3", "Cansada", "A semana foi puxada.", "Energia", BatteryLow),
      c("hel-s4", "Com dúvidas", "Não lembro de tudo que quero falar.", "Saúde", NotebookPen),
    ],
    objetivos: [
      c("hel-o1", "Preparar a consulta", "Organizar perguntas antes.", "Saúde", NotebookPen),
      c("hel-o2", "Registrar efeitos percebidos", "Anotar o que mudou nos últimos dias.", "Saúde", Pill), // prettier-ignore
      c("hel-o3", "Organizar documentos", "Levar só o necessário.", "Organização", BookMarked),
    ],
    dificuldades: [
      c("hel-d1", "Esquecer as perguntas", "Na hora não lembro do que queria.", "Memória", NotebookPen), // prettier-ignore
      c("hel-d2", "Sala de espera cheia", "Esperar muito tempo cansa.", "Ambiente", Users),
      c("hel-d3", "Termos difíceis", "Nem sempre entendo o que é dito.", "Comunicação", MessageSquare), // prettier-ignore
    ],
    apoios: [
      c("hel-a1", "Lista de perguntas", "Três perguntas escritas.", "Preparação", ListChecks),
      c("hel-a2", "Acompanhante", "Alguém junto se eu quiser.", "Apoio", Users),
      c("hel-a3", "Anotar durante a consulta", "Registro o que foi dito.", "Registro", NotebookPen),
    ],
    estrategias: [
      c("hel-e1", "Escrever três perguntas", "As mais importantes primeiro.", "Preparação", NotebookPen), // prettier-ignore
      c("hel-e2", "Pedir para repetir", "Se não entendi, posso perguntar de novo.", "Comunicação", MessageSquare), // prettier-ignore
      c("hel-e3", "Levar a lista de medicamentos", "Evita depender da memória.", "Saúde", Pill),
      c("hel-e4", "Chegar com folga", "Sem correr até a sala.", "Tempo", Timer),
    ],
    conteudos: ["preparar-consulta", "planejar-pausas", "organizar-rotina", "ambientes-intensos"],
  },
];

export const perfilPadrao = perfis[0];

export function perfilPorId(id: string | null | undefined) {
  return perfis.find((p) => p.id === id) ?? perfilPadrao;
}

/* ------------------------------------------------------------------ estado */

const CHAVE = "viva.perfil.v1";

type ContextoPerfil = {
  perfil: Perfil;
  trocando: boolean;
  trocarPerfil: (id: string) => void;
};

const PerfilContext = createContext<ContextoPerfil | null>(null);

export function PerfilProvider({ children }: { children: ReactNode }) {
  const [id, setId] = useState<string>(perfilPadrao.id);
  const [trocando, setTrocando] = useState(false);

  useEffect(() => {
    try {
      const salvo = window.localStorage.getItem(CHAVE);
      if (salvo && perfis.some((p) => p.id === salvo)) setId(salvo);
    } catch {
      /* armazenamento indisponível: seguimos com o perfil padrão */
    }
  }, []);

  const perfil = useMemo(() => perfilPorId(id), [id]);

  // A cor de destaque acompanha o perfil, sem trocar a identidade do VIVA.
  useEffect(() => {
    const raiz = document.documentElement;
    raiz.style.setProperty("--destaque", perfil.destaque);
    raiz.style.setProperty("--destaque-suave", perfil.destaqueSuave);
    raiz.style.setProperty("--destaque-texto", perfil.destaqueTexto);
    raiz.setAttribute("data-perfil", perfil.id);
  }, [perfil]);

  const trocarPerfil = useCallback(
    (novo: string) => {
      if (novo === id) return;
      setTrocando(true);
      try {
        window.localStorage.setItem(CHAVE, novo);
      } catch {
        /* sem persistência: a troca vale para esta sessão */
      }
      window.setTimeout(() => {
        setId(novo);
        setTrocando(false);
      }, 900);
    },
    [id],
  );

  const valor = useMemo(() => ({ perfil, trocando, trocarPerfil }), [perfil, trocando, trocarPerfil]); // prettier-ignore

  return <PerfilContext.Provider value={valor}>{children}</PerfilContext.Provider>;
}

export function usePerfil() {
  const ctx = useContext(PerfilContext);
  if (!ctx) throw new Error("usePerfil precisa estar dentro de PerfilProvider.");
  return ctx;
}
