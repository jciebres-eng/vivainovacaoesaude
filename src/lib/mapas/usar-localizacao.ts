/**
 * Localização, sempre por escolha.
 *
 * Nada começa sozinho: a leitura só acontece quando a pessoa pede, e para
 * quando ela pede (documentos 03, 15 e 16). Se a permissão for negada, a
 * experiência continua por descrição de lugar, sem insistência.
 */
import { useCallback, useEffect, useRef, useState } from "react";

export type PontoAtual = { latitude: number; longitude: number; accuracy?: number; em: string };

export type SituacaoDaLocalizacao =
  | "desligada"
  | "pedindo"
  | "ligada"
  | "negada"
  | "indisponivel";

export function useLocalizacao() {
  const [situacao, setSituacao] = useState<SituacaoDaLocalizacao>("desligada");
  const [ponto, setPonto] = useState<PontoAtual | null>(null);
  const vigia = useRef<number | null>(null);

  const parar = useCallback(() => {
    if (vigia.current != null) {
      navigator.geolocation.clearWatch(vigia.current);
      vigia.current = null;
    }
    setSituacao("desligada");
    setPonto(null);
  }, []);

  const comecar = useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setSituacao("indisponivel");
      return;
    }
    setSituacao("pedindo");
    vigia.current = navigator.geolocation.watchPosition(
      (posicao) => {
        setSituacao("ligada");
        setPonto({
          latitude: posicao.coords.latitude,
          longitude: posicao.coords.longitude,
          accuracy: posicao.coords.accuracy,
          em: new Date().toISOString(),
        });
      },
      (erro) => {
        setSituacao(erro.code === erro.PERMISSION_DENIED ? "negada" : "indisponivel");
      },
      { enableHighAccuracy: true, maximumAge: 15_000, timeout: 20_000 },
    );
  }, []);

  useEffect(() => () => {
    if (vigia.current != null) navigator.geolocation.clearWatch(vigia.current);
  }, []);

  return { situacao, ponto, comecar, parar };
}

/** Leitura única, para preencher "onde estou agora" em um campo de lugar. */
export function pontoUnico(): Promise<PontoAtual | null> {
  if (typeof navigator === "undefined" || !navigator.geolocation) return Promise.resolve(null);
  return new Promise((resolver) => {
    navigator.geolocation.getCurrentPosition(
      (posicao) =>
        resolver({
          latitude: posicao.coords.latitude,
          longitude: posicao.coords.longitude,
          accuracy: posicao.coords.accuracy,
          em: new Date().toISOString(),
        }),
      () => resolver(null),
      { enableHighAccuracy: false, timeout: 12_000 },
    );
  });
}
