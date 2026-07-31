/** Tipos de lugar, rota e localização compartilhados entre interface e servidor. */

export type LugarEscolhido = {
  placeId: string;
  nome: string;
  endereco: string;
  latitude: number;
  longitude: number;
  tipos: string[];
  foto?: string | null;
};

export type ResultadoGeocodificacao = {
  endereco: string;
  latitude: number;
  longitude: number;
  placeId?: string;
  parcial: boolean;
};

export type ModoDeDeslocamento = "caminhada" | "carro" | "transporte";

export const rotulosDeModo: Record<ModoDeDeslocamento, string> = {
  caminhada: "A pé",
  carro: "De carro",
  transporte: "Transporte público",
};

export type Rota = {
  modo: ModoDeDeslocamento;
  duracaoMinutos: number;
  distanciaMetros: number;
  etapas: { instrucao: string; distanciaMetros: number }[];
  aviso?: string;
};

/** Lugar guardado por quem escreveu com as próprias palavras, sem mapa. */
export type LugarEmPalavras = {
  descricao: string;
  referencia?: string;
};
