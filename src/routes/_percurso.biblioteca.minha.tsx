import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { Botao, Card, EstadoDaInterface } from "@/components/ds";
import { BibliotecaCard } from "@/components/viva/biblioteca";
import { Screen, ScreenHeader } from "@/components/viva/screen";
import { conteudoPorId } from "@/lib/viva-biblioteca-dados";
import { useBiblioteca } from "@/lib/viva-biblioteca";

export const Route = createFileRoute("/_percurso/biblioteca/minha")({
  head: () => ({
    meta: [
      { title: "Minha Biblioteca — o que você guardou | VIVA" },
      {
        name: "description",
        content:
          "Os conteúdos que você salvou, adaptou ou adicionou ao seu plano. Tudo guardado apenas neste dispositivo.",
      },
      { property: "og:title", content: "Minha Biblioteca — VIVA" },
      {
        property: "og:description",
        content: "Seu repertório pessoal de conteúdos e estratégias.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MinhaBibliotecaScreen,
});

type Aba = "salvos" | "adaptados" | "plano" | "estrategias";

const abas: { chave: Aba; rotulo: string }[] = [
  { chave: "salvos", rotulo: "Salvos" },
  { chave: "adaptados", rotulo: "Adaptados por você" },
  { chave: "plano", rotulo: "No seu plano" },
  { chave: "estrategias", rotulo: "Estratégias adotadas" },
];

function MinhaBibliotecaScreen() {
  const { dados, alternarSalvo, removerDoPlano, removerEstrategia } =
    useBiblioteca();
  const [aba, setAba] = useState<Aba>("salvos");

  const salvos = dados.salvos
    .map((id) => conteudoPorId(id))
    .filter((c) => c !== undefined);
  const adaptados = Object.keys(dados.adaptacoes)
    .map((id) => conteudoPorId(id))
    .filter((c) => c !== undefined);

  return (
    <>
      <ScreenHeader
        title="Minha Biblioteca"
        intro="Aqui fica o que você escolheu guardar. Nada é avaliado e nada precisa ser concluído."
      />

      <Screen>
        <nav aria-label="Seções da sua biblioteca" className="flex flex-wrap gap-2">
          {abas.map((a) => (
            <Botao
              key={a.chave}
              variante={aba === a.chave ? "principal" : "secundario"}
              tamanho="compacto"
              aria-pressed={aba === a.chave}
              onClick={() => setAba(a.chave)}
            >
              {a.rotulo}
            </Botao>
          ))}
        </nav>

        {aba === "salvos" ? (
          salvos.length === 0 ? (
            <Vazio texto="Você ainda não salvou nenhum conteúdo." />
          ) : (
            <div className="space-y-4">
              {salvos.map((c) => (
                <BibliotecaCard
                  key={c.id}
                  conteudo={c}
                  salvo
                  utilidade={dados.uteis[c.id]}
                  adaptado={Boolean(dados.adaptacoes[c.id])}
                  ultimoAcesso={dados.acessos[c.id]?.ultimoEm}
                  onSalvar={() => alternarSalvo(c.id)}
                />
              ))}
            </div>
          )
        ) : null}

        {aba === "adaptados" ? (
          adaptados.length === 0 ? (
            <Vazio texto="Você ainda não adaptou nenhum conteúdo à sua maneira." />
          ) : (
            <div className="space-y-4">
              {adaptados.map((c) => {
                const a = dados.adaptacoes[c.id];
                return (
                  <Card key={c.id} variante="biblioteca" titulo={c.titulo}>
                    {a.resumoPessoal ? (
                      <p className="max-w-[62ch] viva-texto text-text-primary">
                        {a.resumoPessoal}
                      </p>
                    ) : null}
                    {a.lembrete ? (
                      <p className="mt-2 viva-apoio text-text-secondary">
                        Lembrete: {a.lembrete}
                      </p>
                    ) : null}
                    <p className="mt-2 viva-legenda text-text-secondary">
                      {a.blocosOcultos.length} trecho(s) ocultado(s) ·{" "}
                      {a.blocosDestacados.length} destacado(s)
                    </p>
                    <div className="mt-4">
                      <Link
                        to="/biblioteca/$conteudoId"
                        params={{ conteudoId: c.id }}
                        className="viva-tap inline-flex min-h-11 items-center rounded-full border border-border-default-default px-5 py-2.5 viva-legenda font-medium text-text-primary hover:bg-surface-muted"
                      >
                        Abrir sua versão
                      </Link>
                    </div>
                  </Card>
                );
              })}
            </div>
          )
        ) : null}

        {aba === "plano" ? (
          dados.plano.length === 0 ? (
            <Vazio texto="Nenhum conteúdo foi adicionado ao seu plano até agora." />
          ) : (
            <div className="space-y-4">
              {dados.plano.map((item) => {
                const c = conteudoPorId(item.conteudoId);
                if (!c) return null;
                return (
                  <Card key={item.id} variante="rotina" titulo={c.titulo}>
                    <p className="viva-apoio text-text-secondary">
                      Quando: {item.quando}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <Link
                        to="/biblioteca/$conteudoId"
                        params={{ conteudoId: c.id }}
                        className="viva-tap inline-flex min-h-11 items-center rounded-full border border-border-default-default px-5 py-2.5 viva-legenda font-medium text-text-primary hover:bg-surface-muted"
                      >
                        Abrir conteúdo
                      </Link>
                      <Botao
                        variante="terciario"
                        tamanho="compacto"
                        onClick={() => removerDoPlano(item.id)}
                      >
                        Tirar do plano
                      </Botao>
                    </div>
                  </Card>
                );
              })}
            </div>
          )
        ) : null}

        {aba === "estrategias" ? (
          dados.estrategias.length === 0 ? (
            <Vazio texto="Você ainda não adotou estratégias a partir da biblioteca." />
          ) : (
            <div className="space-y-4">
              {dados.estrategias.map((e) => (
                <Card key={e.id} variante="habilidade" titulo={e.nome}>
                  <p className="max-w-[62ch] viva-apoio text-text-secondary">
                    {e.comoAjuda}
                  </p>
                  <div className="mt-4">
                    <Botao
                      variante="terciario"
                      tamanho="compacto"
                      onClick={() => removerEstrategia(e.id)}
                    >
                      Não uso mais esta estratégia
                    </Botao>
                  </div>
                </Card>
              ))}
            </div>
          )
        ) : null}

        <Link
          to="/biblioteca"
          className="viva-tap inline-flex min-h-11 items-center rounded-full border border-border-default-default bg-surface-default px-5 py-3 viva-legenda font-medium text-text-primary hover:bg-surface-muted"
        >
          Voltar para a biblioteca
        </Link>
      </Screen>
    </>
  );
}

function Vazio({ texto }: { texto: string }) {
  return (
    <EstadoDaInterface
      tipo="vazio"
      titulo={texto}
      texto="Quando quiser, você pode explorar a biblioteca no seu ritmo."
      acao={
        <Link
          to="/biblioteca"
          className="viva-tap inline-flex min-h-11 items-center rounded-full border border-border-default-default bg-surface-default px-5 py-3 viva-legenda font-medium text-text-primary hover:bg-surface-muted"
        >
          Ver conteúdos
        </Link>
      }
    />
  );
}
