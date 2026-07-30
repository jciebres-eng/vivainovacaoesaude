import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import {
  ChoiceItem,
  ChoiceList,
  Field,
  Note,
  Screen,
  ScreenFooter,
  ScreenHeader,
  SectionCard,
  TextArea,
} from "@/components/viva/screen";
import { ajudou, dificultou, getStep, resultadosExperiencia } from "@/lib/viva-data";

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
  const [resultado, setResultado] = useState(resultadosExperiencia[1]);
  const [ajudaram, setAjudaram] = useState<string[]>(ajudou);
  const [dificultaram, setDificultaram] = useState<string[]>([
    "Lotação",
    "Identificação do ponto",
  ]);

  const alternar = (lista: string[], set: (v: string[]) => void, item: string) =>
    set(lista.includes(item) ? lista.filter((i) => i !== item) : [...lista, item]);

  return (
    <>
      <ScreenHeader
        step={step}
        title={step.title}
        intro="Escolha o que descreve melhor o que aconteceu. Você pode registrar depois."
      />

      <Screen>
        <ChoiceList>
          {resultadosExperiencia.map((r) => (
            <ChoiceItem
              key={r}
              label={r}
              selected={resultado === r}
              onSelect={() => setResultado(r)}
            />
          ))}
        </ChoiceList>

        <SectionCard>
          <Field label="O que aconteceu?">
            <TextArea defaultValue="Perdi o primeiro ônibus e utilizei o seguinte." />
          </Field>
        </SectionCard>

        <SectionCard title="O que ajudou">
          <ChoiceList>
            {ajudou.map((a) => (
              <ChoiceItem
                key={a}
                label={a}
                multiple
                selected={ajudaram.includes(a)}
                onSelect={() => alternar(ajudaram, setAjudaram, a)}
              />
            ))}
          </ChoiceList>
        </SectionCard>

        <SectionCard title="O que dificultou">
          <ChoiceList>
            {dificultou.map((d) => (
              <ChoiceItem
                key={d}
                label={d}
                multiple
                selected={dificultaram.includes(d)}
                onSelect={() => alternar(dificultaram, setDificultaram, d)}
              />
            ))}
          </ChoiceList>
        </SectionCard>

        <Note>
          Interromper ou não realizar também são registros legítimos do percurso.
        </Note>
      </Screen>

      <ScreenFooter backTo="/afastamento" nextTo="/revisao" />
    </>
  );
}
