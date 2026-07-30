import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { Botao, Card } from "@/components/ds";
import { AcoesAutonomas, EscolhaAutonomaGroup, MeuMomentoCard } from "@/components/viva/humanos";
import { QuadroDoPercurso } from "@/components/viva/percurso/quadro";
import { necessidadeDeEstimulos, ritmosDoMomento } from "@/lib/viva-jornada-dados";
import { jornada, useJornada } from "@/lib/viva-jornada";

export const Route = createFileRoute("/jornada/momento")({
  head: () => ({
    meta: [
      { title: "Meu momento — Percurso VIVA" },
      {
        name: "description",
        content:
          "Reconheça seu momento antes de escolher uma atividade. Todas as respostas são opcionais e ficam só no seu dispositivo.",
      },
      { property: "og:title", content: "Meu momento — Percurso VIVA" },
      {
        property: "og:description",
        content: "Um espaço opcional para reconhecer como você está agora.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Momento,
});

function Momento() {
  const j = useJornada();
  const navigate = useNavigate();

  const seguir = () => {
    jornada.irPara("objetivo");
    navigate({ to: "/jornada/objetivo" });
  };

  return (
    <QuadroDoPercurso
      titulo="Meu momento"
      finalidade="Se quiser, reconheça como você está antes de escolher uma atividade."
      voltarPara="/jornada"
      baixaEstimulacao={j.preparacao.baixaEstimulacao}
      depois="Depois desta tela, você poderá escolher uma situação para preparar."
    >
      <MeuMomentoCard
        escolhas={{
          comoEstou: j.momento.comoEstou,
          energia: j.momento.energia,
          contexto: j.momento.contexto,
        }}
        onMudar={(e) => jornada.registrarMomento(e)}
        onPular={() => {
          jornada.pularMomento();
          seguir();
        }}
        salvo
      />

      <Card
        variante="informativo"
        titulo="Preferência de ritmo"
        descricao="Isto serve apenas para adaptar esta demonstração. Nada aqui indica diagnóstico, risco ou estado psicológico."
      >
        <div className="space-y-6">
          <EscolhaAutonomaGroup
            titulo="Como você prefere seguir hoje?"
            opcoes={ritmosDoMomento}
            valor={j.momento.ritmo}
            onEscolher={(id) =>
              jornada.registrarMomento({
                ritmo: j.momento.ritmo === id ? null : id,
              })
            }
            colunas="uma"
          />

          <EscolhaAutonomaGroup
            titulo="Necessidade de redução de estímulos"
            opcoes={necessidadeDeEstimulos}
            valor={j.momento.estimulos}
            onEscolher={(id) => {
              jornada.registrarMomento({
                estimulos: j.momento.estimulos === id ? null : id,
              });
              if (id === "reduzir") {
                jornada.ajustarPreparacao({ baixaEstimulacao: true });
              }
            }}
            colunas="uma"
            nota="Se você escolher reduzir estímulos, a interface fica mais simples daqui em diante."
          />
        </div>
      </Card>

      <AcoesAutonomas
        principal={
          <Botao variante="principal" onClick={seguir}>
            Escolher um objetivo
          </Botao>
        }
        secundarias={
          <Botao
            variante="terciario"
            tamanho="compacto"
            onClick={() => {
              jornada.pularMomento();
              seguir();
            }}
          >
            Pular esta etapa
          </Botao>
        }
        nota="Nenhuma resposta é obrigatória e nada disso é interpretado pela plataforma."
      />
    </QuadroDoPercurso>
  );
}
