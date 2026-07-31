/**
 * MatchCard — o card-base de todo o match.
 *
 * Área visual dominante, título curto, no máximo uma linha de apoio e uma
 * ação de detalhes. As variantes mudam a etiqueta e a cena, nunca a
 * estrutura (documentos 14, 20 e 23).
 */
import { Clock, Layers, Signal } from "lucide-react";

import { Cena } from "@/components/viva/visual/visual-base";
import { cn } from "@/lib/utils";
import { useModo } from "@/lib/viva-modos";
import type { CategoriaDeMatch, IntensidadeSensorial, ItemDeMatch } from "@/lib/match/tipos";
import { rotulosDeMatch } from "@/lib/match/tipos";

const rotuloDeIntensidade: Record<IntensidadeSensorial, string> = {
  baixa: "Estímulos baixos",
  media: "Estímulos moderados",
  alta: "Estímulos intensos",
};

const rotuloDeFormato: Record<string, string> = {
  leitura: "Leitura",
  audio: "Áudio",
  video: "Vídeo",
  pratica: "Prática",
  checklist: "Lista",
  conversa: "Conversa",
};

/** Descrição acessível completa do card, usada por leitores de tela. */
export function descricaoAcessivel(item: ItemDeMatch) {
  const partes = [rotulosDeMatch[item.categoria].titulo, item.titulo];
  if (item.descricao) partes.push(item.descricao);
  if (item.duracao) partes.push(item.duracao);
  if (item.intensidade) partes.push(rotuloDeIntensidade[item.intensidade]);
  if (item.formato) partes.push(rotuloDeFormato[item.formato] ?? item.formato);
  return partes.join(". ");
}

export function MatchCard({
  item,
  variante,
  compacto = false,
  className,
}: {
  item: ItemDeMatch;
  /** Redundante com item.categoria: existe para uso direto do componente. */
  variante?: CategoriaDeMatch;
  compacto?: boolean;
  className?: string;
}) {
  const { modo } = useModo();
  const categoria = variante ?? item.categoria;
  const alturaVisual = compacto ? 88 : Math.round(220 * modo.proporcaoDaMidia + 48);

  return (
    <article
      className={cn(
        "flex w-full flex-col overflow-hidden border bg-[var(--profile-card)]",
        "border-[var(--profile-border)] shadow-suave",
        className,
      )}
      style={{ borderRadius: "var(--profile-radius)" }}
    >
      <div className="relative shrink-0" style={{ height: alturaVisual }}>
        <Cena
          tipo={item.cena}
          chave={item.id}
          descricao={`Imagem representando ${item.titulo}.`}
          className="h-full w-full"
        />
        {item.etiqueta ? (
          <span className="absolute left-3 top-3 rounded-full bg-[var(--profile-surface)]/90 px-3 py-1 viva-legenda font-semibold text-[var(--profile-text)]">
            {item.etiqueta}
          </span>
        ) : null}
      </div>

      <div className="min-w-0 space-y-1 p-4">
        <h3 className="viva-subtitulo text-[var(--profile-text)]">{item.titulo}</h3>
        {item.descricao && modo.densidade !== "minima" ? (
          <p className="line-clamp-2 viva-legenda text-[var(--profile-muted)]">{item.descricao}</p>
        ) : null}

        {item.duracao || item.intensidade || item.formato ? (
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1">
            {item.duracao ? (
              <li className="flex items-center gap-1 viva-legenda text-[var(--profile-muted)]">
                <Clock className="h-3.5 w-3.5" aria-hidden />
                {item.duracao}
              </li>
            ) : null}
            {item.intensidade ? (
              <li className="flex items-center gap-1 viva-legenda text-[var(--profile-muted)]">
                <Signal className="h-3.5 w-3.5" aria-hidden />
                {rotuloDeIntensidade[item.intensidade]}
              </li>
            ) : null}
            {item.formato ? (
              <li className="flex items-center gap-1 viva-legenda text-[var(--profile-muted)]">
                <Layers className="h-3.5 w-3.5" aria-hidden />
                {rotuloDeFormato[item.formato] ?? item.formato}
              </li>
            ) : null}
          </ul>
        ) : null}

        <p className="sr-only">{rotulosDeMatch[categoria].titulo}</p>
      </div>
    </article>
  );
}
