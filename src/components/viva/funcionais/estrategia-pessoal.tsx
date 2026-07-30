import { useState } from "react";

import {
  AreaDeTexto,
  Botao,
  CampoSelecao,
  CampoTexto,
  Card,
  Chip,
} from "@/components/ds";
import { novoId, type Estrategia } from "@/lib/viva-percurso";

/**
 * Estratégia Pessoal (documentos 07, 15 e 16).
 *
 * Nunca é prescrição: a pessoa registra, adapta e decide. Nada aqui afirma
 * que algo funciona para todo mundo.
 */

export const avisoEtico =
  "Esta estratégia pode ser experimentada. Você pode adaptá-la ao seu modo de funcionar. O que ajuda uma pessoa pode não ajudar outra — registre apenas o que fizer sentido para você.";

export function CartaoDeEstrategiaPessoal({
  estrategia,
  onAlternarMarcador,
  onAdicionarAoPlano,
  onEditar,
  onDuplicar,
  onRemover,
}: {
  estrategia: Estrategia;
  onAlternarMarcador?: (
    marcador: "queroExperimentar" | "jaUtilizei" | "foiUtil",
  ) => void;
  onAdicionarAoPlano?: () => void;
  onEditar?: () => void;
  onDuplicar?: () => void;
  onRemover?: () => void;
}) {
  return (
    <Card variante="habilidade" titulo={estrategia.nome}>
      <p className="viva-apoio text-text-primary">{estrategia.descricao}</p>

      <dl className="mt-4 grid gap-1 viva-legenda text-text-secondary">
        <div className="flex flex-wrap gap-x-2">
          <dt>Pode ajudar em:</dt>
          <dd className="text-text-primary">{estrategia.quandoAjuda}</dd>
        </div>
        <div className="flex flex-wrap gap-x-2">
          <dt>Área funcional:</dt>
          <dd className="text-text-primary">{estrategia.area}</dd>
        </div>
        <div className="flex flex-wrap gap-x-2">
          <dt>Como utilizar:</dt>
          <dd className="text-text-primary">{estrategia.comoUsar}</dd>
        </div>
      </dl>

      {estrategia.observacoes ? (
        <p className="mt-3 border-l-2 border-border-default pl-4 viva-apoio text-text-primary">
          {estrategia.observacoes}
        </p>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2">
        <Chip
          label="Quero experimentar"
          selected={estrategia.queroExperimentar}
          onSelect={() => onAlternarMarcador?.("queroExperimentar")}
        />
        <Chip
          label="Já utilizei"
          selected={estrategia.jaUtilizei}
          onSelect={() => onAlternarMarcador?.("jaUtilizei")}
        />
        <Chip
          label="Foi útil para mim"
          selected={estrategia.foiUtil}
          onSelect={() => onAlternarMarcador?.("foiUtil")}
        />
      </div>

      <p className="mt-4 viva-legenda text-text-secondary">{avisoEtico}</p>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Botao variante="principal" onClick={onAdicionarAoPlano}>
          Adicionar ao meu plano
        </Botao>
        <Botao variante="terciario" onClick={onEditar}>
          Editar
        </Botao>
        <Botao variante="terciario" onClick={onDuplicar}>
          Duplicar e adaptar
        </Botao>
        {onRemover ? (
          <Botao variante="terciario" onClick={onRemover}>
            Remover
          </Botao>
        ) : null}
      </div>
    </Card>
  );
}

/** Formulário para criar ou adaptar uma estratégia. */
export function FormularioDeEstrategia({
  inicial,
  onSalvar,
  onCancelar,
}: {
  inicial?: Estrategia;
  onSalvar: (e: Estrategia) => void;
  onCancelar?: () => void;
}) {
  const [dados, setDados] = useState<Estrategia>(
    inicial ?? {
      id: novoId("estrategia"),
      nome: "",
      descricao: "",
      quandoAjuda: "",
      area: "Deslocamento",
      comoUsar: "",
      observacoes: "",
      queroExperimentar: true,
      jaUtilizei: false,
      foiUtil: false,
    },
  );

  return (
    <Card
      variante="informativo"
      titulo={inicial ? "Adaptar estratégia" : "Nova estratégia pessoal"}
      descricao="Só o nome é necessário para salvar. O resto é opcional."
    >
      <div className="space-y-5">
        <CampoTexto
          rotulo="Nome"
          obrigatorio
          value={dados.nome}
          onChange={(e) => setDados({ ...dados, nome: e.target.value })}
        />
        <AreaDeTexto
          rotulo="Descrição (opcional)"
          value={dados.descricao}
          onChange={(e) => setDados({ ...dados, descricao: e.target.value })}
        />
        <CampoTexto
          rotulo="Situação em que pode ajudar (opcional)"
          value={dados.quandoAjuda}
          onChange={(e) => setDados({ ...dados, quandoAjuda: e.target.value })}
        />
        <CampoSelecao
          rotulo="Área funcional"
          value={dados.area}
          onChange={(e) =>
            setDados({ ...dados, area: e.target.value as Estrategia["area"] })
          }
          opcoes={[
            "Deslocamento",
            "Saúde",
            "Compras",
            "Convívio",
            "Estudo e trabalho",
            "Casa",
          ].map((a) => ({ valor: a, label: a }))}
        />
        <CampoTexto
          rotulo="Forma de utilização (opcional)"
          value={dados.comoUsar}
          onChange={(e) => setDados({ ...dados, comoUsar: e.target.value })}
        />
        <AreaDeTexto
          rotulo="Observações pessoais (opcional)"
          value={dados.observacoes ?? ""}
          onChange={(e) => setDados({ ...dados, observacoes: e.target.value })}
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Botao
          variante="principal"
          disabled={!dados.nome.trim()}
          onClick={() => onSalvar(dados)}
        >
          Salvar estratégia
        </Botao>
        {onCancelar ? (
          <Botao variante="terciario" onClick={onCancelar}>
            Deixar para depois
          </Botao>
        ) : null}
      </div>
    </Card>
  );
}
