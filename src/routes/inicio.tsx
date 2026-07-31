import { createFileRoute, redirect } from "@tanstack/react-router";

/** Rota histórica: a Home do VIVA é a raiz. */
export const Route = createFileRoute("/inicio")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
});
