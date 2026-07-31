/**
 * Provedores demonstrativos — funcionam sem nenhuma chave de API.
 *
 * São a base do Modo Demonstrativo: dados fictícios, coerentes e sempre
 * identificados como demonstrativos. Nada é enviado para fora do dispositivo,
 * com exceção dos provedores explicitamente marcados como externos
 * (documentos 03, 05, 11 e 15).
 */
import type {
  AddressProvider,
  ContentProvider,
  Coordenada,
  Endereco,
  GeolocationProvider,
  ItemDeConteudo,
  Lugar,
  MapProvider,
  MemoryProvider,
  PlaceProvider,
  RegistroDeMemoria,
  RespostaDoProvedor,
  Rota,
  RouteProvider,
  SpeechProvider,
} from "./tipos";

const AVISO = "Informação demonstrativa, criada apenas para este protótipo.";

function demo<T>(dados: T, provedor: string): RespostaDoProvedor<T> {
  return { dados, origem: "demonstrativo", provedor, aviso: AVISO };
}

function normalizar(texto: string) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/* ------------------------------------------------------------- lugares */

const lugaresDemonstrativos: Lugar[] = [
  {
    id: "mercado-central",
    nome: "Mercado do bairro",
    categoria: "compras",
    endereco: "Rua das Acácias, 120",
    latitude: -23.5601,
    longitude: -46.6588,
    distanciaEmMetros: 650,
  },
  {
    id: "farmacia-esquina",
    nome: "Farmácia da esquina",
    categoria: "saude",
    endereco: "Rua das Acácias, 88",
    latitude: -23.5595,
    longitude: -46.6579,
    distanciaEmMetros: 320,
  },
  {
    id: "posto-saude",
    nome: "Unidade de saúde Jardim",
    categoria: "saude",
    endereco: "Av. das Palmeiras, 400",
    latitude: -23.5648,
    longitude: -46.6521,
    distanciaEmMetros: 1400,
  },
  {
    id: "ponto-onibus",
    nome: "Ponto de ônibus Praça Azul",
    categoria: "mobilidade",
    endereco: "Praça Azul, sem número",
    latitude: -23.5612,
    longitude: -46.6602,
    distanciaEmMetros: 480,
  },
  {
    id: "estacao-metro",
    nome: "Estação Central",
    categoria: "mobilidade",
    endereco: "Av. Central, 1000",
    latitude: -23.5688,
    longitude: -46.6489,
    distanciaEmMetros: 2100,
  },
  {
    id: "biblioteca-publica",
    nome: "Biblioteca pública",
    categoria: "academico",
    endereco: "Rua do Estudo, 55",
    latitude: -23.5572,
    longitude: -46.6634,
    distanciaEmMetros: 900,
  },
  {
    id: "centro-comunitario",
    nome: "Centro comunitário",
    categoria: "trabalho",
    endereco: "Rua da Convivência, 12",
    latitude: -23.5559,
    longitude: -46.6611,
    distanciaEmMetros: 1100,
  },
];

export const provedorDeLugaresDemonstrativo: PlaceProvider = {
  nome: "Lugares demonstrativos VIVA",
  async buscarPorTexto(consulta) {
    const alvo = normalizar(consulta.trim());
    const dados = alvo
      ? lugaresDemonstrativos.filter(
          (l) =>
            normalizar(l.nome).includes(alvo) ||
            normalizar(l.categoria).includes(alvo) ||
            normalizar(l.endereco).includes(alvo),
        )
      : lugaresDemonstrativos;
    return demo(dados, this.nome);
  },
  async buscarProximos(_latitude, _longitude, categoria) {
    const dados = categoria
      ? lugaresDemonstrativos.filter((l) => l.categoria === categoria)
      : lugaresDemonstrativos;
    return demo(
      [...dados].sort((a, b) => (a.distanciaEmMetros ?? 0) - (b.distanciaEmMetros ?? 0)),
      this.nome,
    );
  },
};

/* --------------------------------------------------------------- rotas */

