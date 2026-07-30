import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { Note, Screen, ScreenHeader, SectionCard } from "@/components/viva/screen";
import { conteudos } from "@/lib/viva-data";

export const Route = createFileRoute("/_percurso/biblioteca/$conteudoId")({
  loader: ({ params }) => {
    const conteudo = conteudos.find((c) => c.id === params.conteudoId);
    if (!conteudo) throw notFound();
    return conteudo;
  },
  head: ({ loaderData }) => {
    const title = loaderData
      ? `${loaderData.titulo} — VIVA`
      : "Conteúdo indisponível — VIVA";
    const description =
      loaderData?.resumo ?? "Conteúdo da biblioteca demonstrativa do VIVA.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        ...(loaderData ? [] : [{ name: "robots", content: "noindex" }]),
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ConteudoScreen,
});

function ConteudoScreen() {
  const conteudo = Route.useLoaderData();

  return (
    <>
      <ScreenHeader
        title={conteudo.titulo}
        intro={`${conteudo.categoria} • ${conteudo.minutos} minutos de leitura`}
      />

      <Screen>
        <SectionCard>
          <p className="text-card-foreground">{conteudo.resumo}</p>
          <ol className="mt-4 space-y-3">
            {conteudo.passos.map((p: string, i: number) => (
              <li key={p} className="flex gap-3 text-card-foreground">
                <span
                  aria-hidden
                  className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground"
                >
                  {i + 1}
                </span>
                {p}
              </li>
            ))}
          </ol>
        </SectionCard>

        <div className="flex flex-wrap gap-2">
          {[
            "Salvar",
            "Marcar como útil",
            "Comentar",
            "Registrar dúvida",
            "Adicionar estratégia ao plano",
          ].map((acao) => (
            <button
              key={acao}
              type="button"
              className="viva-tap rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-card-foreground hover:bg-secondary"
            >
              {acao}
            </button>
          ))}
        </div>

        <Note>
          Existe também uma versão resumida deste conteúdo. Nada aqui exige
          leitura completa.
        </Note>

        <Link
          to="/biblioteca"
          className="viva-tap inline-flex rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-card-foreground hover:bg-secondary"
        >
          ← Voltar para a biblioteca
        </Link>
      </Screen>
    </>
  );
}
