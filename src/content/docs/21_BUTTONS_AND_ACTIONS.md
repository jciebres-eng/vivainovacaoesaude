\# 21_BUTTONS_AND_ACTIONS.md

\# VIVA --- Sistema de Botões e Ações

Versão: 1.0

Status: Documento estruturante

\-\--

\# 1. Objetivo

Este documento define todas as ações interativas do VIVA.

Botões não representam apenas comandos.

Eles comunicam prioridade, segurança, previsibilidade e intenção.

Todo botão deverá seguir estas especificações.

\-\--

\# 2. Princípios

Os botões deverão ser:

• facilmente identificáveis

• consistentes

• previsíveis

• acessíveis

• grandes o suficiente para toque

• claros

• sem excesso de efeitos

Nunca utilizar:

• animações exageradas

• pulsação contínua

• cores piscando

• múltiplos CTAs concorrendo

Cada tela deverá possuir apenas uma ação principal.

\-\--

\# 3. Hierarquia

Nível 1

Primary

↓

Nível 2

Secondary

↓

Nível 3

Outline

↓

Nível 4

Ghost

↓

Nível 5

Text

\-\--

\# 4. Tamanho mínimo

Altura

48 px

Largura mínima

48 px

Área de toque

mínimo 48x48

Raio

16 px

\-\--

\# 5. Primary Button

Uso

Ação principal da tela.

Exemplos

Continuar

Salvar

Começar

Enviar

Planejar

Construir percurso

Características

Maior destaque visual.

Máximo um por tela.

\-\--

\# 6. Secondary Button

Uso

Ações importantes, porém secundárias.

Exemplos

Editar

Cancelar

Alterar

Voltar

Duplicar

\-\--

\# 7. Outline Button

Uso

Ações neutras.

Exemplos

Visualizar

Detalhes

Saiba mais

Abrir

\-\--

\# 8. Ghost Button

Uso

Ferramentas auxiliares.

Exemplos

Filtrar

Ordenar

Expandir

Ocultar

\-\--

\# 9. Text Button

Uso

Links discretos.

Exemplos

Esqueci minha senha

Ver política

Ajuda

\-\--

\# 10. Floating Action Button

Representa o Assistente Digital.

Nunca deverá desaparecer completamente.

Estados

Idle

Listening

Thinking

Guiding

Completed

Offline

Error

Low Stimulation

Sempre localizado no canto inferior direito, respeitando áreas seguras.

\-\--

\# 11. Voice Button

Função

Ativar entrada por voz.

Ícone

Microfone.

Estados

Disponível

Gravando

Processando

Transcrevendo

Concluído

Erro

Ao gravar, utilizar apenas animação suave de onda.

Nunca utilizar efeitos sonoros agressivos.

\-\--

\# 12. SOS

Uso

Solicitação rápida de ajuda.

Características

Alta visibilidade.

Não utilizar vermelho intenso permanente.

Solicitar confirmação antes da ação.

Nunca acionar automaticamente.

\-\--

\# 13. Compartilhar

Uso

Compartilhar percurso em andamento.

Nunca compartilhar dados sem consentimento.

Exemplos

Família

Profissional

Cuidador

Pessoa de confiança

Permitir revogação imediata.

\-\--

\# 14. Próximo Passo

Um componente proprietário do VIVA.

Não é apenas um botão.

É um convite para continuar o percurso.

Deve apresentar:

ícone

título

tempo estimado

contexto

Ação principal:

Continuar

\-\--

\# 15. CTA Grande

Uso

Momentos decisivos.

Exemplos

Iniciar percurso

Começar simulação

Preparar atividade

Agendar consulta

Características

Largura quase total.

Máximo um por tela.

\-\--

\# 16. CTA Compacto

Uso

Listagens.

Cards.

Biblioteca.

Mapa.

Deve ocupar pouco espaço.

\-\--

\# 17. Estados

Todos os botões deverão possuir obrigatoriamente:

Normal

Hover

Pressed

Focused

Disabled

Loading

Success

Warning

Error

Offline

Cada estado deverá alterar:

cor

elevação

feedback tátil (quando disponível)

cursor

animação

texto acessível

Nunca comunicar estado apenas por cor.

\-\--

\# 18. Loading

Substituir texto por indicador.

Nunca bloquear toda a interface.

Permitir cancelamento quando possível.

\-\--

\# 19. Feedback

Ao clicar:

microanimação

↓

processamento

↓

confirmação

↓

retorno ao estado normal

Tempo máximo:

300 ms

\-\--

\# 20. Ícones

Todos os botões poderão conter:

ícone

texto

ou ambos.

Nunca utilizar somente ícones quando houver risco de ambiguidade.

\-\--

\# 21. Acessibilidade

Todos deverão possuir:

aria-label

descrição

foco por teclado

alto contraste

leitor de tela

controle por voz

Switch Control

Nunca depender exclusivamente da cor.

\-\--

\# 22. Modo Baixa Estimulação

Reduzir:

Glow

Escala

Animações

Sombras

Manter:

contraste

legibilidade

área de toque

\-\--

\# 23. Motion

Hover

120 ms

Press

80 ms

Loading

250 ms

Success

300 ms

Erro

250 ms

Nunca utilizar bounce exagerado.

\-\--

\# 24. Tokens

Todos os botões deverão utilizar apenas:

Button.Primary.\*

Button.Secondary.\*

Button.Outline.\*

Button.Ghost.\*

Button.Text.\*

Button.Floating.\*

Button.Voice.\*

Button.SOS.\*

Button.Share.\*

Button.NextStep.\*

Button.CTA.\*

\-\--

\# 25. Critérios de Aceitação

✓ Todos os botões utilizam Design Tokens.

✓ Todos possuem estados completos.

✓ Todos são acessíveis.

✓ Todos respeitam área mínima de toque.

✓ Apenas um CTA principal por tela.

✓ Nenhum botão utiliza estilos locais.

✓ Todos funcionam em modo de baixa estimulação.

✓ Todos funcionam em alto contraste.

✓ Todos possuem comportamento consistente em mobile e desktop.
