// Registro da Biblioteca VIVA.
// Os arquivos em src/content/docs/*.md são a fonte de autoridade.
// Em caso de conflito entre código e documentos, os documentos prevalecem.

const rawFiles = import.meta.glob("./docs/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export type DocGroup = {
  id: string;
  label: string;
  description: string;
};

export const groups: DocGroup[] = [
  {
    id: "A",
    label: "Grupo A — Fundamentos",
    description:
      "Visão da solução, problema social, princípios éticos e experiência neuroinclusiva.",
  },
  {
    id: "B",
    label: "Grupo B — Estrutura funcional",
    description:
      "Escopo do protótipo, jornada principal, catálogo de habilidades e instrumentos do usuário.",
  },
  {
    id: "C",
    label: "Grupo C — Personalização",
    description:
      "Personas demonstrativas, contextos de uso e as regras que geram percursos personalizados.",
  },
  {
    id: "D",
    label: "Grupo D — Conteúdo",
    description:
      "Biblioteca demonstrativa com informações curtas e acessíveis ligadas aos objetivos escolhidos.",
  },
  {
    id: "E",
    label: "Grupo E — Interface",
    description:
      "Mapa de telas, navegação e wireframes de baixa fidelidade do protótipo.",
  },
  {
    id: "F",
    label: "Grupo F — Identidade e design",
    description:
      "Identidade da experiência e design system humano que orientam a linguagem visual e sensorial do VIVA.",
  },
  {
    id: "G",
    label: "Grupo G — Ética, IA e governança",
    description:
      "Manifesto de inteligência artificial responsável e governança ética, científica e regulatória.",
  },
];




export type VivaDoc = {
  slug: string;
  number: string;
  title: string;
  subtitle?: string;
  group: string;
  summary: string;
  minutes: number;
  content: string;
};

const meta: Record<
  string,
  { title: string; subtitle?: string; group: string; summary: string }
> = {
  "01_VISAO_DA_SOLUCAO": {
    title: "Visão da Solução",
    subtitle: "Documento Mestre da Solução",
    group: "A",
    summary:
      "Define o propósito do VIVA, o público inicial e os fundamentos que orientam todo o desenvolvimento. Prevalece sobre os demais documentos.",
  },
  "02_PROBLEMA_E_LACUNA": {
    title: "Problema e Lacuna",
    subtitle: "Problema, necessidade social e oportunidade de inovação",
    group: "A",
    summary:
      "Descreve a distância entre receber orientações e aplicá-las no cotidiano, quem é afetado e as barreiras reais da vida diária.",
  },
  "03_PRINCIPIOS_ETICOS_E_SEGURANCA": {
    title: "Princípios Éticos e Segurança",
    group: "A",
    summary:
      "Estabelece autonomia, consentimento, privacidade, proteção de dados e limites de atuação da plataforma.",
  },
  "04_UX_NEUROINCLUSIVA": {
    title: "UX Neuroinclusiva",
    subtitle: "Experiência, usabilidade e acessibilidade",
    group: "A",
    summary:
      "Requisitos de clareza, previsibilidade, controle, personalização, modo de baixo estímulo e comunicação neuroinclusiva.",
  },
  "05_ESCOPO_DEMONSTRATIVO": {
    title: "Escopo do Protótipo Demonstrativo",
    subtitle: "O que a primeira versão demonstra",
    group: "B",
    summary:
      "Delimita o que o protótipo demonstra e o que fica fora do escopo: transformar um objetivo de vida em um percurso personalizado e navegável.",
  },
  "07_JORNADA_PRINCIPAL": {
    title: "Jornada Principal do Usuário",
    subtitle: "O percurso do objetivo à prática",
    group: "B",
    summary:
      "Descreve o percurso que transforma um objetivo real de vida em passos aplicáveis no cotidiano, etapa por etapa.",
  },
  "08_CATALOGO_DE_HABILIDADES": {
    title: "Catálogo Inicial de Habilidades",
    subtitle: "Habilidades que quero desenvolver",
    group: "B",
    summary:
      "Define o catálogo inicial de habilidades, sempre vinculado a objetivos significativos escolhidos pela pessoa.",
  },
  "09_INSTRUMENTOS_DO_USUARIO": {
    title: "Instrumentos do Usuário",
    subtitle: "Formulários, registros e espaços de expressão",
    group: "B",
    summary:
      "Apresenta os instrumentos usados no percurso para identificar objetivos, reconhecer barreiras e escolher estratégias.",
  },
  "06_PERSONAS_E_CONTEXTOS": {
    title: "Personas Demonstrativas e Contextos de Uso",
    subtitle: "Perfis fictícios para demonstração",
    group: "C",
    summary:
      "Apresenta personas fictícias com objetivos e contextos distintos, mostrando por que cada pessoa precisa de um percurso diferente.",
  },
  "10_REGRAS_DE_PERSONALIZACAO": {
    title: "Regras de Personalização Demonstrativa",
    subtitle: "Motor de regras simples, transparentes e rastreáveis",
    group: "C",
    summary:
      "Define o motor inicial de personalização por regras condicionais, sem inteligência artificial real na primeira versão.",
  },
  "11_BIBLIOTECA_DEMONSTRATIVA": {
    title: "Biblioteca Demonstrativa Inicial",
    subtitle: "Conteúdo curto, acessível e vinculado aos objetivos",
    group: "D",
    summary:
      "Define o conteúdo inicial da biblioteca: informações breves e acessíveis, sem curso obrigatório, sequência fixa ou prescrição profissional.",
  },
  "12_MAPA_DE_TELAS": {
    title: "Mapa de Telas e Wireframes",
    subtitle: "Organização, navegação e wireframes de baixa fidelidade",
    group: "E",
    summary:
      "Apresenta o mapa de telas do protótipo e os wireframes que organizam conteúdos, campos, opções e navegação.",
  },
};





function cleanMarkdown(raw: string): string {
  return raw
    .replace(/\\([#\-*_[\]()>.`])/g, "$1")
    .replace(/^•\s*/gm, "- ")
    .replace(/\r/g, "");
}

export const docs: VivaDoc[] = Object.entries(rawFiles)
  .map(([path, raw]) => {
    const slug = path.replace("./docs/", "").replace(/\.md$/, "");
    const info = meta[slug] ?? {
      title: slug,
      group: "A",
      summary: "Documento da base VIVA.",
    };
    const content = cleanMarkdown(raw);
    const words = content.split(/\s+/).length;
    return {
      slug,
      number: slug.slice(0, 2),
      title: info.title,
      subtitle: info.subtitle,
      group: info.group,
      summary: info.summary,
      minutes: Math.max(2, Math.round(words / 180)),
      content,
    };
  })
  .sort((a, b) => a.slug.localeCompare(b.slug));

export function getDoc(slug: string): VivaDoc | undefined {
  return docs.find((d) => d.slug === slug);
}

export function docsByGroup(groupId: string): VivaDoc[] {
  return docs.filter((d) => d.group === groupId);
}
