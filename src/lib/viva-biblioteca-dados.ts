/**
 * Conteúdos demonstrativos da Biblioteca VIVA (Fase 4).
 *
 * Fonte: documento 11 (Biblioteca demonstrativa), documento 08 (habilidades
 * funcionais) e documento 09 (estratégias pessoais). Doze conteúdos curtos
 * distribuídos em quatro áreas da vida cotidiana.
 *
 * Nada aqui é prescrição clínica, regra de comportamento ou sequência
 * obrigatória (documentos 00, 15 e 16). Cada conteúdo é uma possibilidade
 * de apoio.
 */

export type AreaDaBiblioteca = "mobilidade" | "autorregulacao" | "alimentacao" | "saude";

export type Complexidade = "simples" | "intermediario" | "mais-detalhado";

export const rotulosDeArea: Record<AreaDaBiblioteca, { nome: string; descricao: string }> = {
  mobilidade: {
    nome: "Mobilidade",
    descricao: "Sair, chegar, comparar caminhos e lidar com imprevistos.",
  },
  autorregulacao: {
    nome: "Autorregulação",
    descricao: "Ritmo, pausas, estímulos e organização do dia.",
  },
  alimentacao: {
    nome: "Alimentação",
    descricao: "Comida tolerada, compras e conversas sobre alimentação.",
  },
  saude: {
    nome: "Saúde e organização pessoal",
    descricao: "Consultas, documentos, dúvidas e efeitos percebidos.",
  },
};

export const rotulosDeComplexidade: Record<Complexidade, string> = {
  simples: "Leitura simples",
  intermediario: "Leitura com alguns passos",
  "mais-detalhado": "Leitura mais detalhada",
};

export type BlocoDeConteudo =
  | { tipo: "paragrafo"; texto: string }
  | { tipo: "subtitulo"; texto: string }
  | { tipo: "lista"; itens: string[] }
  | { tipo: "passos"; itens: string[] }
  | { tipo: "exemplo"; titulo?: string; texto: string }
  | { tipo: "atencao"; texto: string }
  | { tipo: "observacao"; texto: string };

export type EstrategiaRelacionada = {
  id: string;
  nome: string;
  comoAjuda: string;
};

export type ConteudoDaBiblioteca = {
  id: string;
  titulo: string;
  area: AreaDaBiblioteca;
  resumo: string;
  minutos: number;
  complexidade: Complexidade;
  etiquetas: string[];
  blocos: BlocoDeConteudo[];
  estrategias: EstrategiaRelacionada[];
  perguntaDeReflexao: string;
  relacionados: string[];
};

