# Assistente Digital Vivo — animações

Este documento explica como os ativos visuais do assistente são organizados e
como substituir os arquivos provisórios por versões finais, sem tocar em
nenhum componente.

## Onde ficam os arquivos

```
src/assets/assistant/lottie/   → animações .json (uma por estado)
src/assets/assistant/static/   → equivalentes estáticos .svg
src/lib/assistant/estados.ts   → máquina de estados (pura, sem React)
src/lib/assistant/animacoes.ts → mapa estado → ativo, cache e fallback
```

O componente `LivingAssistantAnimation` é o único que renderiza o assistente.
Nenhum outro arquivo importa um `.json` de animação diretamente.

## Estados

A máquina reconhece 16 estados: `idle`, `listening`, `transcribing`,
`processing`, `organizing`, `suggesting`, `waiting`, `guiding`, `confirming`,
`completed`, `error`, `offline`, `silent`, `minimized`, `lowStimulation` e
`disabled`.

Cada estado tem:

- uma animação em `ativoPorEstado`;
- um equivalente estático em `estaticoPorEstado`;
- uma descrição em texto em `descricaoDoEstado`, lida por leitores de tela.

Estados com permanência mínima (`permanenciaMinima`) não podem ser
substituídos antes do tempo indicado. Isso evita piscadas quando várias
etapas acontecem em sequência rápida.

## Substituir um ativo

1. Exporte o Lottie do After Effects em 512×512, 30 fps.
2. Salve como `src/assets/assistant/lottie/assistant-<estado>.json`,
   mantendo exatamente o nome já usado na tabela `ativoPorEstado`.
3. Nada mais precisa mudar: o carregamento é feito por `import.meta.glob`.

Recomendações: manter cada arquivo abaixo de 150 KB
(`limiteDeTamanhoKb`), evitar imagens embutidas e usar apenas camadas de
forma. Os arquivos atuais são provisórios, gerados por script, e existem para
que o protótipo funcione desde o primeiro momento.

## Quando a animação não é usada

`deveUsarEstatico` decide, e a resposta é sempre "usar imagem estática"
quando:

- a pessoa pediu redução de movimento (preferência do sistema ou do VIVA);
- o tema de baixa estimulação está ativo;
- o assistente está desligado;
- o arquivo do estado não existe ou falhou ao carregar.

Não há caminho em que a ausência de um ativo produza tela em branco ou erro.

## Acessibilidade

- A forma nunca é a única fonte de informação: o rótulo em texto acompanha
  cada estado.
- O elemento visual é `aria-hidden`; a descrição vive num `role="status"`
  invisível, para não repetir o conteúdo em leitores de tela.
- Nenhuma animação pisca, acelera ou chama atenção fora do momento em que
  algo está de fato acontecendo.
