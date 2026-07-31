/**
 * Camada de busca de lugares, endereços e coordenadas.
 *
 * Regras (documentos 03, 05, 15, 19):
 * - a interface fala com estes contratos, nunca com um serviço concreto;
 * - sem chave configurada, o VIVA continua funcionando em Modo Demonstrativo
 *   e diz isso à pessoa em todas as telas;
 * - endereço postal e coordenada geográfica não são a mesma coisa: um CEP
 *   nunca define o ponto exato;
 * - nada é consultado antes de a pessoa digitar ou tocar.
 */
import type { Coordenada, OrigemDoDado, RespostaDoProvedor } from "./tipos";

export type CategoriaDeLugar =
  | "mercado"
  | "farmacia"
  | "hospital"
  | "estacao"
  | "universidade"
  | "hotel"
  | "trabalho"
  | "casa"
  | "endereco"
  | "outro";

export type Sugestao = {
  id: string;
  /** Place ID quando o provedor real está ativo. */
  placeId?: string;
  nome: string;
  endereco: string;
  bairroOuCidade: string;
  categoria: CategoriaDeLugar;
  latitude?: number;
  longitude?: number;
  distanciaEmMetros?: number;
  /** Trecho do texto digitado que corresponde ao resultado. */
  correspondencia?: string;
};

export type LocalConfirmado = {
  nome: string;
  enderecoFormatado: string;
  componentes: {
    logradouro?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;
    cep?: string;
  };
  latitude: number;
  longitude: number;
  placeId?: string;
  origem: OrigemDoDado;
  precisao: "exata" | "aproximada" | "apenas-postal";
};

export type EnderecoPostal = {
  cep: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
};

export type PlaceSearchProvider = {
  nome: string;
  autocompletar(
    consulta: string,
    contexto?: { centro?: Coordenada; sessao?: string },
  ): Promise<RespostaDoProvedor<Sugestao[]>>;
  detalhes(sugestao: Sugestao): Promise<RespostaDoProvedor<LocalConfirmado | null>>;
  geocodificarReverso(coordenada: Coordenada): Promise<RespostaDoProvedor<LocalConfirmado | null>>;
};

export type PostalAddressResolver = {
  nome: string;
  resolver(cep: string): Promise<RespostaDoProvedor<EnderecoPostal | null>>;
};

/* --------------------------------------------------------------- utilidades */

export function apenasDigitos(texto: string) {
  return texto.replace(/\D+/g, "");
}

/** Oito dígitos: o texto digitado é um CEP. */
export function pareceCep(texto: string) {
  return apenasDigitos(texto).length === 8;
}

export function formatarCep(texto: string) {
  const d = apenasDigitos(texto).slice(0, 8);
  return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d;
}

export function distanciaEmMetros(a: Coordenada, b: Coordenada) {
  const R = 6371000;
  const dLat = ((b.latitude - a.latitude) * Math.PI) / 180;
  const dLon = ((b.longitude - a.longitude) * Math.PI) / 180;
  const lat1 = (a.latitude * Math.PI) / 180;
  const lat2 = (b.latitude * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(h)));
}

