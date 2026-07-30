import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { Botao, BotaoLink, Card, Nota } from "@/components/ds";
import { AcoesAutonomas, InformacaoSeguraCard } from "@/components/viva/humanos";
import { QuadroDoPercurso } from "@/components/viva/percurso/quadro";
import { objetivoPorId, passosDoPercurso } from "@/lib/viva-jornada-dados";
import { jornada, useJornada } from "@/lib/viva-jornada";

export const Route = createFileRoute("/jornada/encerramento")({
  head: () => ({
    meta: [
      { title: "Encerrar por hoje — Percurso VIVA" },
      {
        name: "description",
        content:
          "Resumo curto e neutro do percurso. Quando voltar, você poderá continuar deste ponto ou escolher outro objetivo.",
      },
      { property: "og:title", content: "Encerrar por hoje — Percurso VIVA" },
      {
        property: "og:description",
        content: "Sem sequência de dias, sem frequência e sem perda de progresso.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Encerramento,
});

function Encerramento() {
  const j = useJornada();
  const navigate = useNavigate();
  const objetivo = objetivoPorId(j.objetivoId);
  const passo = passosDoPercurso.find((p) => p.id === j.proximoPassoId);

  return (
    <QuadroDoPercurso
      titulo="Seu percurso foi registrado"
      finalidade="Quando retornar, você poderá continuar deste ponto ou escolher outro objetivo."
      voltarPara="/jornada"
      baixaEstimulacao={j.preparacao.baixaEstimulacao}
    >
      <Card variante="informativo" titulo="O que ficou guardado">
        <ul className="space-y-2 viva-apoio text-text-primary">
          <li>Objetivo: {objetivo?.nome ?? "nenhum objetivo escolhido"}.</li>
          <li>
            Registro da experiência: {j.registro ? "guardado com suas palavras" : "não registrado"}.
          </li>
          <li>Reflexão: {j.reflexao ? "guardada" : "não guardada"}.</li>
          <li>Próximo passo: {passo ? passo.titulo : "nenhum passo escolhido"}.</li>
        </ul>
        <Nota>Tudo isso está apenas neste dispositivo e pertence a você.</Nota>

        <AcoesAutonomas
          principal={
            <BotaoLink to="/jornada" variante="principal">
              Voltar ao início
            </BotaoLink>
          }
          secundarias={
            <>
              <BotaoLink to="/jornada/linha-do-tempo" variante="terciario" tamanho="compacto">
                Ver meu percurso
              </BotaoLink>
              <BotaoLink to="/" variante="terciario" tamanho="compacto">
                Sair da demonstração
              </BotaoLink>
            </>
          }
        />
      </Card>

      <InformacaoSeguraCard
        tipo="privacidade"
        titulo="Recomeçar ou apagar"
        mensagem="Você pode reiniciar o percurso mantendo sua linha do tempo, ou apagar todos os dados demonstrativos."
        acao={
          <div className="flex flex-wrap gap-3">
            <Botao
              variante="secundario"
              tamanho="compacto"
              onClick={() => {
                jornada.reiniciarPercurso();
                navigate({ to: "/jornada" });
              }}
            >
              Começar novamente
            </Botao>
            <Botao
              variante="terciario"
              tamanho="compacto"
              onClick={() => {
                jornada.apagarTudo();
                navigate({ to: "/jornada" });
              }}
            >
              Apagar os dados demonstrativos
            </Botao>
          </div>
        }
      />
    </QuadroDoPercurso>
  );
}
