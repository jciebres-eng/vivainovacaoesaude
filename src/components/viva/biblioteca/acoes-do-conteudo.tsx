import { useState } from "react";

import {
  AreaDeTexto,
  Botao,
  Card,
  CampoSelecao,
  CampoTexto,
  Confirmacao,
  Interruptor,
} from "@/components/ds";
import type { ConteudoDaBiblioteca } from "@/lib/viva-biblioteca-dados";
import {
  adaptacaoVazia,
  rotulosDeUtilidade,
  type AdaptacaoPessoal,
  type MarcacaoDeUtilidade,
} from "@/lib/viva-biblioteca";

/**
 * Ações disponíveis em cada conteúdo: salvar, marcar como útil, adaptar,
 * relacionar a uma experiência e adicionar ao plano pessoal.
 *
 * Uma ação principal por bloco. Nenhuma marcação vira pontuação ou ranking.
 */

export function AcaoSalvar({
  salvo,
  onAlternar,
}: {
  salvo: boolean;
  onAlternar: () => void;
}) {
  const [mostrou, setMostrou] = useState(false);
  return (
    <Card
      variante="informativo"
      titulo={salvo ? "Este conteúdo está salvo" : "Guardar para consultar depois"}
      descricao="Os conteúdos salvos ficam em Minha Biblioteca, neste dispositivo."
    >
      <Botao
        variante={salvo ? "secundario" : "principal"}
        onClick={() => {
          onAlternar();
          setMostrou(!salvo);
        }}
      >
        {salvo ? "Remover dos salvos" : "Salvar este conteúdo"}
      </Botao>
      {mostrou && salvo ? (
        <div className="mt-3">
          <Confirmacao>Conteúdo salvo para consulta futura.</Confirmacao>
        </div>
      ) : null}
    </Card>
  );
}

export function AcaoMarcarUtil({
  marcacao,
  onMarcar,
}: {
  marcacao?: MarcacaoDeUtilidade;
  onMarcar: (m: MarcacaoDeUtilidade) => void;
}) {
  const opcoes: MarcacaoDeUtilidade[] = ["util", "muito-util", "revisar"];
  return (
    <Card
      variante="informativo"
      titulo="Marcar como útil"
      descricao="Marcação pessoal, sem notas e sem comparação com outras pessoas."
    >
      <div className="flex flex-wrap gap-3">
        {opcoes.map((o) => (
          <Botao
            key={o}
            variante={marcacao === o ? "principal" : "secundario"}
            tamanho="compacto"
            aria-pressed={marcacao === o}
            onClick={() => onMarcar(o)}
          >
            {rotulosDeUtilidade[o]}
          </Botao>
        ))}
      </div>
      {marcacao ? (
        <p className="mt-3 viva-legenda text-text-secondary">
          Você pode mudar ou remover esta marcação quando quiser.
        </p>
      ) : null}
    </Card>
  );
}

export function AcaoAdaptar({
  conteudo,
  adaptacao,
  onSalvar,
  onAlternarBloco,
  onApagar,
}: {
  conteudo: ConteudoDaBiblioteca;
  adaptacao?: AdaptacaoPessoal;
  onSalvar: (mudanca: Partial<AdaptacaoPessoal>) => void;
  onAlternarBloco: (indice: number, campo: "ocultos" | "destacados") => void;
  onApagar: () => void;
}) {
  const atual = adaptacao ?? adaptacaoVazia;
  const [observacoes, setObservacoes] = useState(atual.observacoes);
  const [resumoPessoal, setResumoPessoal] = useState(atual.resumoPessoal);
  const [lembrete, setLembrete] = useState(atual.lembrete);
  const [guardado, setGuardado] = useState(false);

  return (
    <Card
      variante="registro"
      titulo="Criar uma versão pessoal"
      descricao="Suas adaptações pertencem só a você. O conteúdo original permanece preservado."
    >
      <div className="space-y-4">
        <AreaDeTexto
          rotulo="Suas observações"
          apoio="O que você quer lembrar sobre este conteúdo."
          value={observacoes}
          onChange={(e) => {
            setObservacoes(e.target.value);
            setGuardado(false);
          }}
        />
        <AreaDeTexto
          rotulo="Sua versão resumida"
          apoio="Escreva em poucas linhas o que importa para você."
          value={resumoPessoal}
          onChange={(e) => {
            setResumoPessoal(e.target.value);
            setGuardado(false);
          }}
        />
        <CampoTexto
          rotulo="Um lembrete pessoal"
          apoio="Por exemplo: “reler antes de sair de casa”."
          value={lembrete}
          onChange={(e) => {
            setLembrete(e.target.value);
            setGuardado(false);
          }}
        />
      </div>

      <fieldset className="mt-5">
        <legend className="viva-rotulo text-text-primary">
          Partes deste conteúdo
        </legend>
        <p className="mt-1 viva-legenda text-text-secondary">
          Você pode ocultar ou destacar trechos na sua versão.
        </p>
        <ul className="mt-3 space-y-3">
          {conteudo.blocos.map((bloco, i) => {
            const rotulo =
              "texto" in bloco
                ? bloco.texto.slice(0, 60)
                : bloco.itens[0]?.slice(0, 60);
            return (
              <li
                key={`${bloco.tipo}-${i}`}
                className="rounded-2xl border border-border-default-default p-3"
              >
                <p className="viva-legenda text-text-secondary">{rotulo}…</p>
                <div className="mt-2 flex flex-wrap gap-3">
                  <Interruptor
                    rotulo="Ocultar na minha versão"
                    valor={atual.blocosOcultos.includes(i)}
                    onToggle={() => onAlternarBloco(i, "ocultos")}
                  />
                  <Interruptor
                    rotulo="Destacar na minha versão"
                    valor={atual.blocosDestacados.includes(i)}
                    onToggle={() => onAlternarBloco(i, "destacados")}
                  />
                </div>

              </li>
            );
          })}
        </ul>
      </fieldset>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Botao
          variante="principal"
          onClick={() => {
            onSalvar({ observacoes, resumoPessoal, lembrete });
            setGuardado(true);
          }}
        >
          Guardar minha versão
        </Botao>
        <Botao
          variante="terciario"
          tamanho="compacto"
          onClick={() => {
            onApagar();
            setObservacoes("");
            setResumoPessoal("");
            setLembrete("");
            setGuardado(false);
          }}
        >
          Voltar ao conteúdo original
        </Botao>
      </div>

      {guardado ? (
        <div className="mt-3">
          <Confirmacao>Sua versão pessoal foi guardada.</Confirmacao>
        </div>
      ) : null}
    </Card>
  );
}