export const conteudosDaBiblioteca: ConteudoDaBiblioteca[] = [
  /* ---------------------------------------------------------- mobilidade */
  {
    id: "comparar-trajetos",
    titulo: "Como comparar trajetos",
    area: "mobilidade",
    resumo:
      "O caminho mais rápido nem sempre é o mais adequado. Comparar poucos aspectos ajuda a escolher com mais calma.",
    minutos: 2,
    complexidade: "simples",
    etiquetas: ["transporte", "planejamento", "escolha"],
    blocos: [
      {
        tipo: "paragrafo",
        texto:
          "Um trajeto pode ser avaliado por muito mais do que tempo. Custo, ruído, número de baldeações e esforço físico também contam.",
      },
      { tipo: "subtitulo", texto: "Aspectos que podem ser comparados" },
      {
        tipo: "lista",
        itens: [
          "custo",
          "tempo",
          "quantidade de mudanças",
          "lotação e ruído",
          "acessibilidade",
          "necessidade de internet",
        ],
      },
      { tipo: "subtitulo", texto: "Um caminho possível" },
      {
        tipo: "passos",
        itens: [
          "Identifique o ponto de saída e o destino.",
          "Escolha duas ou três formas possíveis de chegar.",
          "Compare apenas os aspectos que importam para você hoje.",
          "Defina uma opção principal.",
          "Guarde uma alternativa, caso algo mude.",
        ],
      },
      {
        tipo: "exemplo",
        titulo: "Exemplo prático",
        texto:
          "Ônibus: custo baixo, 45 minutos, ruído elevado, uma conexão. Aplicativo: custo maior, 25 minutos, ruído menor, sem conexões.",
      },
      {
        tipo: "observacao",
        texto: "Comparar dois caminhos já é suficiente. Não é necessário mapear todas as opções.",
      },
    ],
    estrategias: [
      {
        id: "dividir-em-etapas",
        nome: "Dividir em etapas",
        comoAjuda: "Pensar um trecho por vez reduz a quantidade de decisões.",
      },
      {
        id: "guardar-alternativa",
        nome: "Guardar uma alternativa",
        comoAjuda: "Ter um plano B reduz o peso de um imprevisto.",
      },
    ],
    perguntaDeReflexao: "Qual aspecto costuma pesar mais quando você escolhe um caminho?",
    relacionados: ["rota-alternativa", "pedir-informacao", "lidar-com-atraso"],
  },
  {
    id: "rota-alternativa",
    titulo: "Como preparar uma rota alternativa",
    area: "mobilidade",
    resumo:
      "Uma segunda possibilidade preparada com antecedência costuma diminuir a sobrecarga quando algo muda no caminho.",
    minutos: 3,
    complexidade: "intermediario",
    etiquetas: ["transporte", "imprevistos", "preparação"],
    blocos: [
      {
        tipo: "paragrafo",
        texto:
          "Preparar uma alternativa não é esperar que algo dê errado. É reduzir o número de decisões necessárias em um momento de pressa.",
      },
      { tipo: "subtitulo", texto: "O que a alternativa pode conter" },
      {
        tipo: "lista",
        itens: [
          "outro meio de transporte",
          "outro ponto de embarque",
          "um horário diferente",
          "uma pessoa para avisar",
        ],
      },
      {
        tipo: "passos",
        itens: [
          "Anote o caminho principal em uma frase.",
          "Escolha uma alternativa que você já conheça.",
          "Registre onde ela começa.",
          "Deixe essa anotação em um lugar fácil de encontrar.",
        ],
      },
      {
        tipo: "exemplo",
        titulo: "Exemplo prático",
        texto:
          "Principal: ônibus das 8h no ponto da esquina. Alternativa: caminhar até a avenida e pegar o metrô.",
      },
      {
        tipo: "atencao",
        texto:
          "Se o imprevisto envolver segurança pessoal, procurar apoio presencial é mais importante do que seguir o plano.",
      },
    ],
    estrategias: [
      {
        id: "preparar-materiais",
        nome: "Preparar materiais antes",
        comoAjuda: "Deixar cartão, fone e água separados evita decisões na saída.",
      },
      {
        id: "revisar-antes-de-sair",
        nome: "Revisar antes de sair",
        comoAjuda: "Uma conferência curta reduz o retorno em casa.",
      },
    ],
    perguntaDeReflexao: "Existe algum trecho do caminho em que uma alternativa faria diferença?",
    relacionados: ["comparar-trajetos", "pedir-informacao", "organizar-documentos"],
  },
  {
    id: "pedir-informacao",
    titulo: "Como pedir informação durante um trajeto",
    area: "mobilidade",
    resumo:
      "Frases prontas ajudam quando falar é difícil. Você pode escrever, mostrar a tela ou apontar.",
    minutos: 2,
    complexidade: "simples",
    etiquetas: ["comunicação", "transporte", "frases prontas"],
    blocos: [
      {
        tipo: "paragrafo",
        texto: "Pedir informação pode ser feito de várias formas. Falar é apenas uma delas.",
      },
      { tipo: "subtitulo", texto: "Frases que podem ser preparadas" },
      {
        tipo: "lista",
        itens: [
          "“Este ônibus passa na avenida central?”",
          "“Pode me dizer onde eu desço para chegar aqui?”",
          "“Prefiro escrever, tudo bem?”",
        ],
      },
      {
        tipo: "exemplo",
        titulo: "Exemplo prático",
        texto: "Deixar a frase salva no celular permite mostrar a tela sem precisar falar.",
      },
      {
        tipo: "observacao",
        texto: "Não responder e seguir adiante também é uma escolha legítima.",
      },
    ],
    estrategias: [
      {
        id: "frases-prontas",
        nome: "Deixar frases prontas",
        comoAjuda: "Reduz o esforço de formular no momento.",
      },
      {
        id: "registrar-duvidas",
        nome: "Registrar dúvidas",
        comoAjuda: "Guardar a pergunta permite retomá-la depois com calma.",
      },
    ],
    perguntaDeReflexao: "Qual forma de pedir informação parece mais confortável para você?",
    relacionados: ["rota-alternativa", "lidar-com-atraso", "preparar-consulta"],
  },
  {
    id: "lidar-com-atraso",
    titulo: "Como lidar com um atraso",
    area: "mobilidade",
    resumo: "Um atraso muda o plano, não o valor do que você estava tentando fazer.",
    minutos: 2,
    complexidade: "simples",
    etiquetas: ["imprevistos", "comunicação", "regulação"],
    blocos: [
      {
        tipo: "paragrafo",
        texto:
          "Quando o horário muda, a primeira coisa possível costuma ser reduzir o número de decisões.",
      },
      {
        tipo: "passos",
        itens: [
          "Observe quanto tempo de atraso existe.",
          "Decida se é necessário avisar alguém.",
          "Escolha entre seguir, esperar ou remarcar.",
          "Se ajudar, faça uma pausa curta antes de decidir.",
        ],
      },
      {
        tipo: "exemplo",
        titulo: "Aviso curto",
        texto: "“Estou a caminho, devo chegar por volta das 15h20.”",
      },
      {
        tipo: "observacao",
        texto: "Remarcar não é desistir. É ajustar o percurso.",
      },
    ],
    estrategias: [
      {
        id: "fazer-uma-pausa",
        nome: "Fazer uma pausa",
        comoAjuda: "Alguns minutos parados podem tornar a decisão mais clara.",
      },
      {
        id: "aviso-curto",
        nome: "Enviar um aviso curto",
        comoAjuda: "Uma frase resolve sem exigir explicações longas.",
      },
    ],
    perguntaDeReflexao: "O que costuma ajudar você quando um horário muda de repente?",
    relacionados: ["planejar-pausas", "comparar-trajetos", "rota-alternativa"],
  },

  /* ------------------------------------------------------ autorregulação */
  {
    id: "planejar-pausas",
    titulo: "Como planejar uma pausa",
    area: "autorregulacao",
    resumo:
      "Pausas planejadas antes do cansaço costumam ser mais úteis do que pausas depois da sobrecarga.",
    minutos: 2,
    complexidade: "simples",
    etiquetas: ["pausa", "ritmo", "energia"],
    blocos: [
      {
        tipo: "paragrafo",
        texto: "Uma pausa não precisa ser longa. Ela precisa ser possível no lugar onde você está.",
      },
      { tipo: "subtitulo", texto: "Formas de pausa" },
      {
        tipo: "lista",
        itens: [
          "sentar em um lugar mais silencioso",
          "reduzir a luz ou o som",
          "beber água",
          "sair da conversa por alguns minutos",
        ],
      },
      {
        tipo: "exemplo",
        titulo: "Exemplo prático",
        texto:
          "Antes de entrar em um mercado movimentado, parar dois minutos na entrada e decidir por onde começar.",
      },
      {
        tipo: "atencao",
        texto:
          "Se o desconforto for intenso e frequente, conversar com uma pessoa de apoio ou profissional pode ajudar.",
      },
    ],
    estrategias: [
      {
        id: "fazer-uma-pausa",
        nome: "Fazer uma pausa",
        comoAjuda: "Interromper antes do limite preserva energia para o resto.",
      },
      {
        id: "reduzir-estimulos",
        nome: "Reduzir estímulos",
        comoAjuda: "Fone, boné ou um canto mais vazio mudam a intensidade do ambiente.",
      },
    ],
    perguntaDeReflexao: "Em que momento do dia uma pausa curta faria mais diferença?",
    relacionados: ["ambientes-intensos", "estrategias-de-estimulos", "organizar-rotina"],
  },
  {
    id: "ambientes-intensos",
    titulo: "Como identificar um ambiente intenso",
    area: "autorregulacao",
    resumo:
      "Reconhecer antes o que costuma pesar em um ambiente permite preparar saídas e ajustes.",
    minutos: 3,
    complexidade: "intermediario",
    etiquetas: ["ambiente", "estímulos", "preparação"],
    blocos: [
      {
        tipo: "paragrafo",
        texto:
          "Ambientes não são intensos para todo mundo do mesmo jeito. Vale observar o que pesa para você.",
      },
      {
        tipo: "lista",
        itens: [
          "volume e tipo de som",
          "luz forte ou piscante",
          "quantidade de pessoas",
          "cheiros",
          "tempo de espera",
          "possibilidade de sair",
        ],
      },
      {
        tipo: "passos",
        itens: [
          "Escolha um ambiente que você frequenta.",
          "Marque os dois aspectos que mais pesam.",
          "Anote um ajuste possível para cada um.",
        ],
      },
      {
        tipo: "exemplo",
        titulo: "Exemplo prático",
        texto:
          "Sala de espera: som da televisão e tempo indefinido. Ajuste: fone e perguntar a previsão de atendimento na chegada.",
      },
    ],
    estrategias: [
      {
        id: "mapear-saidas",
        nome: "Localizar uma saída",
        comoAjuda: "Saber por onde sair reduz a sensação de estar preso.",
      },
      {
        id: "reduzir-estimulos",
        nome: "Reduzir estímulos",
        comoAjuda: "Ajustes simples mudam a intensidade percebida.",
      },
    ],
    perguntaDeReflexao: "Qual ambiente você gostaria de preparar melhor antes da próxima visita?",
    relacionados: ["planejar-pausas", "estrategias-de-estimulos", "preparar-consulta"],
  },
  {
    id: "estrategias-de-estimulos",
    titulo: "Estratégias pessoais para reduzir estímulos",
    area: "autorregulacao",
    resumo:
      "Um repertório próprio de ajustes é mais útil do que uma lista universal de recomendações.",
    minutos: 3,
    complexidade: "intermediario",
    etiquetas: ["estratégias", "estímulos", "repertório"],
    blocos: [
      {
        tipo: "paragrafo",
        texto:
          "Estratégias funcionam de formas diferentes em dias diferentes. Guardar as que já ajudaram é um jeito de construir repertório.",
      },
      {
        tipo: "lista",
        itens: [
          "fone com redução de ruído",
          "óculos escuros em ambientes claros",
          "chegar antes para escolher o lugar",
          "avisar que vai sair por alguns minutos",
        ],
      },
      {
        tipo: "observacao",
        texto: "Uma estratégia que não funcionou hoje não precisa ser descartada para sempre.",
      },
    ],
    estrategias: [
      {
        id: "reduzir-estimulos",
        nome: "Reduzir estímulos",
        comoAjuda: "Diminuir som e luz costuma tornar o ambiente sustentável.",
      },
      {
        id: "chegar-antes",
        nome: "Chegar um pouco antes",
        comoAjuda: "Permite escolher onde ficar e observar o espaço com calma.",
      },
    ],
    perguntaDeReflexao: "Qual estratégia já ajudou você em alguma situação parecida?",
    relacionados: ["ambientes-intensos", "planejar-pausas", "registrar-efeitos"],
  },
  {
    id: "organizar-rotina",
    titulo: "Como organizar a rotina sem rigidez",
    area: "autorregulacao",
    resumo:
      "Poucos pontos fixos e espaço para mudanças costumam sustentar melhor do que uma agenda cheia.",
    minutos: 2,
    complexidade: "simples",
    etiquetas: ["rotina", "organização", "ritmo"],
    blocos: [
      {
        tipo: "paragrafo",
        texto: "Uma rotina possível é aquela que continua funcionando em um dia de pouca energia.",
      },
      {
        tipo: "passos",
        itens: [
          "Escolha até três pontos fixos no dia.",
          "Deixe o restante como possibilidade.",
          "Revise quando algo deixar de servir.",
        ],
      },
      {
        tipo: "exemplo",
        titulo: "Exemplo prático",
        texto:
          "Pontos fixos: acordar por volta do mesmo horário, uma refeição preparada e uma pausa no fim da tarde.",
      },
      {
        tipo: "observacao",
        texto: "Dias diferentes podem ter rotinas diferentes.",
      },
    ],
    estrategias: [
      {
        id: "poucos-pontos-fixos",
        nome: "Manter poucos pontos fixos",
        comoAjuda: "Reduz a sensação de descumprimento em dias difíceis.",
      },
      {
        id: "dividir-em-etapas",
        nome: "Dividir em etapas",
        comoAjuda: "Tarefas menores cabem melhor em dias de pouca energia.",
      },
    ],
    perguntaDeReflexao: "Qual ponto fixo faz sentido manter mesmo em um dia difícil?",
    relacionados: ["planejar-pausas", "planejar-compras", "organizar-refeicoes"],
  },

  /* ---------------------------------------------------------- alimentação */
  {
    id: "alimentos-tolerados",
    titulo: "Como registrar alimentos tolerados",
    area: "alimentacao",
    resumo:
      "Uma lista pessoal do que costuma ser tolerado ajuda em dias de pouca energia e em conversas com profissionais.",
    minutos: 2,
    complexidade: "simples",
    etiquetas: ["alimentação", "registro", "preferências"],
    blocos: [
      {
        tipo: "paragrafo",
        texto:
          "Textura, temperatura e cheiro pesam tanto quanto sabor. Registrar isso é informação útil, não restrição.",
      },
      {
        tipo: "lista",
        itens: [
          "alimentos que costumam funcionar",
          "alimentos que dependem do dia",
          "alimentos que costumam não funcionar",
          "observações de textura e temperatura",
        ],
      },
      {
        tipo: "exemplo",
        titulo: "Exemplo prático",
        texto:
          "“Arroz e ovo funcionam quase sempre. Sopa depende da textura. Comida muito quente costuma não funcionar.”",
      },
      {
        tipo: "atencao",
        texto:
          "Mudanças importantes de peso, dor ou mal-estar devem ser conversadas com um profissional de saúde.",
      },
    ],
    estrategias: [
      {
        id: "lista-curta",
        nome: "Manter uma lista curta",
        comoAjuda: "Poucos itens confiáveis resolvem dias de pouca energia.",
      },
      {
        id: "registrar-observacoes",
        nome: "Registrar observações",
        comoAjuda: "Notas curtas ajudam a lembrar depois.",
      },
    ],
    perguntaDeReflexao: "Quais alimentos costumam funcionar para você em dias difíceis?",
    relacionados: ["planejar-compras", "organizar-refeicoes", "perguntas-nutricionista"],
  },
  {
    id: "planejar-compras",
    titulo: "Como planejar as compras da semana",
    area: "alimentacao",
    resumo: "Uma lista organizada por ordem do percurso reduz o tempo dentro do mercado.",
    minutos: 3,
    complexidade: "intermediario",
    etiquetas: ["compras", "planejamento", "ambiente"],
    blocos: [
      {
        tipo: "paragrafo",
        texto:
          "Planejar compras é também planejar o tempo de permanência em um ambiente que pode ser intenso.",
      },
      {
        tipo: "passos",
        itens: [
          "Liste primeiro o que já é tolerado e usado com frequência.",
          "Agrupe por setor do mercado.",
          "Defina um horário mais tranquilo.",
          "Decida quanto tempo pretende ficar.",
        ],
      },
      {
        tipo: "exemplo",
        titulo: "Exemplo prático",
        texto: "Lista em três blocos: hortifruti, secos, geladeira. Horário: início da manhã.",
      },
      {
        tipo: "observacao",
        texto: "Comprar apenas parte da lista também é um resultado válido.",
      },
    ],
    estrategias: [
      {
        id: "dividir-em-etapas",
        nome: "Dividir em etapas",
        comoAjuda: "Comprar em duas idas pode ser mais sustentável.",
      },
      {
        id: "horario-tranquilo",
        nome: "Escolher horário mais tranquilo",
        comoAjuda: "Menos pessoas costuma significar menos estímulos.",
      },
    ],
    perguntaDeReflexao: "Que parte da compra costuma pesar mais para você?",
    relacionados: ["alimentos-tolerados", "organizar-refeicoes", "ambientes-intensos"],
  },
  {
    id: "perguntas-nutricionista",
    titulo: "Como preparar perguntas para a nutricionista",
    area: "alimentacao",
    resumo: "Perguntas escritas antes reduzem o esforço de lembrar durante a consulta.",
    minutos: 2,
    complexidade: "simples",
    etiquetas: ["consulta", "comunicação", "preparação"],
    blocos: [
      {
        tipo: "paragrafo",
        texto:
          "Levar uma lista curta ajuda a usar o tempo da consulta com o que é mais importante para você.",
      },
      {
        tipo: "lista",
        itens: [
          "“Quais alternativas existem para alimentos que eu não tolero?”",
          "“Como organizar refeições em dias de pouca energia?”",
          "“Alguma dessas texturas pode ser substituída?”",
        ],
      },
      {
        tipo: "observacao",
        texto: "Você pode entregar a lista impressa ou mostrar na tela, se falar for difícil.",
      },
    ],
    estrategias: [
      {
        id: "registrar-duvidas",
        nome: "Registrar dúvidas",
        comoAjuda: "Anotar no momento em que surgem evita esquecer depois.",
      },
      {
        id: "frases-prontas",
        nome: "Deixar frases prontas",
        comoAjuda: "Facilita começar a conversa.",
      },
    ],
    perguntaDeReflexao:
      "Qual dúvida sobre alimentação você gostaria de levar a alguém de confiança?",
    relacionados: ["preparar-consulta", "alimentos-tolerados", "organizar-refeicoes"],
  },
  {
    id: "organizar-refeicoes",
    titulo: "Como organizar refeições em dias variados",
    area: "alimentacao",
    resumo: "Ter duas ou três combinações prontas evita decidir do zero a cada refeição.",
    minutos: 2,
    complexidade: "simples",
    etiquetas: ["refeições", "rotina", "energia"],
    blocos: [
      {
        tipo: "paragrafo",
        texto:
          "Decidir o que comer é uma tarefa a mais. Combinações repetidas diminuem esse esforço.",
      },
      {
        tipo: "passos",
        itens: [
          "Escolha duas combinações simples que funcionam quase sempre.",
          "Garanta os ingredientes na compra.",
          "Deixe uma opção que não exige preparo.",
        ],
      },
      {
        tipo: "exemplo",
        titulo: "Exemplo prático",
        texto: "Opção rápida: pão e queijo. Opção preparada: arroz, ovo e legume cozido.",
      },
    ],
    estrategias: [
      {
        id: "preparar-materiais",
        nome: "Preparar antes",
        comoAjuda: "Deixar algo pronto na véspera ajuda em dias sem energia.",
      },
      {
        id: "lista-curta",
        nome: "Manter uma lista curta",
        comoAjuda: "Poucas opções conhecidas reduzem decisões.",
      },
    ],
    perguntaDeReflexao: "Qual refeição você gostaria de deixar mais simples nesta semana?",
    relacionados: ["planejar-compras", "alimentos-tolerados", "organizar-rotina"],
  },

  /* ------------------------------------ saúde e organização pessoal */
  {
    id: "preparar-consulta",
    titulo: "Como preparar uma consulta e organizar dúvidas",
    area: "saude",
    resumo:
      "Chegar com dúvidas escritas e documentos separados reduz o esforço no dia da consulta.",
    minutos: 3,
    complexidade: "intermediario",
    etiquetas: ["consulta", "dúvidas", "preparação"],
    blocos: [
      {
        tipo: "paragrafo",
        texto:
          "Consultas costumam ser curtas. Uma preparação simples ajuda a lembrar do que importa.",
      },
      {
        tipo: "passos",
        itens: [
          "Escreva até três dúvidas principais.",
          "Separe documentos e exames com antecedência.",
          "Anote o que mudou desde a última vez.",
          "Decida se quer ir acompanhado.",
        ],
      },
      {
        tipo: "exemplo",
        titulo: "Exemplo prático",
        texto:
          "“Quero perguntar sobre o cansaço à tarde, sobre o horário do medicamento e sobre o próximo retorno.”",
      },
      {
        tipo: "atencao",
        texto:
          "O VIVA não substitui avaliação profissional. Dúvidas clínicas devem ser levadas a quem acompanha você.",
      },
    ],
    estrategias: [
      {
        id: "registrar-duvidas",
        nome: "Registrar dúvidas",
        comoAjuda: "Guardar a pergunta assim que surge evita perder o assunto.",
      },
      {
        id: "preparar-materiais",
        nome: "Preparar materiais",
        comoAjuda: "Documentos separados na véspera reduzem a pressa.",
      },
    ],
    perguntaDeReflexao: "Qual dúvida você gostaria de não esquecer na próxima consulta?",
    relacionados: ["organizar-documentos", "registrar-efeitos", "perguntas-nutricionista"],
  },
  {
    id: "organizar-documentos",
    titulo: "Como organizar documentos pessoais",
    area: "saude",
    resumo: "Um lugar único e previsível para documentos evita busca de última hora.",
    minutos: 2,
    complexidade: "simples",
    etiquetas: ["documentos", "organização", "preparação"],
    blocos: [
      {
        tipo: "paragrafo",
        texto:
          "O objetivo não é um arquivo perfeito, e sim encontrar o que é necessário quando for necessário.",
      },
      {
        tipo: "lista",
        itens: [
          "documento de identificação",
          "cartão de saúde",
          "exames recentes",
          "receitas em uso",
        ],
      },
      {
        tipo: "exemplo",
        titulo: "Exemplo prático",
        texto: "Uma pasta única na mochila e uma foto de cada documento no celular.",
      },
      {
        tipo: "observacao",
        texto: "Organizar aos poucos também funciona.",
      },
    ],
    estrategias: [
      {
        id: "lugar-unico",
        nome: "Definir um lugar único",
        comoAjuda: "Evita procurar em vários lugares na hora de sair.",
      },
      {
        id: "revisar-antes-de-sair",
        nome: "Revisar antes de sair",
        comoAjuda: "Uma conferência curta evita retornos.",
      },
    ],
    perguntaDeReflexao: "Qual documento costuma faltar quando você precisa sair com pressa?",
    relacionados: ["preparar-consulta", "rota-alternativa", "registrar-duvidas"],
  },
  {
    id: "registrar-duvidas",
    titulo: "Como registrar dúvidas ao longo dos dias",
    area: "saude",
    resumo: "Dúvidas anotadas no momento em que surgem chegam inteiras à conversa certa.",
    minutos: 2,
    complexidade: "simples",
    etiquetas: ["dúvidas", "registro", "comunicação"],
    blocos: [
      {
        tipo: "paragrafo",
        texto: "Uma dúvida costuma aparecer longe da consulta e desaparecer antes dela.",
      },
      {
        tipo: "passos",
        itens: [
          "Anote a dúvida em uma frase curta.",
          "Marque com quem faz sentido conversar.",
          "Revise a lista antes do encontro.",
        ],
      },
      {
        tipo: "exemplo",
        titulo: "Exemplo prático",
        texto: "“Por que o cansaço aumenta depois do almoço?” — falar na consulta.",
      },
    ],
    estrategias: [
      {
        id: "registrar-duvidas",
        nome: "Registrar dúvidas",
        comoAjuda: "A anotação sustenta a memória do momento.",
      },
      {
        id: "revisar-antes",
        nome: "Revisar antes do encontro",
        comoAjuda: "Uma leitura rápida recupera o contexto.",
      },
    ],
    perguntaDeReflexao: "Existe alguma dúvida que você vem adiando registrar?",
    relacionados: ["preparar-consulta", "registrar-efeitos", "organizar-documentos"],
  },
  {
    id: "registrar-efeitos",
    titulo: "Como registrar efeitos percebidos",
    area: "saude",
    resumo:
      "Descrever o que você percebe, sem interpretar, é informação útil para conversas com profissionais.",
    minutos: 3,
    complexidade: "mais-detalhado",
    etiquetas: ["registro", "observação", "saúde"],
    blocos: [
      {
        tipo: "paragrafo",
        texto:
          "Registrar efeitos não é diagnosticar. É descrever o que foi percebido, quando e em que contexto.",
      },
      {
        tipo: "lista",
        itens: [
          "o que foi percebido",
          "em que momento do dia",
          "o que estava acontecendo antes",
          "quanto tempo durou",
        ],
      },
      {
        tipo: "exemplo",
        titulo: "Exemplo prático",
        texto:
          "“Sono forte por volta das 14h, depois de dormir pouco na noite anterior. Durou cerca de uma hora.”",
      },
      {
        tipo: "atencao",
        texto:
          "O VIVA não interpreta esses registros nem sugere condutas de saúde. Eles pertencem a você e podem ser levados a um profissional.",
      },
    ],
    estrategias: [
      {
        id: "descrever-sem-interpretar",
        nome: "Descrever sem interpretar",
        comoAjuda: "Mantém o registro fiel ao que aconteceu.",
      },
      {
        id: "registrar-duvidas",
        nome: "Registrar dúvidas",
        comoAjuda: "O que ficou sem resposta pode virar pergunta.",
      },
    ],
    perguntaDeReflexao:
      "Existe algo que você tem percebido e gostaria de acompanhar por alguns dias?",
    relacionados: ["registrar-duvidas", "preparar-consulta", "estrategias-de-estimulos"],
  },
];

export const areasDaBiblioteca: AreaDaBiblioteca[] = [
  "mobilidade",
  "autorregulacao",
  "alimentacao",
  "saude",
];

export function conteudoPorId(id: string) {
  return conteudosDaBiblioteca.find((c) => c.id === id);
}

export function etiquetasDisponiveis() {
  const todas = conteudosDaBiblioteca.flatMap((c) => c.etiquetas);
  return [...new Set(todas)].sort((a, b) => a.localeCompare(b, "pt-BR"));
}

/** Busca simples por palavra, categoria e etiquetas — sem ranking nem IA. */
export function buscarConteudos({
  termo,
  area,
  etiqueta,
}: {
  termo?: string;
  area?: AreaDaBiblioteca | "todas";
  etiqueta?: string;
}) {
  const texto = (termo ?? "").trim().toLowerCase();
  return conteudosDaBiblioteca.filter((c) => {
    if (area && area !== "todas" && c.area !== area) return false;
    if (etiqueta && !c.etiquetas.includes(etiqueta)) return false;
    if (!texto) return true;
    const campos = [c.titulo, c.resumo, rotulosDeArea[c.area].nome, ...c.etiquetas]
      .join(" ")
      .toLowerCase();
    return campos.includes(texto);
  });
}
