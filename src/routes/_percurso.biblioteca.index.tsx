import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { Botao, CampoBusca, Card, EstadoDaInterface } from "@/components/ds";
import { BibliotecaCard, TalvezSejaUtil } from "@/components/viva/biblioteca";
import { Screen, ScreenHeader } from "@/components/viva/screen";
import {
  areasDaBiblioteca,
  buscarConteudos,
  conteudoPorId,
  conteudosDaBiblioteca,
  etiquetasDisponiveis,
  rotulosDeArea,
  type AreaDaBiblioteca,
} from "@/lib/viva-biblioteca-dados";
import { useBiblioteca } from "@/lib/viva-biblioteca";

export const Route = createFileRoute("/_percurso/biblioteca/")({
  head: () => ({
    meta: [
      { title: "Biblioteca Viva — conteúdos para o dia a dia | VIVA" },
      {
        name: "description",
        content:
          "Conteúdos curtos sobre mobilidade, autorregulação, alimentação e saúde. Leia, salve, adapte e construa seu próprio repertório de estratégias.",
      },
      { property: "og:title", content: "Biblioteca Viva — VIVA" },
      {
        property: "og:description",
        content: "Um espaço de descoberta e consulta, organizado por situações da vida cotidiana.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BibliotecaScreen,
});

function BibliotecaScreen() {
  const { dados, alternarSalvo } = useBiblioteca();
  const [termo, setTermo] = useState("");
  const [area, setArea] = useState<AreaDaBiblioteca | "todas">("todas");
  const [etiqueta, setEtiqueta] = useState<string | undefined>();

  const resultados = useMemo(
    () => buscarConteudos({ termo, area, etiqueta }),
    [termo, area, etiqueta],
  );

  const sugestoes = useMemo(() => {
    const vistos = Object.keys(dados.acessos);
    const ultimo = vistos
      .map((id) => ({ id, acesso: dados.acessos[id] }))
      .sort((a, b) => b.acesso.ultimoEm.localeCompare(a.acesso.ultimoEm))[0];

    const daMesmaArea = ultimo
      ? conteudosDaBiblioteca.filter(
          (c) => c.area === conteudoPorId(ultimo.id)?.area && c.id !== ultimo.id,
        )
      : [];
    const salvos = dados.salvos
      .map((id) => conteudoPorId(id))
      .filter(Boolean) as typeof conteudosDaBiblioteca;
    const naoExplorados = conteudosDaBiblioteca.filter((c) => !vistos.includes(c.id));

    const juntos = [...daMesmaArea, ...salvos, ...naoExplorados];
    const unicos: typeof conteudosDaBiblioteca = [];
    for (const c of juntos) {
      if (!unicos.some((u) => u.id === c.id)) unicos.push(c);
      if (unicos.length === 3) break;
    }
    return unicos;
  }, [dados.acessos, dados.salvos]);

  const motivo = Object.keys(dados.acessos).length
    ? "Baseado no que você leu por último e no que ainda não explorou."
    : "Uma primeira aproximação das quatro áreas.";

  return (
    <>
      <ScreenHeader
        title="Biblioteca Viva"
        intro="Conteúdos curtos sobre situações do dia a dia. Nada aqui é obrigatório: você lê, salva, adapta e guarda o que for útil."
      />

      <Screen>
        <TalvezSejaUtil sugestoes={sugestoes} motivo={motivo} />

        <Card
          variante="informativo"
          titulo="Encontrar um conteúdo"
          descricao="A busca acontece enquanto você digita."
        >
          <CampoBusca
            rotulo="Buscar por palavra"
            apoio="Você também pode filtrar por área e por etiqueta."
            value={termo}
            onChange={(e) => setTermo(e.target.value)}
            placeholder="Por exemplo: pausa, consulta, trajeto"
          />

          <fieldset className="mt-5">
            <legend className="viva-rotulo text-text-primary">Áreas</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              <Botao
                variante={area === "todas" ? "principal" : "secundario"}
                tamanho="compacto"
                aria-pressed={area === "todas"}
                onClick={() => setArea("todas")}
              >
                Todas as áreas
              </Botao>
              {areasDaBiblioteca.map((a) => (
                <Botao
                  key={a}
                  variante={area === a ? "principal" : "secundario"}
                  tamanho="compacto"
                  aria-pressed={area === a}
                  onClick={() => setArea(a)}
                >
                  {rotulosDeArea[a].nome}
                </Botao>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-5">
            <legend className="viva-rotulo text-text-primary">Etiquetas</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {etiquetasDisponiveis().map((e) => (
                <Botao
                  key={e}
                  variante={etiqueta === e ? "principal" : "terciario"}
                  tamanho="compacto"
                  aria-pressed={etiqueta === e}
                  onClick={() => setEtiqueta(etiqueta === e ? undefined : e)}
                >
                  {e}
                </Botao>
              ))}
            </div>
          </fieldset>
        </Card>

        {area === "todas" && !termo && !etiqueta ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {areasDaBiblioteca.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setArea(a)}
                className="viva-tap rounded-3xl border border-border-default bg-surface-default p-5 text-left hover:bg-surface-muted"
              >
                <span className="viva-subtitulo text-text-primary">{rotulosDeArea[a].nome}</span>
                <span className="mt-2 block viva-apoio text-text-secondary">
                  {rotulosDeArea[a].descricao}
                </span>
              </button>
            ))}
          </div>
        ) : null}

        <section aria-live="polite" className="space-y-4">
          <h2 className="viva-subtitulo text-text-primary">
            {area === "todas" ? "Todos os conteúdos" : rotulosDeArea[area].nome}
          </h2>

          {resultados.length === 0 ? (
            <EstadoDaInterface
              tipo="vazio"
              titulo="Não encontramos conteúdos com esse termo."
              texto="Você pode explorar outras categorias."
              acao={
                <Botao
                  variante="secundario"
                  onClick={() => {
                    setTermo("");
                    setArea("todas");
                    setEtiqueta(undefined);
                  }}
                >
                  Ver todas as áreas
                </Botao>
              }
            />
          ) : (
            resultados.map((c) => (
              <BibliotecaCard
                key={c.id}
                conteudo={c}
                salvo={dados.salvos.includes(c.id)}
                utilidade={dados.uteis[c.id]}
                ultimoAcesso={dados.acessos[c.id]?.ultimoEm}
                adaptado={Boolean(dados.adaptacoes[c.id])}
                estrategiaRelacionada={c.estrategias[0]?.nome}
                experienciaRelacionada={
                  dados.relacoes.find((r) => r.conteudoId === c.id)?.experiencia
                }
                onSalvar={() => alternarSalvo(c.id)}
              />
            ))
          )}
        </section>

        <Card
          variante="informativo"
          titulo="Seu espaço na biblioteca"
          descricao="Tudo o que você salva, adapta e escreve fica apenas neste dispositivo."
        >
          <div className="flex flex-wrap gap-3">
            <Link
              to="/biblioteca/minha"
              className="viva-tap inline-flex min-h-11 items-center rounded-full border border-border-default bg-surface-default px-5 py-2.5 viva-legenda font-medium text-text-primary hover:bg-surface-muted"
            >
              Minha Biblioteca
            </Link>
            <Link
              to="/biblioteca/reflexoes"
              className="viva-tap inline-flex min-h-11 items-center rounded-full border border-border-default bg-surface-default px-5 py-2.5 viva-legenda font-medium text-text-primary hover:bg-surface-muted"
            >
              Minhas Reflexões
            </Link>
          </div>
        </Card>
      </Screen>
    </>
  );
}
