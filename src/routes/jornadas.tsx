import { createFileRoute, redirect } from "@tanstack/react-router";

/** Rota histórica: as jornadas vivem em /meu-percurso. */
export const Route = createFileRoute("/jornadas")({
  beforeLoad: () => {
    throw redirect({ to: "/meu-percurso" });
  },
});
