import { describe, expect, it } from "vitest";

import { obterProvedor, estaEmModoDemonstrativo, origemDosDados } from "@/lib/providers/registry";
import { validarCep } from "@/lib/providers/demo";

describe("modo demonstrativo", () => {
  it("está ativo quando não há nenhuma chave configurada", () => {
    expect(estaEmModoDemonstrativo()).toBe(true);
    expect(origemDosDados()).toBe("demonstrativo");
  });
});

describe("provedores demonstrativos", () => {
  it("busca lugares por texto e identifica a origem", async () => {
    const resposta = await obterProvedor("lugares").buscarPorTexto("mercado");
    expect(resposta.dados.length).toBeGreaterThan(0);
    expect(resposta.origem).toBe("demonstrativo");
    expect(resposta.provedor).toBeTruthy();
    expect(resposta.aviso).toBeTruthy();
  });

  it("ordena lugares próximos pela distância", async () => {
    const { dados } = await obterProvedor("lugares").buscarProximos(-23.56, -46.65);
    const distancias = dados.map((l) => l.distanciaEmMetros ?? 0);
    expect([...distancias].sort((a, b) => a - b)).toEqual(distancias);
  });

  it("monta uma rota com passos e pontos de referência", async () => {
    const { dados } = await obterProvedor("rotas").calcularRota("Casa", "Mercado do bairro");
    expect(dados.passos.length).toBeGreaterThan(2);
    expect(dados.duracaoEmMinutos).toBeGreaterThan(0);
    expect(dados.passos.every((p) => p.descricao.length > 0)).toBe(true);
  });

  it("descreve o mapa em texto quando não há serviço externo", async () => {
    const { dados } = await obterProvedor("mapas").mapaDoPercurso("Casa", "Mercado");
    expect(dados.imagem).toBeNull();
    expect(dados.descricaoAcessivel).toContain("Mercado");
  });

  it("valida CEP antes de qualquer busca", async () => {
    expect(validarCep("01001-000")).toBe(true);
    expect(validarCep("abc")).toBe(false);
    const invalido = await obterProvedor("enderecos").buscarPorCep("abc");
    expect(invalido.dados).toBeNull();
  });

  it("entrega conteúdo da biblioteca por contexto", async () => {
    const { dados } = await obterProvedor("conteudo").porContexto("mobilidade");
    expect(dados.length).toBeGreaterThan(0);
    expect(dados.every((c) => c.contextos.includes("mobilidade"))).toBe(true);
  });

  it("guarda e apaga memória apenas neste dispositivo", () => {
    const memoria = obterProvedor("memoria");
    memoria.apagarTudo();
    memoria.gravar({
      id: "teste-1",
      tipo: "registro",
      criadoEm: new Date().toISOString(),
      conteudo: { nota: "demonstrativo" },
    });
    expect(memoria.listar()).toHaveLength(1);
    memoria.remover("teste-1");
    expect(memoria.listar()).toHaveLength(0);
  });
});
