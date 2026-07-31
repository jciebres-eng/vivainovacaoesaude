\# 22_FORMS_AND_SEARCH.md

\# VIVA --- Sistema de Campos, Busca e Entrada de Dados

Versão: 1.0

Status: Documento estruturante

Categoria: Design System --- Formulários e interação

\-\--

\# 1. Objetivo

Este documento define o comportamento visual, funcional e acessível dos
campos de entrada do VIVA.

Os formulários deverão reduzir esforço cognitivo, evitar erros, tornar
as ações previsíveis e permitir que o usuário forneça informações por
diferentes meios.

O sistema deverá aceitar entradas por:

\- texto;

\- voz;

\- seleção;

\- localização;

\- imagem;

\- fotografia;

\- arquivo;

\- data e horário;

\- endereço;

\- pesquisa contextual.

Nenhum fluxo deverá depender exclusivamente de digitação.

\-\--

\# 2. Princípios gerais

Todo campo deverá ser:

\- claro;

\- previsível;

\- acessível;

\- responsivo;

\- fácil de corrigir;

\- compatível com toque;

\- compreensível fora de contexto;

\- adaptável ao modo de baixa estimulação.

Evitar:

\- formulários longos;

\- perguntas ambíguas;

\- excesso de campos obrigatórios;

\- validação somente após o envio;

\- mensagens culpabilizantes;

\- placeholders usados como único rótulo;

\- preenchimento repetido;

\- blocos extensos de instruções.

\-\--

\# 3. Componentes do sistema

O sistema deverá possuir os seguintes componentes:

1\. Campo de texto;

2\. Campo de pesquisa;

3\. Campo inteligente de intenção;

4\. Campo de voz;

5\. Campo de anexo;

6\. Campo de fotografia;

7\. Campo de localização;

8\. Campo de endereço;

9\. Autocomplete;

10\. Campo de data;

11\. Campo de horário;

12\. Campo de seleção;

13\. Campo de múltipla seleção;

14\. Campo de etiquetas;

15\. Campo de observação.

\-\--

\# 4. Estrutura padrão dos campos

Todo campo deverá poder conter:

\- label;

\- indicação opcional de obrigatoriedade;

\- ícone contextual;

\- valor inserido;

\- placeholder;

\- texto auxiliar;

\- mensagem de validação;

\- botão de limpeza;

\- estado visual;

\- descrição acessível.

Estrutura recomendada:

