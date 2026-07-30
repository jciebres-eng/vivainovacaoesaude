import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { VivaProvider } from "../lib/viva-store";
import { ExperienciaProvider } from "../lib/viva-experiencia";

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-6">
      <div className="max-w-md">
        <h1 className="viva-titulo text-foreground">
          Esta página não está aqui
        </h1>
        <p className="mt-3 text-text-secondary">
          Talvez o endereço tenha mudado. Nada do que você já escolheu foi
          perdido.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="viva-tap inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-6">
      <div className="max-w-md">
        <h1 className="viva-titulo text-foreground">
          Não foi possível abrir esta página
        </h1>
        <p className="mt-3 text-text-secondary">
          Isso não tem relação com nada que você fez. O que você já registrou
          continua guardado neste dispositivo. Você pode tentar novamente agora
          ou voltar mais tarde.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="viva-tap inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="viva-tap inline-flex min-h-11 items-center justify-center rounded-full border border-border-default bg-surface-default px-5 py-3 viva-legenda font-medium text-card-foreground hover:bg-secondary"
          >
            Voltar para o início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Biblioteca VIVA — Base documental da solução" },
      {
        name: "description",
        content:
          "Biblioteca de referência do VIVA: visão da solução, problema social, princípios éticos e requisitos de experiência neuroinclusiva.",
      },
      { name: "author", content: "VIVA" },
      { property: "og:title", content: "Biblioteca VIVA — Base documental da solução" },
      {
        property: "og:description",
        content: "Biblioteca de referência do VIVA: visão da solução, problema social, princípios éticos e requisitos de experiência neuroinclusiva.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Biblioteca VIVA — Base documental da solução" },
      { name: "twitter:description", content: "Biblioteca de referência do VIVA: visão da solução, problema social, princípios éticos e requisitos de experiência neuroinclusiva." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/654089da-003e-4f8a-aa3d-0a513a884a6e" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/654089da-003e-4f8a-aa3d-0a513a884a6e" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <VivaProvider>
        <ExperienciaProvider>
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </ExperienciaProvider>
      </VivaProvider>
    </QueryClientProvider>
  );
}
