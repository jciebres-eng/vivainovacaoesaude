\# 25_MAPS_AND_GEOLOCATION.md

\# VIVA --- Sistema de Mapas, Geolocalização e Seleção de Lugares

Versão: 1.0

Status: Documento estruturante

Categoria: Design System --- Mapas, rotas e contexto espacial

\-\--

\# 1. Objetivo

Este documento define como o VIVA deverá utilizar mapas, endereços,
localização atual, rotas, marcadores, seleção de pontos e pesquisa de
lugares.

O sistema de geolocalização deverá ajudar o usuário a compreender:

\- onde está;

\- para onde vai;

\- como chegar;

\- quanto tempo levará;

\- quais etapas fazem parte do deslocamento;

\- quais alternativas estão disponíveis;

\- como alterar ou confirmar um local.

O mapa deverá funcionar como apoio à autonomia, e não como uma interface
complexa ou excessivamente técnica.

\-\--

\# 2. Princípios gerais

Toda experiência com mapas deverá ser:

\- previsível;

\- legível;

\- acessível;

\- responsiva;

\- orientada por tarefa;

\- compatível com toque;

\- acompanhada por alternativa textual;

\- adaptável ao modo de baixa estimulação.

Evitar:

\- excesso de marcadores;

\- mapas sem legenda;

\- rotas pouco distinguíveis;

\- mudanças automáticas de zoom;

\- animações bruscas;

\- localização obrigatória;

\- dependência exclusiva do mapa;

\- bloqueio do fluxo quando a permissão for recusada;

\- compartilhamento sem consentimento.

\-\--

\# 3. Provedores e integrações

A implementação poderá utilizar:

\- Google Maps JavaScript API;

\- Places API;

\- Geocoding API;

\- Geolocation API do navegador;

\- ViaCEP como apoio para CEP no Brasil;

\- serviço alternativo de mapas, quando necessário.

O sistema deverá abstrair o provedor utilizado.

Nenhum componente visual deverá depender diretamente de uma única API.

\-\--

\# 4. Componentes principais

O módulo deverá possuir:

1\. Mapa principal;

2\. Mini mapa;

3\. Campo de origem;

4\. Campo de destino;

5\. Campo de busca de lugares;

6\. Seletor de ponto no mapa;

7\. Marcador de localização atual;

8\. Marcador de origem;

9\. Marcador de destino;

10\. Marcador de etapa;

11\. Marcador de local salvo;

12\. Linha de rota;

13\. Rotas alternativas;

14\. Painel de informações;

15\. Bottom sheet de rota;

16\. Lista textual de etapas;

17\. Controle de zoom;

18\. Botão centralizar;

19\. Botão confirmar local;

20\. Estado offline e erro.

\-\--

\# 5. Campo de origem

O campo de origem deverá aceitar:

\- localização atual;

\- endereço;

\- CEP;

\- nome de estabelecimento;

\- ponto de referência;

\- local salvo;

\- seleção no mapa;

\- texto livre.

A origem interpretada deverá ser exibida antes da confirmação.

Exemplo:

