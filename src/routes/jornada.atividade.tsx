import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { AreaDeTexto, Botao, Card, Nota } from "@/components/ds";
import { AcoesAutonomas, PausaConscienteCard } from "@/components/viva/humanos";
import { QuadroDoPercurso } from "@/components/viva/percurso/quadro";
import { etapasDaAtividade, objetivoPorId } from "@/lib/viva-jornada-dados";
import { jornada, useJornada } from "@/lib/viva-jornada";

export const Route = createFileRoute("/jornada/atividade")({
  head: () => ({
    meta: [
      { title: "Atividade — Percurso VIVA" },
      {
        name: "description",
        content:
          "Uma etapa curta por tela, com ajuda contextual, pausa disponível e possibilidade de salvar e continuar depois.",
      },
      { property: "og:title", content: "Atividade — Percurso VIVA" },
      {
        property: "og:description",
        content: "Sem prova, sem checklist de desempenho, sem pontuação.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Atividade,
});

function Atividade() {
  const j = useJornada();
  const navigate = useNavigate();
  const [ajuda, setAjuda] = useState(false);
  const [pausa, setPausa] = useState(false);

  const objetivo = objetivoPorId(j.objetivoId);
  const etapas = objetivo ? (etapasDaAtividade[objetivo.id] ?? []) : [];
  const indice = Math.min(j.atividade.etapaAtual, Math.max(etapas.length - 1, 0));
  const etapa = etapas[indice];

  if (!objetivo || !etapa) {
    return (
      <QuadroDoPercurso
        titulo="Nenhuma atividade aberta"
        finalidade="Escolha um objetivo para começar um percurso."
        voltarPara="/jornada"
      >
        <Card variante="informativo">
          <Botao
            variante="principal"
            onClick={() => navigate({ to: "/jornada/objetivo" })}
          >
            Escolher um objetivo
          </Botao>
        </Card>
      </QuadroDoPercurso>
    );
  }

  const ultima = indice === etapas.length - 1;
  const baixa = j.preparacao.baixaEstimulacao;

  if (pausa) {
    return (
      <QuadroDoPercurso
        titulo="Pausa"
        finalidade="Seu percurso foi preservado. Você pode continuar agora ou retomar em outro momento."
        voltarPara="/jornada"
        baixaEstimulacao={baixa}
      >
        <PausaConscienteCard
          onContinuarDepois={() => setPausa(false)}
          onVoltarAoInicio={() => navigate({ to: "/jornada" })}
          onFecharAtividade={() => {
            jornada.encerrar(objetivo.nome);
            navigate({ to: "/jornada/encerramento" });
          }}
          linkEstrategias="/biblioteca/minha"
        />
        <Nota>
          Nada foi perdido: suas respostas continuam guardadas neste
          dispositivo.
        </Nota>
      </QuadroDoPercurso>
    );
  }

  return (
    <QuadroDoPercurso
      titulo={etapa.titulo}
      finalidade={etapa.instrucao}
      etapa={`Etapa ${indice + 1} de ${etapas.length}`}
      voltarPara={indice === 0 ? "/jornada/preparacao" : undefined}
      aoVoltar={
        indice === 0
          ? undefined
          : () => jornada.irParaEtapaDaAtividade(indice - 1)
      }
      aoPausar={() => {
        jornada.pausarAtividade(objetivo.nome);
        setPausa(true);
      }}
      aoSalvarParaDepois={() => {
        jornada.salvarParaDepois(objetivo.nome);
        navigate({ to: "/jornada" });
      }}
      baixaEstimulacao={baixa}
      depois={
        ultima
          ? "Ao continuar, esta atividade chega ao fim e você poderá registrar como foi."
          : "Ao continuar, você verá a próxima etapa curta."
      }
    >
      <Card variante="informativo">
        {!j.preparacao.textoReduzido && !baixa ? (
          <p className="viva-legenda text-text-secondary">{etapa.exemplo}</p>
        ) : null}

        <AreaDeTexto
          rotulo={etapa.rotuloCampo}
          apoio="Escrever é opcional. O que você escrever fica só neste dispositivo."
          placeholder={etapa.placeholder}
          rows={3}
          className={j.preparacao.textoReduzido ? undefined : "mt-4"}
          value={j.atividade.respostas[etapa.id] ?? ""}
          onChange={(e) => jornada.responderEtapa(etapa.id, e.target.value)}
        />

        <AcoesAutonomas
          principal={
            <Botao
              variante="principal"
              onClick={() => {
                if (ultima) {
                  jornada.concluirAtividade(objetivo.nome);
                  jornada.irPara("registro");
                  navigate({ to: "/jornada/registro" });
                } else {
                  jornada.irParaEtapaDaAtividade(indice + 1);
                  setAjuda(false);
                }
              }}
            >
              Continuar
            </Botao>
          }
          secundarias={
            <>
              <Botao
                variante="terciario"
                tamanho="compacto"
                onClick={() => setAjuda((v) => !v)}
              >
                Preciso de outra orientação
              </Botao>
              {indice > 0 ? (
                <Botao
                  variante="terciario"
                  tamanho="compacto"
                  onClick={() => jornada.irParaEtapaDaAtividade(indice - 1)}
                >
                  Voltar
                </Botao>
              ) : null}
            </>
          }
          nota={
            j.preparacao.precisaPausa
              ? "Você pode fazer uma pausa a qualquer momento, sem perder nada."
              : undefined
          }
        />
      </Card>

      {ajuda ? (
        <Card
          variante="estado-atual"
          titulo="Outra forma de fazer esta etapa"
          descricao="Orientações curtas, escritas previamente. Nada aqui é gerado automaticamente."
        >
          <ul className="space-y-2 viva-apoio text-text-primary">
            {etapa.ajuda.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
          <AcoesAutonomas
            secundarias={
              <>
                <Botao
                  variante="terciario"
                  tamanho="compacto"
                  onClick={() => {
                    if (ultima) {
                      jornada.concluirAtividade(objetivo.nome);
                      jornada.irPara("registro");
                      navigate({ to: "/jornada/registro" });
                    } else {
                      jornada.irParaEtapaDaAtividade(indice + 1);
                    }
                    setAjuda(false);
                  }}
                >
                  Pular esta etapa
                </Botao>
                <Botao
                  variante="terciario"
                  tamanho="compacto"
                  onClick={() => setAjuda(false)}
                >
                  Fechar a ajuda
                </Botao>
              </>
            }
          />
        </Card>
      ) : null}
    </QuadroDoPercurso>
  );
}
