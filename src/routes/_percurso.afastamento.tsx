import { createFileRoute, Link } from "@tanstack/react-router";

import { Note, Screen, ScreenHeader, SectionCard } from "@/components/viva/screen";
import { getStep, planoResumo } from "@/lib/viva-data";

export const Route = createFileRoute("/_percurso/afastamento")({
  head: () => ({
    meta: [
      { title: "Seu plano está pronto — VIVA" },
      {
        name: "description",
        content:
          "Feche o VIVA e realize a atividade no seu tempo. Suas informações ficam salvas.",
      },
      { property: "og:title", content: "Seu plano está pronto — VIVA" },
      {
        property: "og:description",
        content: "O VIVA incentiva a experiência fora da tela: você não precisa permanecer conectado.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AfastamentoScreen,
});

function AfastamentoScreen() {
  const step = getStep("afastamento");

  return (
    <>
      <ScreenHeader
        step={step}
        title={step.title}
        intro="Agora você pode fechar o VIVA e realizar a atividade no seu tempo."
      />

      <Screen>
        <SectionCard>
          <p className="text-card-foreground">Suas informações estão salvas.</p>
          <p className="mt-2 text-muted-foreground">
            Você não precisa permanecer conectado e pode retornar quando desejar.
          </p>
        </SectionCard>

        <Link
          to="/registro"
          className="viva-tap flex w-full items-center justify-center rounded-2xl bg-primary px-6 py-5 text-base font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Sair da tela agora
        </Link>

        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            to="/preparacao"
            className="viva-tap rounded-2xl border border-border bg-card px-5 py-4 text-center text-sm font-medium text-card-foreground hover:bg-secondary"
          >
            Continuar preparando
          </Link>
          <button
            type="button"
            className="viva-tap rounded-2xl border border-border bg-card px-5 py-4 text-sm font-medium text-card-foreground hover:bg-secondary"
          >
            Programar lembrete
          </button>
          <Link
            to="/linha-do-tempo"
            className="viva-tap rounded-2xl border border-border bg-card px-5 py-4 text-center text-sm font-medium text-card-foreground hover:bg-secondary"
          >
            Ver trajetória
          </Link>
          <button
            type="button"
            className="viva-tap rounded-2xl border border-border bg-card px-5 py-4 text-sm font-medium text-card-foreground hover:bg-secondary"
          >
            Cancelar atividade
          </button>
        </div>

        <SectionCard title="Resumo rápido">
          <ul className="space-y-2">
            {planoResumo.antes.map((i) => (
              <li key={i} className="text-card-foreground">
                ☑ {i}
              </li>
            ))}
          </ul>
        </SectionCard>

        <Note>
          Sem cronômetro, sem GPS e sem registro em tempo real. Você registra
          depois, se quiser.
        </Note>
      </Screen>
    </>
  );
}
