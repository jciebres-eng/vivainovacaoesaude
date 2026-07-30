import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import Markdown from "react-markdown";
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
    <main className="min-h-screen bg-background px-6 py-10 md:px-10">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/"
          className="inline-flex items-center rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-card-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          ← Voltar para a biblioteca
        </Link>

        <header className="mt-8 border-b border-border pb-8">
          <p className="text-sm font-medium text-muted-foreground">
            Documento {doc.number} · Leitura estimada: {doc.minutes} minutos
          </p>
          <h1 className="mt-2 text-3xl font-bold leading-tight text-foreground">
            {doc.title}
          </h1>
          {doc.subtitle ? (
            <p className="mt-2 text-muted-foreground">{doc.subtitle}</p>
          ) : null}
        </header>

        <article className="viva-doc mt-2 text-foreground">
          <Markdown>{doc.content}</Markdown>
        </article>

        <nav className="mt-14 flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:justify-between">
          {prev ? (
            <Link
              to="/documentos/$slug"
              params={{ slug: prev.slug }}
              className="rounded-md border border-border bg-card px-4 py-3 text-sm font-medium text-card-foreground transition-colors hover:bg-secondary"
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
              className="rounded-md border border-border bg-card px-4 py-3 text-sm font-medium text-card-foreground transition-colors hover:bg-secondary"
            >
              Documento {next.number}: {next.title} →
            </Link>
          ) : null}
        </nav>
      </div>
    </main>
  );
}
