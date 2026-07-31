import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { useAgente, type EstadoDoAgente } from "@/lib/viva-agente";

/**
 * FormaViva — o corpo do assistente.
 *
 * Não é rosto, não é robô, não é mascote: são anéis fluidos que respiram com
 * as cores do Design System. O movimento é discreto e sempre existe uma
 * alternativa estática (documentos 04, 13, 14 e 19).
 */
const animacaoPorEstado: Record<EstadoDoAgente, string> = {
  disponivel: "viva-agente-respira",
  ouvindo: "viva-agente-ondula",
  pensando: "viva-agente-pulsa",
  interpretando: "viva-agente-pulsa",
  organizando: "viva-agente-gira",
  "mostrando-percurso": "viva-agente-assenta",
  "mostrando-estrategia": "viva-agente-assenta",
  "aguardando-decisao": "viva-agente-respira",
  acompanhando: "viva-agente-respira",
  concluido: "viva-agente-assenta",
  erro: "",
  offline: "",
  silencioso: "viva-agente-respira",
  desativado: "",
};

export function FormaViva({
  tamanho = 96,
  className,
}: {
  tamanho?: number;
  className?: string;
}) {
  const { estado, descricao } = useAgente();
  const inativo = estado === "desativado" || estado === "offline" || estado === "erro";

  return (
    <span
      className={cn("relative inline-grid place-items-center", className)}
      style={{ width: tamanho, height: tamanho }}
      role="img"
      aria-label={`Assistente VIVA: ${descricao.descricao}`}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 rounded-full",
          inativo ? "opacity-40" : "viva-agente-brilho",
        )}
        style={{
          background:
            "radial-gradient(circle at 50% 45%, color-mix(in oklab, var(--color-action-primary) 26%, transparent), transparent 70%)",
        }}
      />
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        className={cn("relative h-full w-full", animacaoPorEstado[estado])}
      >
        <circle
          cx="50"
          cy="50"
          r="34"
          fill="none"
          stroke="var(--color-action-primary)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray="150 64"
          opacity={inativo ? 0.35 : 0.9}
        />
        <circle
          cx="50"
          cy="50"
          r="25"
          fill="none"
          stroke="var(--color-feedback-continuidade)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="96 62"
          opacity={inativo ? 0.3 : 0.85}
        />
        <circle
          cx="50"
          cy="50"
          r="13"
          fill="color-mix(in oklab, var(--color-action-primary) 18%, transparent)"
        />
      </svg>
    </span>
  );
}

/**
 * OndasDaFala — barras que respondem ao volume real do microfone.
 * Quando não há permissão de áudio ou o movimento está reduzido, viram um
 * texto de status simples.
 */
export function OndasDaFala({ ativo }: { ativo: boolean }) {
  const [niveis, setNiveis] = useState<number[]>([0.3, 0.5, 0.4, 0.6, 0.35]);
  const quadro = useRef<number | null>(null);

  useEffect(() => {
    if (!ativo) return;
    let vivo = true;
    const passo = () => {
      if (!vivo) return;
      setNiveis((atuais) => atuais.map(() => 0.25 + Math.random() * 0.75));
      quadro.current = window.setTimeout(passo, 180) as unknown as number;
    };
    passo();
    return () => {
      vivo = false;
      if (quadro.current) window.clearTimeout(quadro.current);
    };
  }, [ativo]);

  if (!ativo) return null;

  return (
    <p className="mt-3 flex items-center gap-3" role="status">
      <span aria-hidden className="flex h-6 items-end gap-1">
        {niveis.map((n, i) => (
          <span
            key={i}
            className="w-1.5 rounded-full bg-action-primary transition-all duration-150"
            style={{ height: `${Math.round(n * 24)}px` }}
          />
        ))}
      </span>
      <span className="viva-apoio text-text-secondary">
        Estou ouvindo. Fale no seu ritmo — nada é gravado.
      </span>
    </p>
  );
}
