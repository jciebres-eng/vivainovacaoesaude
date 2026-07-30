/**
 * Dados fictícios e neutros para demonstrar os componentes humanos do VIVA.
 *
 * Nada aqui é registro real de saúde, prontuário, diagnóstico, triagem ou
 * prescrição (documentos 15 e 16). É apenas conteúdo de demonstração para que
 * as telas possam ser vistas com informação plausível.
 */

/** Perfil demonstrativo, sem qualquer diagnóstico associado (documento 06). */
export const pessoaDemo = {
  nome: "Alex",
  idade: 28,
  contexto: "Preparando-se para uma atividade cotidiana.",
  preferencias: [
    "Prefere instruções curtas",
    "Usa pausas planejadas",
    "Gosta de saber o que vem depois",
  ],
};

/* --------------------------------------------------------- meu momento */

export type OpcaoSimples = { id: string; rotulo: string; apoio?: string };

export const comoEstouHoje: OpcaoSimples[] = [
  { id: "tranquilo", rotulo: "Tranquilo" },
  { id: "disposto", rotulo: "Disposto" },
  { id: "cansado", rotulo: "Cansado" },
  { id: "sobrecarregado", rotulo: "Sobrecarregado" },
  { id: "inseguro", rotulo: "Inseguro" },
  { id: "sem-resposta", rotulo: "Prefiro não responder" },
];

export const energiaDisponivel: OpcaoSimples[] = [
  { id: "baixa", rotulo: "Baixa" },
  { id: "moderada", rotulo: "Moderada" },
  { id: "alta", rotulo: "Alta" },
  { id: "nao-sei", rotulo: "Não sei informar" },
];

export const contextoAtual: OpcaoSimples[] = [
  { id: "casa", rotulo: "Em casa" },
  { id: "trabalho", rotulo: "No trabalho" },
  { id: "estudando", rotulo: "Estudando" },
  { id: "deslocamento", rotulo: "Em deslocamento" },
  { id: "movimentado", rotulo: "Em um ambiente movimentado" },
  { id: "outro", rotulo: "Outro contexto" },
  { id: "sem-resposta", rotulo: "Prefiro não informar" },
];

/* ------------------------------------------------------- próximo passo */

export type PassoPossivel = {
  id: string;
  titulo: string;
  descricao: string;
  duracao: string;
  esforco: "leve" | "moderado" | "mais exigente";
  acao: string;
};

export const passosPossiveis: PassoPossivel[] = [
  {
    id: "orientacao",
    titulo: "Ler uma orientação curta",
    descricao: "Um texto breve sobre como se preparar para um trajeto.",
    duracao: "Cerca de 3 minutos",
    esforco: "leve",
    acao: "Começar este passo",
  },
  {
    id: "materiais",
    titulo: "Preparar os materiais",
    descricao: "Separar o que você quer ter por perto antes de começar.",
    duracao: "Cerca de 5 minutos",
    esforco: "leve",
    acao: "Preparar esta etapa",
  },
  {
    id: "estrategia",
    titulo: "Rever uma estratégia",
    descricao: "Olhar uma estratégia que você já reconheceu como útil.",
    duracao: "Cerca de 2 minutos",
    esforco: "leve",
    acao: "Começar este passo",
  },
  {
    id: "duvida",
    titulo: "Registrar uma dúvida",
    descricao: "Guardar algo que ficou pouco claro, para retomar depois.",
    duracao: "Cerca de 2 minutos",
    esforco: "leve",
    acao: "Começar este passo",
  },
  {
    id: "continuar",
    titulo: "Continuar a atividade anterior",
    descricao: "Voltar ao ponto onde você parou, sem recomeçar do início.",
    duracao: "Você escolhe quanto seguir",
    esforco: "moderado",
    acao: "Continuar",
  },
  {
    id: "pausa",
    titulo: "Fazer uma pausa antes de começar",
    descricao: "Ficar um tempo sem atividade também faz parte do percurso.",
    duracao: "Sem tempo definido",
    esforco: "leve",
    acao: "Começar este passo",
  },
];

/* ---------------------------------------------------------- preparação */

export const atividadeDemo = {
  nome: "Trajeto curto de transporte público",
  finalidade:
    "Reconhecer com antecedência as partes do trajeto e o que pode ajudar em cada uma.",
  descricao:
    "Uma leitura tranquila sobre o percurso, com espaço para anotar o que você quiser levar em conta.",
  etapas: 4,
  duracao: "Entre 10 e 15 minutos. Você pode interromper e continuar depois.",
  materiais: [
    "Celular",
    "Fones, se você quiser",
    "Papel e caneta, se preferir anotar",
  ],
  ambiente: [
    "Um ambiente mais tranquilo, se possível",
    "Um lugar em que você possa sentar",
    "Qualquer ambiente em que você se sinta confortável",
  ],
  depois:
    "Depois da atividade, você poderá registrar como foi e ajustar seu percurso.",
};

