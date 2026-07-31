import { createFileRoute, Outlet } from "@tanstack/react-router";

import { CascaViva } from "@/components/viva/casca";

/**
 * Camada única do VIVA: cinco áreas, uma pergunta por tela e o Assistente
 * flutuante (documentos 04, 12, 14 e 24).
 */
export const Route = createFileRoute("/_viva")({
  component: LayoutViva,
});

function LayoutViva() {
  return (
    <CascaViva>
      <Outlet />
    </CascaViva>
  );
}
