import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Play, RotateCcw } from "lucide-react";

import {
  BibliotecaRelacionada,
  ResumoDoPercurso,
  SeletorDePerfil,
  SuperficieDeCartao,
} from "@/components/viva/mobile";
import { useMontagem } from "@/lib/viva-montagem";
import { usePerfil } from "@/lib/viva-perfis";
import { catalogoDoPerfil } from "@/lib/viva-catalogo";

export const Route = createFileRoute("/_movel/")({
  head: () => ({
    meta: [
      { title: "VIVA — Como posso ajudar você agora?" },
      {
        name: "description",
        content:
          "Um apoio calmo para organizar o dia: escolha o que faz sentido agora e monte seu percurso em passos curtos, no seu ritmo.",
      },
      { property: "og:title", content: "VIVA — Como posso ajudar você agora?" },
      {
        property: "og:description",
        content: "Escolha o que faz sentido agora e monte seu percurso em passos curtos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Inicio,
});

function Inicio() {
  const { perfil } = usePerfil();
  const { estado, iniciado, carregado } = useMontagem(perfil.id);
  const catalogo = catalogoDoPerfil(perfil);

  const blocos = {
    continuar:
      carregado && iniciado ? (
        <SuperficieDeCartao key="continuar" destacado>
          <h2 className="viva-titulo-secao text-text-primary">Continuar de onde parou</h2>
          <div className="mt-3">
            <ResumoDoPercurso estado={estado} catalogo={catalogo} />
          </div>
          <Link
            to="/montar"
            className="viva-tap mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-destaque px-6 viva-texto-botao font-semibold text-action-primary-foreground"
          >
            <Play className="h-5 w-5" aria-hidden />
            Continuar
          </Link>
          <Link
            to="/meu-percurso"
            className="viva-tap mt-2 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full viva-legenda font-medium text-text-secondary underline underline-offset-4"
          >
            Ver meu percurso
          </Link>
        </SuperficieDeCartao>
      ) : null,

    novo: (
      <SuperficieDeCartao key="novo" destacado={!iniciado}>
        <h2 className="viva-titulo-secao text-text-primary">Montar um percurso</h2>
        <p className="mt-2 viva-apoio text-text-secondary">
          Um cartão de cada vez. Você escolhe o que entra, o que fica para depois e o que não faz
          sentido agora.
        </p>
        <Link
          to="/montar"
          className="viva-tap mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-destaque px-6 viva-texto-botao font-semibold text-action-primary-foreground"
        >
          {iniciado ? (
            <>
              <RotateCcw className="h-5 w-5" aria-hidden />
              Rever as escolhas
            </>
          ) : (
            <>
              Começar
              <ArrowRight className="h-5 w-5" aria-hidden />
            </>
          )}
        </Link>
      </SuperficieDeCartao>
    ),

    estrategias: (
      <section key="estrategias" aria-labelledby="estrategias-titulo">
        <h2 id="estrategias-titulo" className="viva-titulo-secao text-text-primary">
          Estratégias que podem ajudar hoje
        </h2>
        <ul className="mt-3 space-y-2">
          {perfil.estrategias.slice(0, 3).map((e) => (
            <li key={e.id}>
              <SuperficieDeCartao className="flex items-start gap-3 p-4">
                <span
                  aria-hidden
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-destaque-suave text-destaque-texto"
                >
                  <e.icone className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block viva-apoio font-semibold text-text-primary">
                    {e.titulo}
                  </span>
                  <span className="block viva-legenda text-text-secondary">{e.frase}</span>
                </span>
              </SuperficieDeCartao>
            </li>
          ))}
        </ul>
      </section>
    ),

    biblioteca: (
      <div key="biblioteca">
        <BibliotecaRelacionada ids={perfil.conteudos} titulo="Para ler com calma" />
        <Link
          to="/biblioteca"
          className="viva-tap mt-3 inline-flex min-h-11 items-center gap-2 rounded-full viva-legenda font-medium text-text-secondary underline underline-offset-4"
        >
          <BookOpen className="h-4 w-4" aria-hidden />
          Ver toda a biblioteca
        </Link>
      </div>
    ),
  };

  return (
    <div className="space-y-8">
      <header>
        <p className="viva-legenda text-text-secondary">{perfil.contexto}</p>
        <h1 className="mt-1 viva-titulo-pagina text-text-primary">{perfil.saudacao}</h1>
        <p className="mt-3 viva-texto text-text-secondary">{perfil.perguntaDeAbertura}</p>
      </header>

      {perfil.ordemDaHome.map((bloco) => blocos[bloco])}

      <SeletorDePerfil />

      <p className="viva-legenda text-text-secondary">
        Demonstração com dados fictícios. Tudo fica apenas neste dispositivo e o VIVA não substitui
        acompanhamento profissional.
      </p>
    </div>
  );
}
