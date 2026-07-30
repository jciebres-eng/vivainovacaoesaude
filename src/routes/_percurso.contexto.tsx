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
import { contextoBlocos, getStep } from "@/lib/viva-data";

export const Route = createFileRoute("/_percurso/contexto")({
  head: () => ({
    meta: [
      { title: "Meu contexto — VIVA" },
      {
        name: "description",
        content:
          "Informe transporte, custo, internet e horários possíveis. Responda apenas o que fizer sentido.",
      },
      { property: "og:title", content: "Meu contexto — VIVA" },
      {
        property: "og:description",
        content: "Elementos da sua realidade que influenciam a realização do objetivo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContextoScreen,
});

function ContextoScreen() {
  const step = getStep("contexto");
  const [visiveis, setVisiveis] = useState(3);
  const [estado, setEstado] = useState<Record<string, string[]>>(() =>
    Object.fromEntries(contextoBlocos.map((b) => [b.titulo, b.marcados])),
  );

  function alternar(titulo: string, opcao: string, unica: boolean) {
    setEstado((prev) => {
      const atual = prev[titulo] ?? [];
      if (unica) return { ...prev, [titulo]: [opcao] };
      return {
        ...prev,
        [titulo]: atual.includes(opcao)
          ? atual.filter((o) => o !== opcao)
          : [...atual, opcao],
      };
    });
  }

  return (
    <>
      <ScreenHeader
        step={step}
        title={step.title}
        intro="Responda apenas o que fizer sentido. Você pode pular perguntas e corrigir depois."
      />

      <Screen>
        {contextoBlocos.slice(0, visiveis).map((bloco) => (
          <SectionCard key={bloco.titulo} title={bloco.titulo}>
            <ChoiceList>
              {bloco.opcoes.map((op) => (
                <ChoiceItem
                  key={op}
                  label={op}
                  multiple={bloco.tipo === "multipla"}
                  selected={(estado[bloco.titulo] ?? []).includes(op)}
                  onSelect={() =>
                    alternar(bloco.titulo, op, bloco.tipo === "unica")
                  }
                />
              ))}
            </ChoiceList>
          </SectionCard>
        ))}

        {visiveis < contextoBlocos.length ? (
          <button
            type="button"
            onClick={() => setVisiveis((v) => v + 1)}
            className="viva-tap w-full rounded-2xl border border-dashed border-border-default px-5 py-4 text-sm font-medium text-text-secondary hover:bg-secondary"
          >
            Adicionar outra informação
          </button>
        ) : null}

        <Note>
          Não é necessário informar endereço completo. Estas informações servem
          apenas para personalizar as sugestões.
        </Note>
      </Screen>

      <ScreenFooter backTo="/objetivo" nextTo="/barreiras" />
    </>
  );
}
