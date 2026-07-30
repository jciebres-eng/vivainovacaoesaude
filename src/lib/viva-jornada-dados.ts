/**
 * Dados demonstrativos do percurso principal do VIVA (Fase 3).
 *
 * Tudo aqui é ficção neutra, definida previamente e guardada apenas no
 * dispositivo. Não há IA generativa, inferência, diagnóstico, triagem,
 * pontuação ou previsão de comportamento (documentos 15 e 16).
 */

export const pessoaDoPercurso = {
  nome: "Alex",
  idade: 28,
  preferencias: [
    "Instruções curtas",
    "Poucas opções por tela",
    "Modo de baixa estimulação disponível",
    "Possibilidade de pausa a qualquer momento",
    "Linguagem direta",
    "Armazenamento somente local",
  ],
};

/* ------------------------------------------------------------- ritmo */

export const ritmosDoMomento = [
  { id: "breve", rotulo: "Um passo breve" },
  { id: "maior", rotulo: "Posso realizar uma atividade maior" },
  { id: "explorar", rotulo: "Quero apenas explorar" },
  { id: "continuar", rotulo: "Prefiro continuar algo já iniciado" },
  { id: "nao-sei", rotulo: "Ainda não sei" },
  { id: "sem-resposta", rotulo: "Prefiro não responder" },
];

export const necessidadeDeEstimulos = [
  { id: "reduzir", rotulo: "Prefiro reduzir estímulos agora" },
  { id: "indiferente", rotulo: "Está confortável assim" },
  { id: "sem-resposta", rotulo: "Prefiro não responder" },
];

/* -------------------------------------------------- objetivos possíveis */

export type Objetivo = {
  id: string;
  categoriaId: string;
  nome: string;
  paraQue: string;
  etapasPrevistas: number;
  duracao: string;
  /** Quando falso, o objetivo aparece como possibilidade futura. */
  disponivel: boolean;
};

export type Categoria = {
  id: string;
  nome: string;
  apoio: string;
};

export const categorias: Categoria[] = [
  {
    id: "mobilidade",
    nome: "Mobilidade",
    apoio: "Deslocamentos, trajetos e imprevistos de caminho.",
  },
  {
    id: "alimentacao",
    nome: "Alimentação",
    apoio: "Compras, refeições e alternativas possíveis.",
  },
  {
    id: "autorregulacao",
    nome: "Autorregulação",
    apoio: "Pausas, ambientes intensos e estratégias pessoais.",
  },
  {
    id: "saude",
    nome: "Saúde e organização pessoal",
    apoio: "Consultas, dúvidas, documentos e registros.",
  },
];

