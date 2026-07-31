import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { useJornada } from "@/lib/match/usar-jornada";

export const Route = createFileRoute("/_viva/jornada/$journeyId/feedback")({
  head: () => ({
    meta: [
      { title: "Como foi para você — VIVA" },
      {
        name: "description",
        content:
          "Registre como foi o percurso do jeito que preferir: por palavras, por imagens ou por poucas frases. Sem notas e sem avaliação.",
      },
      { property: "og:title", content: "Como foi para você — VIVA" },
      {
        property: "og:description",
        content: "Registro livre depois do percurso, sem pontuação e sem comparação.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Feedback,
});

const formatos = [
  { id: "palavras", titulo: "Escolher palavras" },
  { id: "imagens", titulo: "Escolher imagens" },
  { id: "frase", titulo: "Escrever uma frase" },
] as const;

const palavras = [
  "deu certo",
  "foi mais fácil",
  "foi cansativo",
  "precisei pausar",
  "quero repetir",
  "quero mudar algo",
];

function Feedback() {
  const { journeyId } = Route.useParams();
  const { jornada, carregando, salvar } = useJornada(journeyId);
  const [formato, setFormato] = useState<(typeof formatos)[number]["id"]>("palavras");
  const [escolhidas, setEscolhidas] = useState<string[]>([]);
  const [frase, setFrase] = useState("");
  const [guardado, setGuardado] = useState(false);

  if (carregando) {
    return <p className="viva-legenda text-text-secondary">Abrindo o registro…</p>;
  }
  if (!jornada) {
    return (
      <p className="viva-legenda text-text-secondary">
        Este percurso não está mais neste aparelho.
      </p>
    );
  }

  const atual = jornada;

  function guardar() {
    void salvar({
      ...atual,
      feedback: {
        formatoId: formato,
        formatoTitulo: formatos.find((f) => f.id === formato)?.titulo ?? formato,
        nota: formato === "frase" ? frase.trim() || undefined : escolhidas.join(", ") || undefined,
        em: new Date().toISOString(),
      },
    });
    setGuardado(true);
  }

  return (
    <div className="space-y-6">
      <header>
        <p className="viva-legenda text-text-secondary">Depois do percurso</p>
        <h1 className="mt-1 viva-titulo-pagina text-text-primary">Como foi para você?</h1>
        <p className="mt-2 viva-apoio text-text-secondary">
          Não existe resposta certa. Isso serve só para você lembrar depois.
        </p>
      </header>

      <fieldset className="space-y-2">
        <legend className="viva-legenda text-text-secondary">Do jeito que preferir</legend>
        <div className="flex flex-wrap gap-2">
          {formatos.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFormato(f.id)}
              aria-pressed={formato === f.id}
              className={`viva-tap min-h-11 rounded-full border border-border-default px-4 viva-legenda ${
                formato === f.id
                  ? "bg-destaque text-action-primary-foreground"
                  : "text-text-secondary"
              }`}
            >
              {f.titulo}
            </button>
          ))}
        </div>
      </fieldset>

      {formato === "frase" ? (
        <label className="block space-y-2">
          <span className="viva-legenda text-text-secondary">Uma frase basta</span>
          <textarea
            value={frase}
            onChange={(e) => setFrase(e.target.value)}
            rows={3}
            className="w-full rounded-2xl border border-border-default bg-superficie-elevada p-3 viva-apoio text-text-primary outline-none focus-visible:ring-2 focus-visible:ring-destaque"
          />
        </label>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {palavras.map((p) => {
            const ativo = escolhidas.includes(p);
            return (
              <li key={p}>
                <button
                  type="button"
                  aria-pressed={ativo}
                  onClick={() =>
                    setEscolhidas((atuais) =>
                      ativo ? atuais.filter((x) => x !== p) : [...atuais, p],
                    )
                  }
                  className={`viva-tap min-h-11 rounded-full border border-border-default px-4 viva-legenda ${
                    ativo ? "bg-destaque-suave text-destaque-texto" : "text-text-secondary"
                  }`}
                >
                  {p}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={guardar}
          className="viva-tap inline-flex min-h-11 items-center rounded-full bg-destaque px-5 viva-texto-botao text-action-primary-foreground"
        >
          Guardar neste aparelho
        </button>
        <Link
          to="/historico"
          className="viva-tap inline-flex min-h-11 items-center viva-legenda text-destaque-texto underline"
        >
          Ver meus percursos
        </Link>
      </div>

      <p aria-live="polite" className="viva-legenda text-text-secondary">
        {guardado ? "Registro guardado apenas neste aparelho." : ""}
      </p>
    </div>
  );
}
