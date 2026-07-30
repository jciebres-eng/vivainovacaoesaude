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
import { fatores, getStep, respostasFator } from "@/lib/viva-data";

export const Route = createFileRoute("/_percurso/barreiras")({
  head: () => ({
    meta: [
      { title: "Barreiras e facilitadores — VIVA" },
      {
        name: "description",
        content:
          "Reconheça o que dificulta, o que ajuda e o que depende da situação no seu percurso.",
      },
      { property: "og:title", content: "Barreiras e facilitadores — VIVA" },
      {
        property: "og:description",
        content: "O mesmo fator pode ajudar em um dia e dificultar em outro. Aqui você decide.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BarreirasScreen,
});

function BarreirasScreen() {
  const step = getStep("barreiras");
  const [estado, setEstado] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      fatores.map((f) => [
        f.id,
        f.padrao === "depende" ? "depende da situação" : f.padrao,
      ]),
    ),
  );

  return (
    <>
      <ScreenHeader
        step={step}
        title={step.title}
        intro="Marque como cada fator costuma agir para você. Nada aqui é interpretado como falha pessoal."
      />

      <Screen>
        <div className="grid gap-4 md:grid-cols-2">
          {fatores.map((f) => (
            <SectionCard key={f.id} title={f.nome}>
              <div className="flex flex-wrap gap-2">
                {respostasFator.map((r) => (
                  <Chip
                    key={r}
                    label={r}
                    selected={estado[f.id] === r}
                    onClick={() => setEstado((p) => ({ ...p, [f.id]: r }))}
                  />
                ))}
              </div>
            </SectionCard>
          ))}
        </div>

        <button
          type="button"
          className="viva-tap w-full rounded-2xl border border-dashed border-border-default px-5 py-4 text-sm font-medium text-text-secondary hover:bg-secondary"
        >
          Adicionar item próprio
        </button>

        <Note>
          Um mesmo fator pode ajudar e dificultar. Você pode alterar essas
          respostas quando quiser.
        </Note>
      </Screen>

      <ScreenFooter backTo="/contexto" nextTo="/opcoes" />
    </>
  );
}
