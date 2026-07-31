/**
 * Acesso server-only ao conector Google Maps Platform.
 *
 * Nenhuma chamada de Places (New), Geocoding ou Routes acontece no navegador:
 * tudo passa pelo gateway, com as credenciais lidas apenas aqui
 * (documentos 03, 15 e 16 — dados mínimos e nada de segredo no cliente).
 */
const GATEWAY = "https://connector-gateway.lovable.dev/google_maps";

export type LugarEscolhido = {
  placeId: string;
  nome: string;
  endereco: string;
  latitude: number;
  longitude: number;
  tipos: string[];
  foto?: string | null;
};

function credenciais() {
  const lovable = process.env.LOVABLE_API_KEY;
  const conexao = process.env.GOOGLE_MAPS_API_KEY;
  if (!lovable || !conexao) {
    throw new Error("mapas_indisponiveis");
  }
  return { lovable, conexao };
}

async function chamar(
  caminho: string,
  init: { method?: string; body?: unknown; headers?: Record<string, string> } = {},
) {
  const { lovable, conexao } = credenciais();
  const resposta = await fetch(`${GATEWAY}${caminho}`, {
    method: init.method ?? "GET",
    headers: {
      Authorization: `Bearer ${lovable}`,
      "X-Connection-Api-Key": conexao,
      "Content-Type": "application/json",
      ...init.headers,
    },
    body: init.body ? JSON.stringify(init.body) : undefined,
  });

  if (resposta.status === 403) {
    const detalhes: Array<{ reason?: string }> =
      (await resposta.json().catch(() => null))?.error?.details ?? [];
    const razao = detalhes.find((d) => d.reason)?.reason;
    if (razao === "API_KEY_HTTP_REFERRER_BLOCKED") {
      throw new Error(
        "A chave de servidor do Google Maps está restrita por referenciador. No Google Cloud Console, defina as restrições de aplicativo da chave de servidor como \"Nenhuma\" ou \"Endereços IP\".",
      );
    }
    if (razao === "API_KEY_SERVICE_BLOCKED") {
      throw new Error(
        "A chave de servidor do Google Maps não permite esta API. No Google Cloud Console, adicione esta API à lista de APIs permitidas da chave.",
      );
    }
    throw new Error("O Google Maps recusou a solicitação (403). Verifique as restrições da chave.");
  }

  if (!resposta.ok) {
    const corpo = await resposta.text();
    console.error(`[mapas] falha ${resposta.status}: ${corpo.slice(0, 400)}`);
    throw new Error(`mapas_falha_${resposta.status}`);
  }

  return resposta.json();
}

/* ------------------------------------------------------------------ */
/* Places (New)                                                        */
/* ------------------------------------------------------------------ */

export async function buscarLugares(texto: string, proximo?: { lat: number; lng: number }) {
  const corpo: Record<string, unknown> = { textQuery: texto, languageCode: "pt-BR", maxResultCount: 8 };
  if (proximo) {
    corpo.locationBias = {
      circle: { center: { latitude: proximo.lat, longitude: proximo.lng }, radius: 20000 },
    };
  }
  const dados = await chamar("/places/v1/places:searchText", {
    method: "POST",
    body: corpo,
    headers: {
      "X-Goog-FieldMask":
        "places.id,places.displayName,places.formattedAddress,places.location,places.types",
    },
  });
  const lugares = (dados?.places ?? []) as Array<Record<string, any>>;
  // Guardamos só o necessário para o percurso (nada de cópia integral da API).
  return lugares.map<LugarEscolhido>((p) => ({
    placeId: p.id,
    nome: p.displayName?.text ?? p.formattedAddress ?? "Local",
    endereco: p.formattedAddress ?? "",
    latitude: p.location?.latitude ?? 0,
    longitude: p.location?.longitude ?? 0,
    tipos: (p.types ?? []).slice(0, 4),
  }));
}

export async function detalhesDoLugar(placeId: string) {
  const dados = await chamar(`/places/v1/places/${encodeURIComponent(placeId)}?languageCode=pt-BR`, {
    headers: { "X-Goog-FieldMask": "id,displayName,formattedAddress,location,types,photos" },
  });
  const foto = dados?.photos?.[0]?.name ?? null;
  return {
    placeId: dados.id,
    nome: dados.displayName?.text ?? dados.formattedAddress ?? "Local",
    endereco: dados.formattedAddress ?? "",
    latitude: dados.location?.latitude ?? 0,
    longitude: dados.location?.longitude ?? 0,
    tipos: (dados.types ?? []).slice(0, 4),
    foto,
  } satisfies LugarEscolhido;
}

