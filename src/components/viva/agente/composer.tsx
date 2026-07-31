import { Mic, MicOff, Paperclip, Send, Square } from "lucide-react";
import { useState, type ChangeEvent } from "react";

import { Botao, Nota } from "@/components/ds";
import { useEscutaDeVoz } from "@/lib/viva-voz";
import { exemplosDeIntencao } from "@/lib/viva-situacoes";

/**
 * AgentComposer — um único lugar para dizer o que se precisa.
 *
 * Falar, escrever ou tocar em um exemplo levam exatamente ao mesmo lugar.
 * O microfone só liga por ação da pessoa, nada é gravado e nada sai deste
 * aparelho (documentos 03, 04 e 15).
 */
export function CampoDoAgente({
  onEnviar,
  rotulo = "O que você precisa agora?",
  apoio = "Fale, escreva ou toque em um exemplo. Nada é gravado e tudo fica neste aparelho.",
}: {
  onEnviar: (texto: string) => void;
  rotulo?: string;
  apoio?: string;
}) {
  const voz = useEscutaDeVoz();
  const [texto, setTexto] = useState("");
  const [anexos, setAnexos] = useState<string[]>([]);
  const valor = voz.transcricao || texto;
  const pronto = valor.trim().length >= 3;

  return (
    <section
      aria-label="Conversar com o VIVA"
      className="rounded-3xl border border-border-default bg-surface-default p-5 shadow-sm"
    >
      <h2 className="viva-titulo-secao text-text-primary">{rotulo}</h2>
      <p className="mt-2 viva-apoio text-text-secondary">{apoio}</p>

      <label htmlFor="campo-agente" className="sr-only">
        Escreva o que você precisa
      </label>
      <textarea
        id="campo-agente"
        rows={3}
        value={valor}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
          voz.escrever(e.target.value);
          setTexto(e.target.value);
        }}
        placeholder="Uma frase basta."
        className="mt-4 w-full rounded-2xl border border-input bg-surface-muted px-4 py-3 viva-texto text-text-primary placeholder:text-text-secondary"
      />

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {voz.estado === "ouvindo" ? (
          <Botao variante="secundario" tamanho="compacto" icone={Square} onClick={voz.parar}>
            Parar de ouvir
          </Botao>
        ) : (
          <Botao
            variante="secundario"
            tamanho="compacto"
            icone={voz.suportado ? Mic : MicOff}
            onClick={voz.ouvir}
            disabled={!voz.suportado}
          >
            Falar
          </Botao>
        )}

        <Botao
          variante="secundario"
          tamanho="compacto"
          icone={Paperclip}
          onClick={() =>
            setAnexos((a) => [...a, `Anotação ${a.length + 1} (demonstrativa, fica neste aparelho)`])
          }
        >
          Anexar
        </Botao>

        <Botao
          variante="principal"
          tamanho="compacto"
          icone={Send}
          iconePosicao="fim"
          disabled={!pronto}
          onClick={() => {
            onEnviar(valor.trim());
            setTexto("");
            voz.cancelar();
          }}
        >
          Continuar
        </Botao>
      </div>

      {voz.estado === "ouvindo" ? (
        <p role="status" className="mt-3 viva-apoio text-destaque-texto">
          Estou ouvindo. Fale no seu ritmo — pode pausar quando quiser.
        </p>
      ) : null}

      {!voz.suportado ? (
        <Nota>
          Este navegador não oferece reconhecimento de fala. Escrever funciona do mesmo jeito.
        </Nota>
      ) : null}

      {voz.mensagemDeErro ? (
        <p role="alert" className="mt-3 viva-apoio text-text-primary">
          {voz.mensagemDeErro}
        </p>
      ) : null}

      {anexos.length > 0 ? (
        <ul className="mt-3 space-y-1 viva-legenda text-text-secondary">
          {anexos.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      ) : null}

      <div className="mt-5">
        <p className="viva-legenda text-text-secondary">Exemplos, se ajudar a começar:</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {exemplosDeIntencao.map((exemplo) => (
            <li key={exemplo}>
              <button
                type="button"
                onClick={() => {
                  voz.escrever(exemplo);
                  setTexto(exemplo);
                }}
                className="viva-tap min-h-11 rounded-full border border-border-default px-4 viva-legenda text-text-primary"
              >
                {exemplo}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
