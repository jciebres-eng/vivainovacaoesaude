import { createFileRoute, Outlet } from "@tanstack/react-router";

/**
 * Percurso principal do VIVA.
 *
 * Fora da navegação global (documento 04): durante o percurso, o menu
 * completo desaparece e ficam apenas voltar, início, pausa e salvar.
 */
export const Route = createFileRoute("/jornada")({
  head: () => ({
    meta: [
      { title: "Percurso — VIVA" },
      {
        name: "description",
        content:
          "Um caminho em passos curtos: reconhecer o momento, escolher um objetivo, preparar, realizar, registrar e refletir. No seu ritmo.",
      },
      { property: "og:title", content: "Percurso — VIVA" },
      {
        property: "og:description",
        content: "Passos curtos, no seu ritmo, sem cobrança nem comparação.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PercursoLayout,
});

function PercursoLayout() {
  return (
    <main className="min-h-dvh bg-background-primary">
      <Outlet />
    </main>
  );
}
