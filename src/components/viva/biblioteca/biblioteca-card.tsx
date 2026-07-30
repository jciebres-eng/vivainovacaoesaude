import { BookOpen, Clock3, Tag } from "lucide-react";

import { Botao } from "@/components/ds";
import { cn } from "@/lib/utils";
import {
  rotulosDeArea,
  rotulosDeComplexidade,
  type ConteudoDaBiblioteca,
} from "@/lib/viva-biblioteca-dados";
import { dataLegivel, rotulosDeUtilidade, type MarcacaoDeUtilidade } from "@/lib/viva-biblioteca";
import { Link } from "@tanstack/react-router";

/**
 * BibliotecaCard — cartão de conteúdo da Biblioteca VIVA.
 *
 * Mostra o suficiente para decidir se vale abrir: título, área, resumo curto,
 * tempo de leitura, nível de complexidade e etiquetas. Nada de estrelas,
 * notas ou comparação com outras pessoas (documentos 13, 14 e 15).
 */
export function BibliotecaCard({
  conteudo,
  salvo = false,
  utilidade,
  ultimoAcesso,
  estrategiaRelacionada,
  experienciaRelacionada,
  adaptado = false,
  onSalvar,
  compacto = false,
}: {
  conteudo: ConteudoDaBiblioteca;
  salvo?: boolean;
  utilidade?: MarcacaoDeUtilidade;
  ultimoAcesso?: string;
  estrategiaRelacionada?: string;
  experienciaRelacionada?: string;
  adaptado?: boolean;
  onSalvar?: () => void;
  compacto?: boolean;
}) {
  return (
    <article
      className={cn(
        "rounded-3xl border border-border-default bg-surface-default shadow-suave",
        compacto ? "p-4" : "p-5 md:p-6",
      )}
    >
      <p className="flex items-center gap-2 viva-legenda text-text-secondary">
        <BookOpen className="h-4 w-4 shrink-0" aria-hidden />
        {rotulosDeArea[conteudo.area].nome}
      </p>

      <h3 className="mt-2 viva-subtitulo text-text-primary">
        <Link
          to="/biblioteca/$conteudoId"
          params={{ conteudoId: conteudo.id }}
          className="underline-offset-4 hover:underline"
        >
          {conteudo.titulo}
        </Link>
      </h3>

      <p className="mt-2 max-w-[62ch] viva-apoio text-text-secondary">
        {conteudo.resumo}
      </p>

      <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 viva-legenda text-text-secondary">
        <span className="inline-flex items-center gap-1.5">
          <Clock3 className="h-4 w-4" aria-hidden />
          Cerca de {conteudo.minutos} minutos
        </span>
        <span>{rotulosDeComplexidade[conteudo.complexidade]}</span>
      </p>

      <ul className="mt-3 flex flex-wrap gap-2" aria-label="Etiquetas">
        {conteudo.etiquetas.map((e) => (
          <li
            key={e}
            className="inline-flex items-center gap-1.5 rounded-full bg-surface-muted px-3 py-1 viva-legenda text-text-secondary"
          >
            <Tag className="h-3.5 w-3.5" aria-hidden />
            {e}
          </li>
        ))}
      </ul>

      {estrategiaRelacionada || experienciaRelacionada || utilidade || adaptado ? (
        <dl className="mt-4 space-y-1 viva-legenda text-text-secondary">
          {estrategiaRelacionada ? (
            <div className="flex flex-wrap gap-1">
              <dt>Estratégia relacionada:</dt>
              <dd className="text-text-primary">{estrategiaRelacionada}</dd>
            </div>
          ) : null}
          {experienciaRelacionada ? (
            <div className="flex flex-wrap gap-1">
              <dt>Experiência relacionada:</dt>
              <dd className="text-text-primary">{experienciaRelacionada}</dd>
            </div>
          ) : null}
          {utilidade ? (
            <div className="flex flex-wrap gap-1">
              <dt>Sua marcação:</dt>
              <dd className="text-text-primary">
                {rotulosDeUtilidade[utilidade]}
              </dd>
            </div>
          ) : null}
          {adaptado ? (
            <div className="flex flex-wrap gap-1">
              <dt>Versão pessoal:</dt>
              <dd className="text-text-primary">você adaptou este conteúdo</dd>
            </div>
          ) : null}
        </dl>
      ) : null}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Link
          to="/biblioteca/$conteudoId"
          params={{ conteudoId: conteudo.id }}
          className="viva-tap inline-flex min-h-11 items-center justify-center rounded-full bg-action-primary px-6 py-3 viva-texto-botao font-semibold text-action-primary-foreground hover:bg-action-primary/90"
        >
          Abrir conteúdo
        </Link>
        {onSalvar ? (
          <Botao variante="terciario" tamanho="compacto" onClick={onSalvar}>
            {salvo ? "Remover dos salvos" : "Salvar para depois"}
          </Botao>
        ) : null}
      </div>

      {ultimoAcesso ? (
        <p className="mt-3 viva-legenda text-text-secondary">
          Último acesso em {dataLegivel(ultimoAcesso)}.
        </p>
      ) : null}
    </article>
  );
}
