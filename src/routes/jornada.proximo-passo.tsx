import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { Botao, Card, Nota } from "@/components/ds";
import { AcoesAutonomas, ProximoPassoCard } from "@/components/viva/humanos";
import { QuadroDoPercurso } from "@/components/viva/percurso/quadro";
import { objetivoPorId, passosDoPercurso } from "@/lib/viva-jornada-dados";
import { jornada, useJornada } from "@/lib/viva-jornada";

export const Route = createFileRoute("/jornada/proximo-passo")({
  head: () => ({
    meta: [
      { title: "Próximo passo — Percurso VIVA" },
      {
        name: "description",
        content:
          "Uma possibilidade por vez para continuar o percurso. Escolher outra ou encerrar por hoje também são caminhos.",
      },
      { property: "og:title", content: "Próximo passo — Percurso VIVA" },
      {
        property: "og:description",
        content: "Qual é o próximo pequeno passo possível?",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ProximoPasso,
});

function ProximoPasso() {
  const j = useJornada();
  const navigate = useNavigate();
  const objetivo = objetivoPorId(j.objetivoId);
  const nome = objetivo?.nome ?? "Percurso";

  return (
    <QuadroDoPercurso
      titulo="Qual é o próximo pequeno passo possível?"
      finalidade="Esta é apenas uma possibilidade. Você pode escolher outra ou encerrar por agora."
      voltarPara="/jornada/reflexao"
      baixaEstimulacao={j.preparacao.baixaEstimulacao}
      depois="Ao escolher, o passo fica guardado no seu percurso. Nada é cobrado depois."
    >
      <ProximoPassoCard
        passos={passosDoPercurso}
        onComecar={(passo) => {
          jornada.escolherProximoPasso(passo.id, `${nome}: ${passo.titulo}`);
          if (passo.id === "encerrar") {
            jornada.encerrar(nome);
            navigate({ to: "/jornada/encerramento" });
          }
        }}
        onAdiar={() => {
          jornada.salvarParaDepois(nome);
          navigate({ to: "/jornada" });
        }}
        onRecusar={() => navigate({ to: "/jornada" })}
      />

      {j.proximoPassoId ? (
        <Card variante="experiencia" titulo="Passo guardado">
          <Nota>
            Este passo ficou registrado no seu percurso. Ele não vira meta, prazo nem lembrete
            automático.
          </Nota>
        </Card>
      ) : null}

      <Card variante="informativo" titulo="Outras saídas">
        <AcoesAutonomas
          secundarias={
            <>
              <Botao
                variante="terciario"
                tamanho="compacto"
                onClick={() => navigate({ to: "/jornada/objetivo" })}
              >
                Escolher por conta própria
              </Botao>
              <Botao
                variante="terciario"
                tamanho="compacto"
                onClick={() => {
                  jornada.encerrar(nome);
                  navigate({ to: "/jornada/encerramento" });
                }}
              >
                Encerrar por hoje
              </Botao>
            </>
          }
        />
      </Card>
    </QuadroDoPercurso>
  );
}
