import { Botao, BotaoLink, Card } from "@/components/ds";

/**
 * PausaConscienteCard — a pausa é parte legítima do percurso (documento 00).
 *
 * Sem contagem regressiva, sem som, sem respiração guiada automática e sem
 * qualquer condução terapêutica ou clínica (documentos 15 e 16). A tela pode
 * simplesmente permanecer parada pelo tempo que a pessoa quiser.
 */
export function PausaConscienteCard({
  onVoltarAoInicio,
  onFecharAtividade,
  onContinuarDepois,
  onRevisarEstrategia,
  linkEstrategias,
  className,
}: {
  onVoltarAoInicio?: () => void;
  onFecharAtividade?: () => void;
  onContinuarDepois?: () => void;
  onRevisarEstrategia?: () => void;
  /** Alternativa a `onRevisarEstrategia`, quando a revisão é outra tela. */
  linkEstrategias?: string;
  className?: string;
}) {
  return (
    <Card
      variante="informativo"
      titulo="Você pode fazer uma pausa"
      descricao="Você pode fazer uma pausa e continuar quando estiver pronto."
      className={className}
    >
      <p className="viva-apoio text-text-secondary">
        Nada está sendo contado aqui. Esta tela pode ficar aberta o tempo que
        você quiser, sem som, sem contagem regressiva e sem nenhum exercício
        conduzido.
      </p>

      <ul className="mt-5 flex flex-wrap items-center gap-3">
        {onContinuarDepois ? (
          <li>
            <Botao variante="secundario" onClick={onContinuarDepois}>
              Continuar depois
            </Botao>
          </li>
        ) : null}
        {linkEstrategias ? (
          <li>
            <BotaoLink
              to={linkEstrategias}
              variante="terciario"
              tamanho="compacto"
            >
              Revisar uma estratégia
            </BotaoLink>
          </li>
        ) : onRevisarEstrategia ? (
          <li>
            <Botao
              variante="terciario"
              tamanho="compacto"
              onClick={onRevisarEstrategia}
            >
              Revisar uma estratégia
            </Botao>
          </li>
        ) : null}
        {onVoltarAoInicio ? (
          <li>
            <Botao
              variante="terciario"
              tamanho="compacto"
              onClick={onVoltarAoInicio}
            >
              Voltar ao início
            </Botao>
          </li>
        ) : null}
        {onFecharAtividade ? (
          <li>
            <Botao
              variante="terciario"
              tamanho="compacto"
              onClick={onFecharAtividade}
            >
              Fechar a atividade
            </Botao>
          </li>
        ) : null}
      </ul>

      <p className="mt-4 viva-legenda text-text-secondary">
        Permanecer nesta tela também é uma opção.
      </p>
    </Card>
  );
}