export const provedorDeRotasDemonstrativo: RouteProvider = {
  nome: "Rotas demonstrativas VIVA",
  async calcularRota(origem, destino, modo = "a-pe") {
    const passosBase: Record<Rota["modo"], Rota["passos"]> = {
      "a-pe": [
        {
          descricao: "Saia e siga pela calçada à direita.",
          referencia: "Portaria",
          duracaoEmMinutos: 2,
        },
        {
          descricao: "Atravesse na faixa em frente à padaria.",
          referencia: "Padaria",
          duracaoEmMinutos: 3,
        },
        { descricao: "Siga reto até a praça.", referencia: "Praça Azul", duracaoEmMinutos: 4 },
        {
          descricao: "O destino fica à esquerda da praça.",
          referencia: destino,
          duracaoEmMinutos: 3,
        },
      ],
      "transporte-publico": [
        {
          descricao: "Caminhe até o ponto de ônibus.",
          referencia: "Praça Azul",
          duracaoEmMinutos: 6,
        },
        {
          descricao: "Aguarde a linha indicada no painel.",
          referencia: "Painel do ponto",
          duracaoEmMinutos: 8,
        },
        { descricao: "Desça na terceira parada.", referencia: "Av. Central", duracaoEmMinutos: 12 },
        { descricao: "Caminhe até o destino.", referencia: destino, duracaoEmMinutos: 5 },
      ],
      carro: [
        {
          descricao: "Siga pela avenida principal.",
          referencia: "Av. das Palmeiras",
          duracaoEmMinutos: 6,
        },
        {
          descricao: "Vire à direita após o semáforo.",
          referencia: "Semáforo",
          duracaoEmMinutos: 4,
        },
        { descricao: "Estacione próximo ao destino.", referencia: destino, duracaoEmMinutos: 4 },
      ],
    };
    const passos = passosBase[modo];
    const duracaoEmMinutos = passos.reduce((total, p) => total + p.duracaoEmMinutos, 0);
    return demo(
      {
        origem,
        destino,
        modo,
        duracaoEmMinutos,
        distanciaEmMetros: duracaoEmMinutos * 75,
        passos,
      },
      this.nome,
    );
  },
};

/* --------------------------------------------------------------- mapas */

export const provedorDeMapaDemonstrativo: MapProvider = {
  nome: "Mapa por pontos de referência",
  async mapaDoPercurso(origem, destino) {
    return demo(
      {
        imagem: null,
        linkExterno: null,
        descricaoAcessivel: `Percurso demonstrativo de ${origem} até ${destino}, descrito por pontos de referência.`,
      },
      this.nome,
    );
  },
};

/* ------------------------------------------------------------ endereço */

export function validarCep(cep: string) {
  return /^\d{5}-?\d{3}$/.test(cep.trim());
}

const cepsDemonstrativos: Record<string, Endereco> = {
  "01001000": {
    cep: "01001-000",
    logradouro: "Praça da Sé",
    bairro: "Sé",
    cidade: "São Paulo",
    estado: "SP",
  },
  "20040002": {
    cep: "20040-002",
    logradouro: "Avenida Rio Branco",
    bairro: "Centro",
    cidade: "Rio de Janeiro",
    estado: "RJ",
  },
};

export const provedorDeEnderecoDemonstrativo: AddressProvider = {
  nome: "Endereços demonstrativos VIVA",
  async buscarPorCep(cep) {
    if (!validarCep(cep)) {
      return { dados: null, origem: "demonstrativo", provedor: this.nome, aviso: "CEP inválido." };
    }
    const chave = cep.replace(/\D/g, "");
    return demo(cepsDemonstrativos[chave] ?? null, this.nome);
  },
};

/* -------------------------------------------------------- localização */

export const provedorDeLocalizacaoDoNavegador: GeolocationProvider = {
  nome: "Localização do dispositivo",
  disponivel() {
    return typeof navigator !== "undefined" && "geolocation" in navigator;
  },
  async posicaoAtual() {
    if (!this.disponivel()) {
      return {
        dados: null,
        origem: "demonstrativo",
        provedor: this.nome,
        aviso: "Localização indisponível neste dispositivo.",
      };
    }
    return new Promise<RespostaDoProvedor<Coordenada | null>>((resolver) => {
      navigator.geolocation.getCurrentPosition(
        (posicao) =>
          resolver({
            dados: {
              latitude: posicao.coords.latitude,
              longitude: posicao.coords.longitude,
              precisaoEmMetros: posicao.coords.accuracy,
            },
            origem: "externo",
            provedor: "Localização do dispositivo",
          }),
        () =>
          resolver({
            dados: null,
            origem: "demonstrativo",
            provedor: "Localização do dispositivo",
            aviso: "Você não compartilhou a localização. Seguimos sem ela.",
          }),
        { timeout: 8000, maximumAge: 60000 },
      );
    });
  },
};