export const objetivos: Objetivo[] = [
  {
    id: "rota-alternativa",
    categoriaId: "mobilidade",
    nome: "Preparar uma rota alternativa",
    paraQue:
      "Esta atividade ajuda a organizar outra possibilidade de trajeto antes de um deslocamento.",
    etapasPrevistas: 4,
    duracao: "Cerca de 10 minutos",
    disponivel: true,
  },
  {
    id: "comparar-trajetos",
    categoriaId: "mobilidade",
    nome: "Comparar dois trajetos",
    paraQue: "Ajuda a observar diferenças entre dois caminhos possíveis.",
    etapasPrevistas: 3,
    duracao: "Cerca de 8 minutos",
    disponivel: false,
  },
  {
    id: "pedir-informacao",
    categoriaId: "mobilidade",
    nome: "Planejar como pedir informação",
    paraQue: "Ajuda a preparar palavras para pedir orientação em um local desconhecido.",
    etapasPrevistas: 3,
    duracao: "Cerca de 6 minutos",
    disponivel: false,
  },
  {
    id: "atraso",
    categoriaId: "mobilidade",
    nome: "Organizar o que fazer diante de um atraso",
    paraQue: "Ajuda a pensar antes em possibilidades para um imprevisto.",
    etapasPrevistas: 3,
    duracao: "Cerca de 6 minutos",
    disponivel: false,
  },
  {
    id: "alimentos-tolerados",
    categoriaId: "alimentacao",
    nome: "Registrar alimentos tolerados",
    paraQue: "Ajuda a guardar o que costuma funcionar bem para você.",
    etapasPrevistas: 3,
    duracao: "Cerca de 6 minutos",
    disponivel: false,
  },
  {
    id: "planejar-compra",
    categoriaId: "alimentacao",
    nome: "Planejar uma compra",
    paraQue: "Ajuda a organizar uma ida ao mercado com menos decisões no local.",
    etapasPrevistas: 4,
    duracao: "Cerca de 10 minutos",
    disponivel: false,
  },
  {
    id: "perguntas-nutricionista",
    categoriaId: "alimentacao",
    nome: "Preparar perguntas para nutricionista",
    paraQue: "Ajuda a deixar dúvidas escritas antes de uma conversa.",
    etapasPrevistas: 3,
    duracao: "Cerca de 7 minutos",
    disponivel: false,
  },
  {
    id: "alternativas-refeicao",
    categoriaId: "alimentacao",
    nome: "Organizar alternativas para uma refeição",
    paraQue: "Ajuda a ter outra possibilidade quando algo não funcionar.",
    etapasPrevistas: 3,
    duracao: "Cerca de 6 minutos",
    disponivel: false,
  },
  {
    id: "planejar-pausa",
    categoriaId: "autorregulacao",
    nome: "Planejar uma pausa",
    paraQue: "Ajuda a decidir antes onde e como pausar durante uma atividade.",
    etapasPrevistas: 3,
    duracao: "Cerca de 5 minutos",
    disponivel: false,
  },
  {
    id: "ambiente-intenso",
    categoriaId: "autorregulacao",
    nome: "Identificar um ambiente intenso",
    paraQue: "Ajuda a reconhecer o que costuma pesar em um ambiente.",
    etapasPrevistas: 3,
    duracao: "Cerca de 6 minutos",
    disponivel: false,
  },
  {
    id: "rever-estrategias",
    categoriaId: "autorregulacao",
    nome: "Rever estratégias pessoais",
    paraQue: "Ajuda a reencontrar o que já foi útil em outras vezes.",
    etapasPrevistas: 2,
    duracao: "Cerca de 4 minutos",
    disponivel: false,
  },
  {
    id: "preparar-cotidiano",
    categoriaId: "autorregulacao",
    nome: "Preparar-se para uma atividade cotidiana",
    paraQue: "Ajuda a antecipar o que vem pela frente em algo do dia a dia.",
    etapasPrevistas: 3,
    duracao: "Cerca de 7 minutos",
    disponivel: false,
  },
  {
    id: "preparar-consulta",
    categoriaId: "saude",
    nome: "Preparar uma consulta",
    paraQue: "Ajuda a organizar o que você quer contar e perguntar.",
    etapasPrevistas: 4,
    duracao: "Cerca de 10 minutos",
    disponivel: false,
  },
  {
    id: "organizar-duvidas",
    categoriaId: "saude",
    nome: "Organizar dúvidas",
    paraQue: "Ajuda a reunir dúvidas soltas em um só lugar.",
    etapasPrevistas: 2,
    duracao: "Cerca de 5 minutos",
    disponivel: false,
  },
  {
    id: "registrar-percepcoes",
    categoriaId: "saude",
    nome: "Registrar percepções",
    paraQue: "Ajuda a guardar observações suas, com suas palavras.",
    etapasPrevistas: 2,
    duracao: "Cerca de 5 minutos",
    disponivel: false,
  },
  {
    id: "separar-documentos",
    categoriaId: "saude",
    nome: "Separar documentos necessários",
    paraQue: "Ajuda a deixar preparado o que precisa ser levado.",
    etapasPrevistas: 3,
    duracao: "Cerca de 6 minutos",
    disponivel: false,
  },
];

