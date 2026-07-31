import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { useAgente } from "@/lib/viva-agente";
import type { TamanhoDoAssistente } from "@/lib/assistant/animacoes";
import { LivingAssistantAnimation } from "./living-animation";

/**
 * FormaViva — o corpo do assistente.
 *
 * Não é rosto, não é robô, não é mascote: é a mesma forma fluida em todos os
 * estados. A escolha entre animação e imagem estática é feita pelo
 * AssistantAnimationManager, nunca aqui (documentos 04, 13, 14 e 19).
 */
export function FormaViva({
  tamanho = "medium",
  className,
  rotuloVisivel = false,
}: {
  tamanho?: TamanhoDoAssistente;
  className?: string;
  rotuloVisivel?: boolean;
}) {
  const { estadoTecnicoAtual } = useAgente();

  return (
    <LivingAssistantAnimation
      estado={estadoTecnicoAtual}
      tamanho={tamanho}
      className={className}
      rotuloVisivel={rotuloVisivel}
    />
  );
}

/**
 * OndasDaFala — barras que acompanham o momento da escuta.
 * Quando não há escuta ativa, não existe nada na tela: nenhum enfeite.
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
    <p className={cn("mt-3 flex items-center gap-3")} role="status">
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
