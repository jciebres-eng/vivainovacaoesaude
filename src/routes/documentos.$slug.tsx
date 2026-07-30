import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import Markdown from "react-markdown";
import { ArrowLeft } from "lucide-react";

import { BotaoLink } from "@/components/ds";
import { docs, getDoc } from "@/content/docs";

export const Route = createFileRoute("/documentos/$slug")({
  loader: ({ params }) => {
    const doc = getDoc(params.slug);
    if (!doc) throw notFound();
    return doc;
  },
  head: ({ loaderData }) => {
    const title = loaderData
      ? `${loaderData.title} — Biblioteca VIVA`
      : "Documento — Biblioteca VIVA";
    const description = loaderData?.summary ?? "Documento da base VIVA.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: DocumentoPage,
});

function DocumentoPage() {
  const doc = Route.useLoaderData();
  const index = docs.findIndex((d) => d.slug === doc.slug);
  const prev = docs[index - 1];
  const next = docs[index + 1];

  return (
    <main className="min-h-dvh bg-background px-6 py-10 md:px-10">
      <div className="mx-auto max-w-3xl">
        <BotaoLink to="/" variante="secundario" tamanho="compacto" icone={ArrowLeft}>
          Voltar para a biblioteca
        </BotaoLink>

        <header className="mt-8 border-b border-border-default pb-8">
          <p className="viva-legenda font-medium text-text-secondary">
            Documento {doc.number} · Leitura estimada: {doc.minutes} minutos
          </p>
          <h1 className="mt-2 text-3xl font-bold leading-tight text-text-primary">{doc.title}</h1>
          {doc.subtitle ? (
            <p className="mt-2 viva-texto text-text-secondary">{doc.subtitle}</p>
          ) : null}
        </header>

        <article className="viva-doc mt-2 text-text-primary">
          <Markdown>{doc.content}</Markdown>
        </article>

        <nav
          aria-label="Navegação entre documentos"
          className="mt-14 flex flex-col gap-3 border-t border-border-default pt-8 sm:flex-row sm:justify-between"
        >
          {prev ? (
            <Link
              to="/documentos/$slug"
              params={{ slug: prev.slug }}
              className="viva-tap rounded-2xl border border-border-default bg-surface-default px-4 py-3 viva-legenda font-medium text-text-primary hover:bg-background-secondary"
            >
              ← Documento {prev.number}: {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to="/documentos/$slug"
              params={{ slug: next.slug }}
              className="viva-tap rounded-2xl border border-border-default bg-surface-default px-4 py-3 viva-legenda font-medium text-text-primary hover:bg-background-secondary"
            >
              Documento {next.number}: {next.title} →
            </Link>
          ) : null}
        </nav>
      </div>
    </main>
  );
}
