import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { Botao, Card, Interruptor, Nota } from "@/components/ds";
import {
  AcoesAutonomas,
  EscolhaAutonomaGroup,
  PreparacaoAtividadeCard,
} from "@/components/viva/humanos";
import { QuadroDoPercurso } from "@/components/viva/percurso/quadro";
import {
  estrategiasDaPreparacao,
  objetivoPorId,
  preparacaoDoObjetivo,
  ritmosDaAtividade,
} from "@/lib/viva-jornada-dados";
import { jornada, useJornada } from "@/lib/viva-jornada";

export const Route = createFileRoute("/percurso/preparacao")({
  head: () => ({
    meta: [
      { title: "Preparação — Percurso VIVA" },
      {
        name: "description",
        content:
          "Finalidade, duração, materiais, ambiente e estratégias antes de começar. Comece só quando estiver pronto.",
      },
      { property: "og:title", content: "Preparação — Percurso VIVA" },
      {
        property: "og:description",
        content: "Previsibilidade antes da ação, no ritmo que você escolher.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Preparacao,
});

function Preparacao() {
  const j = useJornada();
  const navigate = useNavigate();
  const objetivo = objetivoPorId(j.objetivoId);
  const detalhes = objetivo
    ? preparacaoDoObjetivo[objetivo.id as keyof typeof preparacaoDoObjetivo]
    : undefined;

  if (!objetivo || !detalhes) {
    return (
      <QuadroDoPercurso
        titulo="Nada em preparação"
        finalidade="Escolha um objetivo para ver a preparação."
        voltarPara="/percurso"
      >
        <Card variante="informativo">
          <Botao
            variante="principal"
            onClick={() => navigate({ to: "/percurso/objetivo" })}
          >
            Escolher um objetivo
          </Botao>
        </Card>
      </QuadroDoPercurso>
    );
  }

  const baixa = j.preparacao.baixaEstimulacao;

  return (
    <QuadroDoPercurso
      titulo="Antes de começar"
      finalidade="Saber o que vem pela frente costuma deixar o começo mais tranquilo."
      voltarPara="/percurso/resumo"
      aoSalvarParaDepois={() => {
        jornada.salvarParaDepois(objetivo.nome);
        navigate({ to: "/percurso" });
      }}
      baixaEstimulacao={baixa}
      depois={detalhes.depois}
    >
      <PreparacaoAtividadeCard
        atividade={{
          nome: detalhes.nome,
          finalidade: detalhes.finalidade,
          descricao: detalhes.descricao,
          etapas: detalhes.etapas,
          duracao: detalhes.duracao,
          materiais: [...detalhes.materiais],
          ambiente: [...detalhes.ambiente],
          depois: detalhes.depois,
        }}
        estrategias={estrategiasDaPreparacao}
        onComecar={(escolhidas) => {
          jornada.ajustarPreparacao({ estrategias: escolhidas });
          jornada.comecarAtividade(objetivo.nome);
          navigate({ to: "/percurso/atividade" });
        }}
        onSalvarParaDepois={() => {
          jornada.salvarParaDepois(objetivo.nome);
          navigate({ to: "/percurso" });
        }}
        onVoltar={() => navigate({ to: "/percurso/resumo" })}
      />

      {!baixa ? (
        <Card
          variante="informativo"
          titulo="Ajustar esta preparação"
          descricao="Estas escolhas mudam apenas como o conteúdo aparece para você."
        >
          <div className="space-y-6">
            <EscolhaAutonomaGroup
              titulo="Ritmo das etapas"
              opcoes={ritmosDaAtividade}
              valor={j.preparacao.ritmo}
              onEscolher={(id) =>
                jornada.ajustarPreparacao({
                  ritmo: id as "breve" | "padrao" | "partes",
                })
              }
              colunas="uma"
              nota={null}
            />

            <Interruptor
              rotulo="Menos texto por tela"
              apoio="Mostra apenas a instrução essencial."
              valor={j.preparacao.textoReduzido}
              onToggle={() =>
                jornada.ajustarPreparacao({
                  textoReduzido: !j.preparacao.textoReduzido,
                })
              }
            />

            <Interruptor
              rotulo="Modo de baixa estimulação"
              apoio="Menos elementos visíveis, sem animações não essenciais, mantendo o contraste."
              valor={j.preparacao.baixaEstimulacao}
              onToggle={() =>
                jornada.ajustarPreparacao({
                  baixaEstimulacao: !j.preparacao.baixaEstimulacao,
                })
              }
            />

            <Interruptor
              rotulo="Lembrar da possibilidade de pausa"
              apoio="Mantém um lembrete discreto de pausa em cada etapa."
              valor={j.preparacao.precisaPausa}
              onToggle={() =>
                jornada.ajustarPreparacao({
                  precisaPausa: !j.preparacao.precisaPausa,
                })
              }
            />
          </div>
        </Card>
      ) : (
        <Card variante="informativo" titulo="Modo de baixa estimulação ativado">
          <Nota>
            A interface está mais simples. Você pode desativar quando quiser.
          </Nota>
          <AcoesAutonomas
            secundarias={
              <Botao
                variante="terciario"
                tamanho="compacto"
                onClick={() =>
                  jornada.ajustarPreparacao({ baixaEstimulacao: false })
                }
              >
                Desativar baixa estimulação
              </Botao>
            }
          />
        </Card>
      )}

      <AcoesAutonomas
        principal={
          <Botao
            variante="principal"
            onClick={() => {
              jornada.comecarAtividade(objetivo.nome);
              navigate({ to: "/percurso/atividade" });
            }}
          >
            Começar quando estiver pronto
          </Botao>
        }
        secundarias={
          <Botao
            variante="terciario"
            tamanho="compacto"
            onClick={() => navigate({ to: "/percurso/resumo" })}
          >
            Voltar
          </Botao>
        }
        nota="Nada começa sozinho: a atividade só inicia quando você escolher."
      />
    </QuadroDoPercurso>
  );
}
