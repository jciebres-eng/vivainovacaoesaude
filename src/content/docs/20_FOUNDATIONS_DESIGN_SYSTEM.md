\# 20_FOUNDATIONS_DESIGN_SYSTEM.md

\# VIVA --- Foundations do Design System

Versão: 1.0

Status: Documento estruturante

\-\--

\# 1. Objetivo

Este documento estabelece as fundações visuais do VIVA.

Todas as telas, componentes, animações, interações e futuras
funcionalidades deverão respeitar estas definições.

Nenhum componente deverá utilizar estilos locais que contrariem estas
regras.

Todo o projeto deverá consumir exclusivamente os Design Tokens definidos
neste documento.

\-\--

\# 2. Filosofia visual

O Design System do VIVA deve comunicar:

• previsibilidade

• autonomia

• clareza

• acolhimento

• simplicidade

• segurança

• tecnologia humanizada

• organização

• continuidade

A interface nunca deverá transmitir:

• urgência

• excesso de estímulos

• competição

• infantilização

• gamificação manipulativa

• aparência clínica fria

• excesso de informações

\-\--

\# 3. Grid

Sistema base

8 pt Grid

Todas as medidas deverão respeitar múltiplos de 4 px.

Escalas principais

4

8

12

16

20

24

32

40

48

56

64

80

96

128

\-\--

\# 4. Espaçamentos

Spacing XS

4 px

Spacing S

8 px

Spacing M

12 px

Spacing L

16 px

Spacing XL

24 px

Spacing XXL

32 px

Spacing Display

48 px

Spacing Hero

64 px

Nunca utilizar espaçamentos arbitrários.

\-\--

\# 5. Border Radius

XS

6

S

10

M

16

L

24

XL

32

Pílula

999 px

Os cartões deverão utilizar preferencialmente Radius M.

\-\--

\# 6. Elevação

Shadow 1

Cartões

Shadow 2

Bottom Sheets

Shadow 3

Dialogs

Shadow 4

Assistente

Shadow 5

Elementos flutuantes

Nunca utilizar sombras duras.

Sombras sempre suaves e difusas.

\-\--

\# 7. Glow

O Glow representa vida.

Utilizar apenas em:

Assistente Digital

Confirmações

Localização atual

Estados ativos

Nunca utilizar Glow em excesso.

\-\--

\# 8. Blur

Utilizar Glass Blur apenas em:

Bottom Sheets

Dialogs

Painéis sobre mapas

Menus flutuantes

Nunca utilizar blur em textos.

\-\--

\# 9. Tipografia

Fonte principal

Inter

Fonte alternativa

Roboto

Escala

Display

Hero

H1

H2

H3

Body Large

Body

Small

Caption

Label

Evitar mais de três pesos diferentes por tela.

\-\--

\# 10. Escala Tipográfica

Display

56

Hero

48

H1

40

H2

32

H3

24

Body

16

Small

14

Caption

12

\-\--

\# 11. Paleta Principal

Inspirada na identidade Google, porém original.

Primary Blue

Primary Green

Primary Yellow

Primary Orange

Primary Red

Primary Violet

Essas cores representam:

confiança

crescimento

atenção

energia

importância

criatividade

Nunca utilizar todas simultaneamente na mesma tela.

\-\--

\# 12. Paleta Neutra

Background

Surface

Surface Variant

Border

Muted

Foreground

Foreground Secondary

Disabled

Overlay

Glass

A interface deverá utilizar predominantemente tons neutros.

\-\--

\# 13. Estados

Success

Warning

Info

Error

Disabled

Loading

Selected

Focused

Hovered

Pressed

Offline

Cada estado deverá possuir:

cor

ícone

animação

feedback

descrição acessível

Nunca comunicar estado apenas por cor.

\-\--

\# 14. Tokens

Criar arquivo:

design-tokens.ts

Estrutura:

Color.Primary

Color.Secondary

Color.Background

Color.Surface

Color.Text

Color.Border

Spacing.XS

Spacing.S

Spacing.M

Spacing.L

Spacing.XL

Radius.S

Radius.M

Radius.L

Shadow.Level1

Shadow.Level2

Glow.Assistant

Animation.Fast

Animation.Normal

Animation.Slow

Motion.Swipe

Motion.Page

Motion.Modal

Motion.Map

Blur.Glass

Opacity.Disabled

\-\--

\# 15. Tokens de Movimento

Very Fast

120 ms

Fast

180 ms

Normal

250 ms

Comfort

350 ms

Slow

500 ms

Hero

800 ms

Nunca utilizar transições superiores a 1000 ms.

\-\--

\# 16. Curvas

Ease Out

Ease In Out

Spring Soft

Spring Medium

Spring Gentle

Nunca utilizar Bounce exagerado.

\-\--

\# 17. Tokens de Acessibilidade

High Contrast

Reduced Motion

Large Text

Screen Reader

Keyboard

Switch Control

Voice Control

Todas as telas deverão responder automaticamente aos respectivos
estados.

\-\--

\# 18. Modo Baixa Estimulação

Criar tokens específicos.

Reduzir:

movimento

brilho

glow

contraste

partículas

blur

profundidade

cards simultâneos

Manter:

hierarquia

funcionalidade

clareza

\-\--

\# 19. Responsividade

Mobile First

320 px

360 px

390 px

412 px

768 px

1024 px

1440 px

Desktop

Prioridade absoluta para smartphone.

\-\--

\# 20. Ícones

Biblioteca:

Lucide

Complementar:

Ícones proprietários do VIVA

Todos os ícones deverão possuir:

Outline

Filled

Rounded

Animated

Nunca misturar estilos.

\-\--

\# 21. Ilustrações

Todas deverão seguir o mesmo estilo artístico.

Nunca misturar:

3D

Flat

Realista

Cartoon

na mesma interface.

\-\--

\# 22. Lottie

As animações deverão utilizar Lottie JSON como padrão.

Estados:

Idle

Listening

Thinking

Building

Guiding

Completed

Offline

Error

Low Stimulation

Fallback obrigatório em SVG.

\-\--

\# 23. Critérios de Aceitação

O documento será considerado implementado quando:

✓ Todos os componentes utilizarem exclusivamente estes tokens.

✓ Não existirem cores locais.

✓ Não existirem espaçamentos arbitrários.

✓ Toda animação respeitar Motion Tokens.

✓ Toda tela responder automaticamente ao modo de baixa estimulação.

✓ Toda tela responder automaticamente ao modo de alto contraste.

✓ Toda tela respeitar Mobile First.

✓ Todo novo componente puder ser criado reutilizando exclusivamente
estas fundações.

\-\--

\# 24. Auditoria

Antes de cada versão do produto verificar:

• consistência visual

• contraste

• tipografia

• grid

• responsividade

• motion

• acessibilidade

• tokens

• sombras

• glow

• blur

• estados

• modo baixa estimulação

• modo alto contraste

• Lottie

Nenhuma tela poderá ser aprovada se violar qualquer regra deste
documento.
