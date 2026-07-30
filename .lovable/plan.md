
# Revisão da experiência VIVA frente à documentação

Base: 00_FILOSOFIA, 13_IDENTIDADE_DA_EXPERIENCIA, 14_DESIGN_SYSTEM_HUMANO, 15_MANIFESTO_DE_IA_RESPONSAVEL, 16_GOVERNANCA. Nenhuma funcionalidade nova nesta etapa.

## 1. O que já está alinhado

- **Percurso fragmentado em passos** — uma pergunta por tela, sem formulários longos (doc 14, Carga Cognitiva).
- **Ajustes sensoriais** — tema claro/escuro/baixo estímulo, tamanho de texto, redução de animação e densidade, persistidos localmente (doc 14, Acessibilidade; doc 13, Personalização).
- **Tipografia Atkinson Hyperlegible**, medida de linha limitada a ~58ch, espaçamento generoso.
- **Ícones Lucide outline, traço uniforme**, sempre acompanhados de texto (nada depende só de ícone ou cor).
- **Linguagem já majoritariamente não punitiva**: "Nenhuma leitura é obrigatória", "Você pode continuar sem consultar", tela de afastamento que incentiva sair da plataforma (doc 00, princípio 2).
- **Navegação previsível**: menu lateral no desktop, barra inferior no mobile, alvos de toque amplos.
- **Ausência de rankings, comparação social, streaks ou contadores de urgência.**

## 2. O que ainda parece software convencional

**Visual**
- A paleta escura é o tema padrão do template (azul-marinho frio, quase preto), não a paleta do doc 14: azul-esverdeado suave, verde sálvia, areia claro, brancos aquecidos, sem preto absoluto. Faltam tokens de sálvia (progresso/estados positivos) e de atenção (amarelo suave).
- Há tokens duplicados/sobrescritos em `styles.css` (`--border`, `--input`, `--ring` definidos duas vezes; a segunda apaga a versão calma) e `--chart-*` saturados herdados do template.
- Cantos `0.5rem` e sombras ausentes contradizem "bordas suaves, cantos arredondados, sombras discretas".
- Cabeçalhos de card em `UPPERCASE + letter-spacing` largo é vocabulário de dashboard corporativo, não de ambiente sereno.
- Logo com ícone `Sparkles` (brilho/magia) sugere entusiasmo e IA mágica — contrário ao tom do doc 15.

**Estrutura e hierarquia**
- O menu lateral lista **16 etapas numeradas**; o doc 14 pede **no máximo cinco itens principais** de navegação. Hoje a barra lateral parece um painel de gestão de tarefas.
- "Etapa 7 de 16" + barra de progresso percentual comunica **conclusão obrigatória e atraso implícito**. O doc 13 é explícito: progresso é trajetória, nunca desempenho; não existe atraso, existe continuidade.
- A tela inicial mistura protótipo + 17 documentos técnicos num mesmo scroll longo, com muitas ações simultâneas (doc 13: uma ação principal, no máximo duas secundárias).
- Telas com muitos botões de mesmo peso (ex.: conteúdo da biblioteca com 5 botões lado a lado) — quebra "nunca vários botões principais simultaneamente".

**Linguagem**
- "Iniciar percurso", "Continuar", "Avançar" repetem vocabulário de fluxo obrigatório; o doc 13 prefere "Começar", "Finalizar", "Se fizer sentido para você, podemos continuar".
- Falta o par confirmação/feedback textual ("Registro salvo.", "Alterações atualizadas."). Hoje seleções mudam de cor **apenas visualmente** — informação dependente de cor.
- "Salvar" sem consequência visível; ações sem estado de "concluída".

**Ética e transparência (docs 00, 15, 16)**
- Não existe, em nenhuma tela, a declaração de **limites da plataforma**: o VIVA não diagnostica, não substitui acompanhamento profissional, não prescreve.
- Não há espaço de **transparência de dados**: o que é guardado, onde (armazenamento local do próprio dispositivo), como apagar tudo.
- Não há aviso de que os percursos são gerados por **regras simples e rastreáveis**, sem IA (doc 10 + doc 15: explicar origem de qualquer sugestão).
- Faltam estados de erro/indisponível redigidos sem culpabilização.

**Estados de componente**
- Não há estados definidos para carregando, desabilitado e erro; foco visível existe só parcialmente.

## 3. Melhorias recomendadas (ordem sugerida)

**Etapa 1 — Fundação visual (doc 14)**
1. Reescrever a paleta em `styles.css`: primária azul-esverdeada suave, secundária sálvia (progresso/positivo), superfícies areia/branco aquecido, neutros sem preto absoluto, atenção amarelo suave, erro vermelho discreto. Tema escuro em cinza-quente, não azul-marinho.
2. Remover tokens duplicados e as cores de gráfico saturadas; adicionar tokens de sombra discreta e raio maior (cantos suaves).
3. Definir a escala tipográfica dos quatro níveis do documento (título, subtítulo, texto, legenda) e eliminar os rótulos em caixa alta com tracking largo.

**Etapa 2 — Hierarquia e navegação**
4. Reduzir a navegação a cinco itens: Percurso, Biblioteca, Trajetória, Ajustes, Sobre o VIVA. As 16 etapas deixam de ser menu e passam a ser um índice do percurso, acessível de dentro do percurso.
5. Substituir "Etapa 7 de 16" + barra percentual por um indicador de **trajetória** sem percentual e sem linguagem de conclusão ("Você está em: Barreiras · Onde já esteve"). Continua acessível por texto, não só por cor.
6. Reorganizar a tela inicial: uma ação principal, duas secundárias; a biblioteca documental passa a página própria.
7. Garantir, tela a tela, uma ação principal e no máximo duas secundárias; converter os excessos em botões terciários de texto.

**Etapa 3 — Linguagem e feedback**
8. Revisar todos os microtextos conforme o doc 13 (verbos curtos, convite em vez de instrução, nada de "obrigatório", nada de "meta").
9. Adicionar confirmações textuais discretas e não intrusivas ("Registro salvo. Você poderá editar depois.") e mensagens de erro que nunca responsabilizam a pessoa.
10. Acrescentar rótulo textual/ícone de selecionado em toda escolha, para não depender de cor.

**Etapa 4 — Ética visível (docs 00, 15, 16)**
11. Criar a página "Sobre o VIVA": propósito, limites da plataforma, orientação para procurar profissionais quando necessário.
12. Criar a página "Seus dados": o que é guardado, que tudo fica no dispositivo, botão para apagar tudo, sem dark pattern na confirmação.
13. Inserir, onde houver sugestão de percurso, a nota de origem: "Esta sugestão vem de regras simples, definidas neste protótipo. Você pode aceitar, ignorar ou modificar."

**Etapa 5 — Estados e acessibilidade**
14. Padronizar os sete estados (normal, hover, foco, ativo, desabilitado, carregando, erro) nos componentes reutilizáveis.
15. Passar em revisão de contraste, ordem de foco, navegação por teclado e alvos de toque (WCAG 2.2), incluindo `prefers-reduced-motion`.

### Nota técnica
Todo o trabalho fica em `src/styles.css`, `src/components/viva/*` e nos textos das rotas. Nenhuma regra de negócio, backend, autenticação ou IA é introduzida. As duas páginas novas da Etapa 4 são conteúdo estático derivado dos documentos, não funcionalidade.
