import { ArrowRight, Sparkles } from "lucide-react";

import { Botao, Card, Nota } from "@/components/ds";
import { situacoes, type SugestaoDeSituacao, type Situacao } from "@/lib/viva-situacoes";

/**
 * Resposta do copiloto: mostra a leitura feita, explica por que chegou nela e
 * devolve a decisão para a pessoa. Errar é previsto; corrigir é imediato
 * (documentos 03 e 15).
 */
export function LeituraDoAgente({
  intencao,
  sugestoes,
  onEscolher,
  onCorrigir,
}: {
  intencao: string;
  sugestoes: SugestaoDeSituacao[];
  onEscolher: (situacao: Situacao) => void;
  onCorrigir: () => void;
}) {
  const semLeitura = sugestoes.length === 0;
  const outras = situacoes.filter((s) => !sugestoes.some((x) => x.situacao.id === s.id));

  return (
    <div className="space-y-5">
      <Card
        variante="proximo-passo"
        titulo={semLeitura ? "Não tenho certeza do que você precisa" : "Entendi assim"}
        icone={Sparkles}
      >
        <p className="viva-texto text-text-primary">“{intencao}”</p>

        {semLeitura ? (
          <p className="mt-3 viva-apoio text-text-secondary">
            Não reconheci nenhuma situação a partir dessa frase. Você pode escolher abaixo — ou
            escrever de outro jeito.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {sugestoes.map(({ situacao, termos }) => (
              <li
                key={situacao.id}
                className="rounded-2xl border border-border-default bg-surface-default p-4"
              >
                <p className="viva-apoio font-semibold text-text-primary">{situacao.titulo}</p>
                <p className="mt-1 viva-legenda text-text-secondary">{situacao.resumo}</p>
                {termos.length > 0 ? (
                  <p className="mt-2 viva-legenda text-text-secondary">
                    Cheguei aqui por causa de: {termos.join(", ")}.
                  </p>
                ) : null}
                <div className="mt-3">
                  <Botao
                    variante="principal"
                    tamanho="compacto"
                    icone={ArrowRight}
                    iconePosicao="fim"
                    onClick={() => onEscolher(situacao)}
                  >
                    Montar este percurso
                  </Botao>
                </div>
              </li>
            ))}
          </ul>
        )}

        <Nota>
          Esta leitura é feita por regras simples neste aparelho, sem inteligência artificial
          externa. Ela pode estar errada — e você decide.
        </Nota>

        <div className="mt-4">
          <Botao variante="secundario" tamanho="compacto" onClick={onCorrigir}>
            Escrever de outro jeito
          </Botao>
        </div>
      </Card>

      <Card variante="informativo" titulo="Outras situações possíveis">
        <ul className="flex flex-wrap gap-2">
          {outras.map((s) => (
            <li key={s.id}>
              <Botao variante="secundario" tamanho="compacto" onClick={() => onEscolher(s)}>
                {s.titulo}
              </Botao>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
