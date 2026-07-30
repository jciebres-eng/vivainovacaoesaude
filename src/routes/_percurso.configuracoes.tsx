import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * "Configurações" virou "Minha experiência" (Fase 5).
 * O endereço antigo continua funcionando para quem o guardou.
 */
export const Route = createFileRoute("/_percurso/configuracoes")({
  beforeLoad: () => {
    throw redirect({ to: "/minha-experiencia" });
  },
});
