import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { Botao, Card } from "@/components/ds";
import { ConfirmacaoDeIntencao, EntradaPorVoz } from "@/components/viva/mobile";
import { contextos, type Interpretacao } from "@/lib/viva-intencao";
import { trajeto } from "@/lib/viva-trajeto";

export const Route = createFileRoute("/_movel/falar")({
  head: () => ({
    meta: [
      { title: "Dizer o que preciso — VIVA" },
      {
        name: "description",
        content:
          "Fale, escreva ou escolha com toques. O VIVA organiza um percurso a partir do que você disser, sempre pedindo confirmação.",
      },
      { property: "og:title", content: "Dizer o que preciso — VIVA" },
      {
        property: "og:description",
        content: "Entrada por voz opcional, com alternativa por escrita e toque.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Falar,
});

function Falar() {
  const navigate = useNavigate();
  const [interpretacao, setInterpretacao] = useState<Interpretacao | null>(null);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="viva-titulo text-text-primary">O que você precisa agora?</h1>
        <p className="mt-2 viva-apoio text-text-secondary">
          Uma frase é suficiente. Nada é gravado e nada sai deste aparelho.
        </p>
      </header>

      {interpretacao ? (
        <>
          <ConfirmacaoDeIntencao
            interpretacao={interpretacao}
            onConfirmar={() => {
              trajeto.iniciar(interpretacao.contexto.id);
              navigate({ to: "/realizar" });
            }}
            onCorrigir={() => setInterpretacao(null)}
          />
          <Card variante="informativo" titulo="Outra leitura possível">
            <ul className="flex flex-wrap gap-2">
              {Object.values(contextos)
                .filter((c) => c.id !== "indefinido" && c.id !== interpretacao.contexto.id)
                .map((c) => (
                  <li key={c.id}>
                    <Botao
                      variante="secundario"
                      tamanho="compacto"
                      onClick={() => {
                        trajeto.iniciar(c.id);
                        navigate({ to: "/realizar" });
                      }}
                    >
                      {c.titulo}
                    </Botao>
                  </li>
                ))}
            </ul>
          </Card>
        </>
      ) : (
        <EntradaPorVoz onInterpretar={setInterpretacao} />
      )}

      <Card variante="informativo" titulo="Prefere montar com cartões?">
        <Botao variante="secundario" onClick={() => navigate({ to: "/montar" })}>
          Montar com toques
        </Botao>
      </Card>
    </div>
  );
}
