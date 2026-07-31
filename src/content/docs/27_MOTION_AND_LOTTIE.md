\# 27_MOTION_AND_LOTTIE.md

\# VIVA --- Sistema de Movimento, Transições e Animações Lottie

Versão: 1.0

Status: Documento estruturante

Categoria: Design System --- Movimento, feedback e continuidade visual

\-\--

\# 1. Objetivo

Este documento define como o movimento deverá ser utilizado no VIVA.

O movimento deverá ajudar o usuário a compreender:

\- o que mudou;

\- o que foi acionado;

\- o que está sendo processado;

\- para onde um elemento foi;

\- qual etapa foi concluída;

\- o que exige atenção;

\- qual é o próximo passo.

Toda animação deverá possuir função clara.

O movimento nunca deverá ser utilizado apenas para decorar a interface,
aumentar engajamento artificial ou capturar atenção de forma contínua.

\-\--

\# 2. Princípio central

O movimento deverá orientar sem estimular em excesso.

Deverá comunicar continuidade, não urgência.

Deverá reduzir incerteza, não produzir espetáculo.

Deverá respeitar o ritmo do usuário e desaparecer quando não for
necessário.

\-\--

\# 3. Funções permitidas

O movimento poderá ser utilizado para:

\- indicar causa e efeito;

\- mostrar mudança de estado;

\- preservar continuidade espacial;

\- confirmar uma ação;

\- indicar processamento;

\- orientar foco;

\- revelar conteúdo progressivamente;

\- demonstrar gesto;

\- sinalizar erro;

\- representar progresso;

\- conectar etapas de uma jornada;

\- indicar entrada e saída de elementos.

\-\--

\# 4. Funções proibidas

Não utilizar movimento para:

\- pressionar o usuário;

\- aumentar sensação de urgência;

\- estimular uso contínuo;

\- criar recompensa compulsiva;

\- competir com o conteúdo;

\- simular emoção humana;

\- ocultar demora excessiva;

\- distrair durante execução;

\- substituir instruções claras;

\- obrigar acompanhamento visual.

\-\--

\# 5. Princípios gerais

Toda animação deverá ser:

\- breve;

\- previsível;

\- reversível quando aplicável;

\- compatível com redução de movimento;

\- acessível;

\- leve;

\- coerente com a ação;

\- consistente em toda a plataforma.

Evitar:

\- bounce exagerado;

\- tremores;

\- flashes;

\- zoom intenso;

\- rotação rápida;

\- partículas excessivas;

\- deslocamentos longos;

\- movimentos infinitos;

\- parallax intenso;

\- autoplay decorativo;

\- animações simultâneas concorrentes.

\-\--

\# 6. Categorias de movimento

O sistema deverá possuir sete categorias:

1\. Microinterações;

2\. Transições de tela;

3\. Transições de componentes;

4\. Feedback de estado;

5\. Progresso;

6\. Orientação;

7\. Animações Lottie.

\-\--

\# 7. Escala de duração

Utilizar a seguinte escala:

