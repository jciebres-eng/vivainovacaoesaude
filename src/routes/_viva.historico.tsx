import { Link, createFileRoute } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";

import { SeloDemonstrativo } from "@/components/viva/selo-demonstrativo";
import { useJornadas } from "@/lib/match/usar-jornada";

export const Route = createFileRoute("/_viva/historico")({
  head: () => ({
    meta: [
      { title: "Meus percursos — VIVA" },
      {
        name: "description",
        content:
          "Todos os percursos que você montou, em ordem de tempo, sem notas e sem comparação. Você pode retomar ou apagar qualquer um.",
      },
      { property: "og:title", content: "Meus percursos — VIVA" },
      {
        property: "og:description",
        content: "Lista cronológica dos percursos guardados neste aparelho.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Historico,
});

const rotuloDoEstado: Record<string, string> = {
  rascunho: "em montagem",
  pronto: "pronto para fazer",
  "em-andamento": "em andamento",
  pausado: "pausado",
  concluido: "percorrido",
};

function Historico() {
  const { jornadas, carregando, remover } = useJornadas();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="viva-titulo-pagina text-text-primary">Meus percursos</h1>
        <p className="mt-2 viva-apoio text-text-secondary">
          Em ordem de tempo, sem notas e sem comparação com ninguém.
        </p>
      </header>

      {carregando ? (
        <p className="viva-legenda text-text-secondary">Abrindo seus percursos…</p>
      ) : jornadas.length === 0 ? (
        <p className="viva-legenda text-text-secondary">
          Você ainda não montou percursos. Comece escolhendo uma situação em Explorar.
        </p>
      ) : (
        <ul className="space-y-3">
          {jornadas.map((j) => (
            <li
              key={j.id}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-border-default bg-superficie-elevada p-4"
            >
              <span className="min-w-0">
                <Link
                  to="/jornada/$journeyId/revisar"
                  params={{ journeyId: j.id }}
                  className="block viva-apoio font-semibold text-text-primary underline"
                >
                  {j.titulo}
                </Link>
                <span className="block viva-legenda text-text-secondary">
                  {rotuloDoEstado[j.estado] ?? j.estado} ·{" "}
                  {new Date(j.atualizadoEm).toLocaleDateString("pt-BR")}
                </span>
                {j.feedback?.nota ? (
                  <span className="block viva-legenda text-text-secondary">
                    Você registrou: {j.feedback.nota}
                  </span>
                ) : null}
              </span>
              <button
                type="button"
                onClick={() => void remover(j.id)}
                aria-label={`Apagar o percurso ${j.titulo}`}
                className="viva-tap grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border-default text-text-secondary"
              >
                <Trash2 className="h-4 w-4" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      )}

      <SeloDemonstrativo texto="Tudo fica apenas neste aparelho e pode ser apagado por você." />
    </div>
  );
}
