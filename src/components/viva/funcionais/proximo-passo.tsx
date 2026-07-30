import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import { Botao, Card, IndicadorDeEstado } from "@/components/ds";
import type { EstadoDoPercurso } from "@/components/ds";
import {
  rotulosDeEstado,
  rotulosDePreparacao,
  type Atividade,
  type EstadoDoProximoPasso,
} from "@/lib/viva-percurso";

/**
 * Cartão de Próximo Passo (documentos 08, 13 e 14).
 *
 * Apresenta uma possibilidade de continuidade — nunca uma cobrança.
 * O estado aparece em palavra + ícone, jamais só em cor.
 */

const equivalencia: Record<EstadoDoProximoPasso, EstadoDoPercurso> = {
  disponivel: "pode-continuar",
  "em-preparacao": "em-preparacao",
  pausado: "pausado",
  "em-andamento": "em-andamento",
  "pronto-para-reflexao": "pode-continuar",
  concluido: "concluido",
  indisponivel: "retomar",
  "sem-atividade": "retomar",
};

export function EstadoDoPasso({ estado }: { estado: EstadoDoProximoPasso }) {
  return (
    <IndicadorDeEstado
      estado={equivalencia[estado]}
      texto={rotulosDeEstado[estado]}
    />
  );
}

export function CartaoDeProximoPasso({
  atividade,
  acaoPrincipal = "Começar preparação",
  onAcaoPrincipal,
  acaoSecundaria = "Deixar para depois",
  onAcaoSecundaria,
  extra,
}: {
  atividade: Atividade;
  acaoPrincipal?: string;
  onAcaoPrincipal?: () => void;
  acaoSecundaria?: string;
  onAcaoSecundaria?: () => void;
  extra?: ReactNode;
}) {
  const indisponivel =
    atividade.estado === "indisponivel" || atividade.estado === "sem-atividade";

  return (
    <Card variante="proximo-passo" titulo={atividade.titulo}>
      <p className="viva-apoio text-text-primary">{atividade.descricao}</p>

      <dl className="mt-4 grid gap-1 viva-legenda text-text-secondary">
        <div className="flex flex-wrap gap-x-2">
          <dt>Área funcional:</dt>
          <dd className="text-text-primary">{atividade.area}</dd>
        </div>
        {atividade.duracao ? (
          <div className="flex flex-wrap gap-x-2">
            <dt>Duração aproximada:</dt>
            <dd className="text-text-primary">{atividade.duracao}</dd>
          </div>
        ) : null}
        <div className="flex flex-wrap gap-x-2">
          <dt>Preparação:</dt>
          <dd className="text-text-primary">
            {rotulosDePreparacao[atividade.preparacao]}
          </dd>
        </div>
      </dl>

      <div className="mt-4">
        <EstadoDoPasso estado={atividade.estado} />
      </div>

      <p className="mt-4 viva-legenda text-text-secondary">
        Esta atividade é opcional. Retome quando fizer sentido para você.
      </p>

      {extra ? <div className="mt-4">{extra}</div> : null}

      {/* Uma única ação principal; a secundária é sempre uma saída sem custo. */}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        {!indisponivel ? (
          <Botao
            variante="principal"
            icone={ArrowRight}
            iconePosicao="fim"
            onClick={onAcaoPrincipal}
          >
            {acaoPrincipal}
          </Botao>
        ) : null}
        <Botao variante="terciario" onClick={onAcaoSecundaria}>
          {acaoSecundaria}
        </Botao>
      </div>
    </Card>
  );
}
