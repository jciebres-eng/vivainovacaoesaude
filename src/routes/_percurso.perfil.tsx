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
                className={`viva-anim rounded-2xl border p-5 ${
                  ativo ? "border-primary bg-accent" : "border-border bg-card"
                }`}
              >
                <h2 className="text-lg font-semibold text-card-foreground">
                  {p.nome}
                </h2>
                <p className="text-sm text-muted-foreground">{p.tema}</p>
                <p className="mt-3 max-w-[58ch] text-sm text-card-foreground">
                  {p.resumo}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setEscolha("perfil", p.id)}
                    className="viva-tap rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
                  >
                    {ativo ? "Perfil selecionado" : "Selecionar"}
                  </button>
                  <Link
                    to="/documentacao"
                    className="viva-tap rounded-full border border-border px-5 py-2.5 text-sm font-medium text-card-foreground hover:bg-secondary"
                  >
                    Ver resumo
                  </Link>
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
