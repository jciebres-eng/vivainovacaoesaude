import { createFileRoute } from "@tanstack/react-router";

import {
  Note,
  Screen,
  ScreenFooter,
  ScreenHeader,
  SectionCard,
} from "@/components/viva/screen";
import { getStep, meuSistema } from "@/lib/viva-data";

export const Route = createFileRoute("/_percurso/sistema")({
  head: () => ({
    meta: [
      { title: "Meu sistema hoje — VIVA" },
      {
        name: "description",
        content:
          "Resumo inicial do que você já faz, dos recursos que possui, dos apoios e das suas preferências.",
      },
      { property: "og:title", content: "Meu sistema hoje — VIVA" },
      {
        property: "og:description",
        content: "Capacidades, recursos, apoios e preferências reunidos em um resumo editável.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SistemaScreen,
});

function SistemaScreen() {
  const step = getStep("sistema");

  return (
    <>
      <ScreenHeader
        step={step}
        title={step.title}
        intro="Este é um resumo inicial. Você pode alterar qualquer item."
      />

      <Screen>
        {meuSistema.map((bloco) => (
          <SectionCard key={bloco.titulo} title={bloco.titulo}>
            <ul className="space-y-2">
              {bloco.itens.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-card-foreground"
                >
                  <span
                    aria-hidden
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </SectionCard>
        ))}

        <button
          type="button"
          className="viva-tap w-full rounded-2xl border border-dashed border-border-default px-5 py-4 text-sm font-medium text-text-secondary hover:bg-secondary"
        >
          Editar resumo
        </button>

        <Note>
          Este resumo não é avaliação, diagnóstico nem nível funcional. É apenas
          o conjunto de elementos que compõem a sua vida hoje.
        </Note>
      </Screen>

      <ScreenFooter backTo="/perfil" nextTo="/objetivo" />
    </>
  );
}
