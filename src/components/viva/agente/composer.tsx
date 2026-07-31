import { MapPin, Mic, MicOff, Paperclip, Send, Square } from "lucide-react";
import { useRef, useState, type ChangeEvent } from "react";

import { Botao, Nota } from "@/components/ds";
import { useAgente } from "@/lib/viva-agente";
import { useEscutaDeVoz } from "@/lib/viva-voz";
import { exemplosDeIntencao } from "@/lib/viva-situacoes";
import { OndasDaFala } from "./avatar";

/**
 * AgentComposer — um único lugar para dizer o que se precisa.
 *
 * Falar, escrever, anexar, usar a localização ou tocar em um exemplo levam
 * exatamente ao mesmo lugar. O microfone e a localização só ligam por ação da
 * pessoa, nada é gravado e nada sai deste aparelho (documentos 03, 04, 15, 19).
 */
type Anexo = { id: string; nome: string; tipo: string };

export function CampoDoAgente({
  onEnviar,
  rotulo = "Como posso ajudar hoje?",
  apoio = "Fale, escreva, anexe ou toque em um exemplo. Uma frase basta.",
}: {
  onEnviar: (texto: string) => void;
  rotulo?: string;
  apoio?: string;
}) {
  const voz = useEscutaDeVoz();
  const agente = useAgente();
  const [texto, setTexto] = useState("");
  const [anexos, setAnexos] = useState<Anexo[]>([]);
  const [local, setLocal] = useState<string | null>(null);
  const [avisoDeLocal, setAvisoDeLocal] = useState<string | null>(null);
  const arquivoRef = useRef<HTMLInputElement>(null);
  const valor = voz.transcricao || texto;
  const pronto = valor.trim().length >= 3;
  const ouvindo = voz.estado === "ouvindo";

  function escrever(novo: string) {
    voz.escrever(novo);
    setTexto(novo);
  }

  function pedirLocalizacao() {
    setAvisoDeLocal(null);
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setAvisoDeLocal("Este aparelho não oferece localização. Você pode escrever o endereço.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setLocal(
          `Ponto atual aproximado (${p.coords.latitude.toFixed(2)}, ${p.coords.longitude.toFixed(2)})`,
        );
      },
      () =>
        setAvisoDeLocal(
          "A localização não foi liberada. Você pode escrever o endereço ou o ponto de referência.",
        ),
      { enableHighAccuracy: false, timeout: 8000 },
    );
  }

  return (
    <section
      aria-label="Conversar com o VIVA"
      className="rounded-3xl border border-border-default bg-surface-default p-5 shadow-suave"
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
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => escrever(e.target.value)}
        onFocus={() => agente.irPara("aguardando-decisao")}
        placeholder="Por exemplo: quero ir ao mercado."
        className="mt-4 w-full rounded-2xl border border-input bg-surface-muted px-4 py-3 viva-texto text-text-primary placeholder:text-text-secondary"
      />

      {voz.transcricao && !ouvindo ? (
        <p className="mt-2 viva-legenda text-text-secondary">
          Isto foi o que ouvi. Você pode corrigir o texto antes de continuar.
        </p>
      ) : null}

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {ouvindo ? (
          <Botao
            variante="secundario"
            tamanho="compacto"
            icone={Square}
            onClick={() => {
              voz.parar();
              agente.irPara("interpretando");
            }}
          >
            Parar de ouvir
          </Botao>
        ) : (
          <Botao
            variante="secundario"
            tamanho="compacto"
            icone={voz.suportado ? Mic : MicOff}
            onClick={() => {
              voz.ouvir();
              agente.irPara("ouvindo");
            }}
            disabled={!voz.suportado}
          >
            Falar
          </Botao>
        )}

        <Botao
          variante="secundario"
          tamanho="compacto"
          icone={Paperclip}
          onClick={() => arquivoRef.current?.click()}
        >
          Anexar
        </Botao>
        <input
          ref={arquivoRef}
          type="file"
          className="sr-only"
          aria-label="Anexar arquivo (fica apenas neste aparelho)"
          accept="image/*,application/pdf,audio/*,.txt,.ics"
          onChange={(e) => {
            const arquivo = e.target.files?.[0];
            if (!arquivo) return;
            setAnexos((a) => [
              ...a,
              { id: `${Date.now()}`, nome: arquivo.name, tipo: arquivo.type || "arquivo" },
            ]);
            e.target.value = "";
          }}
        />

        <Botao variante="secundario" tamanho="compacto" icone={MapPin} onClick={pedirLocalizacao}>
          Usar localização
        </Botao>

        <Botao
          variante="principal"
          tamanho="compacto"
          icone={Send}
          iconePosicao="fim"
          disabled={!pronto}
          onClick={() => {
            agente.irPara("interpretando");
            onEnviar(valor.trim());
            setTexto("");
            voz.cancelar();
          }}
        >
          Continuar
        </Botao>
      </div>

      <OndasDaFala ativo={ouvindo} />

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

      {local ? (
        <p className="mt-3 viva-legenda text-text-secondary">
          Ponto de partida: {local}. Ele não é enviado para lugar nenhum.
        </p>
      ) : null}
      {avisoDeLocal ? (
        <p role="status" className="mt-3 viva-legenda text-text-secondary">
          {avisoDeLocal}
        </p>
      ) : null}

      {anexos.length > 0 ? (
        <ul className="mt-3 space-y-1 viva-legenda text-text-secondary" aria-label="Anexos">
          {anexos.map((a) => (
            <li key={a.id}>
              {a.nome} — fica apenas neste aparelho.{" "}
              <button
                type="button"
                onClick={() => setAnexos((lista) => lista.filter((x) => x.id !== a.id))}
                className="underline underline-offset-4"
              >
                Remover
              </button>
            </li>
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
                onClick={() => escrever(exemplo)}
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
