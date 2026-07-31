import { createFileRoute } from "@tanstack/react-router";

import { GradeDeSituacoes } from "@/components/viva/match";
import { SeloDemonstrativo } from "@/components/viva/selo-demonstrativo";

export const Route = createFileRoute("/_viva/explorar")({
  head: () => ({
    meta: [
      { title: "Explorar situações — VIVA" },
      {
        name: "description",
        content:
          "Veja todas as situações disponíveis no VIVA e escolha a que faz sentido hoje para montar um percurso no seu ritmo.",
      },
      { property: "og:title", content: "Explorar situações — VIVA" },
      {
        property: "og:description",
        content: "Catálogo visual de situações: mercado, transporte, consulta, entrevista e mais.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Explorar,
});

function Explorar() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="viva-titulo-pagina text-text-primary">Explorar</h1>
        <p className="mt-2 viva-apoio text-text-secondary">
          Todas as situações ficam sempre disponíveis. Toque em uma para montar o percurso.
        </p>
      </header>

      <GradeDeSituacoes titulo="Todas as situações" />

      <SeloDemonstrativo texto="Situações demonstrativas, com dados fictícios." />
    </div>
  );
}
