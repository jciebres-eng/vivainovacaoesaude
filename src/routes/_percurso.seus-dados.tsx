import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Confirmacao } from "@/components/ds";
import {
  Note,
  Screen,
  ScreenHeader,
  SectionCard,
  TextAction,
} from "@/components/viva/screen";
import { useViva } from "@/lib/viva-store";

export const Route = createFileRoute("/_percurso/seus-dados")({
  head: () => ({
    meta: [
      { title: "Seus dados no VIVA — transparência e controle" },
      {
        name: "description",
        content:
          "O que o VIVA guarda, onde essas informações ficam e como apagar tudo a qualquer momento.",
      },
      { property: "og:title", content: "Seus dados no VIVA" },
      {
        property: "og:description",
        content:
          "Transparência sobre armazenamento local, uso das informações e como apagar tudo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SeusDadosPage,
});

function SeusDadosPage() {
  const { resetSettings } = useViva();
  const [confirmando, setConfirmando] = useState(false);
  const [apagado, setApagado] = useState(false);

  function apagarTudo() {
    try {
      window.localStorage.removeItem("viva:escolhas");
      window.localStorage.removeItem("viva:configuracoes");
    } catch {
      /* armazenamento indisponível */
    }
    resetSettings();
    setConfirmando(false);
    setApagado(true);
  }

  return (
    <>
      <ScreenHeader
        title="Seus dados"
        intro="Você pode saber, a qualquer momento, o que está guardado e apagar tudo."
      />

      <Screen>
        <SectionCard title="O que é guardado">
          <ul className="space-y-2.5 text-text-primary">
            <li>As escolhas que você faz durante o percurso.</li>
            <li>Suas preferências de leitura, cor, animação e ritmo.</li>
          </ul>
        </SectionCard>

        <SectionCard title="Onde essas informações ficam">
          <p className="text-text-primary">
            Tudo fica no armazenamento local deste dispositivo, no seu navegador.
            Nesta versão não existe conta, servidor, envio de dados nem
            compartilhamento com terceiros.
          </p>
        </SectionCard>

        <SectionCard title="Para que são usadas">
          <p className="text-text-primary">
            Apenas para mostrar de novo o que você já escolheu e manter a
            interface do jeito que você prefere. Nada é usado para medir
            desempenho, comparar pessoas ou estimular tempo de uso.
          </p>
        </SectionCard>

        <SectionCard title="Apagar tudo">
          <p className="text-text-primary">
            Você pode apagar suas escolhas e preferências deste dispositivo. Essa
            ação não pode ser desfeita.
          </p>

          {!confirmando ? (
            <button
              type="button"
              onClick={() => setConfirmando(true)}
              className="viva-tap mt-4 inline-flex rounded-full border border-border-default bg-surface-default px-5 py-3 font-medium text-text-primary hover:bg-secondary"
            >
              Apagar meus dados deste dispositivo
            </button>
          ) : (
            <div className="mt-4 rounded-2xl border border-border-default p-4">
              <p className="text-text-primary">
                Deseja apagar suas escolhas e preferências guardadas neste
                dispositivo?
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={apagarTudo}
                  className="viva-tap inline-flex min-h-11 items-center rounded-full bg-action-primary px-5 py-3 viva-rotulo font-semibold text-action-primary-foreground hover:bg-action-primary-hover"
                >
                  Apagar
                </button>
                <TextAction onClick={() => setConfirmando(false)}>
                  Manter meus dados
                </TextAction>
              </div>
            </div>
          )}

          {apagado ? (
            <div className="mt-4">
              <Confirmacao>
                Dados apagados deste dispositivo. Você pode começar de novo quando
                quiser.
              </Confirmacao>
            </div>
          ) : null}
        </SectionCard>

        <Note>
          Se algum dia o VIVA passar a guardar informações fora do seu
          dispositivo, isso será explicado antes, em linguagem simples, e
          dependerá da sua escolha.
        </Note>
      </Screen>
    </>
  );
}
