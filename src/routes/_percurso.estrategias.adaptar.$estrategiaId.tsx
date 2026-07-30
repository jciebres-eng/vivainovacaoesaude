import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import {
  ChoiceItem,
  ChoiceList,
  Field,
  Screen,
  ScreenHeader,
  SectionCard,
  TextArea,
} from "@/components/viva/screen";
import { estrategias, formasAdaptacao } from "@/lib/viva-data";

export const Route = createFileRoute("/_percurso/estrategias/adaptar/$estrategiaId")({
  head: () => ({
    meta: [
      { title: "Adaptar estratégia — VIVA" },
      {
        name: "description",
        content:
          "Ajuste uma estratégia sugerida para a forma que funciona melhor para você.",
      },
      { property: "og:title", content: "Adaptar estratégia — VIVA" },
      {
        property: "og:description",
        content: "Escolha outra forma de realizar a estratégia ou escreva a sua adaptação.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdaptarScreen,
});

function AdaptarScreen() {
  const { estrategiaId } = Route.useParams();
  const original = estrategias.find((e) => e.id === estrategiaId);
  const [forma, setForma] = useState(formasAdaptacao[0]);

  return (
    <>
      <ScreenHeader
        title="Adaptar estratégia"
        intro={
          original
            ? `Estratégia original: ${original.titulo}`
            : "Estratégia original não encontrada."
        }
      />

      <Screen>
        <SectionCard title="Como prefere realizar?">
          <ChoiceList>
            {formasAdaptacao.map((f) => (
              <ChoiceItem
                key={f}
                label={f}
                selected={forma === f}
                onSelect={() => setForma(f)}
              />
            ))}
          </ChoiceList>
        </SectionCard>

        <SectionCard>
          <Field label="Minha adaptação">
            <TextArea defaultValue="Mostrar uma pergunta escrita" />
          </Field>
        </SectionCard>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/estrategias"
            className="viva-tap rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-card-foreground hover:bg-secondary"
          >
            Cancelar
          </Link>
          <Link
            to="/estrategias"
            className="viva-tap rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Salvar adaptação
          </Link>
        </div>
      </Screen>
    </>
  );
}