/* --------------------------------------------------------------- fala */

type ReconhecimentoDeFala = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((evento: unknown) => void) | null;
  onerror: ((evento: unknown) => void) | null;
  onend: (() => void) | null;
};

function construtorDeFala(): (new () => ReconhecimentoDeFala) | null {
  if (typeof window === "undefined") return null;
  const janela = window as unknown as Record<string, unknown>;
  return (janela.SpeechRecognition ?? janela.webkitSpeechRecognition) as
    (new () => ReconhecimentoDeFala) | null;
}

export const provedorDeFalaDoNavegador: SpeechProvider = {
  nome: "Reconhecimento de fala do navegador",
  disponivel() {
    return Boolean(construtorDeFala());
  },
  iniciar(aoTexto, aoErro) {
    const Construtor = construtorDeFala();
    if (!Construtor) {
      aoErro("Este dispositivo não reconhece fala. Você pode escrever.");
      return;
    }
    const sessao = new Construtor();
    sessao.lang = "pt-BR";
    sessao.continuous = false;
    sessao.interimResults = true;
    sessao.onresult = (evento) => {
      const dados = evento as {
        results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }>;
      };
      const ultimo = dados.results[dados.results.length - 1];
      aoTexto(ultimo[0].transcript, ultimo.isFinal);
    };
    sessao.onerror = () => aoErro("Não consegui ouvir agora. Você pode escrever.");
    sessao.start();
    sessaoAtiva = sessao;
  },
  encerrar() {
    sessaoAtiva?.stop();
    sessaoAtiva = null;
  },
};

let sessaoAtiva: ReconhecimentoDeFala | null = null;

/* ------------------------------------------------------------ memória */

const CHAVE_MEMORIA = "viva:memoria:v1";

export const provedorDeMemoriaLocal: MemoryProvider = {
  nome: "Memória local deste dispositivo",
  listar() {
    if (typeof localStorage === "undefined") return [];
    try {
      const bruto = localStorage.getItem(CHAVE_MEMORIA);
      return bruto ? (JSON.parse(bruto) as RegistroDeMemoria[]) : [];
    } catch {
      return [];
    }
  },
  gravar(registro) {
    if (typeof localStorage === "undefined") return;
    const atuais = this.listar().filter((r) => r.id !== registro.id);
    localStorage.setItem(CHAVE_MEMORIA, JSON.stringify([...atuais, registro]));
  },
  remover(id) {
    if (typeof localStorage === "undefined") return;
    localStorage.setItem(CHAVE_MEMORIA, JSON.stringify(this.listar().filter((r) => r.id !== id)));
  },
  apagarTudo() {
    if (typeof localStorage === "undefined") return;
    localStorage.removeItem(CHAVE_MEMORIA);
  },
};

/* ----------------------------------------------------------- conteúdo */

const conteudosDemonstrativos: ItemDeConteudo[] = [
  {
    id: "preparar-compras",
    titulo: "Preparar uma ida ao mercado",
    formato: "texto",
    contextos: ["compras"],
    resumo: "Uma lista curta e três apoios para o momento da fila.",
  },
  {
    id: "respirar-antes",
    titulo: "Uma pausa antes de sair",
    formato: "audio",
    contextos: ["compras", "mobilidade", "saude"],
    resumo: "Dois minutos de respiração guiada, sem contagem regressiva.",
  },
  {
    id: "onibus-passo-a-passo",
    titulo: "Ônibus, passo a passo",
    formato: "video",
    contextos: ["mobilidade"],
    resumo: "O trajeto descrito em cenas curtas, com legendas.",
  },
  {
    id: "consulta-perguntas",
    titulo: "O que eu quero perguntar",
    formato: "texto",
    contextos: ["saude"],
    resumo: "Um espaço para anotar perguntas antes da consulta.",
  },
];

export const provedorDeConteudoDemonstrativo: ContentProvider = {
  nome: "Biblioteca demonstrativa VIVA",
  async porContexto(contexto) {
    return demo(
      conteudosDemonstrativos.filter((c) => c.contextos.includes(contexto)),
      this.nome,
    );
  },
};
