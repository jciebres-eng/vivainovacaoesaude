/**
 * Sincronização tolerante a falhas.
 *
 * Regra dos documentos 03 e 16: a pessoa nunca perde o que construiu porque
 * a rede caiu. Toda escrita é gravada primeiro no aparelho; se a nuvem
 * responder, ótimo — se não, a alteração fica na fila e sobe depois, em
 * silêncio, sem cobrança e sem alarme.
 */
import type { JourneyRepository } from "./repositorios";
import type { Journey, Situation } from "./tipos";

const CHAVE_FILA = "viva.sincronizacao.fila.v1";

type Pendencia = { tipo: "salvar"; jornada: Journey } | { tipo: "remover"; id: string };

function lerFila(): Pendencia[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(CHAVE_FILA) ?? "[]") as Pendencia[];
  } catch {
    return [];
  }
}

function escreverFila(fila: Pendencia[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CHAVE_FILA, JSON.stringify(fila.slice(-50)));
  } catch {
    /* sem armazenamento: seguimos apenas em memória */
  }
}

export function pendenciasDeSincronizacao() {
  return lerFila().length;
}

export class JornadasSincronizadas implements JourneyRepository {
  constructor(
    private readonly nuvem: JourneyRepository,
    private readonly local: JourneyRepository,
  ) {}

  private enfileirar(pendencia: Pendencia) {
    escreverFila([...lerFila(), pendencia]);
  }

  /** Sobe o que estava pendente. Chamada quando a rede volta ou ao entrar. */
  async sincronizar() {
    const fila = lerFila();
    if (!fila.length) return { enviadas: 0, restantes: 0 };
    const restantes: Pendencia[] = [];
    let enviadas = 0;
    for (const pendencia of fila) {
      try {
        if (pendencia.tipo === "salvar") await this.nuvem.salvar(pendencia.jornada);
        else await this.nuvem.remover(pendencia.id);
        enviadas += 1;
      } catch {
        restantes.push(pendencia);
      }
    }
    escreverFila(restantes);
    return { enviadas, restantes: restantes.length };
  }

  async listar() {
    try {
      const daNuvem = await this.nuvem.listar();
      return daNuvem;
    } catch {
      return this.local.listar();
    }
  }

  async porId(id: string) {
    try {
      const jornada = await this.nuvem.porId(id);
      if (jornada) return jornada;
    } catch {
      /* segue para o aparelho */
    }
    return this.local.porId(id);
  }

  async criar(situacao: Situation) {
    try {
      return await this.nuvem.criar(situacao);
    } catch {
      const jornada = await this.local.criar(situacao);
      this.enfileirar({ tipo: "salvar", jornada });
      return jornada;
    }
  }

  async salvar(jornada: Journey) {
    // O aparelho é a fonte imediata: a tela nunca espera a rede.
    const localSalva = await this.local.salvar(jornada);
    try {
      return await this.nuvem.salvar(localSalva);
    } catch {
      this.enfileirar({ tipo: "salvar", jornada: localSalva });
      return localSalva;
    }
  }

  async remover(id: string) {
    await this.local.remover(id);
    try {
      await this.nuvem.remover(id);
    } catch {
      this.enfileirar({ tipo: "remover", id });
    }
  }
}