export function AcaoRelacionar({
  experiencias,
  onRelacionar,
}: {
  experiencias: { valor: string; label: string }[];
  onRelacionar: (experiencia: string, observacao?: string) => void;
}) {
  const [escolha, setEscolha] = useState(experiencias[0]?.valor ?? "");
  const [observacao, setObservacao] = useState("");
  const [guardado, setGuardado] = useState(false);

  return (
    <Card
      variante="experiencia"
      titulo="Relacionar a uma experiência"
      descricao="Você escolhe a relação. O VIVA não faz nenhuma análise automática."
    >
      <div className="space-y-4">
        <CampoSelecao
          rotulo="Experiência ou percurso"
          opcoes={experiencias}
          value={escolha}
          onChange={(e) => {
            setEscolha(e.target.value);
            setGuardado(false);
          }}
        />
        <CampoTexto
          rotulo="Observação (opcional)"
          apoio="Por exemplo: “usei esta estratégia ao preparar uma consulta”."
          value={observacao}
          onChange={(e) => {
            setObservacao(e.target.value);
            setGuardado(false);
          }}
        />
      </div>
      <div className="mt-5">
        <Botao
          variante="principal"
          disabled={!escolha}
          onClick={() => {
            onRelacionar(escolha, observacao || undefined);
            setObservacao("");
            setGuardado(true);
          }}
        >
          Guardar esta relação
        </Botao>
      </div>
      {guardado ? (
        <div className="mt-3">
          <Confirmacao>Relação guardada neste dispositivo.</Confirmacao>
        </div>
      ) : null}
    </Card>
  );
}

const momentosDoPlano = [
  "Revisar antes da próxima atividade",
  "Ler com calma outro dia",
  "Levar para uma conversa de apoio",
  "Consultar quando algo mudar no caminho",
];

export function AcaoPlano({
  onAdicionar,
}: {
  onAdicionar: (quando: string) => void;
}) {
  const [quando, setQuando] = useState(momentosDoPlano[0]);
  const [guardado, setGuardado] = useState(false);
  return (
    <Card
      variante="proximo-passo"
      titulo="Adicionar ao meu plano pessoal"
      descricao="O plano é seu e não gera cobrança, prazo ou lembrete automático."
    >
      <CampoSelecao
        rotulo="Quando isto pode ajudar"
        opcoes={momentosDoPlano.map((m) => ({ valor: m, label: m }))}
        value={quando}
        onChange={(e) => {
          setQuando(e.target.value);
          setGuardado(false);
        }}
      />
      <div className="mt-4">
        <Botao
          variante="principal"
          onClick={() => {
            onAdicionar(quando);
            setGuardado(true);
          }}
        >
          Adicionar ao meu plano
        </Botao>
      </div>
      {guardado ? (
        <div className="mt-3">
          <Confirmacao>Este conteúdo entrou no seu plano pessoal.</Confirmacao>
        </div>
      ) : null}
    </Card>
  );
}
