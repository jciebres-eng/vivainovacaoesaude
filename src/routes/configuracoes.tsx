import { createFileRoute, redirect } from "@tanstack/react-router";

/** Rota histórica: as preferências vivem em /minha-experiencia. */
export const Route = createFileRoute("/configuracoes")({
  beforeLoad: () => {
    throw redirect({ to: "/minha-experiencia" });
  },
});
