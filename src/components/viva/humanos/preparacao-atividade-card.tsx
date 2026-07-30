import { useState } from "react";

import { Botao, Card, CampoTexto, Nota } from "@/components/ds";
import { atividadeDemo, estrategiasSugeridas } from "./dados-demo";
import { AcoesAutonomas, EscolhaAutonomaGroup } from "./escolha-autonoma";

/**
 * PreparacaoAtividadeCard — previsibilidade antes de qualquer ação (doc 04).
 *
 * Descreve a atividade, a duração aproximada, os materiais, o ambiente
 * sugerido e o que acontece depois. Nada começa sozinho: sem cronômetro
 * obrigatório, sem som, sem vídeo automático.
 */
export type Atividade = typeof atividadeDemo;

export function PreparacaoAtividadeCard({
  atividade = atividadeDemo,
  estrategias = estrategiasSugeridas,
  onComecar,
  onSalvarParaDepois,
  onVoltar,
  className,
}: {
  atividade?: Atividade;
  estrategias?: { id: string; rotulo: string }[];
  onComecar?: (escolhidas: string[]) => void;
  onSalvarParaDepois?: () => void;
  onVoltar?: () => void;
  className?: string;
}) {
  const [minhas, setMinhas] = useState<string[]>([]);
  const [outra, setOutra] = useState("");
  const [ajustando, setAjustando] = useState(false);

  const alternar = (id: string) =>
    setMinhas((atual) => (atual.includes(id) ? atual.filter((i) => i !== id) : [...atual, id]));

  const opcoes = [...estrategias, { id: "outra", rotulo: "Outra estratégia pessoal" }];

  return (
    <Card
      variante="informativo"
      titulo="Antes de começar"
      descricao="Saber o que vem pela frente costuma deixar o começo mais tranquilo."
      className={className}
    >
      <div className="space-y-6">
        <section>
          <h3 className="viva-rotulo text-text-primary">Sobre esta atividade</h3>
          <p className="mt-1 viva-apoio text-text-primary">{atividade.nome}</p>
          <p className="mt-1 viva-legenda text-text-secondary">{atividade.finalidade}</p>
          <p className="mt-2 viva-legenda text-text-secondary">
            {atividade.descricao} São {atividade.etapas} etapas curtas.
          </p>
        </section>

        <section>
          <h3 className="viva-rotulo text-text-primary">Duração prevista</h3>
          <p className="mt-1 viva-legenda text-text-secondary">{atividade.duracao}</p>
        </section>

        <div className="grid gap-6 sm:grid-cols-2">
          <section>
            <h3 className="viva-rotulo text-text-primary">Materiais</h3>
            <ul className="mt-1 space-y-1 viva-legenda text-text-secondary">
              {atividade.materiais.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="viva-rotulo text-text-primary">Ambiente sugerido</h3>
            <ul className="mt-1 space-y-1 viva-legenda text-text-secondary">
              {atividade.ambiente.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <p className="mt-2 viva-legenda text-text-secondary">São sugestões, não exigências.</p>
          </section>
        </div>

        {ajustando ? (
          <section className="space-y-4">
            <EscolhaAutonomaGroup
              titulo="Estratégias que podem ajudar durante a atividade"
              apoio="Escolha quantas quiser, ou nenhuma."
              opcoes={opcoes}
              valores={minhas}
              multipla
              onEscolher={alternar}
              nota="Estas estratégias ajudam algumas pessoas. Você pode experimentar e registrar como foi."
            />
            {minhas.includes("outra") ? (
              <CampoTexto
                rotulo="Outra estratégia sua"
                apoio="Com suas palavras."
                value={outra}
                onChange={(e) => setOutra(e.target.value)}
              />
            ) : null}
            <Botao variante="secundario" tamanho="compacto" onClick={() => setAjustando(false)}>
              Concluir a preparação
            </Botao>
          </section>
        ) : (
          <section>
            <h3 className="viva-rotulo text-text-primary">Estratégia pessoal</h3>
            <p className="mt-1 viva-legenda text-text-secondary">
              {minhas.length === 0
                ? "Você ainda não escolheu nenhuma. Isso também está bem."
                : `Você escolheu ${minhas.length} ${
                    minhas.length === 1 ? "estratégia" : "estratégias"
                  } para esta atividade.`}
            </p>
          </section>
        )}

        <Nota>{atividade.depois}</Nota>
      </div>

      <AcoesAutonomas
        principal={
          <Botao variante="principal" onClick={() => onComecar?.(minhas)}>
            Começar quando estiver pronto
          </Botao>
        }
        secundarias={
          <>
            <Botao variante="terciario" tamanho="compacto" onClick={() => setAjustando((a) => !a)}>
              {ajustando ? "Ocultar preparação" : "Ajustar preparação"}
            </Botao>
            {onSalvarParaDepois ? (
              <Botao variante="terciario" tamanho="compacto" onClick={onSalvarParaDepois}>
                Salvar para depois
              </Botao>
            ) : null}
            {onVoltar ? (
              <Botao variante="terciario" tamanho="compacto" onClick={onVoltar}>
                Voltar
              </Botao>
            ) : null}
          </>
        }
        nota="Nada começa sozinho: a atividade só inicia quando você tocar em começar. Você pode pausar a qualquer momento."
      />
    </Card>
  );
}
