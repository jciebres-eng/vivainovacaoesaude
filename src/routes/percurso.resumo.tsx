import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { Botao, Card } from "@/components/ds";
import { AcoesAutonomas } from "@/components/viva/humanos";
import { QuadroDoPercurso } from "@/components/viva/percurso/quadro";
import { objetivoPorId } from "@/lib/viva-jornada-dados";
import { jornada, useJornada } from "@/lib/viva-jornada";

export const Route = createFileRoute("/percurso/resumo")({
  head: () => ({
    meta: [
      { title: "Sobre esta atividade — Percurso VIVA" },
      {
        name: "description",
        content:
          "Resumo breve do objetivo escolhido: para que serve, quantas etapas tem e como interromper quando quiser.",
      },
      { property: "og:title", content: "Sobre esta atividade — Percurso VIVA" },
      {
        property: "og:description",
        content: "Saber o que vem antes de começar torna o começo mais previsível.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ResumoDoObjetivo,
});

function ResumoDoObjetivo() {
  const j = useJornada();
  const navigate = useNavigate();
  const objetivo = objetivoPorId(j.objetivoId);

  if (!objetivo) {
    return (
      <QuadroDoPercurso
        titulo="Nenhum objetivo escolhido"
        finalidade="Você pode escolher uma situação para preparar quando quiser."
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

  return (
    <QuadroDoPercurso
      titulo={objetivo.nome}
      finalidade={objetivo.paraQue}
      voltarPara="/percurso/objetivo"
      baixaEstimulacao={j.preparacao.baixaEstimulacao}
      depois="Depois deste resumo, você verá a tela de preparação, com materiais, ambiente e estratégias."
    >
      <Card variante="informativo" titulo="O que esperar">
        <dl className="space-y-3 viva-apoio text-text-secondary">
          <div>
            <dt className="viva-rotulo text-text-primary">Etapas</dt>
            <dd>{objetivo.etapasPrevistas} etapas breves.</dd>
          </div>
          <div>
            <dt className="viva-rotulo text-text-primary">Duração estimada</dt>
            <dd>{objetivo.duracao}.</dd>
          </div>
          <div>
            <dt className="viva-rotulo text-text-primary">Interromper</dt>
            <dd>Pode ser interrompida a qualquer momento, sem perder nada.</dd>
          </div>
          <div>
            <dt className="viva-rotulo text-text-primary">Ajustar</dt>
            <dd>
              Você pode mudar o ritmo, reduzir o texto e ativar baixa
              estimulação na preparação.
            </dd>
          </div>
        </dl>

        <AcoesAutonomas
          principal={
            <Botao
              variante="principal"
              onClick={() => {
                jornada.irPara("preparacao");
                navigate({ to: "/percurso/preparacao" });
              }}
            >
              Preparar esta atividade
            </Botao>
          }
          secundarias={
            <>
              <Botao
                variante="terciario"
                tamanho="compacto"
                onClick={() => navigate({ to: "/percurso/objetivo" })}
              >
                Escolher outro objetivo
              </Botao>
              <Botao
                variante="terciario"
                tamanho="compacto"
                onClick={() => {
                  jornada.salvarParaDepois(objetivo.nome);
                  navigate({ to: "/percurso" });
                }}
              >
                Salvar para depois
              </Botao>
            </>
          }
        />
      </Card>
    </QuadroDoPercurso>
  );
}
