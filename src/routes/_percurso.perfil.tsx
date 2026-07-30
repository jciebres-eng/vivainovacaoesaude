import { createFileRoute, Link } from "@tanstack/react-router";

import {
  ChoiceList,
  Screen,
  ScreenFooter,
  ScreenHeader,
  Note,
} from "@/components/viva/screen";
import { getStep, personas } from "@/lib/viva-data";
import { useViva } from "@/lib/viva-store";

export const Route = createFileRoute("/_percurso/perfil")({
  head: () => ({
    meta: [
      { title: "Escolha um perfil — VIVA" },
      {
        name: "description",
        content:
          "Selecione um perfil demonstrativo do VIVA. Cada perfil possui um objetivo e um contexto diferente.",
      },
      { property: "og:title", content: "Escolha um perfil — VIVA" },
      {
        property: "og:description",
        content: "Perfis demonstrativos do percurso VIVA: Lucas, Mariana, Rafael e Ana.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PerfilScreen,
});

function PerfilScreen() {
  const step = getStep("perfil");
  const { escolhas, setEscolha } = useViva();
  const selecionado = escolhas.perfil;

  return (
    <>
      <ScreenHeader
        step={step}
        title={step.title}
        intro="Cada perfil possui um objetivo e um contexto diferente. Você pode trocar de perfil depois."
      />

      <Screen>
        <ChoiceList>
          {personas.map((p) => {
            const ativo = selecionado === p.id;
            return (
              <div
                key={p.id}
                className={`viva-anim rounded-3xl border p-5 shadow-suave ${
                  ativo ? "border-primary bg-accent" : "border-border bg-card"
                }`}
              >
                <h2 className="viva-subtitulo text-card-foreground">{p.nome}</h2>
                <p className="viva-legenda text-muted-foreground">{p.tema}</p>
                <p className="mt-3 max-w-[58ch] viva-legenda text-card-foreground">
                  {p.resumo}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setEscolha("perfil", p.id)}
                    aria-pressed={ativo}
                    className={`viva-tap rounded-full border px-5 py-2.5 viva-legenda font-medium ${
                      ativo
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-card-foreground hover:bg-secondary"
                    }`}
                  >
                    {ativo ? "Perfil escolhido" : "Escolher este perfil"}
                  </button>
                  <TextAction to="/documentacao">Ver resumo</TextAction>
                </div>
              </div>
            );
          })}
        </ChoiceList>

        <Note>
          Nenhum perfil é melhor que outro. Você pode seguir e alterar essa
          escolha em qualquer momento.
        </Note>
      </Screen>

      <ScreenFooter backTo="/" nextTo="/sistema" />
    </>
  );
}
