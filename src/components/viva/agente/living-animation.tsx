import { useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import * as LottieModulo from "lottie-react";
import type { LottieComponentProps, LottieRefCurrentProps } from "lottie-react";

// A biblioteca é publicada em CommonJS: normalizamos o default para que o
// componente funcione igual no servidor e no navegador.
const Lottie = ((LottieModulo as unknown as { default?: unknown }).default ??
  LottieModulo) as ComponentType<LottieComponentProps>;

import { cn } from "@/lib/utils";
import {
  carregarAnimacao,
  deveUsarEstatico,
  tamanhoEmPixels,
  urlEstatica,
  type TamanhoDoAssistente,
} from "@/lib/assistant/animacoes";
import { descricaoDoEstado, estadoEmLoop, type EstadoDoAssistente } from "@/lib/assistant/estados";

/**
 * LivingAssistantAnimation — o corpo visual do assistente.
 *
 * Não é rosto, não é robô, não é mascote. É a mesma forma fluida em todos os
 * estados, animada só quando isso ajuda a compreender o que está acontecendo.
 * Sempre existe uma alternativa estática e uma descrição em texto
 * (documentos 04, 13, 14 e 19).
 */
export function LivingAssistantAnimation({
  estado,
  tamanho = "medium",
  className,
  rotuloVisivel = false,
}: {
  estado: EstadoDoAssistente;
  tamanho?: TamanhoDoAssistente;
  className?: string;
  rotuloVisivel?: boolean;
}) {
  const [animacao, setAnimacao] = useState<unknown | null>(null);
  const [falhou, setFalhou] = useState(false);
  const [movimentoReduzido, setMovimentoReduzido] = useState(false);
  const [baixaEstimulacao, setBaixaEstimulacao] = useState(false);
  const referencia = useRef<LottieRefCurrentProps | null>(null);

  // Preferências observadas do documento raiz — nunca gravadas aqui.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const consulta = window.matchMedia("(prefers-reduced-motion: reduce)");
    const raiz = document.documentElement;
    const sincronizar = () => {
      setMovimentoReduzido(consulta.matches || raiz.classList.contains("viva-sem-movimento"));
      setBaixaEstimulacao(raiz.classList.contains("viva-calmo"));
    };
    sincronizar();
    consulta.addEventListener("change", sincronizar);
    const observador = new MutationObserver(sincronizar);
    observador.observe(raiz, { attributes: true, attributeFilter: ["class"] });
    return () => {
      consulta.removeEventListener("change", sincronizar);
      observador.disconnect();
    };
  }, []);

  const estatico = useMemo(
    () =>
      falhou ||
      deveUsarEstatico({
        estado,
        movimentoReduzido,
        baixaEstimulacao,
        lottieHabilitado: true,
      }),
    [estado, falhou, movimentoReduzido, baixaEstimulacao],
  );

  useEffect(() => {
    if (estatico) {
      setAnimacao(null);
      return;
    }
    let ativo = true;
    carregarAnimacao(estado).then((dados) => {
      if (!ativo) return;
      if (!dados) setFalhou(true);
      else setAnimacao(dados);
    });
    return () => {
      ativo = false;
    };
  }, [estado, estatico]);

  const pixels = tamanhoEmPixels[tamanho];
  const descricao = descricaoDoEstado[estado];
  const imagem = urlEstatica(estado);

  return (
    <span className={cn("inline-flex flex-col items-center gap-2", className)}>
      <span
        className="relative inline-grid place-items-center"
        style={{ width: pixels, height: pixels }}
        role="img"
        aria-label={`Assistente VIVA: ${descricao.leitor}`}
      >
        {!estatico && animacao ? (
          <Lottie
            lottieRef={referencia}
            animationData={animacao}
            loop={estadoEmLoop(estado)}
            autoplay
            aria-hidden
            className="h-full w-full"
            onError={() => setFalhou(true)}
          />
        ) : imagem ? (
          <img src={imagem} alt="" aria-hidden className="h-full w-full" />
        ) : (
          <span
            aria-hidden
            className="h-full w-full rounded-full border-8 border-action-primary/60"
          />
        )}
      </span>
      {rotuloVisivel ? (
        <span className="viva-apoio text-text-secondary" aria-hidden>
          {descricao.rotulo}
        </span>
      ) : null}
      <span className="sr-only" role="status">
        {descricao.leitor}
      </span>
    </span>
  );
}
