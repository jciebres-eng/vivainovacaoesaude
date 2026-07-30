import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { Botao, Card, Nota } from "@/components/ds";
import { AcoesAutonomas, EscolhaAutonomaGroup } from "@/components/viva/humanos";
import { QuadroDoPercurso } from "@/components/viva/percurso/quadro";
import { categorias, objetivos } from "@/lib/viva-jornada-dados";
import { jornada, useJornada } from "@/lib/viva-jornada";

export const Route = createFileRoute("/percurso/objetivo")({
  head: () => ({
    meta: [
      { title: "Escolher um objetivo — Percurso VIVA" },
      {
        name: "description",
        content:
          "Escolha uma situação funcional que você gostaria de preparar, compreender ou experimentar. Você poderá mudar depois.",
      },
      { property: "og:title", content: "Escolher um objetivo — Percurso VIVA" },
      {
        property: "og:description",
        content: "Poucas opções por vez, sem metas, desafios ou missões.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: EscolhaDoObjetivo,
});

function EscolhaDoObjetivo() {
  const j = useJornada();
  const navigate = useNavigate();
  const [categoriaId, setCategoriaId] = useState<string | null>(j.categoriaId);
  const [selecionado, setSelecionado] = useState<string | null>(null);

  const daCategoria = objetivos.filter((o) => o.categoriaId === categoriaId);
  const escolhido = daCategoria.find((o) => o.id === selecionado);

  return (
    <QuadroDoPercurso
      titulo="O que você gostaria de preparar?"
      finalidade="Qual situação faz sentido trabalhar agora? Você poderá mudar essa escolha depois."
      voltarPara={categoriaId ? undefined : "/percurso/momento"}
      aoVoltar={categoriaId ? () => setCategoriaId(null) : undefined}
      baixaEstimulacao={j.preparacao.baixaEstimulacao}
      depois="Depois de escolher, você verá um resumo breve da atividade antes de começar."
    >
      {!categoriaId ? (
        <Card variante="informativo">
          <EscolhaAutonomaGroup
            titulo="Escolha uma área para começar"
            opcoes={categorias.map((c) => ({
              id: c.id,
              rotulo: c.nome,
              apoio: c.apoio,
            }))}
            valor={null}
            onEscolher={(id) => {
              setCategoriaId(id);
              setSelecionado(null);
              jornada.escolherCategoria(id);
            }}
            colunas="uma"
            nota="São apenas quatro áreas. Você pode voltar e trocar quando quiser."
          />
        </Card>
      ) : (
        <Card
          variante="informativo"
          titulo={categorias.find((c) => c.id === categoriaId)?.nome}
          descricao="Poucas possibilidades por vez, para reduzir decisões simultâneas."
        >
          <EscolhaAutonomaGroup
            titulo="Possibilidades desta área"
            opcoes={daCategoria.map((o) => ({
              id: o.id,
              rotulo: o.nome,
              apoio: o.disponivel
                ? o.duracao
                : "Disponível em uma próxima demonstração",
              desabilitada: !o.disponivel,
            }))}
            valor={selecionado}
            onEscolher={(id) => setSelecionado(id)}
            colunas="uma"
            nota="Nenhuma escolha é melhor que a outra."
          />

          <Nota>
            Nesta versão, apenas “Preparar uma rota alternativa” possui percurso
            completo. As demais aparecem como possibilidades futuras.
          </Nota>

          <AcoesAutonomas
            principal={
              <Botao
                variante="principal"
                disabled={!escolhido?.disponivel}
                onClick={() => {
                  if (!escolhido) return;
                  jornada.escolherObjetivo(escolhido.id, escolhido.nome);
                  navigate({ to: "/percurso/resumo" });
                }}
              >
                Escolher este objetivo
              </Botao>
            }
            secundarias={
              <>
                <Botao
                  variante="terciario"
                  tamanho="compacto"
                  onClick={() => setCategoriaId(null)}
                >
                  Ver outra possibilidade
                </Botao>
                <Botao
                  variante="terciario"
                  tamanho="compacto"
                  onClick={() => navigate({ to: "/percurso" })}
                >
                  Decidir depois
                </Botao>
              </>
            }
          />
        </Card>
      )}
    </QuadroDoPercurso>
  );
}
