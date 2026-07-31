/**
 * Trajeto do VIVA — realização acompanhada e compartilhamento seguro.
 *
 * Tudo permanece neste dispositivo (localStorage). O "link temporário" é uma
 * simulação demonstrativa: ele abre uma tela de acompanhamento no mesmo
 * navegador, sem servidor, sem conta e sem rastreamento real.
 *
 * Regras inegociáveis (documentos 03, 15 e 16):
 * • o compartilhamento nasce desligado;
 * • cada percurso exige uma nova autorização;
 * • a pessoa escolhe o nível de informação e a duração;
 * • a pessoa pode pausar a localização ou encerrar a qualquer momento;
 * • um indicador visível informa que o acompanhamento está ativo.
 */
import { useEffect, useState } from "react";

import { type IdDeContexto } from "./viva-intencao";

export type NivelDeCompartilhamento = "status" | "referencias" | "localizacao";

export const niveis: {
  id: NivelDeCompartilhamento;
  titulo: string;
  descricao: string;
  mostra: string[];
}[] = [
  {
    id: "status",
    titulo: "Apenas status",
    descricao: "A pessoa vê somente se você está em percurso, em pausa ou concluiu.",
    mostra: ["Situação do percurso"],
  },
  {
    id: "referencias",
    titulo: "Status e pontos de referência",
    descricao: "Além do status, mostra a etapa atual em palavras (ex.: “no ponto de ônibus”).",
    mostra: ["Situação do percurso", "Etapa atual em palavras"],
  },
  {
    id: "localizacao",
    titulo: "Status, referências e localização aproximada",
    descricao: "Inclui uma posição aproximada e simulada no mapa demonstrativo.",
    mostra: ["Situação do percurso", "Etapa atual em palavras", "Localização aproximada"],
  },
];

export const duracoes = [15, 30, 60, 120] as const;
export type Duracao = (typeof duracoes)[number];

export type ContatoDeConfianca = {
  id: string;
  nome: string;
  vinculo: string;
  formaDeContato: string;
};

export const contatosDemonstrativos: ContatoDeConfianca[] = [
  { id: "c1", nome: "Marina", vinculo: "Irmã", formaDeContato: "Mensagem no celular" },
  { id: "c2", nome: "Paulo", vinculo: "Amigo próximo", formaDeContato: "Ligação" },
  { id: "c3", nome: "Rita", vinculo: "Terapeuta ocupacional", formaDeContato: "Mensagem" },
];

export type FaseDoTrajeto = "preparar" | "ensaiar" | "realizar" | "registrar";

export const fases: { id: FaseDoTrajeto; titulo: string; convite: string }[] = [
  { id: "preparar", titulo: "Preparar", convite: "Ver o que levar e o que esperar." },
  { id: "ensaiar", titulo: "Ensaiar", convite: "Passar pelo trajeto em pensamento, sem sair." },
  { id: "realizar", titulo: "Realizar", convite: "Seguir passo a passo, no seu ritmo." },
  { id: "registrar", titulo: "Registrar", convite: "Contar como foi, se quiser." },
];

export type EtapaDoTrajeto = {
  id: string;
  titulo: string;
  referencia: string;
  apoio: string;
};

export type Compartilhamento = {
  ativo: boolean;
  token: string | null;
  contatoId: string | null;
  nivel: NivelDeCompartilhamento;
  duracaoMinutos: Duracao;
  iniciadoEm: string | null;
  expiraEm: string | null;
  localizacaoPausada: boolean;
  encerradoEm: string | null;
};

export type PedidoDeApoio = {
  id: string;
  texto: string;
  em: string;
  respondido: boolean;
};

export type Trajeto = {
  contexto: IdDeContexto | null;
  titulo: string;
  etapas: EtapaDoTrajeto[];
  etapaAtual: number;
  fase: FaseDoTrajeto;
  emPausa: boolean;
  concluido: boolean;
  iniciadoEm: string | null;
  pedidos: PedidoDeApoio[];
  compartilhamento: Compartilhamento;
};

const compartilhamentoVazio: Compartilhamento = {
  ativo: false,
  token: null,
  contatoId: null,
  nivel: "status",
  duracaoMinutos: 30,
  iniciadoEm: null,
  expiraEm: null,
  localizacaoPausada: false,
  encerradoEm: null,
};

export const trajetoVazio: Trajeto = {
  contexto: null,
  titulo: "",
  etapas: [],
  etapaAtual: 0,
  fase: "preparar",
  emPausa: false,
  concluido: false,
  iniciadoEm: null,
  pedidos: [],
  compartilhamento: compartilhamentoVazio,
};

