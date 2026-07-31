\# 26_ASSISTANT_DESIGN_SYSTEM.md

\# VIVA --- Design System do Assistente Digital

Versão: 1.0

Status: Documento estruturante

Categoria: Design System --- Assistente, presença e orientação
contextual

\-\--

\# 1. Objetivo

Este documento define a identidade visual, os estados, os
comportamentos, os limites e os padrões de interação do Assistente
Digital do VIVA.

O Assistente deverá atuar como uma presença discreta de apoio à
navegação, organização e continuidade dos percursos.

Ele não deverá simular uma pessoa, um profissional de saúde, um
terapeuta, um cuidador ou uma autoridade.

Sua função será ajudar o usuário a:

\- compreender a interface;

\- organizar uma intenção;

\- localizar recursos;

\- construir um percurso;

\- retomar uma atividade;

\- entender o próximo passo;

\- reduzir a complexidade da navegação;

\- registrar informações;

\- controlar recursos da plataforma.

\-\--

\# 2. Princípio central

O Assistente deverá ampliar a autonomia do usuário sem criar
dependência.

Ele deverá orientar sem comandar.

Sugerir sem impor.

Explicar sem infantilizar.

Acompanhar sem vigiar.

Aparecer sem ocupar o centro da experiência.

\-\--

\# 3. Identidade

O Assistente deverá ser:

\- abstrato;

\- não humano;

\- não antropomórfico;

\- discreto;

\- acolhedor;

\- previsível;

\- visualmente simples;

\- reconhecível;

\- não infantilizado;

\- não clínico.

Evitar representações como:

\- rosto humano;

\- profissional de saúde;

\- robô humanoide;

\- mascote infantil;

\- animal;

\- personagem excessivamente expressivo;

\- avatar hiper-realista;

\- figura com gênero definido.

\-\--

\# 4. Forma visual

A identidade visual poderá utilizar:

\- formas orgânicas abstratas;

\- círculos;

\- ondas;

\- linhas;

\- pontos;

\- halos;

\- superfícies translúcidas;

\- movimentos respiratórios discretos.

A forma deverá transmitir:

\- presença;

\- estabilidade;

\- atenção;

\- continuidade;

\- baixa intrusão.

O Assistente não deverá utilizar expressões faciais.

\-\--

\# 5. Posição na interface

Posição padrão:

canto inferior direito.

Em mobile:

\- acima da Bottom Navigation;

\- respeitando safe area;

\- sem cobrir botões;

\- sem bloquear campos;

\- sem sobrepor mensagens importantes.

Em desktop:

\- canto inferior direito;

\- alinhado ao conteúdo;

\- afastado das bordas;

\- disponível durante a navegação.

A posição poderá mudar apenas quando houver risco de sobreposição.

\-\--

\# 6. Botão flutuante

O botão flutuante deverá funcionar como entrada principal do Assistente.

Características:

\- área mínima de toque de 56 × 56 px;

\- ícone abstrato;

\- contraste adequado;

\- focus ring;

\- sombra discreta;

\- descrição acessível;

\- estado atual identificável;

\- suporte por teclado;

\- suporte por voz.

O botão deverá permanecer disponível na maioria das telas.

Poderá ser ocultado temporariamente quando:

\- houver teclado cobrindo a interface;

\- existir modal crítico;

\- houver fluxo de consentimento;

\- houver execução em tela cheia;

\- a presença comprometer a segurança da tarefa.

\-\--

\# 7. Modos de apresentação

O Assistente poderá aparecer em quatro formatos:

1\. Botão flutuante;

2\. Painel compacto;

3\. Painel expandido;

4\. Orientação integrada à tela.

\## Botão flutuante

Uso:

\- acesso rápido;

\- indicação de estado;

\- abertura do painel.

\## Painel compacto

Uso:

\- pergunta curta;

\- sugestão contextual;

\- confirmação;

\- retomada.

\## Painel expandido

Uso:

\- conversa;

\- organização de intenção;

\- revisão de percurso;

\- busca;

\- configuração.

\## Orientação integrada

Uso:

\- instrução contextual;

\- próximo passo;

\- explicação de uma função;

