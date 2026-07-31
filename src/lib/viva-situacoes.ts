/**
 * Catálogo de situações reais — base do copiloto de percursos funcionais.
 *
 * Cada situação descreve um percurso completo e demonstrativo: etapas curtas,
 * estratégias possíveis, conteúdos da biblioteca e planos alternativos.
 * Nada aqui é obrigatório: tudo é oferta, e a pessoa edita o que quiser
 * (documentos 00, 04, 08, 10 e 11).
 */
import type { IdDeContexto } from "./viva-intencao";

export type MeioDeDeslocamento = "a-pe" | "onibus" | "metro" | "carro" | "aplicativo" | "sem-deslocamento";

export const rotulosDeMeio: Record<MeioDeDeslocamento, string> = {
  "a-pe": "A pé",
  onibus: "Ônibus",
  metro: "Metrô ou trem",
  carro: "Carro",
  aplicativo: "Carro por aplicativo",
  "sem-deslocamento": "Sem deslocamento",
};

export type ModeloDeEtapa = {
  id: string;
  titulo: string;
  apoio: string;
  minutos: number;
  referencia?: string;
};

export type ModeloDeEstrategia = {
  id: string;
  titulo: string;
  frase: string;
  motivo: string;
};

export type ModeloDeAlternativa = {
  id: string;
  titulo: string;
  frase: string;
};

export type Situacao = {
  id: string;
  titulo: string;
  resumo: string;
  contexto: IdDeContexto;
  termos: string[];
  origemSugerida: string;
  destinoSugerido: string;
  meioSugerido: MeioDeDeslocamento;
  horarioSugerido: string;
  duracaoAproximada: string;
  etapas: ModeloDeEtapa[];
  estrategias: ModeloDeEstrategia[];
  alternativas: ModeloDeAlternativa[];
  /** IDs de conteúdos da biblioteca relacionados a esta situação. */
  conteudos: string[];
};

const estrategiasComuns: Record<string, ModeloDeEstrategia> = {
  horarioTranquilo: {
    id: "horario-tranquilo",
    titulo: "Escolher um horário mais tranquilo",
    frase: "Ir fora do pico costuma reduzir barulho, fila e pressa.",
    motivo: "Menos estímulos simultâneos.",
  },
  pausas: {
    id: "pausas-planejadas",
    titulo: "Combinar pausas comigo mesmo",
    frase: "Uma pausa curta a cada etapa, mesmo que pareça desnecessária.",
    motivo: "Evita acúmulo de sobrecarga.",
  },
  frasesProntas: {
    id: "frases-prontas",
    titulo: "Levar frases prontas",
    frase: "Ter o que dizer reduz o esforço de improvisar na hora.",
    motivo: "Diminui a carga de comunicação.",
  },
  saidaFacil: {
    id: "saida-facil",
    titulo: "Saber onde é a saída",
    frase: "Identificar antes por onde sair se precisar interromper.",
    motivo: "Sensação de controle.",
  },
  listaCurta: {
    id: "lista-curta",
    titulo: "Levar uma lista curta",
    frase: "Poucos itens, na ordem do caminho.",
    motivo: "Menos decisões durante a atividade.",
  },
  fone: {
    id: "reduzir-estimulos",
    titulo: "Reduzir estímulos",
    frase: "Fone, boné ou óculos escuros ajudam em ambientes intensos.",
    motivo: "Filtra o excesso sensorial.",
  },
  chegarAntes: {
    id: "chegar-antes",
    titulo: "Chegar um pouco antes",
    frase: "Chegar cedo dá tempo de reconhecer o ambiente sem pressa.",
    motivo: "Reduz imprevisibilidade.",
  },
  acompanhar: {
    id: "avisar-alguem",
    titulo: "Avisar alguém de confiança",
    frase: "Alguém sabendo que você está a caminho, se você quiser.",
    motivo: "Apoio disponível sem vigilância.",
  },
};

