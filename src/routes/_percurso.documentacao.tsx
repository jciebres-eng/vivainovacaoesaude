import { createFileRoute, Link } from "@tanstack/react-router";

import { Note, Screen, ScreenHeader } from "@/components/viva/screen";
import { docs, docsByGroup, groups } from "@/content/docs";

export const Route = createFileRoute("/_percurso/documentacao")({
  head: () => ({
    meta: [
      { title: "Documentos do projeto VIVA" },
      {
        name: "description",
        content:
          "Base documental do VIVA: filosofia, princípios éticos, experiência neuroinclusiva, design system humano e governança.",
      },
      { property: "og:title", content: "Documentos do projeto VIVA" },
      {
        property: "og:description",
        content:
          "Os documentos que orientam cada decisão de design, linguagem e ética do VIVA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DocumentacaoPage,
});

function DocumentacaoPage() {
  return (
    <>
      <ScreenHeader
        title="Documentos do projeto"
        intro={`Os ${docs.length} documentos que orientam o VIVA. Ler não é necessário para usar a plataforma.`}
      />

      <Screen>
        {groups.map((group) => {
          const list = docsByGroup(group.id);
          if (list.length === 0) return null;
          return (
            <section key={group.id}>
              <h2 className="viva-subtitulo text-foreground">{group.label}</h2>
              <p className="mt-2 max-w-[62ch] viva-legenda text-text-secondary">
                {group.description}
              </p>

              <ul className="mt-4 space-y-3">
                {list.map((doc) => (
                  <li key={doc.slug}>
                    <Link
                      to="/documentos/$slug"
                      params={{ slug: doc.slug }}
                      className="viva-anim block rounded-2xl border border-border-default bg-surface-default p-5 shadow-suave hover:bg-secondary"
                    >
                      <span className="viva-legenda text-text-secondary">
                        Documento {doc.number} · leitura de {doc.minutes} minutos
                      </span>
                      <h3 className="mt-1 viva-subtitulo text-card-foreground">
                        {doc.title}
                      </h3>
                      <p className="mt-2 max-w-[62ch] viva-legenda text-card-foreground">
                        {doc.summary}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        <Note>
          Em caso de divergência entre a plataforma e estes documentos, o
          documento prevalece.
        </Note>
      </Screen>
    </>
  );
}
