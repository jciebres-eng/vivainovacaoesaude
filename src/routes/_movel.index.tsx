import { Link, createFileRoute } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";

import { CampoDoAgente, PainelDoAgente } from "@/components/viva/agente";
import { SeloDemonstrativo } from "@/components/viva/selo-demonstrativo";
import { AberturaImersiva, JourneyMatchComposer } from "@/components/viva/visual";
import { useAgente } from "@/lib/viva-agente";
import { usePerfil } from "@/lib/viva-perfis";
import { rotulosDeEstado, usePercursos } from "@/lib/viva-percursos";

export const Route = createFileRoute("/_movel/")({
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
 * Início — não é painel.
 *
 * A tela abre com o assistente e uma pergunta. Nada de resumos, contadores
 * ou blocos administrativos: a partir da intenção, o percurso se monta em
 * escolhas visuais (documentos 12, 13, 17, 19).
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

  const frase = intencao
    ? "Vamos montar isso junto, uma escolha por vez."
    : emAndamento.length > 0
      ? "Seu percurso continua aberto, no ponto onde você parou."
      : perfil.perguntaDeAbertura;

  return (
    <div className="space-y-7">
      <AberturaImersiva pergunta={perfil.perguntaDeAbertura} />
      <h1 className="sr-only">VIVA — copiloto de percursos funcionais</h1>

      <PainelDoAgente frase={frase} />

      {intencao ? (
        <>
          <JourneyMatchComposer intencao={intencao} />
          <button
            type="button"
            onClick={() => setIntencao(null)}
            className="viva-tap min-h-11 viva-legenda text-[var(--profile-primary)] underline"
          >
            Quero dizer outra coisa
          </button>
        </>
      ) : (
        <>
          {emAndamento.length > 0 ? (
            <ul className="space-y-2">
              {emAndamento.map((p) => (
                <li key={p.id}>
                  <Link
                    to="/percurso/$id"
                    params={{ id: p.id }}
                    search={{ fase: "realizar" }}
                    className="viva-tap flex min-h-14 items-center gap-3 border border-[var(--profile-border)] bg-[var(--profile-card)] px-4 py-3"
                    style={{ borderRadius: "var(--profile-radius)" }}
                  >
                    <span
                      aria-hidden
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--profile-primary)] text-[var(--profile-surface)]"
                    >
                      <Play className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate viva-legenda font-semibold text-[var(--profile-text)]">
                        {p.titulo}
                      </span>
                      <span className="block viva-legenda text-[var(--profile-muted)]">
                        {rotulosDeEstado[p.estado]}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}

          <CampoDoAgente onEnviar={(texto) => setIntencao(texto)} />
        </>
      )}

      <SeloDemonstrativo
        sempreVisivel
        texto="Demonstração com dados fictícios. Tudo fica apenas neste dispositivo e o VIVA não substitui acompanhamento profissional."
      />
    </div>
  );
}
