import { createFileRoute, useNavigate } from "@tanstack/react-router";

import {
  Note,
  Screen,
  ScreenFooter,
  ScreenHeader,
} from "@/components/viva/screen";
import { RegistroExperienciaCard } from "@/components/viva/humanos";
import { getStep } from "@/lib/viva-data";

export const Route = createFileRoute("/_percurso/registro")({
  head: () => ({
    meta: [
      { title: "Registro posterior — VIVA" },
      {
        name: "description",
        content:
          "Registre como foi a experiência, o que ajudou e o que dificultou. Registrar depois também é uma opção.",
      },
      { property: "og:title", content: "Registro posterior — VIVA" },
      {
        property: "og:description",
        content: "Sem cobrança e sem julgamento: qualquer resultado é um registro válido.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RegistroScreen,
});

function RegistroScreen() {
  const step = getStep("registro");
  const navigate = useNavigate();

  return (
    <>
      <ScreenHeader
        step={step}
        title={step.title}
        intro="Descreva o que aconteceu com suas palavras. Você pode registrar depois."
      />

      <Screen>
        <RegistroExperienciaCard
          onSalvar={() => navigate({ to: "/revisao" })}
          onRegistrarDepois={() => navigate({ to: "/meu-momento" })}
          onDispensar={() => navigate({ to: "/meu-momento" })}
        />

        <Note>
          Interromper ou não realizar também são registros legítimos do percurso.
        </Note>
      </Screen>

      <ScreenFooter backTo="/afastamento" nextTo="/revisao" />
    </>
  );
}

