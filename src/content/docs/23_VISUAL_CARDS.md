\# 23_VISUAL_CARDS.md

\# VIVA --- Sistema de Cards e Composição Visual

Versão: 1.0

Status: Documento estruturante

Categoria: Design System --- Cards e superfícies de informação

\-\--

\# 1. Objetivo

Este documento define o sistema de cards do VIVA.

Os cards são os principais elementos de organização visual da
plataforma.

Eles deverão transformar informações complexas em unidades simples,
previsíveis, acessíveis e acionáveis.

Cada card deverá responder claramente a quatro perguntas:

1\. O que é isto?

2\. Por que isso importa?

3\. O que posso fazer?

4\. O que acontece depois?

\-\--

\# 2. Princípios gerais

Todo card deverá ser:

\- visualmente identificável;

\- fácil de compreender;

\- coerente com sua função;

\- compatível com toque;

\- acessível;

\- responsivo;

\- reutilizável;

\- adaptável ao perfil do usuário;

\- compatível com modo de baixa estimulação.

Evitar:

\- excesso de texto;

\- múltiplas ações concorrentes;

\- informações sem hierarquia;

\- cards muito semelhantes para funções diferentes;

\- imagens decorativas sem função;

\- ícones ambíguos;

\- animações contínuas;

\- excesso de brilho;

\- densidade elevada.

\-\--

\# 3. Estrutura-base

Todo card poderá conter:

\- categoria;

\- ícone;

\- imagem;

\- título;

\- descrição curta;

\- contexto;

\- estado;

\- progresso;

\- tempo estimado;

\- ação principal;

\- ação secundária;

\- menu contextual;

\- indicador de salvamento;

\- descrição acessível.

Estrutura recomendada:

