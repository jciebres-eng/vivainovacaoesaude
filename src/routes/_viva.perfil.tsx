import { Link, createFileRoute } from "@tanstack/react-router";
import { BookOpen, FileText, Shield, SlidersHorizontal } from "lucide-react";

import { CartaoDoPerfil, PreferenciasDoPerfil, SuperficieDeCartao } from "@/components/viva/mobile";
import { SeletorDeModo } from "@/components/viva/visual";
import { usePerfil } from "@/lib/viva-perfis";

export const Route = createFileRoute("/_viva/perfil")({
  head: () => ({
    meta: [
      { title: "Perfil — VIVA" },
      {
        name: "description",
        content:
          "Escolha o perfil de demonstração, ajuste sua experiência e veja como seus dados ficam apenas neste dispositivo.",
      },
      { property: "og:title", content: "Perfil — VIVA" },
      {
        property: "og:description",
        content: "Perfis de demonstração, preferências de experiência e cuidado com seus dados.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PerfilPagina,
});

const atalhos = [
  {
    to: "/minha-experiencia" as const,
    titulo: "Minha experiência",
    frase: "Ritmo, estímulos, tema e detalhamento.",
    icone: SlidersHorizontal,
  },
  {
    to: "/seus-dados" as const,
    titulo: "Seus dados",
    frase: "O que fica guardado e como apagar.",
    icone: Shield,
  },
  {
    to: "/sobre" as const,
    titulo: "Sobre o VIVA",
    frase: "O que a plataforma faz e o que não faz.",
    icone: FileText,
  },
  {
    to: "/documentacao" as const,
    titulo: "Base documental",
    frase: "Os documentos que orientam o projeto.",
    icone: BookOpen,
  },
];

function PerfilPagina() {
  const { perfil } = usePerfil();

  return (
    <div className="space-y-8">
      <header>
        <h1 className="viva-titulo-pagina text-text-primary">Perfil</h1>
        <p className="mt-2 viva-texto text-text-secondary">
          Você está usando o perfil de demonstração de {perfil.nome}. Ele acessa todas as situações e
          recursos: o que muda a experiência são suas preferências.
        </p>
      </header>

      <CartaoDoPerfil />

      <PreferenciasDoPerfil />


      <SeletorDeModo />

      <section aria-labelledby="ajustes-titulo">
        <h2 id="ajustes-titulo" className="viva-titulo-secao text-text-primary">
          Ajustes e transparência
        </h2>
        <ul className="mt-3 space-y-2">
          {atalhos.map((a) => (
            <li key={a.to}>
              <Link to={a.to} className="block">
                <SuperficieDeCartao className="flex items-center gap-3 p-4">
                  <span
                    aria-hidden
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-destaque-suave text-destaque-texto"
                  >
                    <a.icone className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block viva-apoio font-semibold text-text-primary">
                      {a.titulo}
                    </span>
                    <span className="block viva-legenda text-text-secondary">{a.frase}</span>
                  </span>
                </SuperficieDeCartao>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="viva-legenda text-text-secondary">
        Demonstração com dados fictícios. O VIVA apoia organização e reflexão; não substitui
        acompanhamento profissional.
      </p>
    </div>
  );
}
