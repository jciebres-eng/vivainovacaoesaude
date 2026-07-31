/**
 * JourneyMatchComposer — dados da montagem progressiva do percurso.
 *
 * O percurso nunca aparece pronto: ele é combinado por escolhas visuais.
 * "Combinar" aqui significa compatibilidade entre intenção, modo de
 * experiência, preferências e contexto — nunca relacionamento afetivo
 * (documentos 07, 08, 10 e 17).
 *
 * Tudo é fictício e local. Nenhum backend, nenhuma inferência.
 */
import type { CenaVisual } from "@/components/viva/visual/visual-base";

export type CategoriaDeDecisao =
  | "objetivo"
  | "local"
  | "forma"
  | "rota"
  | "barreira"
  | "estrategia"
  | "treinamento"
  | "conteudo"
  | "acompanhamento"
  | "alternativa";

/**
 * Ordem canônica da montagem: objetivo, contexto, barreiras, estratégias,
 * treinamento, conteúdos, acompanhamento e plano alternativo. Cada etapa é
 * uma pergunta por vez e pode ser pulada.
 */
export const ordemCanonicaDeDecisao: CategoriaDeDecisao[] = [
  "objetivo",
  "local",
  "forma",
  "rota",
  "barreira",
  "estrategia",
  "treinamento",
  "conteudo",
  "acompanhamento",
  "alternativa",
];


export type MidiaDaEtapa =
  | { tipo: "video"; titulo: string; duracao: string; legenda: string; transcricao: string }
  | { tipo: "audio"; titulo: string; duracao: string; transcricao: string }
  | { tipo: "historia"; titulo: string; quadros: { titulo: string; descricao: string }[] }
  | { tipo: "checklist"; titulo: string; itens: string[] }
  | { tipo: "imagem"; titulo: string; descricao: string };

export type Peca = {
  id: string;
  categoria: CategoriaDeDecisao;
  titulo: string;
  apoio: string;
  /** Só visível após expansão. */
  porque: string;
  cena: CenaVisual;
  /** Informação numérica: aparece nos modos que a pedem. */
  numeros?: string;
  coordenada?: { latitude: number; longitude: number };
  midias?: MidiaDaEtapa[];
};

export const rotulosDaDecisao: Record<CategoriaDeDecisao, { titulo: string; pergunta: string }> = {
  local: { titulo: "Local", pergunta: "Onde isso acontece?" },
  forma: { titulo: "Forma de realização", pergunta: "Como você quer fazer?" },
  rota: { titulo: "Rota", pergunta: "Por qual caminho?" },
  estrategia: { titulo: "Estratégias", pergunta: "O que ajuda no caminho?" },
  conteudo: { titulo: "Conteúdos", pergunta: "Quer ver algo antes?" },
  alternativa: { titulo: "Plano alternativo", pergunta: "E se mudar de ideia?" },
};

const p = (peca: Peca): Peca => peca;

const locais: Peca[] = [
  p({
    id: "local-mercado-vila",
    categoria: "local",
    titulo: "Mercado da Vila",
    apoio: "A 12 minutos, corredores largos",
    porque: "Corresponde ao horário calmo que você marcou como preferência.",
    cena: "lugar",
    numeros: "1,4 km · 12 min",
    coordenada: { latitude: -29.9177, longitude: -51.1834 },
    midias: [
      {
        tipo: "imagem",
        titulo: "Entrada do mercado",
        descricao: "Porta de vidro à direita, com rampa e corrimão.",
      },
      {
        tipo: "video",
        titulo: "Como é a entrada",
        duracao: "0:42",
        legenda: "Legenda disponível",
        transcricao:
          "A entrada fica à direita do estacionamento. Há uma rampa e, depois dela, os carrinhos.",
      },
    ],
  }),
  p({
    id: "local-mercado-bairro",
    categoria: "local",
    titulo: "Mercado do Bairro",
    apoio: "Mais perto, menos variedade",
    porque: "Fica a três quadras e costuma ter fila curta.",
    cena: "lugar",
    numeros: "600 m · 7 min",
    coordenada: { latitude: -29.9245, longitude: -51.1755 },
    midias: [{ tipo: "checklist", titulo: "Antes de sair", itens: ["Lista no celular", "Sacola", "Fone de ouvido"] }], // prettier-ignore
  }),
  p({
    id: "local-entrega",
    categoria: "local",
    titulo: "Receber em casa",
    apoio: "Sem sair, mesma lista",
    porque: "Mantém o objetivo e retira o deslocamento.",
    cena: "atividade",
    numeros: "Chega em 2 h",
  }),
];

const formas: Peca[] = [
  p({
    id: "forma-com-apoio",
    categoria: "forma",
    titulo: "Com alguém de confiança",
    apoio: "Uma pessoa combinada antes",
    porque: "Você marcou apoio presencial como algo que facilita.",
    cena: "estrategia",
  }),
  p({
    id: "forma-sozinho",
    categoria: "forma",
    titulo: "Sozinho, no meu ritmo",
    apoio: "Com pausas quando eu quiser",
    porque: "Preserva autonomia e permite parar a qualquer momento.",
    cena: "atividade",
  }),
  p({
    id: "forma-curto",
    categoria: "forma",
    titulo: "Versão curta",
    apoio: "Só o essencial da lista",
    porque: "Reduz o tempo total quando a energia está baixa.",
    cena: "etapa",
    numeros: "18 min",
  }),
];