\`\`\`text

Label

\[ Ícone \| Valor ou placeholder \| Ação \]

Texto auxiliar ou mensagem de estado

O label deverá permanecer visível mesmo após o preenchimento.

------------------------------------------------------------------------

**5. Campo de texto**

Uso:

- nomes;

- títulos;

- respostas curtas;

- informações simples.

Características:

- altura mínima de 48 px;

- label permanente;

- botão de limpar quando preenchido;

- limite de caracteres informado quando necessário;

- correção ortográfica opcional;

- suporte a preenchimento automático.

Não utilizar para respostas extensas.

------------------------------------------------------------------------

**6. Campo de pesquisa**

Uso:

- pesquisar conteúdos;

- localizar percursos;

- buscar locais;

- encontrar estratégias;

- acessar itens da biblioteca;

- recuperar históricos.

Deverá possuir:

- ícone de busca;

- botão de limpar;

- resultados progressivos;

- histórico opcional;

- sugestões contextuais;

- estados de vazio, carregamento e erro.

O resultado deverá começar a ser atualizado após uma pausa curta na
digitação.

Tempo recomendado de debounce:

300 ms.

------------------------------------------------------------------------

**7. Campo inteligente de intenção**

Componente proprietário do VIVA.

É o principal ponto de entrada da Home.

Deverá aceitar:

- texto livre;

- voz;

- localização;

- imagem;

- fotografia;

- documento;

- nome de lugar;

- endereço;

- CEP;

- situação cotidiana.

Exemplos de entrada:

- "Preciso ir a uma consulta."

- "Quero me preparar para o primeiro dia de trabalho."

- "Preciso encontrar uma rota mais tranquila."

- "Quero organizar uma ida ao mercado."

- "Estou neste local e preciso chegar em casa."

O campo deverá interpretar a intenção sem exigir que o usuário conheça
previamente a estrutura da plataforma.

O sistema não deverá responder com diagnóstico, avaliação clínica ou
aconselhamento terapêutico automatizado.

------------------------------------------------------------------------

**8. Campo de voz**

Função:

permitir que o usuário fale sua intenção ou resposta.

Estados:

- disponível;

- escutando;

- pausado;

- processando;

- transcrevendo;

- concluído;

- erro;

- permissão negada.

Durante a gravação:

- exibir tempo;

- permitir pausar;

- permitir cancelar;

- mostrar onda sonora suave;

- apresentar transcrição revisável.

Nunca enviar a transcrição sem permitir confirmação quando houver
conteúdo sensível ou ambíguo.

------------------------------------------------------------------------

**9. Campo de anexo**

Aceitar:

- PDF;

- imagem;

- documento;

- arquivo de texto;

- conteúdo compatível com o escopo da aplicação.

Deverá apresentar:

- nome do arquivo;

- tamanho;

- formato;

- progresso de envio;

- opção de remover;

- estado de erro;

- confirmação de conclusão.

Antes do envio, informar de forma clara:

- finalidade;

- tratamento do arquivo;

- possibilidade de exclusão;

- limites de privacidade aplicáveis.

------------------------------------------------------------------------

**10. Campo de fotografia**

Funções possíveis:

- fotografar uma fachada;

- registrar um local;

- anexar uma referência;

- capturar um objeto;

- apoiar uma busca visual.

Deverá permitir:

- abrir câmera;

- escolher da galeria;

- visualizar antes de enviar;

- refazer;

- recortar;

- remover;

- confirmar.

A fotografia nunca deverá ser compartilhada ou analisada externamente
sem ação consciente do usuário.

------------------------------------------------------------------------

**11. Campo de localização**

Opções:

- usar localização atual;

- informar manualmente;

- selecionar no mapa;

- buscar por endereço;

- escolher local salvo;

- definir origem e destino.

Estados:

- localização disponível;

- buscando;

- permissão solicitada;

- permissão negada;

- sinal impreciso;

- localização confirmada;

- erro.

Sempre permitir alternativa manual.

Nunca bloquear o fluxo caso a permissão de localização seja recusada.

------------------------------------------------------------------------

**12. Campo de endereço**

Aceitar:

- rua;

- número;

- bairro;

- cidade;

- estado;

- CEP;

- nome de estabelecimento;

- ponto de referência;

- texto livre.

Deverá integrar:

- autocomplete;

- mapa;

- geocodificação;

- seleção manual;

- confirmação do ponto escolhido.

O endereço interpretado deverá ser apresentado ao usuário antes da
confirmação.

------------------------------------------------------------------------

**13. Autocomplete**

Uso:

- locais;

- endereços;

- conteúdos;

- estratégias;

- profissionais;

- temas;

- percursos anteriores.

O autocomplete deverá:

- destacar a parte correspondente;

- apresentar no máximo 6 sugestões;

- funcionar por teclado;

- funcionar por toque;

- permitir fechar;

- informar quando não houver resultados;

- não substituir automaticamente sem confirmação.

------------------------------------------------------------------------

**14. Campo de data**

Deverá permitir:

- seleção pelo calendário;

- digitação;

- escolha rápida;

- datas recentes;

- datas futuras;

- remoção do valor.

Apresentar formato local:

DD/MM/AAAA.

Nunca depender apenas de um calendário visual.

------------------------------------------------------------------------

**15. Campo de horário**

Deverá permitir:

- digitação;

- seletor de horas;

- sugestões contextuais;

- formato de 24 horas;

- confirmação.

Exemplos:

08:00\
14:30\
19:45

Quando relacionado a compromisso, poderá mostrar:

- duração estimada;

- horário de saída sugerido;

- antecedência;

- conflito de agenda.

------------------------------------------------------------------------

**16. Campo de seleção**

Uso:

escolha única.

Exemplos:

- meio de transporte;

- tipo de conteúdo;

- modo de navegação;

- intensidade de suporte;

- preferência de visualização.

Representações permitidas:

- radio;

- lista;

- cards;

- menu;

- bottom sheet.

Evitar menus suspensos quando houver poucas opções.

------------------------------------------------------------------------

**17. Campo de múltipla seleção**

Uso:

escolha de mais de uma alternativa.

Exemplos:

- estratégias preferidas;

- formatos de conteúdo;

- necessidades de suporte;

- interesses;

- condições do ambiente.

O sistema deverá mostrar claramente:

- quantas opções foram selecionadas;

- como remover uma opção;

- limite máximo, quando houver;

- opção de limpar tudo.

------------------------------------------------------------------------

**18. Campo de etiquetas**

Uso:

classificação rápida e contextual.

Exemplos:

- silencioso;

- acessível;

- conhecido;

- urgente;

- favorito;

- evitar;

- preparar antes.

As etiquetas deverão ser curtas.

Máximo recomendado:

3 palavras por etiqueta.

------------------------------------------------------------------------

**19. Campo de observação**

Uso:

- reflexões;

- anotações;

- dúvidas;

- registros;

- descrições livres.

Características:

- expansão automática;

- contador opcional;

- salvamento progressivo;

- recuperação em caso de interrupção;

- suporte a voz;

- possibilidade de anexar conteúdo.

Nunca obrigar o usuário a produzir uma resposta longa.

------------------------------------------------------------------------

**20. Estados obrigatórios**

Todo campo deverá possuir:

- normal;

- hover;

- focused;

- filled;

- disabled;

- read-only;

- loading;

- success;

- warning;

- error;

- offline.

Cada estado deverá utilizar:

- cor;

- borda;

- ícone;

- texto auxiliar;

- descrição acessível.

Nunca comunicar estado somente por cor.

------------------------------------------------------------------------

**21. Estado normal**

Características:

- borda neutra;

- fundo de superfície;

- label visível;

- contraste adequado;

- ausência de animação contínua.

------------------------------------------------------------------------

**22. Estado hover**

Aplicável em dispositivos com cursor.

Características:

- leve alteração de borda;

- pequena elevação;

- transição suave;

- nenhuma mudança brusca de cor.

Tempo recomendado:

120 ms.

------------------------------------------------------------------------

**23. Estado focused**

Deverá apresentar:

- borda destacada;

- focus ring externo;

- contraste mínimo adequado;

- cursor visível;

- label preservado.

Nunca remover o indicador de foco.

------------------------------------------------------------------------

**24. Estado filled**

Deverá:

- preservar o label;

- apresentar o valor inserido;

- permitir edição;

- oferecer limpeza quando apropriado;

- manter o contraste.

------------------------------------------------------------------------

**25. Estado disabled**

Características:

- aparência reduzida;

- impossibilidade de interação;

- explicação contextual quando necessário.

Não utilizar apenas diminuição de opacidade.

O leitor de tela deverá reconhecer o campo como indisponível.

------------------------------------------------------------------------

**26. Estado read-only**

Deverá diferenciar-se do campo desabilitado.

O valor deverá:

- permanecer legível;

- poder ser selecionado;

- poder ser copiado;

- não permitir alteração.

------------------------------------------------------------------------

**27. Estado loading**

Deverá:

- indicar processamento;

- preservar o conteúdo já inserido;

- evitar bloqueio da tela inteira;

- permitir cancelamento quando possível.

------------------------------------------------------------------------

**28. Estado success**

Utilizar após:

- validação;

- upload;

- localização confirmada;

- salvamento;

- transcrição concluída.

Apresentar:

- ícone;

- mensagem curta;

- feedback discreto.

------------------------------------------------------------------------

**29. Estado warning**

Usar quando:

- faltar confirmação;

- houver informação incompleta;

- o endereço estiver impreciso;

- existir risco de perda de dados;

- a ação exigir atenção.

O aviso deverá orientar o próximo passo.

------------------------------------------------------------------------

**30. Estado error**

Toda mensagem de erro deverá:

- explicar o que aconteceu;

- indicar como corrigir;

- preservar os dados;

- evitar linguagem culpabilizante;

- posicionar-se próxima ao campo.

Evitar mensagens como:

- "Entrada inválida."

- "Você errou."

- "Falha do usuário."

Preferir:

- "Não foi possível confirmar este endereço. Revise ou selecione no
  mapa."

- "O arquivo excede o tamanho permitido."

- "Não foi possível acessar o microfone. Você pode continuar digitando."

------------------------------------------------------------------------

**31. Validação**

A validação deverá ocorrer:

- durante o preenchimento, quando útil;

- ao sair do campo;

- antes do envio;

- após o processamento.

Evitar validar de forma agressiva a cada caractere.

Campos obrigatórios deverão ser claramente identificados antes do envio.

------------------------------------------------------------------------

**32. Preservação de dados**

O sistema deverá:

- salvar rascunhos;

- evitar perda acidental;

- recuperar conteúdo após interrupção;

- confirmar antes de apagar;

- preservar campos em caso de erro;

- informar quando o salvamento estiver concluído.

------------------------------------------------------------------------

**33. Formulários progressivos**

Formulários longos deverão ser divididos em pequenas etapas.

Cada etapa deverá possuir:

- título;

- objetivo;

- progresso;

- ação principal;

- opção de voltar;

- possibilidade de pausar;

- salvamento automático.

Evitar apresentar mais de 5 campos simultaneamente.

------------------------------------------------------------------------

**34. Redução de carga cognitiva**

Aplicar:

- uma pergunta principal por bloco;

- agrupamento por contexto;

- exemplos curtos;

- valores sugeridos;

- preenchimento automático;

- uso de dados já fornecidos;

- ocultação de campos não necessários;

- divulgação progressiva.

Nunca solicitar novamente uma informação que o sistema já possua, salvo
para confirmação.

**35. Acessibilidade**

Todos os campos deverão possuir:

- label programático;

- aria-describedby;

- descrição de erro;

- ordem lógica de foco;

- suporte por teclado;

- suporte por leitor de tela;

- suporte por voz;

- contraste adequado;

- área de toque mínima de 48 × 48 px;

- compatibilidade com aumento de texto.

Placeholders não substituem labels.

------------------------------------------------------------------------

**36. Modo de baixa estimulação**

Neste modo:

- reduzir glow;

- remover animações decorativas;

- reduzir blur;

- eliminar pulsação;

- utilizar superfícies mais estáveis;

- diminuir quantidade de sugestões;

- reduzir elementos simultâneos;

- preservar contraste e legibilidade.

Os campos deverão manter exatamente as mesmas funcionalidades.

------------------------------------------------------------------------

**37. Alto contraste**

No modo alto contraste:

- aumentar contraste de bordas;

- reforçar o focus ring;

- utilizar ícones nos estados;

- remover transparências excessivas;

- evitar cores intermediárias pouco distinguíveis;

- manter textos totalmente legíveis.

------------------------------------------------------------------------

**38. Responsividade**

Mobile:

- campos em largura total;

- teclado apropriado ao tipo de entrada;

- bottom sheets para seleção;

- botões de ação próximos ao polegar.

Tablet:

- permitir agrupamentos simples;

- manter boa distância entre os campos.

Desktop:

- limitar a largura máxima dos formulários;

- evitar campos excessivamente largos;

- suportar navegação completa por teclado.

Largura máxima recomendada para formulários:

640 px.

------------------------------------------------------------------------

**39. Teclados contextuais**

Utilizar:

- teclado numérico para números;

- teclado de telefone para telefone;

- teclado de e-mail para e-mail;

- teclado URL para endereços web;

- teclado decimal quando necessário.

Nunca exibir teclado inadequado ao tipo de dado.

------------------------------------------------------------------------

**40. Privacidade**

Antes de coletar dados sensíveis, o sistema deverá informar:

- por que a informação é solicitada;

- como será utilizada;

- se é obrigatória;

- se poderá ser removida;

- com quem poderá ser compartilhada.

Não solicitar dados sensíveis sem necessidade funcional clara.

------------------------------------------------------------------------

**41. Tokens**

Criar tokens específicos:

Input.Height.sm

Input.Height.md

Input.Height.lg

Input.Padding.x

Input.Padding.y

Input.Radius

Input.Border.default

Input.Border.hover

Input.Border.focus

Input.Border.error

Input.Border.success

Input.Background.default

Input.Background.disabled

Input.Background.readOnly

Input.Text.primary

Input.Text.secondary

Input.Text.placeholder

Input.Label.default

Input.Label.focus

Input.Helper.default

Input.Helper.error

Input.Helper.success

Input.Helper.warning

Input.FocusRing

Input.Icon

Input.ClearAction

Search.Background

Search.Suggestion

Search.Highlight

Voice.Idle

Voice.Listening

Voice.Processing

Voice.Error

Upload.Progress

Upload.Success

Upload.Error

Nenhum campo deverá utilizar valores locais fora dos tokens.

------------------------------------------------------------------------

**42. Componentes técnicos sugeridos**

Criar os seguintes componentes reutilizáveis:

TextField

SearchField

SmartIntentField

VoiceInput

FileUpload

PhotoInput

LocationInput

AddressField

AutocompleteField

DateField

TimeField

SelectField

MultiSelectField

TagInput

TextArea

FieldLabel

FieldHelperText

FieldError

FieldSuccess

FormSection

FormStep

FormProgress

------------------------------------------------------------------------

**43. Critérios de aceitação**

O sistema será considerado implementado quando:

- todos os campos possuírem label visível;

- todos os campos tiverem estados completos;

- todos os erros forem claros e recuperáveis;

- nenhum dado for perdido após erro de validação;

- os campos funcionarem por teclado;

- os campos funcionarem com leitor de tela;

- os campos respeitarem área mínima de toque;

- o formulário funcionar em modo de baixa estimulação;

- o formulário funcionar em alto contraste;

- o campo de intenção aceitar texto, voz e anexos;

- a localização possuir alternativa manual;

- os campos utilizarem apenas Design Tokens;

- formulários longos forem divididos em etapas;

- nenhuma informação for solicitada sem finalidade clara.

------------------------------------------------------------------------

**44. Auditoria**

Antes de aprovar qualquer fluxo, verificar:

- clareza dos labels;

- ordem dos campos;

- quantidade de campos;

- mensagens de erro;

- salvamento automático;

- teclado contextual;

- acessibilidade;

- contraste;

- foco;

- responsividade;

- privacidade;

- permissões;

- modo de baixa estimulação;

- preservação de dados;

- alternativas à digitação;

- consistência com o Design System.

Nenhum formulário deverá ser aprovado quando exigir esforço
desnecessário do usuário.

O próximo documento da sequência será:

\*\*23_VISUAL_CARDS.md --- Sistema de Cards e Composição Visual\*\*,
incluindo Card Jornada, Swipe, Biblioteca, Estratégia, Local,
Transporte, Histórico, Reflexão, Insight, Mapa e Próximo Passo.
