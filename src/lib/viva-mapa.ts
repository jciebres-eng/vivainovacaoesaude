/**
 * Mapas — representação simplificada por pontos de referência.
 *
 * O VIVA não rastreia ninguém e não usa mapas em tempo real neste protótipo.
 * Quando a pessoa quiser um mapa real, oferecemos a abertura do Google Maps
 * em outra aba, por ação explícita (documentos 03 e 15).
 */

export type MeioParaMapa = "a-pe" | "onibus" | "metro" | "carro" | "aplicativo" | "sem-deslocamento";

const modo: Record<MeioParaMapa, string> = {
  "a-pe": "walking",
  onibus: "transit",
  metro: "transit",
  carro: "driving",
  aplicativo: "driving",
  "sem-deslocamento": "walking",
};

/** Monta o link de rota do Google Maps. Nada é aberto sem uma ação da pessoa. */
export function linkDeRota({
  origem,
  destino,
  meio = "a-pe",
}: {
  origem: string;
  destino: string;
  meio?: MeioParaMapa;
}) {
  const params = new URLSearchParams({
    api: "1",
    origin: origem,
    destination: destino,
    travelmode: modo[meio],
  });
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

/** Link de busca por um ponto de referência isolado. */
export function linkDeLocal(local: string) {
  const params = new URLSearchParams({ api: "1", query: local });
  return `https://www.google.com/maps/search/?${params.toString()}`;
}

/** Soma dos minutos previstos, apresentada como aproximação — nunca como meta. */
export function tempoAproximado(minutos: number[]) {
  const total = minutos.reduce((soma, m) => soma + m, 0);
  if (total < 60) return `cerca de ${total} minutos`;
  const horas = Math.floor(total / 60);
  const resto = total % 60;
  if (resto === 0) return `cerca de ${horas} hora${horas > 1 ? "s" : ""}`;
  return `cerca de ${horas}h${String(resto).padStart(2, "0")}`;
}
