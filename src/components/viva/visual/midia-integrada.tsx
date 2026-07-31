/**
 * IntegratedStageMedia — a mídia vive dentro da etapa.
 *
 * Nada de sair do percurso para procurar um vídeo na biblioteca: imagem,
 * vídeo, áudio, história visual e checklist abrem no próprio card, e ao
 * fechar a pessoa volta exatamente à mesma etapa (documentos 09, 11, 19).
 *
 * Nunca há reprodução automática. Sempre há alternativa textual.
 */
import {
  Check,
  ChevronLeft,
  ChevronRight,
  FileText,
  Headphones,
  Image as ImageIcon,
  ListChecks,
  Pause,
  Play,
  RotateCcw,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { useModo } from "@/lib/viva-modos";
import type { MidiaDaEtapa } from "@/lib/viva-montagem";

const iconePorTipo = {
  video: Play,
  audio: Headphones,
  historia: ImageIcon,
  checklist: ListChecks,
  imagem: ImageIcon,
} as const;

const rotuloPorTipo = {
  video: "Vídeo",
  audio: "Áudio",
  historia: "História visual",
  checklist: "Checklist",
  imagem: "Imagem",
} as const;

export function IntegratedStageMedia({ midias }: { midias?: MidiaDaEtapa[] }) {
  const [aberta, setAberta] = useState<number | null>(null);
  const { modo } = useModo();

  if (!midias?.length) return null;

  // A ordem segue a preferência do modo: o que ele prioriza aparece primeiro.
  const ordenadas = [...midias].sort((a, b) => {
    const peso = (t: MidiaDaEtapa["tipo"]) => (t === modo.midiaPreferida ? 0 : 1);
    return peso(a.tipo) - peso(b.tipo);
  });

  return (
    <div className="mt-3">
      <ul className="flex flex-wrap gap-2">
        {ordenadas.map((midia, i) => {
          const Icone = iconePorTipo[midia.tipo];
          return (
            <li key={`${midia.tipo}-${i}`}>
              <button
                type="button"
                onClick={() => setAberta(aberta === i ? null : i)}
                aria-expanded={aberta === i}
                className={cn(
                  "viva-tap inline-flex min-h-11 items-center gap-2 rounded-full border px-4 viva-legenda font-medium",
                  aberta === i
                    ? "border-[var(--profile-primary)] bg-[var(--profile-secondary)] text-[var(--profile-text)]"
                    : "border-[var(--profile-border)] text-[var(--profile-muted)]",
                )}
              >
                <Icone className="h-4 w-4" aria-hidden />
                {rotuloPorTipo[midia.tipo]}
                {"duracao" in midia ? ` · ${midia.duracao}` : ""}
              </button>
            </li>
          );
        })}
      </ul>

      {aberta !== null ? (
        <div
          className="mt-3 border border-[var(--profile-border)] bg-[var(--profile-surface)] p-3"
          style={{ borderRadius: "var(--profile-radius)" }}
        >
          <div className="flex items-start justify-between gap-3">
            <p className="viva-legenda font-semibold text-[var(--profile-text)]">
              {ordenadas[aberta].titulo}
            </p>
            <button
              type="button"
              onClick={() => setAberta(null)}
              aria-label="Fechar e voltar para a etapa"
              className="viva-tap grid h-11 w-11 shrink-0 place-items-center rounded-full text-[var(--profile-muted)]"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
          <Visualizador midia={ordenadas[aberta]} />
        </div>
      ) : null}
    </div>
  );
}

function Visualizador({ midia }: { midia: MidiaDaEtapa }) {
  if (midia.tipo === "video") return <VisualizadorDeVideo midia={midia} />;
  if (midia.tipo === "audio") return <VisualizadorDeAudio midia={midia} />;
  if (midia.tipo === "historia") return <HistoriaVisual midia={midia} />;
  if (midia.tipo === "checklist") return <ChecklistVisual midia={midia} />;
  return (
    <div className="mt-2">
      <div className="grid h-32 place-items-center rounded-2xl bg-[var(--profile-secondary)]">
        <ImageIcon className="h-8 w-8 text-[var(--profile-primary)]" aria-hidden />
      </div>
      <p className="mt-2 viva-legenda text-[var(--profile-muted)]">{midia.descricao}</p>
    </div>
  );
}

function VisualizadorDeVideo({
  midia,
}: {
  midia: Extract<MidiaDaEtapa, { tipo: "video" }>;
}) {
  const [tocando, setTocando] = useState(false);
  const [transcricao, setTranscricao] = useState(false);
  const [progresso, setProgresso] = useState(0);

  useEffect(() => {
    if (!tocando) return;
    const t = window.setInterval(() => {
      setProgresso((p) => {
        if (p >= 100) {
          setTocando(false);
          return 100;
        }
        return p + 4;
      });
    }, 260);
    return () => window.clearInterval(t);
  }, [tocando]);

  return (
    <div className="mt-2">
      <div className="relative grid h-40 place-items-center overflow-hidden rounded-2xl bg-[var(--profile-secondary)]">
        <button
          type="button"
          onClick={() => setTocando((v) => !v)}
          aria-label={tocando ? "Pausar o vídeo" : "Reproduzir o vídeo"}
          className="viva-tap grid h-16 w-16 place-items-center rounded-full bg-[var(--profile-primary)] text-[var(--profile-surface)]"
        >
          {tocando ? <Pause className="h-7 w-7" aria-hidden /> : <Play className="h-7 w-7" aria-hidden />}
        </button>
        <span className="absolute bottom-2 right-3 rounded-full bg-[var(--profile-surface)]/90 px-2 py-0.5 text-[0.7rem] font-semibold text-[var(--profile-text)]">
          {midia.duracao}
        </span>
        <span className="absolute bottom-2 left-3 rounded-full bg-[var(--profile-surface)]/90 px-2 py-0.5 text-[0.7rem] text-[var(--profile-muted)]">
          {midia.legenda}
        </span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[var(--profile-secondary)]">
        <div
          className="h-full rounded-full bg-[var(--profile-primary)] transition-[width]"
          style={{ width: `${progresso}%` }}
        />
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        <BotaoDeMidia
          icone={RotateCcw}
          onClick={() => {
            setProgresso(0);
            setTocando(false);
          }}
        >
          Repetir
        </BotaoDeMidia>
        <BotaoDeMidia icone={FileText} onClick={() => setTranscricao((v) => !v)}>
          {transcricao ? "Ocultar transcrição" : "Ver transcrição"}
        </BotaoDeMidia>
      </div>
      {transcricao ? (
        <p className="mt-2 viva-legenda text-[var(--profile-muted)]">{midia.transcricao}</p>
      ) : null}
      <p className="sr-only">Este vídeo é demonstrativo e não inicia sozinho.</p>
    </div>
  );
}

function VisualizadorDeAudio({
  midia,
}: {
  midia: Extract<MidiaDaEtapa, { tipo: "audio" }>;
}) {
  const [tocando, setTocando] = useState(false);
  const [transcricao, setTranscricao] = useState(false);
  const [velocidade, setVelocidade] = useState(1);
  const [quadro, setQuadro] = useState(0);
  const relogio = useRef<number | null>(null);

  useEffect(() => {
    if (!tocando) return;
    relogio.current = window.setInterval(() => setQuadro((q) => q + 1), 200);
    return () => {
      if (relogio.current) window.clearInterval(relogio.current);
    };
  }, [tocando]);

  const barras = Array.from({ length: 32 }).map((_, i) => {
    const base = 0.25 + Math.abs(Math.sin(i * 0.7)) * 0.75;
    const vivo = tocando ? 0.6 + Math.abs(Math.sin((i + quadro) * 0.5)) * 0.4 : 1;
    return base * vivo;
  });

  return (
    <div className="mt-2">
      <div className="flex items-center gap-3 rounded-2xl bg-[var(--profile-secondary)] p-3">
        <button
          type="button"
          onClick={() => setTocando((v) => !v)}
          aria-label={tocando ? "Pausar o áudio" : "Reproduzir o áudio"}
          className="viva-tap grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[var(--profile-primary)] text-[var(--profile-surface)]"
        >
          {tocando ? <Pause className="h-5 w-5" aria-hidden /> : <Play className="h-5 w-5" aria-hidden />}
        </button>
        <span aria-hidden className="flex h-10 min-w-0 flex-1 items-center gap-[3px]">
          {barras.map((n, i) => (
            <span
              key={i}
              className="flex-1 rounded-full bg-[var(--profile-primary)]"
              style={{ height: `${Math.round(n * 36)}px`, opacity: 0.45 + n * 0.5 }}
            />
          ))}
        </span>
        <span className="shrink-0 viva-legenda text-[var(--profile-muted)]">{midia.duracao}</span>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        <BotaoDeMidia onClick={() => setVelocidade(velocidade === 1 ? 1.5 : 1)}>
          Velocidade {velocidade}×
        </BotaoDeMidia>
        <BotaoDeMidia icone={FileText} onClick={() => setTranscricao((v) => !v)}>
          {transcricao ? "Ocultar transcrição" : "Ver transcrição"}
        </BotaoDeMidia>
      </div>
      {transcricao ? (
        <p className="mt-2 viva-legenda text-[var(--profile-muted)]">{midia.transcricao}</p>
      ) : null}
    </div>
  );
}

function HistoriaVisual({ midia }: { midia: Extract<MidiaDaEtapa, { tipo: "historia" }> }) {
  const [i, setI] = useState(0);
  const quadro = midia.quadros[i];
  return (
    <div className="mt-2">
      <div className="grid h-40 place-items-center rounded-2xl bg-[var(--profile-secondary)]">
        <span className="viva-titulo text-[var(--profile-primary)]">{i + 1}</span>
      </div>
      <p className="mt-2 viva-legenda font-semibold text-[var(--profile-text)]">{quadro.titulo}</p>
      <p className="viva-legenda text-[var(--profile-muted)]">{quadro.descricao}</p>
      <div className="mt-2 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setI((v) => Math.max(0, v - 1))}
          disabled={i === 0}
          aria-label="Imagem anterior"
          className="viva-tap grid h-11 w-11 place-items-center rounded-full border border-[var(--profile-border)] text-[var(--profile-text)] disabled:opacity-40"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => setI((v) => Math.min(midia.quadros.length - 1, v + 1))}
          disabled={i === midia.quadros.length - 1}
          aria-label="Próxima imagem"
          className="viva-tap grid h-11 w-11 place-items-center rounded-full border border-[var(--profile-border)] text-[var(--profile-text)] disabled:opacity-40"
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>
        <span className="viva-legenda text-[var(--profile-muted)]">
          {i + 1} de {midia.quadros.length}
        </span>
      </div>
    </div>
  );
}

