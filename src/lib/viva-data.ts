// Dados fictícios da demonstração VIVA.
// Fonte de autoridade: documentos da biblioteca (esp. 06, 07, 08, 09, 10, 11, 12).
// Nenhuma regra de negócio nesta etapa — apenas conteúdo para navegação.

export type Persona = {
  id: string;
  nome: string;
  tema: string;
  resumo: string;
  objetivoSugerido: string;
};

export const personas: Persona[] = [
  {
    id: "lucas",
    nome: "Lucas",
    tema: "Mobilidade e faculdade",
    resumo:
      "Utiliza mapas simples, prefere instruções escritas e quer ir à faculdade com mais autonomia.",
    objetivoSugerido: "Chegar à faculdade com mais autonomia",
  },
  {
    id: "mariana",
    nome: "Mariana",
    tema: "Alimentação e compras",
    resumo:
      "Organiza listas no celular, sente desconforto com ambientes muito cheios e quer fazer compras sozinha.",
    objetivoSugerido: "Fazer as compras da semana no meu tempo",
  },
  {
    id: "rafael",
    nome: "Rafael",
    tema: "Trabalho e reuniões",
    resumo:
      "Trabalha com apoio da equipe, prefere combinar assuntos por escrito antes das reuniões.",
    objetivoSugerido: "Participar de reuniões com mais previsibilidade",
  },
  {
    id: "ana",
    nome: "Ana",
    tema: "Saúde e consultas",
    resumo:
      "Acompanha consultas com apoio da irmã e quer organizar perguntas antes do atendimento.",
    objetivoSugerido: "Ir a uma consulta e falar o que preciso",
  },
];

export type Conteudo = {
  id: string;
  titulo: string;
  categoria: string;
  minutos: number;
  resumo: string;
  passos: string[];
};

export const conteudos: Conteudo[] = [
  {
    id: "rota-alternativa",
    titulo: "Como preparar uma rota alternativa",
    categoria: "Mobilidade",
    minutos: 2,
    resumo:
      "Uma rota alternativa ajuda quando a primeira opção não está disponível.",
    passos: [
      "Salve outro trajeto.",
      "Identifique um ponto de retorno.",
      "Defina quem pode ajudar.",
      "Considere interromper.",
    ],
  },
  {
    id: "pedir-informacao",
    titulo: "Como pedir informação por mensagem",
    categoria: "Comunicação",
    minutos: 2,
    resumo:
      "Uma mensagem pronta reduz o esforço de falar em um momento de tensão.",
    passos: [
      "Escreva a pergunta antes de sair.",
      "Use uma frase curta e direta.",
      "Deixe a mensagem salva no celular.",
      "Combine quem responde, se precisar.",
    ],
  },
  {
    id: "ruido",
    titulo: "Como reduzir o impacto do ruído",
    categoria: "Sensorial",
    minutos: 3,
    resumo:
      "Pequenos ajustes podem tornar um ambiente intenso mais suportável.",
    passos: [
      "Escolha horários com menos movimento.",
      "Leve protetor auditivo ou fone.",
      "Combine pausas no trajeto.",
      "Identifique um lugar mais calmo.",
    ],
  },
  {
    id: "pausa",
    titulo: "Quando fazer uma pausa",
    categoria: "Autorregulação",
    minutos: 2,
    resumo: "Pausar é parte do plano, não uma falha do plano.",
    passos: [
      "Reconheça sinais de cansaço.",
      "Escolha antes onde pode parar.",
      "Avise a pessoa de apoio, se quiser.",
      "Retome no seu tempo.",
    ],
  },
];
