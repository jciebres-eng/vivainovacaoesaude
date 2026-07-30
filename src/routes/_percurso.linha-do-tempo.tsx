import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import {
  Chip,
  Note,
  Screen,
  ScreenFooter,
  ScreenHeader,
  SectionCard,
} from "@/components/viva/screen";
import { filtrosLinha, getStep, linhaDoTempo } from "@/lib/viva-data";

export const Route = createFileRoute("/_percurso/linha-do-tempo")({
  head: () => ({
    meta: [
      { title: "Minha trajetória — VIVA" },
      {
        name: "description",
        content:
          "Linha do tempo do percurso: objetivos, estratégias, experiências, dúvidas e conteúdos salvos.",
      },
      { property: "og:title", content: "Minha trajetória — VIVA" },
      {
        property: "og:description",
        content: "Sem ranking, sem medalhas e sem comparação entre pessoas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LinhaDoTempoScreen,
});

function LinhaDoTempoScreen() {
  const step = getStep("linha-do-tempo");
  const [filtro, setFiltro] = useState("Todos");

  const lista =
    filtro === "Todos"
      ? linhaDoTempo
      : linhaDoTempo.filter((r) => r.tipo === filtro);

  return (
    <>
      <ScreenHeader
        step={step}
        title={step.title}
        intro="Seu percurso registrado em ordem. Você pode editar, ocultar ou exportar."
      />

      <Screen>
        <div className="flex flex-wrap gap-2">
          {filtrosLinha.map((f) => (
            <Chip
              key={f}
              label={f}
              selected={filtro === f}
              onClick={() => setFiltro(f)}
            />
          ))}
        </div>

        <ol className="relative space-y-4 border-l border-border pl-6">
          {lista.map((r) => (
            <li key={`${r.data}-${r.titulo}`} className="viva-fade relative">
              <span
                aria-hidden
                className="absolute -left-[1.72rem] top-2 h-3 w-3 rounded-full border-2 border-background bg-primary"
              />
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {r.data} · {r.tipo}
              </p>
              <p className="mt-1 font-semibold text-foreground">{r.titulo}</p>
              <p className="text-sm text-muted-foreground">{r.descricao}</p>
            </li>
          ))}
        </ol>

        <SectionCard title="Próximo passo">
          <p className="text-card-foreground">Repetir o trajeto com adaptações</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              to="/proximo-passo"
              className="viva-tap rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Iniciar próximo passo
            </Link>
            <Link
              to="/perfil"
              className="viva-tap rounded-full border border-border px-5 py-2.5 text-sm font-medium text-card-foreground hover:bg-secondary"
            >
              Voltar ao início do percurso
            </Link>
          </div>
        </SectionCard>

        <Note>
          Sem ranking, sem medalhas e sem cores de aprovação ou reprovação.
        </Note>
      </Screen>

      <ScreenFooter backTo="/proximo-passo" nextTo="/configuracoes" nextLabel="Ajustar interface" />
    </>
  );
}