\- mensagem dentro de um fluxo.

\-\--

\# 8. Máquina de estados

Estados obrigatórios:

1\. idle;

2\. listening;

3\. thinking;

4\. building;

5\. guiding;

6\. waiting;

7\. completed;

8\. offline;

9\. error;

10\. low stimulation.

Cada estado deverá possuir:

\- representação visual;

\- movimento;

\- texto acessível;

\- duração;

\- comportamento;

\- transição permitida.

\-\--

\# 9. Estado idle

Representa disponibilidade.

Características:

\- animação mínima;

\- movimento respiratório discreto;

\- ausência de pulsação intensa;

\- nenhuma mensagem repetitiva;

\- presença silenciosa.

Texto acessível:

"Assistente disponível."

O estado idle não deverá chamar atenção continuamente.

\-\--

\# 10. Estado listening

Representa escuta ativa por voz.

Características:

\- onda sonora suave;

\- indicação clara de gravação;

\- tempo decorrido;

\- botão pausar;

\- botão cancelar;

\- botão concluir;

\- aviso de uso do microfone.

Texto acessível:

"O Assistente está ouvindo."

Nunca iniciar a escuta automaticamente.

\-\--

\# 11. Estado thinking

Representa interpretação de uma solicitação.

Características:

\- movimento circular lento;

\- texto curto;

\- duração visível quando prolongada;

\- opção de cancelar quando possível.

Exemplos de texto:

\- "Organizando sua solicitação."

\- "Verificando as opções."

\- "Preparando uma resposta."

Evitar:

\- "Pensando profundamente."

\- "Analisando você."

\- "Avaliando seu comportamento."

\-\--

\# 12. Estado building

Representa construção de percurso, plano ou estrutura.

Características:

\- pequenos elementos se conectando;

\- progresso quando mensurável;

\- resumo da ação;

\- possibilidade de revisar depois.

Exemplos:

\- "Montando as etapas do percurso."

\- "Organizando as opções selecionadas."

\- "Preparando sua lista."

O Assistente não deverá alterar escolhas sem confirmação.

\-\--

\# 13. Estado guiding

Representa orientação durante uma atividade.

Características:

\- instrução atual;

\- próximo passo;

\- linguagem objetiva;

\- ação principal;

\- opção de repetir;

\- opção de reduzir detalhes.

Durante guiding, o Assistente deverá evitar mensagens paralelas.

\-\--

\# 14. Estado waiting

Representa espera por decisão ou resposta.

Características:

\- superfície estável;

\- ausência de movimento contínuo;

\- pergunta explícita;

\- opções claras;

\- possibilidade de responder depois.

Texto acessível:

"O Assistente aguarda sua escolha."

Nunca pressionar o usuário por resposta.

\-\--

\# 15. Estado completed

Representa conclusão de uma ação.

Características:

\- confirmação curta;

\- animação discreta;

\- resumo;

\- próximo passo opcional.

Exemplos:

\- "Percurso salvo."

\- "Endereço confirmado."

\- "Registro concluído."

O estado deverá retornar ao idle após a confirmação.

\-\--

\# 16. Estado offline

Representa indisponibilidade de conexão.

O Assistente deverá:

\- informar a limitação;

\- indicar recursos ainda disponíveis;

\- preservar mensagens;

\- permitir uso local quando possível;

\- sincronizar depois.

Exemplo:

