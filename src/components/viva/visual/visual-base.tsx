/**
 * Camada visual dos cards do VIVA.
 *
 * Regra (documentos 04, 13, 14, 17): o card comunica primeiro pela imagem,
 * pela forma, pela cor e pelo movimento. O texto complementa — nunca ocupa
 * o centro. Toda cena é desenhada em SVG a partir de tokens `--profile-*`,
 * portanto acompanha o modo de experiência em uso e nunca traz cor fixa.
 */
import { useMemo, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import { useModo } from "@/lib/viva-modos";

export type CenaVisual =
  | "lugar"
  | "rota"
  | "atividade"
  | "estrategia"
  | "conteudo"
  | "perfil"
  | "etapa"
  | "alternativa"
  | "registro"
  | "favorito";

function semente(texto: string) {
  let h = 0;
  for (let i = 0; i < texto.length; i += 1) h = (h * 31 + texto.charCodeAt(i)) % 100000;
  return h;
}

function aleatorio(base: number, indice: number) {
  const x = Math.sin(base * 12.9898 + indice * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Cena — a área visual dominante do card. Não é enfeite: cada cena
 * representa graficamente o tipo de escolha que está sendo oferecida.
 */
export function Cena({
  tipo,
  chave,
  descricao,
  className,
}: {
  tipo: CenaVisual;
  chave: string;
  /** Alternativa textual: toda imagem tem equivalente em palavras. */
  descricao: string;
  className?: string;
}) {
  const s = useMemo(() => semente(`${tipo}-${chave}`), [tipo, chave]);
  const r = (i: number) => aleatorio(s, i);

  return (
    <svg
      viewBox="0 0 320 200"
      role="img"
      aria-label={descricao}
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full", className)}
    >
      <defs>
        <linearGradient id={`fundo-${s}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--profile-secondary)" />
          <stop offset="100%" stopColor="var(--profile-accent)" stopOpacity="0.75" />
        </linearGradient>
      </defs>
      <rect width="320" height="200" fill={`url(#fundo-${s})`} />

      {tipo === "lugar" ? (
        <g>
          {Array.from({ length: 7 }).map((_, i) => (
            <rect
              key={i}
              x={r(i) * 260}
              y={40 + r(i + 20) * 120}
              width={26 + r(i + 40) * 44}
              height={20 + r(i + 60) * 40}
              rx="6"
              fill="var(--profile-surface)"
              opacity={0.55 + r(i + 80) * 0.4}
            />
          ))}
          <path
            d="M-10 150 C 70 120, 140 175, 330 132"
            stroke="var(--profile-primary)"
            strokeWidth="8"
            fill="none"
            opacity="0.35"
          />
          <g transform="translate(160 92)">
            <circle r="20" fill="var(--profile-primary)" opacity="0.18" />
            <path
              d="M0 -14 C 9 -14 15 -8 15 0 C 15 9 0 20 0 20 C 0 20 -15 9 -15 0 C -15 -8 -9 -14 0 -14 Z"
              fill="var(--profile-primary)"
            />
            <circle cy="-1" r="5" fill="var(--profile-surface)" />
          </g>
        </g>
      ) : null}

      {tipo === "rota" ? (
        <g>
          <path
            d="M20 170 C 90 170, 70 100, 140 100 S 210 40, 300 40"
            stroke="var(--profile-primary)"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M20 170 C 90 170, 70 100, 140 100 S 210 40, 300 40"
            stroke="var(--profile-surface)"
            strokeWidth="3"
            strokeDasharray="10 12"
            fill="none"
          />
          {[
            [20, 170],
            [140, 100],
            [300, 40],
          ].map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={i === 1 ? 9 : 13}
              fill="var(--profile-surface)"
              stroke="var(--profile-primary)"
              strokeWidth="5"
            />
          ))}
        </g>
      ) : null}

      {tipo === "atividade" || tipo === "etapa" ? (
        <g>
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${46 + i * 96} 100)`}>
              <circle r="30" fill="var(--profile-surface)" opacity={0.9 - i * 0.2} />
              <circle r="30" fill="none" stroke="var(--profile-primary)" strokeWidth="4" opacity={0.8 - i * 0.25} />
              <text
                x="0"
                y="8"
                textAnchor="middle"
                fontSize="24"
                fontWeight="700"
                fill="var(--profile-primary)"
              >
                {i + 1}
              </text>
            </g>
          ))}
          <path d="M76 100 H 112 M172 100 H 208" stroke="var(--profile-primary)" strokeWidth="4" opacity="0.5" />
        </g>
      ) : null}

      {tipo === "estrategia" ? (
        <g>
          <circle cx="160" cy="100" r="66" fill="var(--profile-surface)" opacity="0.75" />
          {Array.from({ length: 6 }).map((_, i) => {
            const a = (i / 6) * Math.PI * 2;
            return (
              <circle
                key={i}
                cx={160 + Math.cos(a) * 66}
                cy={100 + Math.sin(a) * 66}
                r={7 + r(i) * 7}
                fill="var(--profile-primary)"
                opacity={0.35 + r(i + 9) * 0.5}
              />
            );
          })}
          <path
            d="M138 100 l14 16 l30 -34"
            stroke="var(--profile-primary)"
            strokeWidth="9"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      ) : null}

      {tipo === "conteudo" || tipo === "favorito" ? (
        <g>
          <rect x="40" y="34" width="240" height="132" rx="14" fill="var(--profile-surface)" opacity="0.9" />
          <rect x="40" y="34" width="240" height="132" rx="14" fill="none" stroke="var(--profile-primary)" strokeWidth="3" opacity="0.5" />
          {tipo === "conteudo" ? (
            <g transform="translate(160 100)">
              <circle r="30" fill="var(--profile-primary)" />
              <path d="M-9 -14 L 16 0 L -9 14 Z" fill="var(--profile-surface)" />
            </g>
          ) : (
            <path
              d="M160 62 l18 38 l42 6 l-30 29 l7 41 l-37 -20 l-37 20 l7 -41 l-30 -29 l42 -6 Z"
              fill="var(--profile-primary)"
              opacity="0.85"
            />
          )}
        </g>
      ) : null}

      {tipo === "perfil" ? (
        <g>
          {Array.from({ length: 5 }).map((_, i) => (
            <circle
              key={i}
              cx={60 + r(i) * 200}
              cy={40 + r(i + 5) * 120}
              r={18 + r(i + 10) * 40}
              fill="var(--profile-primary)"
              opacity={0.12 + r(i + 15) * 0.25}
            />
          ))}
          <circle cx="160" cy="100" r="42" fill="var(--profile-surface)" opacity="0.85" />
          <circle cx="160" cy="100" r="42" fill="none" stroke="var(--profile-primary)" strokeWidth="4" />
        </g>
      ) : null}

      {tipo === "alternativa" ? (
        <g>
          <path d="M30 100 H 150" stroke="var(--profile-primary)" strokeWidth="9" strokeLinecap="round" />
          <path d="M150 100 C 200 100, 200 50, 292 50" stroke="var(--profile-primary)" strokeWidth="9" fill="none" strokeLinecap="round" />
          <path d="M150 100 C 200 100, 200 152, 292 152" stroke="var(--profile-primary)" strokeWidth="9" fill="none" strokeLinecap="round" strokeDasharray="12 12" opacity="0.6" />
          <circle cx="150" cy="100" r="14" fill="var(--profile-surface)" stroke="var(--profile-primary)" strokeWidth="5" />
        </g>
      ) : null}

      {tipo === "registro" ? (
        <g>
          <rect x="56" y="30" width="208" height="140" rx="16" fill="var(--profile-surface)" opacity="0.92" />
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x="84"
              y={60 + i * 26}
              width={140 - i * 22}
              height="10"
              rx="5"
              fill="var(--profile-primary)"
              opacity={0.55 - i * 0.1}
            />
          ))}
        </g>
      ) : null}
    </svg>
  );
}

/** MapaMiniatura — prévia gráfica de um ponto, sem carregar serviço externo. */
export function MapaMiniatura({
  latitude,
  longitude,
  descricao,
  className,
}: {
  latitude: number;
  longitude: number;
  descricao: string;
  className?: string;
}) {
  const s = useMemo(() => semente(`${latitude.toFixed(3)}:${longitude.toFixed(3)}`), [latitude, longitude]); // prettier-ignore
  const r = (i: number) => aleatorio(s, i);
  return (
    <svg
      viewBox="0 0 320 200"
      role="img"
      aria-label={descricao}
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full", className)}
    >
      <rect width="320" height="200" fill="var(--profile-secondary)" />
      {Array.from({ length: 5 }).map((_, i) => (
        <rect
          key={`h${i}`}
          x="0"
          y={r(i) * 200}
          width="320"
          height={5 + r(i + 3) * 5}
          fill="var(--profile-surface)"
          opacity="0.85"
        />
      ))}
      {Array.from({ length: 4 }).map((_, i) => (
        <rect
          key={`v${i}`}
          x={r(i + 10) * 320}
          y="0"
          width={5 + r(i + 13) * 5}
          height="200"
          fill="var(--profile-surface)"
          opacity="0.85"
        />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <rect
          key={`q${i}`}
          x={r(i + 20) * 280}
          y={r(i + 30) * 160}
          width={22 + r(i + 40) * 30}
          height={18 + r(i + 50) * 26}
          rx="4"
          fill="var(--profile-accent)"
          opacity="0.4"
        />
      ))}
      <g transform="translate(160 96)">
        <ellipse cy="22" rx="12" ry="4" fill="var(--profile-text)" opacity="0.2" />
        <path
          d="M0 -18 C 11 -18 19 -10 19 0 C 19 11 0 22 0 22 C 0 22 -19 11 -19 0 C -19 -10 -11 -18 0 -18 Z"
          fill="var(--profile-primary)"
        />
        <circle cy="-2" r="6" fill="var(--profile-surface)" />
      </g>
    </svg>
  );
}

/**
 * CartaoVisual — a estrutura obrigatória: área visual dominante (60% a 75%,
 * definida pelo modo em uso), título curto, uma linha de apoio e no máximo
 * duas ações.
 */
export function CartaoVisual({
  visual,
  titulo,
  apoio,
  etiqueta,
  detalhes,
  acoes,
  className,
  compacto = false,
}: {
  visual: ReactNode;
  titulo: string;
  apoio?: string;
  etiqueta?: string;
  /** Só aparece após expansão: nunca há explicação longa visível. */
  detalhes?: ReactNode;
  acoes?: ReactNode;
  className?: string;
  compacto?: boolean;
}) {
  const { modo } = useModo();
  const altura = compacto ? 96 : Math.round(200 * modo.proporcaoDaMidia + 40);

  return (
    <article
      className={cn(
        "overflow-hidden border bg-[var(--profile-card)]",
        "border-[var(--profile-border)] shadow-suave",
        className,
      )}
      style={{ borderRadius: "var(--profile-radius)" }}
    >
      <div className="relative w-full overflow-hidden" style={{ height: altura }}>
        {visual}
        {etiqueta ? (
          <span className="absolute left-3 top-3 rounded-full bg-[var(--profile-surface)]/90 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-[var(--profile-primary)]">
            {etiqueta}
          </span>
        ) : null}
      </div>
      <div style={{ padding: "var(--profile-spacing)" }}>
        <h3 className="viva-subtitulo leading-tight text-[var(--profile-text)]">{titulo}</h3>
        {apoio ? (
          <p className="mt-1 line-clamp-1 viva-legenda text-[var(--profile-muted)]">{apoio}</p>
        ) : null}
        {detalhes}
        {acoes ? <div className="mt-3 flex flex-wrap items-center gap-2">{acoes}</div> : null}
      </div>
    </article>
  );
}

/** Botão de ação dentro de um card visual: sempre com área de toque ampla. */
export function AcaoDoCartao({
  children,
  onClick,
  tipo = "secundaria",
  icone: Icone,
  ...resto
}: {
  children: ReactNode;
  onClick?: () => void;
  tipo?: "principal" | "secundaria";
  icone?: React.ComponentType<{ className?: string }>;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "onClick" | "type">) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "viva-tap inline-flex min-h-11 items-center gap-2 rounded-full px-5 viva-texto-botao font-semibold",
        tipo === "principal"
          ? "bg-[var(--profile-primary)] text-[var(--profile-surface)]"
          : "border border-[var(--profile-border)] text-[var(--profile-text)]",
      )}
      {...resto}
    >
      {Icone ? <Icone className="h-4 w-4" aria-hidden /> : null}
      {children}
    </button>
  );
}
