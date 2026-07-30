import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { Botao, BotaoLink, Card, Nota } from "@/components/ds";
import {
  AcoesAutonomas,
  InformacaoSeguraCard,
  RetomarAtividadeCard,
} from "@/components/viva/humanos";
import { QuadroDoPercurso } from "@/components/viva/percurso/quadro";
import {
  demonstracoesFuturas,
  etapasDaAtividade,
  objetivoPorId,
  pessoaDoPercurso,
} from "@/lib/viva-jornada-dados";
import { jornada, useJornada } from "@/lib/viva-jornada";

export const Route = createFileRoute("/jornada/")({
  head: () => ({
    meta: [
      { title: "Percurso — VIVA" },
      {
        name: "description",
        content:
          "Entrada do percurso do VIVA: reconheça seu momento, escolha um passo possível e continue no seu ritmo.",
      },
      { property: "og:title", content: "Percurso — VIVA" },
      {
        property: "og:description",
        content:
          "Um percurso humano: reconhecer o momento, escolher, preparar, experimentar, registrar e ajustar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Entrada,
});

function Entrada() {
  const j = useJornada();
  const navigate = useNavigate();
  const objetivo = objetivoPorId(j.objetivoId);
  const emAberto = objetivo && j.etapa !== "encerramento";
  const etapas = objetivo ? (etapasDaAtividade[objetivo.id] ?? []) : [];
  const anterior = etapas[Math.max(0, j.atividade.etapaAtual - 1)];

  return (
    <QuadroDoPercurso
      titulo={`Olá, ${pessoaDoPercurso.nome}`}
      finalidade="Você pode continuar de onde parou ou escolher outro caminho."
      baixaEstimulacao={j.preparacao.baixaEstimulacao}
      depois="Em seguida, se quiser, você poderá dizer como está hoje. Responder é sempre opcional."
    >
      {emAberto ? (
        <RetomarAtividadeCard
          nome={objetivo.nome}
          ultimaEtapa={anterior ? anterior.titulo : "Preparação"}
          resumo={
            j.atividade.estado === "pausada"
              ? "Você pausou este percurso. Nada foi perdido."
              : "Você começou a organizar este objetivo."
          }
          onContinuar={() => navigate({ to: rotaDaEtapa(j.etapa) })}
          onRevisar={() => navigate({ to: "/jornada/atividade" })}
          onRetomarDepois={() => jornada.salvarParaDepois(objetivo.nome)}
          onEncerrar={() => {
            jornada.encerrar(objetivo.nome);
            navigate({ to: "/jornada/encerramento" });
          }}
        />
      ) : (
        <Card
          variante="proximo-passo"
          titulo="Como você gostaria de começar?"
          descricao="Vamos encontrar um próximo passo possível para hoje."
        >
          <Nota>
            Você não precisa responder nada agora sobre como está ou sobre o que
            pretende fazer.
          </Nota>
          <AcoesAutonomas
            principal={
              <BotaoLink to="/jornada/momento" variante="principal">
                Começar um novo percurso
              </BotaoLink>
            }
            secundarias={
              <>
                <BotaoLink
                  to="/jornada/objetivo"
                  variante="terciario"
                  tamanho="compacto"
                >
                  Explorar possibilidades
                </BotaoLink>
                <BotaoLink to="/meu-momento" variante="terciario" tamanho="compacto">
                  Agora não
                </BotaoLink>
              </>
            }
            nota="Você pode mudar de caminho a qualquer momento."
          />
        </Card>
      )}

      <Card
        variante="informativo"
        titulo="Outras demonstrações"
        descricao="Estes caminhos ainda não estão abertos nesta versão."
      >
        <ul className="space-y-3">
          {demonstracoesFuturas.map((d) => (
            <li
              key={d.id}
              className="rounded-2xl border border-border-default bg-surface-default px-4 py-3"
            >
              <p className="viva-rotulo text-text-primary">{d.nome}</p>
              <p className="viva-legenda text-text-secondary">{d.apoio}</p>
            </li>
          ))}
        </ul>
      </Card>

      <InformacaoSeguraCard
        tipo="privacidade"
        titulo="Tudo fica neste dispositivo"
        mensagem="Esta é uma demonstração com dados fictícios. Nada é enviado para fora do seu navegador e nada é analisado."
        motivo="Você pode apagar todos os dados demonstrativos quando quiser."
        acao={
          <div className="flex flex-wrap gap-3">
            <BotaoLink
              to="/jornada/linha-do-tempo"
              variante="secundario"
              tamanho="compacto"
            >
              Ver meu percurso
            </BotaoLink>
            <Botao
              variante="terciario"
              tamanho="compacto"
              onClick={() => jornada.apagarTudo()}
            >
              Apagar os dados demonstrativos
            </Botao>
          </div>
        }
      />
    </QuadroDoPercurso>
  );
}

function rotaDaEtapa(etapa: string) {
  switch (etapa) {
    case "momento":
      return "/jornada/momento";
    case "objetivo":
      return "/jornada/objetivo";
    case "resumo":
      return "/jornada/resumo";
    case "preparacao":
      return "/jornada/preparacao";
    case "atividade":
      return "/jornada/atividade";
    case "registro":
      return "/jornada/registro";
    case "reflexao":
      return "/jornada/reflexao";
    case "proximo-passo":
      return "/jornada/proximo-passo";
    case "encerramento":
      return "/jornada/encerramento";
    default:
      return "/jornada";
  }
}