function semAcento(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

/* ----------------------------------------------------- catálogo fictício */

type LugarDemo = Sugestao & { latitude: number; longitude: number };

const catalogo: LugarDemo[] = [
  {
    id: "demo-mercado-vila",
    nome: "Mercado da Vila",
    endereco: "Av. Getúlio Vargas, 5522",
    bairroOuCidade: "Centro, Canoas",
    categoria: "mercado",
    latitude: -29.9177,
    longitude: -51.1834,
  },
  {
    id: "demo-mercado-bairro",
    nome: "Mercado do Bairro",
    endereco: "R. das Acácias, 240",
    bairroOuCidade: "Marechal Rondon, Canoas",
    categoria: "mercado",
    latitude: -29.9245,
    longitude: -51.1755,
  },
  {
    id: "demo-universidade-lasalle",
    nome: "Universidade La Salle",
    endereco: "Av. Victor Barreto, 2288",
    bairroOuCidade: "Centro, Canoas",
    categoria: "universidade",
    latitude: -29.9188,
    longitude: -51.1809,
  },
  {
    id: "demo-hotel-umbu",
    nome: "Hotel Umbu",
    endereco: "Av. Farrapos, 292",
    bairroOuCidade: "Floresta, Porto Alegre",
    categoria: "hotel",
    latitude: -30.0212,
    longitude: -51.2126,
  },
  {
    id: "demo-estacao-centro",
    nome: "Estação Central",
    endereco: "Largo Vespasiano Julio Veppo",
    bairroOuCidade: "Centro Histórico, Porto Alegre",
    categoria: "estacao",
    latitude: -30.0246,
    longitude: -51.2216,
  },
  {
    id: "demo-farmacia-24h",
    nome: "Farmácia 24 horas",
    endereco: "R. Sete de Setembro, 118",
    bairroOuCidade: "Centro, Canoas",
    categoria: "farmacia",
    latitude: -29.9199,
    longitude: -51.1841,
  },
  {
    id: "demo-hospital-municipal",
    nome: "Hospital Municipal",
    endereco: "Av. Guilherme Schell, 6750",
    bairroOuCidade: "Centro, Canoas",
    categoria: "hospital",
    latitude: -29.9163,
    longitude: -51.1866,
  },
  {
    id: "demo-trabalho",
    nome: "Meu trabalho",
    endereco: "R. dos Andradas, 1234",
    bairroOuCidade: "Centro Histórico, Porto Alegre",
    categoria: "trabalho",
    latitude: -30.0289,
    longitude: -51.2287,
  },
  {
    id: "demo-casa",
    nome: "Minha casa",
    endereco: "R. Ipiranga, 55",
    bairroOuCidade: "Igara, Canoas",
    categoria: "casa",
    latitude: -29.9331,
    longitude: -51.1602,
  },
];

const avisoDemo =
  "Resultado demonstrativo. Nenhum serviço externo foi consultado e nenhum endereço real foi usado.";

export const provedorDeLugaresDemo: PlaceSearchProvider = {
  nome: "Catálogo demonstrativo",
  async autocompletar(consulta, contexto) {
    const texto = semAcento(consulta.trim());
    if (texto.length < 2) {
      return { dados: [], origem: "demonstrativo", provedor: this.nome };
    }

    if (pareceCep(texto)) {
      const cep = formatarCep(texto);
      return {
        dados: [
          {
            id: `cep-${cep}`,
            nome: `CEP ${cep}`,
            endereco: "Confirmar número e complemento",
            bairroOuCidade: "Consulta postal demonstrativa",
            categoria: "endereco",
            correspondencia: cep,
          },
        ],
        origem: "demonstrativo",
        provedor: this.nome,
        aviso: avisoDemo,
      };
    }

    const encontrados = catalogo
      .filter((l) => {
        const alvo = semAcento(`${l.nome} ${l.endereco} ${l.bairroOuCidade} ${l.categoria}`);
        return texto.split(/\s+/).some((parte) => parte.length > 1 && alvo.includes(parte));
      })
      .map((l) => ({
        ...l,
        correspondencia: consulta.trim(),
        distanciaEmMetros: contexto?.centro
          ? distanciaEmMetros(contexto.centro, { latitude: l.latitude, longitude: l.longitude })
          : undefined,
      }));

    const lista: Sugestao[] = encontrados.length
      ? encontrados
      : [
          {
            id: `texto-${texto.slice(0, 24)}`,
            nome: consulta.trim(),
            endereco: "Usar exatamente como você escreveu",
            bairroOuCidade: "Ponto de referência informado por você",
            categoria: "outro" as CategoriaDeLugar,
            latitude: (contexto?.centro?.latitude ?? -29.92) + 0.004,
            longitude: (contexto?.centro?.longitude ?? -51.18) + 0.004,
            correspondencia: consulta.trim(),
          },
        ];

    lista.sort((a, b) => (a.distanciaEmMetros ?? 0) - (b.distanciaEmMetros ?? 0));
    return { dados: lista.slice(0, 6), origem: "demonstrativo", provedor: this.nome, aviso: avisoDemo }; // prettier-ignore
  },

  async detalhes(sugestao) {
    const base = catalogo.find((l) => l.id === sugestao.id);
    const lat = base?.latitude ?? sugestao.latitude ?? -29.92;
    const lon = base?.longitude ?? sugestao.longitude ?? -51.18;
    return {
      dados: {
        nome: sugestao.nome,
        enderecoFormatado: `${sugestao.endereco} — ${sugestao.bairroOuCidade}`,
        componentes: {
          logradouro: sugestao.endereco,
          bairro: sugestao.bairroOuCidade.split(",")[0]?.trim(),
          cidade: sugestao.bairroOuCidade.split(",")[1]?.trim(),
          estado: "RS",
        },
        latitude: lat,
        longitude: lon,
        origem: "demonstrativo",
        precisao: base ? "exata" : "aproximada",
      },
      origem: "demonstrativo",
      provedor: this.nome,
      aviso: avisoDemo,
    };
  },

  async geocodificarReverso(coordenada) {
    const perto = [...catalogo].sort(
      (a, b) =>
        distanciaEmMetros(coordenada, { latitude: a.latitude, longitude: a.longitude }) -
        distanciaEmMetros(coordenada, { latitude: b.latitude, longitude: b.longitude }),
    )[0];
    const metros = distanciaEmMetros(coordenada, {
      latitude: perto.latitude,
      longitude: perto.longitude,
    });
    return {
      dados: {
        nome: metros < 250 ? perto.nome : "Ponto escolhido no mapa",
        enderecoFormatado:
          metros < 250
            ? `${perto.endereco} — ${perto.bairroOuCidade}`
            : `Próximo de ${perto.nome} — ${perto.bairroOuCidade}`,
        componentes: {
          logradouro: perto.endereco,
          bairro: perto.bairroOuCidade.split(",")[0]?.trim(),
          cidade: perto.bairroOuCidade.split(",")[1]?.trim(),
          estado: "RS",
        },
        latitude: coordenada.latitude,
        longitude: coordenada.longitude,
        origem: "demonstrativo",
        precisao: metros < 250 ? "exata" : "aproximada",
      },
      origem: "demonstrativo",
      provedor: this.nome,
      aviso: avisoDemo,
    };
  },
};

/* ----------------------------------------------------- provedores postais */

export const provedorPostalDemo: PostalAddressResolver = {
  nome: "Consulta postal demonstrativa",
  async resolver(cep) {
    const limpo = apenasDigitos(cep);
    if (limpo.length !== 8) {
      return { dados: null, origem: "demonstrativo", provedor: this.nome, aviso: "CEP incompleto." }; // prettier-ignore
    }
    const referencia = catalogo[Number(limpo.slice(-1)) % catalogo.length];
    return {
      dados: {
        cep: formatarCep(limpo),
        logradouro: referencia.endereco.replace(/,.*$/, ""),
        bairro: referencia.bairroOuCidade.split(",")[0]?.trim() ?? "Centro",
        cidade: referencia.bairroOuCidade.split(",")[1]?.trim() ?? "Canoas",
        estado: "RS",
      },
      origem: "demonstrativo",
      provedor: this.nome,
      aviso: `${avisoDemo} O CEP indica a via, nunca o ponto exato: confirme número e complemento.`,
    };
  },
};

/** ViaCEP: usado só quando a pessoa digita oito dígitos. Sem chave. */
export const provedorViaCep: PostalAddressResolver = {
  nome: "ViaCEP",
  async resolver(cep) {
    const limpo = apenasDigitos(cep);
    if (limpo.length !== 8) {
      return { dados: null, origem: "externo", provedor: this.nome, aviso: "CEP incompleto." };
    }
    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${limpo}/json/`);
      if (!resposta.ok) throw new Error(`ViaCEP respondeu ${resposta.status}`);
      const corpo = (await resposta.json()) as Record<string, string> & { erro?: boolean };
      if (corpo.erro) {
        return {
          dados: null,
          origem: "externo",
          provedor: this.nome,
          aviso: "Este CEP não foi encontrado. Você pode escolher o ponto no mapa.",
        };
      }
      return {
        dados: {
          cep: formatarCep(corpo.cep ?? limpo),
          logradouro: corpo.logradouro ?? "",
          bairro: corpo.bairro ?? "",
          cidade: corpo.localidade ?? "",
          estado: corpo.uf ?? "",
        },
        origem: "externo",
        provedor: this.nome,
        aviso: "O CEP indica a via, nunca o ponto exato: confirme número e complemento.",
      };
    } catch {
      return provedorPostalDemo.resolver(cep);
    }
  },
};

/**
 * Correios (Busca CEP): integração opcional, dependente de contrato comercial.
 * Enquanto não houver credencial, cai no provedor demonstrativo — nunca
 * afirmamos integração real sem ela.
 */
export const provedorCorreios: PostalAddressResolver = {
  nome: "Correios (contrato comercial)",
  async resolver(cep) {
    const credencial = (import.meta.env as Record<string, string | undefined>)
      .VITE_CORREIOS_TOKEN;
    if (!credencial) return provedorViaCep.resolver(cep);
    return provedorViaCep.resolver(cep);
  },
};

/* --------------------------------------------------- Google Places (novo) */

function chaveDoGoogle() {
  const ambiente = import.meta.env as Record<string, string | undefined>;
  return (
    ambiente.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY ??
    ambiente.VITE_GOOGLE_MAPS_BROWSER_KEY ??
    ambiente.VITE_MAPS_API_KEY ??
    ""
  ).trim();
}

export function buscaDeLugaresEhReal() {
  return chaveDoGoogle().length > 0;
}

/**
 * Places API (New) — Autocomplete Data API, para desenhar as sugestões com a
 * identidade do VIVA em vez de uma lista pronta do provedor.
 */
export const provedorDeLugaresGoogle: PlaceSearchProvider = {
  nome: "Google Places (New)",
  async autocompletar(consulta, contexto) {
    const chave = chaveDoGoogle();
    if (!chave || consulta.trim().length < 3) {
      return provedorDeLugaresDemo.autocompletar(consulta, contexto);
    }
    try {
      const resposta = await fetch("https://places.googleapis.com/v1/places:autocomplete", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Goog-Api-Key": chave },
        body: JSON.stringify({
          input: consulta,
          languageCode: "pt-BR",
          regionCode: "BR",
          sessionToken: contexto?.sessao,
          ...(contexto?.centro
            ? {
                locationBias: {
                  circle: {
                    center: {
                      latitude: contexto.centro.latitude,
                      longitude: contexto.centro.longitude,
                    },
                    radius: 20000,
                  },
                },
              }
            : {}),
        }),
      });
      if (!resposta.ok) throw new Error(`Places respondeu ${resposta.status}`);
      const corpo = (await resposta.json()) as {
        suggestions?: {
          placePrediction?: {
            placeId: string;
            text?: { text?: string };
            structuredFormat?: { mainText?: { text?: string }; secondaryText?: { text?: string } };
            types?: string[];
          };
        }[];
      };
      const dados: Sugestao[] = (corpo.suggestions ?? [])
        .map((s) => s.placePrediction)
        .filter(Boolean)
        .map((p) => ({
          id: p!.placeId,
          placeId: p!.placeId,
          nome: p!.structuredFormat?.mainText?.text ?? p!.text?.text ?? consulta,
          endereco: p!.structuredFormat?.secondaryText?.text ?? "",
          bairroOuCidade: p!.structuredFormat?.secondaryText?.text ?? "",
          categoria: categoriaPorTipos(p!.types ?? []),
          correspondencia: consulta.trim(),
        }));
      return { dados, origem: "externo", provedor: this.nome };
    } catch {
      return provedorDeLugaresDemo.autocompletar(consulta, contexto);
    }
  },

  async detalhes(sugestao) {
    const chave = chaveDoGoogle();
    if (!chave || !sugestao.placeId) return provedorDeLugaresDemo.detalhes(sugestao);
    try {
      const resposta = await fetch(
        `https://places.googleapis.com/v1/places/${sugestao.placeId}`,
        {
          headers: {
            "X-Goog-Api-Key": chave,
            "X-Goog-FieldMask":
              "id,displayName,formattedAddress,location,addressComponents,shortFormattedAddress",
          },
        },
      );
      if (!resposta.ok) throw new Error(`Place Details respondeu ${resposta.status}`);
      const corpo = (await resposta.json()) as {
        id: string;
        displayName?: { text?: string };
        formattedAddress?: string;
        location?: { latitude: number; longitude: number };
        addressComponents?: { types: string[]; longText: string }[];
      };
      const comp = (tipo: string) =>
        corpo.addressComponents?.find((c) => c.types.includes(tipo))?.longText;
      return {
        dados: {
          nome: corpo.displayName?.text ?? sugestao.nome,
          enderecoFormatado: corpo.formattedAddress ?? sugestao.endereco,
          componentes: {
            logradouro: comp("route"),
            numero: comp("street_number"),
            bairro: comp("sublocality_level_1") ?? comp("sublocality"),
            cidade: comp("administrative_area_level_2") ?? comp("locality"),
            estado: comp("administrative_area_level_1"),
            cep: comp("postal_code"),
          },
          latitude: corpo.location?.latitude ?? 0,
          longitude: corpo.location?.longitude ?? 0,
          placeId: corpo.id,
          origem: "externo",
          precisao: "exata",
        },
        origem: "externo",
        provedor: this.nome,
      };
    } catch {
      return provedorDeLugaresDemo.detalhes(sugestao);
    }
  },

  async geocodificarReverso(coordenada) {
    const chave = chaveDoGoogle();
    if (!chave) return provedorDeLugaresDemo.geocodificarReverso(coordenada);
    try {
      const url = new URL("https://maps.googleapis.com/maps/api/geocode/json");
      url.searchParams.set("latlng", `${coordenada.latitude},${coordenada.longitude}`);
      url.searchParams.set("language", "pt-BR");
      url.searchParams.set("key", chave);
      const resposta = await fetch(url.toString());
      if (!resposta.ok) throw new Error(`Geocoding respondeu ${resposta.status}`);
      const corpo = (await resposta.json()) as {
        results?: { formatted_address?: string; place_id?: string }[];
        status?: string;
      };
      const primeiro = corpo.results?.[0];
      if (!primeiro) return provedorDeLugaresDemo.geocodificarReverso(coordenada);
      return {
        dados: {
          nome: "Ponto escolhido no mapa",
          enderecoFormatado: primeiro.formatted_address ?? "",
          componentes: {},
          latitude: coordenada.latitude,
          longitude: coordenada.longitude,
          placeId: primeiro.place_id,
          origem: "externo",
          precisao: "aproximada",
        },
        origem: "externo",
        provedor: this.nome,
      };
    } catch {
      return provedorDeLugaresDemo.geocodificarReverso(coordenada);
    }
  },
};

