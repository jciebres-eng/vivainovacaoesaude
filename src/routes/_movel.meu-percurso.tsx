import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Bookmark, Plus, RotateCcw } from "lucide-react";

import {
  BibliotecaRelacionada,
  LinhaDoPercurso,
  SuperficieDeCartao,
  conteudoPorId,
} from "@/components/viva/mobile";
import { catalogoDoPerfil } from "@/lib/viva-catalogo";
import { useMontagem } from "@/lib/viva-montagem";
import { usePerfil } from "@/lib/viva-perfis";

export const Route = createFileRoute("/_movel/meu-percurso")({
  head: () => ({
    meta: [
      { title: "Meu percurso — VIVA" },
      {
        name: "description",
        content:
          "O percurso que você montou: situação, objetivo, apoios, estratégias e leituras. Tudo editável e retomável quando quiser.",
      },
      { property: "og:title", content: "Meu percurso — VIVA" },
      {
        property: "og:description",
        content: "Suas escolhas organizadas, sem cobrança e sem prazo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MeuPercurso,
});

function MeuPercurso() {
  const navigate = useNavigate();
  const { perfil } = usePerfil();
  const catalogo = catalogoDoPerfil(perfil);
  const { estado, carregado, iniciado, remover, irParaEtapa, recomecar } = useMontagem(perfil.id);

  if (!carregado) return null;

  const guardados = estado.paraDepois.map(conteudoPorId).filter(Boolean);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="viva-titulo-pagina text-text-primary">Meu percurso</h1>
        <p className="mt-2 viva-texto text-text-secondary">
          Isto é seu. Pode mudar, remover ou continuar depois — nada se perde e nada expira.
        </p>
      </header>

      {!iniciado ? (
        <SuperficieDeCartao destacado>
          <h2 className="viva-titulo-secao text-text-primary">Ainda não há escolhas aqui</h2>
          <p className="mt-2 viva-apoio text-text-secondary">
            Quando quiser, monte um percurso em passos curtos.
          </p>
          <Link
            to="/montar"
            className="viva-tap mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-destaque px-6 viva-texto-botao font-semibold text-action-primary-foreground"
          >
            <Plus className="h-5 w-5" aria-hidden />
            Começar
          </Link>
        </SuperficieDeCartao>
      ) : (
        <LinhaDoPercurso
          estado={estado}
          catalogo={catalogo}
          onEditar={(i) => {
            irParaEtapa(i);
            navigate({ to: "/montar" });
          }}
          onRemover={remover}
        />
      )}

      {guardados.length ? (
        <section aria-labelledby="depois-titulo">
          <h2 id="depois-titulo" className="viva-titulo-secao text-text-primary">
            Guardado para depois
          </h2>
          <ul className="mt-3 space-y-2">
            {guardados.map((item) => (
              <li key={item!.id}>
                <SuperficieDeCartao className="flex items-center gap-3 p-4">
                  <Bookmark className="h-4 w-4 shrink-0 text-text-secondary" aria-hidden />
                  <span className="min-w-0 flex-1 truncate viva-apoio text-text-primary">
                    {item!.titulo}
                  </span>
                </SuperficieDeCartao>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {iniciado ? (
        <>
          <BibliotecaRelacionada ids={perfil.conteudos} titulo="Leituras relacionadas" />
          <button
            type="button"
            onClick={recomecar}
            className="viva-tap inline-flex min-h-11 items-center gap-2 rounded-full viva-legenda font-medium text-text-secondary underline underline-offset-4"
          >
            <RotateCcw className="h-4 w-4" aria-hidden />
            Recomeçar do início
          </button>
        </>
      ) : null}
    </div>
  );
}
