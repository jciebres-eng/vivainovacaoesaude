/**
 * SingleDemoProfile — o perfil único de demonstração do VIVA.
 *
 * Fonte: documentos 00, 03, 04, 06, 10 e 28.
 *
 * Não existem mais personagens com contextos separados (Ana, Bruno, Carla,
 * Daniel, Helena). Aqueles contextos passaram a ser SITUAÇÕES do catálogo
 * universal (ver `viva-situacoes.ts`), disponíveis para este único perfil.
 *
 * O perfil não guarda diagnóstico, nível de suporte nem característica fixa:
 * guarda apenas PREFERÊNCIAS ajustáveis, que a pessoa muda quando quiser e
 * que nunca bloqueiam o acesso a nenhuma funcionalidade.
 *
 * Dados fictícios. Sem backend, sem IA, sem inferência sobre pessoas reais.
 */
import {
  BatteryLow,
  Bell,
  Briefcase,
  Bus,
  CalendarClock,
  ClipboardList,
  CloudSun,
  Coffee,
  Compass,
  Ear,
  Footprints,
  GraduationCap,
  Hand,
  Headphones,
  HeartPulse,
  ListChecks,
  MapPin,
  MessageSquare,
  Moon,
  NotebookPen,
  Pill,
  Route as RouteIcon,
  ShoppingBasket,
  Smile,
  Sparkles,
  Timer,
  UserRound,
  Users,
  Volume2,
  Wind,
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

/** Nome do perfil de demonstração. Trocar aqui muda em toda a experiência. */
export const NOME_DO_PERFIL = "Alex";
export const DESCRICAO_DO_PERFIL = "Perfil de demonstração";

export type CartaoDeEscolha = {
  id: string;
  titulo: string;
  frase: string;
  categoria: string;
  icone: LucideIcon;
  detalhes?: string;
};

export type BlocoDaHome = "continuar" | "novo" | "estrategias" | "biblioteca";

const c = (
  id: string,
  titulo: string,
  frase: string,
  categoria: string,
  icone: LucideIcon,
  detalhes?: string,
): CartaoDeEscolha => ({ id, titulo, frase, categoria, icone, detalhes });

/* ---------------------------------------------------------- preferências */

export type OpcaoDePreferencia = { id: string; rotulo: string; apoio: string };

export type ChaveDePreferencia =
  | "quantidadeDeInformacao"
  | "tamanhoDosPassos"
  | "ritmo"
  | "previsibilidade"
  | "animacoes"
  | "cores"
  | "audio"
  | "imagens"
  | "baixaEstimulacao"
  | "comunicacao"
  | "acessibilidade"
  | "estrategiasPreferidas"
  | "acompanhamento";

export type GrupoDePreferencia = {
  chave: ChaveDePreferencia;
  titulo: string;
  pergunta: string;
  /** Preferências de escolha múltipla (acessibilidade, estratégias). */
  multipla?: boolean;
  opcoes: OpcaoDePreferencia[];
};

const o = (id: string, rotulo: string, apoio: string): OpcaoDePreferencia => ({ id, rotulo, apoio });

export const gruposDePreferencia: GrupoDePreferencia[] = [
  {
    chave: "quantidadeDeInformacao",
    titulo: "Quantidade de informação",
    pergunta: "Quanto você quer ver por tela?",
    opcoes: [
      o("essencial", "Só o essencial", "Uma coisa por vez."),
      o("equilibrada", "Equilibrada", "O passo atual e o próximo."),
      o("completa", "Completa", "Todos os detalhes disponíveis."),
    ],
  },
  {
    chave: "tamanhoDosPassos",
    titulo: "Tamanho dos passos",
    pergunta: "Como você prefere dividir as etapas?",
    opcoes: [
      o("curtos", "Passos curtos", "Muitas etapas pequenas."),
      o("medios", "Passos médios", "Um meio entre curto e longo."),
      o("longos", "Passos longos", "Menos etapas, cada uma maior."),
    ],
  },
  {
    chave: "ritmo",
    titulo: "Ritmo do percurso",
    pergunta: "Em que ritmo você quer seguir?",
    opcoes: [
      o("livre", "No meu tempo", "Sem sugestão de horário."),
      o("guiado", "Com um ritmo sugerido", "Tempo aproximado por etapa."),
      o("pausado", "Com pausas previstas", "Uma pausa entre as etapas."),
    ],
  },
  {
    chave: "previsibilidade",
    titulo: "Nível de previsibilidade",
    pergunta: "Quanto você quer saber antes?",
    opcoes: [
      o("alta", "Saber tudo antes", "Etapas, tempos e alternativas."),
      o("media", "Saber o principal", "O que vem agora e depois."),
      o("aberta", "Descobrir no caminho", "Menos antecipação."),
    ],
  },
  {
    chave: "animacoes",
    titulo: "Intensidade de animações",
    pergunta: "Quanto movimento na tela?",
    opcoes: [
      o("sem", "Sem animação", "Tudo estático."),
      o("discreta", "Discreta", "Transições suaves."),
      o("presente", "Presente", "Movimento perceptível."),
    ],
  },
  {
    chave: "cores",
    titulo: "Intensidade de cores",
    pergunta: "Como você prefere a intensidade visual?",
    opcoes: [
      o("suave", "Suave", "Cores baixas e uniformes."),
      o("equilibrada", "Equilibrada", "Acentos moderados."),
      o("luminosa", "Luminosa", "Acentos mais vivos."),
    ],
  },
  {
    chave: "audio",
    titulo: "Necessidade de áudio",
    pergunta: "Áudio ajuda você?",
    opcoes: [
      o("sem", "Prefiro sem áudio", "Só texto e imagem."),
      o("opcional", "Áudio opcional", "Disponível quando eu quiser."),
      o("sempre", "Áudio-guia sempre", "Áudio já disponível na etapa."),
    ],
  },
  {
    chave: "imagens",
    titulo: "Preferência por imagens",
    pergunta: "Quanto de imagem você quer?",
    opcoes: [
      o("texto", "Prefiro texto", "Imagens apenas quando necessárias."),
      o("equilibrada", "Texto e imagem", "Os dois juntos."),
      o("visual", "Prefiro imagens", "Cards visuais e sequências."),
    ],
  },
  {
    chave: "baixaEstimulacao",
    titulo: "Modo de baixa estimulação",
    pergunta: "Quer a experiência com menos estímulos?",
    opcoes: [
      o("desligado", "Desligado", "Experiência completa."),
      o("parcial", "Nas etapas intensas", "Ativa só durante a execução."),
      o("ligado", "Sempre ligado", "Menos brilho, movimento e elementos."),
    ],
  },
  {
    chave: "comunicacao",
    titulo: "Forma de comunicação",
    pergunta: "Como você prefere se comunicar aqui?",
    opcoes: [
      o("texto", "Escrevendo", "Digito o que preciso."),
      o("voz", "Falando", "Uso a voz quando possível."),
      o("cartoes", "Escolhendo cartões", "Toco em opções prontas."),
    ],
  },
  {
    chave: "acessibilidade",
    titulo: "Recursos de acessibilidade",
    pergunta: "Quais recursos você quer ativos?",
    multipla: true,
    opcoes: [
      o("alto-contraste", "Alto contraste", "Mais separação entre fundo e texto."),
      o("texto-maior", "Texto maior", "Corpo de texto ampliado."),
      o("leitura-simples", "Leitura simples", "Frases curtas e diretas."),
      o("legendas", "Legendas sempre", "Vídeos e áudios com texto."),
      o("sem-gestos", "Uso sem gestos", "Botões equivalentes a cada gesto."),
      o("leitor-de-tela", "Leitor de tela", "Descrições completas nos cards."),
    ],
  },
  {
    chave: "estrategiasPreferidas",
    titulo: "Tipos de estratégias preferidas",
    pergunta: "Que tipo de estratégia costuma ajudar?",
    multipla: true,
    opcoes: [
      o("sensorial", "Sensoriais", "Fone, luz, roupa, protetor auricular."),
      o("organizacao", "De organização", "Roteiro, checklist, lista."),
      o("comunicacao", "De comunicação", "Frases prontas, cartão, perguntas."),
      o("tempo", "De tempo", "Chegar antes, folga, pausas."),
      o("apoio", "De apoio", "Acompanhante, contato, localização."),
      o("ensaio", "De ensaio", "Simular ou visualizar antes."),
    ],
  },
  {
    chave: "acompanhamento",
    titulo: "Acompanhamento durante a execução",
    pergunta: "Quanto acompanhamento você quer no momento de realizar?",
    opcoes: [
      o("sem", "Nenhum", "Sigo sozinho, sem avisos."),
      o("discreto", "Discreto", "Só a etapa atual e o próximo passo."),
      o("completo", "Completo", "Mapa, áudio-guia e contato de confiança."),
    ],
  },
];

export type PreferenciasDoPerfil = Record<ChaveDePreferencia, string | string[]>;

export const preferenciasPadraoDoPerfil: PreferenciasDoPerfil = {
  quantidadeDeInformacao: "equilibrada",
  tamanhoDosPassos: "medios",
  ritmo: "livre",
  previsibilidade: "media",
  animacoes: "discreta",
  cores: "equilibrada",
  audio: "opcional",
  imagens: "equilibrada",
  baixaEstimulacao: "desligado",
  comunicacao: "texto",
  acessibilidade: [],
  estrategiasPreferidas: [],
  acompanhamento: "discreto",
};

/* ------------------------------------------------------------ perfil único */

export type Perfil = {
  id: string;
  nome: string;
  contexto: string;
  saudacao: string;
  perguntaDeAbertura: string;
  objetivoPrincipal: string;
  icone: LucideIcon;
  destaque: string;
  destaqueSuave: string;
  destaqueTexto: string;
  ordemDaHome: BlocoDaHome[];
  intensidade: "leve" | "media" | "detalhada";
  /** Cartões universais: valem para qualquer situação do catálogo. */
  situacoes: CartaoDeEscolha[];
  objetivos: CartaoDeEscolha[];
  dificuldades: CartaoDeEscolha[];
  apoios: CartaoDeEscolha[];
  estrategias: CartaoDeEscolha[];
  conteudos: string[];
};

/**
 * Alex — perfil de demonstração.
 *
 * Acessa todas as situações, estratégias, treinamentos e formas de
 * personalização. Nenhum conteúdo é bloqueado por contexto ou diagnóstico.
 */
export const perfilDemonstrativo: Perfil = {
  id: "alex",
  nome: NOME_DO_PERFIL,
  contexto: DESCRICAO_DO_PERFIL,
  saudacao: `Olá, ${NOME_DO_PERFIL}`,
  perguntaDeAbertura: "Como posso ajudar você agora?",
  objetivoPrincipal: "Escolher uma situação e montar um percurso do meu jeito",
  icone: UserRound,
  destaque: "oklch(0.62 0.13 205)",
  destaqueSuave: "oklch(0.32 0.05 220)",
  destaqueTexto: "oklch(0.86 0.06 205)",
  ordemDaHome: ["continuar", "novo", "estrategias", "biblioteca"],
  intensidade: "media",
  // Momento atual — nunca uma classificação da pessoa.
  situacoes: [
    c("mom-comum", "Dia comum", "Nada fora do previsto até agora.", "Rotina", CloudSun),
    c("mom-cansaco", "Cansaço", "A energia está mais baixa hoje.", "Energia", BatteryLow),
    c("mom-antecipacao", "Pensando no que vem", "Fico repassando o que vai acontecer.", "Antecipação", Bell), // prettier-ignore
    c("mom-disposicao", "Com disposição", "Dá para organizar algo agora.", "Disposição", Smile),
    c("mom-foco", "Concentrado", "Consigo seguir por um tempo.", "Foco", Sparkles),
    c("mom-disperso", "Disperso", "Começo e paro várias vezes.", "Foco", Compass),
    c("mom-sensivel", "Sensível a estímulo", "Som e luz incomodam mais hoje.", "Sensorial", Ear),
    c("mom-sono", "Dormi pouco", "A noite foi curta.", "Energia", Moon),
    c("mom-pressa", "Com pouco tempo", "Preciso de algo curto.", "Tempo", Timer),
  ],
  // Objetivos universais: qualquer situação do catálogo pode usá-los.
  objetivos: [
    c("obj-lugar-novo", "Ir a um lugar novo", "Com o caminho combinado antes.", "Mobilidade", MapPin), // prettier-ignore
    c("obj-reuniao", "Participar de uma reunião", "Saber o que vem antes e depois.", "Trabalho", Users), // prettier-ignore
    c("obj-entrevista", "Ir a uma entrevista", "Preparar o que vou dizer.", "Trabalho", Briefcase),
    c("obj-aula", "Ir a uma aula", "Com pausas combinadas.", "Estudo", GraduationCap),
    c("obj-compras", "Fazer compras", "Com uma lista visual e curta.", "Compras", ShoppingBasket),
    c("obj-consulta", "Preparar uma consulta", "Organizar perguntas antes.", "Saúde", HeartPulse),
    c("obj-atendimento", "Resolver um atendimento", "Banco, serviço público ou balcão.", "Serviços", ClipboardList), // prettier-ignore
    c("obj-transporte", "Usar transporte público", "Comparar dois caminhos.", "Mobilidade", Bus),
    c("obj-social", "Ir a um evento social", "Com hora de chegar e de sair.", "Social", Users),
    c("obj-lazer", "Fazer algo por lazer", "Sem obrigação de concluir.", "Lazer", Footprints),
    c("obj-semana", "Organizar minha semana", "Poucos blocos, sem lista enorme.", "Rotina", CalendarClock), // prettier-ignore
    c("obj-comunicar", "Pedir um esclarecimento", "Combinar por escrito antes de falar.", "Comunicação", MessageSquare), // prettier-ignore
  ],
  // "O que pode tornar essa situação mais difícil para você?" — nunca um limite da pessoa.
  dificuldades: [
    c("dif-barulho", "Ambiente barulhento", "Som alto ou constante atrapalha.", "Ambiente", Volume2),
    c("dif-pessoas", "Muitas pessoas", "Aglomeração cansa mais rápido.", "Ambiente", Users),
    c("dif-luz", "Iluminação intensa", "Luz forte incomoda.", "Sensorial", CloudSun),
    c("dif-desconhecido", "Local desconhecido", "Não sei como é por dentro.", "Previsibilidade", Compass), // prettier-ignore
    c("dif-mudanca", "Mudanças inesperadas", "Quando o combinado muda de repente.", "Previsibilidade", Bell), // prettier-ignore
    c("dif-espera", "Espera", "Ficar parado sem saber quanto tempo.", "Ritmo", Timer),
    c("dif-comunicacao", "Comunicação", "Falar ou entender na hora.", "Comunicação", MessageSquare),
    c("dif-deslocamento", "Deslocamento", "O caminho até o lugar.", "Mobilidade", RouteIcon),
    c("dif-tempo", "Organização do tempo", "Encaixar tudo no horário.", "Tempo", CalendarClock),
    c("dif-esquecer", "Medo de esquecer informações", "Na hora não lembro do que queria.", "Memória", NotebookPen), // prettier-ignore
    c("dif-ajuda", "Necessidade de pedir ajuda", "Puxar conversa para pedir algo.", "Comunicação", Hand), // prettier-ignore
    c("dif-etapas", "Dificuldade de compreender etapas", "A ordem das coisas não fica clara.", "Compreensão", ClipboardList), // prettier-ignore
  ],
  apoios: [
    c("apo-roteiro", "Roteiro escrito", "Ter os tópicos antes ajuda.", "Preparação", NotebookPen),
    c("apo-referencia", "Pessoa de referência", "Alguém a quem eu possa perguntar.", "Apoio", Users), // prettier-ignore
    c("apo-pausa", "Pausa combinada", "Cinco minutos no meio já mudam o dia.", "Ritmo", Coffee),
    c("apo-fone", "Fone de ouvido", "Reduz o ruído do ambiente.", "Sensorial", Headphones),
    c("apo-saida", "Saber onde é a saída", "Poder sair sem explicar nada.", "Ambiente", MapPin),
    c("apo-lista", "Lista no celular", "Marco o que já resolvi.", "Organização", ListChecks),
    c("apo-mensagem", "Mensagem pronta", "Texto salvo para pedir informação.", "Comunicação", MessageSquare), // prettier-ignore
    c("apo-alternativa", "Plano alternativo", "Um segundo caminho já definido.", "Segurança", RouteIcon), // prettier-ignore
    c("apo-medicacao", "Lista de medicamentos", "Evita depender da memória.", "Saúde", Pill),
  ],
  estrategias: [
    c("est-perguntas", "Anotar três perguntas antes", "Deixo pronto o que preciso dizer.", "Comunicação", NotebookPen), // prettier-ignore
    c("est-antes", "Chegar um pouco antes", "Entro com o ambiente mais calmo.", "Tempo", Timer),
    c("est-escrito", "Combinar retorno por escrito", "Confirmo depois o que ficou combinado.", "Comunicação", MessageSquare), // prettier-ignore
    c("est-respiracao", "Respirar antes de entrar", "Um minuto parado, sem pressa.", "Autorregulação", Wind), // prettier-ignore
    c("est-blocos", "Dividir em blocos curtos", "Faço um bloco e paro.", "Ritmo", Timer),
    c("est-uma-tarefa", "Uma coisa por vez", "Escolho só a próxima.", "Organização", ListChecks),
    c("est-horario-calmo", "Ir em horário calmo", "Escolho o começo da manhã.", "Ambiente", CloudSun), // prettier-ignore
    c("est-protetor", "Levar protetor auditivo", "Reduz o impacto do som.", "Sensorial", Headphones),
    c("est-parar", "Combinar quando parar", "Se ficar intenso, eu paro.", "Autorregulação", Hand),
    c("est-rota-alternativa", "Salvar uma rota alternativa", "Se a primeira falhar, tenho outra.", "Mobilidade", RouteIcon), // prettier-ignore
    c("est-retorno", "Definir um ponto de retorno", "Sei onde posso parar.", "Segurança", MapPin),
    c("est-repetir", "Pedir para repetir", "Se não entendi, pergunto de novo.", "Comunicação", MessageSquare), // prettier-ignore
    c("est-visualizar", "Visualizar o local antes", "Fotos ou vídeo da entrada.", "Ensaio", Compass),
    c("est-registrar", "Registrar observações", "Anoto o que foi dito ou combinado.", "Registro", NotebookPen), // prettier-ignore
  ],
  conteudos: [
    "organizar-rotina",
    "planejar-pausas",
    "ambientes-intensos",
    "estrategias-de-estimulos",
    "planejar-compras",
    "comparar-trajetos",
    "rota-alternativa",
    "pedir-informacao",
    "lidar-com-atraso",
    "preparar-consulta",
  ],
};

/** Compatibilidade: o VIVA tem um único perfil demonstrativo. */
export const perfilPadrao = perfilDemonstrativo;

export function perfilPorId(_id?: string | null) {
  return perfilDemonstrativo;
}

/* ------------------------------------------------------------------ estado */

const CHAVE = "viva.perfil.preferencias.v2";

type ContextoPerfil = {
  perfil: Perfil;
  preferencias: PreferenciasDoPerfil;
  /** Verdadeiro durante a animação curta de reorganização da experiência. */
  trocando: boolean;
  definirPreferencia: (chave: ChaveDePreferencia, valor: string) => void;
  alternarPreferencia: (chave: ChaveDePreferencia, valor: string) => void;
  redefinirPreferencias: () => void;
  temPreferencia: (chave: ChaveDePreferencia, valor: string) => boolean;
};

const PerfilContext = createContext<ContextoPerfil | null>(null);

export function PerfilProvider({ children }: { children: ReactNode }) {
  const [preferencias, setPreferencias] = useState<PreferenciasDoPerfil>(
    preferenciasPadraoDoPerfil,
  );
  const [trocando, setTrocando] = useState(false);

  useEffect(() => {
    try {
      const salvo = window.localStorage.getItem(CHAVE);
      if (salvo) {
        const dados = JSON.parse(salvo) as Partial<PreferenciasDoPerfil>;
        setPreferencias({ ...preferenciasPadraoDoPerfil, ...dados });
      }
    } catch {
      /* armazenamento indisponível: seguimos com as preferências padrão */
    }
  }, []);

  const guardar = useCallback((proximas: PreferenciasDoPerfil) => {
    setPreferencias(proximas);
    try {
      window.localStorage.setItem(CHAVE, JSON.stringify(proximas));
    } catch {
      /* sem persistência: a escolha vale para esta sessão */
    }
  }, []);

  // O destaque do perfil é aplicado sem trocar a identidade do VIVA.
  useEffect(() => {
    const raiz = document.documentElement;
    raiz.style.setProperty("--destaque", perfilDemonstrativo.destaque);
    raiz.style.setProperty("--destaque-suave", perfilDemonstrativo.destaqueSuave);
    raiz.style.setProperty("--destaque-texto", perfilDemonstrativo.destaqueTexto);
    raiz.setAttribute("data-perfil", perfilDemonstrativo.id);
  }, []);

  // As preferências que mudam a percepção viram atributos de dados.
  useEffect(() => {
    const raiz = document.documentElement;
    raiz.setAttribute("data-baixa-estimulacao", String(preferencias.baixaEstimulacao));
    raiz.setAttribute("data-animacoes", String(preferencias.animacoes));
    raiz.setAttribute("data-cores", String(preferencias.cores));
  }, [preferencias.baixaEstimulacao, preferencias.animacoes, preferencias.cores]);

  const definirPreferencia = useCallback(
    (chave: ChaveDePreferencia, valor: string) => {
      guardar({ ...preferencias, [chave]: valor });
    },
    [guardar, preferencias],
  );

  const alternarPreferencia = useCallback(
    (chave: ChaveDePreferencia, valor: string) => {
      const atual = preferencias[chave];
      const lista = Array.isArray(atual) ? atual : [];
      const proxima = lista.includes(valor)
        ? lista.filter((v) => v !== valor)
        : [...lista, valor];
      guardar({ ...preferencias, [chave]: proxima });
    },
    [guardar, preferencias],
  );

  const redefinirPreferencias = useCallback(() => {
    setTrocando(true);
    guardar(preferenciasPadraoDoPerfil);
    window.setTimeout(() => setTrocando(false), 700);
  }, [guardar]);

  const temPreferencia = useCallback(
    (chave: ChaveDePreferencia, valor: string) => {
      const atual = preferencias[chave];
      return Array.isArray(atual) ? atual.includes(valor) : atual === valor;
    },
    [preferencias],
  );

  const valor = useMemo(
    () => ({
      perfil: perfilDemonstrativo,
      preferencias,
      trocando,
      definirPreferencia,
      alternarPreferencia,
      redefinirPreferencias,
      temPreferencia,
    }),
    [
      preferencias,
      trocando,
      definirPreferencia,
      alternarPreferencia,
      redefinirPreferencias,
      temPreferencia,
    ],
  );

  return <PerfilContext.Provider value={valor}>{children}</PerfilContext.Provider>;
}

export function usePerfil() {
  const ctx = useContext(PerfilContext);
  if (!ctx) throw new Error("usePerfil precisa estar dentro de PerfilProvider.");
  return ctx;
}

/** Atalho: o modo de baixa estimulação está ativo agora? */
export function baixaEstimulacaoAtiva(preferencias: PreferenciasDoPerfil) {
  return preferencias.baixaEstimulacao === "ligado";
}
