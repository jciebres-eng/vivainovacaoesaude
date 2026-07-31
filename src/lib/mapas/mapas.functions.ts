/**
 * Ponte fina entre a interface e o conector de mapas.
 *
 * Só declarações de server functions: a lógica vive em `gateway.server.ts`.
 */
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const textoBusca = z.object({
  texto: z.string().trim().min(2).max(160),
  lat: z.number().min(-90).max(90).optional(),
  lng: z.number().min(-180).max(180).optional(),
});

export const buscarLugaresFn = createServerFn({ method: "POST" })
  .inputValidator((entrada: unknown) => textoBusca.parse(entrada))
  .handler(async ({ data }) => {
    const { buscarLugares } = await import("./gateway.server");
    const proximo =
      data.lat != null && data.lng != null ? { lat: data.lat, lng: data.lng } : undefined;
    try {
      return { lugares: await buscarLugares(data.texto, proximo), erro: null as string | null };
    } catch (erro) {
      console.error("[mapas] busca de lugares", erro);
      return { lugares: [], erro: mensagem(erro) };
    }
  });

export const detalhesDoLugarFn = createServerFn({ method: "POST" })
  .inputValidator((entrada: unknown) =>
    z.object({ placeId: z.string().min(3).max(300) }).parse(entrada),
  )
  .handler(async ({ data }) => {
    const { detalhesDoLugar } = await import("./gateway.server");
    try {
      return { lugar: await detalhesDoLugar(data.placeId), erro: null as string | null };
    } catch (erro) {
      console.error("[mapas] detalhes do lugar", erro);
      return { lugar: null, erro: mensagem(erro) };
    }
  });

export const geocodificarFn = createServerFn({ method: "POST" })
  .inputValidator((entrada: unknown) =>
    z.object({ endereco: z.string().trim().min(3).max(240) }).parse(entrada),
  )
  .handler(async ({ data }) => {
    const { geocodificar } = await import("./gateway.server");
    try {
      return { resultados: await geocodificar(data.endereco), erro: null as string | null };
    } catch (erro) {
      console.error("[mapas] geocodificação", erro);
      return { resultados: [], erro: mensagem(erro) };
    }
  });

export const geocodificarInversoFn = createServerFn({ method: "POST" })
  .inputValidator((entrada: unknown) =>
    z
      .object({ lat: z.number().min(-90).max(90), lng: z.number().min(-180).max(180) })
      .parse(entrada),
  )
  .handler(async ({ data }) => {
    const { geocodificarInverso } = await import("./gateway.server");
    try {
      return { resultado: await geocodificarInverso(data.lat, data.lng), erro: null as string | null };
    } catch (erro) {
      console.error("[mapas] geocodificação inversa", erro);
      return { resultado: null, erro: mensagem(erro) };
    }
  });

export const calcularRotaFn = createServerFn({ method: "POST" })
  .inputValidator((entrada: unknown) =>
    z
      .object({
        origem: z.object({ lat: z.number().min(-90).max(90), lng: z.number().min(-180).max(180) }),
        destino: z.object({ lat: z.number().min(-90).max(90), lng: z.number().min(-180).max(180) }),
        modo: z.enum(["caminhada", "carro", "transporte"]),
      })
      .parse(entrada),
  )
  .handler(async ({ data }) => {
    const { calcularRota } = await import("./gateway.server");
    try {
      return {
        rota: await calcularRota(data.origem, data.destino, data.modo),
        erro: null as string | null,
      };
    } catch (erro) {
      console.error("[mapas] cálculo de rota", erro);
      return { rota: null, erro: mensagem(erro) };
    }
  });

function mensagem(erro: unknown) {
  const texto = erro instanceof Error ? erro.message : String(erro);
  if (texto === "mapas_indisponiveis") {
    return "O serviço de mapas não está disponível agora. Você pode continuar escrevendo o lugar com suas palavras.";
  }
  if (texto.startsWith("mapas_falha") || texto.startsWith("geocodificacao_")) {
    return "Não conseguimos consultar os mapas neste momento. Nada do seu percurso foi perdido.";
  }
  return texto;
}
