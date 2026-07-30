import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import {
  ChoiceItem,
  ChoiceList,
  Note,
  Screen,
  ScreenFooter,
  ScreenHeader,
  SectionCard,
} from "@/components/viva/screen";
import { getStep, opcoesSimulacao } from "@/lib/viva-data";

export const Route = createFileRoute("/_percurso/simulacao/")({
  head: () => ({
    meta: [
      { title: "Simulação opcional — VIVA" },
      {
        name: "description",
        content:
          "Ensaie uma parte da experiência antes, sem som, sem nota e com interrupção possível a qualquer momento.",
      },
      { property: "og:title", content: "Simulação opcional — VIVA" },
      {
        property: "og:description",
        content: "A simulação é sempre opcional e dura cerca de dois minutos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SimulacaoScreen,
});

function SimulacaoScreen() {
  const step = getStep("simulacao");
  const [escolha, setEscolha] = useState(opcoesSimulacao[2]);

  return (
    <>
      <ScreenHeader
        step={step}
        title={step.title}
        intro="A simulação é opcional. Você pode interrompê-la quando quiser."
      />

      <Screen>
        <ChoiceList>
          {opcoesSimulacao.map((o) => (
            <ChoiceItem
              key={o}
              label={o}
              selected={escolha === o}
              onSelect={() => setEscolha(o)}
            />
          ))}
        </ChoiceList>

        <SectionCard title="Esta simulação">
          <ul className="space-y-2 text-card-foreground">
            <li>• dura cerca de 2 minutos</li>
            <li>• não possui som</li>
            <li>• pode ser interrompida</li>
          </ul>
        </SectionCard>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/simulacao/situacao"
            className="viva-tap rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Iniciar simulação
          </Link>
          <Link
            to="/afastamento"
            className="viva-tap rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-card-foreground hover:bg-secondary"
          >
            Continuar sem simular
          </Link>
        </div>

        <Note>
          Nenhuma simulação recebe nota e nenhum comportamento é avaliado.
        </Note>
      </Screen>

      <ScreenFooter backTo="/preparacao" nextTo="/afastamento" />
    </>
  );
}
