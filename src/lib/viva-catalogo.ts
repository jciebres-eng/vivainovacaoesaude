import type { CatalogoDoPerfil } from "@/components/viva/mobile/percurso";
import { conteudoParaCartao } from "@/components/viva/mobile/percurso";
import type { Perfil } from "@/lib/viva-perfis";

/**
 * Catálogo de cartões de um perfil, organizado pelas etapas da montagem.
 * A biblioteca acompanha o percurso: os conteúdos entram como cartões.
 */
export function catalogoDoPerfil(perfil: Perfil): CatalogoDoPerfil {
  return {
    situacao: perfil.situacoes,
    objetivo: perfil.objetivos,
    dificuldade: perfil.dificuldades,
    apoio: perfil.apoios,
    estrategias: perfil.estrategias,
    conteudos: perfil.conteudos
      .map(conteudoParaCartao)
      .filter(Boolean) as CatalogoDoPerfil["conteudos"],
  };
}
