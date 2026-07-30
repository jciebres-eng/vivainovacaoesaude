import { createFileRoute, Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VIVA — apoio ao desenvolvimento funcional no dia a dia" },
      {
        name: "description",
        content:
          "O VIVA ajuda a transformar um objetivo do seu dia a dia em passos possíveis, no seu ritmo. Sem cobrança, sem comparação, sem pressa.",
      },
      {
        property: "og:title",
        content: "VIVA — apoio ao desenvolvimento funcional no dia a dia",
      },
      {
        property: "og:description",
        content:
          "Um ambiente digital calmo, acessível e centrado na autonomia das pessoas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Inicio,
});

function Inicio() {
  return (
    <main className="min-h-dvh bg-background px-6 py-16 md:px-10 md:py-24">
      <div className="viva-fade mx-auto max-w-2xl">
        <span
          aria-hidden
          className="grid h-12 w-12 place-items-center rounded-full bg-salvia-suave text-salvia"
        >
          <Leaf className="h-5 w-5" />
        </span>

        <h1 className="mt-8 viva-titulo text-foreground">VIVA</h1>
        <p className="mt-4 max-w-[52ch] text-muted-foreground">
          Um espaço para organizar, no seu ritmo, algo que você deseja realizar
          no dia a dia. Sem cobrança, sem comparação e sem pressa.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            to="/percurso"
            className="viva-tap inline-flex w-full items-center justify-center rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground hover:bg-primary/90 sm:w-auto"
          >
            Começar meu percurso
          </Link>
          <Link
            to="/meu-momento"
            className="viva-tap inline-flex w-full items-center justify-center rounded-full border border-border px-8 py-4 font-medium text-foreground hover:bg-muted sm:w-auto"
          >
            Entrar no meu momento
          </Link>
        </div>


        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            to="/sobre"
            className="viva-tap viva-legenda font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            Sobre o VIVA e seus limites
          </Link>
          <Link
            to="/configuracoes"
            className="viva-tap viva-legenda font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            Ajustar leitura, cor e movimento
          </Link>
        </div>

        <p className="mt-16 max-w-[52ch] viva-legenda text-muted-foreground">
          Demonstração com dados fictícios. O VIVA não faz diagnóstico e não
          substitui acompanhamento profissional. Suas escolhas ficam apenas neste
          dispositivo.
        </p>
      </div>
    </main>
  );
}
