import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import {
  ChoiceItem,
  ChoiceList,
  Note,
  Screen,
  ScreenFooter,
  ScreenHeader,
} from "@/components/viva/screen";
import { getStep, proximosPassos } from "@/lib/viva-data";

export const Route = createFileRoute("/_percurso/proximo-passo")({
  head: () => ({
    meta: [
      { title: "Próximo passo — VIVA" },
      {
        name: "description",
        content:
          "Escolha o próximo passo do seu percurso: repetir, adaptar, reduzir, mudar de objetivo ou pausar.",
      },
      { property: "og:title", content: "Próximo passo — VIVA" },
      {
        property: "og:description",
        content: "Continuidade sem cobrança: pausar também é um passo possível.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProximoPassoScreen,
});

function ProximoPassoScreen() {
  const step = getStep("proximo-passo");
  const [escolha, setEscolha] = useState(proximosPassos[0]);

  return (
    <>
      <ScreenHeader
        step={step}
        title={step.title}
        intro="Um passo por vez. Você pode mudar de ideia depois."
      />

      <Screen>
        <ChoiceList>
          {proximosPassos.map((p) => (
            <ChoiceItem
              key={p}
              label={p}
              selected={escolha === p}
              onSelect={() => setEscolha(p)}
            />
          ))}
        </ChoiceList>

        <Note>Pausar por agora é uma escolha válida e fica registrada.</Note>

        <Link
          to="/objetivo"
          className="viva-tap inline-flex rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-card-foreground hover:bg-secondary"
        >
          Rever meu objetivo
        </Link>
      </Screen>

      <ScreenFooter backTo="/revisao" nextTo="/linha-do-tempo" />
    </>
  );
}
