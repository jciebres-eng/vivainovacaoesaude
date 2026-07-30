import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import {
  Chip,
  Note,
  OrigemDaSugestao,
  Screen,
  ScreenFooter,
  ScreenHeader,
} from "@/components/viva/screen";
import { estrategias, getStep, respostasEstrategia } from "@/lib/viva-data";

export const Route = createFileRoute("/_percurso/estrategias")({
  head: () => ({
    meta: [
      { title: "Escolha de estratégias — VIVA" },
      {
        name: "description",
        content:
          "Aceite, recuse ou adapte estratégias sugeridas a partir do seu contexto e das suas preferências.",
      },
      { property: "og:title", content: "Escolha de estratégias — VIVA" },
      {
        property: "og:description",
        content: "Cada estratégia explica por que apareceu e pode ser adaptada por você.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EstrategiasScreen,
});

function EstrategiasScreen() {
  const step = getStep("estrategias");
  const [estado, setEstado] = useState<Record<string, string>>({
    mensagem: "Quero utilizar",
  });

  return (
    <>
      <ScreenHeader
        step={step}
        title={step.title}
        intro="No máximo três estratégias por vez. Você pode recusar, adaptar ou criar a sua."
      />

      <Screen>
        <OrigemDaSugestao />

        {estrategias.map((e) => (
          <div
            key={e.id}
            className="viva-anim rounded-3xl border border-border bg-card p-5 shadow-suave"
          >
            <h2 className="viva-subtitulo text-card-foreground">{e.titulo}</h2>
            <p className="mt-2 max-w-[58ch] viva-legenda text-muted-foreground">
              {e.motivo}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {respostasEstrategia.map((r) => (
                <Chip
                  key={r}
                  label={r}
                  selected={estado[e.id] === r}
                  onClick={() => setEstado((p) => ({ ...p, [e.id]: r }))}
                />
              ))}
            </div>

            <div className="mt-4">
              <Link
                to="/estrategias/adaptar/$estrategiaId"
                params={{ estrategiaId: e.id }}
                className="viva-tap inline-flex items-center gap-2 rounded-xl px-2 py-2 viva-legenda font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground"
              >
                Adaptar esta estratégia
              </Link>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="viva-tap w-full rounded-2xl border border-dashed border-border px-5 py-4 viva-legenda font-medium text-muted-foreground hover:bg-secondary"
        >
          Criar outra estratégia
        </button>

        <Note>
          Estratégias recusadas não voltam a aparecer. Recusar não é erro.
        </Note>
      </Screen>

      <ScreenFooter backTo="/habilidades" nextTo="/biblioteca" />
    </>
  );
}
