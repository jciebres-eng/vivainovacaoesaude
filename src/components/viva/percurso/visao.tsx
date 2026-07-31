import { Link } from "@tanstack/react-router";
import { Check, Circle, ExternalLink, MapPin } from "lucide-react";

import { Botao, Card, Nota } from "@/components/ds";
import { cn } from "@/lib/utils";
import { linkDeLocal, linkDeRota, tempoAproximado } from "@/lib/viva-mapa";
import { rotulosDeEstado, type Percurso } from "@/lib/viva-percursos";
import { rotulosDeMeio } from "@/lib/viva-situacoes";
import { conteudoPorId } from "@/lib/viva-biblioteca-dados";

/** Resumo objetivo do percurso — sem métrica, sem pontuação, sem cobrança. */
export function ResumoDoPercurso({ percurso }: { percurso: Percurso }) {
  return (
    <Card variante="informativo" titulo={percurso.titulo}>
      <dl className="grid gap-1 viva-legenda text-text-secondary">
        <div className="flex flex-wrap gap-x-2">
          <dt>Situação:</dt>
          <dd className="text-text-primary">{rotulosDeEstado[percurso.estado]}</dd>
        </div>
        <div className="flex flex-wrap gap-x-2">
          <dt>De:</dt>
          <dd className="text-text-primary">{percurso.origem}</dd>
        </div>
        <div className="flex flex-wrap gap-x-2">
          <dt>Para:</dt>
          <dd className="text-text-primary">{percurso.destino}</dd>
        </div>
        <div className="flex flex-wrap gap-x-2">
          <dt>Como:</dt>
          <dd className="text-text-primary">{rotulosDeMeio[percurso.meio]}</dd>
        </div>
        <div className="flex flex-wrap gap-x-2">
          <dt>Horário pensado:</dt>
          <dd className="text-text-primary">{percurso.horario}</dd>
        </div>
        <div className="flex flex-wrap gap-x-2">
          <dt>Tempo aproximado:</dt>
          <dd className="text-text-primary">
            {tempoAproximado(percurso.etapas.map((e) => e.minutos))}
          </dd>
        </div>
      </dl>
      <Nota>
        O tempo é uma estimativa de apoio, nunca uma meta. Demorar mais não significa nada de
        errado.
      </Nota>
    </Card>
  );
}

