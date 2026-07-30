import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { Botao, Card } from "@/components/ds";
import {
  AcoesAutonomas,
  RegistroExperienciaCard,
} from "@/components/viva/humanos";
import { QuadroDoPercurso } from "@/components/viva/percurso/quadro";
import { objetivoPorId } from "@/lib/viva-jornada-dados";
import { jornada, useJornada } from "@/lib/viva-jornada";

export const Route = createFileRoute("/jornada/registro")({
  head: () => ({
    meta: [
      { title: "Registrar como foi — Percurso VIVA" },
      {
        name: "description",
        content:
          "Descreva a experiência com suas palavras. Sem avaliação, sem correção e sem classificação automática.",
      },
      { property: "og:title", content: "Registrar como foi — Percurso VIVA" },
      {
        property: "og:description",
        content: "O registro pertence à pessoa. Responder é sempre opcional.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Registro,
});

function Registro() {
  const j = useJornada();
  const navigate = useNavigate();
  const objetivo = objetivoPorId(j.objetivoId);
  const nome = objetivo?.nome ?? "Atividade";

  return (
    <QuadroDoPercurso
      titulo="Esta atividade chegou ao fim"
      finalidade="Agora você pode registrar como foi e decidir se gostaria de ajustar algo."
      voltarPara="/jornada/atividade"
      baixaEstimulacao={j.preparacao.baixaEstimulacao}
      depois="Depois do registro, você poderá observar a experiência em uma reflexão curta."
    >
      <RegistroExperienciaCard
        atividade={nome}
        onSalvar={(registro) => {
          jornada.guardarRegistro(
            {
              comoFoi: registro.comoFoi,
              emMinhasPalavras: registro.emMinhasPalavras,
              ajudou: registro.ajudou,
              dificultou: registro.dificultou,
              ajuste: registro.ajuste,
            },
            nome,
          );
          navigate({ to: "/jornada/reflexao" });
        }}
        onRegistrarDepois={() => {
          jornada.salvarParaDepois(nome);
          navigate({ to: "/jornada" });
        }}
      />

      <Card variante="informativo" titulo="Outras possibilidades agora">
        <AcoesAutonomas
          secundarias={
            <>
              <Botao
                variante="terciario"
                tamanho="compacto"
                onClick={() => navigate({ to: "/jornada/atividade" })}
              >
                Revisar a atividade
              </Botao>
              <Botao
                variante="terciario"
                tamanho="compacto"
                onClick={() => navigate({ to: "/jornada" })}
              >
                Voltar ao início
              </Botao>
            </>
          }
          nota="Registrar depois também é uma escolha legítima."
        />
      </Card>
    </QuadroDoPercurso>
  );
}
