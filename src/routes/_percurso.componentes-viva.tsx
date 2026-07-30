import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Botao, Card } from "@/components/ds";
import { Screen, ScreenHeader, SectionCard } from "@/components/viva/screen";
import {
  CartaoDeAlternativas,
  CartaoDeDuvida,
  CartaoDeEstrategiaPessoal,
  CartaoDeProximoPasso,
  ContinuidadeDoPercurso,
  PreparacaoDeAtividade,
  ReflexaoPosExperiencia,
  RegistroDeDuvida,
  RegistroDeExperiencia,
  SemDuvidas,
  SemEstrategias,
  SemPreparacoes,
  SemProximoPasso,
  SemReflexoes,
  SemRegistros,
} from "@/components/viva/funcionais";
import { usePercurso } from "@/lib/viva-percurso";

export const Route = createFileRoute("/_percurso/componentes-viva")({
  head: () => ({
    meta: [
      { title: "Componentes do VIVA — blocos do percurso" },
      {
        name: "description",
        content:
          "Demonstração dos blocos de interação do VIVA: próximo passo, preparação, estratégias, registro, reflexão, dúvidas, alternativas e continuidade.",
      },
      { property: "og:title", content: "Componentes do VIVA — blocos do percurso" },
      {
        property: "og:description",
        content:
          "Todos os componentes funcionais do percurso, com dados fictícios guardados neste dispositivo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ComponentesVivaPage,
});

function ComponentesVivaPage() {
  const percurso = usePercurso();
  const [mostrarVazios, setMostrarVazios] = useState(false);

  const atividade = percurso.atividades[0];
  const experiencia = percurso.experiencias[0];
  const estrategia = percurso.estrategias[0];
  const duvida = percurso.duvidas[0];
  const [alternativa, setAlternativa] = useState<string | undefined>();

  return (
    <>
      <ScreenHeader
        title="Componentes do VIVA"
        intro="Uma página de demonstração. Cada bloco abaixo funciona de verdade e guarda o que você escreve apenas neste dispositivo."
      />

      <Screen>
        <SectionCard
          title="Como usar esta página"
          hint="Nada aqui é enviado para fora do seu aparelho."
        >
          <p className="viva-apoio text-text-primary">
            Você pode escrever, salvar e apagar à vontade. Se quiser recomeçar,
            restaure os dados de demonstração.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Botao onClick={() => setMostrarVazios((v) => !v)}>
              {mostrarVazios
                ? "Ver componentes com conteúdo"
                : "Ver como fica quando está vazio"}
            </Botao>
            <Botao variante="terciario" onClick={percurso.restaurarDemonstracao}>
              Restaurar dados de demonstração
            </Botao>
          </div>
        </SectionCard>

        {mostrarVazios ? (
          <div className="space-y-6">
            <SemProximoPasso />
            <SemPreparacoes />
            <SemEstrategias />
            <SemRegistros />
            <SemReflexoes />
            <SemDuvidas />
          </div>
        ) : (
          <div className="space-y-6">
            <Bloco titulo="Cartão de próximo passo">
              {atividade ? (
                <CartaoDeProximoPasso
                  atividade={atividade}
                  onAcaoPrincipal={() =>
                    percurso.definirEstadoDaAtividade(atividade.id, "em-preparacao")
                  }
                  onAcaoSecundaria={() =>
                    percurso.definirEstadoDaAtividade(atividade.id, "pausado")
                  }
                />
              ) : (
                <SemProximoPasso />
              )}
            </Bloco>

            <Bloco titulo="Preparação de atividade">
              {atividade ? (
                <PreparacaoDeAtividade atividade={atividade} />
              ) : (
                <SemPreparacoes />
              )}
            </Bloco>

            <Bloco titulo="Estratégia pessoal">
              {estrategia ? (
                <CartaoDeEstrategiaPessoal
                  estrategia={estrategia}
                  onAlternarMarcador={(marcador) =>
                    percurso.salvarEstrategia({
                      ...estrategia,
                      [marcador]: !estrategia[marcador],
                    })
                  }
                  onRemover={() => percurso.removerEstrategia(estrategia.id)}
                />
              ) : (
                <SemEstrategias />
              )}
            </Bloco>

            <Bloco titulo="Registro de experiência">
              <RegistroDeExperiencia onSalvar={percurso.salvarExperiencia} />
            </Bloco>

            <Bloco titulo="Reflexão pós-experiência">
              {experiencia ? (
                <ReflexaoPosExperiencia
                  experiencia={experiencia}
                  onSalvar={percurso.salvarReflexao}
                />
              ) : (
                <SemReflexoes />
              )}
            </Bloco>

            <Bloco titulo="Registro de dúvida">
              <RegistroDeDuvida onSalvar={percurso.salvarDuvida} />
              {duvida ? (
                <div className="mt-4">
                  <CartaoDeDuvida
                    duvida={duvida}
                    onArquivar={() =>
                      percurso.salvarDuvida({ ...duvida, status: "arquivada" })
                    }
                  />
                </div>
              ) : (
                <div className="mt-4">
                  <SemDuvidas />
                </div>
              )}
            </Bloco>

            <Bloco titulo="Alternativa de percurso">
              {atividade ? (
                <CartaoDeAlternativas
                  atividade={atividade}
                  escolhida={alternativa}
                  onEscolher={setAlternativa}
                  onInterromper={() =>
                    percurso.definirEstadoDaAtividade(atividade.id, "pausado")
                  }
                  onRetomar={() =>
                    percurso.definirEstadoDaAtividade(atividade.id, "disponivel")
                  }
                />
              ) : (
                <SemProximoPasso />
              )}
            </Bloco>

            <Bloco titulo="Continuidade do percurso">
              <ContinuidadeDoPercurso
                ultimaAtividade={percurso.atividades.find(
                  (a) => a.id === percurso.continuidade.ultimaAtividadeId,
                )}
                preparacaoSalva={percurso.preparacoes[0]}
                experienciaAguardandoReflexao={percurso.experiencias.find(
                  (e) => !e.reflexaoId,
                )}
                duvidaRegistrada={duvida}
                estrategiaAdicionada={estrategia}
                proximoPasso={percurso.atividades[1]}
              />
            </Bloco>
          </div>
        )}
      </Screen>
    </>
  );
}

function Bloco({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section aria-label={titulo} className="space-y-3">
      <h2 className="viva-titulo-secao text-text-primary">{titulo}</h2>
      {children}
    </section>
  );
}
