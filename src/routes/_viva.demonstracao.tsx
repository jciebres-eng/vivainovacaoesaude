import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { Botao, Card } from "@/components/ds";
import { SeloDemonstrativo } from "@/components/viva/selo-demonstrativo";
import { criarPercurso } from "@/lib/viva-percursos";
import { situacaoPorId } from "@/lib/viva-situacoes";

export const Route = createFileRoute("/_viva/demonstracao")({
  head: () => ({
    meta: [
      { title: "Demonstração guiada — a jornada de Ana | VIVA" },
      {
        name: "description",
        content:
          "Percorra, passo a passo e com dados fictícios, como o VIVA ajuda Ana a se preparar para a primeira reunião presencial no novo trabalho.",
      },
      { property: "og:title", content: "Demonstração guiada — VIVA" },
      {
        property: "og:description",
        content: "Uma história fictícia para conhecer o fluxo completo, do primeiro pedido ao registro.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Demonstracao,
});

/**
 * Demonstração guiada — a história de Ana (documento 05 e 06).
 *
 * Persona fictícia, dados fictícios, nenhuma geolocalização real, nenhum
 * compartilhamento real e nenhuma notificação. A pessoa pode avançar, voltar
 * e sair em qualquer momento.
 */
const passos: { titulo: string; texto: string; nota?: string }[] = [
  {
    titulo: "Quem é Ana",
    texto:
      "Ana tem 29 anos, é adulta neurodivergente e está começando um novo emprego. Ela pediu previsibilidade, menos estímulos, instruções claras e a possibilidade de pausa.",
    nota: "Persona fictícia, criada apenas para esta demonstração.",
  },
  {
    titulo: "A intenção",
    texto:
      "Na tela inicial, Ana escreve: “preciso me preparar para minha primeira reunião presencial”. Ela poderia também escolher uma situação pronta ou usar a voz.",
  },
  {
    titulo: "O contexto",
    texto:
      "O VIVA pergunta o essencial: de onde ela sai, para onde vai, como pretende se deslocar e a que horas. Nada é obrigatório e tudo pode mudar depois.",
  },
  {
    titulo: "As preferências",
    texto:
      "Ana indica que prefere menos informações por tela e quer saber onde ficam as saídas. A interface se reorganiza a partir dessas escolhas.",
  },
  {
    titulo: "As estratégias",
    texto:
      "Aparecem possibilidades curtas: chegar um pouco antes, levar frases prontas, combinar pausas. Ana aceita as que combinam com ela e descarta o resto.",
    nota: "Não existe resposta certa ou errada: são possibilidades.",
  },
  {
    titulo: "O percurso",
    texto:
      "As etapas aceitas formam uma trilha simples, em ordem, com tempo estimado. Ana pode reordenar, remover ou reescrever qualquer etapa.",
  },
  {
    titulo: "A preparação",
    texto:
      "Antes do dia, Ana revisa o que precisa levar, lê um conteúdo curto da Biblioteca sobre organizar perguntas e guarda uma alternativa com menos trocas.",
  },
  {
    titulo: "A simulação",
    texto:
      "Opcional: Ana passa mentalmente pelas etapas, escolhendo entre respostas possíveis. Nada é avaliado — ela pode adaptar qualquer resposta ou criar a própria.",
  },
  {
    titulo: "A execução",
    texto:
      "No dia, o VIVA mostra um passo por vez, com pausa sempre disponível e a alternativa à mão. Ana pode parar e retomar de onde parou.",
  },
  {
    titulo: "O registro",
    texto:
      "Depois, Ana conta como foi com as próprias palavras: o que ajudou, o que poderia ser diferente. Sem notas, sem pontuação, e ela pode pular.",
  },
  {
    titulo: "A evolução",
    texto:
      "O que ela registrou fica em “Evolução”: estratégias que funcionaram, conteúdos úteis e percursos que ela pode reutilizar em situações parecidas.",
  },
];

function Demonstracao() {
  const navigate = useNavigate();
  const [passo, setPasso] = useState(0);
  const atual = passos[passo];
  const ultimo = passo === passos.length - 1;

  function abrirJornadaDeAna() {
    const situacao = situacaoPorId("reuniao");
    if (!situacao) return;
    const novo = criarPercurso(
      situacao,
      "Preparar minha primeira reunião presencial no novo trabalho (demonstração)",
    );
    navigate({ to: "/percurso/$id", params: { id: novo.id }, search: { fase: "preparar" } });
  }

  return (
    <div className="space-y-6">
      <header>
        <p className="viva-legenda font-medium text-destaque-texto">Demonstração guiada</p>
        <h1 className="mt-1 viva-titulo-pagina text-text-primary">A jornada de Ana</h1>
        <p className="mt-2 viva-apoio text-text-secondary">
          Onze passos curtos para conhecer o fluxo completo. Você pode avançar, voltar e sair quando
          quiser.
        </p>
      </header>

      <SeloDemonstrativo
        sempreVisivel
        texto="Este é um ambiente demonstrativo. Não insira dados pessoais ou clínicos reais."
      />

      <Card variante="proximo-passo" titulo={atual.titulo} descricao={atual.nota}>
        <p aria-live="polite" className="viva-texto text-text-primary">
          {atual.texto}
        </p>
        <p className="mt-4 viva-legenda text-text-secondary">
          Passo {passo + 1} de {passos.length}
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          {passo > 0 ? (
            <Botao variante="secundario" onClick={() => setPasso((p) => p - 1)}>
              Voltar
            </Botao>
          ) : null}
          {ultimo ? (
            <Botao onClick={abrirJornadaDeAna}>Montar a jornada de Ana</Botao>
          ) : (
            <Botao onClick={() => setPasso((p) => p + 1)}>Continuar</Botao>
          )}
        </div>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Link
          to="/"
          className="viva-tap inline-flex min-h-11 items-center rounded-full border border-border-default px-5 viva-legenda font-medium text-text-primary"
        >
          Sair da demonstração
        </Link>
        <Link
          to="/biblioteca"
          className="viva-tap inline-flex min-h-11 items-center rounded-full border border-border-default px-5 viva-legenda font-medium text-text-primary"
        >
          Ver a Biblioteca
        </Link>
      </div>
    </div>
  );
}
