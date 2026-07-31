/**
 * Contratos dos provedores externos do VIVA.
 *
 * A aplicação nunca fala com um serviço concreto: fala com estas interfaces.
 * Isso mantém o protótipo funcional sem nenhuma chave de API e permite trocar
 * um provedor demonstrativo por um real sem tocar na interface
 * (documentos 03, 15, 16 e 19).
 */

export type OrigemDoDado = "demonstrativo" | "externo";

export type RespostaDoProvedor<T> = {
  dados: T;
  origem: OrigemDoDado;
  /** Nome legível do provedor, mostrado quando a pessoa pergunta a fonte. */
  provedor: string;
  /** Aviso a exibir junto ao dado, quando houver. */
  aviso?: string;
};

export type Lugar = {
  id: string;
  nome: string;
  categoria: string;
  endereco: string;
  latitude: number;
  longitude: number;
  distanciaEmMetros?: number;
};

export type PlaceProvider = {
  nome: string;
  buscarPorTexto(consulta: string): Promise<RespostaDoProvedor<Lugar[]>>;
  buscarProximos(
    latitude: number,
    longitude: number,
    categoria?: string,
  ): Promise<RespostaDoProvedor<Lugar[]>>;
};

export type PassoDeRota = {
  descricao: string;
  referencia?: string;
  duracaoEmMinutos: number;
};

export type Rota = {
  origem: string;
  destino: string;
  modo: "a-pe" | "transporte-publico" | "carro";
  duracaoEmMinutos: number;
  distanciaEmMetros: number;
  passos: PassoDeRota[];
};

export type RouteProvider = {
  nome: string;
  calcularRota(
    origem: string,
    destino: string,
    modo?: Rota["modo"],
  ): Promise<RespostaDoProvedor<Rota>>;
};

export type MapaEstatico = {
  /** URL de imagem ou `null` quando o mapa é desenhado localmente. */
  imagem: string | null;
  /** Link externo para abrir o mapa completo, sempre com consentimento. */
  linkExterno: string | null;
  descricaoAcessivel: string;
};

export type MapProvider = {
  nome: string;
  mapaDoPercurso(origem: string, destino: string): Promise<RespostaDoProvedor<MapaEstatico>>;
};

export type Endereco = {
  cep: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
};

export type AddressProvider = {
  nome: string;
  buscarPorCep(cep: string): Promise<RespostaDoProvedor<Endereco | null>>;
};

export type Coordenada = { latitude: number; longitude: number; precisaoEmMetros?: number };

export type GeolocationProvider = {
  nome: string;
  disponivel(): boolean;
  /** Só é chamado após ação explícita da pessoa. */
  posicaoAtual(): Promise<RespostaDoProvedor<Coordenada | null>>;
};

export type SpeechProvider = {
  nome: string;
  disponivel(): boolean;
  iniciar(aoTexto: (texto: string, final: boolean) => void, aoErro: (motivo: string) => void): void;
  encerrar(): void;
};

export type RegistroDeMemoria = {
  id: string;
  tipo: string;
  criadoEm: string;
  conteudo: Record<string, unknown>;
};

export type MemoryProvider = {
  nome: string;
  listar(): RegistroDeMemoria[];
  gravar(registro: RegistroDeMemoria): void;
  remover(id: string): void;
  apagarTudo(): void;
};

export type ItemDeConteudo = {
  id: string;
  titulo: string;
  formato: "texto" | "audio" | "video" | "imagem";
  contextos: string[];
  resumo: string;
};

export type ContentProvider = {
  nome: string;
  porContexto(contexto: string): Promise<RespostaDoProvedor<ItemDeConteudo[]>>;
};

export type ConjuntoDeProvedores = {
  lugares: PlaceProvider;
  rotas: RouteProvider;
  mapas: MapProvider;
  enderecos: AddressProvider;
  localizacao: GeolocationProvider;
  fala: SpeechProvider;
  memoria: MemoryProvider;
  conteudo: ContentProvider;
};
