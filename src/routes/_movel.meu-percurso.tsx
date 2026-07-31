import { Link, createFileRoute } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";

import { Botao, Card } from "@/components/ds";
import { percursos, rotulosDeEstado, usePercursos, type Percurso } from "@/lib/viva-percursos";

export const Route = createFileRoute("/_movel/meu-percurso")({
  head: () => ({
    meta: [
      { title: "Meus percursos — VIVA" },
      {
        name: "description",
        content:
          "Todos os percursos que você montou neste aparelho: em construção, em andamento, concluídos e favoritos.",
      },
      { property: "og:title", content: "Meus percursos — VIVA" },
      {
        property: "og:description",
        content: "Uma lista cronológica e neutra, sem notas, sem sequência e sem cobrança.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MeusPercursos,
});

export function ItemDePercurso({ p }: { p: Percurso }) {
  return (
    <li className="rounded-2xl border border-border-default bg-surface-default p-4">
      <p className="viva-apoio font-semibold text-text-primary">{p.titulo}</p>
      <p className="mt-1 viva-legenda text-text-secondary">
        {rotulosDeEstado[p.estado]} · criado em {new Date(p.criadoEm).toLocaleDateString("pt-BR")}
        {p.registros.length > 0 ? ` · ${p.registros.length} registro(s)` : ""}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Link
          to="/percurso/$id"
          params={{ id: p.id }}
          search={{ fase: p.estado === "em-andamento" ? "realizar" : "preparar" } as const}
          className="viva-tap inline-flex min-h-11 items-center rounded-full border border-border-default px-4 viva-legenda font-medium text-text-primary"
        >
          Abrir
        </Link>
        <Botao
          variante="terciario"
          tamanho="compacto"
          icone={Trash2}
          onClick={() => percursos.remover(p.id)}
        >
          Apagar
        </Botao>
      </div>
    </li>
  );
}

function MeusPercursos() {
  const { lista } = usePercursos();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="viva-titulo-pagina text-text-primary">Meus percursos</h1>
        <p className="mt-2 viva-apoio text-text-secondary">
          Uma lista simples, em ordem de criação. Nada aqui mede desempenho.
        </p>
      </header>

      {lista.length === 0 ? (
        <Card variante="informativo" titulo="Ainda não há percursos aqui">
          <p className="viva-apoio text-text-secondary">
            Quando você montar um percurso, ele aparece nesta lista.
          </p>
          <div className="mt-4">
            <Link
              to="/"
              className="viva-tap inline-flex min-h-12 items-center rounded-full bg-destaque px-6 viva-texto-botao font-semibold text-action-primary-foreground"
            >
              Dizer o que preciso
            </Link>
          </div>
        </Card>
      ) : (
        <ul className="space-y-3">
          {lista.map((p) => (
            <ItemDePercurso key={p.id} p={p} />
          ))}
        </ul>
      )}
    </div>
  );
}
