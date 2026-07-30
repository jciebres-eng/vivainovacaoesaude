\# VIVA

\## Sistema Operacional Humano para o Desenvolvimento Funcional

Versão 1.0

\-\--

\# Documento 10

\## Regras de Personalização Demonstrativa

\-\--

\# 1. Finalidade

Este documento define o motor inicial de personalização do protótipo
demonstrativo do VIVA.

Na primeira versão, a personalização não dependerá de inteligência
artificial real.

Ela será produzida por regras condicionais:

\- simples;

\- transparentes;

\- rastreáveis;

\- editáveis;

\- previsíveis;

\- compreensíveis para o usuário;

\- coerentes com os princípios éticos da solução.

O motor utilizará informações fornecidas pelo próprio usuário para
reorganizar:

\- alternativas;

\- habilidades;

\- estratégias;

\- conteúdos da biblioteca;

\- formas de apoio;

\- recursos de preparação;

\- simulações opcionais;

\- próximos passos.

\-\--

\# 2. Objetivo do motor de regras

O motor deverá demonstrar que o VIVA não apresenta o mesmo percurso para
todas as pessoas.

A personalização será produzida a partir da combinação entre:

\`\`\`text

Objetivo

\+

Contexto

\+

Barreiras

\+

Facilitadores

\+

Recursos

\+

Preferências

\+

Capacidades existentes

\+

Necessidades de apoio

\+

Experiências anteriores

=

Percurso personalizado

\`\`\`

O motor não deverá decidir pela pessoa.

Sua função será:

\- apresentar opções relevantes;

\- reduzir opções incompatíveis;

\- organizar alternativas;

\- explicar por que uma sugestão apareceu;

\- permitir aceitação;

\- permitir rejeição;

\- permitir adaptação;

\- permitir criação de estratégia própria.

\-\--

\# 3. Princípios do motor de personalização

O motor deverá respeitar os seguintes princípios:

1\. o usuário mantém o controle do percurso;

2\. nenhuma regra produz diagnóstico;

3\. nenhuma regra determina tratamento;

4\. nenhuma regra modifica medicamento;

5\. nenhuma estratégia será obrigatória;

6\. toda sugestão poderá ser rejeitada;

7\. toda sugestão poderá ser adaptada;

8\. o contexto modifica as opções;

9\. barreiras ambientais deverão ser consideradas;

10\. apoio não será interpretado como perda de autonomia;

11\. estratégias reguladoras não serão eliminadas automaticamente;

12\. condições econômicas deverão modificar alternativas;

13\. preferências comunicacionais deverão ser respeitadas;

14\. o sistema deverá explicar a origem das sugestões;

15\. regras não deverão classificar sucesso ou fracasso;

16\. registros anteriores poderão alterar sugestões futuras;

17\. o usuário poderá desativar sugestões personalizadas;

18\. o motor não deverá inferir informações não fornecidas.

\-\--

\# 4. Funcionamento geral

O motor será composto por regras no formato:

\`\`\`text

SE

uma condição for selecionada

ENTÃO

apresentar, priorizar, adaptar ou ocultar determinadas opções.

\`\`\`

Exemplo:

\`\`\`text

SE

o usuário selecionar sensibilidade ao ruído

ENTÃO

apresentar:

\- horário menos movimentado;

\- controle de áudio;

\- protetor auditivo;

\- possibilidade de pausa;

\- atividade sem som;

\- ambiente alternativo.

\`\`\`

\-\--

\# 5. Tipos de ação do motor

Cada regra poderá executar uma ou mais ações.

\## 5.1 Apresentar

Adicionar uma opção ao percurso.

Exemplo:

\> Apresentar mensagem escrita para pedido de ajuda.

\## 5.2 Priorizar

Mover uma opção para o início da lista.

Exemplo:

\> Priorizar transporte público quando o orçamento for restrito.

\## 5.3 Adaptar

Modificar a forma de apresentação ou execução.

Exemplo:

\> Transformar instrução oral em instrução escrita.

\## 5.4 Ocultar temporariamente

Retirar opções incompatíveis ou já rejeitadas.

Exemplo:

\> Ocultar vídeos com som quando o usuário escolher experiência sem
áudio.

\## 5.5 Alertar

Mostrar uma informação contextual, sem emitir julgamento clínico.

Exemplo:

\> O custo desta alternativa ultrapassa o valor informado.

\## 5.6 Solicitar confirmação

Perguntar ao usuário antes de seguir.

Exemplo:

\> Esta opção utiliza som. Deseja continuar?

\## 5.7 Sugerir plano alternativo

Apresentar uma segunda opção.

Exemplo:

\> Salvar uma rota substituta para alterações no trajeto.

\## 5.8 Relacionar conteúdo

Apresentar material da biblioteca relacionado à escolha.

Exemplo:

\> Como pedir ajuda por mensagem.

\## 5.9 Relacionar habilidade

Apresentar uma habilidade que poderá ser escolhida.

Exemplo:

\> Preparar-se para mudanças e imprevistos.

\-\--

\# 6. Dados utilizados pelo motor

O motor poderá utilizar apenas informações registradas nos instrumentos
do usuário.

\## Instrumento 1 --- Meu objetivo

\- objetivo;

\- importância;

\- prazo desejado;

\- capacidades existentes;

\- apoio disponível.

\## Instrumento 2 --- Meu contexto

\- território;

\- transporte;

\- orçamento;

\- internet;

\- rede de apoio;

\- horários;

\- acessibilidade;

\- ambiente;

\- recursos disponíveis;

\- recursos indisponíveis.

\## Instrumento 3 --- Barreiras e facilitadores

\- sensoriais;

\- comunicacionais;

\- executivas;

\- sociais;

\- econômicas;

\- ambientais;

\- territoriais;

\- físicas;

\- alimentares;

\- tecnológicas;

\- relacionadas à saúde;

\- relacionadas ao apoio.

\## Instrumento 4 --- Escolha de estratégias

\- estratégias aceitas;

\- estratégias rejeitadas;

\- estratégias adaptadas;

\- estratégias próprias.

\## Instrumento 7 --- Registro posterior

\- o que ajudou;

\- o que dificultou;

\- apoio utilizado;

\- estratégias úteis;

\- estratégias não úteis;

\- mudanças inesperadas;

\- próximo passo.

\-\--

\# 7. Transparência das sugestões

Toda recomendação deverá apresentar a opção:

\> Por que esta sugestão apareceu?

Ao selecionar essa opção, o sistema deverá mostrar uma explicação
simples.

Exemplo:

\`\`\`text

Esta sugestão apareceu porque você informou:

\- sensibilidade ao ruído;

\- preferência por ambientes menos movimentados;

\- uso de transporte público.

Você pode utilizar, adaptar ou rejeitar esta opção.

\`\`\`

O sistema não deverá apresentar justificativas como:

\- "A inteligência artificial concluiu";

\- "Seu perfil indica";

\- "Pessoas como você precisam";

\- "Este é o melhor tratamento";

\- "Esta estratégia é obrigatória".

\-\--

\# 8. Ordem de prioridade das regras

Quando várias regras forem ativadas, o sistema deverá priorizar:

1\. segurança;

2\. escolhas expressas do usuário;

3\. acessibilidade;

4\. estratégias já reconhecidas como úteis;

5\. condições econômicas;

6\. condições sensoriais;

7\. preferências comunicacionais;

8\. disponibilidade de apoio;

9\. tempo e território;

10\. sugestões gerais.

Uma escolha explícita do usuário deverá ter prioridade sobre uma
sugestão automática.

\-\--

\# 9. Regra de não repetição

Quando o usuário marcar uma estratégia como:

\> Não funciona para mim

o sistema deverá:

\- registrar a rejeição;

\- retirar a estratégia das sugestões prioritárias;

\- não reapresentá-la repetidamente;

\- permitir que o usuário a recupere manualmente;

\- manter o motivo da rejeição, quando informado.

Exemplo:

\`\`\`text

SE

a estratégia "pedir informação oralmente" foi rejeitada

ENTÃO

não priorizar novamente essa estratégia

E

apresentar alternativas:

\- mensagem escrita;

\- cartão digital;

\- apoio remoto;

\- pergunta preparada.

\`\`\`

\-\--

\# 10. Regra de adaptação

Quando o usuário selecionar:

\> Quero adaptar

o sistema deverá perguntar:

\- o que deseja mudar;

\- horário;

\- duração;

\- local;

\- forma de comunicação;

\- apoio;

\- intensidade;

\- recurso sensorial;

\- número de etapas;

\- alternativa desejada.

A estratégia adaptada deverá tornar-se uma nova versão vinculada à
estratégia original.

\-\--

\# 11. Regras sensoriais

\-\--

\## REGRA 01 --- Sensibilidade ao ruído

\`\`\`text

SE

o usuário selecionar sensibilidade ao ruído

ENTÃO apresentar:

\- horário menos movimentado;

\- ambiente com menor ruído;

\- controle de áudio;

\- experiência sem som;

\- protetor auditivo;

\- fones;

\- possibilidade de pausa;

\- local alternativo;

\- aviso prévio sobre presença de som.

\`\`\`

Habilidades relacionadas:

\- reconhecer sobrecarga;

\- escolher estratégia sensorial;

\- comunicar necessidade;

\- planejar pausa.

Conteúdos relacionados:

\- Como preparar uma atividade com menos estímulos;

\- Como escolher um horário menos movimentado;

\- Como planejar uma pausa.

\-\--

\## REGRA 02 --- Sensibilidade à iluminação

\`\`\`text

SE

o usuário selecionar sensibilidade à iluminação

ENTÃO apresentar:

\- modo de baixo estímulo;

\- modo escuro;

\- redução de brilho;

\- ambiente com iluminação indireta;

\- possibilidade de escolher local;

\- recurso visual sem animação;

\- opção de pausa.

\`\`\`

Ocultar ou desativar:

\- animações automáticas;

\- transições intensas;

\- telas piscantes;

\- contrastes excessivamente agressivos.

\-\--

\## REGRA 03 --- Sensibilidade a cheiros

\`\`\`text

SE

o usuário selecionar sensibilidade a cheiros

ENTÃO apresentar:

\- locais com menor exposição;

\- horários menos movimentados;

\- produtos sem fragrância;

\- alimentos separados;

\- preparo em ambiente ventilado;

\- possibilidade de interromper;

\- alternativa de local.

\`\`\`

\-\--

\## REGRA 04 --- Sensibilidade a texturas

\`\`\`text

SE

o usuário selecionar sensibilidade a texturas

ENTÃO apresentar:

\- registro de texturas toleradas;

\- alimentos separados;

\- substituições com textura semelhante;

\- pequenas quantidades;

\- formas alternativas de preparo;

\- opção de recusar experimentação;

\- dúvida para nutricionista.

\`\`\`

\-\--

\## REGRA 05 --- Sensibilidade à temperatura

\`\`\`text

SE

o usuário selecionar sensibilidade à temperatura

ENTÃO apresentar:

\- escolha de horário;

\- roupa adequada;

\- bebida ou alimento em temperatura tolerada;

\- ambiente climatizado;

\- possibilidade de pausa;

\- redução da duração;

\- alternativa de local.

\`\`\`

\-\--

\## REGRA 06 --- Necessidade de movimento

\`\`\`text

SE

o usuário selecionar necessidade de movimento

ENTÃO apresentar:

\- possibilidade de levantar;

\- participação em pé;

\- pausas de movimento;

\- objeto regulador;

\- ambiente com espaço;

\- reunião remota;

\- atividade dividida em períodos menores.

\`\`\`

O sistema não deverá sugerir automaticamente a supressão de movimentos
reguladores.

\-\--

\# 12. Regras comunicacionais

\-\--

\## REGRA 07 --- Dificuldade de comunicação oral

\`\`\`text

SE

o usuário selecionar dificuldade de comunicação oral

ENTÃO apresentar:

\- comunicação por texto;

\- frases de apoio;

\- mensagem preparada;

\- cartão digital;

\- possibilidade de mostrar uma pergunta;

\- apoio de pessoa autorizada;

\- envio prévio de dúvida;

\- tempo adicional para responder.

\`\`\`

Habilidades relacionadas:

\- preparar mensagem;

\- pedir ajuda por texto;

\- comunicar necessidade;

\- solicitar esclarecimento.

\-\--

\## REGRA 08 --- Preferência por comunicação escrita

\`\`\`text

SE

o usuário selecionar preferência por comunicação escrita

ENTÃO priorizar:

\- instruções por escrito;

\- resumos;

\- chat;

\- formulários;

\- mensagens;

\- confirmação escrita;

\- roteiro de perguntas.

\`\`\`

Reduzir prioridade de:

\- telefonemas;

\- instruções exclusivamente orais;

\- interação improvisada.

\-\--

\## REGRA 09 --- Dificuldade para pedir ajuda

\`\`\`text

SE

o usuário selecionar dificuldade para pedir ajuda

ENTÃO apresentar:

\- frase pronta;

\- mensagem no celular;

\- cartão digital;

\- pessoa de apoio;

\- identificação prévia de quem pode ajudar;

\- simulação textual;

\- possibilidade de pedir ajuda antes da atividade.

\`\`\`

\-\--

\## REGRA 10 --- Dificuldade com linguagem indireta

\`\`\`text

SE

o usuário selecionar dificuldade com linguagem indireta

ENTÃO apresentar:

\- instruções concretas;

\- linguagem objetiva;

\- uma pergunta por vez;

\- confirmação de entendimento;

\- resumo das decisões;

\- exemplos práticos.

\`\`\`

\-\--

\## REGRA 11 --- Necessidade de mais tempo para responder

\`\`\`text

SE

o usuário selecionar necessidade de mais tempo

ENTÃO apresentar:

\- botão "responder depois";

\- possibilidade de salvar rascunho;

\- mensagem para solicitar tempo;

\- comunicação assíncrona;

\- ausência de contagem regressiva;

\- pausa sem perda de dados.

\`\`\`

\-\--

\# 13. Regras econômicas

\-\--

\## REGRA 12 --- Orçamento restrito

\`\`\`text

SE

o usuário selecionar orçamento restrito

ENTÃO priorizar:

\- transporte público;

\- caminhada, quando viável e segura;

\- recursos gratuitos;

\- comparação de custos;

\- opções de menor custo;

\- serviços públicos;

\- materiais já disponíveis;

\- apoio comunitário;

\- preparação sem equipamentos pagos.

\`\`\`

Apresentar alerta quando:

\- o custo estimado ultrapassar o limite informado.

Mensagem:

\> Esta opção pode ultrapassar o valor que você informou. Deseja
comparar alternativas?

\-\--

\## REGRA 13 --- Ausência de orçamento para emergência

\`\`\`text

SE

o usuário informar que não possui recurso financeiro de emergência

ENTÃO apresentar:

\- apoio previamente combinado;

\- rota de retorno;

\- alternativa gratuita;

\- serviço público;

\- telefone de apoio;

\- possibilidade de adiar;

\- plano sem dependência de transporte pago.

\`\`\`

\-\--

\## REGRA 14 --- Necessidade de controle de gastos

\`\`\`text

SE

o usuário selecionar necessidade de controlar gastos

ENTÃO apresentar:

\- limite de valor;

\- comparação visual;

\- lista de compras;

\- custo estimado;

\- registro de gasto;

\- reserva para prioridade;

\- alternativas equivalentes.

\`\`\`

\-\--

\# 14. Regras de mobilidade e território

\-\--

\## REGRA 15 --- Uso de transporte público

\`\`\`text

SE

o usuário selecionar ônibus ou transporte público

ENTÃO apresentar:

\- custo;

\- tempo;

\- quantidade de conexões;

\- horários;

\- lotação;

\- ruído;

\- pontos de embarque e desembarque;

\- rota alternativa;

\- cartão ou forma de pagamento;

\- plano para atraso.

\`\`\`

\-\--

\## REGRA 16 --- Caminhada

\`\`\`text

SE

o usuário selecionar caminhada

ENTÃO apresentar:

\- distância;

\- duração;

\- condições climáticas;

\- segurança;

\- iluminação;

\- calçadas;

\- acessibilidade;

\- esforço;

\- pontos de pausa;

\- possibilidade de combinar com transporte.

\`\`\`

\-\--

\## REGRA 17 --- Transporte por aplicativo

\`\`\`text

SE

o usuário selecionar transporte por aplicativo

ENTÃO apresentar:

\- custo estimado;

\- endereço salvo;

\- ponto de embarque;

\- conferência de veículo;

\- compartilhamento autorizado;

\- mensagem para motorista;

\- conexão necessária;

\- uso como opção principal ou alternativa.

\`\`\`

\-\--

\## REGRA 18 --- Apoio de outra pessoa no trajeto

\`\`\`text

SE

o usuário selecionar apoio de outra pessoa

ENTÃO perguntar:

\- quem poderá apoiar;

\- em qual etapa;

\- presencialmente ou remotamente;

\- por quanto tempo;

\- quais informações poderão ser compartilhadas;

\- se o apoio será integral ou parcial.

\`\`\`

Apresentar possibilidades:

\- primeira tentativa acompanhada;

\- apoio apenas até o ponto;

\- apoio por mensagem;

\- ponto de encontro;

\- confirmação de chegada.

\-\--

\## REGRA 19 --- Dificuldade de orientação no território

\`\`\`text

SE

o usuário selecionar dificuldade de orientação

ENTÃO apresentar:

\- mapa simplificado;

\- pontos de referência;

\- fotografias;

\- divisão do trajeto em etapas;

\- alerta de proximidade;

\- rota acompanhada;

\- endereço salvo;

\- instruções offline.

\`\`\`

\-\--

\## REGRA 20 --- Ausência de internet durante o trajeto

\`\`\`text

SE

o usuário informar ausência ou limitação de internet

ENTÃO apresentar:

\- mapa salvo;

\- impressão;

\- captura de tela;

\- endereço escrito;

\- telefone de apoio;

\- instruções offline;

\- plano sem dependência de localização em tempo real.

\`\`\`

\-\--

\## REGRA 21 --- Território inseguro

\`\`\`text

SE

o usuário selecionar insegurança territorial

ENTÃO apresentar:

\- horário com maior circulação;

\- rota mais segura;

\- apoio presencial;

\- transporte alternativo;

\- ponto de espera protegido;

\- contato de apoio;

\- possibilidade de não realizar;

\- comparação entre segurança, custo e tempo.

\`\`\`

O sistema não deverá garantir que determinado trajeto é seguro.

\-\--

\# 15. Regras de mudanças e imprevistos

\-\--

\## REGRA 22 --- Dificuldade com mudanças inesperadas

\`\`\`text

SE

o usuário selecionar dificuldade com mudanças inesperadas

ENTÃO apresentar:

\- plano alternativo;

\- rota substituta;

\- opção de interromper;

\- contato de apoio;

\- preparação para substituições;

\- sequência atualizada;

\- tempo adicional;

\- possibilidade de tentar em outro dia.

\`\`\`

\-\--

\## REGRA 23 --- Alteração de trajeto

\`\`\`text

SE

o percurso envolver possibilidade de alteração de trajeto

ENTÃO apresentar:

\- rota alternativa;

\- ponto de retorno;

\- pergunta preparada;

\- contato de apoio;

\- transporte substituto;

\- mensagem sobre mudança;

\- opção de cancelar.

\`\`\`

\-\--

\## REGRA 24 --- Atraso

\`\`\`text

SE

o usuário selecionar dificuldade com atrasos

ENTÃO apresentar:

\- saída antecipada;

\- margem de tempo;

\- mensagem para informar atraso;

\- próximo horário disponível;

\- plano alternativo;

\- possibilidade de reagendar;

\- estratégia de pausa.

\`\`\`

\-\--

\## REGRA 25 --- Indisponibilidade de recurso

\`\`\`text

SE

um recurso necessário não estiver disponível

ENTÃO apresentar:

\- substituição;

\- empréstimo;

\- opção gratuita;

\- apoio;

\- alteração da atividade;

\- adiamento;

\- realização parcial;

\- possibilidade de continuar sem o recurso.

\`\`\`

\-\--

\# 16. Regras de funções executivas e rotina

\-\--

\## REGRA 26 --- Dificuldade para iniciar

\`\`\`text

SE

o usuário selecionar dificuldade para iniciar uma atividade

ENTÃO apresentar:

\- primeiro passo mínimo;

\- preparação antecipada;

\- checklist curto;

\- lembrete configurável;

\- apoio de início;

\- atividade dividida;

\- opção de realizar apenas uma etapa.

\`\`\`

\-\--

\## REGRA 27 --- Dificuldade com muitas etapas

\`\`\`text

SE

o usuário selecionar dificuldade com muitas etapas

ENTÃO apresentar:

\- uma etapa por tela;

\- checklist resumido;

\- agrupamento de tarefas;

\- sequência visual;

\- possibilidade de ocultar detalhes;

\- divisão em ciclos menores.

\`\`\`

\-\--

\## REGRA 28 --- Dificuldade para estimar tempo

\`\`\`text

SE

o usuário selecionar dificuldade para estimar tempo

ENTÃO apresentar:

\- duração aproximada;

\- margem adicional;

\- horário de início;

\- horário de saída;

\- tempo de deslocamento;

\- tempo de recuperação;

\- duração flexível.

\`\`\`

\-\--

\## REGRA 29 --- Dificuldade para lembrar

\`\`\`text

SE

o usuário selecionar dificuldade para lembrar informações

ENTÃO apresentar:

\- lembrete;

\- resumo;

\- lista;

\- fotografia;

\- registro por escrito;

\- calendário;

\- informação salva;

\- instrução acessível offline.

\`\`\`

\-\--

\## REGRA 30 --- Sobrecarga por excesso de escolhas

\`\`\`text

SE

o usuário selecionar dificuldade diante de muitas opções

ENTÃO:

\- apresentar no máximo três alternativas por vez;

\- oferecer comparação resumida;

\- permitir filtros;

\- permitir decidir depois;

\- destacar critérios escolhidos pelo usuário.

\`\`\`

\-\--

\## REGRA 31 --- Dificuldade para retomar após interrupção

\`\`\`text

SE

o usuário selecionar dificuldade para retomar

ENTÃO apresentar:

\- ponto de retomada;

\- resumo do que já foi feito;

\- próximo passo indicado;

\- rascunho salvo;

\- opção de reiniciar apenas a etapa atual;

\- mensagem sem julgamento.

\`\`\`

\-\--

\# 17. Regras de alimentação

\-\--

\## REGRA 32 --- Seletividade alimentar

\`\`\`text

SE

o usuário selecionar seletividade alimentar

ENTÃO apresentar:

\- alimentos tolerados;

\- refeições seguras;

\- registro de textura;

\- registro de cheiro;

\- temperatura preferida;

\- formas de preparo conhecidas;

\- substituições graduais;

\- dúvida para nutricionista.

\`\`\`

O sistema não deverá:

\- obrigar experimentação;

\- definir variedade como sucesso;

\- tratar repetição alimentar como falha;

\- sugerir restrição sem profissional.

\-\--

\## REGRA 33 --- Dificuldade com alimentos misturados

\`\`\`text

SE

o usuário selecionar desconforto com alimentos misturados

ENTÃO apresentar:

\- alimentos separados;

\- recipientes diferentes;

\- montagem individual;

\- preparo por partes;

\- possibilidade de recusar mistura;

\- registro de apresentação tolerada.

\`\`\`

\-\--

\## REGRA 34 --- Orçamento alimentar restrito

\`\`\`text

SE

o usuário selecionar orçamento alimentar restrito

ENTÃO apresentar:

\- limite semanal;

\- comparação de preços;

\- lista de prioridades;

\- marcas alternativas;

\- alimentos acessíveis;

\- compra em pequenas quantidades;

\- redução de desperdício.

\`\`\`

\-\--

\## REGRA 35 --- Acesso limitado a alimentos

\`\`\`text

SE

o usuário informar acesso limitado

ENTÃO apresentar:

\- mercados disponíveis;

\- substituições;

\- produtos de maior duração;

\- compra programada;

\- apoio de outra pessoa;

\- possibilidade de entrega;

\- dúvidas para profissional.

\`\`\`

\-\--

\## REGRA 36 --- Dúvida nutricional

\`\`\`text

SE

o usuário registrar dúvida relacionada à alimentação

ENTÃO permitir:

\- guardar;

\- relacionar ao alimento;

\- preparar pergunta;

\- compartilhar com nutricionista;

\- adicionar à próxima consulta.

\`\`\`

Não responder automaticamente com prescrição alimentar individualizada.

\-\--

\# 18. Regras de trabalho e participação acadêmica

\-\--

\## REGRA 37 --- Reunião longa

\`\`\`text

SE

o usuário selecionar dificuldade com duração de reunião

ENTÃO apresentar:

\- duração definida;

\- pausa;

\- participação parcial;

\- entrada ou saída combinada;

\- resumo posterior;

\- intervalo após reunião;

\- solicitação antecipada.

\`\`\`

\-\--

\## REGRA 38 --- Exigência de contato visual

\`\`\`text

SE

o usuário selecionar desconforto com contato visual

ENTÃO apresentar:

\- olhar para o material;

\- participação por escrito;

\- câmera opcional;

\- posicionamento lateral;

\- comunicação sem exigência de contato visual;

\- explicação de preferência, quando desejada.

\`\`\`

Não apresentar treinamento de contato visual como resposta automática.

\-\--

\## REGRA 39 --- Julgamento de estereotipias reguladoras

\`\`\`text

SE

o usuário relatar julgamento de movimentos reguladores

ENTÃO apresentar:

\- preservação da estratégia reguladora;

\- comunicação de necessidade;

\- objeto regulador;

\- ambiente alternativo;

\- participação remota;

\- pausa;

\- adaptação da atividade.

\`\`\`

O sistema somente deverá sugerir alternativa à estereotipia quando:

\- a pessoa desejar;

\- houver sofrimento;

\- houver risco;

\- a atividade estiver sendo impedida;

\- for necessária avaliação profissional.

\-\--

\## REGRA 40 --- Participação por escrito

\`\`\`text

SE

o usuário selecionar preferência por participação escrita

ENTÃO priorizar:

\- chat;

\- documento;

\- mensagem antecipada;

\- pauta;

\- perguntas escritas;

\- registro de decisões;

\- resposta posterior.

\`\`\`

\-\--

\## REGRA 41 --- Falta de pauta ou instrução antecipada

\`\`\`text

SE

o usuário selecionar dificuldade sem preparação prévia

ENTÃO apresentar:

\- pedido de pauta;

\- roteiro;

\- objetivos da reunião;

\- duração;

\- pessoas participantes;

\- perguntas antecipadas;

\- material prévio.

\`\`\`

\-\--

\## REGRA 42 --- Ambiente acadêmico intenso

\`\`\`text

SE

o usuário selecionar sobrecarga no ambiente acadêmico

ENTÃO apresentar:

\- local menos movimentado;

\- intervalo;

\- acesso antecipado à sala;

\- assento escolhido;

\- instrução por escrito;

\- saída planejada;

\- setor de apoio institucional.

\`\`\`

\-\--

\# 19. Regras de saúde e medicamentos

\-\--

\## REGRA 43 --- Uso de medicamentos

\`\`\`text

SE

o usuário informar uso de medicamentos

ENTÃO apresentar:

\- lista de medicamentos;

\- horários informados;

\- fotografias das embalagens;

\- profissional responsável;

\- campo de dúvidas;

\- preparação para consulta;

\- acompanhamento farmacêutico.

\`\`\`

O sistema não deverá:

\- recomendar medicamento;

\- modificar horário prescrito;

\- alterar dose;

\- recomendar interrupção;

\- avaliar interação automaticamente.

\-\--

\## REGRA 44 --- Efeitos percebidos

\`\`\`text

SE

o usuário registrar efeitos percebidos

ENTÃO apresentar:

\- data;

\- horário;

\- descrição livre;

\- intensidade descritiva;

\- relação temporal percebida;

\- dúvida para profissional;

\- opção de compartilhar;

\- inclusão no resumo da consulta.

\`\`\`

A interface deverá utilizar:

\> efeito percebido

e não:

\> efeito comprovado.

\-\--

\## REGRA 45 --- Alteração no sono

\`\`\`text

SE

o usuário registrar alteração no sono

ENTÃO apresentar:

\- data de início percebida;

\- horário;

\- duração;

\- observação;

\- medicamentos relacionados pelo usuário;

\- pergunta para profissional;

\- preparação para consulta.

\`\`\`

Não realizar interpretação diagnóstica.

\-\--

\## REGRA 46 --- Alteração no apetite

\`\`\`text

SE

o usuário registrar alteração no apetite

ENTÃO apresentar:

\- data;

\- descrição;

\- relação com rotina;

\- alimentos tolerados;

\- dúvida;

\- opção de compartilhar com profissional.

\`\`\`

\-\--

\## REGRA 47 --- Preparação para consulta

\`\`\`text

SE

o objetivo for preparar consulta

ENTÃO apresentar:

\- lista de medicamentos;

\- principais alterações;

\- três perguntas prioritárias;

\- documentos;

\- forma de comunicação;

\- acompanhante autorizado;

\- resumo para impressão;

\- controle de compartilhamento.

\`\`\`

\-\--

\## REGRA 48 --- Dúvida farmacêutica

\`\`\`text

SE

o usuário registrar dúvida sobre uso, horário, conservação ou
administração de medicamento

ENTÃO apresentar:

\- guardar pergunta;

\- preparar mensagem;

\- compartilhar com farmacêutico;

\- levar à consulta;

\- registrar orientação recebida posteriormente.

\`\`\`

\-\--

\# 20. Regras relacionadas ao apoio

\-\--

\## REGRA 49 --- Apoio presencial disponível

\`\`\`text

SE

o usuário informar apoio presencial

ENTÃO apresentar:

\- primeira tentativa acompanhada;

\- apoio em uma etapa;

\- divisão de responsabilidades;

\- ponto de encontro;

\- duração do apoio;

\- informações compartilhadas.

\`\`\`

\-\--

\## REGRA 50 --- Apoio remoto disponível

\`\`\`text

SE

o usuário informar apoio remoto

ENTÃO apresentar:

\- mensagem;

\- ligação opcional;

\- confirmação de saída;

\- confirmação de chegada;

\- compartilhamento seletivo;

\- contato de emergência;

\- horário de disponibilidade.

\`\`\`

\-\--

\## REGRA 51 --- Ausência de apoio

\`\`\`text

SE

o usuário informar que não possui apoio disponível

ENTÃO apresentar:

\- estratégias independentes;

\- recursos públicos;

\- apoio institucional;

\- tecnologia offline;

\- atividade parcial;

\- redução da complexidade;

\- possibilidade de adiar;

\- busca de serviço de referência.

\`\`\`

O sistema não deverá presumir que apoio sempre está disponível.

\-\--

\## REGRA 52 --- Usuário não deseja apoio

\`\`\`text

SE

o usuário selecionar que não deseja apoio

ENTÃO:

\- respeitar a decisão;

\- não insistir;

\- apresentar recursos autônomos;

\- manter opção de revisar depois;

\- não compartilhar informações.

\`\`\`

\-\--

\## REGRA 53 --- Apoio disponível apenas em parte da atividade

\`\`\`text

SE

o apoio estiver disponível apenas em uma etapa

ENTÃO permitir:

\- definir início e fim do apoio;

\- escolher trecho acompanhado;

\- manter restante do percurso independente;

\- registrar apoio parcial;

\- preparar transição.

\`\`\`

\-\--

\# 21. Regras tecnológicas e de acessibilidade

\-\--

\## REGRA 54 --- Acesso limitado à internet

\`\`\`text

SE

o usuário informar acesso limitado

ENTÃO priorizar:

\- conteúdos curtos;

\- modo offline;

\- texto;

\- imagens leves;

\- plano salvo;

\- redução de vídeos;

\- ausência de reprodução automática.

\`\`\`

\-\--

\## REGRA 55 --- Dispositivo com tela pequena

\`\`\`text

SE

o sistema identificar dispositivo móvel

ENTÃO:

\- apresentar uma ação por tela;

\- usar botões grandes;

\- reduzir colunas;

\- manter navegação inferior simples;

\- evitar tabelas extensas;

\- permitir resumo.

\`\`\`

\-\--

\## REGRA 56 --- Texto ampliado

\`\`\`text

SE

o usuário aumentar o tamanho do texto

ENTÃO:

\- reorganizar componentes;

\- evitar sobreposição;

\- manter botões visíveis;

\- permitir rolagem;

\- não reduzir texto automaticamente.

\`\`\`

\-\--

\## REGRA 57 --- Modo de baixo estímulo

\`\`\`text

SE

o usuário ativar modo de baixo estímulo

ENTÃO:

\- reduzir quantidade de cores;

\- remover animações;

\- ocultar elementos decorativos;

\- evitar sons;

\- ampliar espaçamento;

\- apresentar menos opções por tela;

\- usar linguagem resumida.

\`\`\`

\-\--

\## REGRA 58 --- Uso sem som

\`\`\`text

SE

o usuário selecionar uso sem som

ENTÃO:

\- desativar áudio;

\- apresentar legendas;

\- apresentar transcrição;

\- não iniciar vídeos com som;

\- oferecer alternativa textual.

\`\`\`

\-\--

\## REGRA 59 --- Preferência por conteúdo resumido

\`\`\`text

SE

o usuário escolher versão resumida

ENTÃO apresentar:

\- título;

\- ideia principal;

\- até três passos;

\- tempo aproximado;

\- botão "ver detalhes".

\`\`\`

\-\--

\## REGRA 60 --- Preferência por conteúdo detalhado

\`\`\`text

SE

o usuário escolher versão detalhada

ENTÃO apresentar:

\- explicação completa;

\- exemplos;

\- alternativas;

\- possíveis adaptações;

\- conteúdos relacionados.

\`\`\`

\-\--

\# 22. Regras baseadas na experiência anterior

\-\--

\## REGRA 61 --- Estratégia útil

\`\`\`text

SE

o usuário registrar que uma estratégia foi útil

ENTÃO:

\- mantê-la no plano;

\- priorizá-la em objetivos semelhantes;

\- permitir marcar como preferida;

\- explicar que foi priorizada pelo registro anterior.

\`\`\`

\-\--

\## REGRA 62 --- Estratégia parcialmente útil

\`\`\`text

SE

a estratégia funcionou parcialmente

ENTÃO apresentar:

\- adaptar;

\- repetir;

\- combinar com apoio;

\- alterar duração;

\- alterar local;

\- registrar o que funcionou.

\`\`\`

\-\--

\## REGRA 63 --- Estratégia não útil

\`\`\`text

SE

o usuário registrar que uma estratégia não foi útil

ENTÃO:

\- retirar da prioridade;

\- perguntar se deseja adaptar;

\- apresentar alternativa;

\- manter no histórico;

\- não classificar como falha.

\`\`\`

\-\--

\## REGRA 64 --- Nova barreira identificada

\`\`\`text

SE

uma nova barreira surgir no registro posterior

ENTÃO:

\- adicionar ao contexto;

\- perguntar se deverá permanecer;

\- apresentar estratégias relacionadas;

\- permitir não alterar o plano.

\`\`\`

\-\--

\## REGRA 65 --- Novo facilitador identificado

\`\`\`text

SE

o usuário registrar algo que ajudou

ENTÃO:

\- sugerir cadastro como facilitador;

\- relacionar a futuras experiências;

\- permitir marcar como recurso preferido.

\`\`\`

\-\--

\## REGRA 66 --- Atividade realizada parcialmente

\`\`\`text

SE

a atividade for realizada parcialmente

ENTÃO apresentar:

\- manter parte realizada;

\- repetir somente a etapa restante;

\- reduzir objetivo;

\- solicitar apoio;

\- adaptar;

\- concluir por enquanto.

\`\`\`

\-\--

\## REGRA 67 --- Atividade não realizada

\`\`\`text

SE

a atividade não for realizada

ENTÃO:

\- não emitir julgamento;

\- permitir registrar motivo;

\- permitir pausar;

\- revisar barreiras;

\- escolher outro momento;

\- reduzir a atividade;

\- mudar de objetivo.

\`\`\`

\-\--

\## REGRA 68 --- Atividade interrompida

\`\`\`text

SE

a atividade for interrompida

ENTÃO apresentar:

\- registrar o que motivou a interrupção;

\- reconhecer a decisão de parar;

\- revisar estratégia;

\- criar plano alternativo;

\- repetir parcialmente;

\- não continuar.

\`\`\`

\-\--

\# 23. Regras combinadas

A personalização deverá considerar combinações, não apenas uma condição
isolada.

\-\--

\## COMBINAÇÃO 01 --- Ruído + ônibus

\`\`\`text

SE

sensibilidade ao ruído

E

uso de ônibus

ENTÃO priorizar:

\- horário menos lotado;

\- protetor auditivo;

\- lugar com menor exposição;

\- rota com menor duração;

\- plano de recuperação após o trajeto.

\`\`\`

\-\--

\## COMBINAÇÃO 02 --- Orçamento restrito + transporte

\`\`\`text

SE

orçamento restrito

E

objetivo com deslocamento

ENTÃO:

\- priorizar ônibus e caminhada;

\- comparar custo total;

\- apresentar integração;

\- manter aplicativo apenas como alternativa;

\- verificar recursos públicos.

\`\`\`

\-\--

\## COMBINAÇÃO 03 --- Comunicação oral difícil + mudança de rota

\`\`\`text

SE

dificuldade de comunicação oral

E

possibilidade de alteração de rota

ENTÃO apresentar:

\- mensagem pronta;

\- endereço escrito;

\- cartão digital;

\- contato de apoio;

\- mapa offline;

\- ponto de retorno.

\`\`\`

\-\--

\## COMBINAÇÃO 04 --- Mudanças inesperadas + ausência de apoio

\`\`\`text

SE

dificuldade com mudanças

E

ausência de apoio disponível

ENTÃO apresentar:

\- plano detalhado;

\- duas alternativas;

\- instruções offline;

\- possibilidade de interromper;

\- serviço de referência;

\- atividade parcial.

\`\`\`

\-\--

\## COMBINAÇÃO 05 --- Seletividade + orçamento restrito

\`\`\`text

SE

seletividade alimentar

E

orçamento restrito

ENTÃO apresentar:

\- alimentos tolerados prioritários;

\- comparação de marcas;

\- substituições semelhantes;

\- pequenas quantidades;

\- redução de desperdício;

\- dúvida para nutricionista.

\`\`\`

\-\--

\## COMBINAÇÃO 06 --- Reunião + necessidade de movimento

\`\`\`text

SE

objetivo relacionado a reunião

E

necessidade de movimento

ENTÃO apresentar:

\- participação em pé;

\- câmera opcional;

\- objeto regulador;

\- pausa;

\- local próximo à saída;

\- reunião remota;

\- duração definida.

\`\`\`

\-\--

\## COMBINAÇÃO 07 --- Reunião + comunicação escrita

\`\`\`text

SE

objetivo relacionado a reunião

E

preferência por texto

ENTÃO priorizar:

\- pauta;

\- chat;

\- contribuições antecipadas;

\- resumo;

\- perguntas escritas;

\- registro das decisões.

\`\`\`

\-\--

\## COMBINAÇÃO 08 --- Consulta + medicamentos

\`\`\`text

SE

objetivo for preparar consulta

E

houver medicamentos registrados

ENTÃO apresentar:

\- lista;

\- horários;

\- efeitos percebidos;

\- alterações no sono;

\- alterações no apetite;

\- dúvidas;

\- resumo para profissional.

\`\`\`

\-\--

\## COMBINAÇÃO 09 --- Internet limitada + mobilidade

\`\`\`text

SE

internet limitada

E

objetivo de mobilidade

ENTÃO apresentar:

\- mapa salvo;

\- capturas de tela;

\- endereço escrito;

\- pontos de referência;

\- contato telefônico;

\- rota alternativa offline.

\`\`\`

\-\--

\## COMBINAÇÃO 10 --- Sobrecarga sensorial + ausência de pausa

\`\`\`text

SE

sensibilidade sensorial elevada

E

não houver possibilidade de pausa

ENTÃO:

\- alertar sobre incompatibilidade;

\- apresentar outro horário;

\- reduzir duração;

\- escolher outro local;

\- realizar parcialmente;

\- adiar;

\- buscar adaptação.

\`\`\`

\-\--

\# 24. Regras por persona demonstrativa

\-\--

\# 24.1 Lucas --- Mobilidade e faculdade

Condições principais:

\- orçamento limitado;

\- ônibus;

\- sensibilidade auditiva;

\- mudanças de rota;

\- dificuldade para pedir ajuda;

\- apoio remoto.

O motor deverá priorizar:

\- transporte público;

\- comparação de custos;

\- horário menos lotado;

\- protetor auditivo;

\- mapa simplificado;

\- rota alternativa;

\- mensagem escrita;

\- pontos de referência;

\- contato de apoio;

\- aplicativo como plano de emergência.

\-\--

\# 24.2 Mariana --- Alimentação e vida doméstica

Condições principais:

\- seletividade;

\- textura;

\- cheiro;

\- orçamento;

\- acesso variável;

\- acompanhamento nutricional.

O motor deverá priorizar:

\- alimentos tolerados;

\- lista por categorias;

\- texturas e temperaturas;

\- marcas conhecidas;

\- substituições semelhantes;

\- orçamento semanal;

\- horários menos movimentados;

\- preparo simples;

\- perguntas para nutricionista.

\-\--

\# 24.3 Rafael --- Trabalho e autorregulação

Condições principais:

\- iluminação;

\- duração;

\- movimento;

\- estereotipias reguladoras;

\- julgamento social;

\- preferência por comunicação escrita.

O motor deverá priorizar:

\- pauta antecipada;

\- chat;

\- câmera opcional;

\- pausa;

\- iluminação adaptada;

\- objeto regulador;

\- participação por escrito;

\- intervalo posterior;

\- pedido de adaptação.

Não deverá sugerir:

\- contato visual obrigatório;

\- supressão automática de movimentos;

\- exposição diagnóstica.

\-\--

\# 24.4 Ana --- Saúde e medicamentos

Condições principais:

\- uso de medicamentos;

\- horários;

\- efeitos percebidos;

\- alterações no sono e apetite;

\- dúvidas;

\- preparação para consulta.

O motor deverá priorizar:

\- lista de medicamentos;

\- organização por horários;

\- registro temporal;

\- três perguntas prioritárias;

\- resumo para consulta;

\- acompanhamento farmacêutico;

\- compartilhamento seletivo.

Não deverá sugerir:

\- alteração de dose;

\- suspensão;

\- substituição;

\- interpretação clínica automática.

\-\--

\# 25. Estrutura técnica simplificada

As regras poderão ser armazenadas em formato de objeto.

Exemplo:

\`\`\`text

Regra:

R001

Condição:

sensibilidade_ao_ruido = verdadeiro

Ações:

\- priorizar_horario_menos_movimentado

\- apresentar_protetor_auditivo

\- apresentar_pausa

\- desativar_audio_automatico

\- relacionar_conteudo_sensorial

Explicação:

Você informou sensibilidade ao ruído.

\`\`\`

Outro exemplo:

\`\`\`text

Regra:

R012

Condição:

orcamento = restrito

Ações:

\- priorizar_transporte_publico

\- priorizar_opcoes_gratuitas

\- comparar_custos

\- alertar_custo_acima_limite

Explicação:

Você informou que deseja limitar os gastos.

\`\`\`

\-\--

\# 26. Exemplo de estrutura em pseudocódigo

\`\`\`text

SE perfil.sensibilidadeRuido == true:

adicionarEstrategia(\"Escolher horário menos movimentado\")

adicionarEstrategia(\"Utilizar proteção auditiva\")

adicionarEstrategia(\"Planejar pausa\")

desativarAudioAutomatico()

adicionarConteudo(\"Preparação sensorial\")

SE contexto.orcamento == \"restrito\":

priorizarAlternativa(\"Transporte público\")

priorizarAlternativa(\"Caminhada\")

adicionarComparacao(\"Custo\")

ocultarOpcaoCaraSomenteSeUsuarioAutorizar()

SE barreiras.comunicacaoOral == true:

adicionarEstrategia(\"Mensagem escrita\")

adicionarEstrategia(\"Cartão digital\")

adicionarSimulacao(\"Pedido de ajuda por texto\")

SE barreiras.mudancas == true:

adicionarEstrategia(\"Plano alternativo\")

adicionarEstrategia(\"Contato de apoio\")

adicionarOpcao(\"Interromper atividade\")

adicionarConteudo(\"Como lidar com alteração do percurso\")

\`\`\`

\-\--

\# 27. Regras de conflito

Duas regras poderão produzir sugestões diferentes.

Exemplo:

\- menor custo sugere ônibus;

\- menor estímulo sugere transporte por aplicativo.

Nesse caso, o sistema não deverá escolher automaticamente.

Deverá apresentar comparação:

\`\`\`text

Ônibus

\- menor custo;

\- maior lotação;

\- maior ruído.

Transporte por aplicativo

\- maior custo;

\- menor lotação;

\- menor tempo.

\`\`\`

Pergunta:

\> Qual aspecto é mais importante para você nesta experiência?

Opções:

\- custo;

\- estímulos;

\- tempo;

\- segurança;

\- previsibilidade;

\- outro.

\-\--

\# 28. Regras de segurança

O motor deverá interromper recomendações automáticas quando houver:

\- pedido de diagnóstico;

\- solicitação de alteração de medicamento;

\- situação de emergência;

\- relato que exija avaliação profissional;

\- informação insuficiente para orientar com segurança;

\- conflito entre sugestão e preferência expressa.

Mensagem possível:

\> O VIVA pode ajudar a organizar esta dúvida, mas não pode tomar essa
decisão. Você pode registrá-la para conversar com um profissional.

\-\--

\# 29. Registro das decisões do motor

Para cada sugestão, o sistema deverá registrar:

\- regra ativada;

\- condição que ativou;

\- data;

\- sugestão apresentada;

\- resposta do usuário;

\- adaptação;

\- rejeição;

\- relação com o objetivo.

Esse registro deverá servir para:

\- transparência;

\- teste do protótipo;

\- revisão de regras;

\- identificação de sugestões repetitivas;

\- avaliação da personalização.

Não deverá servir para vigilância ou pontuação.

\-\--

\# 30. Controles do usuário

O usuário deverá poder:

\- ver por que uma sugestão apareceu;

\- aceitar;

\- rejeitar;

\- adaptar;

\- ocultar;

\- restaurar;

\- criar alternativa;

\- desativar personalização;

\- revisar dados utilizados;

\- corrigir informação;

\- excluir registro;

\- solicitar menos sugestões.

\-\--

\# 31. Modo de personalização reduzida

O usuário poderá selecionar:

\> Mostrar menos sugestões.

Nesse modo, o sistema deverá:

\- apresentar no máximo três opções;

\- priorizar estratégias já úteis;

\- reduzir explicações;

\- ocultar conteúdos secundários;

\- manter acesso a "ver mais".

\-\--

\# 32. Modo de exploração ampliada

O usuário poderá selecionar:

\> Quero ver mais alternativas.

Nesse modo, o sistema poderá apresentar:

\- estratégias adicionais;

\- conteúdos relacionados;

\- outras formas de apoio;

\- adaptações;

\- alternativas de baixo custo;

\- experiências semelhantes.

\-\--

\# 33. Requisitos funcionais

O motor deverá permitir:

\- ativar regra por seleção;

\- combinar regras;

\- ordenar sugestões;

\- explicar sugestão;

\- rejeitar;

\- adaptar;

\- criar alternativa;

\- registrar decisão;

\- utilizar registros anteriores;

\- evitar repetição;

\- atualizar o percurso;

\- funcionar sem IA externa;

\- funcionar com dados locais;

\- permitir revisão manual das regras.

\-\--

\# 34. Requisitos não funcionais

O motor deverá ser:

\- transparente;

\- previsível;

\- rápido;

\- auditável;

\- modular;

\- editável;

\- seguro;

\- compatível com armazenamento local;

\- independente de conexão contínua;

\- acessível;

\- coerente em computador e celular.

\-\--

\# 35. Regras mínimas para o protótipo

Para a apresentação inicial, deverão ser implementadas pelo menos as
seguintes regras:

1\. sensibilidade ao ruído;

2\. orçamento restrito;

3\. dificuldade de comunicação oral;

4\. mudanças inesperadas;

5\. uso de transporte público;

6\. ausência de internet;

7\. dificuldade de orientação;

8\. seletividade alimentar;

9\. preferência por comunicação escrita;

10\. necessidade de movimento;

11\. uso de medicamentos;

12\. apoio remoto;

13\. estratégia rejeitada;

14\. estratégia útil;

15\. atividade realizada parcialmente.

\-\--

\# 36. Regras obrigatórias para a jornada de Lucas

A jornada principal deverá demonstrar ao vivo:

\## Regra de ruído

A seleção de sensibilidade auditiva apresenta:

\- horário menos lotado;

\- protetor auditivo;

\- pausa.

\## Regra econômica

O orçamento restrito prioriza:

\- ônibus;

\- caminhada;

\- comparação de custos.

\## Regra comunicacional

A dificuldade para pedir ajuda apresenta:

\- mensagem;

\- cartão digital;

\- apoio remoto.

\## Regra de imprevisibilidade

A dificuldade com mudanças apresenta:

\- rota alternativa;

\- contato de apoio;

\- transporte substituto;

\- opção de interromper.

\## Regra longitudinal

Após Lucas registrar dificuldade para reconhecer o ponto, o sistema
apresenta:

\- alerta de proximidade;

\- fotografias;

\- novos pontos de referência.

\-\--

\# 37. Cenário demonstrativo completo

\## Entrada

Lucas seleciona:

\- sensibilidade ao ruído;

\- orçamento restrito;

\- dificuldade para pedir ajuda;

\- mudanças inesperadas;

\- apoio remoto disponível.

\## Processamento

O motor ativa:

\- REGRA 01;

\- REGRA 07;

\- REGRA 09;

\- REGRA 12;

\- REGRA 15;

\- REGRA 22;

\- REGRA 50;

\- COMBINAÇÃO 01;

\- COMBINAÇÃO 02;

\- COMBINAÇÃO 03.

\## Saída

O sistema apresenta:

\### Alternativas

\- ônibus;

\- caminhada;

\- aplicativo como emergência.

\### Estratégias

\- horário menos lotado;

\- proteção auditiva;

\- mensagem preparada;

\- rota alternativa;

\- contato de apoio;

\- valor reservado;

\- plano para atraso.

\### Conteúdos

\- Como pedir ajuda por texto;

\- Como preparar uma rota alternativa;

\- Como reduzir estímulos no trajeto.

\### Habilidades

\- planejamento;

\- orientação;

\- comunicação de necessidade;

\- manejo de imprevistos.

\-\--

\# 38. Critérios de aceite

O motor será considerado funcional quando:

1\. uma seleção modificar as opções posteriores;

2\. as sugestões forem explicáveis;

3\. o usuário puder rejeitar;

4\. o usuário puder adaptar;

5\. estratégias rejeitadas não reaparecerem insistentemente;

6\. estratégias úteis forem priorizadas;

7\. condições econômicas alterarem alternativas;

8\. necessidades sensoriais alterarem preparação;

9\. preferências comunicacionais alterarem formatos;

10\. mudanças inesperadas produzirem plano alternativo;

11\. combinações produzirem respostas diferentes;

12\. conflitos forem apresentados para decisão do usuário;

13\. nenhuma regra produzir diagnóstico;

14\. nenhuma regra prescrever tratamento;

15\. o usuário continuar responsável pela decisão.

\-\--

\# 39. Testes demonstrativos

\## Teste 1 --- Ruído

Entrada:

\> Sensibilidade ao ruído.

Resultado esperado:

\- proteção auditiva;

\- horário menos movimentado;

\- pausa;

\- conteúdo sem áudio.

\## Teste 2 --- Orçamento

Entrada:

\> Limite de R\$ 10.

Resultado esperado:

\- ônibus;

\- caminhada;

\- comparação de custos;

\- alerta em opção mais cara.

\## Teste 3 --- Comunicação

Entrada:

\> Prefiro não pedir ajuda oralmente.

Resultado esperado:

\- mensagem;

\- cartão digital;

\- simulação textual;

\- apoio remoto.

\## Teste 4 --- Mudanças

Entrada:

\> Tenho dificuldade quando a rota muda.

Resultado esperado:

\- plano B;

\- rota alternativa;

\- contato;

\- possibilidade de interromper.

\## Teste 5 --- Experiência anterior

Entrada:

\> Protetor auditivo foi útil.

Resultado esperado:

\- estratégia priorizada no próximo ciclo.

\## Teste 6 --- Estratégia rejeitada

Entrada:

\> Contato visual não funciona para mim.

Resultado esperado:

\- estratégia não reaparece;

\- participação por escrito;

\- olhar para material;

\- câmera opcional.

\-\--

\# 40. Avaliação das regras

As regras deverão ser avaliadas quanto a:

\## Relevância

A sugestão está relacionada ao objetivo e ao contexto?

\## Transparência

O usuário compreende por que apareceu?

\## Autonomia

A pessoa consegue rejeitar ou adaptar?

\## Inclusão

A regra considera mudanças ambientais e formas de apoio?

\## Segurança

A sugestão permanece dentro dos limites da plataforma?

\## Carga cognitiva

A quantidade de sugestões é adequada?

\## Continuidade

A experiência anterior modifica o próximo ciclo?

\-\--

\# 41. Limites do motor demonstrativo

O motor inicial não deverá:

\- aprender sozinho;

\- inferir diagnóstico;

\- analisar emoções;

\- prever comportamento;

\- classificar usuário;

\- gerar pontuação;

\- recomendar tratamento;

\- substituir avaliação profissional;

\- acessar bases clínicas;

\- monitorar localização;

\- decidir automaticamente o próximo passo;

\- compartilhar dados sem autorização.

\-\--

\# 42. Evolução futura

Em versões posteriores, o motor poderá ser ampliado com:

\- maior número de regras;

\- validação por profissionais e usuários;

\- integração com serviços;

\- informações territoriais;

\- transporte em tempo real;

\- biblioteca ampliada;

\- preferências longitudinais;

\- recomendação assistida por inteligência artificial.

Mesmo com uso futuro de IA, deverão permanecer:

\- transparência;

\- explicação;

\- controle do usuário;

\- possibilidade de rejeição;

\- revisão humana;

\- limites clínicos;

\- proteção de dados.

\-\--

\# 43. Regra final

Toda personalização deverá responder às seguintes perguntas:

\> Esta sugestão está relacionada ao objetivo escolhido?

\> Ela considera o contexto real da pessoa?

\> O usuário sabe por que ela apareceu?

\> A sugestão pode ser rejeitada ou adaptada?

\> Ela respeita os recursos e limites informados?

\> Ela amplia possibilidades sem impor normalização?

Caso a resposta seja negativa, a regra deverá ser revista.

\-\--

\# 44. Síntese

O motor demonstrativo do VIVA não tentará descobrir automaticamente o
que é melhor para a pessoa.

Ele utilizará regras transparentes para organizar possibilidades a
partir das informações fornecidas pelo usuário.

A lógica será:

\`\`\`text

O usuário informa seu objetivo e contexto.

↓

As regras identificam relações relevantes.

↓

O sistema apresenta alternativas explicáveis.

↓

O usuário aceita, rejeita ou adapta.

↓

A experiência é realizada fora da tela.

↓

O registro modifica as sugestões futuras.

\`\`\`

O motor não substitui a decisão humana.

Sua função é reduzir barreiras, organizar informações e ampliar as
opções disponíveis para que a pessoa construa o próprio percurso.
