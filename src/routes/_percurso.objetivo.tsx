import { createFileRoute } from "@tanstack/react-router";

import {
  ChoiceItem,
  ChoiceList,
  Note,
  Screen,
  ScreenFooter,
  ScreenHeader,
  SectionCard,
  TextArea,
  TextInput,
} from "@/components/viva/screen";
import { getStep, objetivosSugeridos } from "@/lib/viva-data";
import { useViva } from "@/lib/viva-store";

export const Route = createFileRoute("/_percurso/objetivo")({
  head: () => ({
    meta: [
      { title: "Escolha do objetivo — VIVA" },
      {
        name: "description",
        content:
          "Escolha um objetivo sugerido ou escreva o seu. O objetivo pode ser alterado depois.",
      },
      { property: "og:title", content: "Escolha do objetivo — VIVA" },
      {
        property: "og:description",
        content: "Defina o objetivo que dará direção ao seu percurso no VIVA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ObjetivoScreen,
});

function ObjetivoScreen() {
  const step = getStep("objetivo");
  const { escolhas, setEscolha } = useViva();
  const objetivo = escolhas.objetivo;

  return (
    <>
      <ScreenHeader
        step={step}
        title={step.title}
        intro="Escolha uma opção sugerida ou escreva o seu objetivo. Ele pode mudar sempre que você quiser."
      />

      <Screen>
        <ChoiceList>
          {objetivosSugeridos.map((op) => (
            <ChoiceItem
              key={op}
              label={op}
              selected={objetivo === op}
              onSelect={() => setEscolha("objetivo", op)}
            />
          ))}
        </ChoiceList>

        <SectionCard>
          <div className="space-y-5">
            <TextInput rotulo="Meu objetivo" placeholder="Escreva com suas palavras" />
            <TextArea rotulo="Por que isso é importante para você?" placeholder="Você pode responder depois" />
          </div>
        </SectionCard>

        <Note>
          Escolher um objetivo não cria obrigação. Você pode selecionar “ainda
          não sei” e seguir.
        </Note>
      </Screen>

      <ScreenFooter backTo="/sistema" nextTo="/contexto" />
    </>
  );
}