export const estrategiasSugeridas: OpcaoSimples[] = [
  { id: "pausa", rotulo: "Fazer uma pausa" },
  { id: "brilho", rotulo: "Reduzir o brilho da tela" },
  { id: "notificacoes", rotulo: "Silenciar notificações" },
  { id: "fones", rotulo: "Usar fones" },
  { id: "agua", rotulo: "Manter água por perto" },
  { id: "dividir", rotulo: "Dividir a atividade em partes" },
  { id: "apoio", rotulo: "Pedir apoio a alguém" },
];

/* -------------------------------------------------- registro e ajustes */

export const comoFoi: OpcaoSimples[] = [
  { id: "tranquilo", rotulo: "Foi tranquilo" },
  { id: "com-esforco", rotulo: "Foi possível com algum esforço" },
  { id: "dificil", rotulo: "Foi difícil" },
  { id: "interrompi", rotulo: "Preferi interromper" },
  { id: "minhas-palavras", rotulo: "Quero registrar com minhas palavras" },
  { id: "sem-resposta", rotulo: "Prefiro não responder" },
];

export const oQueAjudou: OpcaoSimples[] = [
  { id: "preparar", rotulo: "Preparar antes" },
  { id: "ambiente", rotulo: "Ambiente tranquilo" },
  { id: "etapas", rotulo: "Dividir em etapas" },
  { id: "apoio", rotulo: "Receber apoio" },
  { id: "pausa", rotulo: "Fazer uma pausa" },
  { id: "estrategia", rotulo: "Usar uma estratégia pessoal" },
  { id: "outro", rotulo: "Outro fator" },
];

export const oQueDificultou: OpcaoSimples[] = [
  { id: "estimulos", rotulo: "Excesso de estímulos" },
  { id: "tempo", rotulo: "Tempo insuficiente" },
  { id: "instrucoes", rotulo: "Instruções pouco claras" },
  { id: "cansaco", rotulo: "Cansaço" },
  { id: "ansiedade", rotulo: "Ansiedade" },
  { id: "interrupcoes", rotulo: "Interrupções" },
  { id: "ambiente", rotulo: "Ambiente" },
  { id: "outro", rotulo: "Outro fator" },
  { id: "sem-resposta", rotulo: "Prefiro não informar" },
];

export const ajustesPossiveis: OpcaoSimples[] = [
  { id: "manter", rotulo: "Manter como está" },
  { id: "reduzir", rotulo: "Reduzir o tamanho da atividade" },
  { id: "dividir", rotulo: "Dividir em mais etapas" },
  { id: "ambiente", rotulo: "Mudar o ambiente" },
  { id: "estrategia", rotulo: "Preparar outra estratégia" },
  { id: "apoio", rotulo: "Pedir apoio" },
  { id: "outro-momento", rotulo: "Retomar em outro momento" },
  { id: "outra", rotulo: "Registrar outra adaptação" },
];

/* --------------------------------------------------- estratégias demo */

export type EstrategiaDemo = {
  id: string;
  nome: string;
  descricao: string;
  contexto: string;
  pessoal?: boolean;
  naPreparacao?: boolean;
};

export const estrategiasDemo: EstrategiaDemo[] = [
  {
    id: "pausa-5",
    nome: "Fazer uma pausa de cinco minutos",
    descricao: "Parar por um tempo curto antes de seguir para a próxima parte.",
    contexto: "Quando a atividade for mais longa que o habitual.",
    pessoal: true,
  },
  {
    id: "fones",
    nome: "Usar fones em ambientes intensos",
    descricao: "Reduzir o som ao redor sem precisar sair do lugar.",
    contexto: "Em lugares movimentados ou com muito ruído.",
    pessoal: true,
    naPreparacao: true,
  },
  {
    id: "anotacao",
    nome: "Levar uma anotação pronta",
    descricao: "Deixar escrito o que você quer perguntar ou lembrar.",
    contexto: "Em conversas ou atendimentos.",
  },
  {
    id: "chegar-antes",
    nome: "Chegar alguns minutos antes",
    descricao: "Ter tempo para reconhecer o lugar antes de começar.",
    contexto: "Em lugares novos.",
  },
  {
    id: "dividir",
    nome: "Dividir uma tarefa em partes",
    descricao: "Separar a atividade em trechos menores, um de cada vez.",
    contexto: "Quando o conjunto parecer grande demais.",
  },
  {
    id: "por-escrito",
    nome: "Pedir instruções por escrito",
    descricao: "Ter o combinado registrado para consultar depois.",
    contexto: "Quando houver muitas informações faladas.",
  },
];

/* ------------------------------------------------------------ retomada */

export const atividadeInterrompidaDemo = {
  nome: "Trajeto curto de transporte público",
  ultimaEtapa: "Escolher uma estratégia para o trecho de espera",
  resumo:
    "Você já leu a descrição do trajeto e marcou dois pontos que gostaria de preparar melhor.",
};
