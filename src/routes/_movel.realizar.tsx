import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { HandHeart, Pause, Play, ShieldCheck } from "lucide-react";
import { useState } from "react";

import { Botao, Card, Nota } from "@/components/ds";
import { IndicadorDeAcompanhamento, MapaSimulado } from "@/components/viva/trajeto";
import { cn } from "@/lib/utils";
import { fases, trajeto as acoes, useTrajeto } from "@/lib/viva-trajeto";

export const Route = createFileRoute("/_movel/realizar")({
  head: () => ({
    meta: [
      { title: "Percurso em andamento — VIVA" },
      {
        name: "description",
        content:
          "Preparar, ensaiar, realizar e registrar: um passo por vez, com pausa sempre disponível e acompanhamento opcional.",
      },
      { property: "og:title", content: "Percurso em andamento — VIVA" },
      {
        property: "og:description",
        content: "Um passo por vez, no seu ritmo, com pausa e encerramento sempre possíveis.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Realizar,
});

function Realizar() {
  const t = useTrajeto();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState("");

  if (!t.contexto) {
    return (
      <div className="space-y-6">
        <h1 className="viva-titulo text-text-primary">Nenhum percurso em andamento</h1>
        <p className="viva-apoio text-text-secondary">
          Você pode dizer o que precisa ou montar um percurso com cartões.
        </p>
        <div className="flex flex-wrap gap-3">
          <Botao variante="principal" onClick={() => navigate({ to: "/falar" })}>
            Dizer o que preciso
          </Botao>
          <Botao variante="secundario" onClick={() => navigate({ to: "/montar" })}>
            Montar com cartões
          </Botao>
        </div>
      </div>
    );
  }

  const etapa = t.etapas[t.etapaAtual];
  const ultima = t.etapaAtual >= t.etapas.length - 1;

  return (
    <div className="space-y-6">
      <header>
        <p className="viva-legenda text-text-secondary">Percurso</p>
        <h1 className="viva-titulo text-text-primary">{t.titulo}</h1>
      </header>

      <IndicadorDeAcompanhamento compartilhamento={t.compartilhamento} />

      <nav aria-label="Fases do percurso">
        <ul className="flex flex-wrap gap-2">
          {fases.map((f) => (
            <li key={f.id}>
              <button
                type="button"
                aria-current={f.id === t.fase ? "step" : undefined}
                onClick={() => acoes.irParaFase(f.id)}
                className={cn(
                  "viva-tap min-h-11 rounded-full px-4 viva-legenda font-medium",
                  f.id === t.fase
                    ? "bg-destaque-suave text-destaque-texto"
                    : "border border-border-default text-text-secondary",
                )}
              >
                {f.titulo}
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-2 viva-legenda text-text-secondary">
          {fases.find((f) => f.id === t.fase)?.convite}
        </p>
      </nav>

      {t.concluido ? (
        <Card variante="experiencia" titulo="Percurso concluído">
          <p className="viva-apoio text-text-secondary">
            O acompanhamento foi encerrado automaticamente. Registrar como foi é opcional.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Botao variante="principal" onClick={() => navigate({ to: "/jornada/registro" })}>
              Registrar como foi
            </Botao>
            <Botao
              variante="secundario"
              onClick={() => {
                acoes.encerrarPercurso();
                navigate({ to: "/" });
              }}
            >
              Encerrar por hoje
            </Botao>
          </div>
        </Card>
      ) : (
        <>
          <Card variante="proximo-passo" titulo={etapa.titulo}>
            <p className="viva-apoio text-text-secondary">{etapa.apoio}</p>
            {t.emPausa ? (
              <Nota>Percurso em pausa. Retomar quando quiser — e não retomar também é válido.</Nota>
            ) : null}
            <div className="mt-5 flex flex-wrap gap-3">
              {t.emPausa ? (
                <Botao variante="principal" icone={Play} onClick={() => acoes.retomar()}>
                  Retomar
                </Botao>
              ) : ultima ? (
                <Botao variante="principal" onClick={() => acoes.concluir()}>
                  Cheguei ao fim
                </Botao>
              ) : (
                <Botao variante="principal" onClick={() => acoes.avancar()}>
                  Passei desta etapa
                </Botao>
              )}
              {!t.emPausa ? (
                <Botao variante="secundario" icone={Pause} onClick={() => acoes.pausar()}>
                  Pausar
                </Botao>
              ) : null}
              {t.etapaAtual > 0 ? (
                <Botao variante="terciario" tamanho="compacto" onClick={() => acoes.voltar()}>
                  Voltar uma etapa
                </Botao>
              ) : null}
            </div>
          </Card>

          <MapaSimulado
            etapas={t.etapas}
            etapaAtual={t.etapaAtual}
            pausado={t.emPausa}
            mostrarPosicao={!t.compartilhamento.localizacaoPausada}
          />

          <Card variante="informativo" titulo="Pedir apoio">
            <p className="viva-apoio text-text-secondary">
              Uma mensagem curta chega a quem estiver acompanhando. Pedir apoio não encerra o
              percurso.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Estou bem", "Preciso de um tempo", "Pode me ligar?"].map((texto) => (
                <Botao
                  key={texto}
                  variante="secundario"
                  tamanho="compacto"
                  icone={HandHeart}
                  onClick={() => acoes.pedirApoio(texto)}
                  disabled={!t.compartilhamento.ativo}
                >
                  {texto}
                </Botao>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <input
                aria-label="Mensagem para quem acompanha"
                value={pedido}
                onChange={(e) => setPedido(e.target.value)}
                placeholder="Escrever outra mensagem"
                className="min-h-11 flex-1 rounded-2xl border border-input bg-surface-default px-4 viva-apoio text-text-primary"
              />
              <Botao
                variante="secundario"
                tamanho="compacto"
                disabled={!t.compartilhamento.ativo || pedido.trim().length === 0}
                onClick={() => {
                  acoes.pedirApoio(pedido.trim());
                  setPedido("");
                }}
              >
                Enviar
              </Botao>
            </div>
            {!t.compartilhamento.ativo ? (
              <Nota>Ninguém está acompanhando agora. Você pode autorizar quando quiser.</Nota>
            ) : null}
          </Card>

          {!t.compartilhamento.ativo ? (
            <Card variante="informativo" titulo="Acompanhamento">
              <Botao
                variante="secundario"
                icone={ShieldCheck}
                onClick={() => navigate({ to: "/compartilhar" })}
              >
                Quero que alguém acompanhe
              </Botao>
            </Card>
          ) : null}

          <Card variante="informativo" titulo="Encerrar">
            <Botao
              variante="terciario"
              tamanho="compacto"
              onClick={() => {
                acoes.encerrarPercurso();
                navigate({ to: "/" });
              }}
            >
              Encerrar este percurso agora
            </Botao>
          </Card>
        </>
      )}
    </div>
  );
}
