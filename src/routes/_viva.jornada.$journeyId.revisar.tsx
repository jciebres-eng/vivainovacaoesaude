import { Link, createFileRoute } from "@tanstack/react-router";

import { JourneyStepEditor, TimelineDoPercurso } from "@/components/viva/match";
import { useJornada } from "@/lib/match/usar-jornada";

export const Route = createFileRoute("/_viva/jornada/$journeyId/revisar")({
  head: () => ({
    meta: [
      { title: "Revisar o percurso — VIVA" },
      {
        name: "description",
        content:
          "Veja o percurso completo por grupos, reorganize as etapas, marque o que é opcional e crie um plano alternativo.",
      },
      { property: "og:title", content: "Revisar o percurso — VIVA" },
      {
        property: "og:description",
        content: "Timeline completa do percurso, com reorganização por arraste ou teclado.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Revisar,
});

function Revisar() {
  const { journeyId } = Route.useParams();
  const { jornada, carregando, salvar } = useJornada(journeyId);

  if (carregando) {
    return <p className="viva-legenda text-text-secondary">Abrindo o percurso…</p>;
  }
  if (!jornada) {
    return (
      <p className="viva-legenda text-text-secondary">
        Este percurso não está mais neste aparelho. Você pode montar outro em Explorar.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <p className="viva-legenda text-text-secondary">Revisão</p>
        <h1 className="mt-1 viva-titulo-pagina text-text-primary">{jornada.titulo}</h1>
      </header>

      <TimelineDoPercurso jornada={jornada} modo="completo" />

      <JourneyStepEditor jornada={jornada} onMudar={(proxima) => void salvar(proxima)} />

      <div className="flex flex-wrap gap-3">
        <Link
          to="/jornada/$journeyId/simular"
          params={{ journeyId }}
          className="viva-tap inline-flex min-h-11 items-center rounded-full border border-border-default px-5 viva-legenda font-medium text-text-primary"
        >
          Simular antes
        </Link>
        <Link
          to="/jornada/$journeyId/executar"
          params={{ journeyId }}
          className="viva-tap inline-flex min-h-11 items-center rounded-full bg-destaque px-5 viva-texto-botao text-action-primary-foreground"
        >
          Estou pronto para fazer
        </Link>
        <Link
          to="/jornada/$journeyId/personalizar"
          params={{ journeyId }}
          className="viva-tap inline-flex min-h-11 items-center viva-legenda text-destaque-texto underline"
        >
          Personalizar a experiência
        </Link>
      </div>
    </div>
  );
}
