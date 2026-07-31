import { createFileRoute } from "@tanstack/react-router";

import { Card } from "@/components/ds";
import { usePercursos } from "@/lib/viva-percursos";
import { ItemDePercurso } from "./_viva.meu-percurso";

export const Route = createFileRoute("/_viva/favoritos")({
  head: () => ({
    meta: [
      { title: "Favoritos — VIVA" },
      {
        name: "description",
        content:
          "Percursos guardados para repetir quando fizer sentido. Guardar não é compromisso de repetir.",
      },
      { property: "og:title", content: "Favoritos — VIVA" },
      { property: "og:description", content: "Percursos guardados neste aparelho." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Favoritos,
});

function Favoritos() {
  const { favoritos } = usePercursos();
  return (
    <div className="space-y-6">
      <header>
        <h1 className="viva-titulo-pagina text-text-primary">Favoritos</h1>
        <p className="mt-2 viva-apoio text-text-secondary">
          Percursos que você quis guardar. Repetir é opção, nunca obrigação.
        </p>
      </header>

      {favoritos.length === 0 ? (
        <Card variante="informativo" titulo="Nada guardado ainda">
          <p className="viva-apoio text-text-secondary">
            Dentro de um percurso existe a opção “Guardar nos favoritos”.
          </p>
        </Card>
      ) : (
        <ul className="space-y-3">
          {favoritos.map((p) => (
            <ItemDePercurso key={p.id} p={p} />
          ))}
        </ul>
      )}
    </div>
  );
}
