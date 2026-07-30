import { createFileRoute, Outlet } from "@tanstack/react-router";

import { AppShell } from "@/components/viva/app-shell";

export const Route = createFileRoute("/_percurso")({
  component: PercursoLayout,
});

function PercursoLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
