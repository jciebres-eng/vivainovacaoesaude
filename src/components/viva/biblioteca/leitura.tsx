import { Info, Lightbulb, Quote, Sparkles } from "lucide-react";

import { Botao, Card } from "@/components/ds";
import { cn } from "@/lib/utils";
import type {
  BlocoDeConteudo,
  ConteudoDaBiblioteca,
} from "@/lib/viva-biblioteca-dados";

/** Leitura em blocos curtos, com destaques discretos (documentos 04 e 14). */
export function LeituraDoConteudo({
  conteudo,
  blocosOcultos = [],
  blocosDestacados = [],
}: {
  conteudo: ConteudoDaBiblioteca;
  blocosOcultos?: number[];
  blocosDestacados?: number[];
}) {
  return (
    <div className="space-y-5">
      {conteudo.blocos.map((bloco, i) =>
        blocosOcultos.includes(i) ? null : (
          <Bloco
            key={`${bloco.tipo}-${i}`}
            bloco={bloco}
            destacado={blocosDestacados.includes(i)}
          />
        ),
      )}
    </div>
  );
}

function Bloco({
  bloco,
  destacado,
}: {
  bloco: BlocoDeConteudo;
  destacado: boolean;
}) {
  const moldura = destacado
    ? "rounded-2xl border-l-4 border-action-primary bg-surface-muted p-4"
    : undefined;

  if (bloco.tipo === "subtitulo") {
    return (
      <h3 className={cn("viva-subtitulo text-text-primary", moldura)}>
        {bloco.texto}
      </h3>
    );
  }

  if (bloco.tipo === "paragrafo") {
    return (
      <p className={cn("max-w-[68ch] viva-texto text-text-primary", moldura)}>
        {bloco.texto}
      </p>
    );
  }

  if (bloco.tipo === "lista") {
    return (
      <ul className={cn("max-w-[68ch] space-y-2", moldura)}>
        {bloco.itens.map((item) => (
          <li key={item} className="flex gap-3 viva-texto text-text-primary">
            <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-action-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (bloco.tipo === "passos") {
    return (
      <ol className={cn("max-w-[68ch] space-y-3", moldura)}>
        {bloco.itens.map((item, i) => (
          <li key={item} className="flex gap-3 viva-texto text-text-primary">
            <span
              aria-hidden
              className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-surface-muted viva-legenda font-semibold text-text-secondary"
            >
              {i + 1}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    );
  }

  if (bloco.tipo === "exemplo") {
    return (
      <figure className="rounded-2xl border border-border-default bg-surface-muted p-4">
        <figcaption className="flex items-center gap-2 viva-legenda text-text-secondary">
          <Quote className="h-4 w-4" aria-hidden />
          {bloco.titulo ?? "Exemplo"}
        </figcaption>
        <p className="mt-2 max-w-[62ch] viva-texto text-text-primary">
          {bloco.texto}
        </p>
      </figure>
    );
  }

  if (bloco.tipo === "atencao") {
    return (
      <aside className="rounded-2xl bg-feedback-attention p-4 text-feedback-attention-foreground">
        <p className="flex items-start gap-2 viva-apoio">
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <span className="max-w-[62ch]">{bloco.texto}</span>
        </p>
      </aside>
    );
  }

  return (
    <p className="max-w-[62ch] viva-legenda text-text-secondary">
      {bloco.texto}
    </p>
  );
}

/** "Estratégias que podem ajudar" ao final de cada conteúdo. */
export function EstrategiasDoConteudo({
  conteudo,
  adotadas,
  onAdotar,
}: {
  conteudo: ConteudoDaBiblioteca;
  adotadas: string[];
  onAdotar: (id: string, nome: string, comoAjuda: string) => void;
}) {
  return (
    <Card
      variante="habilidade"
      titulo="Estratégias que podem ajudar"
      descricao="São possibilidades, não recomendações. Você escolhe o que faz sentido."
      icone={Lightbulb}
    >
      <ul className="space-y-4">
        {conteudo.estrategias.map((e) => {
          const jaAdotada = adotadas.includes(e.id);
          return (
            <li
              key={e.id}
              className="rounded-2xl border border-border-default p-4"
            >
              <p className="viva-rotulo text-text-primary">{e.nome}</p>
              <p className="mt-1 max-w-[62ch] viva-apoio text-text-secondary">
                {e.comoAjuda}
              </p>
              <div className="mt-3">
                <Botao
                  variante={jaAdotada ? "terciario" : "secundario"}
                  tamanho="compacto"
                  disabled={jaAdotada}
                  onClick={() => onAdotar(e.id, e.nome, e.comoAjuda)}
                >
                  {jaAdotada
                    ? "Já está nas suas estratégias"
                    : "Adicionar às minhas estratégias"}
                </Botao>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

/** "Talvez seja útil para você" — regras simples, no máximo três sugestões. */
export function TalvezSejaUtil({
  sugestoes,
  motivo,
}: {
  sugestoes: ConteudoDaBiblioteca[];
  motivo?: string;
}) {
  if (sugestoes.length === 0) return null;
  return (
    <Card
      variante="informativo"
      titulo="Talvez seja útil para você"
      descricao={motivo}
      icone={Sparkles}
    >
      <ul className="space-y-3">
        {sugestoes.slice(0, 3).map((c) => (
          <li key={c.id}>
            <Link
              to="/biblioteca/$conteudoId"
              params={{ conteudoId: c.id }}
              className="viva-tap block rounded-2xl border border-border-default p-4 hover:bg-surface-muted"
            >
              <span className="viva-rotulo text-text-primary">{c.titulo}</span>
              <span className="mt-1 block viva-legenda text-text-secondary">
                {c.resumo}
              </span>
            </Link>
          </li>

        ))}
      </ul>
      <p className="mt-4 viva-legenda text-text-secondary">
        Estas sugestões são apenas possibilidades.
      </p>
    </Card>
  );
}
