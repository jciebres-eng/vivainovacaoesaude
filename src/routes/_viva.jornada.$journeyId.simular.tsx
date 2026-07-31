import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { TimelineDoPercurso } from "@/components/viva/match";
import { useJornada } from "@/lib/match/usar-jornada";

export const Route = createFileRoute("/_viva/jornada/$journeyId/simular")({
  head: () => ({
    meta: [
      { title: "Simular o percurso — VIVA" },
      {
        name: "description",
        content:
          "Passe pelo percurso mentalmente, uma etapa por vez, antes de fazer de verdade. Nada aqui é avaliado.",
      },
      { property: "og:title", content: "Simular o percurso — VIVA" },
      {
        property: "og:description",
        content: "Um ensaio calmo do percurso, etapa por etapa, sem cobrança e sem pontuação.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Simular,
});

function Simular() {
  const { journeyId } = Route.useParams();
  const { jornada, carregando, definirEstado } = useJornada(journeyId);
  const [indice, setIndice] = useState(0);

  if (carregando) {
    return <p className="viva-legenda text-text-secondary">Abrindo o ensaio…</p>;
  }
  if (!jornada) {
    return (
      <p className="viva-legenda text-text-secondary">
        Este percurso não está mais neste aparelho.
      </p>
    );
  }

  const etapa = jornada.etapas[indice];
  const fim = indice >= jornada.etapas.length;

  return (
    <div className="space-y-6">
      <header>
        <p className="viva-legenda text-text-secondary">Ensaio</p>
        <h1 className="mt-1 viva-titulo-pagina text-text-primary">{jornada.titulo}</h1>
        <p className="mt-2 viva-apoio text-text-secondary">
          Imagine cada etapa no seu tempo. Você pode parar quando quiser.
        </p>
      </header>

      <TimelineDoPercurso jornada={jornada} modo="compacto" />

      <div aria-live="polite" className="space-y-2">
        {fim ? (
          <>
            <p className="viva-subtitulo text-text-primary">Você percorreu o ensaio inteiro.</p>
            <p className="viva-legenda text-text-secondary">
              Fazer de verdade é uma escolha sua, agora ou outro dia.
            </p>
          </>
        ) : (
          <>
            <p className="viva-legenda text-text-secondary">
              Etapa {indice + 1} de {jornada.etapas.length}
            </p>
            <p className="viva-subtitulo text-text-primary">{etapa.titulo}</p>
            {etapa.apoio ? (
              <p className="viva-legenda text-text-secondary">{etapa.apoio}</p>
            ) : null}
          </>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {!fim ? (
          <button
            type="button"
            onClick={() => setIndice((i) => i + 1)}
            className="viva-tap inline-flex min-h-11 items-center rounded-full bg-destaque px-5 viva-texto-botao text-action-primary-foreground"
          >
            Próxima etapa
          </button>
        ) : (
          <Link
            to="/jornada/$journeyId/executar"
            params={{ journeyId }}
            onClick={() => void definirEstado("pronto")}
            className="viva-tap inline-flex min-h-11 items-center rounded-full bg-destaque px-5 viva-texto-botao text-action-primary-foreground"
          >
            Estou pronto para fazer
          </Link>
        )}
        <Link
          to="/jornada/$journeyId/revisar"
          params={{ journeyId }}
          className="viva-tap inline-flex min-h-11 items-center viva-legenda text-destaque-texto underline"
        >
          Voltar para a revisão
        </Link>
      </div>
    </div>
  );
}
