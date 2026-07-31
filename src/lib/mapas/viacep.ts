/**
 * ViaCEP — apoio a endereços brasileiros.
 *
 * Serviço público e gratuito, usado só quando a pessoa digita um CEP. Se não
 * responder, o campo continua aceitando o lugar escrito com as próprias
 * palavras.
 */
export type EnderecoDeCep = {
  cep: string;
  rua: string;
  bairro: string;
  cidade: string;
  estado: string;
};

export function pareceCep(texto: string) {
  return /^\d{5}-?\d{3}$/.test(texto.trim());
}

export async function buscarCep(texto: string): Promise<EnderecoDeCep | null> {
  const limpo = texto.replace(/\D/g, "");
  if (limpo.length !== 8) return null;
  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${limpo}/json/`);
    if (!resposta.ok) return null;
    const dados = (await resposta.json()) as Record<string, string> & { erro?: boolean };
    if (dados.erro) return null;
    return {
      cep: dados.cep ?? limpo,
      rua: dados.logradouro ?? "",
      bairro: dados.bairro ?? "",
      cidade: dados.localidade ?? "",
      estado: dados.uf ?? "",
    };
  } catch {
    return null;
  }
}

export function enderecoEmTexto(endereco: EnderecoDeCep) {
  return [endereco.rua, endereco.bairro, endereco.cidade, endereco.estado]
    .filter(Boolean)
    .join(", ");
}
