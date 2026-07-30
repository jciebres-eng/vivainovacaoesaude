import { Botao, Card } from "@/components/ds";
import type { Atividade } from "@/lib/viva-percurso";

/**
 * Alternativa de Percurso (documentos 07 e 13).
 *
 * Uma alternativa não é fracasso nem "modo fácil": é outra forma possível
 * de participação. A pessoa pode interromper e retomar quando quiser.
 */
export function CartaoDeAlternativas({
  atividade,
  escolhida,
  onEscolher,
  onInterromper,
  onRetomar,
}: {
  atividade: Atividade;
  escolhida?: string;
  onEscolher?: (alternativa: string) => void;
  onInterromper?: () => void;
  onRetomar?: () => void;
}) {
  return (
    <Card
      variante="informativo"
      titulo="Formas possíveis de fazer esta atividade"
      descricao={atividade.titulo}
    >
      <p className="viva-apoio text-text-primary">
        Todas as formas abaixo valem igualmente. Escolha a que combina com o seu
        momento.
      </p>

      <ul className="mt-4 space-y-2">
        <li>
          <OpcaoDePercurso
            texto={atividade.descricao}
            rotulo="Percurso principal"
            selecionada={escolhida === atividade.descricao}
            onEscolher={() => onEscolher?.(atividade.descricao)}
          />
        </li>
        {atividade.alternativas.map((alt) => (
          <li key={alt}>
            <OpcaoDePercurso
              texto={alt}
              rotulo="Outra forma possível"
              selecionada={escolhida === alt}
              onEscolher={() => onEscolher?.(alt)}
            />
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Botao variante="terciario" onClick={onInterromper}>
          Interromper por agora
        </Botao>
        <Botao variante="terciario" onClick={onRetomar}>
          Retomar quando fizer sentido
        </Botao>
      </div>
    </Card>
  );
}

function OpcaoDePercurso({
  texto,
  rotulo,
  selecionada,
  onEscolher,
}: {
  texto: string;
  rotulo: string;
  selecionada?: boolean;
  onEscolher?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onEscolher}
      aria-pressed={selecionada}
      className={
        selecionada
          ? "viva-tap flex w-full flex-col gap-1 rounded-2xl border border-action-primary bg-feedback-information p-4 text-left"
          : "viva-tap flex w-full flex-col gap-1 rounded-2xl border border-border-default bg-surface-default p-4 text-left hover:bg-background-secondary"
      }
    >
      <span className="viva-legenda text-text-secondary">{rotulo}</span>
      <span className="viva-apoio text-text-primary">{texto}</span>
      {selecionada ? (
        <span className="viva-legenda text-text-secondary">escolhida</span>
      ) : null}
    </button>
  );
}
