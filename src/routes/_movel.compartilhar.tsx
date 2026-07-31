import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { Botao, Card, Nota } from "@/components/ds";
import { IndicadorDeAcompanhamento, LinkTemporario } from "@/components/viva/trajeto";
import { cn } from "@/lib/utils";
import {
  contatosDemonstrativos,
  duracoes,
  niveis,
  trajeto as acoes,
  useTrajeto,
  type Duracao,
  type NivelDeCompartilhamento,
} from "@/lib/viva-trajeto";

export const Route = createFileRoute("/_movel/compartilhar")({
  head: () => ({
    meta: [
      { title: "Compartilhar percurso — VIVA" },
      {
        name: "description",
        content:
          "Escolha quem acompanha, o que a pessoa vê e por quanto tempo. O compartilhamento nasce desligado e pode ser encerrado a qualquer momento.",
      },
      { property: "og:title", content: "Compartilhar percurso — VIVA" },
      {
        property: "og:description",
        content: "Autorização por percurso, com nível e duração escolhidos por você.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Compartilhar,
});

function Compartilhar() {
  const t = useTrajeto();
  const navigate = useNavigate();
  const [contatoId, setContatoId] = useState<string | null>(null);
  const [nivel, setNivel] = useState<NivelDeCompartilhamento>("status");
  const [duracao, setDuracao] = useState<Duracao>(30);

  const ativo = t.compartilhamento.ativo;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="viva-titulo text-text-primary">Quer que alguém acompanhe?</h1>
        <p className="mt-2 viva-apoio text-text-secondary">
          Compartilhar é sempre opcional. Você decide quem vê, o que vê e por quanto tempo.
        </p>
      </header>

      {ativo ? (
        <>
          <IndicadorDeAcompanhamento compartilhamento={t.compartilhamento} />
          {t.compartilhamento.token ? (
            <LinkTemporario token={t.compartilhamento.token} />
          ) : null}
        </>
      ) : (
        <>
          <Card variante="informativo" titulo="Quem você quer avisar?">
            <ul className="space-y-3">
              {contatosDemonstrativos.map((c) => {
                const escolhido = c.id === contatoId;
                return (
                  <li key={c.id}>
                    <button
                      type="button"
                      aria-pressed={escolhido}
                      onClick={() => setContatoId(c.id)}
                      className={cn(
                        "viva-tap w-full rounded-2xl border p-4 text-left",
                        escolhido
                          ? "border-2 border-destaque bg-destaque-suave"
                          : "border-border-default bg-surface-default",
                      )}
                    >
                      <span className="block viva-subtitulo text-text-primary">{c.nome}</span>
                      <span className="block viva-legenda text-text-secondary">
                        {c.vinculo} · {c.formaDeContato}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <Nota>Estas pessoas são fictícias, para demonstração.</Nota>
          </Card>

          <Card variante="informativo" titulo="O que a pessoa poderá ver?">
            <ul className="space-y-3">
              {niveis.map((n) => {
                const escolhido = n.id === nivel;
                return (
                  <li key={n.id}>
                    <button
                      type="button"
                      aria-pressed={escolhido}
                      onClick={() => setNivel(n.id)}
                      className={cn(
                        "viva-tap w-full rounded-2xl border p-4 text-left",
                        escolhido
                          ? "border-2 border-destaque bg-destaque-suave"
                          : "border-border-default bg-surface-default",
                      )}
                    >
                      <span className="block viva-subtitulo text-text-primary">{n.titulo}</span>
                      <span className="block viva-apoio text-text-secondary">{n.descricao}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Card>

          <Card variante="informativo" titulo="Por quanto tempo?">
            <ul className="flex flex-wrap gap-2">
              {duracoes.map((d) => (
                <li key={d}>
                  <Botao
                    variante={d === duracao ? "principal" : "secundario"}
                    tamanho="compacto"
                    onClick={() => setDuracao(d)}
                    aria-pressed={d === duracao}
                  >
                    {d < 60 ? `${d} minutos` : `${d / 60} h`}
                  </Botao>
                </li>
              ))}
            </ul>
            <Nota>
              Ao fim do tempo, o acompanhamento termina sozinho. Você também pode encerrar antes.
            </Nota>
          </Card>

          <Botao
            variante="principal"
            disabled={!contatoId}
            onClick={() => {
              if (!contatoId) return;
              acoes.autorizarCompartilhamento({ contatoId, nivel, duracaoMinutos: duracao });
            }}
          >
            Autorizar acompanhamento
          </Botao>
        </>
      )}

      <Card variante="informativo" titulo="Voltar ao percurso">
        <Botao variante="secundario" onClick={() => navigate({ to: "/realizar" })}>
          Voltar para o percurso
        </Botao>
      </Card>
    </div>
  );
}
