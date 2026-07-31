import { describe, expect, it } from "vitest";

import {
  aplicarEvento,
  estadoEmLoop,
  estadoInicial,
  descricaoDoEstado,
  type EstadoDoAssistente,
} from "@/lib/assistant/estados";
import {
  ativoPorEstado,
  deveUsarEstatico,
  estaticoPorEstado,
  urlEstatica,
} from "@/lib/assistant/animacoes";

const todosOsEstados = Object.keys(descricaoDoEstado) as EstadoDoAssistente[];

describe("máquina de estados do assistente", () => {
  it("começa disponível", () => {
    expect(estadoInicial().estado).toBe("idle");
  });

  it("percorre o ciclo de voz até o percurso pronto", () => {
    let ctx = estadoInicial(0);
    ctx = aplicarEvento(ctx, "VOICE_STARTED", 0);
    expect(ctx.estado).toBe("listening");
    ctx = aplicarEvento(ctx, "VOICE_STOPPED", 10);
    expect(ctx.estado).toBe("transcribing");
    ctx = aplicarEvento(ctx, "INTENT_PROCESSING", 2000);
    expect(ctx.estado).toBe("processing");
    ctx = aplicarEvento(ctx, "JOURNEY_BUILDING", 4000);
    expect(ctx.estado).toBe("organizing");
    ctx = aplicarEvento(ctx, "JOURNEY_READY", 6000);
    expect(ctx.estado).toBe("suggesting");
  });

  it("respeita a permanência mínima para não piscar", () => {
    let ctx = estadoInicial(0);
    ctx = aplicarEvento(ctx, "INTENT_PROCESSING", 0);
    const cedo = aplicarEvento(ctx, "JOURNEY_BUILDING", 100);
    expect(cedo.estado).toBe("processing");
    const noTempo = aplicarEvento(ctx, "JOURNEY_BUILDING", 1000);
    expect(noTempo.estado).toBe("organizing");
  });

  it("erro e perda de conexão têm prioridade imediata", () => {
    let ctx = estadoInicial(0);
    ctx = aplicarEvento(ctx, "INTENT_PROCESSING", 0);
    expect(aplicarEvento(ctx, "GENERIC_ERROR", 1).estado).toBe("error");
    expect(aplicarEvento(ctx, "NETWORK_LOST", 1).estado).toBe("offline");
  });

  it("volta ao estado anterior quando a conexão retorna", () => {
    let ctx = estadoInicial(0);
    ctx = aplicarEvento(ctx, "JOURNEY_STARTED", 0);
    ctx = aplicarEvento(ctx, "NETWORK_LOST", 100);
    expect(ctx.estado).toBe("offline");
    ctx = aplicarEvento(ctx, "NETWORK_RESTORED", 200);
    expect(ctx.estado).toBe("guiding");
  });

  it("desligado só volta com autorização da pessoa", () => {
    let ctx = aplicarEvento(estadoInicial(0), "AGENT_DISABLED", 0);
    expect(aplicarEvento(ctx, "VOICE_STARTED", 100).estado).toBe("disabled");
    ctx = aplicarEvento(ctx, "AGENT_ENABLED", 200);
    expect(ctx.estado).toBe("idle");
  });

  it("todo estado tem descrição em texto", () => {
    for (const estado of todosOsEstados) {
      expect(descricaoDoEstado[estado].rotulo.length).toBeGreaterThan(0);
      expect(descricaoDoEstado[estado].leitor.length).toBeGreaterThan(0);
    }
  });

  it("estados de encerramento não ficam em laço", () => {
    expect(estadoEmLoop("completed")).toBe(false);
    expect(estadoEmLoop("idle")).toBe(true);
  });
});

describe("ativos do assistente", () => {
  it("todo estado tem animação e equivalente estático mapeados", () => {
    for (const estado of todosOsEstados) {
      expect(ativoPorEstado[estado]).toBeTruthy();
      expect(estaticoPorEstado[estado]).toBeTruthy();
      expect(urlEstatica(estado)).toBeTruthy();
    }
  });

  it("movimento reduzido sempre usa a versão estática", () => {
    expect(
      deveUsarEstatico({
        estado: "listening",
        movimentoReduzido: true,
        baixaEstimulacao: false,
        lottieHabilitado: true,
      }),
    ).toBe(true);
  });

  it("baixa estimulação sempre usa a versão estática", () => {
    expect(
      deveUsarEstatico({
        estado: "organizing",
        movimentoReduzido: false,
        baixaEstimulacao: true,
        lottieHabilitado: true,
      }),
    ).toBe(true);
  });
});
