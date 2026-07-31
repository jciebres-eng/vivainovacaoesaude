import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { useState } from "react";

import {
  BotaoDesfazer,
  IndicadorDeEtapa,
  LegendaDeGestos,
  ModalDeDetalhes,
  StackDeCards,
  type DecisaoDoCartao,
} from "@/components/viva/mobile";
import { catalogoDoPerfil } from "@/lib/viva-catalogo";
import { etapasDaMontagem, useMontagem } from "@/lib/viva-montagem";
import { usePerfil, type CartaoDeEscolha } from "@/lib/viva-perfis";

export const Route = createFileRoute("/_movel/montar")({
  head: () => ({
    meta: [
      { title: "Montar percurso — VIVA" },
      {
        name: "description",
        content:
          "Monte seu percurso um cartão por vez: situação, objetivo, dificuldades, apoios, estratégias e conteúdos.",
      },
      { property: "og:title", content: "Montar percurso — VIVA" },
      {
        property: "og:description",
        content: "Um cartão por vez, no seu ritmo, com tudo reversível.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Montar,
});

function Montar() {
  const navigate = useNavigate();
  const { perfil } = usePerfil();
  const catalogo = catalogoDoPerfil(perfil);
  const {
    estado,
    carregado,
    ultimaAcao,
    incluir,
    guardarParaDepois,
    registrarDescarte,
    desfazer,
    irParaEtapa,
    concluir,
  } = useMontagem(perfil.id);
  const [detalhes, setDetalhes] = useState<CartaoDeEscolha | null>(null);

  const indice = Math.min(estado.etapa, etapasDaMontagem.length - 1);
  const etapa = etapasDaMontagem[indice];
  const cartoes = catalogo[etapa.id];
  const escolhidos = estado.escolhas[etapa.id];

  function decidir(cartao: { id: string }, decisao: DecisaoDoCartao) {
    if (decisao === "incluir") incluir(etapa.id, cartao.id, !etapa.multipla);
    else if (decisao === "salvar") guardarParaDepois(cartao.id);
    else registrarDescarte(etapa.id, cartao.id);
  }

  function avancar() {
    if (indice < etapasDaMontagem.length - 1) irParaEtapa(indice + 1);
    else {
      concluir();
      navigate({ to: "/meu-percurso" });
    }
  }

  if (!carregado) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
        <button
          type="button"
          onClick={() => (indice === 0 ? navigate({ to: "/" }) : irParaEtapa(indice - 1))}
          className="viva-tap grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border-default"
          aria-label="Voltar"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
        </button>
        <IndicadorDeEtapa etapas={etapasDaMontagem} atual={indice} onIr={irParaEtapa} />
      </div>

      <header>
        <h1 className="viva-titulo-pagina text-text-primary">{etapa.pergunta}</h1>
        <p className="mt-2 viva-apoio text-text-secondary">{etapa.ajuda}</p>
      </header>

      <StackDeCards
        key={etapa.id}
        cartoes={cartoes}
        selecionados={escolhidos}
        rotuloIncluir={etapa.multipla ? "Incluir no percurso" : "Escolher"}
        onDecisao={decidir}
        onDetalhes={(c) => setDetalhes(c as CartaoDeEscolha)}
      />

      <BotaoDesfazer
        visivel={Boolean(ultimaAcao)}
        descricao="Sua última escolha pode ser revertida."
        onDesfazer={desfazer}
      />

      <LegendaDeGestos />

      <div className="space-y-2">
        <button
          type="button"
          onClick={avancar}
          className="viva-tap inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-destaque px-6 viva-texto-botao font-semibold text-action-primary-foreground"
        >
          <Check className="h-5 w-5" aria-hidden />
          {indice < etapasDaMontagem.length - 1 ? "Seguir" : "Ver meu percurso"}
        </button>
        <Link
          to="/meu-percurso"
          className="viva-tap inline-flex min-h-11 w-full items-center justify-center rounded-full viva-legenda font-medium text-text-secondary underline underline-offset-4"
        >
          Parar por aqui e guardar
        </Link>
      </div>

      <ModalDeDetalhes cartao={detalhes} onFechar={() => setDetalhes(null)} />
    </div>
  );
}
