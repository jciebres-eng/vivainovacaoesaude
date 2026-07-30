import { createFileRoute, Link } from "@tanstack/react-router";

import { Botao, Card, EstadoDaInterface } from "@/components/ds";
import { Screen, ScreenHeader } from "@/components/viva/screen";
import { conteudoPorId, perguntasDeReflexao } from "@/lib/viva-biblioteca-dados";
import { useBiblioteca } from "@/lib/viva-biblioteca";

export const Route = createFileRoute("/_percurso/biblioteca/reflexoes")({
  head: () => ({
    meta: [
      { title: "Minhas Reflexões — biblioteca | VIVA" },
      {
        name: "description",
        content:
          "O que você percebeu ao ler os conteúdos da biblioteca. Registros pessoais, sem avaliação, guardados apenas neste dispositivo.",
      },
      { property: "og:title", content: "Minhas Reflexões — VIVA" },
      {
        property: "og:description",
        content: "Suas percepções sobre os conteúdos que leu.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ReflexoesScreen,
});

function ReflexoesScreen() {
  const { dados, apagarReflexao } = useBiblioteca();
  const reflexoes = [...dados.reflexoes].sort((a, b) =>
    b.criadaEm.localeCompare(a.criadaEm),
  );

  return (
    <>
      <ScreenHeader
        title="Minhas Reflexões"
        intro="O que você percebeu ao ler. Não há respostas certas e nada aqui é analisado."
      />

      <Screen>
        {reflexoes.length === 0 ? (
          <EstadoDaInterface
            tipo="vazio"
            titulo="Você ainda não registrou reflexões."
            texto="Ao ler um conteúdo, você pode responder às perguntas se quiser."
            acao={
              <Link
                to="/biblioteca"
                className="viva-tap inline-flex min-h-11 items-center rounded-full border border-border-default bg-surface-default px-5 py-3 viva-legenda font-medium text-text-primary hover:bg-surface-muted"
              >
                Ir para a biblioteca
              </Link>
            }
          />
        ) : (
          reflexoes.map((r) => {
            const c = conteudoPorId(r.conteudoId);
            return (
              <Card
                key={r.id}
                variante="reflexao"
                titulo={c?.titulo ?? "Conteúdo da biblioteca"}
                descricao={new Date(r.criadaEm).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                })}
              >
                <dl className="space-y-4">
                  {perguntasDeReflexao.map((p) => {
                    const resposta = r.respostas[p.chave];
                    if (!resposta) return null;
                    return (
                      <div key={p.chave}>
                        <dt className="viva-legenda text-text-secondary">
                          {p.pergunta}
                        </dt>
                        <dd className="mt-1 max-w-[62ch] viva-texto text-text-primary">
                          {resposta}
                        </dd>
                      </div>
                    );
                  })}
                </dl>

                <div className="mt-5 flex flex-wrap gap-3">
                  {c ? (
                    <Link
                      to="/biblioteca/$conteudoId"
                      params={{ conteudoId: c.id }}
                      className="viva-tap inline-flex min-h-11 items-center rounded-full border border-border-default px-5 py-2.5 viva-legenda font-medium text-text-primary hover:bg-surface-muted"
                    >
                      Abrir o conteúdo
                    </Link>
                  ) : null}
                  <Botao
                    variante="terciario"
                    tamanho="compacto"
                    onClick={() => apagarReflexao(r.id)}
                  >
                    Apagar esta reflexão
                  </Botao>
                </div>
              </Card>
            );
          })
        )}

        <Link
          to="/biblioteca"
          className="viva-tap inline-flex min-h-11 items-center rounded-full border border-border-default bg-surface-default px-5 py-3 viva-legenda font-medium text-text-primary hover:bg-surface-muted"
        >
          Voltar para a biblioteca
        </Link>
      </Screen>
    </>
  );
}
