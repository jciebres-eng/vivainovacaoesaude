import { createFileRoute } from "@tanstack/react-router";

import { Botao, BotaoLink, Card, IndicadorDeEstado, Nota } from "@/components/ds";
import { AcoesAutonomas } from "@/components/viva/humanos";
import { QuadroDoPercurso } from "@/components/viva/percurso/quadro";
import {
  dataLegivel,
  jornada,
  rotulosDeEstadoDoRegistro,
  useJornada,
  type EstadoDoRegistro,
} from "@/lib/viva-jornada";

export const Route = createFileRoute("/percurso/linha-do-tempo")({
  head: () => ({
    meta: [
      { title: "Meu percurso — Linha do tempo VIVA" },
      {
        name: "description",
        content:
          "Registro pessoal do percurso: preparado, iniciado, pausado, registrado, encerrado ou retomado. Sem ranking e sem relatório de desempenho.",
      },
      { property: "og:title", content: "Meu percurso — Linha do tempo VIVA" },
      {
        property: "og:description",
        content: "Um registro seu, sem métricas de produtividade.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LinhaDoTempoDoPercurso,
});

/** Traduz o vocabulário do percurso para os indicadores do design system. */
const aparencia: Record<
  EstadoDoRegistro,
  "em-preparacao" | "em-andamento" | "pausado" | "concluido" | "retomar"
> = {
  preparado: "em-preparacao",
  iniciado: "em-andamento",
  pausado: "pausado",
  registrado: "concluido",
  encerrado: "concluido",
  retomado: "retomar",
};

function LinhaDoTempoDoPercurso() {
  const j = useJornada();
  const eventos = [...j.linhaDoTempo].reverse();

  return (
    <QuadroDoPercurso
      titulo="Meu percurso"
      finalidade="Um registro pessoal do que aconteceu. Não é relatório, ranking nem medida de produtividade."
      voltarPara="/percurso"
      baixaEstimulacao={j.preparacao.baixaEstimulacao}
    >
      {eventos.length === 0 ? (
        <Card
          variante="informativo"
          titulo="Ainda não há registros"
          descricao="Quando você começar um percurso, o que acontecer aparecerá aqui."
        >
          <BotaoLink to="/percurso" variante="principal">
            Ir para o início do percurso
          </BotaoLink>
        </Card>
      ) : (
        <ol className="space-y-3">
          {eventos.map((e) => (
            <li key={e.id}>
              <Card variante="registro" compacto>
                <div className="flex flex-wrap items-center gap-3">
                  <IndicadorDeEstado
                    estado={aparencia[e.estado]}
                    texto={rotulosDeEstadoDoRegistro[e.estado]}
                  />
                  <span className="viva-legenda text-text-secondary">
                    {dataLegivel(e.quando)}
                  </span>
                </div>
                <p className="mt-2 viva-rotulo text-text-primary">{e.titulo}</p>
                {e.detalhe ? (
                  <p className="viva-legenda text-text-secondary">
                    {e.detalhe}
                  </p>
                ) : null}
              </Card>
            </li>
          ))}
        </ol>
      )}

      <Card variante="informativo" titulo="Seus dados">
        <Nota>
          Tudo aqui fica somente neste navegador. Nada é enviado, comparado ou
          analisado.
        </Nota>
        <AcoesAutonomas
          secundarias={
            <>
              <Botao
                variante="terciario"
                tamanho="compacto"
                onClick={() => jornada.reiniciarPercurso()}
              >
                Reiniciar o percurso
              </Botao>
              <Botao
                variante="terciario"
                tamanho="compacto"
                onClick={() => jornada.apagarTudo()}
              >
                Apagar os dados demonstrativos
              </Botao>
            </>
          }
        />
      </Card>
    </QuadroDoPercurso>
  );
}
