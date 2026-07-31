import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Card, Nota } from "@/components/ds";
import { MapaDoPercurso } from "@/components/viva/localizacao/mapa-do-percurso";
import {
  lerAcompanhamento,
  precisoes,
  type LeituraDeAcompanhamento,
} from "@/lib/compartilhamento/sessoes";

/**
 * Tela de quem acompanha: mostra apenas o que a pessoa autorizou, por tempo
 * limitado, sem histórico e sem dados de terceiros (documentos 03, 15 e 16).
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

const situacoes: Record<string, string> = {
  executing: "Em percurso",
  paused: "Em pausa",
  completed: "Concluiu o percurso",
  ready: "Prestes a começar",
  draft: "Preparando o percurso",
};

function Acompanhar() {
  const { token } = Route.useParams();
  const [leitura, setLeitura] = useState<LeituraDeAcompanhamento | null>(null);

  useEffect(() => {
    let vivo = true;
    const buscar = () =>
      void lerAcompanhamento(token).then((resposta) => {
        if (vivo) setLeitura(resposta);
      });
    buscar();
    const intervalo = window.setInterval(buscar, 45_000);
    return () => {
      vivo = false;
      window.clearInterval(intervalo);
    };
  }, [token]);

  if (!leitura) {
    return (
      <main className="mx-auto min-h-dvh w-full max-w-xl bg-background px-5 py-12">
        <p className="viva-legenda text-text-secondary">Abrindo o acompanhamento…</p>
      </main>
    );
  }

  if (leitura.status !== "active") {
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

  const nivel = precisoes.find((p) => p.id === leitura.precision);

  return (
    <main className="mx-auto min-h-dvh w-full max-w-xl bg-background px-5 py-10">
      <header>
        <p className="viva-legenda text-text-secondary">Acompanhamento temporário</p>
        <h1 className="mt-1 viva-titulo text-text-primary">
          {situacoes[leitura.journey.status] ?? "Em percurso"}
        </h1>
        <p className="mt-2 viva-apoio text-text-secondary">
          Este acesso termina às{" "}
          {new Date(leitura.expires_at).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
          .
        </p>
      </header>

      <div className="mt-6 space-y-5">
        <Card variante="informativo" titulo="O que você pode ver">
          <ul className="space-y-1">
            {nivel?.mostra.map((item) => (
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

        {leitura.journey.step_label ? (
          <Card variante="proximo-passo" titulo="Onde a pessoa está no percurso">
            <p className="viva-texto text-text-primary">{leitura.journey.step_label}</p>
          </Card>
        ) : null}

        {leitura.location ? (
          <MapaDoPercurso
            pontos={[
              {
                latitude: leitura.location.latitude,
                longitude: leitura.location.longitude,
                titulo:
                  leitura.precision === "approximate"
                    ? "Região aproximada da pessoa"
                    : "Onde a pessoa está agora",
              },
            ]}
            descricao="Mapa com a localização compartilhada"
          />
        ) : (
          <Card variante="informativo" titulo="Sem localização agora">
            <p className="viva-apoio text-text-secondary">
              A pessoa escolheu não compartilhar localização, ou pausou o envio. Isso é uma escolha
              legítima e não indica problema.
            </p>
          </Card>
        )}
      </div>
    </main>
  );
}
