import { createFileRoute } from "@tanstack/react-router";
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
import { getStep, habilidades, jaConsigo } from "@/lib/viva-data";

export const Route = createFileRoute("/_percurso/habilidades")({
  head: () => ({
    meta: [
      { title: "Habilidades que quero desenvolver — VIVA" },
      {
        name: "description",
        content:
          "Escolha habilidades ligadas ao seu objetivo, marque o que já consegue fazer ou siga sem escolher.",
      },
      { property: "og:title", content: "Habilidades que quero desenvolver — VIVA" },
      {
        property: "og:description",
        content: "Sem pontuação e sem linguagem de correção: apenas capacidades que você quer ampliar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HabilidadesScreen,
});

function HabilidadesScreen() {
  const step = getStep("habilidades");
  const [escolhidas, setEscolhidas] = useState<string[]>([
    "Planejar o trajeto",
    "Pedir ajuda por mensagem",
  ]);
  const [tenho, setTenho] = useState<string[]>(jaConsigo);

  const alternar = (
    lista: string[],
    set: (v: string[]) => void,
    item: string,
  ) =>
    set(
      lista.includes(item) ? lista.filter((i) => i !== item) : [...lista, item],
    );

  return (
    <>
      <ScreenHeader
        step={step}
        title={step.title}
        intro="Escolha uma ou mais habilidades relacionadas ao seu objetivo. Você também pode seguir sem escolher."
      />

      <Screen>
        <SectionCard title="Quero desenvolver">
          <ChoiceList>
            {habilidades.map((h) => (
              <ChoiceItem
                key={h}
                label={h}
                multiple
                selected={escolhidas.includes(h)}
                onSelect={() => alternar(escolhidas, setEscolhidas, h)}
              />
            ))}
          </ChoiceList>
        </SectionCard>

        <SectionCard title="O que você já consegue fazer">
          <ChoiceList>
            {jaConsigo.map((h) => (
              <ChoiceItem
                key={h}
                label={h}
                multiple
                selected={tenho.includes(h)}
                onSelect={() => alternar(tenho, setTenho, h)}
              />
            ))}
          </ChoiceList>
        </SectionCard>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="viva-tap rounded-full border border-dashed border-border-default px-5 py-3 text-sm font-medium text-text-secondary hover:bg-secondary"
          >
            Criar habilidade própria
          </button>
        </div>

        <Note>
          Não existe pontuação nem comparação com outras pessoas. Você pode
          continuar sem escolher nenhuma habilidade.
        </Note>
      </Screen>

      <ScreenFooter
        backTo="/opcoes"
        nextTo="/estrategias"
        extra={
          <p className="text-sm text-text-secondary">
            Prefere seguir agora? Use “Continuar” sem selecionar nada.
          </p>
        }
      />
    </>
  );
}
