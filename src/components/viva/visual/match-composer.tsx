/**
 * JourneyMatchComposer — a montagem progressiva do percurso.
 *
 * O percurso não é entregue pronto: ele se forma a cada escolha, uma pergunta
 * por vez, e vai aparecendo como uma trilha visual. Combinar aqui significa
 * compatibilidade entre intenção, modo e preferências — nunca afeto
 * (documentos 07, 10, 17, 19).
 */
import { CheckCircle2, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";

import { VisualJourneyCard } from "@/components/viva/visual/cards";
import { JourneySwipeDeck } from "@/components/viva/visual/swipe-deck";
import { Cena } from "@/components/viva/visual/visual-base";
import { useModo } from "@/lib/viva-modos";
import {
  opcoesDaDecisao,
  rotulosDaDecisao,
  type CategoriaDeDecisao,
  type Peca,
} from "@/lib/viva-montagem";

export function JourneyMatchComposer({
  intencao,
  onConcluir,
}: {
  intencao: string;
  onConcluir?: (pecas: Peca[]) => void;
}) {
  const { modo } = useModo();
  const ordem = modo.ordemDasSugestoes as CategoriaDeDecisao[];
  const [etapa, setEtapa] = useState(0);
  const [aceitas, setAceitas] = useState<Peca[]>([]);
  const [descartadas, setDescartadas] = useState<string[]>([]);

  const categoria = ordem[etapa];
  const opcoes = useMemo(
    () => (categoria ? opcoesDaDecisao(categoria, descartadas) : []),
    [categoria, descartadas],
  );

  const avancar = () =>
    setEtapa((e) => {
      const proxima = e + 1;
      if (proxima >= ordem.length) onConcluir?.(aceitas);
      return proxima;
    });

  const pronto = etapa >= ordem.length;

  return (
    <section aria-label="Montagem do seu percurso" className="space-y-5">
      <header>
        <p className="viva-legenda text-[var(--profile-muted)]">Seu percurso está se formando</p>
        <h2 className="viva-titulo text-[var(--profile-text)]">{intencao}</h2>
      </header>

      <TrilhaDoPercurso pecas={aceitas} totalDeEtapas={ordem.length} etapaAtual={etapa} />

      {pronto ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[var(--profile-primary)]">
            <CheckCircle2 className="h-5 w-5" aria-hidden />
            <p className="viva-subtitulo">Percurso montado do seu jeito</p>
          </div>
          <p className="viva-legenda text-[var(--profile-muted)]">
            Você pode mudar qualquer parte agora ou depois. Nada fica travado.
          </p>
          <button
            type="button"
            onClick={() => {
              setEtapa(0);
              setAceitas([]);
              setDescartadas([]);
            }}
            className="viva-tap inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--profile-border)] px-5 viva-texto-botao text-[var(--profile-text)]"
          >
            <RotateCcw className="h-4 w-4" aria-hidden />
            Montar de outra forma
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="viva-subtitulo text-[var(--profile-text)]">
            {rotulosDaDecisao[categoria].pergunta}
          </p>
          <JourneySwipeDeck
            itens={opcoes.map((peca) => ({
              id: peca.id,
              rotulo: peca.titulo,
              conteudo: (
                <VisualJourneyCard peca={peca} etiqueta={rotulosDaDecisao[categoria].titulo} />
              ),
            }))}
            onAceitar={(id) => {
              const peca = opcoes.find((p) => p.id === id);
              if (peca) setAceitas((atuais) => [...atuais, peca]);
              avancar();
            }}
            onDescartar={(id) => setDescartadas((atuais) => [...atuais, id])}
            onFim={avancar}
            vazio={
              <div className="space-y-3">
                <p className="viva-legenda text-[var(--profile-muted)]">
                  Sem mais opções aqui. Podemos seguir.
                </p>
                <button
                  type="button"
                  onClick={avancar}
                  className="viva-tap inline-flex min-h-11 items-center rounded-full bg-[var(--profile-primary)] px-5 viva-texto-botao text-[var(--profile-surface)]"
                >
                  Continuar
                </button>
              </div>
            }
          />
          <button
            type="button"
            onClick={avancar}
            className="viva-tap min-h-11 viva-legenda text-[var(--profile-primary)] underline"
          >
            Pular esta escolha
          </button>
        </div>
      )}
    </section>
  );
}