/** Trajetos demonstrativos por contexto, em pontos de referência humanos. */
export const trajetosPorContexto: Record<string, { titulo: string; etapas: EtapaDoTrajeto[] }> = {
  compras: {
    titulo: "Ida ao mercado",
    etapas: [
      { id: "sair", titulo: "Sair de casa", referencia: "Em casa", apoio: "Conferir a lista e a sacola antes de sair." },
      { id: "caminho", titulo: "Caminho até o mercado", referencia: "Na rua", apoio: "Fones e uma parada no meio do caminho são opções." },
      { id: "entrada", titulo: "Entrada e corredores", referencia: "No mercado", apoio: "Começar pelo corredor mais tranquilo." },
      { id: "caixa", titulo: "Fila e pagamento", referencia: "No caixa", apoio: "Cartão separado antes de chegar à fila." },
      { id: "volta", titulo: "Volta para casa", referencia: "No caminho de volta", apoio: "Um tempo em silêncio ao chegar." },
    ],
  },
  mobilidade: {
    titulo: "Percurso de ônibus",
    etapas: [
      { id: "sair", titulo: "Sair de casa", referencia: "Em casa", apoio: "Conferir horário e cartão." },
      { id: "ponto", titulo: "Chegar ao ponto", referencia: "No ponto de ônibus", apoio: "Um lugar mais afastado da rua costuma ser mais calmo." },
      { id: "embarque", titulo: "Embarque", referencia: "No ônibus", apoio: "Escolher um lugar perto da janela, se possível." },
      { id: "trajeto", titulo: "Durante o trajeto", referencia: "A caminho", apoio: "Fones ou uma música conhecida podem ajudar." },
      { id: "chegada", titulo: "Desembarque", referencia: "No destino", apoio: "Sair sem pressa, deixar as pessoas passarem." },
    ],
  },
  saude: {
    titulo: "Ida à consulta",
    etapas: [
      { id: "sair", titulo: "Sair de casa", referencia: "Em casa", apoio: "Separar documentos e anotações." },
      { id: "caminho", titulo: "Caminho até o local", referencia: "No trajeto", apoio: "Chegar com folga reduz a pressa." },
      { id: "espera", titulo: "Sala de espera", referencia: "Na recepção", apoio: "Perguntar quanto tempo falta é permitido." },
      { id: "consulta", titulo: "Durante a consulta", referencia: "No atendimento", apoio: "Suas anotações podem ser lidas em voz alta." },
      { id: "volta", titulo: "Depois", referencia: "Na saída", apoio: "Registrar o que foi dito enquanto está fresco." },
    ],
  },
  trabalho: {
    titulo: "Situação de trabalho",
    etapas: [
      { id: "preparo", titulo: "Antes de começar", referencia: "Antes", apoio: "Escrever os pontos principais." },
      { id: "inicio", titulo: "Início da reunião", referencia: "No começo", apoio: "Câmera desligada é uma escolha válida." },
      { id: "durante", titulo: "Durante", referencia: "Em andamento", apoio: "Pedir para repetir é permitido." },
      { id: "fim", titulo: "Encerramento", referencia: "No fim", apoio: "Confirmar combinados por escrito." },
    ],
  },
  academico: {
    titulo: "Dia na universidade",
    etapas: [
      { id: "sair", titulo: "Sair de casa", referencia: "Em casa", apoio: "Conferir material e horários." },
      { id: "campus", titulo: "Chegada ao campus", referencia: "No campus", apoio: "Um caminho conhecido é mais previsível." },
      { id: "aula", titulo: "Durante a aula", referencia: "Na sala", apoio: "Sentar perto da porta facilita sair se precisar." },
      { id: "pausa", titulo: "Intervalo", referencia: "No intervalo", apoio: "Um lugar silencioso para recompor." },
    ],
  },
  indefinido: {
    titulo: "Percurso livre",
    etapas: [
      { id: "inicio", titulo: "Começar", referencia: "No começo", apoio: "Um passo pequeno já é suficiente." },
      { id: "meio", titulo: "Durante", referencia: "Em andamento", apoio: "Pausar não é desistir." },
      { id: "fim", titulo: "Encerrar", referencia: "No fim", apoio: "Encerrar antes também é uma escolha." },
    ],
  },
};

const CHAVE = "viva.trajeto.v1";
const ouvintes = new Set<() => void>();
let cache: Trajeto = trajetoVazio;
let carregado = false;

function ler(): Trajeto {
  if (typeof window === "undefined") return trajetoVazio;
  try {
    const bruto = window.localStorage.getItem(CHAVE);
    if (!bruto) return trajetoVazio;
    const dado = JSON.parse(bruto) as Partial<Trajeto>;
    return {
      ...trajetoVazio,
      ...dado,
      etapas: dado.etapas ?? [],
      pedidos: dado.pedidos ?? [],
      compartilhamento: { ...compartilhamentoVazio, ...(dado.compartilhamento ?? {}) },
    };
  } catch {
    return trajetoVazio;
  }
}