\`\`\`text

Origem

Localização atual

Rua das Acácias, 210

Lucas do Rio Verde --- MT

------------------------------------------------------------------------

**6. Campo de destino**

O campo de destino deverá aceitar:

- endereço;

- nome de local;

- estabelecimento;

- CEP;

- bairro;

- cidade;

- ponto de referência;

- local salvo;

- seleção no mapa;

- texto livre.

O sistema deverá permitir alterar o destino sem apagar a origem.

------------------------------------------------------------------------

**7. Busca de lugares**

A busca deverá permitir localizar:

- clínicas;

- hospitais;

- universidades;

- mercados;

- restaurantes;

- pontos de ônibus;

- locais de trabalho;

- repartições públicas;

- farmácias;

- locais personalizados.

A busca deverá mostrar, quando disponível:

- nome;

- categoria;

- endereço;

- distância;

- horário;

- acessibilidade;

- avaliação;

- status aberto ou fechado.

Não utilizar avaliação pública como único critério de recomendação.

------------------------------------------------------------------------

**8. Autocomplete de lugares**

O autocomplete deverá:

- apresentar no máximo seis resultados;

- destacar o texto correspondente;

- mostrar nome e endereço;

- diferenciar cidades, endereços e estabelecimentos;

- funcionar por teclado;

- funcionar por toque;

- permitir fechar;

- não confirmar automaticamente.

Ao selecionar um resultado, abrir uma etapa de confirmação.

------------------------------------------------------------------------

**9. Seleção de ponto no mapa**

O padrão deverá ser semelhante a aplicativos de mobilidade.

Fluxo:

Abrir mapa

↓

Exibir marcador central fixo

↓

Usuário move o mapa

↓

Sistema atualiza o endereço

↓

Usuário revisa

↓

Usuário confirma

O marcador central deverá permanecer estável enquanto o mapa se move.

A confirmação deverá ocorrer somente após ação explícita.

------------------------------------------------------------------------

**10. Localização atual**

A localização atual deverá ser representada por marcador próprio.

Deverá apresentar:

- posição estimada;

- precisão;

- horário da última atualização;

- opção de atualizar;

- opção de não utilizar.

Estados:

- buscando;

- encontrada;

- imprecisa;

- indisponível;

- permissão negada;

- erro;

- offline.

Sempre oferecer entrada manual.

------------------------------------------------------------------------

**11. Permissão de localização**

Antes de solicitar permissão, explicar:

- por que é necessária;

- como será utilizada;

- se será armazenada;

- se poderá ser compartilhada;

- como continuar sem permitir.

Evitar solicitar a permissão imediatamente ao abrir a aplicação.

Solicitar somente quando houver contexto funcional.

**12. Marcadores**

Tipos obrigatórios:

- localização atual;

- origem;

- destino;

- etapa;

- local salvo;

- pessoa compartilhando;

- alerta;

- ponto de interesse.

Cada marcador deverá possuir:

- ícone;

- cor;

- rótulo;

- descrição acessível;

- estado selecionado;

- estado de foco.

Nunca diferenciar marcadores apenas por cor.

------------------------------------------------------------------------

**13. Marcador de origem**

Deverá representar claramente o início do percurso.

Características:

- ícone próprio;

- rótulo "Origem";

- endereço;

- opção de alterar;

- ligação visual com a rota.

------------------------------------------------------------------------

**14. Marcador de destino**

Deverá possuir maior destaque do que os pontos intermediários.

Características:

- ícone de destino;

- nome do lugar;

- endereço;

- ação para confirmar;

- ação para ver detalhes.

------------------------------------------------------------------------

**15. Marcadores intermediários**

Uso:

- pontos de ônibus;

- baldeações;

- entradas;

- locais de pausa;

- etapas do percurso;

- pontos de encontro.

Deverão ser numerados ou identificados em sequência.

------------------------------------------------------------------------

**16. Densidade de marcadores**

Para evitar sobrecarga:

- limitar marcadores simultâneos;

- agrupar pontos próximos;

- utilizar clustering;

- priorizar os mais relevantes;

- permitir ocultar categorias;

- reduzir detalhes em zoom distante.

No modo de baixa estimulação, mostrar apenas os marcadores essenciais.

------------------------------------------------------------------------

**17. Rotas**

A rota principal deverá apresentar:

- origem;

- destino;

- duração;

- distância;

- modalidade;

- quantidade de etapas;

- instruções;

- alternativa textual.

A linha deverá ser visualmente distinguível do mapa.

------------------------------------------------------------------------

**18. Rotas alternativas**

O sistema poderá apresentar rotas alternativas com critérios
transparentes.

Exemplos:

- mais rápida;

- menos trocas;

- menor distância;

- menos caminhada;

- mais previsível;

- acessível;

- rota conhecida.

Nunca utilizar apenas "melhor rota" sem explicar o critério.

------------------------------------------------------------------------

**19. Modalidades de deslocamento**

O sistema deverá suportar:

- caminhada;

- bicicleta;

- carro;

- ônibus;

- transporte por aplicativo;

- combinação de modalidades;

- percurso personalizado.

Cada modalidade deverá possuir ícone e descrição.

------------------------------------------------------------------------

**20. Etapas do percurso**

As etapas deverão ser exibidas no mapa e em lista textual.

Exemplo:

1\. Caminhar 250 metros até o ponto

2\. Aguardar a linha 202

3\. Descer após 6 paradas

4\. Caminhar 120 metros até a entrada

Cada etapa poderá conter:

- distância;

- duração;

- instrução;

- imagem;

- ponto de referência;

- aviso;

- estratégia associada.

------------------------------------------------------------------------

**21. Lista textual de rota**

Toda rota deverá possuir equivalente textual completo.

A lista deverá permitir:

- expandir;

- recolher;

- selecionar etapa;

- ouvir por voz;

- copiar;

- compartilhar;

- imprimir, quando aplicável.

O usuário não deverá depender da interpretação visual do mapa.

------------------------------------------------------------------------

**22. Painel de rota**

O painel deverá apresentar:

- origem;

- destino;

- tempo total;

- distância;

- modalidade;

- quantidade de etapas;

- rota escolhida;

- ação principal.

Ação principal:

- confirmar percurso;

- iniciar preparação;

- iniciar rota.

------------------------------------------------------------------------

**23. Bottom sheet sobre o mapa**

No mobile, utilizar bottom sheet para mostrar:

- resultados;

- detalhes do local;

- rotas;

- etapas;

- ações;

- filtros.

Estados:

- recolhido;

- intermediário;

- expandido.

Deverá ser possível fechar, arrastar e navegar por teclado.

------------------------------------------------------------------------

**24. Controles do mapa**

Controles mínimos:

- zoom in;

- zoom out;

- centralizar;

- localização atual;

- alternar camadas, quando necessário;

- abrir lista textual;

- selecionar no mapa;

- confirmar.

Evitar controles excessivos.

------------------------------------------------------------------------

**25. Zoom**

O mapa deverá evitar mudanças abruptas.

Regras:

- centralizar com transição suave;

- preservar contexto;

- não alterar zoom sem ação ou necessidade clara;

- permitir redefinir;

- evitar animação longa.

No modo de movimento reduzido, utilizar transição instantânea ou mínima.

------------------------------------------------------------------------

**26. Orientação**

O sistema poderá oferecer:

- norte fixo;

- orientação pela direção do usuário;

- visão geral;

- acompanhamento do percurso.

A orientação automática deverá ser opcional.

------------------------------------------------------------------------

**27. Pontos de referência**

As instruções poderão utilizar:

- nomes de edifícios;

- fachadas;

- entradas;

- placas;

- cruzamentos;

- locais conhecidos;

- imagens confirmadas.

Evitar depender apenas de termos cartográficos.

Exemplo:

Entre pela porta ao lado da farmácia.

------------------------------------------------------------------------

**28. Imagens do local**

O sistema poderá apresentar:

- fachada;

- entrada;

- recepção;

- ponto de ônibus;

- área de embarque;

- ambiente interno autorizado.

As imagens deverão:

- ter origem identificada;

- possuir texto alternativo;

- respeitar direitos de uso;

- não expor pessoas indevidamente;

- ser opcionais.

------------------------------------------------------------------------

**29. Busca por fotografia**

O usuário poderá:

- tirar uma foto;

- escolher imagem da galeria;

- revisar;

- confirmar o envio;

- pesquisar referências visuais semelhantes.

A busca visual deverá ser apresentada como recurso auxiliar.

O sistema não deverá afirmar identificação exata quando houver
incerteza.

**30. Pesquisa externa por imagem**

Quando a integração interna não estiver disponível, o sistema poderá:

- preparar a pesquisa;

- solicitar confirmação;

- abrir serviço externo;

- informar que o processamento ocorrerá fora do VIVA.

Nunca enviar uma fotografia para serviço externo sem confirmação
explícita.

------------------------------------------------------------------------

**31. Endereço interpretado**

Após mover o mapa ou usar geocodificação, apresentar:

- endereço completo;

- coordenada aproximada;

- nome do local, quando disponível;

- grau de precisão;

- opção de corrigir.

Exemplo:

Este ponto corresponde aproximadamente a:

Avenida Brasil, 540

Centro

Lucas do Rio Verde --- MT

------------------------------------------------------------------------

**32. Endereço incompleto**

Quando o endereço não puder ser confirmado:

- explicar a limitação;

- preservar o texto;

- permitir mover o mapa;

- pedir ponto de referência;

- permitir continuar com localização aproximada, quando apropriado.

------------------------------------------------------------------------

**33. Locais salvos**

O usuário deverá poder salvar:

- casa;

- trabalho;

- universidade;

- clínica;

- mercado;

- local personalizado.

Os rótulos deverão ser editáveis.

Nunca pressupor automaticamente o significado de um endereço.

------------------------------------------------------------------------

**34. Favoritos**

Locais favoritos deverão permitir:

- abrir;

- editar;

- remover;

- reordenar;

- relacionar a jornadas;

- definir como origem ou destino.

------------------------------------------------------------------------

**35. Compartilhamento de localização**

O compartilhamento deverá ser:

- opcional;

- temporário;

- revogável;

- limitado ao percurso;

- transparente;

- baseado em consentimento.

Antes de iniciar, o usuário deverá revisar:

- com quem;

- por quanto tempo;

- qual informação;

- finalidade;

- como encerrar.

------------------------------------------------------------------------

**36. Indicador de compartilhamento**

Quando ativo, mostrar indicador persistente e discreto.

Exemplo:

Localização compartilhada com Ana

Restam 35 minutos

\[Encerrar\]

Nunca ocultar o compartilhamento ativo.

------------------------------------------------------------------------

**37. Atualização em tempo real**

Quando habilitada, a atualização deverá:

- informar frequência;

- reduzir consumo de bateria;

- permitir pausar;

- preservar privacidade;

- encerrar automaticamente ao fim do percurso.

------------------------------------------------------------------------

**38. Privacidade**

Dados de localização deverão respeitar:

- minimização;

- finalidade;

- consentimento;

- prazo de retenção;

- segurança;

- revogação;

- acesso do usuário;

- exclusão.

Não armazenar histórico de localização sem necessidade funcional clara.

**39. Modo de execução**

Durante o percurso, exibir apenas:

- posição atual;

- etapa atual;

- próximo passo;

- distância;

- tempo;

- rota;

- ajuda;

- compartilhar;

- estratégia rápida.

Ocultar elementos não relacionados.

------------------------------------------------------------------------

**40. Desvio de rota**

Quando houver desvio:

- não utilizar linguagem alarmista;

- informar de forma discreta;

- recalcular quando autorizado;

- preservar destino;

- permitir retornar à rota anterior;

- mostrar alternativa textual.

Exemplo:

Você saiu do trajeto previsto.

Podemos atualizar a rota a partir daqui.

------------------------------------------------------------------------

**41. Recalcular rota**

Antes de alterar significativamente o percurso, o sistema deverá:

- informar a mudança;

- mostrar novo tempo;

- mostrar novas etapas;

- permitir aceitar ou manter a rota anterior.

------------------------------------------------------------------------

**42. Alertas contextuais**

Alertas poderão informar:

- atraso;

- mudança de linha;

- rota indisponível;

- local fechado;

- localização imprecisa;

- interrupção de internet;

- alteração relevante.

Evitar notificações excessivas.

------------------------------------------------------------------------

**43. Estado offline**

Quando offline:

- manter mapa em cache, quando disponível;

- preservar rota;

- exibir lista textual;

- manter etapas;

- informar limitações;

- sincronizar depois.

A ausência de internet não deverá apagar o percurso.

------------------------------------------------------------------------

**44. Estado de erro**

Exemplos:

- mapa indisponível;

- endereço não encontrado;

- rota não calculada;

- localização negada;

- falha de integração.

Toda mensagem deverá:

- explicar o ocorrido;

- preservar os dados;

- oferecer alternativa;

- permitir tentar novamente.

------------------------------------------------------------------------

**45. Modo de baixa estimulação**

Neste modo:

- reduzir cores do mapa;

- ocultar pontos secundários;

- reduzir animações;

- remover inclinação 3D;

- evitar rotação automática;

- reduzir glow;

- utilizar apenas uma rota principal;

- destacar a etapa atual;

- manter fundo estável.

------------------------------------------------------------------------

**46. Alto contraste**

No alto contraste:

- linhas de rota mais espessas;

- marcadores com formas distintas;

- bordas reforçadas;

- textos com fundo sólido;

- controles claramente delimitados;

- nenhum estado apenas por cor.

------------------------------------------------------------------------

**47. Acessibilidade**

Todo sistema de mapas deverá possuir:

- alternativa textual;

- navegação por teclado;

- descrição dos marcadores;

- foco visível;

- ordem lógica;

- labels nos controles;

- suporte por leitor de tela;

- zoom sem perda de funcionalidade;

- área de toque mínima;

- anúncio de mudança de rota;

- alternativa a arrastar e pinçar.

------------------------------------------------------------------------

**48. Responsividade**

**Mobile**

- mapa em tela ampla;

- bottom sheet;

- controles próximos ao polegar;

- uma ação principal;

- lista textual expansível.

**Tablet**

- mapa e painel lado a lado;

- maior área para etapas.

**Desktop**

- mapa central;

- painel lateral;

- lista textual persistente;

- suporte completo por teclado.

------------------------------------------------------------------------

**49. Performance**

O sistema deverá:

- carregar progressivamente;

- evitar renderizar marcadores desnecessários;

- agrupar pontos;

- utilizar cache;

- reduzir atualizações em segundo plano;

- respeitar bateria e dados móveis;

- oferecer fallback textual.

------------------------------------------------------------------------

**50. Tokens**

Criar tokens específicos:

Map.Background

Map.Surface

Map.Text

Map.Border

Map.Overlay

Map.Route.primary

Map.Route.alternative

Map.Route.walking

Map.Route.transit

Map.Route.driving

Map.Marker.current

Map.Marker.origin

Map.Marker.destination

Map.Marker.step

Map.Marker.saved

Map.Marker.shared

Map.Marker.alert

Map.Marker.size.sm

Map.Marker.size.md

Map.Marker.size.lg

Map.Control.background

Map.Control.foreground

Map.Control.focus

Map.Control.shadow

Map.BottomSheet.background

Map.BottomSheet.handle

Map.BottomSheet.overlay

Map.Zoom.transition

Map.Center.transition

Map.Route.transition

Map.LowStimulation.background

Map.LowStimulation.route

Map.LowStimulation.marker

Nenhum componente deverá utilizar valores locais fora dos tokens.

------------------------------------------------------------------------

**51. Componentes técnicos sugeridos**

Criar:

MapShell

InteractiveMap

MiniMap

MapFallback

OriginField

DestinationField

PlaceSearchField

PlaceAutocomplete

MapPointPicker

CurrentLocationMarker

OriginMarker

DestinationMarker

StepMarker

SavedPlaceMarker

SharedLocationMarker

RouteLine

AlternativeRouteLine

RouteSummary

RouteSteps

RouteStepItem

RouteModeSelector

MapControls

LocateMeButton

RecenterButton

ZoomControls

MapLayerButton

MapBottomSheet

PlaceDetailsSheet

RouteOptionsSheet

LocationPermissionDialog

SavedPlaces

FavoritePlaceCard

SharedLocationIndicator

MapLoadingState

MapErrorState

MapOfflineState

TextualRouteFallback

------------------------------------------------------------------------

**52. Critérios de aceitação**

O módulo será considerado implementado quando:

- origem e destino aceitarem texto, endereço e mapa;

- a localização atual possuir alternativa manual;

- todo mapa possuir versão textual;

- todos os marcadores possuírem descrição;

- as rotas alternativas explicarem seus critérios;

- a seleção no mapa exigir confirmação;

- o usuário puder alterar origem e destino;

- o compartilhamento for temporário e revogável;

- o estado offline preservar o percurso;

- o modo de baixa estimulação estiver disponível;

- o alto contraste estiver disponível;

- nenhuma função essencial depender apenas de gesto;

- todos os componentes utilizarem tokens;

- a privacidade da localização estiver explicitada;

- o mapa funcionar em mobile e desktop.

------------------------------------------------------------------------

**53. Auditoria**

Antes da aprovação, verificar:

- precisão;

- clareza da origem;

- clareza do destino;

- marcadores;

- contraste das rotas;

- lista textual;

- permissões;

- compartilhamento;

- retenção de localização;

- acessibilidade;

- teclado;

- leitor de tela;

- modo offline;

- baixa estimulação;

- responsividade;

- performance;

- consistência com Foundations;

- consistência com Navegação e Jornada.

Nenhuma experiência de mapa deverá ser aprovada quando o usuário puder
perder o contexto, confirmar um ponto incorreto sem revisão ou depender
exclusivamente da representação visual.

O próximo documento da sequência é:

\*\*26_ASSISTANT_DESIGN_SYSTEM.md --- identidade, botão flutuante,
estados, voz, personalidade, presença, comportamento e limites do
Assistente Digital.\*\*
