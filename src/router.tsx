import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { TelaEmPreparacao } from "./components/ds/carregando";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    // Carregamento sem sobressalto: só aparece se demorar, e permanece o
    // tempo suficiente para não piscar (documento 04).
    defaultPendingMs: 400,
    defaultPendingMinMs: 500,
    defaultPendingComponent: () => <TelaEmPreparacao />,
  });

  return router;
};
