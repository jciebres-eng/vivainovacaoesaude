import { RotateCcw, UserRound } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  gruposDePreferencia,
  usePerfil,
  type GrupoDePreferencia,
} from "@/lib/viva-perfis";

/**
 * Perfil único de demonstração.
 *
 * Não há mais troca de personagens: existe um único perfil (Alex) que acessa
 * todas as situações, estratégias, treinamentos e formas de personalização.
 * O que muda a experiência são as PREFERÊNCIAS — ajustáveis a qualquer
 * momento, sem diagnóstico e sem bloqueio de conteúdo (documentos 03, 10, 28).
 */

export function CartaoDoPerfil() {
  const { perfil } = usePerfil();
  const ativos = gruposDePreferencia.length;


  return (
    <section
      aria-labelledby="perfil-unico-titulo"
      className="rounded-3xl border border-border-default bg-surface-default p-5 shadow-suave"
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="grid h-12 w-12 place-items-center rounded-2xl bg-destaque-suave text-destaque-texto"
        >
          <UserRound className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <h2 id="perfil-unico-titulo" className="viva-subtitulo text-text-primary">
            {perfil.nome}
          </h2>
          <p className="viva-legenda text-text-secondary">{perfil.contexto}</p>
        </div>
      </div>
      <p className="mt-4 viva-apoio text-text-secondary">
        Este perfil acessa todas as situações, estratégias, treinamentos e formas de personalização.
        Nenhum diagnóstico, nível ou classificação é atribuído a você.
      </p>
      <p className="mt-2 viva-legenda text-text-secondary">
        {ativos} grupos de preferências disponíveis · tudo guardado apenas neste aparelho.
      </p>
    </section>
  );
}

function GrupoDeEscolhas({ grupo }: { grupo: GrupoDePreferencia }) {
  const { definirPreferencia, alternarPreferencia, temPreferencia } = usePerfil();

  return (
    <fieldset className="rounded-3xl border border-border-default bg-surface-default p-4">
      <legend className="px-1 viva-apoio font-semibold text-text-primary">{grupo.titulo}</legend>
      <p className="viva-legenda text-text-secondary">{grupo.pergunta}</p>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {grupo.opcoes.map((opcao) => {
          const escolhida = temPreferencia(grupo.chave, opcao.id);
          return (
            <li key={opcao.id}>
              <button
                type="button"
                aria-pressed={escolhida}
                onClick={() =>
                  grupo.multipla
                    ? alternarPreferencia(grupo.chave, opcao.id)
                    : definirPreferencia(grupo.chave, opcao.id)
                }
                className={cn(
                  "viva-tap w-full rounded-2xl border p-3 text-left",
                  escolhida
                    ? "border-2 border-destaque bg-destaque-suave"
                    : "border-border-default",
                )}
              >
                <span className="block viva-legenda font-semibold text-text-primary">
                  {opcao.rotulo}
                </span>
                <span className="block viva-legenda text-text-secondary">{opcao.apoio}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}

export function PreferenciasDoPerfil({ titulo = "Suas preferências" }: { titulo?: string }) {
  const { redefinirPreferencias } = usePerfil();

  return (
    <section aria-labelledby="preferencias-titulo" className="space-y-3">
      <div>
        <h2 id="preferencias-titulo" className="viva-titulo-secao text-text-primary">
          {titulo}
        </h2>
        <p className="mt-1 viva-apoio text-text-secondary">
          Ajuste o que quiser, quando quiser. Nada aqui limita o que você pode acessar.
        </p>
      </div>

      <div className="space-y-3">
        {gruposDePreferencia.map((grupo) => (
          <GrupoDeEscolhas key={grupo.chave} grupo={grupo} />
        ))}
      </div>

      <button
        type="button"
        onClick={redefinirPreferencias}
        className="viva-tap inline-flex min-h-11 items-center gap-2 rounded-full border border-border-default px-5 viva-legenda font-medium text-text-primary"
      >
        <RotateCcw className="h-4 w-4" aria-hidden />
        Voltar às preferências iniciais
      </button>
    </section>
  );
}

/** Animação curta de reorganização da experiência. */
export function PersonalizandoExperiencia() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 grid place-items-center bg-background/95 px-6 backdrop-blur-sm"
    >
      <div className="viva-fade flex flex-col items-center text-center">
        <span
          aria-hidden
          className="grid h-16 w-16 place-items-center rounded-full bg-destaque-suave text-destaque-texto"
        >
          <UserRound className="h-6 w-6 animate-pulse" />
        </span>
        <p className="mt-5 viva-subtitulo text-text-primary">Reorganizando sua experiência…</p>
        <p className="mt-1 viva-apoio text-text-secondary">Um instante.</p>
      </div>
    </div>
  );
}
