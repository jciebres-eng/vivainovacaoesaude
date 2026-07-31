/**
 * Os oito decks do match compartilham a MESMA base técnica e visual
 * (SwipeMatchDeck + MatchCard). Aqui só muda o rótulo, a pergunta e a fonte
 * dos itens: nenhuma lógica é duplicada.
 */
import type { ReactNode } from "react";

import { SwipeMatchDeck } from "@/components/viva/match/swipe-match-deck";
import type { CategoriaDeMatch, ItemDeMatch } from "@/lib/match/tipos";
import { rotulosDeMatch } from "@/lib/match/tipos";

export type DeckProps = {
  itens: ItemDeMatch[];
  onAceitar: (item: ItemDeMatch) => void;
  onDescartar: (item: ItemDeMatch) => void;
  onDesfazer?: () => void;
  podeDesfazer?: boolean;
  onFim?: () => void;
  vazio?: ReactNode;
};

function criarDeck(categoria: CategoriaDeMatch) {
  function Deck(props: DeckProps) {
    const rotulos = rotulosDeMatch[categoria];
    return (
      <section aria-label={rotulos.titulo} className="space-y-3">
        <h2 className="viva-subtitulo text-[var(--profile-text)]">{rotulos.pergunta}</h2>
        <SwipeMatchDeck
          itens={props.itens.filter((i) => i.categoria === categoria)}
          onAceitar={props.onAceitar}
          onDescartar={props.onDescartar}
          onDesfazer={props.onDesfazer}
          podeDesfazer={props.podeDesfazer}
          onFim={props.onFim}
          vazio={props.vazio}
          rotuloAceitar={rotulos.aceitar}
          rotuloDescartar={rotulos.descartar}
        />
      </section>
    );
  }
  return Deck;
}

export const SituationMatchDeck = criarDeck("situation");
export const NeedMatchDeck = criarDeck("need");
export const BarrierMatchDeck = criarDeck("barrier");
export const StrategyMatchDeck = criarDeck("strategy");
export const InformationMatchDeck = criarDeck("information");
export const TrainingMatchDeck = criarDeck("training");
export const MonitoringPreferenceDeck = criarDeck("monitoring");
export const FeedbackFormatDeck = criarDeck("feedback");

export const deckPorCategoria: Record<CategoriaDeMatch, (props: DeckProps) => ReactNode> = {
  situation: SituationMatchDeck,
  need: NeedMatchDeck,
  barrier: BarrierMatchDeck,
  strategy: StrategyMatchDeck,
  information: InformationMatchDeck,
  training: TrainingMatchDeck,
  monitoring: MonitoringPreferenceDeck,
  feedback: FeedbackFormatDeck,
};
