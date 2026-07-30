import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import {
  Chip,
  Note,
  Screen,
  ScreenFooter,
  ScreenHeader,
} from "@/components/viva/screen";
import { conteudos, getStep } from "@/lib/viva-data";

export const Route = createFileRoute("/_percurso/biblioteca/")({
  head: () => ({
    meta: [
      { title: "Biblioteca de conteúdos — VIVA" },
      {
        name: "description",
        content:
          "Conteúdos curtos sobre mobilidade, comunicação e regulação sensorial, com tempo de leitura informado.",
      },
      { property: "og:title", content: "Biblioteca de conteúdos — VIVA" },
      {
        property: "og:description",
        content: "Leia, salve ou siga sem consultar: a leitura nunca é obrigatória.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BibliotecaScreen,
});

function BibliotecaScreen() {
  const step = getStep("biblioteca");
  const [filtro, setFiltro] = useState("Todos");
  const [salvos, setSalvos] = useState<string[]>([]);

  const categorias = ["Todos", ...new Set(conteudos.map((c) => c.categoria))];
  const lista =
    filtro === "Todos"
      ? conteudos
      : conteudos.filter((c) => c.categoria === filtro);

  return (
    <>
      <ScreenHeader
        step={step}
        title={step.title}
        intro="Conteúdos curtos ligados ao seu percurso. Você pode salvar sem abrir."
      />

      <Screen>
        <div className="flex flex-wrap gap-2">
          {categorias.map((c) => (
            <Chip
              key={c}
              label={c}
              selected={filtro === c}
              onClick={() => setFiltro(c)}
            />
          ))}
        </div>

        {lista.map((c) => (
          <div
            key={c.id}
            className="viva-anim rounded-2xl border border-border bg-card p-5"
          >
            <h2 className="text-lg font-semibold text-card-foreground">
              {c.titulo}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {c.categoria} • {c.minutos} minutos
            </p>
            <p className="mt-3 max-w-[58ch] text-sm text-card-foreground">
              {c.resumo}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                to="/biblioteca/$conteudoId"
                params={{ conteudoId: c.id }}
                className="viva-tap rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                Abrir
              </Link>
              <button
                type="button"
                onClick={() =>
                  setSalvos((p) =>
                    p.includes(c.id) ? p.filter((i) => i !== c.id) : [...p, c.id],
                  )
                }
                className="viva-tap rounded-full border border-border px-5 py-2.5 text-sm font-medium text-card-foreground hover:bg-secondary"
              >
                {salvos.includes(c.id) ? "Salvo" : "Salvar"}
              </button>
            </div>
          </div>
        ))}

        <Note>
          Nenhuma leitura é obrigatória. Você pode continuar sem consultar.
        </Note>
      </Screen>

      <ScreenFooter backTo="/estrategias" nextTo="/preparacao" />
    </>
  );
}
