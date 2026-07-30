import { useState } from "react";

import {
  AreaDeTexto,
  Botao,
  CampoSelecao,
  CampoTexto,
  Card,
  Chip,
  Confirmacao,
} from "@/components/ds";
import { novoId, rotulosDeStatusDuvida, type Duvida, type StatusDuvida } from "@/lib/viva-percurso";

/**
 * Registro de Dúvida (documentos 10, 15 e 16).
 *
 * A prioridade é definida pela pessoa. Nada aqui classifica gravidade
 * automaticamente nem responde questões clínicas.
 */

const status: StatusDuvida[] = [
  "quero-lembrar",
  "quero-pesquisar",
  "quero-conversar",
  "respondida",
  "arquivada",
];

export function RegistroDeDuvida({
  inicial,
  onSalvar,
  onArquivar,
  onRelacionarExperiencia,
  onRelacionarConteudo,
}: {
  inicial?: Duvida;
  onSalvar?: (d: Duvida) => void;
  onArquivar?: (d: Duvida) => void;
  onRelacionarExperiencia?: (d: Duvida) => void;
  onRelacionarConteudo?: (d: Duvida) => void;
}) {
  const [duvida, setDuvida] = useState<Duvida>(
    inicial ?? {
      id: novoId("duvida"),
      texto: "",
      prioridade: "quando-der",
      status: "quero-lembrar",
    },
  );
  const [salvo, setSalvo] = useState(false);

  const mudar = (patch: Partial<Duvida>) => {
    setDuvida((d) => ({ ...d, ...patch }));
    setSalvo(false);
  };

  return (
    <Card
      variante="informativo"
      titulo="Registrar uma dúvida"
      descricao="Guardar uma pergunta também é uma forma de cuidado. Só o texto da dúvida é necessário."
    >
      <div className="space-y-5">
        <AreaDeTexto
          rotulo="Qual é a sua dúvida?"
          obrigatorio
          value={duvida.texto}
          onChange={(e) => mudar({ texto: e.target.value })}
        />
        <CampoTexto
          rotulo="Onde ela surgiu? (opcional)"
          value={duvida.contexto ?? ""}
          onChange={(e) => mudar({ contexto: e.target.value })}
        />
        <CampoTexto
          rotulo="Com quem você gostaria de conversar? (opcional)"
          value={duvida.conversarCom ?? ""}
          onChange={(e) => mudar({ conversarCom: e.target.value })}
        />
        <CampoSelecao
          rotulo="Prioridade definida por você"
          value={duvida.prioridade}
          onChange={(e) => mudar({ prioridade: e.target.value as Duvida["prioridade"] })}
          opcoes={[
            { valor: "quando-der", label: "Quando der" },
            { valor: "em-breve", label: "Em breve" },
            { valor: "importante-para-mim", label: "Importante para mim" },
          ]}
        />
        <AreaDeTexto
          rotulo="Observações (opcional)"
          value={duvida.observacoes ?? ""}
          onChange={(e) => mudar({ observacoes: e.target.value })}
        />

        <fieldset>
          <legend className="viva-rotulo text-text-primary">Situação</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {status.map((s) => (
              <Chip
                key={s}
                label={rotulosDeStatusDuvida[s]}
                selected={duvida.status === s}
                onClick={() => mudar({ status: s })}
              />
            ))}
          </div>
        </fieldset>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Botao
          variante="principal"
          disabled={!duvida.texto.trim()}
          onClick={() => {
            onSalvar?.(duvida);
            setSalvo(true);
          }}
        >
          Salvar dúvida
        </Botao>
        <Botao
          variante="terciario"
          onClick={() => {
            const d = { ...duvida, status: "quero-conversar" as StatusDuvida };
            setDuvida(d);
            onSalvar?.(d);
            setSalvo(true);
          }}
        >
          Marcar para conversar com profissional
        </Botao>
        {onRelacionarExperiencia ? (
          <Botao variante="terciario" onClick={() => onRelacionarExperiencia(duvida)}>
            Relacionar a uma experiência
          </Botao>
        ) : null}
        {onRelacionarConteudo ? (
          <Botao variante="terciario" onClick={() => onRelacionarConteudo(duvida)}>
            Relacionar a um conteúdo
          </Botao>
        ) : null}
        {onArquivar ? (
          <Botao variante="terciario" onClick={() => onArquivar(duvida)}>
            Arquivar
          </Botao>
        ) : null}
      </div>

      <div className="mt-4">
        <Confirmacao visivel={salvo}>
          Sua dúvida foi salva. Você poderá consultá-la ou modificá-la depois.
        </Confirmacao>
      </div>
    </Card>
  );
}

/** Cartão de leitura de uma dúvida já guardada. */
export function CartaoDeDuvida({
  duvida,
  onEditar,
  onArquivar,
}: {
  duvida: Duvida;
  onEditar?: () => void;
  onArquivar?: () => void;
}) {
  return (
    <Card variante="registro" titulo={duvida.texto}>
      <dl className="grid gap-1 viva-legenda text-text-secondary">
        {duvida.contexto ? (
          <div className="flex flex-wrap gap-x-2">
            <dt>Surgiu em:</dt>
            <dd className="text-text-primary">{duvida.contexto}</dd>
          </div>
        ) : null}
        {duvida.conversarCom ? (
          <div className="flex flex-wrap gap-x-2">
            <dt>Conversar com:</dt>
            <dd className="text-text-primary">{duvida.conversarCom}</dd>
          </div>
        ) : null}
        <div className="flex flex-wrap gap-x-2">
          <dt>Situação:</dt>
          <dd className="text-text-primary">{rotulosDeStatusDuvida[duvida.status]}</dd>
        </div>
      </dl>
      <div className="mt-4 flex flex-wrap gap-3">
        {onEditar ? (
          <Botao tamanho="compacto" onClick={onEditar}>
            Editar
          </Botao>
        ) : null}
        {onArquivar ? (
          <Botao variante="terciario" onClick={onArquivar}>
            Arquivar
          </Botao>
        ) : null}
      </div>
    </Card>
  );
}
