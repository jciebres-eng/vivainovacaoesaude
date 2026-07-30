import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { Botao, Card } from "@/components/ds";
import { AcoesAutonomas } from "@/components/viva/humanos";
import { QuadroDoPercurso } from "@/components/viva/percurso/quadro";
import { ReflexaoPercursoCard } from "@/components/viva/percurso/reflexao-percurso-card";
import {
  estrategiasDaPreparacao,
  objetivoPorId,
} from "@/lib/viva-jornada-dados";
import { jornada, useJornada } from "@/lib/viva-jornada";

export const Route = createFileRoute("/jornada/reflexao")({
  head: () => ({
    meta: [
      { title: "Reflexão — Percurso VIVA" },
      {
        name: "description",
        content:
          "Um resumo descritivo do que você mesmo registrou, sem análise clínica, julgamento ou interpretação automatizada.",
      },
      { property: "og:title", content: "Reflexão — Percurso VIVA" },
      {
        property: "og:description",
        content: "Observar a própria experiência, no seu ritmo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Reflexao,
});

/** Frases montadas apenas com o que a pessoa registrou — sem inferência. */
function montarResumo(
  registro: ReturnType<typeof useJornada>["registro"],
  respostas: Record<string, string>,
  estrategias: string[],
) {
  const frases: string[] = [];
  if (registro?.ajudou.length) {
    frases.push(`Você registrou que ajudou: ${registro.ajudou.join(", ")}.`);
  }
  if (registro?.dificultou.length) {
    frases.push(
      `Você registrou que dificultou: ${registro.dificultou.join(", ")}.`,
    );
  }
  if (registro?.emMinhasPalavras) {
    frases.push(`Com suas palavras: “${registro.emMinhasPalavras}”.`);
  }
  if (estrategias.length) {
    const nomes = estrategias
      .map((id) => estrategiasDaPreparacao.find((e) => e.id === id)?.rotulo)
      .filter(Boolean)
      .join(", ");
    if (nomes) frases.push(`Na preparação, você escolheu: ${nomes}.`);
  }
  const escritas = Object.values(respostas).filter(Boolean);
  escritas.forEach((r) => frases.push(`Você anotou durante a atividade: “${r}”.`));
  return frases;
}

function Reflexao() {
  const j = useJornada();
  const navigate = useNavigate();
  const objetivo = objetivoPorId(j.objetivoId);
  const nome = objetivo?.nome ?? "Atividade";

  const resumo = montarResumo(
    j.registro,
    j.atividade.respostas,
    j.preparacao.estrategias,
  );

  return (
    <QuadroDoPercurso
      titulo="Observar esta experiência"
      finalidade="Aqui aparece somente o que você registrou. A plataforma não interpreta nem classifica nada."
      voltarPara="/jornada/registro"
      baixaEstimulacao={j.preparacao.baixaEstimulacao}
      depois="Depois desta tela, você poderá escolher um próximo pequeno passo — ou encerrar por hoje."
    >
      <ReflexaoPercursoCard
        resumo={resumo}
        respostas={j.reflexao?.respostas}
        onGuardar={(respostas) => {
          jornada.guardarReflexao(respostas, nome);
          navigate({ to: "/jornada/proximo-passo" });
        }}
        onEditarRegistro={() => navigate({ to: "/jornada/registro" })}
        onPular={() => {
          jornada.irPara("proximo-passo");
          navigate({ to: "/jornada/proximo-passo" });
        }}
        onRemoverResumo={() => jornada.removerReflexao()}
      />

      <Card variante="informativo" titulo="Se preferir seguir agora">
        <AcoesAutonomas
          secundarias={
            <Botao
              variante="terciario"
              tamanho="compacto"
              onClick={() => {
                jornada.irPara("proximo-passo");
                navigate({ to: "/jornada/proximo-passo" });
              }}
            >
              Ir para o próximo passo
            </Botao>
          }
          nota="Refletir é opcional e não muda nada no que já ficou registrado."
        />
      </Card>
    </QuadroDoPercurso>
  );
}
