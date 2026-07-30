import { createFileRoute, Link } from "@tanstack/react-router";
import { docs, docsByGroup, groups } from "@/content/docs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Biblioteca VIVA — Base documental da solução" },
      {
        name: "description",
        content:
          "Biblioteca de referência do VIVA: visão da solução, problema social, princípios éticos e requisitos de experiência neuroinclusiva.",
      },
      { property: "og:title", content: "Biblioteca VIVA — Base documental da solução" },
      {
        property: "og:description",
        content:
          "Documentos que orientam o desenvolvimento do VIVA, Sistema Operacional Humano para o Desenvolvimento Funcional.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Biblioteca,
});

function Biblioteca() {
  return (
    <main className="min-h-screen bg-background px-6 py-14 md:px-10">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          VIVA
        </p>
        <h1 className="mt-3 text-3xl font-bold leading-tight text-foreground md:text-4xl">
          Biblioteca da solução
        </h1>
        <p className="mt-4 max-w-[62ch] text-muted-foreground">
          Aqui ficam os documentos que definem o VIVA — Sistema Operacional Humano
          para o Desenvolvimento Funcional. Eles são a fonte de autoridade do
          projeto: em caso de conflito, o documento prevalece.
        </p>

        <div className="mt-6 rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-card-foreground">
            <strong>{docs.length} documentos</strong> publicados de 12 previstos.
            Os grupos seguintes serão adicionados conforme forem enviados.
          </p>
        </div>

        {groups.map((group) => {
          const list = docsByGroup(group.id);
          if (list.length === 0) return null;
          return (
            <section key={group.id} className="mt-12">
              <h2 className="text-xl font-semibold text-foreground">
                {group.label}
              </h2>
              <p className="mt-2 max-w-[62ch] text-sm text-muted-foreground">
                {group.description}
              </p>

              <ul className="mt-6 space-y-4">
                {list.map((doc) => (
                  <li key={doc.slug}>
                    <Link
                      to="/documentos/$slug"
                      params={{ slug: doc.slug }}
                      className="block rounded-lg border border-border bg-card p-5 transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <span className="text-sm font-medium text-muted-foreground">
                        Documento {doc.number}
                      </span>
                      <h3 className="mt-1 text-lg font-semibold text-card-foreground">
                        {doc.title}
                      </h3>
                      {doc.subtitle ? (
                        <p className="mt-1 text-sm text-muted-foreground">
                          {doc.subtitle}
                        </p>
                      ) : null}
                      <p className="mt-3 max-w-[62ch] text-sm text-card-foreground">
                        {doc.summary}
                      </p>
                      <p className="mt-4 text-sm text-muted-foreground">
                        Leitura estimada: {doc.minutes} minutos
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </main>
  );
}
