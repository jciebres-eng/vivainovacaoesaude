import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

import { Note, Screen, ScreenHeader, SectionCard } from "@/components/viva/screen";
import { PausaConscienteCard } from "@/components/viva/humanos";
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
  const navigate = useNavigate();

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
          <p className="mt-2 text-text-secondary">
            Você não precisa permanecer conectado e pode retornar quando desejar.
          </p>
        </SectionCard>

        <PausaConscienteCard
          onContinuarDepois={() => navigate({ to: "/registro" })}
          linkEstrategias="/estrategias"
          onVoltarAoInicio={() => navigate({ to: "/meu-momento" })}
          onFecharAtividade={() => navigate({ to: "/linha-do-tempo" })}
        />


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
