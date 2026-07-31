\# 24_NAVIGATION_AND_JOURNEY.md

\# VIVA --- Sistema de Navegação, Jornada e Continuidade

Versão: 1.0

Status: Documento estruturante

Categoria: Design System --- Navegação e arquitetura de percurso

\-\--

\# 1. Objetivo

Este documento define como o usuário navega pelo VIVA, inicia uma
intenção, constrói um percurso, acompanha etapas, retorna a atividades
anteriores e retoma experiências interrompidas.

A navegação deverá priorizar:

\- orientação;

\- previsibilidade;

\- continuidade;

\- autonomia;

\- baixa carga cognitiva;

\- recuperação fácil;

\- clareza sobre o próximo passo.

O usuário nunca deverá sentir que "se perdeu" dentro da plataforma.

\-\--

\# 2. Princípios gerais

Toda navegação deverá responder claramente:

1\. Onde estou?

2\. O que estou fazendo?

3\. O que já foi concluído?

4\. O que vem depois?

5\. Como volto?

6\. Como interrompo?

7\. Como retomo mais tarde?

Evitar:

\- menus excessivos;

\- caminhos duplicados;

\- rotas sem saída;

\- mudanças bruscas de contexto;

\- abas com funções semelhantes;

\- navegação escondida;

\- perda de progresso;

\- retorno imprevisível;

\- breadcrumbs muito longos;

\- excesso de decisões simultâneas.

\-\--

\# 3. Arquitetura principal

A navegação principal deverá conter no máximo cinco áreas persistentes:

1\. Início;

2\. Percursos;

3\. Biblioteca;

4\. Evolução;

5\. Perfil.

O Assistente Digital deverá permanecer disponível por botão flutuante,
sem ocupar uma aba principal.

\-\--

\# 4. Navegação mobile

Em dispositivos móveis, utilizar Bottom Navigation.

Itens:

\- Início;

\- Percursos;

\- Biblioteca;

\- Evolução;

\- Perfil.

Regras:

\- máximo de cinco itens;

\- ícone e texto;

\- item ativo claramente identificado;

\- área de toque mínima de 48 × 48 px;

\- respeito à safe area;

\- sem esconder funções essenciais em menus adicionais.

O botão flutuante do Assistente deverá ficar acima da barra inferior,
sem sobrepor conteúdo relevante.

\-\--

\# 5. Navegação desktop

Em desktop, utilizar navegação lateral ou superior conforme o contexto.

Preferência:

\- menu lateral compacto;

\- ícones com rótulos;

\- área central de conteúdo;

\- painel contextual opcional;

\- Assistente flutuante no canto inferior direito.

A navegação deverá preservar a mesma lógica do mobile.

\-\--

\# 6. Tela inicial

A Home não deverá funcionar como dashboard tradicional.

Deverá priorizar:

\- campo de intenção;

\- ação atual;

\- próximo passo;

\- continuidade da última atividade;

\- atalhos visuais;

\- acesso discreto à biblioteca;

\- Assistente Digital.

Evitar:

\- gráficos grandes;

\- excesso de métricas;

\- muitos cards simultâneos;

\- menus extensos;

\- informações sem ação clara.

\-\--

\# 7. Campo central de intenção

O campo de intenção deverá ser o ponto principal de entrada.

Deverá aceitar:

\- texto;

\- voz;

\- imagem;

\- fotografia;

\- anexo;

\- localização;

\- endereço;

\- situação cotidiana.

Após o envio, o sistema deverá organizar a intenção em um percurso
compreensível.

Nunca exigir que o usuário escolha previamente um módulo técnico.

\-\--

\# 8. Jornada principal

Fluxo estrutural:

