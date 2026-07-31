/**
 * ProviderRegistry — ponto único de acesso aos serviços externos.
 *
 * Regra do protótipo: se não houver chave configurada, o VIVA continua
 * funcionando com os provedores demonstrativos e informa isso à pessoa.
 * Nenhuma tela quebra por ausência de credencial (documentos 03, 05 e 15).
 */
import {
  provedorDeConteudoDemonstrativo,
  provedorDeEnderecoDemonstrativo,
  provedorDeFalaDoNavegador,
  provedorDeLocalizacaoDoNavegador,
  provedorDeLugaresDemonstrativo,
  provedorDeMapaDemonstrativo,
  provedorDeMemoriaLocal,
  provedorDeRotasDemonstrativo,
} from "./demo";
import type { ConjuntoDeProvedores, MapProvider, OrigemDoDado } from "./tipos";

export type ChaveDeProvedor = keyof ConjuntoDeProvedores;

function leitura(nome: string): string {
  const ambiente = import.meta.env as Record<string, string | undefined>;
  return (ambiente[nome] ?? "").trim();
}

/** Chave de mapas. Ausente por padrão: o protótipo não exige nenhuma. */
export function chaveDeMapas() {
  return leitura("VITE_MAPS_API_KEY");
}

/**
 * Mapa externo: só abre o serviço de terceiros mediante ação explícita da
 * pessoa. Nunca embutimos um mapa que carregue sozinho.
 */
const provedorDeMapaExterno: MapProvider = {
  nome: "Mapa externo",
  async mapaDoPercurso(origem, destino) {
    const link = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
      origem,
    )}&destination=${encodeURIComponent(destino)}`;
    return {
      dados: {
        imagem: null,
        linkExterno: link,
        descricaoAcessivel: `Abrir o percurso de ${origem} até ${destino} em um mapa externo.`,
      },
      origem: "externo",
      provedor: "Mapa externo",
      aviso: "Ao abrir, você sai do VIVA e passa a usar um serviço de terceiros.",
    };
  },
};

const provedores: ConjuntoDeProvedores = {
  lugares: provedorDeLugaresDemonstrativo,
  rotas: provedorDeRotasDemonstrativo,
  mapas: chaveDeMapas() ? provedorDeMapaExterno : provedorDeMapaDemonstrativo,
  enderecos: provedorDeEnderecoDemonstrativo,
  localizacao: provedorDeLocalizacaoDoNavegador,
  fala: provedorDeFalaDoNavegador,
  memoria: provedorDeMemoriaLocal,
  conteudo: provedorDeConteudoDemonstrativo,
};

export function obterProvedor<C extends ChaveDeProvedor>(chave: C): ConjuntoDeProvedores[C] {
  return provedores[chave];
}

/** Permite substituir um provedor em testes ou em uma integração futura. */
export function registrarProvedor<C extends ChaveDeProvedor>(
  chave: C,
  provedor: ConjuntoDeProvedores[C],
) {
  provedores[chave] = provedor;
}

/** O protótipo está em Modo Demonstrativo quando não há nenhum serviço real. */
export function estaEmModoDemonstrativo() {
  return !chaveDeMapas();
}

export function origemDosDados(): OrigemDoDado {
  return estaEmModoDemonstrativo() ? "demonstrativo" : "externo";
}

export const textoDoModoDemonstrativo =
  "Este protótipo usa informações demonstrativas. Nada aqui é um dado real de uma pessoa.";
