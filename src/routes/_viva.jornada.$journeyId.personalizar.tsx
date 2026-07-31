import { Link, createFileRoute } from "@tanstack/react-router";

import { SeletorDeModo } from "@/components/viva/visual";
import { PreferenciasDoPerfil } from "@/components/viva/mobile";

export const Route = createFileRoute("/_viva/jornada/$journeyId/personalizar")({
  head: () => ({
    meta: [
      { title: "Personalizar a experiência — VIVA" },
      {
        name: "description",
        content:
          "Ajuste ritmo, estímulos, quantidade de texto e formato do percurso. Cada mudança aparece na hora e continua neste aparelho.",
      },
      { property: "og:title", content: "Personalizar a experiência — VIVA" },
      {
        property: "og:description",
        content: "Modos de experiência e preferências aplicados imediatamente ao seu percurso.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Personalizar,
});

function Personalizar() {
  const { journeyId } = Route.useParams();

  return (
    <div className="space-y-6">
      <header>
        <p className="viva-legenda text-text-secondary">Este percurso</p>
        <h1 className="mt-1 viva-titulo-pagina text-text-primary">Personalizar a experiência</h1>
        <p className="mt-2 viva-apoio text-text-secondary">
          Tudo aqui muda a forma como o percurso aparece, não o conteúdo das suas escolhas.
        </p>
      </header>

      <SeletorDeModo />
      <PreferenciasDoPerfil />

      <Link
        to="/jornada/$journeyId/revisar"
        params={{ journeyId }}
        className="viva-tap inline-flex min-h-11 items-center rounded-full bg-destaque px-5 viva-texto-botao text-action-primary-foreground"
      >
        Voltar para o percurso
      </Link>
    </div>
  );
}
