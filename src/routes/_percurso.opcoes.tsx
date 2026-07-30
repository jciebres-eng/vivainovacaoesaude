import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import {
  Chip,
  Note,
  Screen,
  ScreenFooter,
  ScreenHeader,
} from "@/components/viva/screen";
import { getStep, opcoes } from "@/lib/viva-data";

export const Route = createFileRoute("/_percurso/opcoes")({
  head: () => ({
    meta: [
      { title: "Comparação de opções — VIVA" },
      {
        name: "description",
        content:
          "Compare custo, tempo, estímulos e previsibilidade e escolha uma opção principal e uma alternativa.",
      },
      { property: "og:title", content: "Comparação de opções — VIVA" },
      {
        property: "og:description",
        content: "Nenhuma opção é escolhida automaticamente: os critérios ficam visíveis para você decidir.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OpcoesScreen,
});

function OpcoesScreen() {
  const step = getStep("opcoes");
  const [principal, setPrincipal] = useState<string | null>("onibus");
  const [alternativa, setAlternativa] = useState<string | null>("aplicativo");
  const [ordem, setOrdem] = useState("Custo");

  return (
    <>
      <ScreenHeader
        step={step}
        title={step.title}
        intro="Compare duas ou três alternativas. Você pode trocar essa escolha depois."
      />

      <Screen>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Ordenar por:</span>
          {["Custo", "Tempo", "Estímulos"].map((c) => (
            <Chip
              key={c}
              label={c}
              selected={ordem === c}
              onClick={() => setOrdem(c)}
            />
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {opcoes.map((o) => {
            const ehPrincipal = principal === o.id;
            const ehAlternativa = alternativa === o.id;
            return (
              <div
                key={o.id}
                className={`viva-anim rounded-2xl border bg-card p-5 ${
                  ehPrincipal ? "border-primary" : "border-border"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="viva-subtitulo text-card-foreground">
                    {o.nome}
                  </h2>
                  {ehPrincipal ? (
                    <span className="shrink-0 rounded-full bg-accent px-3 py-1.5 viva-legenda font-medium text-accent-foreground">
                      Principal
                    </span>
                  ) : ehAlternativa ? (
                    <span className="shrink-0 rounded-full bg-secondary px-3 py-1.5 viva-legenda font-medium text-secondary-foreground">
                      Alternativa
                    </span>
                  ) : null}
                </div>

                <dl className="mt-4 space-y-2">
                  {o.criterios.map((c) => (
                    <div
                      key={c.rotulo}
                      className="flex items-center justify-between gap-3 border-b border-border pb-2 text-sm last:border-0"
                    >
                      <dt className="text-muted-foreground">{c.rotulo}</dt>
                      <dd className="font-medium text-card-foreground">
                        {c.valor}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Chip
                    label="Principal"
                    selected={ehPrincipal}
                    onClick={() => setPrincipal(o.id)}
                  />
                  <Chip
                    label="Alternativa"
                    selected={ehAlternativa}
                    onClick={() => setAlternativa(o.id)}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <Note>
          Critérios podem entrar em conflito: a opção mais rápida pode ser a mais
          cara. A decisão continua sendo sua.
        </Note>
      </Screen>

      <ScreenFooter backTo="/barreiras" nextTo="/habilidades" />
    </>
  );
}
