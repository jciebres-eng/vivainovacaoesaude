/**
 * Repositórios reais (Lovable Cloud).
 *
 * Mesmos contratos dos mocks: nenhuma tela sabe de onde vêm os dados.
 * Quando a pessoa não está identificada, ou quando a rede falha, os
 * repositórios locais continuam respondendo — o percurso nunca se perde
 * (documentos 03 e 16: o dado é da pessoa, não do servidor).
 */
import { supabase } from "@/integrations/supabase/client";

import { catalogoDeMatch, situacoesDeMatch } from "./dados-demo";
import { etapasBase, novoId, type JourneyRepository, type ProfileRepository, type SharingRepository, type SituationRepository } from "./repositorios";
import type {
  CategoriaDeMatch,
  EstadoDaJornada,
  GrupoDaTimeline,
  ItemDeMatch,
  Journey,
  JourneyChoice,
  JourneyStep,
  PerfilDemonstrativo,
  Situation,
  UserPreference,
} from "./tipos";

/* ------------------------------------------------------------------ */
/* Tradução entre a linguagem do produto e as colunas do banco         */
/* ------------------------------------------------------------------ */

type StatusBanco = "draft" | "preparing" | "ready" | "executing" | "paused" | "completed" | "cancelled";

const paraBanco: Record<EstadoDaJornada, StatusBanco> = {
  rascunho: "draft",
  pronto: "ready",
  "em-andamento": "executing",
  pausado: "paused",
  concluido: "completed",
};

const doBanco: Record<StatusBanco, EstadoDaJornada> = {
  draft: "rascunho",
  preparing: "rascunho",
  ready: "pronto",
  executing: "em-andamento",
  paused: "pausado",
  completed: "concluido",
  cancelled: "concluido",
};

/** Cenas visuais e textos longos continuam no pacote da interface. */
const cenasPorId = new Map<string, ItemDeMatch>();
for (const lista of Object.values(catalogoDeMatch)) {
  for (const item of lista as ItemDeMatch[]) cenasPorId.set(item.id, item);
}
for (const s of situacoesDeMatch) cenasPorId.set(s.id, s);

function comCena<T extends { id: string }>(base: T, categoria: CategoriaDeMatch) {
  const modelo = cenasPorId.get(base.id);
  return {
    ...(modelo ?? {}),
    ...base,
    categoria,
    cena: modelo?.cena ?? { tipo: "abstrato", tom: "neutro" },
  } as ItemDeMatch;
}

const tabelaPorCategoria: Record<CategoriaDeMatch, string> = {
  situation: "situations",
  need: "needs",
  barrier: "barriers",
  strategy: "strategies",
  information: "information_resources",
  training: "training_resources",
  monitoring: "monitoring_preferences",
  feedback: "feedback_formats",
};

/* ------------------------------------------------------------------ */
/* Catálogo                                                            */
/* ------------------------------------------------------------------ */

export class SupabaseSituationRepository implements SituationRepository {
  async listar() {
    const { data, error } = await supabase
      .from("situations")
      .select("id, title, description, context")
      .order("title");
    if (error || !data?.length) return situacoesDeMatch;
    return data.map((linha) => ({
      ...(comCena(linha as { id: string }, "situation") as Situation),
      situacaoId: linha.id,
      titulo: linha.title,
      descricao: linha.description ?? undefined,
      contexto: linha.context ?? "",
    })) as Situation[];
  }

  async buscar(texto: string) {
    const alvo = texto.trim();
    if (!alvo) return this.listar();
    const { data, error } = await supabase
      .from("situations")
      .select("id, title, description, context")
      .or(`title.ilike.%${alvo}%,description.ilike.%${alvo}%,context.ilike.%${alvo}%`)
      .limit(24);
    if (error) return (await this.listar()).filter((s) => s.titulo.toLowerCase().includes(alvo.toLowerCase()));
    return data.map((linha) => ({
      ...(comCena(linha as { id: string }, "situation") as Situation),
      situacaoId: linha.id,
      titulo: linha.title,
      descricao: linha.description ?? undefined,
      contexto: linha.context ?? "",
    })) as Situation[];
  }

  async porId(id: string) {
    const todas = await this.listar();
    return todas.find((s) => s.id === id || s.situacaoId === id) ?? null;
  }

  async itens(categoria: CategoriaDeMatch) {
    const tabela = tabelaPorCategoria[categoria];
    const { data, error } = await supabase.from(tabela as never).select("id, title, description, details");
    if (error || !data?.length) return catalogoDeMatch[categoria] as ItemDeMatch[];
    return (data as Array<Record<string, string | null>>).map((linha) => {
      const item = comCena({ id: String(linha.id) }, categoria);
      return {
        ...item,
        titulo: linha.title ?? item.titulo,
        descricao: linha.description ?? item.descricao,
        detalhes: linha.details ?? item.detalhes,
      };
    });
  }
}

