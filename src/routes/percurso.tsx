import { createFileRoute, Outlet } from "@tanstack/react-router";

/**
 * Percurso principal do VIVA.
 *
 * Fora da navegação global (documento 04): durante o percurso, o menu
 * completo desaparece e ficam apenas voltar, início, pausa e salvar.
 */
export const Route = createFileRoute("/percurso")({
  component: PercursoLayout,
});

function PercursoLayout() {
  return (
    <main className="min-h-dvh bg-background-primary">
      <Outlet />
    </main>
  );
}