\`\`\`text

Intenção

↓

Compreensão do contexto

↓

Seleção de opções

↓

Construção do percurso

↓

Preparação

↓

Simulação opcional

↓

Execução

↓

Registro

↓

Evolução

↓

Reutilização

Cada etapa deverá possuir começo, meio e encerramento claros.

------------------------------------------------------------------------

**9. Estrutura de uma jornada**

Toda jornada deverá poder conter:

- título;

- intenção;

- contexto;

- origem;

- destino ou objetivo;

- etapas;

- estratégias;

- conteúdos;

- simulação;

- preparação;

- execução;

- registro;

- conclusão;

- histórico;

- possibilidade de reutilização.

Nem todas as jornadas precisarão utilizar todos os elementos.

------------------------------------------------------------------------

**10. Status da jornada**

Estados obrigatórios:

- rascunho;

- em construção;

- pronta para iniciar;

- em preparação;

- em andamento;

- pausada;

- concluída;

- cancelada;

- arquivada.

Cada status deverá possuir:

- rótulo;

- ícone;

- descrição acessível;

- ação disponível;

- comportamento de retomada.

------------------------------------------------------------------------

**11. Timeline**

A timeline deverá representar a sequência do percurso.

Poderá ser:

- vertical;

- horizontal;

- compacta;

- expandida;

- visual;

- textual.

Cada etapa deverá mostrar:

- nome;

- estado;

- duração estimada;

- dependência;

- ação;

- indicador de conclusão.

Estados da etapa:

- não iniciada;

- disponível;

- atual;

- concluída;

- pausada;

- bloqueada;

- ignorada;

- com atenção;

- com erro.

Nunca comunicar esses estados apenas por cor.

------------------------------------------------------------------------

**12. Etapa atual**

A etapa atual deverá ser visualmente dominante.

Deverá apresentar:

- título;

- instrução principal;

- tempo estimado;

- recurso necessário;

- ação principal;

- opção de ajuda;

- opção de pausar;

- opção de voltar.

Durante a execução, ocultar informações não essenciais.

------------------------------------------------------------------------

**13. Próximo passo**

O próximo passo deverá ser explícito.

Exemplos:

- confirmar endereço;

- escolher trajeto;

- revisar documentos;

- iniciar simulação;

- sair de casa;

- registrar como foi.

Nunca apresentar múltiplos próximos passos concorrentes.

------------------------------------------------------------------------

**14. Progresso**

O progresso poderá ser representado por:

- etapas concluídas;

- barra de progresso;

- checklist;

- texto;

- percentual, quando real.

Exemplos:

Etapa 2 de 5

Preparação concluída

Faltam 2 passos

Evitar percentuais quando o processo for qualitativo ou variável.

------------------------------------------------------------------------

**15. Navegação entre etapas**

O usuário deverá poder:

- avançar;

- voltar;

- revisar;

- pausar;

- pular, quando permitido;

- retomar;

- encerrar;

- salvar como rascunho.

A navegação não deverá apagar informações automaticamente.

------------------------------------------------------------------------

**16. Voltar**

O comando Voltar deverá ser previsível.

Regras:

- voltar para o estado anterior;

- preservar dados;

- não reiniciar o fluxo;

- não levar para a Home sem aviso;

- confirmar apenas quando houver risco real de perda.

Evitar múltiplos comportamentos para o mesmo ícone.

------------------------------------------------------------------------

**17. Pausar**

Toda jornada longa deverá permitir pausa.

Ao pausar, o sistema deverá:

- salvar o estado;

- registrar a etapa atual;

- guardar respostas;

- indicar como retomar;

- permitir escolher lembrete opcional;

- informar que o percurso não foi perdido.

------------------------------------------------------------------------

**18. Retomada**

Ao retornar, o sistema deverá apresentar:

- nome da jornada;

- última etapa;

- data;

- progresso;

- próximo passo;

- ação "Continuar de onde parei".

Evitar reiniciar automaticamente.

------------------------------------------------------------------------

**19. Continuidade na Home**

A Home deverá apresentar no máximo uma continuidade principal.

Exemplo:

Continuar de onde você parou

Preparação para consulta

Etapa 3 de 5

\[Continuar\]

Atividades adicionais deverão aparecer em área secundária.

------------------------------------------------------------------------

**20. Histórico de navegação**

O sistema deverá preservar:

- jornadas recentes;

- pesquisas recentes;

- locais utilizados;

- conteúdos acessados;

- estratégias salvas;

- percursos concluídos.

O usuário deverá poder:

- apagar;

- ocultar;

- arquivar;

- reutilizar;

- duplicar.

------------------------------------------------------------------------

**21. Breadcrumb**

Utilizar breadcrumbs apenas quando houver profundidade real.

Exemplo:

Percursos \> Consulta \> Preparação

Evitar em mobile quando ocupar espaço excessivo.

Em mobile, preferir:

- título da etapa;

- botão voltar;

- indicação de progresso.

------------------------------------------------------------------------

**22. Tabs**

Tabs deverão ser utilizadas apenas para conteúdos paralelos do mesmo
nível.

Exemplos:

- Visão geral;

- Etapas;

- Estratégias;

- Registros.

Não utilizar tabs para representar sequência obrigatória.

Para sequência, utilizar timeline ou stepper.

------------------------------------------------------------------------

**23. Stepper**

Utilizar stepper para fluxos lineares.

Exemplos:

- criar percurso;

- cadastrar endereço;

- preparar atividade;

- configurar compartilhamento.

Cada etapa deverá:

- possuir título;

- indicar progresso;

- permitir voltar;

- salvar automaticamente;

- apresentar apenas as informações necessárias.

------------------------------------------------------------------------

**24. Menus**

Tipos permitidos:

- menu principal;

- menu contextual;

- bottom sheet;

- menu de perfil;

- menu de ações adicionais.

Evitar menus com mais de sete opções visíveis.

Ações destrutivas deverão ser separadas das demais.

------------------------------------------------------------------------

**25. Bottom Sheet**

Utilizar para:

- filtros;

- escolhas rápidas;

- mapa;

- transporte;

- seleção de estratégia;

- compartilhamento;

- ações contextuais.

Deverá permitir:

- arrastar;

- fechar;

- expandir;

- recolher;

- navegação por teclado;

- leitura por leitor de tela.

Nunca impedir acesso à ação de fechar.

------------------------------------------------------------------------

**26. Modais**

Utilizar apenas quando a decisão exigir atenção.

Exemplos:

- confirmar exclusão;

- encerrar compartilhamento;

- sair com alterações;

- cancelar percurso.

Evitar:

- modais informativos desnecessários;

- modais encadeados;

- múltiplas decisões;

- texto extenso.

------------------------------------------------------------------------

**27. Navegação por mapa**

No contexto de mapas, a interface deverá oferecer:

- origem;

- destino;

- localização atual;

- rota;

- etapas;

- alternativas;

- retorno à visão geral;

- ação para confirmar.

O mapa deverá sempre possuir alternativa textual.

------------------------------------------------------------------------

**28. Navegação por gesto**

Gestos permitidos:

- swipe;

- arrastar;

- pinçar;

- tocar;

- pressionar;

- deslizar bottom sheet.

Todo gesto deverá possuir alternativa por:

- botão;

- teclado;

- leitor de tela;

- voz;

- Switch Control.

Nenhuma função essencial deverá depender apenas de gesto.

------------------------------------------------------------------------

**29. Navegação por voz**

Comandos possíveis:

- voltar;

- continuar;

- pausar;

- repetir;

- abrir detalhes;

- mostrar mapa;

- iniciar percurso;

- encerrar percurso.

O sistema deverá confirmar comandos com impacto relevante.

------------------------------------------------------------------------

**30. Navegação pelo Assistente**

O Assistente poderá:

- orientar;

- explicar a etapa;

- localizar uma função;

- retomar percurso;

- abrir conteúdo;

- sugerir próximo passo;

- reduzir complexidade visual.

O Assistente não deverá:

- substituir controles;

- executar ações sensíveis sem confirmação;

- impor decisões;

- bloquear a navegação comum.

------------------------------------------------------------------------

**31. Estado de erro de navegação**

Quando uma rota falhar, o sistema deverá:

- preservar o contexto;

- explicar o problema;

- oferecer retorno;

- permitir tentar novamente;

- apresentar caminho alternativo;

- evitar página vazia.

Exemplo:

Não foi possível abrir esta etapa.

Seu progresso foi mantido.

\[Tentar novamente\] \[Voltar ao percurso\]

------------------------------------------------------------------------

**32. Estado offline**

Quando offline, o sistema deverá:

- informar claramente;

- preservar dados locais;

- indicar funções disponíveis;

- permitir continuar quando possível;

- sincronizar depois;

- não apagar progresso.

------------------------------------------------------------------------

**33. Rotas protegidas**

Conteúdos sensíveis deverão exigir:

- autenticação;

- permissão;

- vínculo válido;

- consentimento;

- escopo adequado.

Ao negar acesso, explicar o motivo sem expor dados.

------------------------------------------------------------------------

**34. Compartilhamento na jornada**

O compartilhamento deverá permitir:

- escolher pessoa;

- escolher duração;

- escolher dados;

- revisar permissões;

- iniciar;

- pausar;

- revogar.

Durante o compartilhamento, mostrar indicador persistente e discreto.

**35. Navegação em modo de execução**

Durante uma atividade em andamento, a interface deverá ser simplificada.

Mostrar apenas:

- etapa atual;

- próximo passo;

- mapa, quando necessário;

- tempo;

- estratégia;

- compartilhar;

- ajuda;

- registro rápido.

Ocultar:

- menus amplos;

- métricas;

- histórico;

- conteúdos não relacionados;

- distrações visuais.

------------------------------------------------------------------------

**36. Navegação em modo de baixa estimulação**

Nesse modo:

- uma ação principal por tela;

- menos abas;

- menos animações;

- menos informações simultâneas;

- transições estáveis;

- fundos sólidos;

- timeline simplificada;

- ausência de parallax;

- sem autoexpansão;

- sem autoplay.

A estrutura funcional deverá permanecer igual.

------------------------------------------------------------------------

**37. Personalização da navegação**

O sistema deverá adaptar:

- quantidade de opções;

- densidade;

- tamanho dos elementos;

- profundidade dos menus;

- quantidade de texto;

- ritmo;

- animação;

- visibilidade de ajuda.

Perfis:

**Simplificado**

- uma ação principal;

- poucas opções;

- sequência linear;

- textos curtos.

**Visual**

- mais ícones;

- imagens maiores;

- timeline ilustrada;

- menos texto.

**Detalhado**

- mais contexto;

- mais metadados;

- múltiplas visualizações;

- controles avançados.

**Baixa estimulação**

- poucos elementos;

- menos movimento;

- superfícies sólidas;

- navegação sequencial.

------------------------------------------------------------------------

**38. Responsividade**

**Mobile**

- Bottom Navigation;

- uma coluna;

- título curto;

- botão voltar;

- ação principal fixa quando necessário;

- bottom sheets.

**Tablet**

- menu lateral opcional;

- timeline expandida;

- duas áreas de conteúdo quando útil.

**Desktop**

- navegação lateral;

- conteúdo central;

- painel contextual;

- teclado completo;

- largura limitada.

------------------------------------------------------------------------

**39. Acessibilidade**

Toda navegação deverá oferecer:

- landmarks semânticos;

- ordem lógica de foco;

- skip links;

- rótulos claros;

- suporte por teclado;

- foco visível;

- leitura do estado atual;

- anúncio de mudança de etapa;

- alternativa a gestos;

- alternativa ao mapa;

- descrição de progresso.

Mudanças importantes deverão ser anunciadas por região aria-live
apropriada.

------------------------------------------------------------------------

**40. Teclado**

Comandos recomendados:

- Tab: avançar foco;

- Shift + Tab: voltar foco;

- Enter: ativar;

- Espaço: selecionar;

- Esc: fechar;

- Setas: navegar em menus, tabs e steppers;

- Home: primeiro item;

- End: último item.

Nunca criar armadilhas de foco.

------------------------------------------------------------------------

**41. Motion**

Transições permitidas:

- fade;

- slide;

- expand;

- collapse;

- morph suave;

- progress update.

Duração:

- troca de tela: 250 ms;

- troca de etapa: 300 ms;

- abrir bottom sheet: 250 ms;

- fechar modal: 200 ms;

- retomada: 350 ms.

Nunca utilizar animações que atrasem a ação.

------------------------------------------------------------------------

**42. Tokens**

Criar tokens específicos:

Navigation.Background

Navigation.Foreground

Navigation.Active

Navigation.Inactive

Navigation.Hover

Navigation.Focus

Navigation.Border

BottomNav.Height

BottomNav.SafeArea

BottomNav.ItemGap

BottomNav.ActiveIndicator

Sidebar.Width.compact

Sidebar.Width.expanded

Journey.Progress

Journey.Step.default

Journey.Step.current

Journey.Step.complete

Journey.Step.paused

Journey.Step.blocked

Journey.Step.error

Timeline.Line

Timeline.Dot

Timeline.Label

Timeline.Duration

Stepper.Active

Stepper.Complete

Stepper.Pending

Breadcrumb.Text

Breadcrumb.Separator

BottomSheet.Background

BottomSheet.Handle

BottomSheet.Overlay

Modal.Background

Modal.Overlay

Navigation.Motion.fast

Navigation.Motion.normal

Navigation.Motion.slow

Nenhum elemento de navegação deverá utilizar valores locais fora dos
tokens.

------------------------------------------------------------------------

**43. Componentes técnicos sugeridos**

Criar:

AppNavigation

BottomNavigation

SideNavigation

TopNavigation

NavigationItem

AssistantFloatingAction

JourneyShell

JourneyHeader

JourneyTimeline

JourneyStepper

JourneyProgress

JourneyStep

CurrentStepPanel

NextStepPanel

ResumeJourneyCard

Breadcrumbs

Tabs

TabList

TabPanel

ContextMenu

ProfileMenu

BottomSheet

Modal

Dialog

ConfirmDialog

BackButton

PauseJourneyButton

ResumeJourneyButton

FinishJourneyButton

OfflineNavigationState

NavigationErrorState

ProtectedRoute

SkipLink

**44. Critérios de aceitação**

O sistema será considerado implementado quando:

- a navegação principal possuir no máximo cinco áreas;

- o Assistente permanecer fora da barra principal;

- o usuário sempre souber onde está;

- toda jornada possuir status e progresso;

- o retorno preservar dados;

- a pausa salvar o estado;

- a retomada ocorrer do ponto anterior;

- nenhum gesto for obrigatório;

- o mapa possuir alternativa textual;

- a navegação funcionar por teclado;

- o modo offline preservar progresso;

- o modo de baixa estimulação funcionar;

- os componentes utilizarem apenas tokens;

- não existirem percursos duplicados;

- não existirem rotas sem saída;

- toda ação destrutiva exigir confirmação adequada.

------------------------------------------------------------------------

**45. Auditoria**

Antes da aprovação, verificar:

- clareza da localização;

- consistência do botão voltar;

- continuidade;

- retomada;

- progresso;

- quantidade de menus;

- duplicidade de rotas;

- ordem de foco;

- funcionamento por teclado;

- alternativa a gestos;

- alternativa ao mapa;

- modo offline;

- responsividade;

- baixa estimulação;

- alto contraste;

- privacidade;

- compartilhamento;

- consistência com Foundations.

Nenhuma jornada deverá ser aprovada quando o usuário puder perder o
contexto, os dados ou a noção do próximo passo.

O próximo documento é:

\*\*25_MAPS_AND_GEOLOCATION.md --- Sistema de mapas, endereços, origem,
destino, localização atual, marcadores, rotas, busca visual e seleção de
ponto no mapa.\*\*