\`\`\`text

\[Categoria ou estado\]

\[Imagem ou ícone\]

Título

Descrição curta

Informação contextual

\[Ação principal\] \[Ação secundária\]

Nem todos os elementos deverão aparecer simultaneamente.

------------------------------------------------------------------------

**4. Hierarquia interna**

A ordem visual deverá priorizar:

1.  finalidade;

2.  título;

3.  imagem ou ícone;

4.  contexto;

5.  ação principal;

6.  informações complementares.

Nunca permitir que metadados tenham mais destaque do que a ação
principal.

------------------------------------------------------------------------

**5. Anatomia técnica**

Cada card deverá possuir áreas semanticamente separadas:

Card.Root

Card.Header

Card.Media

Card.Content

Card.Meta

Card.Progress

Card.Actions

Card.Footer

A estrutura deverá permitir reorganização conforme o tamanho da tela.

------------------------------------------------------------------------

**6. Dimensões**

Largura mínima:

280 px

Largura máxima recomendada:

480 px em layouts individuais.

Altura:

variável conforme o conteúdo.

Padding interno:

16 px ou 24 px.

Espaçamento interno:

8 px, 12 px ou 16 px.

Raio recomendado:

16 px.

Área mínima de toque para ações:

48 × 48 px.

------------------------------------------------------------------------

**7. Densidade**

Criar três níveis:

**Compacta**

Uso:

- listas;

- histórico;

- resultados de pesquisa;

- seleção rápida.

Características:

- pouco texto;

- ícone menor;

- metadados reduzidos;

- uma ação principal.

**Padrão**

Uso:

- jornadas;

- biblioteca;

- estratégias;

- atividades.

Características:

- título;

- descrição;

- imagem opcional;

- ações principais.

**Expandida**

Uso:

- preparação;

- execução;

- simulação;

- detalhes.

Características:

- mídia;

- contexto;

- progresso;

- ações;

- informações complementares.

------------------------------------------------------------------------

**8. Tipos obrigatórios**

O sistema deverá possuir pelo menos:

1.  Card Jornada;

2.  Card Swipe;

3.  Card Biblioteca;

4.  Card Estratégia;

5.  Card Próximo Passo;

6.  Card Local;

7.  Card Transporte;

8.  Card Mapa;

9.  Card Simulação;

10. Card Preparação;

11. Card Execução;

12. Card Histórico;

13. Card Reflexão;

14. Card Insight;

15. Card Conquista;

16. Card Favorito;

17. Card Pessoa;

18. Card Profissional;

19. Card Conteúdo;

20. Card Estado Atual.

------------------------------------------------------------------------

**9. Card Jornada**

Uso:

representar um percurso completo.

Deverá apresentar:

- título;

- origem;

- destino ou objetivo;

- quantidade de etapas;

- tempo estimado;

- status;

- progresso;

- ação principal;

- última atualização.

Estados:

- não iniciado;

- em preparação;

- em andamento;

- pausado;

- concluído;

- arquivado.

Ação principal:

- iniciar;

- continuar;

- retomar;

- revisar.

------------------------------------------------------------------------

**10. Card Swipe**

Uso:

montagem visual do percurso.

Deverá conter:

- imagem predominante;

- título curto;

- explicação mínima;

- categoria;

- contexto;

- gesto disponível;

- ação de detalhes.

Gestos:

- direita: aceitar;

- esquerda: descartar;

- cima: ver detalhes;

- baixo: voltar.

O card deverá exibir discretamente os gestos disponíveis.

Nunca depender exclusivamente do gesto.

Também deverá haver botões acessíveis equivalentes.

------------------------------------------------------------------------

**11. Card Biblioteca**

Uso:

apresentar conteúdo contextual.

Deverá mostrar:

- formato;

- título;

- duração;

- nível de detalhe;

- tema;

- imagem;

- ação principal;

- salvar;

- marcar como útil;

- relacionar a uma atividade.

Formatos:

- texto;

- vídeo;

- áudio;

- checklist;

- PDF;

- história visual;

- simulação;

- conteúdo 360°;

- demonstração de realidade virtual.

------------------------------------------------------------------------

**12. Card Estratégia**

Uso:

representar uma estratégia prática.

Deverá apresentar:

- título;

- situação de uso;

- duração;

- intensidade;

- passos;

- possibilidade de favoritar;

- possibilidade de adicionar ao plano.

Exemplos:

- usar fones;

- preparar rota alternativa;

- solicitar pausa;

- chegar com antecedência;

- registrar uma dúvida;

- reduzir estímulos.

A linguagem deverá ser prática e não prescritiva.

**13. Card Próximo Passo**

Componente proprietário do VIVA.

Deverá apresentar:

- o que fazer agora;

- por que esta etapa aparece;

- tempo estimado;

- contexto;

- estado;

- ação principal.

Exemplo:

Próximo passo

Confirmar o endereço da consulta

Leva cerca de 2 minutos

\[Continuar\]

O componente deverá aparecer apenas quando houver uma ação clara e
relevante.

------------------------------------------------------------------------

**14. Card Local**

Uso:

representar um lugar.

Deverá conter:

- nome;

- categoria;

- endereço;

- distância;

- horário;

- acessibilidade;

- imagem;

- mapa;

- ação para traçar rota;

- ação para salvar.

Exemplos:

- clínica;

- universidade;

- mercado;

- ponto de ônibus;

- restaurante;

- repartição;

- local de trabalho.

------------------------------------------------------------------------

**15. Card Transporte**

Uso:

representar uma opção de deslocamento.

Deverá apresentar:

- modalidade;

- tempo;

- custo estimado;

- quantidade de etapas;

- esforço estimado;

- lotação prevista, quando disponível;

- acessibilidade;

- rota alternativa.

Modalidades:

- caminhada;

- ônibus;

- carro;

- transporte por aplicativo;

- bicicleta;

- combinação de trajetos.

Nunca classificar automaticamente uma opção como melhor sem explicitar o
critério.

------------------------------------------------------------------------

**16. Card Mapa**

Uso:

resumir uma localização ou percurso.

Deverá conter:

- miniatura do mapa;

- origem;

- destino;

- distância;

- tempo;

- rota;

- localização atual;

- ação para expandir.

O mapa não deverá competir visualmente com as informações essenciais.

------------------------------------------------------------------------

**17. Card Simulação**

Uso:

iniciar uma preparação simulada.

Deverá apresentar:

- situação;

- objetivo;

- duração;

- formato;

- nível de intensidade;

- conteúdo necessário;

- opção de baixa estimulação;

- ação para começar.

Exemplos:

- primeira reunião presencial;

- consulta;

- entrevista;

- uso de transporte público;

- compra em supermercado.

------------------------------------------------------------------------

**18. Card Preparação**

Uso:

organizar o que precisa ser feito antes de uma atividade.

Deverá conter:

- checklist;

- materiais;

- documentos;

- horário;

- rota;

- estratégias;

- contatos;

- estado de conclusão.

A ação principal deverá ser:

- continuar preparação;

- revisar;

- concluir.

------------------------------------------------------------------------

**19. Card Execução**

Uso:

acompanhar uma atividade em andamento.

Deverá apresentar:

- etapa atual;

- tempo;

- localização;

- próximo passo;

- estratégias disponíveis;

- compartilhamento;

- suporte;

- registro rápido.

Deverá ter baixa densidade visual.

Durante a execução, mostrar apenas o que é necessário naquele momento.

------------------------------------------------------------------------

**20. Card Histórico**

Uso:

recuperar atividades anteriores.

Deverá conter:

- data;

- título;

- situação;

- resultado;

- registro;

- opção de repetir;

- opção de editar;

- opção de arquivar.

A ação "repetir percurso" deverá gerar uma cópia editável.

------------------------------------------------------------------------

**21. Card Reflexão**

Uso:

registrar experiência após uma atividade.

Deverá permitir:

- texto;

- áudio;

- seleção visual;

- escala simples;

- anexos;

- salvar como rascunho.

Perguntas possíveis:

- Como foi?

- O que ajudou?

- O que dificultou?

- O que você mudaria?

- O que gostaria de lembrar?

Nunca obrigar o usuário a refletir.

------------------------------------------------------------------------

**22. Card Insight**

Uso:

apresentar padrões observados a partir dos registros do usuário.

Deverá:

- utilizar linguagem não diagnóstica;

- explicar a origem da informação;

- permitir dispensar;

- permitir salvar;

- permitir corrigir.

Exemplo:

Você costuma avaliar melhor os percursos quando sai com antecedência.

Baseado em 4 registros.

Evitar:

- conclusões clínicas;

- classificações;

- linguagem determinista;

- afirmações sem contexto.

------------------------------------------------------------------------

**23. Card Conquista**

Uso:

reconhecer continuidade ou aprendizagem.

Deverá comunicar:

- o que foi realizado;

- quando;

- relação com a autonomia;

- possibilidade de ocultar;

- ausência de competição.

Evitar:

- rankings;

- pressão;

- contadores compulsivos;

- comparação com outras pessoas;

- punição por interrupção.

------------------------------------------------------------------------

**24. Card Favorito**

Uso:

acesso rápido a:

- jornadas;

- locais;

- estratégias;

- conteúdos;

- contatos;

- rotas.

Deverá permitir:

- reordenar;

- remover;

- agrupar;

- acessar rapidamente.

------------------------------------------------------------------------

**25. Card Pessoa**

Uso:

representar pessoa de confiança, familiar ou contato.

Deverá conter:

- nome;

- vínculo;

- foto opcional;

- canais de contato;

- permissões;

- compartilhamento ativo;

- ação para revogar acesso.

Nunca exibir informações pessoais além do necessário.

------------------------------------------------------------------------

**26. Card Profissional**

Uso:

representar um profissional relacionado ao percurso.

Deverá conter:

- nome;

- função;

- local;

- contato;

- orientações registradas;

- permissões;

- vínculo com atividades.

O card não deverá simular avaliação ou aconselhamento profissional
automatizado.

------------------------------------------------------------------------

**27. Card Conteúdo**

Uso:

apresentar material educacional ou informativo.

Deverá permitir:

- abrir;

- salvar;

- comentar;

- marcar como útil;

- adicionar ao plano;

- relacionar a uma experiência;

- compartilhar quando autorizado.

**28. Card Estado Atual**

Uso:

registrar como o usuário deseja começar.

Pode apresentar:

- energia;

- disponibilidade;

- necessidade de apoio;

- tempo disponível;

- preferência de ritmo.

A resposta deverá ser opcional.

Nunca interpretar o estado como avaliação clínica.

------------------------------------------------------------------------

**29. Estados obrigatórios**

Todos os cards deverão possuir:

- normal;

- hover;

- focused;

- selected;

- pressed;

- loading;

- empty;

- disabled;

- success;

- warning;

- error;

- offline;

- archived.

Cada estado deverá possuir:

- representação visual;

- ícone;

- texto;

- descrição acessível.

Nunca comunicar estado somente por cor.

------------------------------------------------------------------------

**30. Estado loading**

Usar skeleton proporcional ao conteúdo.

Evitar:

- spinners centrais prolongados;

- mudanças bruscas de layout;

- bloqueio da interface inteira.

O skeleton deverá respeitar o modo de baixa estimulação.

------------------------------------------------------------------------

**31. Estado vazio**

O estado vazio deverá explicar:

- o que falta;

- por que está vazio;

- qual ação pode ser realizada.

Exemplo:

Você ainda não salvou nenhuma estratégia.

As estratégias que você marcar aparecerão aqui.

------------------------------------------------------------------------

**32. Estado erro**

O card deverá:

- preservar o conteúdo disponível;

- explicar o problema;

- oferecer tentativa novamente;

- disponibilizar alternativa;

- evitar culpabilização.

------------------------------------------------------------------------

**33. Ações**

Cada card deverá ter:

- no máximo uma ação principal;

- no máximo duas ações secundárias visíveis;

- ações adicionais no menu contextual.

Evitar mais de três comandos simultâneos.

------------------------------------------------------------------------

**34. Menu contextual**

O menu poderá conter:

- editar;

- duplicar;

- salvar;

- arquivar;

- remover;

- compartilhar;

- denunciar problema;

- ver detalhes.

Ações destrutivas deverão ser separadas visualmente.

------------------------------------------------------------------------

**35. Imagens**

Imagens deverão:

- ter função informativa;

- possuir texto alternativo;

- respeitar proporção;

- evitar recorte inadequado;

- carregar progressivamente;

- possuir fallback.

Proporções recomendadas:

- 16:9 para vídeo e paisagem;

- 4:3 para contexto;

- 1:1 para pessoa ou categoria;

- 3:4 para card swipe.

**36. Ícones**

Utilizar ícones para:

- categoria;

- ação;

- estado;

- progresso;

- acessibilidade.

Ícones não deverão substituir texto em ações ambíguas.

------------------------------------------------------------------------

**37. Progresso**

O progresso poderá ser mostrado por:

- etapas;

- barra;

- percentual;

- checklist;

- texto.

Evitar mostrar percentual quando ele não representar progresso real.

------------------------------------------------------------------------

**38. Personalização**

Os cards deverão adaptar:

- densidade;

- tamanho;

- quantidade de texto;

- presença de imagem;

- número de ações;

- animações;

- brilho;

- espaçamento.

Perfis possíveis:

**Visual**

- imagens maiores;

- títulos curtos;

- menos metadados;

- ícones mais evidentes.

**Detalhado**

- mais contexto;

- mais dados;

- maior quantidade de metadados;

- explicações expandidas.

**Baixa estimulação**

- menos brilho;

- menos movimento;

- menos cores;

- um card principal por vez;

- superfícies estáveis.

**Passos reduzidos**

- uma ação por card;

- textos curtos;

- progressão sequencial;

- sem informações paralelas.

------------------------------------------------------------------------

**39. Responsividade**

Mobile:

- uma coluna;

- cards em largura total;

- ações próximas ao polegar;

- conteúdo progressivo.

Tablet:

- uma ou duas colunas;

- permitir expansão.

Desktop:

- duas ou três colunas;

- limitar largura;

- preservar hierarquia;

- evitar cards excessivamente largos.

------------------------------------------------------------------------

**40. Movimento**

Movimentos permitidos:

- fade;

- elevação;

- expansão;

- recolhimento;

- deslize;

- reorganização;

- swipe.

Duração:

- hover: 120 ms;

- press: 80 ms;

- expand: 250 ms;

- dismiss: 200 ms;

- swipe: 250--350 ms;

- success: 300 ms.

Nunca utilizar bounce exagerado.

------------------------------------------------------------------------

**41. Swipe acessível**

O gesto de swipe deverá possuir alternativas por:

- botões;

- teclado;

- leitor de tela;

- controle por voz;

- Switch Control.

Comandos equivalentes:

- aceitar;

- descartar;

- detalhes;

- voltar.

------------------------------------------------------------------------

**42. Modo de baixa estimulação**

Neste modo:

- reduzir glow;

- remover parallax;

- remover flutuação;

- diminuir sombras;

- reduzir número de cards simultâneos;

- evitar autoplay;

- manter superfícies estáveis;

- reduzir imagens decorativas.

As funções deverão permanecer disponíveis.

------------------------------------------------------------------------

**43. Alto contraste**

No modo alto contraste:

- bordas reforçadas;

- textos mais contrastantes;

- estados acompanhados por ícones;

- ausência de transparências excessivas;

- focus ring ampliado;

- ações claramente delimitadas.

------------------------------------------------------------------------

**44. Acessibilidade**

Todo card deverá possuir:

- semântica de grupo;

- título programático;

- descrição acessível;

- ordem lógica de foco;

- ações identificadas;

- suporte por teclado;

- suporte por leitor de tela;

- texto alternativo;

- contraste adequado;

- área mínima de toque.

Cards clicáveis deverão ser claramente reconhecidos como interativos.

------------------------------------------------------------------------

**45. Tokens**

Criar tokens específicos:

Card.Background.default

Card.Background.hover

Card.Background.selected

Card.Background.disabled

Card.Border.default

Card.Border.hover

Card.Border.focus

Card.Border.selected

Card.Border.error

Card.Radius

Card.Padding.compact

Card.Padding.standard

Card.Padding.expanded

Card.Gap.xs

Card.Gap.sm

Card.Gap.md

Card.Gap.lg

Card.Shadow.default

Card.Shadow.hover

Card.Shadow.floating

Card.Title

Card.Description

Card.Meta

Card.Label

Card.MediaRadius

Card.ImageOverlay

Card.Skeleton

Card.Progress.default

Card.Progress.complete

Card.Action.primary

Card.Action.secondary

Card.Swipe.accept

Card.Swipe.reject

Card.Swipe.details

Card.Swipe.return

Nenhum card deverá utilizar valores locais fora dos tokens.

------------------------------------------------------------------------

**46. Componentes técnicos sugeridos**

Criar:

BaseCard

JourneyCard

SwipeCard

LibraryCard

StrategyCard

NextStepCard

LocationCard

TransportCard

MapCard

SimulationCard

PreparationCard

ExecutionCard

HistoryCard

ReflectionCard

InsightCard

AchievementCard

FavoriteCard

PersonCard

ProfessionalCard

ContentCard

CurrentStateCard

CardHeader

CardMedia

CardContent

CardMeta

CardActions

CardProgress

CardSkeleton

CardEmptyState

CardErrorState

------------------------------------------------------------------------

**47. Critérios de aceitação**

O sistema será considerado implementado quando:

- todos os cards utilizarem os tokens definidos;

- cada tipo possuir finalidade clara;

- nenhum card apresentar mais de uma ação principal;

- os cards funcionarem por toque e teclado;

- o swipe possuir alternativas acessíveis;

- todos os estados estiverem implementados;

- o modo de baixa estimulação estiver disponível;

- o alto contraste estiver disponível;

- o conteúdo não depender apenas de imagens;

- os cards forem responsivos;

- os dados sensíveis forem exibidos apenas quando necessários;

- o card Insight utilizar linguagem não diagnóstica;

- o card Conquista não utilizar comparação ou pressão;

- os cards reutilizarem a mesma estrutura-base.

------------------------------------------------------------------------

**48. Auditoria**

Antes da aprovação, verificar:

- finalidade;

- hierarquia;

- quantidade de texto;

- número de ações;

- legibilidade;

- contraste;

- foco;

- estados;

- imagem;

- ícones;

- acessibilidade;

- personalização;

- responsividade;

- baixa estimulação;

- alto contraste;

- linguagem;

- privacidade;

- consistência com Foundations.

Nenhum card deverá ser aprovado quando exigir interpretação excessiva do
usuário.

O próximo documento da sequência é:

\*\*24_NAVIGATION_AND_JOURNEY.md --- Sistema de navegação, timeline,
etapas, progresso, abas, retorno e continuidade do percurso.\*\*
