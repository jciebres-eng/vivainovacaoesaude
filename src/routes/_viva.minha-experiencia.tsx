import { createFileRoute } from "@tanstack/react-router";

import { Botao } from "@/components/ds/botao";
import { Interruptor } from "@/components/ds/campos";
import { AvisoDeAjuste, GrupoDeOpcoes } from "@/components/viva/experiencia/controles";
import { Screen, ScreenHeader, SectionCard } from "@/components/viva/screen";
import { personas } from "@/lib/viva-data";
import {
  estrategiasSugeridas,
  rotulosDeCanal,
  useExperiencia,
  type CanalDeNotificacao,
} from "@/lib/viva-experiencia";

export const Route = createFileRoute("/_viva/minha-experiencia")({
  head: () => ({
    meta: [
      { title: "Minha experiência — ajustes do VIVA" },
      {
        name: "description",
        content:
          "Ajuste linguagem, quantidade de informação, ritmo, navegação, aparência, movimento e avisos. Tudo fica apenas neste dispositivo.",
      },
      { property: "og:title", content: "Minha experiência — ajustes do VIVA" },
      {
        property: "og:description",
        content:
          "O VIVA se adapta a você. As escolhas valem imediatamente e podem ser desfeitas quando quiser.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MinhaExperienciaScreen,
});

const canais = Object.keys(rotulosDeCanal) as CanalDeNotificacao[];

function MinhaExperienciaScreen() {
  const {
    preferencias: p,
    ajustar,
    alternarEstrategia,
    alternarCanal,
    restaurarPadroes,
    limparPreferencias,
    aviso,
    dispensarAviso,
  } = useExperiencia();

  return (
    <Screen>
      <ScreenHeader
        title="Minha experiência"
        intro="Aqui você decide como o VIVA se comporta com você. Nada muda sozinho, nada é deduzido do seu uso e tudo pode voltar atrás. As escolhas valem a partir de agora e ficam apenas neste dispositivo."
      />

      <AvisoDeAjuste mensagem={aviso} onFechar={dispensarAviso} />

      <SectionCard
        title="Como o VIVA fala com você"
        hint="Muda o tamanho e o detalhe dos textos. Nenhuma informação essencial é escondida."
      >
        <GrupoDeOpcoes
          legenda="Estilo de linguagem"
          opcoes={[
            {
              id: "essencial",
              rotulo: "Essencial",
              apoio: "Frases curtas e diretas.",
            },
            {
              id: "equilibrada",
              rotulo: "Equilibrada",
              apoio: "Explica o necessário, sem alongar.",
            },
            {
              id: "detalhada",
              rotulo: "Detalhada",
              apoio: "Mais contexto e exemplos.",
            },
          ]}
          valor={p.linguagem}
          onEscolher={(linguagem) =>
            ajustar({ linguagem }, "A forma de escrever mudou. O conteúdo continua o mesmo.")
          }
        />
      </SectionCard>

      <SectionCard
        title="Quanta informação aparece por vez"
        hint="Você pode ver menos agora e abrir o resto quando quiser."
      >
        <GrupoDeOpcoes
          legenda="Quantidade de informação"
          opcoes={[
            {
              id: "reduzida",
              rotulo: "Só o principal",
              apoio: "Uma ideia por bloco.",
            },
            {
              id: "intermediaria",
              rotulo: "Intermediária",
              apoio: "O principal e um pouco de apoio.",
            },
            {
              id: "completa",
              rotulo: "Completa",
              apoio: "Tudo visível de uma vez.",
            },
          ]}
          valor={p.densidade}
          onEscolher={(densidade) =>
            ajustar({ densidade }, "A quantidade de informação por tela foi ajustada.")
          }
        />
      </SectionCard>

      <SectionCard
        title="Seu ritmo"
        hint="O VIVA não tem prazo. Estimativas de tempo só aparecem se você pedir."
      >
        <div className="space-y-6">
          <GrupoDeOpcoes
            legenda="Tamanho dos passos"
            opcoes={[
              {
                id: "pequenos",
                rotulo: "Bem pequenos",
                apoio: "Uma coisa de cada vez.",
              },
              { id: "medios", rotulo: "Médios", apoio: "Poucas coisas juntas." },
              {
                id: "amplos",
                rotulo: "Mais amplos",
                apoio: "Vários itens na mesma tela.",
              },
            ]}
            valor={p.tamanhoDePasso}
            onEscolher={(tamanhoDePasso) =>
              ajustar({ tamanhoDePasso }, "O tamanho dos passos foi ajustado.")
            }
          />
          <GrupoDeOpcoes
            legenda="Como você prefere avançar"
            opcoes={[
              {
                id: "livre",
                rotulo: "No meu tempo",
                apoio: "Sem nenhuma referência de tempo.",
              },
              {
                id: "tranquilo",
                rotulo: "Com estimativa",
                apoio: "Mostra uma ideia de duração, sem cobrança.",
              },
              {
                id: "continuo",
                rotulo: "Seguido",
                apoio: "Uma etapa puxa a próxima automaticamente.",
              },
            ]}
            valor={p.ritmo}
            onEscolher={(ritmo) => ajustar({ ritmo }, "Seu ritmo foi ajustado. Nada tem prazo.")}
          />
        </div>
      </SectionCard>

      <SectionCard
        title="Como você quer circular pelo VIVA"
        hint="Você pode mudar de modo a qualquer momento."
      >
        <GrupoDeOpcoes
          colunas={1}
          legenda="Modo de navegação"
          opcoes={[
            {
              id: "guiado",
              rotulo: "Guiado",
              apoio: "O VIVA sugere sempre um próximo passo claro.",
            },
            {
              id: "exploracao",
              rotulo: "Exploração livre",
              apoio: "Você escolhe por onde ir, sem sugestão fixa.",
            },
            {
              id: "foco",
              rotulo: "Foco",
              apoio: "Mostra apenas o que você está fazendo agora e reduz o menu.",
            },
          ]}
          valor={p.navegacao}
          onEscolher={(navegacao) =>
            ajustar(
              { navegacao },
              navegacao === "foco"
                ? "Modo foco ativado. O menu ficou reduzido; nada foi removido."
                : "Seu modo de navegação foi ajustado.",
            )
          }
        />
      </SectionCard>

      <SectionCard
        title="Aparência"
        hint="Cores calmas, sem contrastes agressivos. Escolha o que cansa menos sua vista."
      >
        <div className="space-y-6">
          <GrupoDeOpcoes
            colunas={2}
            legenda="Tema"
            opcoes={[
              {
                id: "luminoso",
                rotulo: "Escuro luminoso",
                apoio: "Fundo profundo com acentos suaves.",
              },
              {
                id: "escuro-calmo",
                rotulo: "Escuro de baixa estimulação",
                apoio: "Sem brilho, sem fundos animados.",
              },
              { id: "claro", rotulo: "Claro diurno" },
              { id: "claro-suave", rotulo: "Claro suave", apoio: "Cor quase ausente." },
              {
                id: "contraste-escuro",
                rotulo: "Alto contraste escuro",
                apoio: "Bordas fortes, sem transparência.",
              },
              {
                id: "contraste-claro",
                rotulo: "Alto contraste claro",
                apoio: "Bordas fortes, sem transparência.",
              },
              {
                id: "automatico",
                rotulo: "Como no meu aparelho",
                apoio: "Segue a preferência do sistema.",
              },
            ]}
            valor={p.aparencia.tema}
            onEscolher={(tema) => ajustar({ aparencia: { tema } }, "A aparência foi ajustada.")}
          />
          <GrupoDeOpcoes
            colunas={2}
            legenda="Intensidade do brilho"
            opcoes={[
              { id: "sem", rotulo: "Sem brilho" },
              { id: "discreto", rotulo: "Discreto" },
              { id: "equilibrado", rotulo: "Equilibrado" },
              { id: "luminoso", rotulo: "Luminoso" },
            ]}
            valor={p.aparencia.brilho}
            onEscolher={(brilho) => ajustar({ aparencia: { brilho } }, "O brilho foi ajustado.")}
          />
          <GrupoDeOpcoes
            colunas={3}
            legenda="Transparência"
            opcoes={[
              { id: "sem", rotulo: "Sem" },
              { id: "discreta", rotulo: "Discreta" },
              { id: "moderada", rotulo: "Moderada" },
            ]}
            valor={p.aparencia.transparencia}
            onEscolher={(transparencia) =>
              ajustar({ aparencia: { transparencia } }, "A transparência foi ajustada.")
            }
          />

          <GrupoDeOpcoes
            colunas={2}
            legenda="Contraste"
            opcoes={[
              { id: "padrao", rotulo: "Padrão" },
              { id: "aumentado", rotulo: "Mais definido" },
            ]}
            valor={p.aparencia.contraste}
            onEscolher={(contraste) =>
              ajustar({ aparencia: { contraste } }, "O contraste foi ajustado.")
            }
          />
          <GrupoDeOpcoes
            colunas={2}
            legenda="Tamanho do texto"
            opcoes={[
              { id: "padrao", rotulo: "Padrão" },
              { id: "ampliada", rotulo: "Ampliado" },
            ]}
            valor={p.aparencia.fonte}
            onEscolher={(fonte) => ajustar({ aparencia: { fonte } }, "O tamanho do texto mudou.")}
          />
          <GrupoDeOpcoes
            legenda="Espaço entre os blocos"
            opcoes={[
              { id: "compacto", rotulo: "Compacto" },
              { id: "confortavel", rotulo: "Confortável" },
              { id: "ampliado", rotulo: "Bem espaçado" },
            ]}
            valor={p.aparencia.espacamento}
            onEscolher={(espacamento) =>
              ajustar({ aparencia: { espacamento } }, "O espaçamento foi ajustado.")
            }
          />
          <GrupoDeOpcoes
            colunas={2}
            legenda="Cantos das superfícies"
            opcoes={[
              { id: "suaves", rotulo: "Arredondados" },
              { id: "discretos", rotulo: "Mais retos" },
            ]}
            valor={p.aparencia.cantos}
            onEscolher={(cantos) =>
              ajustar({ aparencia: { cantos } }, "O formato dos cantos mudou.")
            }
          />
        </div>
      </SectionCard>

      <SectionCard title="Movimento" hint="Se animações incomodam, você pode desligar tudo.">
        <div className="space-y-5">
          <Interruptor
            rotulo="Reduzir animações"
            apoio="Menos movimento na tela."
            valor={p.movimento.reduzirAnimacoes}
            onToggle={() =>
              ajustar(
                {
                  movimento: {
                    reduzirAnimacoes: !p.movimento.reduzirAnimacoes,
                  },
                },
                "Sua preferência de movimento foi aplicada.",
              )
            }
          />
          <Interruptor
            rotulo="Remover transições"
            apoio="As mudanças de tela acontecem sem efeito."
            valor={p.movimento.removerTransicoes}
            onToggle={() =>
              ajustar(
                {
                  movimento: {
                    removerTransicoes: !p.movimento.removerTransicoes,
                  },
                },
                "Sua preferência de transições foi aplicada.",
              )
            }
          />
          <Interruptor
            rotulo="Sem efeitos decorativos"
            apoio="Sem sombras, brilhos ou desfoques."
            valor={p.movimento.semEfeitosDecorativos}
            onToggle={() =>
              ajustar(
                {
                  movimento: {
                    semEfeitosDecorativos: !p.movimento.semEfeitosDecorativos,
                  },
                },
                "Os efeitos decorativos foram ajustados.",
              )
            }
          />
        </div>
      </SectionCard>

      <SectionCard
        title="Sons e vibração"
        hint="O VIVA começa em silêncio. Só emite som se você pedir."
      >
        <div className="space-y-5">
          <GrupoDeOpcoes
            colunas={2}
            legenda="Sons da interface"
            opcoes={[
              { id: "sem-sons", rotulo: "Sem sons" },
              { id: "discretos", rotulo: "Sons discretos" },
            ]}
            valor={p.sons.modo}
            onEscolher={(modo) =>
              ajustar({ sons: { modo } }, "Sua preferência de som foi aplicada.")
            }
          />
          <Interruptor
            rotulo="Vibração leve ao confirmar"
            apoio="Depende do seu aparelho."
            valor={p.sons.feedbackTatil}
            onToggle={() =>
              ajustar(
                { sons: { feedbackTatil: !p.sons.feedbackTatil } },
                "Sua preferência de vibração foi aplicada.",
              )
            }
          />
        </div>
      </SectionCard>

      <SectionCard
        title="Avisos"
        hint="Nesta demonstração os avisos são apenas simulados: nada é enviado para fora do aparelho."
      >
        <div className="space-y-6">
          <GrupoDeOpcoes
            colunas={2}
            legenda="Quantidade de avisos"
            opcoes={[
              {
                id: "silencioso",
                rotulo: "Nenhum",
                apoio: "O VIVA só aparece quando você abre.",
              },
              {
                id: "essencial",
                rotulo: "Só o essencial",
                apoio: "Continuidade e preparação.",
              },
              { id: "moderado", rotulo: "Moderado" },
              {
                id: "personalizado",
                rotulo: "Eu escolho",
                apoio: "Ativa a lista abaixo.",
              },
            ]}
            valor={p.notificacoes.intensidade}
            onEscolher={(intensidade) =>
              ajustar({ notificacoes: { intensidade } }, "Sua preferência de avisos foi aplicada.")
            }
          />
          {p.notificacoes.intensidade === "personalizado" ? (
            <div className="space-y-5">
              {canais.map((canal) => (
                <Interruptor
                  key={canal}
                  rotulo={rotulosDeCanal[canal]}
                  valor={p.notificacoes.canais[canal]}
                  onToggle={() => alternarCanal(canal)}
                />
              ))}
            </div>
          ) : null}
        </div>
      </SectionCard>

      <SectionCard
        title="Minhas estratégias"
        hint="Só aparecem quando fizerem sentido. São possibilidades, nunca obrigações."
      >
        <ul className="space-y-4">
          {estrategiasSugeridas.map((e) => (
            <li key={e.id}>
              <Interruptor
                rotulo={e.nome}
                apoio={e.apoio}
                valor={p.estrategias.includes(e.id)}
                textoLigado="Na minha lista"
                textoDesligado="Adicionar"
                onToggle={() => alternarEstrategia(e.id)}
              />
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="Leitura" hint="Vale para a biblioteca e para os textos longos.">
        <div className="space-y-6">
          <GrupoDeOpcoes
            legenda="Largura das linhas"
            opcoes={[
              { id: "curtas", rotulo: "Curtas" },
              { id: "confortavel", rotulo: "Confortável" },
              { id: "longas", rotulo: "Longas" },
            ]}
            valor={p.leitura.largura}
            onEscolher={(largura) =>
              ajustar({ leitura: { largura } }, "A largura da leitura mudou.")
            }
          />
          <Interruptor
            rotulo="Destacar subtítulos"
            apoio="Facilita achar onde parou."
            valor={p.leitura.destacarSubtitulos}
            onToggle={() =>
              ajustar(
                {
                  leitura: {
                    destacarSubtitulos: !p.leitura.destacarSubtitulos,
                  },
                },
                "Sua preferência de leitura foi aplicada.",
              )
            }
          />
          <Interruptor
            rotulo="Ocultar blocos complementares"
            apoio="Você pode reabrir a qualquer momento."
            valor={p.leitura.ocultarComplementares}
            onToggle={() =>
              ajustar(
                {
                  leitura: {
                    ocultarComplementares: !p.leitura.ocultarComplementares,
                  },
                },
                "Os blocos complementares ficaram recolhidos. Nada foi apagado.",
              )
            }
          />
        </div>
      </SectionCard>

      <SectionCard
        title="Apoio durante as atividades"
        hint="Escolha o tipo de ajuda que você quer ver."
      >
        <div className="space-y-5">
          <Interruptor
            rotulo="Mostrar exemplos"
            valor={p.apoio.exemplos}
            onToggle={() =>
              ajustar(
                { apoio: { exemplos: !p.apoio.exemplos } },
                "Sua preferência de apoio foi aplicada.",
              )
            }
          />
          <Interruptor
            rotulo="Mostrar dicas curtas"
            valor={p.apoio.dicas}
            onToggle={() =>
              ajustar(
                { apoio: { dicas: !p.apoio.dicas } },
                "Sua preferência de apoio foi aplicada.",
              )
            }
          />
          <Interruptor
            rotulo="Lembrar minhas estratégias antes de começar"
            valor={p.apoio.lembretesDeEstrategia}
            onToggle={() =>
              ajustar(
                {
                  apoio: {
                    lembretesDeEstrategia: !p.apoio.lembretesDeEstrategia,
                  },
                },
                "Sua preferência de apoio foi aplicada.",
              )
            }
          />
          <Interruptor
            rotulo="Mostrar resumo ao final"
            valor={p.apoio.resumos}
            onToggle={() =>
              ajustar(
                { apoio: { resumos: !p.apoio.resumos } },
                "Sua preferência de apoio foi aplicada.",
              )
            }
          />
        </div>
      </SectionCard>

      <SectionCard
        title="Perfil da demonstração"
        hint="Nesta versão os dados são fictícios e servem apenas para mostrar o funcionamento."
      >
        <GrupoDeOpcoes
          colunas={2}
          legenda="Perfil em uso"
          opcoes={personas.map((persona) => ({
            id: persona.id,
            rotulo: persona.nome,
            apoio: persona.tema,
          }))}
          valor={p.demonstracao.perfil}
          onEscolher={(perfil) =>
            ajustar({ demonstracao: { perfil } }, "O perfil da demonstração foi trocado.")
          }
        />
      </SectionCard>

      <SectionCard title="O que o VIVA faz com essas escolhas">
        <div className="space-y-3 text-text-secondary">
          <p>
            As preferências são usadas apenas para organizar a interface. Elas não geram avaliação,
            diagnóstico, pontuação, comparação com outras pessoas nem previsão sobre você.
          </p>
          <p>
            Nada é inferido a partir do seu comportamento: o VIVA só considera o que você marcou
            nesta página. Nenhuma configuração muda sozinha.
          </p>
          <p>
            Tudo fica guardado apenas neste dispositivo. Se você limpar os dados do navegador, as
            escolhas desaparecem — e isso é esperado.
          </p>
        </div>
      </SectionCard>

      <SectionCard
        title="Recomeçar"
        hint="Voltar atrás é sempre possível e não apaga o que você registrou no percurso."
      >
        <div className="flex flex-wrap gap-3">
          <Botao variante="secundario" onClick={restaurarPadroes}>
            Voltar ao padrão inicial
          </Botao>
          <Botao variante="terciario" onClick={limparPreferencias}>
            Apagar minhas preferências deste aparelho
          </Botao>
        </div>
      </SectionCard>
    </Screen>
  );
}
