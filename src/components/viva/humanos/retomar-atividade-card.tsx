import { Botao, Card, IndicadorDeEstado } from "@/components/ds";
import { atividadeInterrompidaDemo } from "./dados-demo";
import { AcoesAutonomas } from "./escolha-autonoma";

/**
 * RetomarAtividadeCard — continuidade sem culpa (documentos 00 e 13).
 *
 * Linguagem proibida aqui: "abandonada", "atrasado", "prazo perdido",
 * "volte para não perder seu progresso". Interromper é parte do percurso,
 * e encerrar também é uma escolha legítima.
 */
export function RetomarAtividadeCard({
  nome = atividadeInterrompidaDemo.nome,
  ultimaEtapa = atividadeInterrompidaDemo.ultimaEtapa,
  resumo = atividadeInterrompidaDemo.resumo,
  onContinuar,
  onRevisar,
  onRetomarDepois,
  onEncerrar,
  className,
}: {
  nome?: string;
  ultimaEtapa?: string;
  resumo?: string;
  onContinuar?: () => void;
  onRevisar?: () => void;
  onRetomarDepois?: () => void;
  onEncerrar?: () => void;
  className?: string;
}) {
  return (
    <Card variante="experiencia" className={className}>
      <div className="flex flex-wrap items-center gap-3">
        <IndicadorDeEstado estado="pausado" />
      </div>

      <h2 className="mt-3 viva-subtitulo text-text-primary">{nome}</h2>
      <p className="mt-2 viva-apoio text-text-secondary">
        Você pode continuar de onde parou ou revisar a etapa anterior.
      </p>

      <dl className="mt-4 space-y-2 viva-legenda text-text-secondary">
        <div>
          <dt className="font-medium text-text-primary">Última etapa aberta</dt>
          <dd>{ultimaEtapa}</dd>
        </div>
        <div>
          <dt className="font-medium text-text-primary">Onde você estava</dt>
          <dd>{resumo}</dd>
        </div>
      </dl>

      <AcoesAutonomas
        principal={
          <Botao variante="principal" onClick={onContinuar}>
            Continuar de onde parei
          </Botao>
        }
        secundarias={
          <>
            {onRevisar ? (
              <Botao variante="terciario" tamanho="compacto" onClick={onRevisar}>
                Revisar antes
              </Botao>
            ) : null}
            {onRetomarDepois ? (
              <Botao variante="terciario" tamanho="compacto" onClick={onRetomarDepois}>
                Retomar em outro momento
              </Botao>
            ) : null}
            {onEncerrar ? (
              <Botao variante="terciario" tamanho="compacto" onClick={onEncerrar}>
                Encerrar este percurso
              </Botao>
            ) : null}
          </>
        }
        nota="Não há prazo para continuar. O que você registrou continua aqui."
      />
    </Card>
  );
}
