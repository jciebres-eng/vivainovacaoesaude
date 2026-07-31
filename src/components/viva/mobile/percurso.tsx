import { Link } from "@tanstack/react-router";
import { BookOpen, GripVertical, Pencil, Trash2, X } from "lucide-react";
import type { ReactNode } from "react";

import { conteudosDaBiblioteca } from "@/lib/viva-biblioteca-dados";
import type { CartaoDeEscolha } from "@/lib/viva-perfis";
import { etapasDaMontagem, type EstadoDaMontagem, type IdDeEtapa } from "@/lib/viva-montagem";
import { SuperficieDeCartao } from "./cartoes";

/**
 * Meu percurso — as escolhas confirmadas aparecem organizadas, na ordem do
 * ciclo humano do VIVA: situação, objetivo, estratégias, biblioteca,
 * preparação, próximo passo e reflexão. Tudo pode ser editado, reorganizado,
 * removido ou retomado depois.
 */

export function conteudoPorId(id: string) {
  return conteudosDaBiblioteca.find((c) => c.id === id);
}

export type CatalogoDoPerfil = Record<IdDeEtapa, CartaoDeEscolha[]>;

export function LinhaDoPercurso({
  estado,
  catalogo,
  onEditar,
  onRemover,
  onMover,
}: {
  estado: EstadoDaMontagem;
  catalogo: CatalogoDoPerfil;
  onEditar: (indice: number) => void;
  onRemover: (etapa: IdDeEtapa, cartaoId: string) => void;
  onMover?: (etapa: IdDeEtapa, cartaoId: string, direcao: -1 | 1) => void;
}) {
  return (
    <ol className="space-y-4">
      {etapasDaMontagem.map((etapa, i) => {
        const ids = estado.escolhas[etapa.id];
        const itens = ids
          .map((id) =>
            etapa.id === "conteudos"
              ? conteudoParaCartao(id)
              : catalogo[etapa.id].find((c) => c.id === id),
          )
          .filter(Boolean) as CartaoDeEscolha[];

        return (
          <li key={etapa.id}>
            <SuperficieDeCartao>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                <h3 className="min-w-0 truncate viva-subtitulo text-text-primary">
                  {etapa.rotuloResumo}
                </h3>
                <button
                  type="button"
                  onClick={() => onEditar(i)}
                  className="viva-tap inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-3 viva-legenda font-medium text-text-secondary underline underline-offset-4"
                >
                  <Pencil className="h-4 w-4" aria-hidden />
                  {itens.length ? "Editar" : "Escolher"}
                </button>
              </div>

              {itens.length === 0 ? (
                <p className="mt-2 viva-apoio text-text-secondary">Ainda sem escolha aqui.</p>
              ) : (
                <ul className="mt-3 space-y-2">
                  {itens.map((item, indiceItem) => {
                    const Icone = item.icone;
                    return (
                      <li
                        key={item.id}
                        className="flex items-center gap-3 rounded-2xl bg-surface-muted px-3 py-3"
                      >
                        <span
                          aria-hidden
                          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-destaque-suave text-destaque-texto"
                        >
                          <Icone className="h-4 w-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate viva-apoio font-medium text-text-primary">
                            {item.titulo}
                          </span>
                          <span className="block truncate viva-legenda text-text-secondary">
                            {item.categoria}
                          </span>
                        </span>
                        {onMover && itens.length > 1 ? (
                          <span className="flex shrink-0 items-center">
                            <button
                              type="button"
                              onClick={() => onMover(etapa.id, item.id, -1)}
                              disabled={indiceItem === 0}
                              aria-label={`Mover ${item.titulo} para cima`}
                              className="viva-tap grid h-11 w-9 place-items-center rounded-full text-text-secondary disabled:opacity-40"
                            >
                              <GripVertical className="h-4 w-4 rotate-90" aria-hidden />
                            </button>
                          </span>
                        ) : null}
                        <button
                          type="button"
                          onClick={() => onRemover(etapa.id, item.id)}
                          aria-label={`Remover ${item.titulo} do percurso`}
                          className="viva-tap grid h-11 w-11 shrink-0 place-items-center rounded-full text-text-secondary"
                        >
                          <Trash2 className="h-4 w-4" aria-hidden />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </SuperficieDeCartao>
          </li>
        );
      })}
    </ol>
  );
}

export function conteudoParaCartao(id: string): CartaoDeEscolha | undefined {
  const conteudo = conteudoPorId(id);
  if (!conteudo) return undefined;
  return {
    id: conteudo.id,
    titulo: conteudo.titulo,
    frase: conteudo.resumo,
    categoria: `Biblioteca · ${conteudo.minutos} min`,
    icone: BookOpen,
    detalhes: conteudo.resumo,
  };
}

/** ResumoDoPercurso — visão curta do que já foi montado. */
export function ResumoDoPercurso({
  estado,
  catalogo,
}: {
  estado: EstadoDaMontagem;
  catalogo: CatalogoDoPerfil;
}) {
  const linhas = etapasDaMontagem
    .map((etapa) => {
      const ids = estado.escolhas[etapa.id];
      if (!ids.length) return null;
      const nomes = ids
        .map(
          (id) =>
            (etapa.id === "conteudos"
              ? conteudoParaCartao(id)
              : catalogo[etapa.id].find((c) => c.id === id)
            )?.titulo,
        )
        .filter(Boolean)
        .join(" · ");
      return { rotulo: etapa.rotuloResumo, nomes };
    })
    .filter(Boolean) as { rotulo: string; nomes: string }[];

  if (!linhas.length) return null;

  return (
    <dl className="space-y-3">
      {linhas.map((linha) => (
        <div key={linha.rotulo}>
          <dt className="viva-legenda text-text-secondary">{linha.rotulo}</dt>
          <dd className="viva-apoio text-text-primary">{linha.nomes}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * BibliotecaRelacionada — a biblioteca acompanha o percurso.
 * Sugestões aparecem a partir do que a pessoa já escolheu.
 */
export function BibliotecaRelacionada({
  ids,
  titulo = "Conteúdos relacionados",
  acao,
}: {
  ids: string[];
  titulo?: string;
  acao?: (id: string) => ReactNode;
}) {
  const itens = ids.map(conteudoPorId).filter(Boolean).slice(0, 4);
  if (!itens.length) return null;

  return (
    <section aria-labelledby="relacionados-titulo">
      <h2 id="relacionados-titulo" className="viva-titulo-secao text-text-primary">
        {titulo}
      </h2>
      <ul className="mt-3 space-y-3">
        {itens.map((item) => (
          <li key={item!.id}>
            <SuperficieDeCartao className="p-4">
              <div className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-destaque-suave text-destaque-texto"
                >
                  <BookOpen className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="viva-apoio font-semibold text-text-primary">{item!.titulo}</h3>
                  <p className="mt-1 viva-legenda text-text-secondary">
                    Leitura de {item!.minutos} min
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Link
                  to="/biblioteca/$conteudoId"
                  params={{ conteudoId: item!.id }}
                  className="viva-tap inline-flex min-h-11 items-center rounded-full border border-border-default px-4 viva-legenda font-medium text-text-primary"
                >
                  Abrir
                </Link>
                {acao?.(item!.id)}
              </div>
            </SuperficieDeCartao>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** ModalDeDetalhes — sem sobreposição de janelas, uma informação por vez. */
export function ModalDeDetalhes({
  cartao,
  onFechar,
}: {
  cartao: CartaoDeEscolha | null;
  onFechar: () => void;
}) {
  if (!cartao) return null;
  const Icone = cartao.icone;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Detalhes: ${cartao.titulo}`}
      className="fixed inset-0 z-40 flex items-end bg-foreground/25 px-4 pb-4"
      onClick={onFechar}
    >
      <div
        className="viva-fade w-full rounded-3xl border border-border-default bg-surface-default p-5 shadow-suave-alta"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span
              aria-hidden
              className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-destaque-suave text-destaque-texto"
            >
              <Icone className="h-4 w-4" />
            </span>
            <h2 className="min-w-0 viva-subtitulo text-text-primary">{cartao.titulo}</h2>
          </div>
          <button
            type="button"
            onClick={onFechar}
            aria-label="Fechar detalhes"
            className="viva-tap grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border-default"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
        <p className="mt-4 viva-texto text-text-secondary">{cartao.detalhes ?? cartao.frase}</p>
        <p className="mt-4 viva-legenda text-text-secondary">
          Isto é uma possibilidade de apoio, não uma recomendação clínica.
        </p>
      </div>
    </div>
  );
}
