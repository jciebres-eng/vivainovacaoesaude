/**
 * Acompanhamento temporário de percurso.
 *
 * Princípio dos documentos 03, 15 e 16: quem acompanha vê o mínimo, por
 * tempo limitado, e a pessoa pode encerrar quando quiser. O link só existe
 * no aparelho de quem compartilha — o servidor guarda apenas um resumo
 * irreversível (hash) do token.
 */
import { supabase } from "@/integrations/supabase/client";

export type PrecisaoDeAcompanhamento = "step_only" | "approximate" | "exact";

export const precisoes: {
  id: PrecisaoDeAcompanhamento;
  titulo: string;
  mostra: string[];
}[] = [
  {
    id: "step_only",
    titulo: "Só a etapa do percurso",
    mostra: ["Se você está em percurso, em pausa ou concluiu", "O nome da etapa atual"],
  },
  {
    id: "approximate",
    titulo: "Região aproximada",
    mostra: ["A etapa atual", "Uma região ampla, sem endereço"],
  },
  {
    id: "exact",
    titulo: "Localização precisa",
    mostra: ["A etapa atual", "Sua localização no mapa enquanto o link durar"],
  },
];

export type SessaoDeAcompanhamento = {
  id: string;
  token: string;
  url: string;
  expiraEm: string;
  precisao: PrecisaoDeAcompanhamento;
};

const CHAVE_LOCAL = "viva.acompanhamentos.v1";

function gerarToken() {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

async function resumo(token: string) {
  const dados = new TextEncoder().encode(token);
  const digest = await crypto.subtle.digest("SHA-256", dados);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

function guardarLocal(sessao: SessaoDeAcompanhamento & { jornadaId: string }) {
  try {
    const atuais = JSON.parse(window.localStorage.getItem(CHAVE_LOCAL) ?? "[]") as unknown[];
    window.localStorage.setItem(CHAVE_LOCAL, JSON.stringify([sessao, ...atuais].slice(0, 10)));
  } catch {
    /* sem armazenamento: o link continua visível nesta tela */
  }
}

export function acompanhamentosGuardados(jornadaId: string) {
  if (typeof window === "undefined") return [];
  try {
    const todos = JSON.parse(window.localStorage.getItem(CHAVE_LOCAL) ?? "[]") as Array<
      SessaoDeAcompanhamento & { jornadaId: string }
    >;
    return todos.filter((s) => s.jornadaId === jornadaId && new Date(s.expiraEm) > new Date());
  } catch {
    return [];
  }
}

export async function criarSessaoDeAcompanhamento(entrada: {
  jornadaId: string;
  minutos: number;
  precisao: PrecisaoDeAcompanhamento;
}): Promise<SessaoDeAcompanhamento> {
  const token = gerarToken();
  const hash = await resumo(token);
  const expiraEm = new Date(Date.now() + entrada.minutos * 60_000).toISOString();

  const { data: sessaoAuth } = await supabase.auth.getUser();
  const dono = sessaoAuth.user?.id;
  if (!dono) throw new Error("sem_perfil");

  const { data, error } = await supabase
    .from("sharing_sessions")
    .insert({
      journey_id: entrada.jornadaId,
      owner_id: dono,
      public_token_hash: hash,
      precision_mode: entrada.precisao,
      expires_at: expiraEm,
    })
    .select("id, expires_at, precision_mode")
    .single();
  if (error) throw error;

  const sessao: SessaoDeAcompanhamento = {
    id: data.id,
    token,
    url: `${window.location.origin}/acompanhar/${token}`,
    expiraEm: data.expires_at,
    precisao: data.precision_mode as PrecisaoDeAcompanhamento,
  };
  guardarLocal({ ...sessao, jornadaId: entrada.jornadaId });
  return sessao;
}

export async function encerrarAcompanhamentos(jornadaId: string) {
  await supabase
    .from("sharing_sessions")
    .update({ revoked_at: new Date().toISOString() })
    .eq("journey_id", jornadaId)
    .is("revoked_at", null);
  try {
    const todos = JSON.parse(window.localStorage.getItem(CHAVE_LOCAL) ?? "[]") as Array<{
      jornadaId: string;
    }>;
    window.localStorage.setItem(
      CHAVE_LOCAL,
      JSON.stringify(todos.filter((s) => s.jornadaId !== jornadaId)),
    );
  } catch {
    /* nada a limpar */
  }
}

/** Envia um ponto do percurso para quem acompanha. Só enquanto a pessoa quiser. */
export async function enviarPontoDoPercurso(entrada: {
  sessaoId: string;
  etapaTitulo: string;
  posicao?: { latitude: number; longitude: number; accuracy?: number } | null;
}) {
  const { error } = await supabase.from("location_updates").insert({
    sharing_session_id: entrada.sessaoId,
    step_label: entrada.etapaTitulo,
    latitude: entrada.posicao?.latitude ?? null,
    longitude: entrada.posicao?.longitude ?? null,
    accuracy: entrada.posicao?.accuracy ?? null,
  });
  if (error) throw error;
}

/* ------------------------------------------------------------------ */
/* Lado de quem acompanha                                             */
/* ------------------------------------------------------------------ */

export type LeituraDeAcompanhamento =
  | { status: "invalid" | "expired" | "revoked" }
  | {
      status: "active";
      precision: PrecisaoDeAcompanhamento;
      expires_at: string;
      updated_at: string | null;
      journey: { title: string; status: string; step_label: string | null };
      location?: { latitude: number; longitude: number; accuracy: number };
    };

export async function lerAcompanhamento(token: string): Promise<LeituraDeAcompanhamento> {
  const { data, error } = await supabase.rpc("follow_shared_journey", { _token: token });
  if (error) return { status: "invalid" };
  return data as unknown as LeituraDeAcompanhamento;
}