/**
 * TrilhaDoPercurso — a prévia do que já foi combinado. O formato acompanha o
 * modo em uso: trilha, resumo, etapa única ou galeria.
 */
export function TrilhaDoPercurso({
  pecas,
  totalDeEtapas,
  etapaAtual,
}: {
  pecas: Peca[];
  totalDeEtapas: number;
  etapaAtual: number;
}) {
  const { modo } = useModo();

  if (!pecas.length) {
    return (
      <p className="viva-legenda text-[var(--profile-muted)]">
        Cada escolha sua entra aqui, na ordem em que você decidir.
      </p>
    );
  }

  if (modo.formatoDoPercurso === "resumo") {
    return (
      <ol className="space-y-1" aria-label="Percurso montado até agora">
        {pecas.map((peca, i) => (
          <li key={peca.id} className="flex items-baseline gap-2 viva-legenda text-[var(--profile-text)]">
            <span className="font-semibold text-[var(--profile-primary)]">{i + 1}.</span>
            <span>{peca.titulo}</span>
            {peca.numeros ? (
              <span className="text-[var(--profile-muted)]">· {peca.numeros}</span>
            ) : null}
          </li>
        ))}
      </ol>
    );
  }

  if (modo.formatoDoPercurso === "etapa-unica") {
    const ultima = pecas[pecas.length - 1];
    return (
      <div aria-label="Última escolha do percurso" className="viva-legenda text-[var(--profile-text)]">
        <p className="text-[var(--profile-muted)]">
          Escolha {pecas.length} de {totalDeEtapas}
        </p>
        <p className="viva-subtitulo">{ultima.titulo}</p>
      </div>
    );
  }

  if (modo.formatoDoPercurso === "galeria") {
    return (
      <ul
        aria-label="Percurso montado até agora"
        className="-mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-1"
      >
        {pecas.map((peca) => (
          <li key={peca.id} className="w-28 shrink-0 snap-start">
            <div
              className="h-20 overflow-hidden border border-[var(--profile-border)]"
              style={{ borderRadius: "var(--profile-radius)" }}
            >
              <Cena tipo={peca.cena} chave={peca.id} descricao={`Imagem de ${peca.titulo}.`} />
            </div>
            <p className="mt-1 line-clamp-2 viva-legenda text-[var(--profile-text)]">{peca.titulo}</p>
          </li>
        ))}
      </ul>
    );
  }

  // Trilha: a linha do percurso, sem números de desempenho.
  return (
    <ol aria-label="Percurso montado até agora" className="relative space-y-3 pl-6">
      <span
        aria-hidden
        className="absolute left-[9px] top-2 bottom-2 w-0.5 rounded-full bg-[var(--profile-secondary)]"
      />
      {pecas.map((peca, i) => (
        <li key={peca.id} className="relative">
          <span
            aria-hidden
            className="absolute -left-6 top-1 grid h-5 w-5 place-items-center rounded-full bg-[var(--profile-primary)] text-[0.65rem] font-bold text-[var(--profile-surface)]"
          >
            {i + 1}
          </span>
          <p className="viva-legenda font-semibold text-[var(--profile-text)]">{peca.titulo}</p>
          <p className="viva-legenda text-[var(--profile-muted)]">{peca.apoio}</p>
        </li>
      ))}
      {etapaAtual < totalDeEtapas ? (
        <li className="relative">
          <span
            aria-hidden
            className="absolute -left-6 top-1 h-5 w-5 rounded-full border-2 border-dashed border-[var(--profile-border)]"
          />
          <p className="viva-legenda text-[var(--profile-muted)]">Próxima escolha</p>
        </li>
      ) : null}
    </ol>
  );
}
