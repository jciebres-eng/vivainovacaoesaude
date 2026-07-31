import { createFileRoute, Outlet } from "@tanstack/react-router";

import { CascaMobile } from "@/components/viva/mobile";

/**
 * Camada móvel do VIVA: sem menus profundos, sem hierarquia escondida.
 * Quatro áreas na barra inferior e uma pergunta por tela (documentos 04 e 14).
 */
export const Route = createFileRoute("/_movel")({
  component: LayoutMovel,
});

function LayoutMovel() {
  return (
    <CascaMobile>
      <Outlet />
    </CascaMobile>
  );
}
