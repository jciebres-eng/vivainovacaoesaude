import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import {
  Chip,
  Note,
  Screen,
  ScreenFooter,
  ScreenHeader,
  SectionCard,
  TextInput,
} from "@/components/viva/screen";
import { getStep, planoResumo } from "@/lib/viva-data";

export const Route = createFileRoute("/_percurso/preparacao")({
  head: () => ({
    meta: [
      { title: "Preparação da experiência — VIVA" },
      {
        name: "description",
        content:
          "Organize data, transporte, apoio, estratégia sensorial e plano alternativo em um plano simples.",
      },
      { property: "og:title", content: "Preparação da experiência — VIVA" },
      {
        property: "og:description",
        content: "Um plano curto para a experiência fora da tela, com pausa prevista.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PreparacaoScreen,
});

function PreparacaoScreen() {
  const step = getStep("preparacao");
  const [pausa, setPausa] = useState("Sim");
  const [verResumo, setVerResumo] = useState(false);

  return (
    <>
      <ScreenHeader
        step={step}
        title={step.title}
        intro="Você não precisa definir tudo agora. Data e horário são opcionais."
      />

      <Screen>
        <SectionCard>
          <div className="grid gap-5 md:grid-cols-2">
            <TextInput rotulo="Data" type="date" defaultValue="2026-07-30" />
            <TextInput rotulo="Horário" type="time" defaultValue="17:00" />
            <TextInput rotulo="Transporte principal" defaultValue="Ônibus" />
            <TextInput rotulo="Estratégia sensorial" defaultValue="Protetor auditivo" />
            <TextInput rotulo="Apoio" defaultValue="Mãe por mensagem" />
            <TextInput rotulo="Plano alternativo" defaultValue="Transporte por aplicativo" />
          </div>
        </SectionCard>

        <SectionCard title="Posso fazer pausa?">
          <div className="flex flex-wrap gap-2">
            {["Sim", "Não", "Preciso verificar"].map((o) => (
              <Chip
                key={o}
                label={o}
                selected={pausa === o}
                onClick={() => setPausa(o)}
              />
            ))}
          </div>
        </SectionCard>

        <button
          type="button"
          onClick={() => setVerResumo((v) => !v)}
          className="viva-tap w-full rounded-2xl border border-border bg-card px-5 py-4 text-sm font-semibold text-card-foreground hover:bg-secondary"
        >
          {verResumo ? "Ocultar resumo do plano" : "Ver resumo do plano"}
        </button>

        {verResumo ? (
          <div className="viva-fade space-y-4">
            <SectionCard title="Antes de sair">
              <ul className="space-y-2">
                {planoResumo.antes.map((i) => (
                  <li key={i} className="text-card-foreground">
                    ☑ {i}
                  </li>
                ))}
              </ul>
            </SectionCard>
            <SectionCard title="Durante">
              <ul className="space-y-2">
                {planoResumo.durante.map((i) => (
                  <li key={i} className="text-card-foreground">
                    • {i}
                  </li>
                ))}
              </ul>
            </SectionCard>
            <SectionCard title="Se algo mudar">
              <ul className="space-y-2">
                {planoResumo.seMudar.map((i) => (
                  <li key={i} className="text-card-foreground">
                    • {i}
                  </li>
                ))}
              </ul>
            </SectionCard>
          </div>
        ) : null}

        <Note>
          O checklist é apoio, não obrigação. Você pode remover itens e realizar
          a atividade parcialmente.
        </Note>
      </Screen>

      <ScreenFooter backTo="/biblioteca" nextTo="/simulacao" />
    </>
  );
}
