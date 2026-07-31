import { Link, createFileRoute } from "@tanstack/react-router";
import { Pause, Play, SkipForward } from "lucide-react";
import { useState } from "react";

import { TimelineDoPercurso } from "@/components/viva/match";
import { useJornada } from "@/lib/match/usar-jornada";

export const Route = createFileRoute("/_viva/jornada/$journeyId/executar")({
  head: () => ({
    meta: [
      { title: "Fazer o percurso — VIVA" },
      {
        name: "description",
        content:
          "Acompanhe o percurso etapa por etapa, com pausa, pular e retomar sempre disponíveis. Nada é obrigatório.",
      },
      { property: "og:title", content: "Fazer o percurso — VIVA" },
      {
        property: "og:description",
        content: "Execução guiada com pausa, retomada e uma etapa visível por vez.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Executar,
});

function Executar() {
  const { journeyId } = Route.useParams();
  const { jornada, carregando, definirEstado } = useJornada(journeyId);
  const [indice, setIndice] = useState(0);
  const [pausado, setPausado] = useState(false);

  if (carregando) {
    return <p className="viva-legenda text-text-secondary">Abrindo o percurso…</p>;
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
        <p className="viva-legenda text-text-secondary">Em andamento</p>
        <h1 className="mt-1 viva-titulo-pagina text-text-primary">{jornada.titulo}</h1>
      </header>

      <TimelineDoPercurso jornada={jornada} modo="compacto" />

      <div aria-live="polite" className="space-y-2">
        {fim ? (
          <p className="viva-subtitulo text-text-primary">Você chegou ao fim do percurso.</p>
        ) : pausado ? (
          <>
            <p className="viva-subtitulo text-text-primary">Percurso pausado.</p>
            <p className="viva-legenda text-text-secondary">
              Parar é uma escolha válida. Você retoma quando quiser, do mesmo ponto.
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

      {!fim ? (
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setPausado((p) => !p);
              void definirEstado(pausado ? "em-andamento" : "pausado");
            }}
            className="viva-tap inline-flex min-h-11 items-center gap-2 rounded-full border border-border-default px-5 viva-legenda font-medium text-text-primary"
          >
            {pausado ? (
              <Play className="h-4 w-4" aria-hidden />
            ) : (
              <Pause className="h-4 w-4" aria-hidden />
            )}
            {pausado ? "Retomar de onde parei" : "Pausar"}
          </button>
          <button
            type="button"
            onClick={() => setIndice((i) => i + 1)}
            className="viva-tap inline-flex min-h-11 items-center gap-2 rounded-full border border-border-default px-5 viva-legenda text-text-secondary"
          >
            <SkipForward className="h-4 w-4" aria-hidden />
            Pular esta etapa
          </button>
          <button
            type="button"
            onClick={() => {
              setPausado(false);
              setIndice((i) => i + 1);
              void definirEstado("em-andamento");
            }}
            className="viva-tap inline-flex min-h-11 items-center rounded-full bg-destaque px-5 viva-texto-botao text-action-primary-foreground"
          >
            Concluir esta etapa
          </button>
        </div>
      ) : (
        <Link
          to="/jornada/$journeyId/feedback"
          params={{ journeyId }}
          onClick={() => void definirEstado("concluido")}
          className="viva-tap inline-flex min-h-11 items-center rounded-full bg-destaque px-5 viva-texto-botao text-action-primary-foreground"
        >
          Registrar como foi
        </Link>
      )}

      <p className="viva-legenda text-text-secondary">
        Você pode sair desta tela a qualquer momento: o percurso continua guardado neste aparelho.
      </p>
    </div>
  );
}
