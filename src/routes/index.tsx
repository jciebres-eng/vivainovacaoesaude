import { createFileRoute, Link } from "@tanstack/react-router";

import { BotaoLink } from "@/components/ds";
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

        <h1 className="mt-8 viva-titulo text-text-primary">VIVA</h1>
        <p className="mt-4 max-w-[52ch] viva-texto text-text-secondary">
          Um espaço para organizar, no seu ritmo, algo que você deseja realizar
          no dia a dia. Sem cobrança, sem comparação e sem pressa.
        </p>

        {/* Uma única ação principal por tela (doc 14). O resto é convite. */}
        <div className="mt-10">
          <BotaoLink
            to="/meu-momento"
            variante="principal"
            className="w-full sm:w-auto"
          >
            Entrar
          </BotaoLink>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            to="/jornada"
            className="viva-tap inline-flex w-fit items-center viva-legenda font-medium text-text-secondary underline underline-offset-4 hover:text-text-primary"
          >
            Prefiro começar algo novo agora
          </Link>
          <Link
            to="/sobre"
            className="viva-tap inline-flex w-fit items-center viva-legenda font-medium text-text-secondary underline underline-offset-4 hover:text-text-primary"
          >
            Sobre o VIVA e seus limites
          </Link>
          <Link
            to="/minha-experiencia"
            className="viva-tap inline-flex w-fit items-center viva-legenda font-medium text-text-secondary underline underline-offset-4 hover:text-text-primary"
          >
            Ajustar leitura, cor e movimento
          </Link>
        </div>

        <p className="mt-16 max-w-[52ch] viva-legenda text-text-secondary">
          Demonstração com dados fictícios. O VIVA não faz diagnóstico e não
          substitui acompanhamento profissional. Suas escolhas ficam apenas neste
          dispositivo.
        </p>
      </div>
    </main>
  );
}