function categoriaPorTipos(tipos: string[]): CategoriaDeLugar {
  if (tipos.some((t) => t.includes("supermarket") || t.includes("grocery"))) return "mercado";
  if (tipos.includes("pharmacy")) return "farmacia";
  if (tipos.includes("hospital")) return "hospital";
  if (tipos.some((t) => t.includes("transit") || t.includes("station"))) return "estacao";
  if (tipos.includes("university") || tipos.includes("school")) return "universidade";
  if (tipos.includes("lodging")) return "hotel";
  if (tipos.includes("street_address") || tipos.includes("premise")) return "endereco";
  return "outro";
}

/* ---------------------------------------------------------------- registro */

export function buscaDeLugares(): PlaceSearchProvider {
  return buscaDeLugaresEhReal() ? provedorDeLugaresGoogle : provedorDeLugaresDemo;
}

export function resolvedorPostal(): PostalAddressResolver {
  const ambiente = import.meta.env as Record<string, string | undefined>;
  if (ambiente.VITE_CORREIOS_TOKEN) return provedorCorreios;
  if (ambiente.VITE_POSTAL_PROVIDER === "demo") return provedorPostalDemo;
  return provedorViaCep;
}

/** Centro usado quando ainda não há localização autorizada. */
export const centroDemonstrativo: Coordenada = { latitude: -29.9188, longitude: -51.1809 };
