import { Link } from "@tanstack/react-router";
import { MessageCircle, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { useAgente } from "@/lib/viva-agente";
import { usePercursos } from "@/lib/viva-percursos";
import { FormaViva } from "./avatar";

/**
 * AssistenteFlutuante — o único Assistente da plataforma (documentos 19 e 26).
 *
 * Fica disponível em qualquer tela, é opcional, minimizável e fechável. Suas
 * respostas são demonstrativas e locais: ele organiza informações e mostra
 * caminhos, sem avaliar emoções, sem diagnosticar e sem prescrever.
 */
export function AssistenteFlutuante() {
  const { descricao, presenca, definirPresenca } = useAgente();
  const { emAndamento } = usePercursos();
  const [aberto, setAberto] = useState(false);
  const painelId = useId();
  const botao = useRef<HTMLButtonElement>(null);
  const painel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (aberto) painel.current?.focus();
  }, [aberto]);

  function fechar() {
    setAberto(false);
    botao.current?.focus();
  }

  if (presenca === "desativado") {
    return (
      <div className="fixed bottom-[5.25rem] right-4 z-40 md:bottom-6">
        <button
          type="button"
          onClick={() => definirPresenca("ativo")}
          className="viva-tap min-h-11 rounded-full border border-border-default bg-surface-default px-4 viva-legenda font-medium text-text-primary shadow-suave"
        >
          Ligar o assistente
        </button>
      </div>
    );
  }

  const retomar = emAndamento[0];

  return (
    <div className="fixed bottom-[5.25rem] right-4 z-40 flex flex-col items-end gap-3 md:bottom-6">
      {aberto ? (
        <div
          ref={painel}
          tabIndex={-1}
          role="dialog"
          aria-modal="false"
          id={painelId}
          aria-label="Assistente do VIVA"
          onKeyDown={(e) => {
            if (e.key === "Escape") fechar();
          }}
          className="w-[min(20rem,calc(100vw-2rem))] rounded-3xl border border-border-default bg-surface-default p-5 shadow-suave"
        >
          <div className="flex items-start gap-3">
            <FormaViva tamanho="small" className="shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="viva-legenda text-text-secondary" aria-live="polite">
                {descricao.rotulo}
              </p>
              <p className="mt-1 viva-apoio text-text-primary">
                Posso organizar informações, mostrar o próximo passo e encontrar conteúdos. Você
                decide o que fazer.
              </p>
            </div>
            <button
              type="button"
              onClick={fechar}
              aria-label="Fechar assistente"
              className="viva-tap grid h-11 w-11 shrink-0 place-items-center rounded-full text-text-secondary"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <ul className="mt-4 space-y-2">
            {retomar ? (
              <li>
                <Link
                  to="/percurso/$id"
                  params={{ id: retomar.id }}
                  search={{ fase: "realizar" }}
                  onClick={fechar}
                  className="viva-tap flex min-h-11 items-center rounded-2xl border border-border-default px-4 viva-legenda font-medium text-text-primary"
                >
                  Continuar de onde você parou
                </Link>
              </li>
            ) : null}
            <li>
              <Link
                to="/"
                onClick={fechar}
                className="viva-tap flex min-h-11 items-center rounded-2xl border border-border-default px-4 viva-legenda font-medium text-text-primary"
              >
                Começar uma jornada
              </Link>
            </li>
            <li>
              <Link
                to="/biblioteca"
                onClick={fechar}
                className="viva-tap flex min-h-11 items-center rounded-2xl border border-border-default px-4 viva-legenda font-medium text-text-primary"
              >
                Ver conteúdos que podem ajudar
              </Link>
            </li>
            <li>
              <Link
                to="/demonstracao"
                onClick={fechar}
                className="viva-tap flex min-h-11 items-center rounded-2xl border border-border-default px-4 viva-legenda font-medium text-text-primary"
              >
                Ver a demonstração guiada
              </Link>
            </li>
          </ul>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                definirPresenca(presenca === "silencioso" ? "ativo" : "silencioso");
              }}
              aria-pressed={presenca === "silencioso"}
              className="viva-tap min-h-11 rounded-full border border-border-default px-4 viva-legenda font-medium text-text-secondary"
            >
              {presenca === "silencioso" ? "Silencioso: ligado" : "Silenciar"}
            </button>
            <button
              type="button"
              onClick={() => {
                definirPresenca("desativado");
                setAberto(false);
              }}
              className="viva-tap min-h-11 rounded-full border border-border-default px-4 viva-legenda font-medium text-text-secondary"
            >
              Desligar
            </button>
          </div>

          <p className="mt-3 viva-legenda text-text-secondary">
            O assistente é demonstrativo e não substitui acompanhamento profissional.
          </p>
        </div>
      ) : null}

      <button
        ref={botao}
        type="button"
        onClick={() => setAberto((a) => !a)}
        aria-expanded={aberto}
        aria-controls={aberto ? painelId : undefined}
        className="viva-tap grid h-14 w-14 place-items-center rounded-full border border-border-default bg-surface-default text-text-primary shadow-suave"
      >
        <MessageCircle className="h-6 w-6" aria-hidden />
        <span className="sr-only">Abrir o assistente</span>
      </button>
    </div>
  );
}