const rotas: Peca[] = [
  p({
    id: "rota-menos-transferencias",
    categoria: "rota",
    titulo: "Menos transferências",
    apoio: "Um ônibus direto",
    porque: "Menos trocas significa menos decisões no caminho.",
    cena: "rota",
    numeros: "1 baldeação · 22 min",
    midias: [
      {
        tipo: "historia",
        titulo: "O caminho em quatro imagens",
        quadros: [
          { titulo: "Sair de casa", descricao: "Portão à esquerda, seguir pela calçada larga." },
          { titulo: "Parada", descricao: "Abrigo azul em frente à padaria." },
          { titulo: "Descer", descricao: "Segunda parada depois da praça." },
          { titulo: "Chegar", descricao: "Entrada do mercado à direita." },
        ],
      },
      {
        tipo: "audio",
        titulo: "Orientação em áudio",
        duracao: "0:35",
        transcricao:
          "Ao sair, vire à esquerda. Caminhe até o abrigo azul. O ônibus tem letreiro Centro.",
      },
    ],
  }),
  p({
    id: "rota-a-pe",
    categoria: "rota",
    titulo: "A pé, caminho calmo",
    apoio: "Rua com menos movimento",
    porque: "Evita a avenida que você marcou como intensa.",
    cena: "rota",
    numeros: "1,4 km · 18 min",
  }),
  p({
    id: "rota-carro",
    categoria: "rota",
    titulo: "De carro por aplicativo",
    apoio: "Porta a porta",
    porque: "Reduz o tempo em ambiente com muito estímulo.",
    cena: "rota",
    numeros: "9 min",
  }),
];

const estrategias: Peca[] = [
  p({
    id: "estrategia-fone",
    categoria: "estrategia",
    titulo: "Levar fone de ouvido",
    apoio: "Reduz o som do ambiente",
    porque: "Você já usou esta estratégia e marcou como útil.",
    cena: "estrategia",
    midias: [{ tipo: "audio", titulo: "Som de referência do local", duracao: "0:20", transcricao: "Ruído baixo e constante de refrigeração ao fundo." }], // prettier-ignore
  }),
  p({
    id: "estrategia-lista",
    categoria: "estrategia",
    titulo: "Lista por corredor",
    apoio: "Uma ordem só, do começo ao fim",
    porque: "Evita decidir no meio do movimento.",
    cena: "estrategia",
    midias: [{ tipo: "checklist", titulo: "Lista da semana", itens: ["Frutas", "Pão", "Leite", "Arroz"] }], // prettier-ignore
  }),
  p({
    id: "estrategia-pausa",
    categoria: "estrategia",
    titulo: "Pausa combinada",
    apoio: "Cinco minutos antes do caixa",
    porque: "Você marcou a fila como o ponto mais cansativo.",
    cena: "estrategia",
  }),
];

const conteudos: Peca[] = [
  p({
    id: "conteudo-ambientes",
    categoria: "conteudo",
    titulo: "Ambientes intensos",
    apoio: "Vídeo curto, com legenda",
    porque: "Relacionado ao local escolhido.",
    cena: "conteudo",
    numeros: "2:10",
    midias: [
      {
        tipo: "video",
        titulo: "Ambientes intensos",
        duracao: "2:10",
        legenda: "Legenda em português",
        transcricao:
          "Ambientes com muitos estímulos podem ser preparados antes. Escolher horário e saber a saída ajuda.",
      },
    ],
  }),
  p({
    id: "conteudo-pausas",
    categoria: "conteudo",
    titulo: "Planejar pausas",
    apoio: "Áudio de três minutos",
    porque: "Acompanha a estratégia de pausa combinada.",
    cena: "conteudo",
    numeros: "3:00",
    midias: [
      {
        tipo: "audio",
        titulo: "Planejar pausas",
        duracao: "3:00",
        transcricao: "Uma pausa combinada antes do momento mais difícil muda o resto do percurso.",
      },
    ],
  }),
];

const alternativas: Peca[] = [
  p({
    id: "alternativa-voltar",
    categoria: "alternativa",
    titulo: "Posso voltar antes",
    apoio: "Sem concluir a lista",
    porque: "Interromper faz parte do percurso, não é falha.",
    cena: "alternativa",
  }),
  p({
    id: "alternativa-outro-dia",
    categoria: "alternativa",
    titulo: "Deixar para amanhã",
    apoio: "O percurso fica guardado",
    porque: "O que você montou continua aqui, do mesmo jeito.",
    cena: "alternativa",
  }),
  p({
    id: "alternativa-apoio",
    categoria: "alternativa",
    titulo: "Chamar apoio no caminho",
    apoio: "Uma pessoa de confiança",
    porque: "Você pode compartilhar apenas o status, sem localização.",
    cena: "alternativa",
  }),
];

const porCategoria: Record<CategoriaDeDecisao, Peca[]> = {
  local: locais,
  forma: formas,
  rota: rotas,
  estrategia: estrategias,
  conteudo: conteudos,
  alternativa: alternativas,
};

export function opcoesDaDecisao(categoria: CategoriaDeDecisao, descartadas: string[] = []) {
  return porCategoria[categoria].filter((peca) => !descartadas.includes(peca.id));
}

export function pecaPorId(id: string) {
  return Object.values(porCategoria)
    .flat()
    .find((peca) => peca.id === id);
}