export function objetivoPorId(id?: string | null) {
  return objetivos.find((o) => o.id === id);
}

/* ---------------------------------------------------------- preparação */

export const preparacaoDoObjetivo = {
  "rota-alternativa": {
    nome: "Preparar uma rota alternativa",
    finalidade: "Organizar outra possibilidade de trajeto antes de um deslocamento.",
    descricao:
      "Uma sequência curta de anotações suas sobre destino, caminho alternativo e informações úteis.",
    etapas: 4,
    duracao: "Cerca de 10 minutos. Pode ser interrompida a qualquer momento.",
    materiais: [
      "Celular ou papel",
      "Uma informação que você já conhece do trajeto",
      "Nada além disso é necessário",
    ],
    ambiente: [
      "Um lugar em que você possa sentar",
      "Se possível, um ambiente mais tranquilo",
      "Qualquer ambiente em que você se sinta confortável",
    ],
    durante:
      "Durante a atividade, aparecerá uma etapa por tela, com uma instrução curta e espaço para escrever, se você quiser.",
    depois:
      "Depois da atividade, você poderá registrar como foi, refletir e escolher um próximo passo. Nada disso é obrigatório.",
  },
} as const;

export const estrategiasDaPreparacao = [
  { id: "pausa", rotulo: "Combinar uma pausa antes de começar" },
  { id: "dividir", rotulo: "Dividir a atividade em partes menores" },
  { id: "fones", rotulo: "Usar fones ou protetor auricular" },
  { id: "referencia", rotulo: "Usar um ponto de referência conhecido" },
  { id: "silenciar", rotulo: "Silenciar notificações" },
  { id: "apoio", rotulo: "Avisar alguém de confiança" },
];

export const ritmosDaAtividade = [
  { id: "breve", rotulo: "Breve", apoio: "Só o essencial em cada etapa." },
  { id: "padrao", rotulo: "Padrão", apoio: "Instrução com um exemplo." },
  {
    id: "partes",
    rotulo: "Dividido em partes",
    apoio: "Uma etapa por vez, com lembrete de pausa.",
  },
];

/* ----------------------------------------------------- etapas da atividade */

export type EtapaDaAtividade = {
  id: string;
  titulo: string;
  instrucao: string;
  exemplo: string;
  rotuloCampo: string;
  placeholder: string;
  /** Ajuda contextual previamente definida — sem IA (documento 15). */
  ajuda: string[];
};

export const etapasDaAtividade: Record<string, EtapaDaAtividade[]> = {
  "rota-alternativa": [
    {
      id: "destino",
      titulo: "Identificar o destino",
      instrucao: "Registre para onde você precisa ir.",
      exemplo: "Por exemplo: “consultório na avenida central”.",
      rotuloCampo: "Destino",
      placeholder: "Escreva com suas palavras, se quiser",
      ajuda: [
        "Você pode registrar apenas o nome do local.",
        "Se preferir, escreva só a região ou o bairro.",
        "Também é possível deixar esta etapa em branco e seguir adiante.",
      ],
    },
    {
      id: "alternativa",
      titulo: "Observar outra possibilidade",
      instrucao: "Escolha uma segunda forma possível de chegar ao destino.",
      exemplo: "Por exemplo: “descer uma parada antes e caminhar”.",
      rotuloCampo: "Outra forma de chegar",
      placeholder: "Uma alternativa que pareça possível",
      ajuda: [
        "Não precisa ser a melhor alternativa, apenas uma possível.",
        "Você pode dividir esta atividade em partes menores.",
        "Se nada vier agora, siga adiante e volte depois.",
      ],
    },
    {
      id: "informacao",
      titulo: "Preparar informações úteis",
      instrucao:
        "Anote um ponto de referência ou uma informação que poderá ajudar durante o trajeto.",
      exemplo: "Por exemplo: “a padaria da esquina fica antes do ponto”.",
      rotuloCampo: "Informação útil",
      placeholder: "Algo que ajude a se localizar",
      ajuda: [
        "Considere um ponto de referência que você já conhece.",
        "Pode ser o horário em que costuma ter menos gente.",
        "Uma informação basta.",
      ],
    },
    {
      id: "estrategia",
      titulo: "Definir uma estratégia",
      instrucao: "Escolha o que poderá fazer se houver atraso ou mudança de rota.",
      exemplo: "Por exemplo: “parar em um lugar tranquilo e reler minhas notas”.",
      rotuloCampo: "Minha estratégia",
      placeholder: "O que pode ajudar se algo mudar",
      ajuda: [
        "Você pode reaproveitar uma estratégia que já usou antes.",
        "Fazer uma pausa também é uma estratégia.",
        "Também é possível escolher esta etapa depois.",
      ],
    },
  ],
};