\`\`\`text

Motion.Duration.instant = 0 ms

Motion.Duration.xfast = 80 ms

Motion.Duration.fast = 120 ms

Motion.Duration.normal = 200 ms

Motion.Duration.medium = 300 ms

Motion.Duration.slow = 400 ms

Motion.Duration.xslow = 600 ms

Animações acima de 600 ms deverão ser excepcionais.

Movimentos contínuos deverão utilizar ciclos lentos e possuir
possibilidade de pausa.

------------------------------------------------------------------------

**8. Durações recomendadas**

**Pressed**

80 ms.

**Hover**

120 ms.

**Focus**

120 ms.

**Tooltip**

150--200 ms.

**Menu**

180--220 ms.

**Modal**

200--250 ms.

**Bottom sheet**

250--300 ms.

**Card expandido**

250--300 ms.

**Troca de etapa**

250--350 ms.

**Confirmação**

250--300 ms.

**Erro**

200--250 ms.

**Transição de tela**

250--350 ms.

**Reorganização de jornada**

300--400 ms.

------------------------------------------------------------------------

**9. Curvas de animação**

Criar curvas padronizadas:

\--motion-ease-standard: cubic-bezier(0.2, 0, 0, 1);

\--motion-ease-enter: cubic-bezier(0, 0, 0, 1);

\--motion-ease-exit: cubic-bezier(0.3, 0, 1, 1);

\--motion-ease-emphasized: cubic-bezier(0.2, 0, 0, 1);

\--motion-ease-linear: linear;

Uso:

- Standard: movimentos comuns;

- Enter: entrada de elementos;

- Exit: saída;

- Emphasized: mudança estrutural;

- Linear: progresso contínuo.

Evitar criar curvas locais não documentadas.

------------------------------------------------------------------------

**10. Propriedades permitidas**

Priorizar animações com:

- opacity;

- transform;

- scale discreto;

- translate;

- clip-path simples;

- stroke;

- path;

- background-color;

- border-color;

- box-shadow discreto.

Evitar animar:

- width;

- height;

- top;

- left;

- margin;

- padding;

- filtros pesados;

- blur intenso.

Quando necessário, utilizar técnicas que preservem desempenho.

------------------------------------------------------------------------

**11. Escala**

A escala deverá ser discreta.

Valores recomendados:

Hover: 1.01

Pressed: 0.98

Entrada: 0.98 → 1

Confirmação: 0.96 → 1

Não utilizar crescimento acima de 1.05 em componentes comuns.

------------------------------------------------------------------------

**12. Deslocamento**

Deslocamentos recomendados:

Pequeno: 4 px

Médio: 8 px

Grande: 16 px

Estrutural: 24 px

Evitar deslocamentos longos em elementos pequenos.

A direção deverá corresponder à lógica espacial da interface.

------------------------------------------------------------------------

**13. Opacidade**

Transições de opacidade deverão preservar legibilidade.

Valores recomendados:

Entrada: 0 → 1

Saída: 1 → 0

Conteúdo secundário: nunca abaixo do mínimo de contraste

Não utilizar piscadas rápidas.

------------------------------------------------------------------------

**14. Microinterações**

Microinterações deverão comunicar resposta imediata.

Aplicações:

- botão pressionado;

- seleção de opção;

- ativação de toggle;

- salvamento;

- favoritar;

- anexar;

- remover;

- copiar;

- compartilhar;

- concluir etapa.

Cada microinteração deverá possuir:

1.  gatilho;

2.  regra;

3.  feedback;

4.  encerramento.

------------------------------------------------------------------------

**15. Botões**

**Hover**

- leve mudança de superfície;

- elevação discreta;

- duração de 120 ms.

**Pressed**

- escala para 0.98;

- redução breve de elevação;

- duração de 80 ms.

**Loading**

- indicador interno;

- texto preservado ou substituído de forma previsível;

- sem deslocar o layout.

**Success**

- ícone de confirmação;

- transição curta;

- retorno ao estado estável.

**Error**

- borda e ícone;

- nenhuma vibração visual intensa.

------------------------------------------------------------------------

**16. Campos**

**Focus**

- focus ring;

- alteração suave de borda;

- label preservado.

**Success**

- ícone discreto;

- mensagem próxima ao campo.

**Error**

- mensagem clara;

- destaque estável;

- sem tremer o campo.

Não utilizar animação de shake como padrão de erro.

------------------------------------------------------------------------

**17. Cards**

Cards poderão utilizar:

- leve elevação no hover;

- expansão;

- recolhimento;

- entrada por fade;

- reorganização;

- swipe;

- seleção.

Nunca manter cards flutuando continuamente.

------------------------------------------------------------------------

**18. Swipe**

O swipe deverá possuir:

- resistência;

- feedback visual progressivo;

- indicação da ação;

- possibilidade de cancelar;

- animação de retorno;

- alternativa por botão.

Direções:

- direita: aceitar;

- esquerda: descartar;

- cima: detalhes;

- baixo: voltar.

O card deverá retornar suavemente quando o gesto não ultrapassar o
limite.

------------------------------------------------------------------------

**19. Limites do swipe**

Valores de referência:

Início do feedback: 8% do deslocamento

Confirmação visual: 20%

Ação concluída: 35%

Rotação máxima: 3 graus

Evitar rotações intensas.

No modo de baixa estimulação, remover rotação.

------------------------------------------------------------------------

**20. Navegação entre telas**

Transições deverão preservar contexto.

Utilizar:

- fade;

- slide curto;

- shared element discreto;

- expansão contextual.

Regras:

- avanço: deslocamento sutil para a esquerda;

- retorno: deslocamento sutil para a direita;

- modal: entrada por fade e scale discreto;

- bottom sheet: movimento vertical.

Em interfaces RTL, inverter a direção quando necessário.

------------------------------------------------------------------------

**21. Jornada e timeline**

Ao concluir uma etapa:

- marcar como concluída;

- mover o foco para o próximo passo;

- atualizar progresso;

- utilizar animação curta;

- anunciar a mudança de forma acessível.

Evitar animações celebratórias intensas.

------------------------------------------------------------------------

**22. Progresso**

O progresso deverá ser atualizado suavemente.

Tipos:

- barra;

- etapas;

- checklist;

- círculo;

- texto.

Regras:

- não animar percentuais falsos;

- não retroceder sem explicação;

- evitar ciclos infinitos quando houver progresso real;

- informar quando o tempo for desconhecido.

------------------------------------------------------------------------

**23. Loading**

Tipos permitidos:

- skeleton;

- spinner;

- barra;

- progresso determinado;

- progresso indeterminado;

- animação Lottie funcional.

Preferência:

- skeleton para conteúdo;

- spinner para ações curtas;

- barra para operações longas;

- texto para processos complexos.

------------------------------------------------------------------------

**24. Skeleton**

O skeleton deverá:

- preservar o layout;

- possuir movimento suave ou estático;

- evitar brilho intenso;

- respeitar redução de movimento;

- desaparecer com transição curta.

No modo de baixa estimulação, utilizar skeleton estático.

------------------------------------------------------------------------

**25. Spinner**

O spinner deverá ser:

- simples;

- leve;

- pequeno;

- acompanhado por texto quando a espera ultrapassar 2 segundos.

Não utilizar múltiplos spinners simultâneos.

------------------------------------------------------------------------

**26. Operações prolongadas**

Quando uma ação ultrapassar 5 segundos:

- explicar o que está acontecendo;

- mostrar progresso quando possível;

- oferecer cancelamento;

- preservar o contexto;

- evitar repetir animação sem informação.

Exemplo:

Estamos organizando as etapas do percurso.

Você pode continuar nesta tela ou cancelar.

------------------------------------------------------------------------

**27. Feedback de sucesso**

O sucesso deverá utilizar:

- ícone;

- texto;

- transição curta;

- nenhuma explosão visual;

- nenhum som obrigatório.

Exemplos:

- percurso salvo;

- endereço confirmado;

- etapa concluída;

- compartilhamento encerrado.

------------------------------------------------------------------------

**28. Feedback de erro**

O erro deverá ser:

- estável;

- legível;

- próximo ao elemento;

- acompanhado por instrução;

- sem tremor ou flash.

Movimentos permitidos:

- fade;

- mudança de borda;

- entrada de mensagem;

- pequeno deslocamento de 4 px.

------------------------------------------------------------------------

**29. Avisos**

Warnings poderão utilizar:

- entrada suave;

- ícone;

- superfície própria;

- destaque sem pulsação.

Não utilizar animações repetitivas para manter o aviso visível.

------------------------------------------------------------------------

**30. Tooltips**

Tooltips deverão:

- aparecer após breve atraso;

- fechar ao remover foco;

- funcionar por teclado;

- não conter ações essenciais;

- não utilizar movimento excessivo.

Duração recomendada:

150--200 ms.

------------------------------------------------------------------------

**31. Modais**

Entrada:

- fade do overlay;

- scale de 0.98 para 1;

- duração de 200--250 ms.

Saída:

- fade;

- scale discreto;

- duração de 180--220 ms.

O foco deverá ser movido somente após a entrada.

------------------------------------------------------------------------

**32. Bottom sheets**

Entrada:

- movimento vertical;

- duração de 250--300 ms;

- curva enter.

Saída:

- movimento vertical;

- duração de 200--250 ms;

- curva exit.

Durante o gesto, o movimento deverá acompanhar o toque.

------------------------------------------------------------------------

**33. Menus**

Menus deverão:

- surgir próximos ao gatilho;

- utilizar fade e deslocamento de 4--8 px;

- preservar orientação espacial;

- evitar zoom.

------------------------------------------------------------------------

**34. Assistente Digital**

O Assistente deverá utilizar movimento conforme sua máquina de estados.

Estados:

- idle;

- listening;

- thinking;

- building;

- guiding;

- waiting;

- completed;

- offline;

- error;

- low stimulation.

Nenhum estado deverá depender apenas da animação.

Sempre utilizar:

- ícone;

- texto acessível;

- cor;

- descrição de estado.

------------------------------------------------------------------------

**35. Movimento do Assistente no estado idle**

Características:

- respiração visual suave;

- ciclo de 3 a 5 segundos;

- amplitude mínima;

- possibilidade de pausa;

- ausência de pulsação luminosa intensa.

No modo de baixa estimulação, manter forma estática.

------------------------------------------------------------------------

**36. Estado listening**

Utilizar:

- onda suave;

- pontos ou linhas;

- reação proporcional ao áudio;

- indicação clara de gravação.

Nunca utilizar luz piscando.

------------------------------------------------------------------------

**37. Estado thinking**

Utilizar:

- rotação lenta;

- conexão de elementos;

- transformação abstrata;

- ciclo curto.

Se a espera ultrapassar 3 segundos, apresentar texto.

------------------------------------------------------------------------

**38. Estado building**

Utilizar:

- conexão entre pontos;

- surgimento de etapas;

- composição de blocos;

- progresso quando mensurável.

Evitar representação que simule "mente" ou "cérebro".

------------------------------------------------------------------------

**39. Estado completed**

Utilizar:

- transformação breve;

- ícone de confirmação;

- fade;

- retorno ao idle.

Duração máxima:

300 ms.

------------------------------------------------------------------------

**40. Estado error**

Utilizar:

- mudança estável;

- ícone de erro;

- pequena transição;

- nenhuma vibração intensa.

------------------------------------------------------------------------

**41. Lottie**

Lottie poderá ser utilizado para:

- Assistente;

- estados vazios;

- upload;

- sincronização;

- conclusão;

- orientação de gesto;

- carregamento contextual;

- feedback de sistema.

Não utilizar Lottie em todo componente.

------------------------------------------------------------------------

**42. Requisitos dos arquivos Lottie**

Todo arquivo deverá:

- ser leve;

- possuir fundo transparente;

- utilizar formas vetoriais;

- evitar imagens raster;

- evitar efeitos incompatíveis;

- possuir fallback estático;

- funcionar em mobile;

- funcionar em desktop;

- respeitar temas;

- ser pausável;

- respeitar redução de movimento.

------------------------------------------------------------------------

**43. Limites técnicos para Lottie**

Recomendações:

Tamanho ideal: até 150 KB

Tamanho máximo recomendado: 300 KB

Duração padrão: até 3 segundos

Ciclo idle: até 5 segundos

Frame rate: 30 fps

Camadas: reduzir ao mínimo necessário

Arquivos maiores deverão ser justificados e otimizados.

------------------------------------------------------------------------

**44. Nomeação de arquivos**

Utilizar padrão:

categoria_estado_variante.json

Exemplos:

assistant_idle_default.json

assistant_listening_default.json

assistant_thinking_low-stimulation.json

feedback_success_compact.json

upload_processing_default.json

gesture_swipe-right_demo.json

empty_journey_default.json

------------------------------------------------------------------------

**45. Biblioteca Lottie inicial**

Criar os seguintes arquivos:

assistant_idle_default.json

assistant_listening_default.json

assistant_thinking_default.json

assistant_building_default.json

assistant_guiding_default.json

assistant_waiting_default.json

assistant_completed_default.json

assistant_offline_default.json

assistant_error_default.json

feedback_success_default.json

feedback_error_default.json

feedback_saved_default.json

upload_processing_default.json

sync_processing_default.json

route_building_default.json

gesture_swipe-right_demo.json

gesture_swipe-left_demo.json

gesture_swipe-up_demo.json

gesture_swipe-down_demo.json

empty_journey_default.json

empty_library_default.json

empty_history_default.json

------------------------------------------------------------------------

**46. Variações de tema**

Cada animação deverá ser testada em:

- tema claro;

- tema escuro;

- alto contraste;

- baixa estimulação;

- movimento reduzido.

Preferir animações controladas por tokens ou propriedades dinâmicas.

------------------------------------------------------------------------

**47. Fallback estático**

Toda animação funcional deverá possuir fallback.

Formatos possíveis:

- SVG;

- ícone;

- ilustração estática;

- texto;

- barra de progresso;

- mudança de estado.

A ausência da animação nunca deverá bloquear a funcionalidade.

------------------------------------------------------------------------

**48. Redução de movimento**

Respeitar:

\@media (prefers-reduced-motion: reduce)

Quando ativado:

- remover movimentos contínuos;

- reduzir deslocamentos;

- substituir slide por fade;

- remover rotação;

- remover parallax;

- reduzir duração;

- utilizar estados estáticos;

- manter feedback textual.

------------------------------------------------------------------------

**49. Modo de baixa estimulação**

O modo de baixa estimulação deverá ir além do prefers-reduced-motion.

Neste modo:

- remover glow;

- remover partículas;

- remover autoplay;

- reduzir transições;

- diminuir amplitude;

- utilizar superfícies estáveis;

- mostrar uma animação por vez;

- evitar movimento no plano de fundo;

- substituir Lottie por SVG quando possível.

------------------------------------------------------------------------

**50. Controle do usuário**

O usuário deverá poder configurar:

- animações completas;

- animações reduzidas;

- sem animações decorativas;

- movimento automático;

- sons;

- feedback háptico;

- velocidade de transições.

Configuração padrão:

movimento moderado e funcional.

------------------------------------------------------------------------

**51. Feedback háptico**

Quando disponível, poderá ser utilizado para:

- confirmar seleção;

- concluir ação;

- indicar erro;

- ativar swipe;

- iniciar gravação.

Deverá ser:

- opcional;

- breve;

- discreto;

- configurável.

Nunca utilizar vibração prolongada.

------------------------------------------------------------------------

**52. Sons**

Sons deverão ser tratados separadamente do movimento.

Podem acompanhar:

- confirmação;

- erro;

- início de gravação;

- fim de gravação.

Devem ser:

- desativáveis;

- curtos;

- discretos;

- não essenciais.

Nenhum feedback poderá depender apenas de som.

------------------------------------------------------------------------

**53. Autoplay**

Autoplay será permitido apenas quando:

- a animação for curta;

- possuir função imediata;

- não tiver som;

- puder ser interrompida;

- respeitar preferências.

Proibido para:

- vídeos;

- áudios;

- instruções longas;

- animações decorativas repetitivas;

- conteúdo 360°;

- VR.

------------------------------------------------------------------------

**54. Repetição**

Animações não deverão repetir indefinidamente, exceto:

- loading indeterminado;

- estado listening;

- idle do Assistente;

- sincronização em andamento.

Mesmo nesses casos, deverão ser leves e pausáveis.

------------------------------------------------------------------------

**55. Orientação de gesto**

A animação de gesto deverá:

- aparecer apenas na primeira utilização ou quando solicitada;

- durar pouco;

- possuir instrução textual;

- poder ser dispensada;

- não impedir interação.

Exemplo:

Deslize para a direita para adicionar.

Você também pode usar o botão "Adicionar".

------------------------------------------------------------------------

**56. Celebrações**

O VIVA não deverá utilizar celebrações intensas.

Permitido:

- check discreto;

- expansão breve;

- pequena transição;

- mensagem de reconhecimento.

Evitar:

- confetes;

- fogos;

- rankings;

- streaks;

- explosões;

- sons de vitória;

- animações compulsivas.

------------------------------------------------------------------------

**57. Animações em situações críticas**

Em:

- SOS;

- emergência;

- compartilhamento;

- exclusão;

- erro grave;

- perda de conexão durante execução;

utilizar interface estável.

Evitar qualquer animação decorativa.

Priorizar:

- clareza;

- contraste;

- texto;

- ação.

------------------------------------------------------------------------

**58. Acessibilidade**

Toda animação deverá:

- possuir alternativa textual;

- não conter flashes;

- não exceder limites seguros de frequência;

- respeitar redução de movimento;

- não mover foco inesperadamente;

- não alterar conteúdo sem anúncio;

- não impedir leitura;

- ser pausável quando contínua;

- manter contraste.

Mudanças relevantes deverão ser anunciadas por tecnologias assistivas.

------------------------------------------------------------------------

**59. Foco e movimento**

Ao abrir um componente:

- concluir a transição;

- mover o foco de forma previsível;

- anunciar título ou estado.

Ao fechar:

- devolver o foco ao gatilho;

- preservar posição;

- evitar scroll inesperado.

------------------------------------------------------------------------

**60. Performance**

Toda animação deverá manter:

- 60 fps quando possível;

- interação responsiva;

- baixo consumo de CPU;

- baixo consumo de bateria;

- estabilidade em dispositivos modestos.

Evitar:

- excesso de listeners;

- múltiplos Lotties simultâneos;

- filtros pesados;

- vídeos como background;

- canvases desnecessários;

- loops invisíveis.

------------------------------------------------------------------------

**61. Carregamento sob demanda**

Animações deverão ser carregadas apenas quando necessárias.

Aplicar:

- lazy loading;

- code splitting;

- cache;

- pré-carregamento somente das animações essenciais;

- descarte de instâncias inativas.

------------------------------------------------------------------------

**62. Monitoramento de desempenho**

Medir:

- tempo de carregamento;

- tamanho do arquivo;

- uso de memória;

- frames perdidos;

- impacto na bateria;

- tempo de resposta;

- quantidade simultânea de animações.

Animações com queda perceptível de desempenho deverão ser removidas ou
simplificadas.

------------------------------------------------------------------------

**63. Tokens**

Criar tokens específicos:

Motion.Duration.instant

Motion.Duration.xfast

Motion.Duration.fast

Motion.Duration.normal

Motion.Duration.medium

Motion.Duration.slow

Motion.Duration.xslow

Motion.Easing.standard

Motion.Easing.enter

Motion.Easing.exit

Motion.Easing.emphasized

Motion.Easing.linear

Motion.Scale.hover

Motion.Scale.pressed

Motion.Scale.enter

Motion.Translate.xs

Motion.Translate.sm

Motion.Translate.md

Motion.Translate.lg

Motion.Opacity.enter

Motion.Opacity.exit

Motion.Swipe.threshold

Motion.Swipe.rotation

Motion.Swipe.return

Motion.Reduced.duration

Motion.Reduced.translate

Motion.Reduced.opacity

Motion.LowStimulation.duration

Motion.LowStimulation.amplitude

Motion.LowStimulation.loop

Lottie.Size.max

Lottie.Duration.max

Lottie.FrameRate

Nenhum componente deverá utilizar valores de movimento locais fora dos
tokens.

------------------------------------------------------------------------

**64. Componentes técnicos sugeridos**

Criar:

MotionProvider

MotionPreferences

ReducedMotionProvider

LowStimulationMotionProvider

FadeTransition

SlideTransition

ScaleTransition

CollapseTransition

SharedElementTransition

ButtonMotion

CardMotion

FieldMotion

ModalMotion

BottomSheetMotion

MenuMotion

TimelineMotion

ProgressMotion

SwipeMotion

LottiePlayer

LottieLazyPlayer

LottieFallback

LottieThemeAdapter

LottieReducedMotion

LoadingSpinner

LoadingBar

Skeleton

ProgressIndicator

SuccessMotion

ErrorMotion

GestureHint

------------------------------------------------------------------------

**65. Configuração global**

O sistema deverá possuir uma configuração central:

type MotionPreference =

\| \"standard\"

\| \"reduced\"

\| \"low-stimulation\"

\| \"minimal\";

**Standard**

Movimentos funcionais completos.

**Reduced**

Menos deslocamento e ciclos.

**Low-stimulation**

Movimentos mínimos, sem glow e sem autoplay decorativo.

**Minimal**

Somente mudanças essenciais de estado.

------------------------------------------------------------------------

**66. Eventos técnicos**

Eventos recomendados:

motion_preference_changed

animation_started

animation_completed

animation_cancelled

lottie_loaded

lottie_failed

lottie_fallback_used

reduced_motion_detected

low_stimulation_enabled

gesture_hint_shown

gesture_hint_dismissed

Não registrar dados comportamentais desnecessários.

------------------------------------------------------------------------

**67. Testes obrigatórios**

Testar:

- tema claro;

- tema escuro;

- alto contraste;

- baixa estimulação;

- reduced motion;

- mobile;

- tablet;

- desktop;

- teclado;

- leitor de tela;

- dispositivos de baixo desempenho;

- conexão lenta;

- modo offline;

- carregamento de Lottie;

- fallback estático.

------------------------------------------------------------------------

**68. Critérios de aceitação**

O sistema será considerado implementado quando:

- todo movimento possuir função clara;

- todos os componentes utilizarem tokens;

- prefers-reduced-motion for respeitado;

- o modo de baixa estimulação funcionar;

- toda animação funcional possuir fallback;

- nenhuma função depender da animação;

- não houver flashes;

- não houver animações contínuas desnecessárias;

- Lotties forem carregados sob demanda;

- o desempenho permanecer estável;

- o usuário puder reduzir movimentos;

- swipe possuir alternativa por botão;

- feedbacks de erro forem estáveis;

- celebrações forem discretas;

- animações não movimentarem foco inesperadamente.

------------------------------------------------------------------------

**69. Auditoria**

Antes da aprovação, verificar:

- finalidade;

- duração;

- curva;

- amplitude;

- repetição;

- autoplay;

- redução de movimento;

- baixa estimulação;

- acessibilidade;

- foco;

- desempenho;

- bateria;

- tamanho dos arquivos;

- fallback;

- consistência;

- quantidade simultânea de animações;

- ausência de pressão ou manipulação.

Nenhuma animação deverá ser aprovada quando competir com a tarefa,
aumentar sobrecarga, atrasar a interação ou existir apenas para manter a
atenção do usuário.

O próximo documento é \*\*28_PROFILE_AND_PERSONALIZATION.md --- perfil,
preferências, ritmo, linguagem, densidade, acessibilidade, notificações
e personalização real da experiência.\*\*
