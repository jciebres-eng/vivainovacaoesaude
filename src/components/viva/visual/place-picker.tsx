/**
 * UniversalPlacePicker e MapPlacePicker — busca real de endereços.
 *
 * A pessoa digita como fala: nome do lugar, endereço, CEP ou coordenada.
 * A busca é desacoplada: quando há chave de serviço configurada, usa o
 * provedor real; sem chave, o catálogo demonstrativo local responde, sempre
 * com a origem do dado visível (documentos 03, 19).
 */
import { Crosshair, Loader2, MapPin, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import {
  buscaDeLugares,
  centroDemonstrativo,
  formatarCep,
  pareceCep,
  resolvedorPostal,
  type LocalConfirmado,
  type Sugestao,
} from "@/lib/providers/lugares";
import { MapaMiniatura } from "@/components/viva/visual/visual-base";

const categoriaEmPalavras: Record<string, string> = {
  mercado: "Mercado",
  farmacia: "Farmácia",
  hospital: "Saúde",
  estacao: "Transporte",
  universidade: "Estudo",
  hotel: "Hospedagem",
  trabalho: "Trabalho",
  casa: "Casa",
  endereco: "Endereço",
  outro: "Lugar",
};

export function UniversalPlacePicker({
  rotulo = "Para onde você quer ir?",
  onConfirmar,
}: {
  rotulo?: string;
  onConfirmar?: (local: LocalConfirmado) => void;
}) {
  const [texto, setTexto] = useState("");
  const [sugestoes, setSugestoes] = useState<Sugestao[]>([]);
  const [buscando, setBuscando] = useState(false);
  const [origem, setOrigem] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);
  const [confirmado, setConfirmado] = useState<LocalConfirmado | null>(null);
  const [ajustando, setAjustando] = useState(false);
  const sessao = useRef(Math.random().toString(36).slice(2));

  useEffect(() => {
    const consulta = texto.trim();
    if (consulta.length < 3) {
      setSugestoes([]);
      setAviso(null);
      return;
    }
    let ativo = true;
    setBuscando(true);
    const t = window.setTimeout(async () => {
      try {
        if (pareceCep(consulta)) {
          const postal = await resolvedorPostal().resolver(consulta);
          if (!ativo) return;
          setOrigem(postal.provedor);
          setAviso(postal.aviso ?? null);
          setSugestoes(
            postal.dados
              ? [
                  {
                    id: `cep-${postal.dados.cep}`,
                    nome: postal.dados.logradouro || `CEP ${formatarCep(postal.dados.cep)}`,
                    endereco: `${postal.dados.logradouro}, ${postal.dados.bairro}`,
                    bairroOuCidade: `${postal.dados.cidade} · ${postal.dados.estado}`,
                    categoria: "endereco",
                  },
                ]
              : [],
          );
          return;
        }
        const resposta = await buscaDeLugares().autocompletar(consulta, {
          centro: centroDemonstrativo,
          sessao: sessao.current,
        });
        if (!ativo) return;
        setSugestoes(resposta.dados);
        setOrigem(resposta.provedor);
        setAviso(resposta.aviso ?? null);
      } finally {
        if (ativo) setBuscando(false);
      }
    }, 320);
    return () => {
      ativo = false;
      window.clearTimeout(t);
    };
  }, [texto]);

  async function escolher(sugestao: Sugestao) {
    const resposta = await buscaDeLugares().detalhes(sugestao);
    if (resposta.dados) {
      setConfirmado(resposta.dados);
      setSugestoes([]);
      setTexto(resposta.dados.nome);
      setOrigem(resposta.provedor);
    }
  }

  async function usarMinhaLocalizacao() {
    if (!("geolocation" in navigator)) return;
    setBuscando(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const resposta = await buscaDeLugares().geocodificarReverso({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        if (resposta.dados) {
          setConfirmado(resposta.dados);
          setTexto(resposta.dados.nome);
          setOrigem(resposta.provedor);
        }
        setBuscando(false);
      },
      () => {
        setAviso("Sem acesso à localização. Você pode digitar o endereço.");
        setBuscando(false);
      },
      { timeout: 8000 },
    );
  }

  return (
    <section className="space-y-3">
      <label htmlFor="picker-lugar" className="block viva-legenda font-semibold text-[var(--profile-text)]">
        {rotulo}
      </label>
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--profile-muted)]"
          aria-hidden
        />
        <input
          id="picker-lugar"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          inputMode="search"
          autoComplete="off"
          placeholder="Nome do lugar, endereço ou CEP"
          aria-describedby="picker-ajuda"
          className="viva-tap w-full min-h-12 border border-[var(--profile-border)] bg-[var(--profile-surface)] pl-12 pr-12 viva-texto-botao text-[var(--profile-text)] placeholder:text-[var(--profile-muted)]"
          style={{ borderRadius: "var(--profile-radius)" }}
        />
        {texto ? (
          <button
            type="button"
            onClick={() => {
              setTexto("");
              setSugestoes([]);
              setConfirmado(null);
            }}
            aria-label="Limpar a busca"
            className="viva-tap absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full text-[var(--profile-muted)]"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        ) : null}
      </div>
      <p id="picker-ajuda" className="viva-legenda text-[var(--profile-muted)]">
        Pode escrever do seu jeito. Se digitar oito números, entendemos como CEP.
      </p>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={usarMinhaLocalizacao}
          className="viva-tap inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--profile-border)] px-4 viva-legenda text-[var(--profile-text)]"
        >
          <Crosshair className="h-4 w-4" aria-hidden />
          Usar onde estou agora
        </button>
        <button
          type="button"
          onClick={() => setAjustando((v) => !v)}
          aria-expanded={ajustando}
          className="viva-tap inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--profile-border)] px-4 viva-legenda text-[var(--profile-text)]"
        >
          <MapPin className="h-4 w-4" aria-hidden />
          Escolher no mapa
        </button>
      </div>

      <p aria-live="polite" className="sr-only">
        {buscando ? "Buscando lugares." : `${sugestoes.length} resultados.`}
      </p>

      {buscando ? (
        <p className="flex items-center gap-2 viva-legenda text-[var(--profile-muted)]">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          Buscando com calma
        </p>
      ) : null}

      {sugestoes.length ? (
        <ul className="space-y-2">
          {sugestoes.map((sugestao) => (
            <li key={sugestao.id}>
              <button
                type="button"
                onClick={() => escolher(sugestao)}
                className="viva-tap flex w-full min-h-14 items-center gap-3 border border-[var(--profile-border)] bg-[var(--profile-card)] px-3 py-2 text-left"
                style={{ borderRadius: "var(--profile-radius)" }}
              >
                <span
                  aria-hidden
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--profile-secondary)] text-[var(--profile-primary)]"
                >
                  <MapPin className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate viva-legenda font-semibold text-[var(--profile-text)]">
                    {sugestao.nome}
                  </span>
                  <span className="block truncate viva-legenda text-[var(--profile-muted)]">
                    {categoriaEmPalavras[sugestao.categoria] ?? "Lugar"} · {sugestao.endereco}
                  </span>
                </span>
                {sugestao.distanciaEmMetros != null ? (
                  <span className="ml-auto shrink-0 viva-legenda text-[var(--profile-muted)]">
                    {Math.round(sugestao.distanciaEmMetros / 100) / 10} km
                  </span>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {ajustando ? (
        <MapPlacePicker
          inicial={
            confirmado
              ? { latitude: confirmado.latitude, longitude: confirmado.longitude }
              : centroDemonstrativo
          }
          onConfirmar={(local) => {
            setConfirmado(local);
            setTexto(local.nome);
            setAjustando(false);
            onConfirmar?.(local);
          }}
        />
      ) : null}

      {confirmado ? (
        <div
          className="border border-[var(--profile-border)] bg-[var(--profile-card)] p-3"
          style={{ borderRadius: "var(--profile-radius)" }}
        >
          <p className="viva-legenda font-semibold text-[var(--profile-text)]">{confirmado.nome}</p>
          <p className="viva-legenda text-[var(--profile-muted)]">{confirmado.enderecoFormatado}</p>
          <button
            type="button"
            onClick={() => onConfirmar?.(confirmado)}
            className="viva-tap mt-2 inline-flex min-h-11 items-center rounded-full bg-[var(--profile-primary)] px-5 viva-texto-botao font-semibold text-[var(--profile-surface)]"
          >
            Confirmar este local
          </button>
        </div>
      ) : null}

      {origem ? (
        <p className="viva-legenda text-[var(--profile-muted)]">
          Origem dos dados: {origem}
          {aviso ? ` · ${aviso}` : ""}
        </p>
      ) : null}
    </section>
  );
}

/**
 * MapPlacePicker — marcador central fixo: o mapa se move sob o ponto.
 * Há setas de teclado e botões, porque arrastar não pode ser a única forma.
 */
export function MapPlacePicker({
  inicial,
  onConfirmar,
}: {
  inicial: { latitude: number; longitude: number };
  onConfirmar: (local: LocalConfirmado) => void;
}) {
  const [ponto, setPonto] = useState(inicial);
  const [endereco, setEndereco] = useState<LocalConfirmado | null>(null);
  const [lendo, setLendo] = useState(false);
  const arraste = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    let ativo = true;
    setLendo(true);
    const t = window.setTimeout(async () => {
      const resposta = await buscaDeLugares().geocodificarReverso(ponto);
      if (!ativo) return;
      setEndereco(resposta.dados);
      setLendo(false);
    }, 380);
    return () => {
      ativo = false;
      window.clearTimeout(t);
    };
  }, [ponto]);

  const passo = 0.0012;
  const mover = (dLat: number, dLon: number) =>
    setPonto((p) => ({ latitude: p.latitude + dLat, longitude: p.longitude + dLon }));

  return (
    <div className="space-y-2">
      <div
        role="application"
        aria-label="Mapa para ajustar o ponto. Use as setas do teclado para mover."
        tabIndex={0}
        onKeyDown={(e) => {
          const teclas: Record<string, () => void> = {
            ArrowUp: () => mover(passo, 0),
            ArrowDown: () => mover(-passo, 0),
            ArrowLeft: () => mover(0, -passo),
            ArrowRight: () => mover(0, passo),
          };
          if (teclas[e.key]) {
            e.preventDefault();
            teclas[e.key]();
          }
        }}
        onPointerDown={(e) => {
          arraste.current = { x: e.clientX, y: e.clientY };
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!arraste.current) return;
          const dx = e.clientX - arraste.current.x;
          const dy = e.clientY - arraste.current.y;
          arraste.current = { x: e.clientX, y: e.clientY };
          mover(dy * 0.00002, -dx * 0.00002);
        }}
        onPointerUp={() => {
          arraste.current = null;
        }}
        className={cn(
          "relative h-56 touch-none overflow-hidden border border-[var(--profile-border)] outline-none",
          "focus-visible:ring-2 focus-visible:ring-[var(--profile-primary)] focus-visible:ring-offset-2",
        )}
        style={{ borderRadius: "var(--profile-radius)" }}
      >
        <MapaMiniatura
          latitude={ponto.latitude}
          longitude={ponto.longitude}
          descricao="Mapa simplificado com o ponto no centro."
        />
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full"
        >
          <MapPin className="h-9 w-9 text-[var(--profile-primary)]" />
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2" role="group" aria-label="Mover o mapa">
        <span />
        <BotaoDeMapa rotulo="Mover para o norte" onClick={() => mover(passo, 0)}>
          ↑
        </BotaoDeMapa>
        <span />
        <BotaoDeMapa rotulo="Mover para oeste" onClick={() => mover(0, -passo)}>
          ←
        </BotaoDeMapa>
        <BotaoDeMapa rotulo="Voltar ao centro" onClick={() => setPonto(inicial)}>
          •
        </BotaoDeMapa>
        <BotaoDeMapa rotulo="Mover para leste" onClick={() => mover(0, passo)}>
          →
        </BotaoDeMapa>
        <span />
        <BotaoDeMapa rotulo="Mover para o sul" onClick={() => mover(-passo, 0)}>
          ↓
        </BotaoDeMapa>
        <span />
      </div>

      <p aria-live="polite" className="viva-legenda text-[var(--profile-muted)]">
        {lendo ? "Lendo o endereço deste ponto." : (endereco?.enderecoFormatado ?? "Ponto no mapa")}
      </p>

      <button
        type="button"
        disabled={!endereco}
        onClick={() => endereco && onConfirmar(endereco)}
        className="viva-tap inline-flex min-h-12 items-center rounded-full bg-[var(--profile-primary)] px-5 viva-texto-botao font-semibold text-[var(--profile-surface)] disabled:opacity-50"
      >
        Usar este ponto
      </button>
    </div>
  );
}

function BotaoDeMapa({
  children,
  rotulo,
  onClick,
}: {
  children: React.ReactNode;
  rotulo: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={rotulo}
      className="viva-tap grid min-h-11 place-items-center rounded-2xl border border-[var(--profile-border)] viva-texto-botao text-[var(--profile-text)]"
    >
      <span aria-hidden>{children}</span>
    </button>
  );
}
