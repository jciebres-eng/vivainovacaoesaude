# Design System Humano — VIVA

Fontes: documentos `00_FILOSOFIA_DO_VIVA`, `04_UX_NEUROINCLUSIVA`,
`13_IDENTIDADE_DA_EXPERIENCIA` e `14_DESIGN_SYSTEM_HUMANO` da biblioteca.

Importe sempre por `@/components/ds`. Não escreva valores visuais soltos
(hexadecimais, pixels, durações) nas telas: use tokens e componentes.

## Tokens (`tokens.ts` + `src/styles.css`)

Cores semânticas disponíveis como classes Tailwind:

| Token | Uso |
| --- | --- |
| `background-primary` | fundo da aplicação |
| `background-secondary` | faixas e notas de apoio |
| `surface-default` | cards e campos |
| `surface-muted` | blocos internos, listas |
| `text-primary` / `text-secondary` | texto principal / de apoio |
| `border-default` | bordas |
| `action-primary` / `action-secondary` | ações |
| `feedback-information` | contexto e orientação |
| `feedback-attention` | aviso suave (amarelo, nunca urgência) |
| `feedback-continuidade` | continuidade e conclusão |
| `feedback-error` | erro real, discreto |
| `focus-ring` | anel de foco (sempre visível) |

Tipografia (oito estilos): `viva-titulo-pagina`, `viva-titulo-secao`,
`viva-subtitulo`, `viva-texto`, `viva-apoio`, `viva-legenda`, `viva-rotulo`,
`viva-texto-botao`.

Raios, sombras, ícones, espaçamentos, durações, larguras máximas e pontos de
quebra estão em `tokens.ts`.

## Botões (`botao.tsx`)

`Botao`, `BotaoLink`, `BotaoIcone`, `Chip`.
Variantes: `principal`, `secundario`, `terciario`, `destrutivo`.
Estados: padrão, hover, foco, pressionado, desabilitado, carregando.
Regra: **um único botão principal por bloco de decisão**. Alvo mínimo 44px.

## Cards (`card.tsx`)

`Card` com `variante`: `informativo`, `proximo-passo`, `habilidade`,
`biblioteca`, `registro`, `reflexao`, `estado-atual`, `aviso`.
Estrutura fixa: título → descrição curta → conteúdo → ação opcional.
Também: `Aviso` e `Nota` para mensagens curtas em linha.

## Campos (`campos.tsx`)

`CampoTexto`, `AreaDeTexto`, `CampoSelecao`, `CaixaDeSelecao`, `BotaoDeOpcao`,
`Interruptor`, `ControleDeslizante`, `CampoBusca`, `CampoData`, `CampoHorario`.
Todos com rótulo visível, apoio opcional, foco, erro (associado por
`aria-describedby` + `role="alert"`) e desabilitado.
O placeholder nunca substitui o rótulo.

## Diálogos (`dialogo.tsx`)

`Dialogo` com `tipo`: `confirmacao`, `informacao`, `aviso`, `edicao`,
`exclusao`. Título, contexto, ação principal, cancelar, fechamento por Esc e
foco gerenciado. Prefira uma tela simples quando o modal não for necessário.

## Indicadores e estados (`indicadores.tsx`)

`IndicadorDeEstado`, `MarcadorDeContinuidade`, `BarraDeContinuidade`,
`EtapasDoPercurso`, `Carregando`, `EstadoDaInterface`, `Confirmacao`.

Linguagem permitida: *Em preparação, Em andamento, Você pode continuar,
Concluído, Pausado, Retomar quando desejar*.
Proibida: *Falhou, Atrasado, Incompleto, Baixo desempenho*.

`EstadoDaInterface` cobre `vazio`, `concluido`, `indisponivel`, `erro`,
`sem-conexao` e `nao-encontrado` com mensagens neutras já escritas.

## Tempo (`calendario.tsx`)

`CalendarioMensal`, `AgendaDiaria`, `RegistroDeAtividade`, `Lembrete`.
Sem vermelho para atraso em atividade opcional; retomada sempre possível.

## Acessibilidade (válido para todo o sistema)

Contraste conferido em tema claro, escuro e baixo estímulo; navegação por
teclado; foco visível global (`:focus-visible` em `styles.css`); nomes
acessíveis em ícones; alvos de 44px; `prefers-reduced-motion` e ajuste manual
de animação; estado nunca comunicado só por cor; erro ligado ao campo.

## Animação

Um único padrão: `viva-anim` (transições), `viva-tap` (toque) e `viva-fade`
(entrada de tela), com durações de 120–260ms. Sem pulsação contínua, confete,
piscadas ou movimentos bruscos.