/* ------------------------------------------------------------------ */
/* Percursos                                                           */
/* ------------------------------------------------------------------ */

type LinhaJornada = {
  id: string;
  situation_id: string | null;
  title: string;
  status: StatusBanco;
  created_at: string;
  updated_at: string;
};

export class SupabaseJourneyRepository implements JourneyRepository {
  constructor(private readonly perfilId: () => Promise<string | null>) {}

  private async montar(linha: LinhaJornada): Promise<Journey> {
    const [{ data: etapas }, { data: escolhas }, { data: feedback }] = await Promise.all([
      supabase
        .from("journey_steps")
        .select("id, type, title, support, position, is_optional, is_fixed, source_entity_id, category")
        .eq("journey_id", linha.id)
        .order("position"),
      supabase
        .from("journey_choices")
        .select("id, category, entity_id, title, decision, decision_order, created_at")
        .eq("journey_id", linha.id)
        .order("decision_order"),
      supabase
        .from("journey_feedback")
        .select("response_type, response_payload, created_at")
        .eq("journey_id", linha.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
    ]);

    const payload = (feedback?.response_payload ?? {}) as { titulo?: string; nota?: string };
    return {
      id: linha.id,
      situacaoId: linha.situation_id ?? "",
      titulo: linha.title,
      estado: doBanco[linha.status] ?? "rascunho",
      criadoEm: linha.created_at,
      atualizadoEm: linha.updated_at,
      etapas: (etapas ?? []).map<JourneyStep>((e) => ({
        id: e.id,
        grupo: e.type as GrupoDaTimeline,
        titulo: e.title,
        apoio: e.support ?? undefined,
        fixa: e.is_fixed,
        opcional: e.is_optional,
        itemId: e.source_entity_id ?? undefined,
        categoria: (e.category ?? undefined) as CategoriaDeMatch | undefined,
      })),
      escolhas: (escolhas ?? []).map<JourneyChoice>((c) => ({
        id: c.id,
        categoria: c.category as CategoriaDeMatch,
        itemId: c.entity_id,
        titulo: c.title,
        aceito: c.decision === "accepted",
        em: c.created_at,
      })),
      feedback: feedback
        ? {
            formatoId: feedback.response_type,
            formatoTitulo: payload.titulo ?? feedback.response_type,
            nota: payload.nota,
            em: feedback.created_at,
          }
        : undefined,
    };
  }

  async listar() {
    const { data, error } = await supabase
      .from("journeys")
      .select("id, situation_id, title, status, created_at, updated_at")
      .order("updated_at", { ascending: false });
    if (error || !data) throw error ?? new Error("sem_resposta");
    return Promise.all((data as LinhaJornada[]).map((l) => this.montar(l)));
  }

  async porId(id: string) {
    const { data, error } = await supabase
      .from("journeys")
      .select("id, situation_id, title, status, created_at, updated_at")
      .eq("id", id)
      .maybeSingle();
    if (error) throw error;
    if (!data) return null;
    return this.montar(data as LinhaJornada);
  }

  async criar(situacao: Situation) {
    const perfil = await this.perfilId();
    if (!perfil) throw new Error("sem_perfil");
    const { data, error } = await supabase
      .from("journeys")
      .insert({
        profile_id: perfil,
        situation_id: situacao.situacaoId,
        title: situacao.titulo,
        status: "draft",
      })
      .select("id, situation_id, title, status, created_at, updated_at")
      .single();
    if (error) throw error;

    const rascunho: Journey = {
      id: (data as LinhaJornada).id,
      situacaoId: situacao.situacaoId,
      titulo: situacao.titulo,
      estado: "rascunho",
      criadoEm: (data as LinhaJornada).created_at,
      atualizadoEm: (data as LinhaJornada).updated_at,
      escolhas: [
        {
          id: novoId("choice"),
          categoria: "situation",
          itemId: situacao.id,
          titulo: situacao.titulo,
          aceito: true,
          em: new Date().toISOString(),
        },
      ],
      etapas: etapasBase(situacao),
    };
    return this.salvar(rascunho);
  }

  /** Escreve o percurso inteiro: simples, previsível e fácil de auditar. */
  async salvar(jornada: Journey) {
    const perfil = await this.perfilId();
    if (!perfil) throw new Error("sem_perfil");

    const { error: erroJornada } = await supabase
      .from("journeys")
      .update({ title: jornada.titulo, status: paraBanco[jornada.estado] })
      .eq("id", jornada.id);
    if (erroJornada) throw erroJornada;

    await Promise.all([
      supabase.from("journey_steps").delete().eq("journey_id", jornada.id),
      supabase.from("journey_choices").delete().eq("journey_id", jornada.id),
    ]);

    if (jornada.etapas.length) {
      const { error } = await supabase.from("journey_steps").insert(
        jornada.etapas.map((e, indice) => ({
          journey_id: jornada.id,
          type: e.grupo,
          title: e.titulo,
          support: e.apoio ?? null,
          position: indice,
          is_optional: e.opcional,
          is_fixed: e.fixa,
          source_entity_id: e.itemId ?? null,
          category: e.categoria ?? null,
        })),
      );
      if (error) throw error;
    }

    if (jornada.escolhas.length) {
      const { error } = await supabase.from("journey_choices").insert(
        jornada.escolhas.map((c, indice) => ({
          journey_id: jornada.id,
          category: c.categoria,
          entity_id: c.itemId,
          title: c.titulo,
          decision: c.aceito ? "accepted" : "rejected",
          decision_order: indice,
        })),
      );
      if (error) throw error;
    }

    if (jornada.feedback) {
      await supabase.from("journey_feedback").insert({
        journey_id: jornada.id,
        response_type: jornada.feedback.formatoId,
        response_payload: {
          titulo: jornada.feedback.formatoTitulo,
          nota: jornada.feedback.nota ?? null,
        },
      });
    }

    const atualizada = await this.porId(jornada.id);
    return atualizada ?? jornada;
  }

  async remover(id: string) {
    const { error } = await supabase.from("journeys").delete().eq("id", id);
    if (error) throw error;
  }
}

/* ------------------------------------------------------------------ */
/* Perfil e preferências                                              */
/* ------------------------------------------------------------------ */

export class SupabaseProfileRepository implements ProfileRepository {
  constructor(private readonly perfilId: () => Promise<string | null>) {}

