/**
 * Entrada por voz — opcional, sempre com alternativa por toque e teclado.
 *
 * Usa o reconhecimento de fala do próprio navegador (Web Speech API), quando
 * disponível. Nada é enviado para servidores do VIVA: não há gravação, não há
 * armazenamento de áudio e o microfone só é ligado por uma ação da pessoa
 * (documentos 03 e 15).
 */
import { useCallback, useEffect, useRef, useState } from "react";

type EstadoDaEscuta = "inativo" | "pedindo-permissao" | "ouvindo" | "erro" | "indisponivel";

type ReconhecimentoLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((e: unknown) => void) | null;
  onerror: ((e: unknown) => void) | null;
  onend: (() => void) | null;
};

function construtorDeReconhecimento(): (new () => ReconhecimentoLike) | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as Record<string, unknown>;
  return (w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null) as
    | (new () => ReconhecimentoLike)
    | null;
}

export function useEscutaDeVoz() {
  const [estado, setEstado] = useState<EstadoDaEscuta>("inativo");
  const [transcricao, setTranscricao] = useState("");
  const [mensagemDeErro, setMensagemDeErro] = useState<string | null>(null);
  const [suportado, setSuportado] = useState(true);
  const ref = useRef<ReconhecimentoLike | null>(null);

  useEffect(() => {
    setSuportado(Boolean(construtorDeReconhecimento()));
  }, []);

  const parar = useCallback(() => {
    ref.current?.stop();
    ref.current = null;
    setEstado("inativo");
  }, []);

  const cancelar = useCallback(() => {
    ref.current?.abort();
    ref.current = null;
    setTranscricao("");
    setEstado("inativo");
  }, []);

  const ouvir = useCallback(() => {
    const Construtor = construtorDeReconhecimento();
    if (!Construtor) {
      setSuportado(false);
      setEstado("indisponivel");
      return;
    }
    setMensagemDeErro(null);
    setTranscricao("");
    setEstado("pedindo-permissao");

    const r = new Construtor();
    r.lang = "pt-BR";
    r.continuous = false;
    r.interimResults = true;
    r.onresult = (evento: unknown) => {
      const e = evento as { results: ArrayLike<ArrayLike<{ transcript: string }>> };
      let texto = "";
      for (let i = 0; i < e.results.length; i += 1) texto += e.results[i][0].transcript;
      setTranscricao(texto.trim());
    };
    r.onerror = (evento: unknown) => {
      const erro = (evento as { error?: string }).error;
      setMensagemDeErro(
        erro === "not-allowed"
          ? "O microfone não foi liberado. Você pode escrever ou escolher com toques."
          : "Não consegui ouvir agora. Você pode tentar de novo ou escolher com toques.",
      );
      setEstado("erro");
      ref.current = null;
    };
    r.onend = () => {
      ref.current = null;
      setEstado((atual) => (atual === "erro" ? atual : "inativo"));
    };
    ref.current = r;
    try {
      r.start();
      setEstado("ouvindo");
    } catch {
      setEstado("erro");
      setMensagemDeErro("Não consegui abrir o microfone agora.");
    }
  }, []);

  useEffect(() => () => ref.current?.abort(), []);

  return {
    estado,
    suportado,
    transcricao,
    mensagemDeErro,
    ouvir,
    parar,
    cancelar,
    escrever: setTranscricao,
  };
}
