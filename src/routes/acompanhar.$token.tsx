import { createFileRoute } from "@tanstack/react-router";
import { HandHeart } from "lucide-react";

import { Botao, Card, Nota } from "@/components/ds";
import { MapaSimulado } from "@/components/viva/trajeto";
import {
  contatosDemonstrativos,
  minutosRestantes,
  niveis,
  trajeto as acoes,
  useTrajetoPorToken,
} from "@/lib/viva-trajeto";

/**
 * TrustedJourneyViewer — tela de quem acompanha.
 *
 * Mostra apenas o que a pessoa autorizou, nada além. Sem histórico, sem
 * registros pessoais, sem contato de terceiros (documentos 03, 15 e 16).
 */
export const Route = createFileRoute("/acompanhar/$token")({
  head: () => ({
    meta: [
      { title: "Acompanhar percurso — VIVA" },
      {
        name: "description",
        content:
          "Tela de acompanhamento temporário: mostra apenas o que a pessoa autorizou e expira sozinha.",
      },
      { property: "og:title", content: "Acompanhar percurso — VIVA" },
      {
        property: "og:description",
        content: "Acesso limitado, temporário e autorizado pela própria pessoa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Acompanhar,
});

function Acompanhar() {
  const { token } = Route.useParams();
  const { trajeto: t, valido } = useTrajetoPorToken(token);

  if (!valido) {
    return (
      <main className="mx-auto min-h-dvh w-full max-w-xl bg-background px-5 py-12">
        <h1 className="viva-titulo text-text-primary">Este acompanhamento terminou</h1>
        <p className="mt-3 viva-apoio text-text-secondary">
          O link era temporário. Ele deixa de funcionar quando o tempo escolhido acaba, quando o
          percurso é concluído ou quando a pessoa decide parar de compartilhar. Não há histórico
          disponível aqui.
        </p>
      </main>
    );
  }

  const contato = contatosDemonstrativos.find((c) => c.id === t.compartilhamento.contatoId);
  const nivel = t.compartilhamento.nivel;
  const mostraReferencia = nivel === "referencias" || nivel === "localizacao";
  const mostraLocal = nivel === "localizacao" && !t.compartilhamento.localizacaoPausada;
  const situacao = t.concluido ? "Concluiu o percurso" : t.emPausa ? "Em pausa" : "Em percurso";

  return (
    <main className="mx-auto min-h-dvh w-full max-w-xl bg-background px-5 py-10">
      <header>
        <p className="viva-legenda text-text-secondary">
          Acompanhamento temporário · {contato?.nome ?? "convidado"}
        </p>
        <h1 className="mt-1 viva-titulo text-text-primary">{situacao}</h1>
        <p className="mt-2 viva-apoio text-text-secondary">
          Este acesso termina em {minutosRestantes(t.compartilhamento)} minutos.
        </p>
      </header>

      <div className="mt-6 space-y-5">
        <Card variante="informativo" titulo="O que você pode ver">
          <ul className="space-y-1">
            {niveis
              .find((n) => n.id === nivel)
              ?.mostra.map((item) => (
                <li key={item} className="viva-apoio text-text-secondary">
                  • {item}
                </li>
              ))}
          </ul>
          <Nota>
            Você não tem acesso a registros pessoais, histórico ou conteúdos da pessoa. O
            acompanhamento pode ser encerrado por ela a qualquer momento.
          </Nota>
        </Card>

        {mostraReferencia && t.etapas[t.etapaAtual] ? (
          <Card variante="proximo-passo" titulo="Onde a pessoa está no percurso">
            <p className="viva-texto text-text-primary">{t.etapas[t.etapaAtual].referencia}</p>
          </Card>
        ) : null}

        {mostraLocal ? (
          <MapaSimulado etapas={t.etapas} etapaAtual={t.etapaAtual} pausado={t.emPausa} />
        ) : null}

        {nivel === "localizacao" && t.compartilhamento.localizacaoPausada ? (
          <Card variante="aviso" titulo="Localização pausada">
            <p className="viva-apoio text-text-secondary">
              A pessoa pausou a localização. Isso é uma escolha legítima e não indica problema.
            </p>
          </Card>
        ) : null}

        {t.pedidos.length > 0 ? (
          <Card variante="informativo" titulo="Mensagens da pessoa">
            <ul className="space-y-3">
              {t.pedidos.map((p) => (
                <li key={p.id} className="rounded-2xl bg-surface-muted p-4">
                  <p className="viva-apoio text-text-primary">{p.texto}</p>
                  <div className="mt-3">
                    {p.respondido ? (
                      <p className="viva-legenda text-text-secondary">Você já respondeu.</p>
                    ) : (
                      <Botao
                        variante="secundario"
                        tamanho="compacto"
                        icone={HandHeart}
                        onClick={() => acoes.responderPedido(p.id)}
                      >
                        Avisar que estou a caminho
                      </Botao>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        ) : null}
      </div>
    </main>
  );
}
