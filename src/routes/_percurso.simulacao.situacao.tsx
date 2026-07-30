import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import {
  ChoiceItem,
  ChoiceList,
  Note,
  Screen,
  ScreenHeader,
  SectionCard,
  TextArea,
} from "@/components/viva/screen";
import { respostasSituacao } from "@/lib/viva-data";

export const Route = createFileRoute("/_percurso/simulacao/situacao")({
  head: () => ({
    meta: [
      { title: "Simulação textual — VIVA" },
      {
        name: "description",
        content:
          "Uma situação escrita para ensaiar uma decisão do trajeto, sem som e sem avaliação.",
      },
      { property: "og:title", content: "Simulação textual — VIVA" },
      {
        property: "og:description",
        content: "Escolha como agir na situação e adapte a mensagem se quiser.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SituacaoScreen,
});

function SituacaoScreen() {
  const [resposta, setResposta] = useState(respostasSituacao[1]);

  return (
    <>
      <ScreenHeader
        title="Situação"
        intro="Você não sabe se o ônibus já passou pelo ponto onde deveria descer."
      />

      <Screen>
        <SectionCard title="O que deseja fazer?">
          <ChoiceList>
            {respostasSituacao.map((r) => (
              <ChoiceItem
                key={r}
                label={r}
                selected={resposta === r}
                onSelect={() => setResposta(r)}
              />
            ))}
          </ChoiceList>
        </SectionCard>

        <SectionCard>
          <TextArea rotulo="Mensagem" defaultValue="Este ônibus passa perto da Faculdade Central?" />
        </SectionCard>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/simulacao"
            className="viva-tap rounded-full border border-border-default bg-surface-default px-5 py-3 text-sm font-semibold text-card-foreground hover:bg-secondary"
          >
            Interromper simulação
          </Link>
          <Link
            to="/afastamento"
            className="viva-tap rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Continuar
          </Link>
        </div>

        <Note>Sem nota, sem repetição obrigatória, sem som.</Note>
      </Screen>
    </>
  );
}
