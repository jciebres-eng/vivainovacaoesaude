import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import {
  Chip,
  Note,
  Screen,
  ScreenFooter,
  ScreenHeader,
  SectionCard,
} from "@/components/viva/screen";
import { decisoesRevisao, getStep, revisaoEstrategias } from "@/lib/viva-data";

export const Route = createFileRoute("/_percurso/revisao")({
  head: () => ({
    meta: [
      { title: "Revisão de estratégias — VIVA" },
      {
        name: "description",
        content:
          "Decida o que manter, adaptar ou deixar de usar depois da experiência realizada.",
      },
      { property: "og:title", content: "Revisão de estratégias — VIVA" },
      {
        property: "og:description",
        content: "As adaptações ficam registradas: nada é apagado do seu percurso.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RevisaoScreen,
});

function RevisaoScreen() {
  const step = getStep("revisao");
  const [estado, setEstado] = useState<Record<string, string>>({});

  return (
    <>
      <ScreenHeader
        step={step}
        title={step.title}
        intro="Depois da experiência, você decide o que continua fazendo sentido."
      />

      <Screen>
        {revisaoEstrategias.map((e) => (
          <SectionCard key={e.titulo}>
            <h2 className="text-lg font-semibold text-card-foreground">
              {e.titulo}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{e.situacao}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {decisoesRevisao.map((d) => (
                <Chip
                  key={d}
                  label={d}
                  selected={estado[e.titulo] === d}
                  onClick={() => setEstado((p) => ({ ...p, [e.titulo]: d }))}
                />
              ))}
            </div>
          </SectionCard>
        ))}

        <Note>
          Deixar de usar uma estratégia é uma decisão sua e fica registrada como
          aprendizado, não como falha.
        </Note>
      </Screen>

      <ScreenFooter backTo="/registro" nextTo="/proximo-passo" />
    </>
  );
}