\`\`\`text

Você está sem conexão.

Algumas funções continuam disponíveis, e seu progresso será preservado.

------------------------------------------------------------------------

**17. Estado error**

O Assistente deverá:

- explicar o que não funcionou;

- preservar o conteúdo;

- oferecer alternativa;

- permitir tentar novamente;

- evitar linguagem técnica desnecessária.

Exemplo:

Não consegui concluir esta busca.

Você pode tentar novamente ou continuar manualmente.

Nunca utilizar:

- "Erro do usuário."

- "Entrada inválida."

- "Falha porque você não informou corretamente."

------------------------------------------------------------------------

**18. Estado low stimulation**

Este estado deverá ser ativado quando o modo de baixa estimulação
estiver ativo.

Características:

- sem glow;

- sem pulsação;

- movimento mínimo;

- fundo sólido;

- mensagens curtas;

- ausência de som;

- menor quantidade de sugestões;

- uma ação por vez.

O Assistente deverá manter todas as funções essenciais.

------------------------------------------------------------------------

**19. Transições de estado**

Transições permitidas:

idle → listening

idle → thinking

idle → guiding

idle → offline

listening → thinking

listening → idle

listening → error

thinking → building

thinking → guiding

thinking → waiting

thinking → completed

thinking → error

building → waiting

building → completed

building → error

guiding → waiting

guiding → completed

guiding → error

waiting → thinking

waiting → guiding

waiting → idle

completed → idle

error → idle

offline → idle

Evitar transições visuais abruptas.

------------------------------------------------------------------------

**20. Painel compacto**

O painel compacto deverá conter:

- ícone do Assistente;

- mensagem curta;

- até três opções;

- botão expandir;

- botão fechar;

- descrição acessível.

Uso recomendado:

- confirmar;

- sugerir retomada;

- explicar uma função;

- mostrar uma alternativa;

- solicitar permissão.

Não utilizar para textos longos.

------------------------------------------------------------------------

**21. Painel expandido**

O painel expandido deverá permitir:

- conversa por texto;

- entrada por voz;

- anexos;

- busca;

- histórico recente;

- opções contextuais;

- fechamento;

- minimização.

Estrutura recomendada:

Cabeçalho

Estado atual

Histórico da interação

Campo de entrada

Ações complementares

Avisos de privacidade

O painel não deverá ocupar a tela inteira sem necessidade.

------------------------------------------------------------------------

**22. Campo de entrada**

O campo deverá aceitar:

- texto;

- voz;

- localização;

- imagem;

- fotografia;

- arquivo;

- seleção rápida.

Deverá possuir:

- placeholder;

- microfone;

- anexo;

- enviar;

- cancelar;

- estado de processamento;

- alternativa manual.

Exemplo de placeholder:

"Escreva o que você precisa organizar."

Evitar:

- "Como posso resolver sua vida hoje?"

- "Conte tudo para mim."

- "Desabafe comigo."

------------------------------------------------------------------------

**23. Início da interação**

O Assistente não deverá iniciar conversas frequentes sem solicitação.

Poderá iniciar apenas quando houver benefício contextual claro, como:

- percurso interrompido;

- erro que exige orientação;

- ação incompleta;

- mudança relevante na rota;

- solicitação de ajuda;

- ausência de próximo passo compreensível.

A intervenção deverá ser:

- discreta;

- dispensável;

- não repetitiva;

- fácil de fechar.

------------------------------------------------------------------------

**24. Sugestões contextuais**

O Assistente poderá sugerir:

- continuar uma atividade;

- revisar uma etapa;

- salvar uma estratégia;

- abrir conteúdo relacionado;

- corrigir um endereço;

- reduzir a quantidade de informações;

- escolher uma rota alternativa.

Toda sugestão deverá explicar sua relação com o contexto.

Exemplo:

Você informou que prefere percursos com menos trocas.

Quer ver uma rota com apenas um ônibus?

------------------------------------------------------------------------

**25. Personalização das sugestões**

As sugestões poderão considerar:

- preferências declaradas;

- escolhas anteriores;

- estratégias salvas;

- ritmo configurado;

- modo de navegação;

- conteúdo favoritado;

- contexto atual.

Não deverão utilizar inferências clínicas ou diagnósticas.

O usuário deverá poder:

- dispensar;

- corrigir;

- desativar;

- revisar a origem da sugestão.

------------------------------------------------------------------------

**26. Linguagem**

A linguagem deverá ser:

- simples;

- respeitosa;

- direta;

- não infantilizada;

- não clínica;

- não moralizante;

- não determinista;

- não invasiva.

Preferir:

- "Podemos organizar isso em etapas."

- "Você pode alterar esta escolha."

- "Esta opção foi sugerida com base no que você selecionou."

- "Seu progresso foi salvo."

Evitar:

- "Você deve fazer isso."

- "O melhor para você é..."

- "Detectei que você está ansioso."

- "Você está tendo dificuldade."

- "Não se preocupe."

- "Calma."

------------------------------------------------------------------------

**27. Tom de voz**

O tom deverá transmitir:

- tranquilidade;

- respeito;

- previsibilidade;

- disponibilidade;

- clareza.

Não deverá transmitir:

- entusiasmo excessivo;

- urgência artificial;

- autoridade clínica;

- intimidade presumida;

- humor constante;

- euforia;

- julgamento.

------------------------------------------------------------------------

**28. Tamanho das mensagens**

Mensagens curtas:

até 160 caracteres.

Mensagens intermediárias:

até 400 caracteres.

Mensagens longas:

deverão ser divididas em blocos expansíveis.

O Assistente deverá oferecer opções como:

- "Mostrar menos."

- "Ver detalhes."

- "Explicar de outra forma."

- "Ouvir."

------------------------------------------------------------------------

**29. Perguntas**

O Assistente deverá fazer uma pergunta por vez quando a resposta for
necessária.

Perguntas deverão:

- ser objetivas;

- explicar a finalidade;

- oferecer opções;

- permitir pular;

- aceitar resposta livre.

Evitar sequências extensas semelhantes a interrogatórios.

------------------------------------------------------------------------

**30. Confirmações**

Exigir confirmação para:

- compartilhar localização;

- compartilhar dados;

- excluir registros;

- enviar arquivos externos;

- alterar permissões;

- iniciar gravação;

- executar ação irreversível;

- abandonar conteúdo não salvo.

A confirmação deverá apresentar:

- ação;

- consequência;

- possibilidade de cancelar.

------------------------------------------------------------------------

**31. Voz**

O recurso de voz deverá ser opcional.

Deverá permitir:

- iniciar;

- pausar;

- retomar;

- cancelar;

- revisar transcrição;

- editar;

- confirmar envio.

Nunca ativar microfone automaticamente.

Nunca utilizar áudio sem indicação visual clara.

**32. Respostas por voz**

A leitura em voz alta deverá ser:

- opcional;

- controlável;

- pausável;

- interrompível;

- configurável em velocidade;

- sem reprodução automática por padrão.

O usuário deverá poder escolher:

- texto;

- áudio;

- texto e áudio;

- nenhuma resposta sonora.

------------------------------------------------------------------------

**33. Sons**

Sons permitidos:

- início de gravação;

- fim de gravação;

- confirmação;

- erro discreto.

Todos deverão poder ser desativados.

Evitar:

- alarmes;

- sons agudos;

- repetição;

- sons inesperados;

- música de fundo;

- efeitos emocionais.

------------------------------------------------------------------------

**34. Motion**

Animações permitidas:

- respiração suave;

- rotação lenta;

- expansão;

- contração;

- conexão de pontos;

- onda sonora;

- transição de estado.

Durações recomendadas:

- hover: 120 ms;

- abertura: 250 ms;

- fechamento: 200 ms;

- transição de estado: 300 ms;

- confirmação: 300 ms;

- respiração idle: 3000--5000 ms.

Evitar:

- bounce;

- tremor;

- salto;

- pulsação rápida;

- rotação contínua intensa;

- partículas excessivas.

------------------------------------------------------------------------

**35. Lottie**

As animações Lottie deverão:

- ser leves;

- utilizar formas abstratas;

- respeitar os tokens;

- possuir fallback estático;

- poder ser pausadas;

- respeitar prefers-reduced-motion;

- funcionar em temas claro e escuro.

Arquivos sugeridos:

assistant_idle.json

assistant_listening.json

assistant_thinking.json

assistant_building.json

assistant_guiding.json

assistant_waiting.json

assistant_completed.json

assistant_offline.json

assistant_error.json

assistant_low_stimulation.json

------------------------------------------------------------------------

**36. Movimento reduzido**

Quando prefers-reduced-motion estiver ativo:

- remover movimentos contínuos;

- substituir animações por transições de opacidade;

- reduzir duração;

- manter estados por ícone e texto;

- não perder feedback.

------------------------------------------------------------------------

**37. Acessibilidade**

O Assistente deverá possuir:

- nome acessível;

- descrição do estado;

- foco visível;

- navegação por teclado;

- ordem lógica;

- suporte por leitor de tela;

- aria-live para respostas;

- controles acessíveis;

- alternativa à voz;

- alternativa a animações;

- contraste adequado;

- área mínima de toque.

Mudanças de estado deverão ser anunciadas sem interromper excessivamente
o leitor de tela.

------------------------------------------------------------------------

**38. Comandos por teclado**

Recomendações:

- Enter: enviar;

- Shift + Enter: nova linha;

- Esc: fechar ou cancelar;

- Espaço: ativar botão;

- Tab: navegar;

- Ctrl ou Command + K: abrir o Assistente, quando configurado.

Nenhum atalho deverá substituir controles visíveis.

------------------------------------------------------------------------

**39. Privacidade**

Antes de coletar dados, o Assistente deverá informar:

- o que será coletado;

- para qual finalidade;

- onde será processado;

- se será armazenado;

- como excluir;

- se haverá serviço externo.

O Assistente não deverá:

- solicitar dados sensíveis sem finalidade;

- manter microfone ativo ocultamente;

- compartilhar informações automaticamente;

- inferir consentimento;

- expor conteúdo em notificações.

------------------------------------------------------------------------

**40. Histórico de interação**

O histórico deverá ser:

- opcional;

- visível ao usuário;

- editável;

- apagável;

- limitado à finalidade;

- protegido.

O usuário deverá poder:

- limpar uma conversa;

- apagar todas;

- desativar histórico;

- exportar, quando aplicável;

- controlar retenção.

------------------------------------------------------------------------

**41. Transparência**

Quando uma ação utilizar automação, o sistema deverá informar:

- que foi gerada automaticamente;

- quais dados foram utilizados;

- que o usuário pode revisar;

- que a sugestão pode estar incorreta.

Exemplo:

Esta organização foi gerada automaticamente a partir das informações
fornecidas.

Revise antes de continuar.

------------------------------------------------------------------------

**42. Limites funcionais**

O Assistente poderá:

- organizar;

- resumir;

- pesquisar;

- localizar;

- explicar;

- estruturar;

- registrar;

- lembrar;

- navegar;

- configurar;

- sugerir alternativas.

O Assistente não poderá:

- diagnosticar;

- avaliar estado mental;

- prescrever;

- recomendar medicação;

- substituir profissional;

- emitir prognóstico;

- interpretar sintomas clinicamente;

- classificar risco automaticamente;

- decidir pelo usuário;

- manipular emocionalmente;

- prometer resultados.

------------------------------------------------------------------------

**43. Situações de crise ou emergência**

O botão SOS e os fluxos de emergência deverão ser separados do
Assistente.

O Assistente poderá:

- mostrar recursos previamente configurados;

- facilitar contato com pessoa de confiança;

- apresentar opções de ajuda;

- orientar o usuário a procurar serviços adequados.

Não deverá simular atendimento emergencial.

Não deverá afirmar que está monitorando a segurança do usuário.

------------------------------------------------------------------------

**44. Integração com o botão SOS**

O Assistente poderá abrir o fluxo SOS somente após ação explícita.

Fluxo recomendado:

Usuário aciona SOS

↓

Sistema mostra opções configuradas

↓

Usuário escolhe a ação

↓

Sistema apresenta consequência

↓

Usuário confirma

Exemplos de ações:

- ligar para contato;

- compartilhar localização;

- abrir rota;

- mostrar cartão de informações;

- acessar orientação previamente salva.

------------------------------------------------------------------------

**45. Compartilhamento**

O Assistente poderá ajudar a configurar compartilhamento.

Deverá perguntar:

- com quem;

- o que;

- por quanto tempo;

- qual finalidade.

Antes de ativar, apresentar resumo completo.

Nunca iniciar compartilhamento apenas por comando ambíguo.

------------------------------------------------------------------------

**46. Integração com jornadas**

Em uma jornada, o Assistente poderá:

- explicar a etapa;

- mostrar próximo passo;

- abrir estratégia;

- ajudar a revisar;

- salvar pausa;

- retomar;

- registrar observação.

Ele não deverá alterar o percurso silenciosamente.

Toda mudança deverá ser visível e reversível.

------------------------------------------------------------------------

**47. Integração com mapas**

O Assistente poderá:

- buscar um local;

- preencher origem;

- preencher destino;

- explicar uma rota;

- oferecer alternativa;

- abrir lista textual;

- ajudar a corrigir um endereço.

Deverá solicitar confirmação antes de:

- utilizar localização;

- compartilhar localização;

- substituir destino;

- recalcular percurso.

------------------------------------------------------------------------

**48. Integração com a biblioteca**

O Assistente poderá:

- localizar conteúdo;

- sugerir material relacionado;

- adaptar quantidade de texto;

- oferecer áudio;

- relacionar conteúdo a uma jornada;

- salvar favorito.

As sugestões deverão ser contextuais e dispensáveis.

------------------------------------------------------------------------

**49. Integração com registros**

O Assistente poderá ajudar a registrar:

- texto;

- áudio;

- reflexão;

- dúvida;

- estratégia;

- observação.

Não deverá interpretar clinicamente o registro.

Não deverá avaliar a resposta como correta ou inadequada.

------------------------------------------------------------------------

**50. Personalização**

O usuário deverá poder configurar:

- tamanho do Assistente;

- posição;

- animação;

- som;

- voz;

- velocidade da fala;

- quantidade de sugestões;

- nível de detalhes;

- iniciativa;

- histórico;

- modo de baixa estimulação.

Níveis de iniciativa:

**Mínima**

O Assistente responde apenas quando acionado.

**Contextual**

O Assistente aparece em erros, retomadas e etapas relevantes.

**Ampliada**

O Assistente oferece sugestões frequentes, sempre dispensáveis.

O padrão recomendado deverá ser Contextual.

------------------------------------------------------------------------

**51. Ocultar e minimizar**

O usuário deverá poder:

- fechar o painel;

- minimizar;

- ocultar temporariamente;

- desativar sugestões;

- reposicionar, quando disponível.

Ocultar o Assistente não deverá impedir o uso do sistema.

------------------------------------------------------------------------

**52. Estado sem resposta**

Quando não compreender, o Assistente deverá:

- admitir a limitação;

- pedir esclarecimento breve;

- oferecer exemplos;

- permitir navegação manual.

Exemplo:

Não consegui identificar o que você deseja organizar.

Você pode escrever de outra forma ou escolher uma destas opções.

Nunca inventar uma intenção.

------------------------------------------------------------------------

**53. Prevenção de dependência**

O Assistente deverá:

- incentivar uso dos controles comuns;

- permitir autonomia sem mediação;

- não elogiar uso frequente;

- não criar sequências compulsivas;

- não exigir conversa para acessar funções;

- não enviar mensagens de saudade ou vínculo;

- não se apresentar como companhia emocional.

Evitar frases como:

- "Senti sua falta."

- "Estou sempre com você."

- "Você precisa de mim."

- "Só eu entendo seu percurso."

- "Não vá embora."

------------------------------------------------------------------------

**54. Notificações**

O Assistente não deverá enviar notificações em nome próprio.

As notificações deverão representar:

- jornada;

- atividade;

- lembrete;

- compartilhamento;

- sistema.

Exemplo adequado:

"Seu percurso para a consulta está pronto para revisão."

Evitar:

"O Assistente está esperando por você."

------------------------------------------------------------------------

**55. Estados visuais**

Todos os formatos deverão possuir:

- normal;

- hover;

- pressed;

- focused;

- disabled;

- loading;

- active;

- unread;

- offline;

- error;

- low stimulation.

Nenhum estado deverá depender apenas de cor.

------------------------------------------------------------------------

**56. Tokens**

Criar tokens específicos:

Assistant.Size.sm

Assistant.Size.md

Assistant.Size.lg

Assistant.Position.bottom

Assistant.Position.right

Assistant.SafeArea

Assistant.Background.default

Assistant.Background.expanded

Assistant.Background.lowStimulation

Assistant.Foreground

Assistant.Border

Assistant.FocusRing

Assistant.Shadow

Assistant.State.idle

Assistant.State.listening

Assistant.State.thinking

Assistant.State.building

Assistant.State.guiding

Assistant.State.waiting

Assistant.State.completed

Assistant.State.offline

Assistant.State.error

Assistant.Motion.fast

Assistant.Motion.normal

Assistant.Motion.slow

Assistant.Motion.idle

Assistant.Panel.compact.width

Assistant.Panel.expanded.width

Assistant.Panel.radius

Assistant.Panel.padding

Assistant.Message.user

Assistant.Message.system

Assistant.Message.suggestion

Assistant.Message.error

Assistant.Input.background

Assistant.Input.border

Assistant.Input.focus

Assistant.Voice.wave

Assistant.Voice.active

Assistant.Voice.paused

Assistant.LowStimulation.motion

Assistant.LowStimulation.shadow

Assistant.LowStimulation.opacity

Nenhum componente deverá utilizar valores locais fora dos tokens.

------------------------------------------------------------------------

**57. Componentes técnicos sugeridos**

Criar:

AssistantRoot

AssistantFloatingButton

AssistantIcon

AssistantStateIndicator

AssistantCompactPanel

AssistantExpandedPanel

AssistantHeader

AssistantBody

AssistantFooter

AssistantMessage

AssistantUserMessage

AssistantSystemMessage

AssistantSuggestion

AssistantConfirmation

AssistantErrorMessage

AssistantInput

AssistantVoiceInput

AssistantAttachmentButton

AssistantSendButton

AssistantStateIdle

AssistantStateListening

AssistantStateThinking

AssistantStateBuilding

AssistantStateGuiding

AssistantStateWaiting

AssistantStateCompleted

AssistantStateOffline

AssistantStateError

AssistantPrivacyNotice

AssistantConsentDialog

AssistantHistory

AssistantSettings

AssistantLowStimulationMode

------------------------------------------------------------------------

**58. Eventos técnicos**

Eventos recomendados:

assistant_opened

assistant_closed

assistant_minimized

assistant_message_sent

assistant_voice_started

assistant_voice_cancelled

assistant_voice_confirmed

assistant_suggestion_shown

assistant_suggestion_accepted

assistant_suggestion_dismissed

assistant_action_confirmed

assistant_action_cancelled

assistant_error

assistant_offline

assistant_history_cleared

assistant_settings_changed

Eventos não deverão registrar conteúdo sensível sem base legal,
necessidade e proteção adequadas.

------------------------------------------------------------------------

**59. Critérios de aceitação**

O Assistente será considerado implementado quando:

- possuir identidade abstrata e não humana;

- todos os estados estiverem disponíveis;

- não iniciar voz automaticamente;

- todas as ações sensíveis exigirem confirmação;

- o usuário puder navegar sem utilizá-lo;

- o painel puder ser fechado e minimizado;

- as sugestões puderem ser dispensadas;

- o modo de baixa estimulação estiver disponível;

- o movimento reduzido for respeitado;

- o Assistente funcionar por teclado;

- as mudanças de estado forem acessíveis;

- o histórico puder ser apagado;

- a linguagem não for clínica ou infantilizada;

- nenhum recurso diagnóstico estiver presente;

- o botão SOS permanecer separado;

- todos os componentes utilizarem tokens;

- nenhuma sugestão for apresentada como decisão definitiva.

------------------------------------------------------------------------

**60. Auditoria**

Antes da aprovação, verificar:

- identidade visual;

- antropomorfização;

- linguagem;

- frequência de intervenções;

- estados;

- voz;

- som;

- motion;

- consentimento;

- privacidade;

- histórico;

- acessibilidade;

- teclado;

- leitor de tela;

- baixa estimulação;

- movimento reduzido;

- limites clínicos;

- compartilhamento;

- integração com SOS;

- prevenção de dependência;

- consistência com Foundations.

Nenhuma implementação deverá ser aprovada quando o Assistente ocupar o
centro da experiência, substituir a decisão do usuário, simular relação
humana ou ultrapassar os limites éticos e funcionais definidos pelo
VIVA.

O próximo documento da sequência é \*\*27_MOTION_AND_LOTTIE.md ---
sistema de movimento, transições, microinterações, animações Lottie,
redução de movimento e critérios de desempenho.\*\*
