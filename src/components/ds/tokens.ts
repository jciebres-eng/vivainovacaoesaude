/**
 * VIVA — Tokens de design (documentos 00, 04, 13 e 14).
 *
 * Fonte única de verdade para valores visuais. Nenhum componente deve usar
 * valores arbitrários (pixels soltos, hexadecimais, durações improvisadas).
 * As cores vivem em `src/styles.css` como variáveis semânticas; aqui ficam os
 * tokens usados diretamente em TypeScript/JSX.
 */

/** Nomes semânticos de cor. Uso: classes utilitárias correspondentes. */
export const cores = {
  backgroundPrimary: "bg-background-primary",
  backgroundSecondary: "bg-background-secondary",
  surfaceDefault: "bg-surface-default",
  surfaceMuted: "bg-surface-muted",
  textPrimary: "text-text-primary",
  textSecondary: "text-text-secondary",
  borderDefault: "border-border-default-default",
  actionPrimary: "bg-action-primary text-action-primary-foreground",
  actionSecondary: "bg-surface-default text-text-primary",
  feedbackInformation: "bg-feedback-information text-feedback-information-foreground",
  feedbackAttention: "bg-feedback-attention text-feedback-attention-foreground",
  feedbackError: "text-feedback-error",
  focusRing: "outline-focus-ring",
} as const;

/** Escala tipográfica: oito estilos, nada além disso. */
export const tipografia = {
  tituloPagina: "viva-titulo-pagina",
  tituloSecao: "viva-titulo-secao",
  subtitulo: "viva-subtitulo",
  textoPrincipal: "viva-texto",
  textoApoio: "viva-apoio",
  legenda: "viva-legenda",
  rotulo: "viva-rotulo",
  botao: "viva-texto-botao",
} as const;

/** Espaçamentos verticais previsíveis entre blocos. */
export const espacamento = {
  entreCampos: "space-y-4",
  entreBlocos: "space-y-6",
  entreSecoes: "space-y-10",
  internoCard: "p-5 md:p-6",
  internoCompacto: "p-4",
} as const;

/** Raios de canto. Cantos suaves em tudo (doc 14). */
export const raio = {
  campo: "rounded-2xl",
  card: "rounded-3xl",
  botao: "rounded-full",
  chip: "rounded-full",
  discreto: "rounded-xl",
} as const;

/** Sombras: apenas duas, sempre suaves. */
export const sombra = {
  card: "shadow-suave",
  elevada: "shadow-suave-alta",
} as const;

/** Tamanhos de ícone. Ícone nunca aparece sozinho sem nome acessível. */
export const icone = {
  pequeno: "h-3.5 w-3.5",
  padrao: "h-4 w-4",
  medio: "h-5 w-5",
  grande: "h-6 w-6",
} as const;

/** Durações de animação, em milissegundos. Sempre breves. */
export const duracao = {
  imediata: 120,
  rapida: 160,
  padrao: 180,
  entrada: 260,
} as const;

/** Alvos de toque: mínimo de 44px em qualquer elemento interativo. */
export const alvoDeToque = "min-h-11";

/** Larguras máximas de conteúdo (leitura confortável). */
export const largura = {
  leitura: "max-w-[58ch]",
  documento: "max-w-[68ch]",
  tela: "max-w-3xl",
  aplicacao: "max-w-7xl",
} as const;

/**
 * Pontos de quebra (iguais aos do Tailwind, declarados para referência).
 * Mobile é o ponto de partida; `md` é onde a navegação lateral aparece.
 */
export const quebras = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;
