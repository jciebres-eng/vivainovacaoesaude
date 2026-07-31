import { createFileRoute, Link } from "@tanstack/react-router";

import { Card, EstadoDaInterface } from "@/components/ds";
import { conteudoPorId } from "@/lib/viva-biblioteca-dados";
import { useBiblioteca } from "@/lib/viva-biblioteca";
import { rotulosDeEstado, usePercursos } from "@/lib/viva-percursos";

export const Route = createFileRoute("/_viva/evolucao")({
  head: () => ({
    meta: [
      { title: "Evolução — o que você descobriu | VIVA" },
      {
        name: "description",
        content:
          "Jornadas realizadas, estratégias que funcionaram para você, conteúdos úteis e aprendizados que podem ajudar em situações futuras.",
      },
      { property: "og:title", content: "Evolução — VIVA" },
      {
        property: "og:description",
        content: "Continuidade e aprendizado, sem notas, sem sequências e sem comparações.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Evolucao,
});

/**
 * Evolução — continuidade, não produtividade.
 *
 * Só aparece aqui o que a própria pessoa registrou neste aparelho. Nenhuma
 * medida de desempenho, eficiência, sequência ou comparação (documentos 03,
 * 15, 16 e 17).
 */
function Evolucao() {
  const { lista, concluidos, favoritos } = usePercursos();
  const { dados } = useBiblioteca();

  const registros = lista
    .flatMap((p) => p.registros.map((r) => ({ percurso: p, registro: r })))
    .sort((a, b) => b.registro.criadoEm - a.registro.criadoEm);

  const estrategias = Array.from(
    new Map(lista.flatMap((p) => p.estrategias).map((e) => [e.id, e])).values(),
  );

  const uteis = Object.keys(dados.uteis)
    .map((id) => conteudoPorId(id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const vazio =
    lista.length === 0 && registros.length === 0 && uteis.length === 0 && estrategias.length === 0;

  return (
    <div className="space-y-7">
      <header>
        <h1 className="viva-titulo-pagina text-text-primary">O que você descobriu</h1>
        <p className="mt-2 viva-apoio text-text-secondary">
          Um espaço de continuidade: experiências que você já preparou e aprendizados que podem
          ajudar em situações futuras.
        </p>
      </header>

      {vazio ? (
        <EstadoDaInterface
          tipo="vazio"
          titulo="Ainda não há nada guardado aqui."
          texto="Quando você montar uma jornada ou registrar como foi uma experiência, ela aparece nesta página."
          acao={
            <Link
              to="/"
              className="viva-tap inline-flex min-h-12 items-center rounded-full bg-destaque px-6 viva-texto-botao font-semibold text-action-primary-foreground"
            >
              Começar uma jornada
            </Link>
          }
        />
      ) : null}

      {lista.length > 0 ? (
        <Card
          variante="informativo"
          titulo="Percursos que você pode reutilizar"
          descricao="Abrir uma jornada anterior não recomeça nada: você escolhe o que aproveitar."
        >
          <ul className="space-y-3">
            {lista.slice(0, 6).map((p) => (
              <li key={p.id} className="rounded-2xl border border-border-default p-4">
                <p className="viva-apoio font-semibold text-text-primary">{p.titulo}</p>
                <p className="mt-1 viva-legenda text-text-secondary">{rotulosDeEstado[p.estado]}</p>
                <Link
                  to="/percurso/$id"
                  params={{ id: p.id }}
                  search={{ fase: "preparar" } as const}
                  className="viva-tap mt-3 inline-flex min-h-11 items-center rounded-full border border-border-default px-4 viva-legenda font-medium text-text-primary"
                >
                  Abrir
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 viva-legenda text-text-secondary">
            {concluidos.length > 0
              ? "Experiências concluídas continuam disponíveis para consulta."
              : "Nada aqui precisa ser concluído."}
            {favoritos.length > 0 ? (
              <>
                {" "}
                <Link to="/favoritos" className="underline underline-offset-4">
                  Ver os percursos que você marcou
                </Link>
                .
              </>
            ) : null}
          </p>
        </Card>
      ) : null}

      {estrategias.length > 0 ? (
        <Card
          variante="informativo"
          titulo="Estratégias que funcionaram para você"
          descricao="Escolhidas por você em jornadas anteriores."
        >
          <ul className="space-y-2">
            {estrategias.map((e) => (
              <li key={e.id} className="rounded-2xl border border-border-default p-4">
                <p className="viva-apoio font-semibold text-text-primary">{e.titulo}</p>
                <p className="mt-1 viva-legenda text-text-secondary">{e.frase}</p>
              </li>
            ))}
          </ul>
        </Card>
      ) : null}

      {registros.length > 0 ? (
        <Card
          variante="informativo"
          titulo="Aprendizados registrados"
          descricao="Com suas palavras, em ordem cronológica."
        >
          <ul className="space-y-3">
            {registros.slice(0, 6).map(({ percurso, registro }) => (
              <li key={registro.id} className="rounded-2xl border border-border-default p-4">
                <p className="viva-legenda text-text-secondary">
                  {percurso.titulo} ·{" "}
                  {new Date(registro.criadoEm).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                  })}
                </p>
                {registro.comoFoi ? (
                  <p className="mt-2 viva-apoio text-text-primary">{registro.comoFoi}</p>
                ) : null}
                {registro.ajudou ? (
                  <p className="mt-1 viva-legenda text-text-secondary">
                    Ajudou: {registro.ajudou}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </Card>
      ) : null}

      {uteis.length > 0 ? (
        <Card
          variante="informativo"
          titulo="Conteúdos que você marcou como úteis"
          descricao="Podem servir de novo em situações parecidas."
        >
          <ul className="space-y-2">
            {uteis.map((c) => (
              <li key={c.id}>
                <Link
                  to="/biblioteca/$conteudoId"
                  params={{ conteudoId: c.id }}
                  className="viva-tap flex min-h-11 items-center rounded-2xl border border-border-default px-4 viva-legenda font-medium text-text-primary"
                >
                  {c.titulo}
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      ) : null}
    </div>
  );
}
