import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { BookOpen, History, Play, Star } from "lucide-react";
import { useEffect, useState } from "react";

import { Botao, Card } from "@/components/ds";
import { CampoDoAgente, LeituraDoAgente, PainelDoAgente } from "@/components/viva/agente";
import { usePerfil } from "@/lib/viva-perfis";
import { useAgente } from "@/lib/viva-agente";
import {
  memoriaDoCopiloto,
  percursos,
  rotulosDeEstado,
  situacoesSugeridas,
  usePercursos,
} from "@/lib/viva-percursos";
import { sugerirSituacoes, type Situacao } from "@/lib/viva-situacoes";

export const Route = createFileRoute("/_movel/")({
  head: () => ({
    meta: [
      { title: "VIVA — Copiloto neuroinclusivo de percursos" },
      {
        name: "description",
        content:
          "Diga o que precisa: o VIVA organiza um percurso funcional em passos curtos, com estratégias, leituras e planos alternativos. Tudo fica neste aparelho.",
      },
      { property: "og:title", content: "VIVA — Copiloto neuroinclusivo de percursos" },
      {
        property: "og:description",
        content: "Fale, escreva ou toque: um percurso possível, no seu ritmo, sem cobrança.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Inicio,
});

function Inicio() {
  const { perfil } = usePerfil();
  const navigate = useNavigate();
  const agente = useAgente();
  const { emAndamento, lista, favoritos } = usePercursos();
  const [intencao, setIntencao] = useState<string | null>(null);
  const memoria = memoriaDoCopiloto();

  useEffect(() => {
    if (emAndamento.length > 0) agente.irPara("acompanhando");
    else if (!intencao) agente.irPara("disponivel");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emAndamento.length, intencao]);

  function abrir(situacao: Situacao) {
    agente.irPara("organizando");
    const novo = percursos.criar(situacao, intencao ?? "");
    navigate({ to: "/percurso/$id", params: { id: novo.id }, search: { fase: "preparar" } });
  }

  const frase = intencao
    ? "Vamos organizar esse percurso."
    : emAndamento.length > 0
      ? "Seu percurso continua aberto, no ponto onde você parou."
      : perfil.perguntaDeAbertura;

  return (
    <div className="space-y-6">
      <p className="viva-legenda text-text-secondary">{perfil.contexto}</p>
      <h1 className="sr-only">VIVA — assistente de percursos</h1>

      <PainelDoAgente frase={frase} />

      {emAndamento.length > 0 ? (
        <Card variante="proximo-passo" titulo="Percurso em andamento">
          {emAndamento.map((p) => (
            <div key={p.id} className="mt-2">
              <p className="viva-apoio text-text-primary">
                {p.titulo} · {rotulosDeEstado[p.estado]}
              </p>
              <Link
                to="/percurso/$id"
                params={{ id: p.id }}
                search={{ fase: "realizar" }}
                className="viva-tap mt-3 inline-flex min-h-12 items-center gap-2 rounded-full bg-destaque px-6 viva-texto-botao font-semibold text-action-primary-foreground"
              >
                <Play className="h-5 w-5" aria-hidden />
                Voltar ao percurso
              </Link>
            </div>
          ))}
        </Card>
      ) : null}

      {intencao ? (
        <LeituraDoAgente
          intencao={intencao}
          sugestoes={sugerirSituacoes(intencao)}
          onEscolher={abrir}
          onCorrigir={() => {
            setIntencao(null);
            agente.irPara("disponivel");
          }}
        />
      ) : (
        <>
          <CampoDoAgente
            onEnviar={(texto) => {
              setIntencao(texto);
              agente.irPara("mostrando-percurso");
            }}
          />

          <section aria-labelledby="situacoes-titulo">
            <h2 id="situacoes-titulo" className="viva-titulo-secao text-text-primary">
              Se preferir, comece por aqui
            </h2>
            <p className="mt-1 viva-legenda text-text-secondary">
              Tocar em uma delas leva ao mesmo lugar que falar ou escrever.
            </p>
            <ul className="mt-3 space-y-2">
              {situacoesSugeridas(5).map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => abrir(s)}
                    className="viva-tap w-full rounded-2xl border border-border-default bg-surface-default p-4 text-left"
                  >
                    <span className="block viva-apoio font-semibold text-text-primary">
                      {s.titulo}
                    </span>
                    <span className="block viva-legenda text-text-secondary">{s.resumo}</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      {memoria.situacoesFrequentes.length > 0 ? (
        <Card variante="informativo" titulo="Encontrei um percurso parecido com este">
          <p className="viva-apoio text-text-secondary">
            {agente.memoriaAutorizada
              ? "Isto vem só dos seus próprios percursos neste aparelho. Nada é deduzido sobre você."
              : "Posso usar seus percursos anteriores para sugerir atalhos? Só com a sua autorização."}
          </p>
          {agente.memoriaAutorizada ? (
            <ul className="mt-3 space-y-1 viva-legenda text-text-primary">
              {memoria.situacoesFrequentes.slice(0, 3).map((s) => (
                <li key={s.situacao.id}>{s.situacao.titulo}</li>
              ))}
            </ul>
          ) : null}
          <div className="mt-4">
            <Botao
              variante="secundario"
              tamanho="compacto"
              onClick={() => agente.autorizarMemoria(!agente.memoriaAutorizada)}
            >
              {agente.memoriaAutorizada ? "Parar de usar minha memória" : "Autorizar memória"}
            </Botao>
          </div>
        </Card>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Botao
          variante="secundario"
          tamanho="compacto"
          icone={History}
          onClick={() => navigate({ to: "/meu-percurso" })}
        >
          Meus percursos ({lista.length})
        </Botao>
        <Botao
          variante="secundario"
          tamanho="compacto"
          icone={Star}
          onClick={() => navigate({ to: "/favoritos" })}
        >
          Favoritos ({favoritos.length})
        </Botao>
        <Botao
          variante="secundario"
          tamanho="compacto"
          icone={BookOpen}
          onClick={() => navigate({ to: "/biblioteca" })}
        >
          Biblioteca
        </Botao>
      </div>

      <SeloDemonstrativo
        sempreVisivel
        texto="Demonstração com dados fictícios. Tudo fica apenas neste dispositivo e o VIVA não substitui acompanhamento profissional."
      />
    </div>
  );
}
