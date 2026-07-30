import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

import {
  AreaDeTexto,
  Botao,
  BotaoIcone,
  Campo,
  CampoTexto,
  Card,
  IndicadorDeEstado,
} from "@/components/ds";
import type { EstrategiaDemo } from "./dados-demo";

/**
 * EstrategiaPessoalCard — o que a própria pessoa reconhece como útil.
 *
 * O VIVA nunca afirma que uma estratégia vai funcionar (documento 15).
 * A linguagem é sempre de possibilidade: pode ser útil para algumas pessoas,
 * você pode experimentar e registrar como foi.
 */
export const avisoDeEstrategia =
  "Esta estratégia pode ser útil para algumas pessoas. Você pode experimentar e registrar como foi.";

export function EstrategiaPessoalCard({
  estrategia,
  onAlternarPessoal,
  onAlternarPreparacao,
  onEditar,
  onRemover,
  className,
}: {
  estrategia: EstrategiaDemo;
  onAlternarPessoal?: (id: string) => void;
  onAlternarPreparacao?: (id: string) => void;
  onEditar?: (estrategia: EstrategiaDemo) => void;
  onRemover?: (id: string) => void;
  className?: string;
}) {
  return (
    <Card variante="habilidade" className={className}>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0">
          <h3 className="viva-subtitulo text-text-primary">{estrategia.nome}</h3>
          <p className="mt-1 viva-legenda text-text-secondary">{estrategia.descricao}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {onEditar ? (
            <BotaoIcone
              icone={Pencil}
              rotulo={`Editar ${estrategia.nome}`}
              onClick={() => onEditar(estrategia)}
            />
          ) : null}
          {onRemover ? (
            <BotaoIcone
              icone={Trash2}
              rotulo={`Remover ${estrategia.nome}`}
              variante="secundario"
              onClick={() => onRemover(estrategia.id)}
            />
          ) : null}
        </div>
      </div>

      <p className="mt-3 viva-legenda text-text-secondary">
        <span className="font-medium text-text-primary">Quando pode ser útil: </span>
        {estrategia.contexto}
      </p>

      {estrategia.pessoal || estrategia.naPreparacao ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {estrategia.pessoal ? (
            <IndicadorDeEstado estado="concluido" texto="Marcada como minha" />
          ) : null}
          {estrategia.naPreparacao ? (
            <IndicadorDeEstado estado="em-preparacao" texto="Aparece na preparação" />
          ) : null}
        </div>
      ) : null}

      <p className="mt-3 viva-legenda text-text-secondary">{avisoDeEstrategia}</p>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {onAlternarPessoal ? (
          <Botao
            variante="secundario"
            tamanho="compacto"
            onClick={() => onAlternarPessoal(estrategia.id)}
          >
            {estrategia.pessoal ? "Deixar de marcar como minha" : "Marcar como minha"}
          </Botao>
        ) : null}
        {onAlternarPreparacao ? (
          <Botao
            variante="terciario"
            tamanho="compacto"
            onClick={() => onAlternarPreparacao(estrategia.id)}
          >
            {estrategia.naPreparacao ? "Retirar da preparação" : "Adicionar à preparação"}
          </Botao>
        ) : null}
      </div>
    </Card>
  );
}

/** Formulário curto para criar ou editar uma estratégia pessoal. */
export function FormularioDeEstrategiaPessoal({
  inicial,
  onSalvar,
  onCancelar,
}: {
  inicial?: EstrategiaDemo;
  onSalvar: (estrategia: Omit<EstrategiaDemo, "id"> & { id?: string }) => void;
  onCancelar?: () => void;
}) {
  const [nome, setNome] = useState(inicial?.nome ?? "");
  const [descricao, setDescricao] = useState(inicial?.descricao ?? "");
  const [contexto, setContexto] = useState(inicial?.contexto ?? "");
  const [erro, setErro] = useState<string | undefined>();

  return (
    <Card
      variante="informativo"
      titulo={inicial ? "Editar estratégia" : "Adicionar uma estratégia"}
      descricao="Escreva com as suas palavras. Nada aqui é corrigido ou avaliado."
    >
      <div className="space-y-4">
        <CampoTexto
          rotulo="Nome da estratégia"
          value={nome}
          erro={erro}
          onChange={(e) => {
            setNome(e.target.value);
            if (erro) setErro(undefined);
          }}
        />
        <AreaDeTexto
          rotulo="Breve descrição"
          apoio="Opcional."
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <Campo
          rotulo="Quando pode ser útil"
          apoio="Opcional."
          htmlFor="contexto-estrategia"
          apoioId="contexto-estrategia-apoio"
          erroId="contexto-estrategia-erro"
        >
          <input
            id="contexto-estrategia"
            value={contexto}
            onChange={(e) => setContexto(e.target.value)}
            className="w-full rounded-2xl border border-input bg-surface-default px-4 py-3 viva-texto text-text-primary"
          />
        </Campo>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Botao
          variante="principal"
          onClick={() => {
            if (!nome.trim()) {
              setErro("Escreva um nome para poder guardar esta estratégia.");
              return;
            }
            onSalvar({
              id: inicial?.id,
              nome: nome.trim(),
              descricao: descricao.trim(),
              contexto: contexto.trim(),
              pessoal: inicial?.pessoal ?? true,
              naPreparacao: inicial?.naPreparacao,
            });
          }}
        >
          Guardar estratégia
        </Botao>
        {onCancelar ? (
          <Botao variante="terciario" tamanho="compacto" onClick={onCancelar}>
            Deixar para depois
          </Botao>
        ) : null}
      </div>
    </Card>
  );
}
