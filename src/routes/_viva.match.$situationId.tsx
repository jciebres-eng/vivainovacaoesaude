import { createFileRoute } from "@tanstack/react-router";

import { JourneyMatchComposer } from "@/components/viva/match";
import { SeloDemonstrativo } from "@/components/viva/selo-demonstrativo";

export const Route = createFileRoute("/_viva/match/$situationId")({
  head: () => ({
    meta: [
      { title: "Montar percurso — VIVA" },
      {
        name: "description",
        content:
          "Monte seu percurso uma escolha por vez: objetivo, barreiras, estratégias, informações e treinamento, com gestos ou botões.",
      },
      { property: "og:title", content: "Montar percurso — VIVA" },
      {
        property: "og:description",
        content: "Escolhas visuais curtas que formam um percurso possível, no seu ritmo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MatchDaSituacao,
});

function MatchDaSituacao() {
  const { situationId } = Route.useParams();
  return (
    <div className="space-y-6">
      <JourneyMatchComposer situacaoId={situationId} />
      <SeloDemonstrativo texto="Suas escolhas ficam apenas neste aparelho." />
    </div>
  );
}