/** Etapas em sequência: uma por linha, com estado em palavra e ícone. */
export function LinhaDeEtapas({
  percurso,
  destacarAtual = false,
}: {
  percurso: Percurso;
  destacarAtual?: boolean;
}) {
  return (
    <ol className="space-y-2">
      {percurso.etapas.map((etapa, i) => {
        const atual = destacarAtual && i === percurso.etapaAtual;
        return (
          <li
            key={etapa.id}
            className={cn(
              "rounded-2xl border p-4",
              atual
                ? "border-destaque bg-destaque-suave"
                : "border-border-default bg-surface-default",
            )}
          >
            <div className="flex items-start gap-3">
              <span aria-hidden className="mt-1 text-text-secondary">
                {etapa.concluida ? <Check className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
              </span>
              <div className="min-w-0">
                <p className="viva-apoio font-semibold text-text-primary">{etapa.titulo}</p>
                {etapa.apoio ? (
                  <p className="mt-1 viva-legenda text-text-secondary">{etapa.apoio}</p>
                ) : null}
                <p className="mt-1 viva-legenda text-text-secondary">
                  {etapa.concluida ? "Passou por aqui · " : ""}
                  {atual ? "Etapa atual · " : ""}
                  cerca de {etapa.minutos} minutos
                  {etapa.referencia ? ` · ${etapa.referencia}` : ""}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/** Mapa por pontos de referência, com abertura opcional do mapa real. */
export function MapaDoPercurso({ percurso }: { percurso: Percurso }) {
  const referencias = percurso.etapas.filter((e) => e.referencia);
  return (
    <Card variante="informativo" titulo="Caminho por pontos de referência" icone={MapPin}>
      <p className="viva-apoio text-text-secondary">
        Representação demonstrativa. O VIVA não acompanha sua localização.
      </p>
      {referencias.length > 0 ? (
        <ol className="mt-4 space-y-2">
          {referencias.map((e, i) => (
            <li key={e.id} className="flex items-start gap-3">
              <span
                aria-hidden
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-destaque-suave viva-legenda font-semibold text-destaque-texto"
              >
                {i + 1}
              </span>
              <span className="min-w-0">
                <span className="block viva-apoio text-text-primary">{e.referencia}</span>
                <span className="block viva-legenda text-text-secondary">{e.titulo}</span>
              </span>
            </li>
          ))}
        </ol>
      ) : (
        <p className="mt-3 viva-legenda text-text-secondary">
          Este percurso não tem deslocamento previsto.
        </p>
      )}

      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href={linkDeRota({ origem: percurso.origem, destino: percurso.destino, meio: percurso.meio })}
          target="_blank"
          rel="noopener noreferrer"
          className="viva-tap inline-flex min-h-11 items-center gap-2 rounded-full border border-border-default px-4 viva-legenda font-medium text-text-primary"
        >
          <ExternalLink className="h-4 w-4" aria-hidden />
          Abrir o caminho no mapa (nova aba)
        </a>
        {referencias[0]?.referencia ? (
          <a
            href={linkDeLocal(referencias[0].referencia)}
            target="_blank"
            rel="noopener noreferrer"
            className="viva-tap inline-flex min-h-11 items-center gap-2 rounded-full viva-legenda font-medium text-text-secondary underline underline-offset-4"
          >
            Ver o primeiro ponto
          </a>
        ) : null}
      </div>
    </Card>
  );
}

/** Conteúdos da biblioteca ligados a este percurso. */
export function LeiturasDoPercurso({ percurso }: { percurso: Percurso }) {
  const conteudos = percurso.conteudos.map(conteudoPorId).filter(Boolean);
  if (conteudos.length === 0) {
    return (
      <Card variante="informativo" titulo="Leituras">
        <p className="viva-apoio text-text-secondary">
          Nenhuma leitura escolhida. Ler não é obrigatório para seguir.
        </p>
      </Card>
    );
  }
  return (
    <Card variante="biblioteca" titulo="Para ler com calma">
      <ul className="space-y-2">
        {conteudos.map((c) => (
          <li key={c!.id}>
            <Link
              to="/biblioteca/$conteudoId"
              params={{ conteudoId: c!.id }}
              className="viva-tap block min-h-11 rounded-2xl border border-border-default p-3"
            >
              <span className="block viva-apoio font-semibold text-text-primary">{c!.titulo}</span>
              <span className="block viva-legenda text-text-secondary">
                {c!.resumo} · cerca de {c!.minutos} minutos
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/** Planos alternativos: existir uma saída faz parte do percurso. */
export function AlternativasDoPercurso({
  percurso,
  acao,
}: {
  percurso: Percurso;
  acao?: { texto: string; onClick: () => void };
}) {
  return (
    <Card variante="informativo" titulo="Se não der certo hoje">
      {percurso.alternativas.length === 0 ? (
        <p className="viva-apoio text-text-secondary">
          Nenhum plano alternativo escolhido ainda. Você pode adicionar quando quiser.
        </p>
      ) : (
        <ul className="space-y-2">
          {percurso.alternativas.map((a) => (
            <li key={a.id}>
              <p className="viva-apoio font-semibold text-text-primary">{a.titulo}</p>
              <p className="viva-legenda text-text-secondary">{a.frase}</p>
            </li>
          ))}
        </ul>
      )}
      {acao ? (
        <div className="mt-4">
          <Botao variante="secundario" tamanho="compacto" onClick={acao.onClick}>
            {acao.texto}
          </Botao>
        </div>
      ) : null}
    </Card>
  );
}