const alternativasComuns: Record<string, ModeloDeAlternativa> = {
  adiar: {
    id: "adiar",
    titulo: "Adiar para outro dia",
    frase: "Adiar é uma escolha válida, não uma falha.",
  },
  reduzir: {
    id: "reduzir",
    titulo: "Fazer uma versão menor",
    frase: "Cumprir só a primeira etapa já conta.",
  },
  companhia: {
    id: "companhia",
    titulo: "Ir com companhia",
    frase: "Pedir para alguém ir junto muda bastante a experiência.",
  },
  remoto: {
    id: "remoto",
    titulo: "Resolver à distância",
    frase: "Telefone, aplicativo ou mensagem podem resolver parte disso.",
  },
};

export const situacoes: Situacao[] = [
  {
    id: "mercado",
    titulo: "Ir ao mercado",
    resumo: "Uma ida curta ao mercado, com lista breve e caixa escolhido antes.",
    contexto: "compras",
    termos: ["mercado", "supermercado", "compras", "comprar", "feira"],
    origemSugerida: "Casa",
    destinoSugerido: "Mercado do bairro",
    meioSugerido: "a-pe",
    horarioSugerido: "10:00",
    duracaoAproximada: "40 minutos",
    etapas: [
      { id: "lista", titulo: "Montar uma lista curta", apoio: "Cinco itens bastam para hoje.", minutos: 5 },
      { id: "sair", titulo: "Sair de casa", apoio: "Documento, cartão e sacola.", minutos: 3, referencia: "Portaria" },
      { id: "caminho", titulo: "Caminho até o mercado", apoio: "Trajeto conhecido, sem pressa.", minutos: 10, referencia: "Praça da esquina" },
      { id: "compra", titulo: "Pegar os itens da lista", apoio: "Na ordem do corredor, sem voltar atrás.", minutos: 15, referencia: "Corredor de secos" },
      { id: "caixa", titulo: "Passar no caixa", apoio: "Fila menor costuma ser a do autoatendimento.", minutos: 7, referencia: "Caixas" },
      { id: "volta", titulo: "Voltar para casa", apoio: "Chegar e descansar antes de guardar tudo.", minutos: 10 },
    ],
    estrategias: [estrategiasComuns.listaCurta, estrategiasComuns.horarioTranquilo, estrategiasComuns.fone, estrategiasComuns.saidaFacil],
    alternativas: [alternativasComuns.reduzir, alternativasComuns.remoto, alternativasComuns.adiar],
    conteudos: ["planejar-compras", "alimentos-tolerados", "ambientes-intensos"],
  },
  {
    id: "onibus",
    titulo: "Pegar o ônibus",
    resumo: "Um deslocamento de ônibus com ponto, linha e plano alternativo definidos antes.",
    contexto: "mobilidade",
    termos: ["ônibus", "onibus", "ponto", "transporte", "linha"],
    origemSugerida: "Casa",
    destinoSugerido: "Centro",
    meioSugerido: "onibus",
    horarioSugerido: "09:30",
    duracaoAproximada: "50 minutos",
    etapas: [
      { id: "conferir", titulo: "Conferir a linha e o horário", apoio: "Anotar a linha e o ponto de descida.", minutos: 5 },
      { id: "ponto", titulo: "Ir até o ponto", apoio: "Chegar alguns minutos antes.", minutos: 10, referencia: "Ponto da avenida" },
      { id: "espera", titulo: "Esperar o ônibus", apoio: "A espera pode variar. Isso é normal.", minutos: 10, referencia: "Ponto" },
      { id: "viagem", titulo: "Durante a viagem", apoio: "Sentar perto da porta ajuda a sair com calma.", minutos: 20, referencia: "Dentro do ônibus" },
      { id: "descer", titulo: "Descer no ponto certo", apoio: "Um ponto de referência antes já serve de aviso.", minutos: 5, referencia: "Ponto de destino" },
    ],
    estrategias: [estrategiasComuns.chegarAntes, estrategiasComuns.fone, estrategiasComuns.acompanhar, estrategiasComuns.pausas],
    alternativas: [alternativasComuns.companhia, alternativasComuns.adiar, alternativasComuns.reduzir],
    conteudos: ["comparar-trajetos", "rota-alternativa", "lidar-com-atraso"],
  },
  {
    id: "metro",
    titulo: "Usar metrô ou trem",
    resumo: "Deslocamento sobre trilhos, com baldeação prevista e saída identificada.",
    contexto: "mobilidade",
    termos: ["metrô", "metro", "trem", "estação", "estacao", "baldeação"],
    origemSugerida: "Estação próxima de casa",
    destinoSugerido: "Estação do destino",
    meioSugerido: "metro",
    horarioSugerido: "10:30",
    duracaoAproximada: "45 minutos",
    etapas: [
      { id: "bilhete", titulo: "Conferir bilhete ou cartão", apoio: "Saldo suficiente evita fila extra.", minutos: 4 },
      { id: "entrar", titulo: "Entrar na estação", apoio: "Catracas costumam ficar logo após a escada.", minutos: 6, referencia: "Bloqueios" },
      { id: "plataforma", titulo: "Esperar na plataforma", apoio: "A ponta da plataforma costuma ser menos cheia.", minutos: 8, referencia: "Plataforma" },
      { id: "trajeto", titulo: "Durante o trajeto", apoio: "Contar as estações ajuda a manter a referência.", minutos: 20 },
      { id: "saida", titulo: "Sair pela saída certa", apoio: "Anotar o número da saída antes evita rodar.", minutos: 7, referencia: "Saída principal" },
    ],
    estrategias: [estrategiasComuns.fone, estrategiasComuns.horarioTranquilo, estrategiasComuns.saidaFacil],
    alternativas: [alternativasComuns.companhia, alternativasComuns.adiar],
    conteudos: ["comparar-trajetos", "estrategias-de-estimulos", "rota-alternativa"],
  },
  {
    id: "consulta",
    titulo: "Ir a uma consulta",
    resumo: "Consulta de saúde com dúvidas anotadas antes e registro depois.",
    contexto: "saude",
    termos: ["consulta", "médico", "medico", "clínica", "clinica", "exame", "dentista", "posto"],
    origemSugerida: "Casa",
    destinoSugerido: "Clínica",
    meioSugerido: "onibus",
    horarioSugerido: "14:00",
    duracaoAproximada: "1 hora e 30 minutos",
    etapas: [
      { id: "documentos", titulo: "Separar documentos e exames", apoio: "Tudo em uma pasta só.", minutos: 10 },
      { id: "duvidas", titulo: "Anotar as dúvidas", apoio: "Três perguntas já ajudam muito.", minutos: 8 },
      { id: "ida", titulo: "Ida até o local", apoio: "Sair com folga reduz a pressa.", minutos: 30, referencia: "Recepção" },
      { id: "espera", titulo: "Sala de espera", apoio: "A espera pode passar do horário marcado.", minutos: 20, referencia: "Sala de espera" },
      { id: "atendimento", titulo: "Durante o atendimento", apoio: "Pedir para repetir é legítimo.", minutos: 20, referencia: "Consultório" },
      { id: "registro", titulo: "Registrar o que foi dito", apoio: "Logo depois, enquanto está fresco.", minutos: 10 },
    ],
    estrategias: [estrategiasComuns.frasesProntas, estrategiasComuns.chegarAntes, estrategiasComuns.acompanhar, estrategiasComuns.pausas],
    alternativas: [alternativasComuns.companhia, alternativasComuns.remoto, alternativasComuns.adiar],
    conteudos: ["preparar-consulta", "organizar-documentos", "registrar-duvidas", "perguntas-nutricionista"],
  },
  {
    id: "farmacia",
    titulo: "Resolver algo na farmácia",
    resumo: "Uma ida objetiva: pegar o que precisa e voltar.",
    contexto: "saude",
    termos: ["farmácia", "farmacia", "remédio", "remedio", "receita"],
    origemSugerida: "Casa",
    destinoSugerido: "Farmácia",
    meioSugerido: "a-pe",
    horarioSugerido: "11:00",
    duracaoAproximada: "30 minutos",
    etapas: [
      { id: "receita", titulo: "Conferir receita ou nome do item", apoio: "Uma foto no celular resolve.", minutos: 4 },
      { id: "ida", titulo: "Ida até a farmácia", apoio: "Trajeto curto e conhecido.", minutos: 8, referencia: "Entrada" },
      { id: "balcao", titulo: "Falar no balcão", apoio: "Mostrar a foto também funciona.", minutos: 8, referencia: "Balcão" },
      { id: "volta", titulo: "Voltar", apoio: "Sem paradas extras se não fizer sentido hoje.", minutos: 8 },
    ],
    estrategias: [estrategiasComuns.frasesProntas, estrategiasComuns.horarioTranquilo],
    alternativas: [alternativasComuns.remoto, alternativasComuns.reduzir],
    conteudos: ["pedir-informacao", "registrar-efeitos"],
  },
  {
    id: "reuniao",
    titulo: "Participar de uma reunião",
    resumo: "Reunião de trabalho com pauta lida antes e saída combinada.",
    contexto: "trabalho",
    termos: ["reunião", "reuniao", "trabalho", "escritório", "escritorio", "equipe"],
    origemSugerida: "Mesa de trabalho",
    destinoSugerido: "Sala de reunião",
    meioSugerido: "sem-deslocamento",
    horarioSugerido: "15:00",
    duracaoAproximada: "1 hora",
    etapas: [
      { id: "pauta", titulo: "Ler a pauta", apoio: "Saber a ordem reduz surpresas.", minutos: 10 },
      { id: "anotacoes", titulo: "Preparar duas anotações", apoio: "O que você quer dizer e o que quer perguntar.", minutos: 8 },
      { id: "entrar", titulo: "Entrar na reunião", apoio: "Chegar um pouco antes ajuda a escolher o lugar.", minutos: 5, referencia: "Sala" },
      { id: "durante", titulo: "Durante a reunião", apoio: "Escrever antes de falar é uma estratégia válida.", minutos: 30 },
      { id: "depois", titulo: "Depois", apoio: "Cinco minutos sozinho antes da próxima tarefa.", minutos: 10 },
    ],
    estrategias: [estrategiasComuns.frasesProntas, estrategiasComuns.pausas, estrategiasComuns.saidaFacil],
    alternativas: [alternativasComuns.remoto, alternativasComuns.reduzir, alternativasComuns.adiar],
    conteudos: ["organizar-rotina", "planejar-pausas", "pedir-informacao"],
  },
  {
    id: "entrevista",
    titulo: "Ir a uma entrevista",
    resumo: "Preparação para entrevista, com ensaio das respostas mais prováveis.",
    contexto: "trabalho",
    termos: ["entrevista", "emprego", "seleção", "selecao", "vaga"],
    origemSugerida: "Casa",
    destinoSugerido: "Empresa",
    meioSugerido: "metro",
    horarioSugerido: "10:00",
    duracaoAproximada: "2 horas",
    etapas: [
      { id: "material", titulo: "Separar documentos e currículo", apoio: "Impresso e no celular.", minutos: 10 },
      { id: "ensaio", titulo: "Ensaiar três respostas", apoio: "Apresentação, experiência e uma dificuldade.", minutos: 15 },
      { id: "ida", titulo: "Ida até o local", apoio: "Sair com folga grande.", minutos: 40, referencia: "Recepção" },
      { id: "espera", titulo: "Espera na recepção", apoio: "Respirar e reler suas anotações.", minutos: 15, referencia: "Recepção" },
      { id: "entrevista", titulo: "Durante a entrevista", apoio: "Pedir um instante para pensar é aceitável.", minutos: 30 },
      { id: "descanso", titulo: "Descanso depois", apoio: "Um lugar calmo antes de voltar.", minutos: 15 },
    ],
    estrategias: [estrategiasComuns.frasesProntas, estrategiasComuns.chegarAntes, estrategiasComuns.pausas],
    alternativas: [alternativasComuns.remoto, alternativasComuns.adiar],
    conteudos: ["organizar-documentos", "pedir-informacao", "planejar-pausas"],
  },
  {
    id: "faculdade",
    titulo: "Ir à faculdade",
    resumo: "Um dia de aula com material separado e pausas previstas entre blocos.",
    contexto: "academico",
    termos: ["aula", "faculdade", "universidade", "prova", "campus", "professor"],
    origemSugerida: "Casa",
    destinoSugerido: "Campus",
    meioSugerido: "onibus",
    horarioSugerido: "08:00",
    duracaoAproximada: "meio período",
    etapas: [
      { id: "material", titulo: "Separar o material", apoio: "Só o necessário para hoje.", minutos: 10 },
      { id: "ida", titulo: "Ida ao campus", apoio: "Trajeto conhecido, com plano alternativo.", minutos: 40, referencia: "Portaria do campus" },
      { id: "aula1", titulo: "Primeiro bloco de aula", apoio: "Sentar onde é mais fácil sair.", minutos: 50, referencia: "Sala" },
      { id: "pausa", titulo: "Pausa entre blocos", apoio: "Um lugar mais silencioso do prédio.", minutos: 15, referencia: "Pátio" },
      { id: "aula2", titulo: "Segundo bloco", apoio: "Se a energia acabar, sair também é opção.", minutos: 50 },
      { id: "volta", titulo: "Volta para casa", apoio: "Silêncio no caminho ajuda a descarregar.", minutos: 40 },
    ],
    estrategias: [estrategiasComuns.pausas, estrategiasComuns.fone, estrategiasComuns.saidaFacil, estrategiasComuns.horarioTranquilo],
    alternativas: [alternativasComuns.reduzir, alternativasComuns.remoto, alternativasComuns.adiar],
    conteudos: ["organizar-rotina", "planejar-pausas", "ambientes-intensos"],
  },
  {
    id: "restaurante",
    titulo: "Comer fora",
    resumo: "Uma refeição fora de casa, com cardápio conferido antes.",
    contexto: "compras",
    termos: ["restaurante", "almoço", "almoco", "jantar", "lanchonete", "comer fora"],
    origemSugerida: "Casa",
    destinoSugerido: "Restaurante",
    meioSugerido: "a-pe",
    horarioSugerido: "12:30",
    duracaoAproximada: "1 hora",
    etapas: [
      { id: "cardapio", titulo: "Ver o cardápio antes", apoio: "Decidir em casa evita decidir no barulho.", minutos: 8 },
      { id: "ida", titulo: "Ida até o local", apoio: "Caminho curto.", minutos: 10, referencia: "Entrada" },
      { id: "mesa", titulo: "Escolher a mesa", apoio: "Perto da janela costuma ser mais calmo.", minutos: 5, referencia: "Salão" },
      { id: "pedido", titulo: "Fazer o pedido", apoio: "Apontar no cardápio também é comunicar.", minutos: 5 },
      { id: "refeicao", titulo: "Durante a refeição", apoio: "Sem pressa; pausar é permitido.", minutos: 30 },
    ],
    estrategias: [estrategiasComuns.horarioTranquilo, estrategiasComuns.frasesProntas, estrategiasComuns.fone],
    alternativas: [alternativasComuns.remoto, alternativasComuns.companhia, alternativasComuns.reduzir],
    conteudos: ["alimentos-tolerados", "organizar-refeicoes", "ambientes-intensos"],
  },
  {
    id: "banco",
    titulo: "Resolver algo em atendimento presencial",
    resumo: "Banco, cartório ou repartição: senha, espera e documentos.",
    contexto: "trabalho",
    termos: ["banco", "cartório", "cartorio", "documento", "atendimento", "senha", "prefeitura"],
    origemSugerida: "Casa",
    destinoSugerido: "Agência",
    meioSugerido: "a-pe",
    horarioSugerido: "10:00",
    duracaoAproximada: "1 hora",
    etapas: [
      { id: "documentos", titulo: "Separar documentos", apoio: "Lista curta do que pode ser pedido.", minutos: 10 },
      { id: "ida", titulo: "Ida até o local", apoio: "Chegar antes da fila crescer.", minutos: 15, referencia: "Entrada" },
      { id: "senha", titulo: "Pegar a senha", apoio: "Perguntar qual fila é a certa.", minutos: 5, referencia: "Totem de senhas" },
      { id: "espera", titulo: "Espera", apoio: "Tempo indefinido: leve algo para ocupar.", minutos: 25, referencia: "Sala de espera" },
      { id: "atendimento", titulo: "Atendimento", apoio: "Anotar o número do protocolo.", minutos: 15, referencia: "Guichê" },
    ],
    estrategias: [estrategiasComuns.chegarAntes, estrategiasComuns.frasesProntas, estrategiasComuns.pausas],
    alternativas: [alternativasComuns.remoto, alternativasComuns.companhia, alternativasComuns.adiar],
    conteudos: ["organizar-documentos", "pedir-informacao", "lidar-com-atraso"],
  },
  {
    id: "evento",
    titulo: "Ir a um evento social",
    resumo: "Festa, encontro ou evento com hora de chegada e de saída combinadas.",
    contexto: "indefinido",
    termos: ["festa", "evento", "aniversário", "aniversario", "encontro", "show"],
    origemSugerida: "Casa",
    destinoSugerido: "Local do evento",
    meioSugerido: "aplicativo",
    horarioSugerido: "19:00",
    duracaoAproximada: "2 horas",
    etapas: [
      { id: "combinar", titulo: "Combinar quanto tempo ficar", apoio: "Definir a saída antes tira o peso da decisão.", minutos: 5 },
      { id: "ida", titulo: "Ida até o local", apoio: "Saber o endereço exato e a portaria.", minutos: 25, referencia: "Portaria" },
      { id: "chegada", titulo: "Chegada", apoio: "Cumprimentar poucas pessoas já basta.", minutos: 15 },
      { id: "durante", titulo: "Durante o evento", apoio: "Pausas fora do salão são permitidas.", minutos: 60, referencia: "Área externa" },
      { id: "saida", titulo: "Sair no horário combinado", apoio: "Sair sem justificar em detalhes é possível.", minutos: 10 },
    ],
    estrategias: [estrategiasComuns.saidaFacil, estrategiasComuns.pausas, estrategiasComuns.acompanhar, estrategiasComuns.fone],
    alternativas: [alternativasComuns.reduzir, alternativasComuns.companhia, alternativasComuns.adiar],
    conteudos: ["ambientes-intensos", "estrategias-de-estimulos", "planejar-pausas"],
  },
  {
    id: "dia-em-casa",
    titulo: "Organizar o dia em casa",
    resumo: "Sem deslocamento: poucos pontos fixos, pausas e uma tarefa por vez.",
    contexto: "indefinido",
    termos: ["rotina", "casa", "organizar o dia", "tarefas", "arrumar"],
    origemSugerida: "Casa",
    destinoSugerido: "Casa",
    meioSugerido: "sem-deslocamento",
    horarioSugerido: "09:00",
    duracaoAproximada: "o dia inteiro, em blocos",
    etapas: [
      { id: "pontos", titulo: "Escolher três pontos fixos", apoio: "O resto do dia fica livre.", minutos: 10 },
      { id: "primeira", titulo: "Primeira tarefa", apoio: "A mais curta primeiro.", minutos: 25 },
      { id: "pausa", titulo: "Pausa", apoio: "Pausa também é parte do plano.", minutos: 15 },
      { id: "segunda", titulo: "Segunda tarefa", apoio: "Se não couber hoje, cabe amanhã.", minutos: 30 },
      { id: "fechamento", titulo: "Fechar o dia", apoio: "Registrar o que funcionou.", minutos: 10 },
    ],
    estrategias: [estrategiasComuns.pausas, estrategiasComuns.listaCurta],
    alternativas: [alternativasComuns.reduzir, alternativasComuns.adiar],
    conteudos: ["organizar-rotina", "planejar-pausas", "organizar-refeicoes"],
  },
];

export function situacaoPorId(id: string | null | undefined) {
  return situacoes.find((s) => s.id === id) ?? null;
}

function normalizar(texto: string) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export type SugestaoDeSituacao = {
  situacao: Situacao;
  pontos: number;
  termos: string[];
};

/** Leitura local por palavras-chave. Sempre apresentada para confirmação. */
export function sugerirSituacoes(texto: string, limite = 3): SugestaoDeSituacao[] {
  const alvo = normalizar(texto);
  if (alvo.trim().length === 0) return [];
  return situacoes
    .map((situacao) => {
      const termos = situacao.termos.filter((t) => alvo.includes(normalizar(t)));
      return { situacao, pontos: termos.length, termos };
    })
    .filter((s) => s.pontos > 0)
    .sort((a, b) => b.pontos - a.pontos)
    .slice(0, limite);
}

export const exemplosDeIntencao = [
  "Preciso ir ao mercado hoje à tarde.",
  "Quero pegar o ônibus sozinho.",
  "Tenho consulta amanhã e fico ansioso.",
  "Tenho uma reunião e não sei como começar.",
  "Quero organizar meu dia em casa.",
];