/* ------------------------------------------------------------------ */
/* Geocodificação                                                      */
/* ------------------------------------------------------------------ */

export type ResultadoGeocodificacao = {
  endereco: string;
  latitude: number;
  longitude: number;
  placeId?: string;
  parcial: boolean;
};

export async function geocodificar(endereco: string) {
  const dados = await chamar(
    `/maps/api/geocode/json?language=pt-BR&region=br&address=${encodeURIComponent(endereco)}`,
  );
  if (dados.status === "ZERO_RESULTS") return [] as ResultadoGeocodificacao[];
  if (dados.status !== "OK") throw new Error(`geocodificacao_${dados.status}`);
  return (dados.results as Array<Record<string, any>>)
    .slice(0, 5)
    .map<ResultadoGeocodificacao>((r) => ({
      endereco: r.formatted_address,
      latitude: r.geometry?.location?.lat ?? 0,
      longitude: r.geometry?.location?.lng ?? 0,
      placeId: r.place_id,
      parcial: Boolean(r.partial_match),
    }));
}

export async function geocodificarInverso(lat: number, lng: number) {
  const dados = await chamar(`/maps/api/geocode/json?language=pt-BR&latlng=${lat},${lng}`);
  if (dados.status === "ZERO_RESULTS") return null;
  if (dados.status !== "OK") throw new Error(`geocodificacao_${dados.status}`);
  const primeiro = dados.results?.[0];
  if (!primeiro) return null;
  return {
    endereco: primeiro.formatted_address as string,
    latitude: lat,
    longitude: lng,
    placeId: primeiro.place_id as string,
    parcial: false,
  } satisfies ResultadoGeocodificacao;
}

/* ------------------------------------------------------------------ */
/* Routes API                                                          */
/* ------------------------------------------------------------------ */

export type ModoDeDeslocamento = "caminhada" | "carro" | "transporte";

const modos: Record<ModoDeDeslocamento, string> = {
  caminhada: "WALK",
  carro: "DRIVE",
  transporte: "TRANSIT",
};

export type Rota = {
  modo: ModoDeDeslocamento;
  duracaoMinutos: number;
  distanciaMetros: number;
  etapas: { instrucao: string; distanciaMetros: number }[];
  aviso?: string;
};

export async function calcularRota(
  origem: { lat: number; lng: number },
  destino: { lat: number; lng: number },
  modo: ModoDeDeslocamento,
) {
  const dados = await chamar("/routes/directions/v2:computeRoutes", {
    method: "POST",
    body: {
      origin: { location: { latLng: { latitude: origem.lat, longitude: origem.lng } } },
      destination: { location: { latLng: { latitude: destino.lat, longitude: destino.lng } } },
      travelMode: modos[modo],
      languageCode: "pt-BR",
      units: "METRIC",
      computeAlternativeRoutes: false,
    },
    headers: {
      "X-Goog-FieldMask":
        "routes.duration,routes.distanceMeters,routes.legs.steps.navigationInstruction,routes.legs.steps.distanceMeters",
    },
  });

  const rota = dados?.routes?.[0];
  if (!rota) {
    return {
      modo,
      duracaoMinutos: 0,
      distanciaMetros: 0,
      etapas: [],
      aviso: "Não foi possível calcular este trajeto agora. O percurso continua sem ele.",
    } satisfies Rota;
  }

  const segundos = Number(String(rota.duration ?? "0s").replace("s", ""));
  const passos = (rota.legs?.[0]?.steps ?? []) as Array<Record<string, any>>;
  return {
    modo,
    duracaoMinutos: Math.round(segundos / 60),
    distanciaMetros: rota.distanceMeters ?? 0,
    etapas: passos
      .filter((p) => p.navigationInstruction?.instructions)
      .slice(0, 20)
      .map((p) => ({
        instrucao: p.navigationInstruction.instructions as string,
        distanciaMetros: p.distanceMeters ?? 0,
      })),
  } satisfies Rota;
}
