import { useState } from "react";

import {
  AreaDeTexto,
  Botao,
  CaixaDeSelecao,
  CampoTexto,
  Card,
  Confirmacao,
  ControleDeslizante,
} from "@/components/ds";
import {
  apoiosDePreparacao,
  novoId,
  type Atividade,
  type Preparacao,
} from "@/lib/viva-percurso";

/**
 * Preparação de Atividade (documentos 07, 08 e 04).
 *
 * Quatro etapas curtas. Voltar é sempre possível, nada é apagado,
 * nenhum campo é obrigatório e o registro de "como estou" não é
 * avaliação clínica nem é interpretado automaticamente.
 */

const etapas = [
  "O que vou fazer",
  "O que pode ajudar",
  "Como estou agora",
  "Meu plano",
];

export function PreparacaoDeAtividade({
  atividade,
  preparacaoInicial,
  estrategiasDisponiveis = [],
  onSalvar,
  onComecarAtividade,
  onPausar,
  onEscolherOutra,
}: {
  atividade: Atividade;
  preparacaoInicial?: Preparacao;
  estrategiasDisponiveis?: { id: string; nome: string }[];
  onSalvar?: (p: Preparacao) => void;
  onComecarAtividade?: (p: Preparacao) => void;
  onPausar?: (p: Preparacao) => void;
  onEscolherOutra?: () => void;
}) {
  const [preparacao, setPreparacao] = useState<Preparacao>(
    preparacaoInicial ?? {
      id: novoId("preparacao"),
      atividadeId: atividade.id,
      atividadeTitulo: atividade.titulo,
      objetivo: "",
      contexto: "",
      duracao: atividade.duracao,
      estrategiaIds: [],
      comoEstou: {},
      etapa: 0,
      atualizadaEm: new Date().toISOString().slice(0, 10),
      podePausar: true,
    },
  );
  const [apoios, setApoios] = useState<string[]>([]);
  const [salvo, setSalvo] = useState(false);

  const etapa = preparacao.etapa;
  const mudar = (patch: Partial<Preparacao>) => {
    setPreparacao((p) => ({
      ...p,
      ...patch,
      atualizadaEm: new Date().toISOString().slice(0, 10),
    }));
    setSalvo(false);
  };

  const salvar = (acao?: (p: Preparacao) => void) => {
    onSalvar?.(preparacao);
    acao?.(preparacao);
    setSalvo(true);
  };

  return (
    <Card
      variante="informativo"
      titulo={`Preparação: ${atividade.titulo}`}
      descricao="Você pode voltar entre as partes. Nada do que escreveu é apagado."
    >
      <nav aria-label="Partes da preparação">
        <ol className="flex flex-wrap gap-x-2 gap-y-1 viva-legenda text-text-secondary">
          {etapas.map((nome, i) => (
            <li key={nome}>
              <button
                type="button"
                onClick={() => mudar({ etapa: i })}
                aria-current={i === etapa ? "step" : undefined}
                className={
                  i === etapa
                    ? "viva-tap rounded-xl px-2 py-1 font-semibold text-text-primary underline underline-offset-4"
                    : "viva-tap rounded-xl px-2 py-1 hover:text-text-primary"
                }
              >
                {i + 1}. {nome}
              </button>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-5 space-y-5">
        {etapa === 0 ? (
          <>
            <p className="viva-apoio text-text-primary">{atividade.descricao}</p>
            <CampoTexto
              rotulo="Objetivo prático (opcional)"
              apoio="O que você gostaria que acontecesse."
              value={preparacao.objetivo ?? ""}
              onChange={(e) => mudar({ objetivo: e.target.value })}
            />
            <CampoTexto
              rotulo="Local ou contexto (opcional)"
              value={preparacao.contexto ?? ""}
              onChange={(e) => mudar({ contexto: e.target.value })}
            />
            <CampoTexto
              rotulo="Duração aproximada (opcional)"
              value={preparacao.duracao ?? ""}
              onChange={(e) => mudar({ duracao: e.target.value })}
            />
            <fieldset>
              <legend className="viva-rotulo text-text-primary">
                Formas possíveis de fazer (opcional)
              </legend>
              <p className="mt-1 viva-legenda text-text-secondary">
                Uma alternativa não é uma versão menor. É outra forma de
                participar.
              </p>
              <div className="mt-3 space-y-2">
                {atividade.alternativas.map((alt) => (
                  <CaixaDeSelecao
                    key={alt}
                    rotulo={alt}
                    marcada={preparacao.alternativaEscolhida === alt}
                    onChange={(v) =>
                      mudar({ alternativaEscolhida: v ? alt : undefined })
                    }
                  />
                ))}
              </div>
            </fieldset>
          </>
        ) : null}

        {etapa === 1 ? (
          <fieldset>
            <legend className="viva-rotulo text-text-primary">
              O que pode ajudar (opcional)
            </legend>
            <p className="mt-1 viva-legenda text-text-secondary">
              Marque apenas o que fizer sentido para você.
            </p>
            <div className="mt-3 space-y-3">
              {apoiosDePreparacao.map((a) => (
                <CaixaDeSelecao
                  key={a}
                  rotulo={a}
                  marcada={apoios.includes(a)}
                  onChange={(v) => {
                    setApoios((prev) =>
                      v ? [...prev, a] : prev.filter((x) => x !== a),
                    );
                    setSalvo(false);
                  }}
                />
              ))}
            </div>

            {estrategiasDisponiveis.length ? (
              <div className="mt-6">
                <p className="viva-rotulo text-text-primary">
                  Minhas estratégias já registradas
                </p>
                <div className="mt-3 space-y-3">
                  {estrategiasDisponiveis.map((e) => (
                    <CaixaDeSelecao
                      key={e.id}
                      rotulo={e.nome}
                      marcada={preparacao.estrategiaIds.includes(e.id)}
                      onChange={(v) =>
                        mudar({
                          estrategiaIds: v
                            ? [...preparacao.estrategiaIds, e.id]
                            : preparacao.estrategiaIds.filter(
                                (id) => id !== e.id,
                              ),
                        })
                      }
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </fieldset>
        ) : null}

        {etapa === 2 ? (
          <>
            <p className="viva-legenda text-text-secondary">
              Este registro é opcional e serve só para você. Não é avaliação
              clínica e não é interpretado automaticamente.
            </p>
            <ControleDeslizante
              rotulo="Energia agora"
              valor={preparacao.comoEstou.energia ?? 5}
              formatarValor={(v) => `${v} de 10`}
              onChange={(v) =>
                mudar({ comoEstou: { ...preparacao.comoEstou, energia: v } })
              }
            />
            <ControleDeslizante
              rotulo="Desconforto agora"
              valor={preparacao.comoEstou.desconforto ?? 3}
              formatarValor={(v) => `${v} de 10`}
              onChange={(v) =>
                mudar({ comoEstou: { ...preparacao.comoEstou, desconforto: v } })
              }
            />
            <ControleDeslizante
              rotulo="O quanto parece previsível"
              valor={preparacao.comoEstou.previsibilidade ?? 5}
              formatarValor={(v) => `${v} de 10`}
              onChange={(v) =>
                mudar({
                  comoEstou: { ...preparacao.comoEstou, previsibilidade: v },
                })
              }
            />
            <CampoTexto
              rotulo="Apoio de que eu gostaria (opcional)"
              value={preparacao.comoEstou.apoio ?? ""}
              onChange={(e) =>
                mudar({
                  comoEstou: { ...preparacao.comoEstou, apoio: e.target.value },
                })
              }
            />
            <CampoTexto
              rotulo="Disposição para começar (opcional)"
              apoio="Com as suas palavras."
              value={preparacao.comoEstou.disposicao ?? ""}
              onChange={(e) =>
                mudar({
                  comoEstou: {
                    ...preparacao.comoEstou,
                    disposicao: e.target.value,
                  },
                })
              }
            />
          </>
        ) : null}

        {etapa === 3 ? (
          <>
            <dl className="space-y-3 rounded-2xl bg-surface-muted p-4 viva-apoio">
              <Linha rotulo="Atividade" valor={preparacao.atividadeTitulo} />
              <Linha
                rotulo="O que pode ajudar"
                valor={
                  [
                    ...apoios,
                    ...estrategiasDisponiveis
                      .filter((e) => preparacao.estrategiaIds.includes(e.id))
                      .map((e) => e.nome),
                  ].join(" · ") || "Nada marcado por enquanto"
                }
              />
              <Linha
                rotulo="Forma escolhida"
                valor={preparacao.alternativaEscolhida ?? "Ainda não escolhida"}
              />
              <Linha
                rotulo="Apoio disponível"
                valor={preparacao.apoio || "Não registrado"}
              />
              <Linha
                rotulo="Posso pausar"
                valor={preparacao.podePausar ? "Sim, quando quiser" : "Não sei ainda"}
              />
            </dl>
            <CampoTexto
              rotulo="Apoio disponível (opcional)"
              value={preparacao.apoio ?? ""}
              onChange={(e) => mudar({ apoio: e.target.value })}
            />
            <AreaDeTexto
              rotulo="Minha decisão agora (opcional)"
              apoio="Você pode mudar de ideia depois."
              value={preparacao.decisao ?? ""}
              onChange={(e) => mudar({ decisao: e.target.value })}
            />
          </>
        ) : null}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {etapa < etapas.length - 1 ? (
          <Botao variante="principal" onClick={() => mudar({ etapa: etapa + 1 })}>
            Continuar
          </Botao>
        ) : (
          <Botao
            variante="principal"
            onClick={() => salvar(onComecarAtividade)}
          >
            Começar atividade
          </Botao>
        )}
        {etapa > 0 ? (
          <Botao tamanho="compacto" onClick={() => mudar({ etapa: etapa - 1 })}>
            Voltar
          </Botao>
        ) : null}
        <Botao tamanho="compacto" onClick={() => salvar()}>
          Salvar preparação
        </Botao>
        <Botao variante="terciario" onClick={() => salvar(onPausar)}>
          Pausar por enquanto
        </Botao>
        <Botao variante="terciario" onClick={onEscolherOutra}>
          Escolher outra atividade
        </Botao>
      </div>

      <div className="mt-4">
        <Confirmacao visivel={salvo}>
          Sua preparação está salva neste dispositivo. Você pode editá-la depois.
        </Confirmacao>
      </div>
    </Card>
  );
}

function Linha({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="grid gap-0.5">
      <dt className="viva-legenda text-text-secondary">{rotulo}</dt>
      <dd className="text-text-primary">{valor}</dd>
    </div>
  );
}