function ChecklistVisual({ midia }: { midia: Extract<MidiaDaEtapa, { tipo: "checklist" }> }) {
  const [feitos, setFeitos] = useState<string[]>([]);
  return (
    <ul className="mt-2 space-y-2">
      {midia.itens.map((item) => {
        const feito = feitos.includes(item);
        return (
          <li key={item}>
            <button
              type="button"
              aria-pressed={feito}
              onClick={() =>
                setFeitos((atuais) =>
                  atuais.includes(item) ? atuais.filter((i) => i !== item) : [...atuais, item],
                )
              }
              className="viva-tap flex w-full min-h-11 items-center gap-3 rounded-2xl border border-[var(--profile-border)] px-3 text-left"
            >
              <span
                aria-hidden
                className={cn(
                  "grid h-7 w-7 shrink-0 place-items-center rounded-full border-2",
                  feito
                    ? "border-[var(--profile-primary)] bg-[var(--profile-primary)] text-[var(--profile-surface)]"
                    : "border-[var(--profile-border)]",
                )}
              >
                {feito ? <Check className="h-4 w-4" aria-hidden /> : null}
              </span>
              <span className="viva-legenda text-[var(--profile-text)]">{item}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function BotaoDeMidia({
  children,
  onClick,
  icone: Icone,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  icone?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="viva-tap inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--profile-border)] px-4 viva-legenda font-medium text-[var(--profile-text)]"
    >
      {Icone ? <Icone className="h-4 w-4" aria-hidden /> : null}
      {children}
    </button>
  );
}
