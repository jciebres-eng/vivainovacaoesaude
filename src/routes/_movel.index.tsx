import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { BookOpen, History, Play, Star } from "lucide-react";

import { Botao, Card } from "@/components/ds";
import { CampoDoAgente, LeituraDoAgente } from "@/components/viva/agente";
import { SeletorDePerfil } from "@/components/viva/mobile";
import { usePerfil } from "@/lib/viva-perfis";
import {
  memoriaDoCopiloto,
  percursos,
  rotulosDeEstado,
  situacoesSugeridas,
  usePercursos,
} from "@/lib/viva-percursos";
import { sugerirSituacoes, type Situacao } from "@/lib/viva-situacoes";
import { useState } from "react";

export const Route = createFileRoute("/_movel/")({
  head: () => ({
    meta: [
      { title: "VIVA — Copiloto neuroinclusivo de percursos" },
      {
        name: "description",
        content:
          "Diga o que precisa: o VIVA organiza um percurso funcional em passos curtos, com estratégias, leituras e planos alternativos. Tudo fica neste aparelho.",
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

function Inicio() {
  const { perfil } = usePerfil();
  const navigate = useNavigate();
  const { emAndamento, lista, favoritos } = usePercursos();
  const [intencao, setIntencao] = useState<string | null>(null);
  const memoria = memoriaDoCopiloto();

  function abrir(situacao: Situacao) {
    const novo = percursos.criar(situacao, intencao ?? "");
    navigate({ to: "/percurso/$id", params: { id: novo.id }, search: { fase: "preparar" } });
  }

  return (
    <div className="space-y-8">
      <header>
        <p className="viva-legenda text-text-secondary">{perfil.contexto}</p>
        <h1 className="mt-1 viva-titulo-pagina text-text-primary">{perfil.saudacao}</h1>
        <p className="mt-3 viva-texto text-text-secondary">{perfil.perguntaDeAbertura}</p>
      </header>

      {emAndamento.length > 0 ? (
        <Card variante="proximo-passo" titulo="Percurso em andamento">
          {emAndamento.map((p) => (
            <div key={p.id} className="mt-2">
              <p className="viva-apoio text-text-primary">
                {p.titulo} · {rotulosDeEstado[p.estado]}
              </p>
              <Link
                to="/percurso/$id"
                params={{ id: p.id }}
                search={{ fase: "realizar" }}
                className="viva-tap mt-3 inline-flex min-h-12 items-center gap-2 rounded-full bg-destaque px-6 viva-texto-botao font-semibold text-action-primary-foreground"
              >
                <Play className="h-5 w-5" aria-hidden />
                Voltar ao percurso
              </Link>
            </div>
          ))}
        </Card>
      ) : null}

      {intencao ? (
        <LeituraDoAgente
          intencao={intencao}
          sugestoes={sugerirSituacoes(intencao)}
          onEscolher={abrir}
          onCorrigir={() => setIntencao(null)}
        />
      ) : (
        <>
          <CampoDoAgente onEnviar={setIntencao} />

          <section aria-labelledby="situacoes-titulo">
            <h2 id="situacoes-titulo" className="viva-titulo-secao text-text-primary">
              Situações comuns
            </h2>
            <p className="mt-1 viva-legenda text-text-secondary">
              Tocar em uma delas leva ao mesmo lugar que falar ou escrever.
            </p>
            <ul className="mt-3 space-y-2">
              {situacoesSugeridas(5).map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => abrir(s)}
                    className="viva-tap w-full rounded-2xl border border-border-default bg-surface-default p-4 text-left"
                  >
                    <span className="block viva-apoio font-semibold text-text-primary">
                      {s.titulo}
                    </span>
                    <span className="block viva-legenda text-text-secondary">{s.resumo}</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      {memoria.estrategiasFrequentes.length > 0 ? (
        <Card variante="informativo" titulo="O que você costuma escolher">
          <p className="viva-apoio text-text-secondary">
            Isto vem só dos seus próprios percursos neste aparelho. Nada é deduzido sobre você.
          </p>
          <ul className="mt-3 space-y-1 viva-legenda text-text-secondary">
            {memoria.estrategiasFrequentes.slice(0, 3).map((e) => (
              <li key={e.titulo} className="text-text-primary">
                {e.titulo}
              </li>
            ))}
          </ul>
        </Card>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Botao variante="secundario" tamanho="compacto" icone={History} onClick={() => navigate({ to: "/meu-percurso" })}>
          Meus percursos ({lista.length})
        </Botao>
        <Botao variante="secundario" tamanho="compacto" icone={Star} onClick={() => navigate({ to: "/favoritos" })}>
          Favoritos ({favoritos.length})
        </Botao>
        <Botao variante="secundario" tamanho="compacto" icone={BookOpen} onClick={() => navigate({ to: "/biblioteca" })}>
          Biblioteca
        </Botao>
      </div>

      <SeletorDePerfil />

      <p className="viva-legenda text-text-secondary">
        Demonstração com dados fictícios. Tudo fica apenas neste dispositivo e o VIVA não substitui
        acompanhamento profissional.
      </p>
    </div>
  );
}
