import { Link, createFileRoute } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";

import { CampoDoAgente, PainelDoAgente } from "@/components/viva/agente";
import { SeloDemonstrativo } from "@/components/viva/selo-demonstrativo";
import { AberturaImersiva, JourneyMatchComposer } from "@/components/viva/visual";
import { useAgente } from "@/lib/viva-agente";
import { usePerfil } from "@/lib/viva-perfis";
import { rotulosDeEstado, usePercursos } from "@/lib/viva-percursos";

export const Route = createFileRoute("/_viva/")({
  head: () => ({
    meta: [
      { title: "VIVA — Copiloto neuroinclusivo de percursos" },
      {
        name: "description",
        content:
          "Diga o que precisa: o VIVA monta um percurso funcional com você, em escolhas visuais curtas. Tudo fica neste aparelho.",
      },
      { property: "og:title", content: "VIVA — Copiloto neuroinclusivo de percursos" },
      {
        property: "og:description",
        content: "Fale, escreva ou toque: um percurso possível, no seu ritmo, sem cobrança.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Inicio,
});

/**
 * Início — acolhimento e continuidade, não painel.
 *
 * Uma saudação discreta, uma pergunta, um campo de intenção e, no máximo,
 * uma jornada para retomar. Sem resumos administrativos, sem métricas e sem
 * CTAs concorrentes (documentos 12, 13, 17 e 19).
 */
function Inicio() {
  const { perfil } = usePerfil();
  const agente = useAgente();
  const { emAndamento } = usePercursos();
  const [intencao, setIntencao] = useState<string | null>(null);

  useEffect(() => {
    if (intencao) agente.irPara("organizando");
    else if (emAndamento.length > 0) agente.irPara("acompanhando");
    else agente.irPara("disponivel");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emAndamento.length, intencao]);

  const retomar = emAndamento[0];
  const conteudos = conteudosDaBiblioteca.slice(0, 2);

  return (
    <div className="space-y-7">
      <header>
        <p className="viva-legenda text-text-secondary">Olá, {perfil.nome.split(" ")[0]}.</p>
        <h1 className="mt-1 viva-titulo-pagina text-text-primary">
          {intencao ? "Vamos montar isso, uma escolha por vez." : "Como você gostaria de começar?"}
        </h1>
        <p className="mt-2 viva-apoio text-text-secondary">
          Você pode escrever, falar ou escolher uma situação. Pode mudar tudo depois.
        </p>
      </header>

      {intencao ? (
        <>
          <JourneyMatchComposer intencao={intencao} />
          <button
            type="button"
            onClick={() => setIntencao(null)}
            className="viva-tap min-h-11 viva-legenda text-destaque-texto underline underline-offset-4"
          >
            Quero dizer outra coisa
          </button>
        </>
      ) : (
        <>
          {retomar ? (
            <Link
              to="/percurso/$id"
              params={{ id: retomar.id }}
              search={{ fase: "realizar" }}
              className="viva-tap flex min-h-16 items-center gap-3 rounded-3xl border border-border-default bg-surface-default px-4 py-3"
            >
              <span
                aria-hidden
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-destaque text-action-primary-foreground"
              >
                <Play className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block viva-legenda font-semibold text-text-primary">
                  Continuar de onde você parou
                </span>
                <span className="block truncate viva-legenda text-text-secondary">
                  {retomar.titulo} · {rotulosDeEstado[retomar.estado]}
                </span>
              </span>
            </Link>
          ) : null}

          <CampoDoAgente onEnviar={(texto) => setIntencao(texto)} />

          <section aria-labelledby="conteudos-home" className="space-y-3">
            <h2 id="conteudos-home" className="viva-subtitulo text-text-primary">
              Conteúdos que podem ajudar
            </h2>
            <ul className="space-y-2">
              {conteudos.map((c) => (
                <li key={c.id}>
                  <Link
                    to="/biblioteca/$conteudoId"
                    params={{ conteudoId: c.id }}
                    className="viva-tap flex min-h-12 items-center rounded-2xl border border-border-default bg-surface-default px-4 viva-legenda font-medium text-text-primary"
                  >
                    {c.titulo}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <Link
            to="/demonstracao"
            className="viva-tap inline-flex min-h-11 items-center rounded-full border border-border-default px-5 viva-legenda font-medium text-text-primary"
          >
            Iniciar demonstração guiada
          </Link>
        </>
      )}

      <SeloDemonstrativo
        sempreVisivel
        texto="Este é um ambiente demonstrativo, com dados fictícios. Não insira dados pessoais ou clínicos reais. O VIVA não substitui acompanhamento profissional."
      />
    </div>
  );
}