function gravar(proximo: Trajeto) {
  cache = proximo;
  try {
    window.localStorage.setItem(CHAVE, JSON.stringify(proximo));
  } catch {
    /* a demonstração segue apenas nesta sessão */
  }
  ouvintes.forEach((o) => o());
}

function atualizar(fn: (a: Trajeto) => Trajeto) {
  gravar(fn(cache));
}

function novoToken() {
  return Math.random().toString(36).slice(2, 8) + Math.random().toString(36).slice(2, 6);
}

export const trajeto = {
  iniciar(contexto: IdDeContexto) {
    const base = trajetosPorContexto[contexto] ?? trajetosPorContexto.indefinido;
    gravar({
      ...trajetoVazio,
      contexto,
      titulo: base.titulo,
      etapas: base.etapas,
      iniciadoEm: new Date().toISOString(),
    });
  },
  irParaFase(fase: FaseDoTrajeto) {
    atualizar((a) => ({ ...a, fase }));
  },
  avancar() {
    atualizar((a) => {
      const proximo = Math.min(a.etapas.length - 1, a.etapaAtual + 1);
      return { ...a, etapaAtual: proximo, emPausa: false };
    });
  },
  voltar() {
    atualizar((a) => ({ ...a, etapaAtual: Math.max(0, a.etapaAtual - 1) }));
  },
  pausar() {
    atualizar((a) => ({ ...a, emPausa: true }));
  },
  retomar() {
    atualizar((a) => ({ ...a, emPausa: false }));
  },
  concluir() {
    atualizar((a) => ({
      ...a,
      concluido: true,
      emPausa: false,
      fase: "registrar",
      compartilhamento: a.compartilhamento.ativo
        ? { ...a.compartilhamento, ativo: false, encerradoEm: new Date().toISOString() }
        : a.compartilhamento,
    }));
  },
  encerrarPercurso() {
    gravar(trajetoVazio);
  },
  pedirApoio(texto: string) {
    atualizar((a) => ({
      ...a,
      pedidos: [
        ...a.pedidos,
        { id: novoToken(), texto, em: new Date().toISOString(), respondido: false },
      ],
    }));
  },
  responderPedido(id: string) {
    atualizar((a) => ({
      ...a,
      pedidos: a.pedidos.map((p) => (p.id === id ? { ...p, respondido: true } : p)),
    }));
  },
  autorizarCompartilhamento(opcoes: {
    contatoId: string;
    nivel: NivelDeCompartilhamento;
    duracaoMinutos: Duracao;
  }) {
    const agora = Date.now();
    atualizar((a) => ({
      ...a,
      compartilhamento: {
        ativo: true,
        token: novoToken(),
        contatoId: opcoes.contatoId,
        nivel: opcoes.nivel,
        duracaoMinutos: opcoes.duracaoMinutos,
        iniciadoEm: new Date(agora).toISOString(),
        expiraEm: new Date(agora + opcoes.duracaoMinutos * 60_000).toISOString(),
        localizacaoPausada: false,
        encerradoEm: null,
      },
    }));
  },
  pausarLocalizacao(pausada: boolean) {
    atualizar((a) => ({
      ...a,
      compartilhamento: { ...a.compartilhamento, localizacaoPausada: pausada },
    }));
  },
  encerrarCompartilhamento() {
    atualizar((a) => ({
      ...a,
      compartilhamento: {
        ...a.compartilhamento,
        ativo: false,
        encerradoEm: new Date().toISOString(),
      },
    }));
  },
};

/** Compartilhamento expirado pelo tempo escolhido pela própria pessoa. */
export function compartilhamentoExpirado(c: Compartilhamento, agora = Date.now()) {
  if (!c.expiraEm) return false;
  return new Date(c.expiraEm).getTime() <= agora;
}

export function minutosRestantes(c: Compartilhamento, agora = Date.now()) {
  if (!c.expiraEm) return 0;
  return Math.max(0, Math.ceil((new Date(c.expiraEm).getTime() - agora) / 60_000));
}

export function useTrajeto() {
  const [estado, setEstado] = useState<Trajeto>(cache);

  useEffect(() => {
    if (!carregado) {
      cache = ler();
      carregado = true;
    }
    setEstado(cache);
    const ouvinte = () => setEstado(cache);
    ouvintes.add(ouvinte);
    const externo = (e: StorageEvent) => {
      if (e.key !== CHAVE) return;
      cache = ler();
      ouvinte();
    };
    window.addEventListener("storage", externo);
    return () => {
      ouvintes.delete(ouvinte);
      window.removeEventListener("storage", externo);
    };
  }, []);

  return estado;
}

/** Leitura usada pela tela de quem acompanha (mesmo navegador, sem servidor). */
export function useTrajetoPorToken(token: string) {
  const atual = useTrajeto();
  const valido =
    atual.compartilhamento.token === token &&
    atual.compartilhamento.ativo &&
    !compartilhamentoExpirado(atual.compartilhamento);
  return { trajeto: atual, valido };
}