/* --------------------------------------------------------- próximo passo */

export type PassoDoPercurso = {
  id: string;
  titulo: string;
  descricao: string;
  duracao: string;
  esforco: "leve" | "moderado" | "mais exigente";
  acao: string;
};

export const passosDoPercurso: PassoDoPercurso[] = [
  {
    id: "rever-estrategia",
    titulo: "Rever a estratégia utilizada",
    descricao: "Olhar de novo o que você escolheu fazer diante de um imprevisto.",
    duracao: "Cerca de 2 minutos",
    esforco: "leve",
    acao: "Escolher este passo",
  },
  {
    id: "salvar-biblioteca",
    titulo: "Salvar uma informação na biblioteca",
    descricao: "Guardar algo desta experiência para reencontrar depois.",
    duracao: "Cerca de 2 minutos",
    esforco: "leve",
    acao: "Escolher este passo",
  },
  {
    id: "outra-situacao",
    titulo: "Preparar outra situação semelhante",
    descricao: "Usar o mesmo caminho para outra saída parecida.",
    duracao: "Cerca de 10 minutos",
    esforco: "moderado",
    acao: "Escolher este passo",
  },
  {
    id: "pausa",
    titulo: "Fazer uma pausa e retomar depois",
    descricao: "Interromper agora e continuar quando fizer sentido.",
    duracao: "Sem tempo definido",
    esforco: "leve",
    acao: "Escolher este passo",
  },
  {
    id: "encerrar",
    titulo: "Encerrar o percurso por hoje",
    descricao: "Guardar o que foi registrado e sair da demonstração.",
    duracao: "Agora",
    esforco: "leve",
    acao: "Escolher este passo",
  },
];

/* ------------------------------------------------- reflexão (perguntas) */

export const perguntasDeReflexao = [
  {
    id: "lembrar",
    rotulo: "Há algo desta experiência que você gostaria de lembrar?",
  },
  {
    id: "estrategia",
    rotulo: "Alguma estratégia merece ser utilizada novamente?",
  },
  { id: "mudar", rotulo: "Gostaria de mudar algo neste percurso?" },
  { id: "duvida", rotulo: "Esta experiência trouxe alguma nova dúvida?" },
];

/* ------------------------------------------- demonstrações futuras (cards) */

export const demonstracoesFuturas = [
  {
    id: "preparar-consulta",
    nome: "Preparar uma consulta",
    apoio: "Organizar o que contar e perguntar antes de um atendimento.",
  },
  {
    id: "planejar-compra",
    nome: "Planejar uma compra",
    apoio: "Reduzir decisões no momento da ida ao mercado.",
  },
  {
    id: "planejar-pausa",
    nome: "Organizar uma pausa",
    apoio: "Decidir antes onde e como pausar.",
  },
  {
    id: "pedir-informacao",
    nome: "Pedir informação em um local desconhecido",
    apoio: "Preparar palavras para pedir orientação.",
  },
];
