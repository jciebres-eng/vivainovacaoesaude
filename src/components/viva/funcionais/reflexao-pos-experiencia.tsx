import { useState } from "react";

import { AreaDeTexto, Botao, Card, Confirmacao } from "@/components/ds";
import { novoId, type Experiencia, type Reflexao } from "@/lib/viva-percurso";

/**
 * Reflexão Pós-Experiência (documentos 10, 15 e 16).
 *
 * Uma pergunta por vez. Pular é permitido. O resumo apenas devolve, em
 * frases descritivas, o que a própria pessoa escreveu: não interpreta
 * emoções, não classifica desempenho, não sugere diagnóstico.
 */

export const perguntasDeReflexao: { id: string; texto: string }[] = [
  { id: "como-foi", texto: "Como foi realizar essa atividade?" },
  { id: "esperado", texto: "O que aconteceu como você esperava?" },
  { id: "diferente", texto: "O que aconteceu de forma diferente?" },
  { id: "ajudou", texto: "O que ajudou você?" },
  { id: "dificil", texto: "O que tornou a experiência mais difícil?" },
  { id: "adaptacao", texto: "Houve algum momento em que precisou adaptar o plano?" },
  { id: "repetir", texto: "Qual estratégia gostaria de utilizar novamente?" },
  { id: "mudaria", texto: "O que mudaria em uma próxima tentativa?" },
  { id: "conversar", texto: "Deseja conversar sobre isso com alguém?" },
  { id: "duvida", texto: "Existe alguma dúvida que deseja guardar?" },
];

/** Resumo descritivo: só devolve o que foi escrito, sem inferência. */
export function montarResumo(respostas: Record<string, string>) {
  const frases: string[] = [];
  const p = (chave: string) => respostas[chave]?.trim();
  if (p("ajudou")) frases.push(`que ${p("ajudou")!.toLowerCase()} ajudou`);
  if (p("dificil")) frases.push(`que ${p("dificil")!.toLowerCase()} dificultou`);
  if (p("adaptacao")) frases.push(`que precisou adaptar o plano: ${p("adaptacao")}`);
  if (p("repetir")) frases.push(`que gostaria de usar novamente ${p("repetir")}`);
  if (p("mudaria")) frases.push(`que mudaria ${p("mudaria")} na próxima vez`);
  if (!frases.length) return null;
  return `Você registrou ${frases.join("; ")}.`;
}

export function ReflexaoPosExperiencia({
  experiencia,
  inicial,
  onSalvar,
  onEncerrar,
  onGerarEstrategia,
  onRegistrarDuvida,
}: {
  experiencia: Experiencia;
  inicial?: Reflexao;
  onSalvar?: (r: Reflexao) => void;
  onEncerrar?: () => void;
  onGerarEstrategia?: (texto: string) => void;
  onRegistrarDuvida?: (texto: string) => void;
}) {
  const [reflexao, setReflexao] = useState<Reflexao>(
    inicial ?? {
      id: novoId("reflexao"),
      experienciaId: experiencia.id,
      respostas: {},
    },
  );
  const [indice, setIndice] = useState(0);
  const [salvo, setSalvo] = useState(false);
  const [mostrarResumo, setMostrarResumo] = useState(false);

  const pergunta = perguntasDeReflexao[indice];
  const ultima = indice === perguntasDeReflexao.length - 1;
  const resumo = montarResumo(reflexao.respostas);

  const responder = (valor: string) => {
    setReflexao((r) => ({
      ...r,
      respostas: { ...r.respostas, [pergunta.id]: valor },
    }));
    setSalvo(false);
  };

  const salvar = () => {
    onSalvar?.(reflexao);
    setSalvo(true);
  };

  return (
    <Card
      variante="reflexao"
      titulo="Reflexão sobre a experiência"
      descricao={`Sobre: ${experiencia.atividade}. Responder é opcional — não existe resposta certa.`}
    >
      <p className="viva-legenda text-text-secondary">
        Pergunta {indice + 1} de {perguntasDeReflexao.length}
      </p>

      <div className="mt-3">
        <AreaDeTexto
          rotulo={pergunta.texto}
          value={reflexao.respostas[pergunta.id] ?? ""}
          onChange={(e) => responder(e.target.value)}
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {!ultima ? (
          <Botao variante="principal" onClick={() => setIndice(indice + 1)}>
            Continuar
          </Botao>
        ) : (
          <Botao
            variante="principal"
            onClick={() => {
              salvar();
              setMostrarResumo(true);
            }}
          >
            Ver resumo do que registrei
          </Botao>
        )}
        {indice > 0 ? (
          <Botao tamanho="compacto" onClick={() => setIndice(indice - 1)}>
            Voltar
          </Botao>
        ) : null}
        {!ultima ? (
          <Botao variante="terciario" onClick={() => setIndice(indice + 1)}>
            Pular esta pergunta
          </Botao>
        ) : null}
        <Botao variante="terciario" onClick={salvar}>
          Salvar o que já escrevi
        </Botao>
        {onEncerrar ? (
          <Botao variante="terciario" onClick={onEncerrar}>
            Encerrar sem responder tudo
          </Botao>
        ) : null}
      </div>

      <div className="mt-4">
        <Confirmacao visivel={salvo}>
          Sua reflexão foi salva. Você pode continuar depois, do ponto em que parou.
        </Confirmacao>
      </div>

      {mostrarResumo ? (
        <div className="mt-6 rounded-2xl bg-surface-muted p-4">
          <p className="viva-rotulo text-text-primary">Resumo do que você registrou</p>
          <p className="mt-2 viva-apoio text-text-primary">
            {resumo ?? "Você ainda não registrou respostas. Pode voltar quando quiser."}
          </p>
          <p className="mt-3 viva-legenda text-text-secondary">
            Este resumo repete apenas o que você escreveu. Ele não interpreta, não avalia e não
            classifica nada.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {reflexao.respostas.repetir ? (
              <Botao
                tamanho="compacto"
                onClick={() => onGerarEstrategia?.(reflexao.respostas.repetir)}
              >
                Guardar como estratégia pessoal
              </Botao>
            ) : null}
            {reflexao.respostas.duvida ? (
              <Botao
                variante="terciario"
                onClick={() => onRegistrarDuvida?.(reflexao.respostas.duvida)}
              >
                Guardar como dúvida
              </Botao>
            ) : null}
          </div>
        </div>
      ) : null}
    </Card>
  );
}
