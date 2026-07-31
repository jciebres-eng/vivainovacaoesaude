import { Keyboard, Mic, MicOff, Square } from "lucide-react";
import { useState } from "react";

import { Botao, Card, AreaDeTexto, Nota } from "@/components/ds";
import { exemplosDeFala, interpretarIntencao, type Interpretacao } from "@/lib/viva-intencao";
import { useEscutaDeVoz } from "@/lib/viva-voz";

/**
 * VoiceJourneyStarter — dizer, com a própria voz, o que se precisa.
 *
 * A fala é opcional. Escrever e escolher com toques levam exatamente ao
 * mesmo lugar. O microfone só liga por uma ação da pessoa e nada é gravado
 * (documentos 03, 04 e 15).
 */
export function EntradaPorVoz({
  onInterpretar,
}: {
  onInterpretar: (interpretacao: Interpretacao) => void;
}) {
  const voz = useEscutaDeVoz();
  const [texto, setTexto] = useState("");
  const valor = voz.transcricao || texto;

  return (
    <div className="space-y-5">
      <Card variante="proximo-passo" titulo="Diga o que você precisa">
        <p className="viva-apoio text-text-secondary">
          Você pode falar, escrever ou escolher com toques. Qualquer caminho leva ao mesmo lugar.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          {voz.estado === "ouvindo" ? (
            <Botao variante="principal" icone={Square} onClick={voz.parar}>
              Parar de ouvir
            </Botao>
          ) : (
            <Botao
              variante="principal"
              icone={voz.suportado ? Mic : MicOff}
              onClick={voz.ouvir}
              disabled={!voz.suportado}
            >
              Falar agora
            </Botao>
          )}
          <Botao variante="secundario" icone={Keyboard} onClick={() => voz.cancelar()}>
            Prefiro escrever
          </Botao>
        </div>

        {voz.estado === "ouvindo" ? (
          <p role="status" className="mt-4 viva-apoio text-destaque-texto">
            Estou ouvindo. Fale no seu ritmo — pode pausar quando quiser.
          </p>
        ) : null}

        {!voz.suportado ? (
          <Nota>
            Este navegador não oferece reconhecimento de fala. Escrever abaixo funciona do mesmo
            jeito.
          </Nota>
        ) : null}

        {voz.mensagemDeErro ? (
          <p role="alert" className="mt-4 viva-apoio text-text-primary">
            {voz.mensagemDeErro}
          </p>
        ) : null}

        <div className="mt-5">
          <AreaDeTexto
            rotulo="O que você precisa agora"
            apoio="Uma frase basta. Nada aqui é enviado para fora deste dispositivo."
            value={valor}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              voz.escrever(e.target.value);
              setTexto(e.target.value);
            }}
            rows={3}
          />
        </div>

        <div className="mt-4">
          <Botao
            variante="principal"
            onClick={() => onInterpretar(interpretarIntencao(valor))}
            disabled={valor.trim().length < 3}
          >
            Continuar
          </Botao>
        </div>
      </Card>

      <Card variante="informativo" titulo="Exemplos de frases">
        <ul className="space-y-2">
          {exemplosDeFala.map((exemplo) => (
            <li key={exemplo}>
              <button
                type="button"
                onClick={() => {
                  voz.escrever(exemplo);
                  setTexto(exemplo);
                }}
                className="viva-tap min-h-11 text-left viva-apoio text-text-primary underline underline-offset-4"
              >
                {exemplo}
              </button>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

/** Confirmação da leitura feita pelo VIVA — a decisão continua com a pessoa. */
export function ConfirmacaoDeIntencao({
  interpretacao,
  onConfirmar,
  onCorrigir,
}: {
  interpretacao: Interpretacao;
  onConfirmar: () => void;
  onCorrigir: () => void;
}) {
  const indefinido = interpretacao.contexto.id === "indefinido";
  return (
    <Card variante="proximo-passo" titulo={indefinido ? "Não tenho certeza" : "É isto?"}>
      <p className="viva-texto text-text-primary">
        Entendi: {interpretacao.contexto.confirmacao}.
      </p>
      {interpretacao.termosReconhecidos.length > 0 ? (
        <p className="mt-2 viva-legenda text-text-secondary">
          Cheguei a esta leitura por causa de: {interpretacao.termosReconhecidos.join(", ")}.
        </p>
      ) : null}
      <Nota>
        Esta leitura é feita por regras simples neste aparelho. Ela pode estar errada — e você pode
        corrigir agora.
      </Nota>
      <div className="mt-5 flex flex-wrap gap-3">
        {!indefinido ? (
          <Botao variante="principal" onClick={onConfirmar}>
            Sim, é isto
          </Botao>
        ) : null}
        <Botao variante="secundario" onClick={onCorrigir}>
          {indefinido ? "Escolher com toques" : "Não é isto"}
        </Botao>
      </div>
    </Card>
  );
}
