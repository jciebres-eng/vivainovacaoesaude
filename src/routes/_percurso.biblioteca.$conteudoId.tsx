import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import { Botao, Card, Interruptor } from "@/components/ds";
import {
  AcaoAdaptar,
  AcaoMarcarUtil,
  AcaoPlano,
  AcaoRelacionar,
  AcaoSalvar,
  BibliotecaCard,
  EstrategiasDoConteudo,
  LeituraDoConteudo,
  ReflexaoBibliotecaCard,
} from "@/components/viva/biblioteca";
import { Screen, ScreenHeader } from "@/components/viva/screen";
import { cn } from "@/lib/utils";
import { conteudoPorId, rotulosDeArea, rotulosDeComplexidade } from "@/lib/viva-biblioteca-dados";
import { novoId, useBiblioteca } from "@/lib/viva-biblioteca";
import { usePercurso } from "@/lib/viva-percurso";

export const Route = createFileRoute("/_percurso/biblioteca/$conteudoId")({
  loader: ({ params }) => {
    const conteudo = conteudoPorId(params.conteudoId);
    if (!conteudo) throw notFound();
    return conteudo;
  },
  head: ({ loaderData }) => {
    const title = loaderData
      ? `${loaderData.titulo} — Biblioteca VIVA`
      : "Conteúdo indisponível — VIVA";
    const description = loaderData?.resumo ?? "Conteúdo da biblioteca demonstrativa do VIVA.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        ...(loaderData ? [] : [{ name: "robots", content: "noindex" }]),
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ConteudoScreen,
});

function ConteudoScreen() {
  const { conteudoId } = Route.useParams();
  const conteudo = conteudoPorId(conteudoId)!;

  const {
    dados,
    registrarAcesso,
    alternarSalvo,
    marcarUtilidade,
    salvarAdaptacao,
    apagarAdaptacao,
    alternarBloco,
    salvarReflexao,
    apagarReflexao,
    adicionarAoPlano,
    relacionarComExperiencia,
    adotarEstrategia,
    definirLeitura,
  } = useBiblioteca();
  const percurso = usePercurso();
  const [acaoAberta, setAcaoAberta] = useState<
    "salvar" | "adaptar" | "relacionar" | "plano" | "util" | null
  >(null);

  useEffect(() => {
    registrarAcesso(conteudo.id);
    // registrar apenas na abertura de cada conteúdo
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conteudo.id]);

  const adaptacao = dados.adaptacoes[conteudo.id];
  const reflexao = dados.reflexoes.find((r) => r.conteudoId === conteudo.id);
  const relacionados = useMemo(
    () =>
      conteudo.relacionados
        .map((id) => conteudoPorId(id))
        .filter(Boolean)
        .slice(0, 3),
    [conteudo.relacionados],
  );

  const experiencias = useMemo(() => {
    const doPercurso = percurso.experiencias.map((e) => ({
      valor: e.atividade,
      label: e.atividade,
    }));
    return doPercurso.length
      ? doPercurso
      : [
          { valor: "Percurso atual", label: "Percurso atual" },
          {
            valor: "Preparação de uma consulta",
            label: "Preparação de uma consulta",
          },
          { valor: "Um deslocamento recente", label: "Um deslocamento recente" },
        ];
  }, [percurso.experiencias]);

  return (
    <>
      <ScreenHeader
        title={conteudo.titulo}
        intro={`${rotulosDeArea[conteudo.area].nome} · cerca de ${conteudo.minutos} minutos · ${rotulosDeComplexidade[conteudo.complexidade]}`}
      />

      <Screen>
        <div
          className={cn(
            dados.leitura.fonteAmpliada && "text-[1.125em]",
            dados.leitura.baixaEstimulacao && "viva-baixa-estimulacao",
          )}
        >
          <Card variante="informativo" titulo="Resumo">
            <p className="max-w-[64ch] viva-texto text-text-primary">{conteudo.resumo}</p>
            {adaptacao?.resumoPessoal ? (
              <p className="mt-4 rounded-2xl border-l-4 border-action-primary bg-surface-muted p-4 viva-apoio text-text-primary">
                Sua versão resumida: {adaptacao.resumoPessoal}
              </p>
            ) : null}
            {adaptacao?.lembrete ? (
              <p className="mt-3 viva-legenda text-text-secondary">
                Seu lembrete: {adaptacao.lembrete}
              </p>
            ) : null}
          </Card>

          <div className="mt-5 flex flex-wrap gap-4">
            <Interruptor
              rotulo="Modo de baixa estimulação"
              valor={dados.leitura.baixaEstimulacao}
              onToggle={() =>
                definirLeitura({
                  baixaEstimulacao: !dados.leitura.baixaEstimulacao,
                })
              }
            />
            <Interruptor
              rotulo="Aumentar o tamanho da fonte"
              valor={dados.leitura.fonteAmpliada}
              onToggle={() => definirLeitura({ fonteAmpliada: !dados.leitura.fonteAmpliada })}
            />
          </div>

          <article className="mt-6">
            <LeituraDoConteudo
              conteudo={conteudo}
              blocosOcultos={adaptacao?.blocosOcultos}
              blocosDestacados={adaptacao?.blocosDestacados}
            />
          </article>

          {adaptacao?.observacoes ? (
            <Card variante="registro" titulo="Suas observações" className="mt-6">
              <p className="max-w-[62ch] viva-texto text-text-primary">{adaptacao.observacoes}</p>
            </Card>
          ) : null}
        </div>

        <EstrategiasDoConteudo
          conteudo={conteudo}
          adotadas={dados.estrategias.map((e) => e.id)}
          onAdotar={(id, nome, comoAjuda) =>
            adotarEstrategia({ id, nome, comoAjuda, conteudoId: conteudo.id })
          }
        />

        <Card
          variante="informativo"
          titulo="O que você deseja fazer com este conteúdo?"
          descricao="Escolha uma ação por vez. Nenhuma delas é obrigatória."
        >
          <div className="flex flex-wrap gap-3">
            {(
              [
                ["salvar", dados.salvos.includes(conteudo.id) ? "Conteúdo salvo" : "Salvar"],
                ["adaptar", "Adaptar"],
                ["relacionar", "Relacionar a uma experiência"],
                ["plano", "Adicionar ao meu plano"],
                ["util", "Marcar como útil"],
              ] as const
            ).map(([chave, rotulo]) => (
              <Botao
                key={chave}
                variante={acaoAberta === chave ? "principal" : "secundario"}
                tamanho="compacto"
                aria-pressed={acaoAberta === chave}
                onClick={() => setAcaoAberta(acaoAberta === chave ? null : chave)}
              >
                {rotulo}
              </Botao>
            ))}
          </div>
        </Card>

        {acaoAberta === "salvar" ? (
          <AcaoSalvar
            salvo={dados.salvos.includes(conteudo.id)}
            onAlternar={() => alternarSalvo(conteudo.id)}
          />
        ) : null}

        {acaoAberta === "util" ? (
          <AcaoMarcarUtil
            marcacao={dados.uteis[conteudo.id]}
            onMarcar={(m) => marcarUtilidade(conteudo.id, m)}
          />
        ) : null}

        {acaoAberta === "adaptar" ? (
          <AcaoAdaptar
            conteudo={conteudo}
            adaptacao={adaptacao}
            onSalvar={(mudanca) => salvarAdaptacao(conteudo.id, mudanca)}
            onAlternarBloco={(i, campo) => alternarBloco(conteudo.id, i, campo)}
            onApagar={() => apagarAdaptacao(conteudo.id)}
          />
        ) : null}

        {acaoAberta === "relacionar" ? (
          <AcaoRelacionar
            experiencias={experiencias}
            onRelacionar={(exp, obs) => relacionarComExperiencia(conteudo.id, exp, obs)}
          />
        ) : null}

        {acaoAberta === "plano" ? (
          <AcaoPlano onAdicionar={(quando) => adicionarAoPlano(conteudo.id, quando)} />
        ) : null}

        <ReflexaoBibliotecaCard
          conteudoId={conteudo.id}
          reflexao={reflexao}
          onSalvar={(respostas, id) =>
            salvarReflexao({
              id: id ?? novoId("reflexao"),
              conteudoId: conteudo.id,
              respostas,
              criadaEm: reflexao?.criadaEm,
            })
          }
          onApagar={apagarReflexao}
        />

        <Card
          variante="informativo"
          titulo="Uma pergunta para levar com você"
          descricao="Sem resposta certa e sem necessidade de responder agora."
        >
          <p className="max-w-[62ch] viva-texto text-text-primary">{conteudo.perguntaDeReflexao}</p>
        </Card>

        {relacionados.length ? (
          <section className="space-y-4">
            <h2 className="viva-subtitulo text-text-primary">Conteúdos relacionados</h2>
            {relacionados.map((c) =>
              c ? (
                <BibliotecaCard
                  key={c.id}
                  conteudo={c}
                  compacto
                  salvo={dados.salvos.includes(c.id)}
                  onSalvar={() => alternarSalvo(c.id)}
                />
              ) : null,
            )}
          </section>
        ) : null}

        <Link
          to="/biblioteca"
          className="viva-tap inline-flex min-h-11 items-center rounded-full border border-border-default-default bg-surface-default px-5 py-3 viva-legenda font-medium text-text-primary hover:bg-surface-muted"
        >
          Voltar para a biblioteca
        </Link>
      </Screen>
    </>
  );
}
