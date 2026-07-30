import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

import { Note, Screen, ScreenHeader, SectionCard } from "@/components/viva/screen";

export const Route = createFileRoute("/_percurso/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre o VIVA — propósito e limites" },
      {
        name: "description",
        content:
          "O que o VIVA é, o que ele não faz e como ele apoia autonomia no dia a dia, sem substituir acompanhamento profissional.",
      },
      { property: "og:title", content: "Sobre o VIVA — propósito e limites" },
      {
        property: "og:description",
        content:
          "Propósito, princípios e limites da plataforma, em linguagem simples.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SobrePage,
});

const principios = [
  "A pessoa vem antes da tecnologia.",
  "A autonomia é o resultado esperado, não o tempo de uso.",
  "Cada pessoa tem um jeito próprio de funcionar. O sistema se adapta à pessoa.",
  "Mudanças acontecem em pequenos passos, no ritmo de cada um.",
  "Acessibilidade faz parte da essência, não é um extra.",
  "Cada tela mostra apenas o necessário para aquele momento.",
  "O ambiente não usa culpa, vergonha, punição ou comparação.",
];

const limites = [
  "não faz diagnóstico",
  "não substitui acompanhamento profissional",
  "não oferece psicoterapia",
  "não faz avaliação clínica",
  "não prescreve medicamentos",
  "não toma decisões no seu lugar",
];

function SobrePage() {
  return (
    <>
      <ScreenHeader
        title="Sobre o VIVA"
        intro="O VIVA apoia a organização de atividades do dia a dia. Ele acompanha o seu percurso. Ele não decide por você."
      />

      <Screen>
        <SectionCard title="Para que serve">
          <p className="text-card-foreground">
            Ajudar a transformar um objetivo real da sua vida em passos que façam
            sentido para você, no seu contexto e no seu ritmo.
          </p>
          <p className="mt-3 text-card-foreground">
            O sucesso do VIVA não é você usar a plataforma por muito tempo. É você
            precisar cada vez menos dela.
          </p>
        </SectionCard>

        <SectionCard title="Princípios">
          <ul className="space-y-2.5">
            {principios.map((p) => (
              <li key={p} className="flex gap-3 text-card-foreground">
                <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-salvia" />
                {p}
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Limites da plataforma">
          <p className="text-card-foreground">O VIVA:</p>
          <ul className="mt-3 space-y-2.5">
            {limites.map((l) => (
              <li key={l} className="flex gap-3 text-card-foreground">
                <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
                {l}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-card-foreground">
            Quando algo exigir avaliação ou cuidado profissional, procure um
            profissional habilitado ou um serviço de saúde da sua região.
          </p>
        </SectionCard>

        <SectionCard title="Sobre sugestões automáticas">
          <p className="text-card-foreground">
            Nesta versão não existe inteligência artificial. As sugestões vêm de
            regras simples, escritas de forma transparente na documentação do
            projeto. Você pode aceitar, ignorar ou modificar qualquer sugestão.
          </p>
        </SectionCard>

        <Note>
          Esta é uma demonstração. Os dados apresentados são fictícios e servem
          apenas para mostrar como a experiência funciona.
        </Note>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/seus-dados"
            className="viva-tap inline-flex rounded-full bg-primary px-6 py-3.5 font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Ver como seus dados são tratados
          </Link>
          <Link
            to="/documentacao"
            className="viva-tap inline-flex rounded-full border border-border bg-card px-5 py-3.5 viva-legenda font-medium text-card-foreground hover:bg-secondary"
          >
            Ler os documentos do projeto
          </Link>
        </div>
      </Screen>
    </>
  );
}
