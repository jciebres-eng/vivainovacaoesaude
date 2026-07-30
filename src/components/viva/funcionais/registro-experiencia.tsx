import { useState } from "react";

import {
  AreaDeTexto,
  Botao,
  CampoData,
  CampoTexto,
  Card,
  Chip,
  Confirmacao,
} from "@/components/ds";
import { novoId, type Experiencia } from "@/lib/viva-percurso";

/**
 * Registro de Experiência (documento 10).
 *
 * Registrar não é ser avaliado. Só a atividade é necessária para salvar;
 * todo o resto é opcional e pode ser completado depois.
 */

const partes = ["O que foi", "Como foi", "Para a próxima"];

const marcadoresDePausa = ["Sim, fiz uma pausa", "Não precisei", "Prefiro não dizer"];
const marcadoresDeApoio = ["Tive apoio", "Fiz sozinho(a)", "Prefiro não dizer"];
const marcadoresDePlano = ["Mantive o plano", "Mudei o plano", "Mudei em parte"];

export function RegistroDeExperiencia({
  inicial,
  onSalvar,
  onSalvarEContinuarDepois,
  onAdicionarEstrategia,
  onRegistrarDuvida,
  onVerAnterior,
  onEncerrar,
}: {
  inicial?: Experiencia;
  onSalvar?: (e: Experiencia) => void;
  onSalvarEContinuarDepois?: (e: Experiencia) => void;
  onAdicionarEstrategia?: (e: Experiencia) => void;
  onRegistrarDuvida?: (e: Experiencia) => void;
  onVerAnterior?: () => void;
  onEncerrar?: () => void;
}) {
  const [dados, setDados] = useState<Experiencia>(
    inicial ?? {
      id: novoId("experiencia"),
      atividade: "",
      quando: new Date().toISOString().slice(0, 10),
      duvidaIds: [],
      atualizadaEm: new Date().toISOString().slice(0, 10),
    },
  );
  const [parte, setParte] = useState(0);
  const [salvo, setSalvo] = useState(false);

  const mudar = (patch: Partial<Experiencia>) => {
    setDados((d) => ({
      ...d,
      ...patch,
      atualizadaEm: new Date().toISOString().slice(0, 10),
    }));
    setSalvo(false);
  };

  const salvar = (acao?: (e: Experiencia) => void) => {
    onSalvar?.(dados);
    acao?.(dados);
    setSalvo(true);
  };

  return (
    <Card
      variante="registro"
      titulo="Registrar uma experiência"
      descricao="Com as suas palavras. Só a atividade é necessária para salvar."
    >
      <nav aria-label="Partes do registro">
        <ol className="flex flex-wrap gap-x-2 gap-y-1 viva-legenda text-text-secondary">
          {partes.map((nome, i) => (
            <li key={nome}>
              <button
                type="button"
                onClick={() => setParte(i)}
                aria-current={i === parte ? "step" : undefined}
                className={
                  i === parte
                    ? "viva-tap rounded-xl px-2 py-1 font-semibold text-text-primary underline underline-offset-4"
                    : "viva-tap rounded-xl px-2 py-1 hover:text-text-primary"
                }
              >
                {i + 1}. {nome}
              </button>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-5 space-y-5">
        {parte === 0 ? (
          <>
            <CampoTexto
              rotulo="Qual atividade foi realizada?"
              obrigatorio
              value={dados.atividade}
              onChange={(e) => mudar({ atividade: e.target.value })}
            />
            <CampoTexto
              rotulo="Onde aconteceu? (opcional)"
              value={dados.onde ?? ""}
              onChange={(e) => mudar({ onde: e.target.value })}
            />
            <CampoData
              rotulo="Quando aconteceu?"
              value={dados.quando}
              onChange={(e) => mudar({ quando: e.target.value })}
            />
            <AreaDeTexto
              rotulo="O que estava planejado? (opcional)"
              value={dados.planejado ?? ""}
              onChange={(e) => mudar({ planejado: e.target.value })}
            />
          </>
        ) : null}

        {parte === 1 ? (
          <>
            <AreaDeTexto
              rotulo="O que aconteceu de fato? (opcional)"
              value={dados.aconteceu ?? ""}
              onChange={(e) => mudar({ aconteceu: e.target.value })}
            />
            <AreaDeTexto
              rotulo="O que ajudou? (opcional)"
              value={dados.ajudou ?? ""}
              onChange={(e) => mudar({ ajudou: e.target.value })}
            />
            <AreaDeTexto
              rotulo="O que dificultou? (opcional)"
              value={dados.dificultou ?? ""}
              onChange={(e) => mudar({ dificultou: e.target.value })}
            />
            <GrupoDeMarcadores
              rotulo="Foi necessário mudar o plano? (opcional)"
              opcoes={marcadoresDePlano}
              valor={dados.mudouPlano}
              onEscolher={(v) => mudar({ mudouPlano: v })}
            />
            <GrupoDeMarcadores
              rotulo="Houve necessidade de pausa? (opcional)"
              opcoes={marcadoresDePausa}
              valor={dados.fezPausa}
              onEscolher={(v) => mudar({ fezPausa: v })}
            />
            <GrupoDeMarcadores
              rotulo="Houve apoio de outra pessoa? (opcional)"
              opcoes={marcadoresDeApoio}
              valor={dados.teveApoio}
              onEscolher={(v) => mudar({ teveApoio: v })}
            />
          </>
        ) : null}

        {parte === 2 ? (
          <AreaDeTexto
            rotulo="O que gostaria de lembrar para uma próxima vez? (opcional)"
            value={dados.lembrarDepois ?? ""}
            onChange={(e) => mudar({ lembrarDepois: e.target.value })}
          />
        ) : null}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Botao
          variante="principal"
          disabled={!dados.atividade.trim()}
          onClick={() => salvar()}
        >
          Salvar registro
        </Botao>
        {parte < partes.length - 1 ? (
          <Botao tamanho="compacto" onClick={() => setParte(parte + 1)}>
            Continuar
          </Botao>
        ) : null}
        {parte > 0 ? (
          <Botao tamanho="compacto" onClick={() => setParte(parte - 1)}>
            Voltar
          </Botao>
        ) : null}
        <Botao
          variante="terciario"
          onClick={() => salvar(onSalvarEContinuarDepois)}
        >
          Salvar e continuar depois
        </Botao>
        <Botao variante="terciario" onClick={() => onAdicionarEstrategia?.(dados)}>
          Adicionar estratégia
        </Botao>
        <Botao variante="terciario" onClick={() => onRegistrarDuvida?.(dados)}>
          Registrar dúvida
        </Botao>
        {onVerAnterior ? (
          <Botao variante="terciario" onClick={onVerAnterior}>
            Ver experiência anterior
          </Botao>
        ) : null}
        {onEncerrar ? (
          <Botao variante="terciario" onClick={onEncerrar}>
            Encerrar
          </Botao>
        ) : null}
      </div>

      <div className="mt-4">
        <Confirmacao visivel={salvo}>
          Seu registro foi salvo. Você poderá consultá-lo ou modificá-lo depois.
        </Confirmacao>
      </div>
    </Card>
  );
}

function GrupoDeMarcadores({
  rotulo,
  opcoes,
  valor,
  onEscolher,
}: {
  rotulo: string;
  opcoes: string[];
  valor?: string;
  onEscolher: (v: string | undefined) => void;
}) {
  return (
    <fieldset>
      <legend className="viva-rotulo text-text-primary">{rotulo}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {opcoes.map((o) => (
          <Chip
            key={o}
            label={o}
            selected={valor === o}
            onClick={() => onEscolher(valor === o ? undefined : o)}
          />
        ))}
      </div>
    </fieldset>
  );
}