  async perfil(): Promise<PerfilDemonstrativo> {
    const id = await this.perfilId();
    const { data } = await supabase
      .from("profiles")
      .select("id, display_name")
      .eq("id", id ?? "")
      .maybeSingle();
    return {
      id: data?.id ?? "perfil-demo",
      nome: data?.display_name ?? "Alex",
      frase: "Perfil único. Todas as situações continuam disponíveis para você.",
      preferencias: await this.preferencias(),
    };
  }

  async preferencias(): Promise<UserPreference[]> {
    const id = await this.perfilId();
    if (!id) return [];
    const { data } = await supabase
      .from("user_preferences")
      .select("information_density, step_size, animation_intensity, audio_enabled, low_stimulation, location_sharing_default, extras")
      .eq("profile_id", id)
      .maybeSingle();
    if (!data) return [];
    const extras = (data.extras ?? {}) as Record<string, string>;
    return [
      { chave: "densidade", valor: data.information_density ?? "" },
      { chave: "tamanho-etapa", valor: data.step_size ?? "" },
      { chave: "movimento", valor: data.animation_intensity ?? "" },
      { chave: "audio", valor: String(data.audio_enabled) },
      { chave: "baixa-estimulacao", valor: String(data.low_stimulation) },
      { chave: "localizacao-padrao", valor: data.location_sharing_default ?? "" },
      ...Object.entries(extras).map(([chave, valor]) => ({ chave, valor: String(valor) })),
    ].filter((p) => p.valor !== "");
  }

  async definirPreferencia(chave: string, valor: string) {
    const id = await this.perfilId();
    if (!id) return this.preferencias();

    const colunas: Record<string, string> = {
      densidade: "information_density",
      "tamanho-etapa": "step_size",
      movimento: "animation_intensity",
    };
    const booleanas: Record<string, string> = {
      audio: "audio_enabled",
      "baixa-estimulacao": "low_stimulation",
    };

    const registro: Record<string, unknown> = { profile_id: id };
    if (colunas[chave]) registro[colunas[chave]] = valor;
    else if (booleanas[chave]) registro[booleanas[chave]] = valor === "true";
    else if (chave === "localizacao-padrao") registro.location_sharing_default = valor;
    else {
      const { data } = await supabase
        .from("user_preferences")
        .select("extras")
        .eq("profile_id", id)
        .maybeSingle();
      registro.extras = { ...((data?.extras ?? {}) as Record<string, unknown>), [chave]: valor };
    }

    await supabase.from("user_preferences").upsert(registro, { onConflict: "profile_id" });
    return this.preferencias();
  }
}

/* ------------------------------------------------------------------ */
/* Compartilhamento temporário                                        */
/* ------------------------------------------------------------------ */

export class SupabaseSharingRepository implements SharingRepository {
  constructor(private readonly perfilId: () => Promise<string | null>) {}

  async criarLinkTemporario(jornadaId: string) {
    const { criarSessaoDeAcompanhamento } = await import("@/lib/compartilhamento/sessoes");
    const sessao = await criarSessaoDeAcompanhamento({
      jornadaId,
      minutos: 120,
      precisao: "step_only",
    });
    return { url: sessao.url, expiraEm: sessao.expiraEm };
  }

  async encerrar(jornadaId: string) {
    const { encerrarAcompanhamentos } = await import("@/lib/compartilhamento/sessoes");
    await encerrarAcompanhamentos(jornadaId);
  }
}
