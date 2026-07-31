import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Pause, Play, ShieldCheck, Star, StarOff } from "lucide-react";
import { useEffect, useState } from "react";

import { PainelDoAgente } from "@/components/viva/agente";
import { useAgente, type EstadoDoAgente } from "@/lib/viva-agente";

import { AreaDeTexto, Botao, Card, Nota } from "@/components/ds";
import { EditorDePercurso } from "@/components/viva/percurso/editor";
import {
  AlternativasDoPercurso,
  LeiturasDoPercurso,
  LinhaDeEtapas,
  MapaDoPercurso,
  ResumoDoPercurso,
} from "@/components/viva/percurso/visao";
import { cn } from "@/lib/utils";
import { fasesDoPercurso, percursos, usePercurso, type FaseDoPercurso } from "@/lib/viva-percursos";

const fasesValidas = fasesDoPercurso.map((f) => f.id) as FaseDoPercurso[];

export const Route = createFileRoute("/_movel/percurso/$id")({
  validateSearch: (search: Record<string, unknown>): { fase: FaseDoPercurso } => {
    const fase = String(search.fase ?? "preparar") as FaseDoPercurso;
    return { fase: fasesValidas.includes(fase) ? fase : "preparar" };
  },
  head: () => ({
    meta: [
      { title: "Seu percurso — VIVA" },
      {
        name: "description",
        content:
          "Preparar, aprender, ensaiar, realizar e registrar: um passo por vez, com pausa sempre disponível e tudo guardado só neste aparelho.",
      },
      { property: "og:title", content: "Seu percurso — VIVA" },
      {
        property: "og:description",
        content: "Um percurso editável, com estratégias, leituras e planos alternativos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PaginaDoPercurso,
});

const estadoPorFase: Record<FaseDoPercurso, EstadoDoAgente> = {
  preparar: "mostrando-percurso",
  aprender: "mostrando-estrategia",
  ensaiar: "aguardando-decisao",
  realizar: "acompanhando",
  registrar: "concluido",
};

function PaginaDoPercurso() {
  const { id } = Route.useParams();
  const { fase } = Route.useSearch();
  const navigate = useNavigate();
  const percurso = usePercurso(id);
  const agente = useAgente();

  useEffect(() => {
    agente.irPara(estadoPorFase[fase as FaseDoPercurso]);
  }, [fase, agente]);

  if (!percurso) {
    return (
      <div className="space-y-5">
        <h1 className="viva-titulo-pagina text-text-primary">Este percurso não está aqui</h1>
        <p className="viva-apoio text-text-secondary">
          Ele pode ter sido apagado neste aparelho. Você pode montar outro quando quiser.
        </p>
        <Botao variante="principal" onClick={() => navigate({ to: "/" })}>
          Voltar ao início
        </Botao>
      </div>
    );
  }

  const irPara = (proxima: FaseDoPercurso) =>
    navigate({ to: "/percurso/$id", params: { id }, search: { fase: proxima } });

  return (
    <div className="space-y-6">
      <PainelDoAgente frase={fasesDoPercurso.find((f) => f.id === fase)?.convite} />
      <header>
        <p className="viva-legenda text-text-secondary">Percurso</p>
        <h1 className="mt-1 viva-titulo-pagina text-text-primary">{percurso.titulo}</h1>
        <div className="mt-3 flex flex-wrap gap-2">
          <Botao
            variante="terciario"
            tamanho="compacto"
            icone={percurso.favorito ? StarOff : Star}
            onClick={() => percursos.favoritar(percurso.id, !percurso.favorito)}
          >
            {percurso.favorito ? "Tirar dos favoritos" : "Guardar nos favoritos"}
          </Botao>
          <Botao
            variante="terciario"
            tamanho="compacto"
            onClick={() => {
              const copia = percursos.duplicar(percurso.id);
              if (copia)
                navigate({
                  to: "/percurso/$id",
                  params: { id: copia.id },
                  search: { fase: "preparar" },
                });
            }}
          >
            Criar uma nova versão
          </Botao>
        </div>
      </header>

      <nav aria-label="Fases do percurso">
        <ul className="flex flex-wrap gap-2">
          {fasesDoPercurso.map((f) => (
            <li key={f.id}>
              <button
                type="button"
                aria-current={f.id === fase ? "step" : undefined}
                onClick={() => irPara(f.id)}
                className={cn(
                  "viva-tap min-h-11 rounded-full px-4 viva-legenda font-medium",
                  f.id === fase
                    ? "bg-destaque-suave text-destaque-texto"
                    : "border border-border-default text-text-secondary",
                )}
              >
                {f.titulo}
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-2 viva-legenda text-text-secondary">
          {fasesDoPercurso.find((f) => f.id === fase)?.convite}
        </p>
      </nav>

      {fase === "preparar" ? (
        <>
          <ResumoDoPercurso percurso={percurso} />
          <EditorDePercurso percurso={percurso} />
          <MapaDoPercurso percurso={percurso} />
          <Card variante="proximo-passo" titulo="Quando quiser">
            <Botao
              variante="principal"
              onClick={() => {
                percursos.marcarPronto(percurso.id);
                irPara("aprender");
              }}
            >
              Seguir para as leituras
            </Botao>
            <Nota>Parar por aqui também é um resultado. O percurso fica guardado.</Nota>
          </Card>
        </>
      ) : null}

      {fase === "aprender" ? (
        <>
          <LeiturasDoPercurso percurso={percurso} />
          <AlternativasDoPercurso
            percurso={percurso}
            acao={{ texto: "Ajustar na preparação", onClick: () => irPara("preparar") }}
          />
          <Botao variante="principal" onClick={() => irPara("ensaiar")}>
            Seguir para o ensaio
          </Botao>
        </>
      ) : null}

      {fase === "ensaiar" ? (
        <>
          <Card variante="informativo" titulo="Ensaio mental">
            <p className="viva-apoio text-text-secondary">
              Leia as etapas imaginando cada uma. Não é preciso sair do lugar, e parar no meio é
              permitido.
            </p>
          </Card>
          <LinhaDeEtapas percurso={percurso} />
          {percurso.estrategias.length > 0 ? (
            <Card variante="informativo" titulo="Suas estratégias para hoje">
              <ul className="space-y-2">
                {percurso.estrategias.map((e) => (
                  <li key={e.id}>
                    <p className="viva-apoio font-semibold text-text-primary">{e.titulo}</p>
                    <p className="viva-legenda text-text-secondary">{e.frase}</p>
                  </li>
                ))}
              </ul>
            </Card>
          ) : null}
          <div className="flex flex-wrap gap-3">
            <Botao
              variante="principal"
              onClick={() => {
                percursos.iniciar(percurso.id);
                irPara("realizar");
              }}
            >
              Começar de verdade
            </Botao>
            <Botao variante="secundario" onClick={() => irPara("preparar")}>
              Voltar e ajustar
            </Botao>
          </div>
        </>
      ) : null}

      {fase === "realizar" ? <Realizacao percursoId={id} /> : null}

      {fase === "registrar" ? <Registro percursoId={id} /> : null}
    </div>
  );
}

function Realizacao({ percursoId }: { percursoId: string }) {
  const percurso = usePercurso(percursoId);
  const navigate = useNavigate();
  if (!percurso) return null;

  const etapa = percurso.etapas[percurso.etapaAtual];
  const ultima = percurso.etapaAtual >= percurso.etapas.length - 1;
  const emPausa = percurso.estado === "pausado";
  const concluido = percurso.estado === "concluido";

  if (concluido) {
    return (
      <Card variante="experiencia" titulo="Você chegou ao fim deste percurso">
        <p className="viva-apoio text-text-secondary">
          Registrar como foi é opcional e pode ser feito depois.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Botao
            variante="principal"
            onClick={() =>
              navigate({
                to: "/percurso/$id",
                params: { id: percursoId },
                search: { fase: "registrar" },
              })
            }
          >
            Registrar como foi
          </Botao>
          <Botao variante="secundario" onClick={() => navigate({ to: "/" })}>
            Encerrar por hoje
          </Botao>
        </div>
      </Card>
    );
  }

  return (
    <>
      <Card variante="proximo-passo" titulo={etapa?.titulo ?? "Sem etapas"}>
        <p className="viva-apoio text-text-secondary">{etapa?.apoio}</p>
        {etapa?.referencia ? (
          <p className="mt-2 viva-legenda text-text-secondary">
            Ponto de referência: {etapa.referencia}
          </p>
        ) : null}
        {emPausa ? (
          <Nota>Percurso em pausa. Retomar quando quiser — e não retomar também é válido.</Nota>
        ) : null}
        <div className="mt-5 flex flex-wrap gap-3">
          {emPausa ? (
            <Botao variante="principal" icone={Play} onClick={() => percursos.retomar(percursoId)}>
              Retomar
            </Botao>
          ) : (
            <Botao variante="principal" onClick={() => percursos.avancar(percursoId)}>
              {ultima ? "Cheguei ao fim" : "Passei desta etapa"}
            </Botao>
          )}
          {!emPausa ? (
            <Botao variante="secundario" icone={Pause} onClick={() => percursos.pausar(percursoId)}>
              Pausar
            </Botao>
          ) : null}
          {percurso.etapaAtual > 0 ? (
            <Botao
              variante="terciario"
              tamanho="compacto"
              onClick={() => percursos.voltar(percursoId)}
            >
              Voltar uma etapa
            </Botao>
          ) : null}
        </div>
      </Card>

      <LinhaDeEtapas percurso={percurso} destacarAtual />
      <MapaDoPercurso percurso={percurso} />
      <AlternativasDoPercurso percurso={percurso} />

      <Card variante="informativo" titulo="Acompanhamento">
        <p className="viva-apoio text-text-secondary">
          Ninguém acompanha nada sem sua autorização, e ela vale só por este percurso.
        </p>
        <div className="mt-4">
          <Botao
            variante="secundario"
            icone={ShieldCheck}
            onClick={() => navigate({ to: "/compartilhar" })}
          >
            Quero que alguém acompanhe
          </Botao>
        </div>
      </Card>

      <Card variante="informativo" titulo="Encerrar">
        <Botao
          variante="terciario"
          tamanho="compacto"
          onClick={() => {
            percursos.encerrar(percursoId);
            navigate({ to: "/" });
          }}
        >
          Encerrar este percurso agora
        </Botao>
      </Card>
    </>
  );
}

function Registro({ percursoId }: { percursoId: string }) {
  const percurso = usePercurso(percursoId);
  const navigate = useNavigate();
  const [comoFoi, setComoFoi] = useState("");
  const [ajudou, setAjudou] = useState("");
  const [dificultou, setDificultou] = useState("");
  const [ajuste, setAjuste] = useState("");
  if (!percurso) return null;

  return (
    <>
      <Card variante="registro" titulo="Como foi, com suas palavras">
        <p className="viva-apoio text-text-secondary">
          Não há avaliação, nota nem correção. Responder é sempre opcional.
        </p>
        <div className="mt-4 grid gap-4">
          <AreaDeTexto
            rotulo="Como foi"
            value={comoFoi}
            onChange={(e) => setComoFoi(e.target.value)}
            rows={3}
          />
          <AreaDeTexto
            rotulo="O que ajudou"
            value={ajudou}
            onChange={(e) => setAjudou(e.target.value)}
            rows={2}
          />
          <AreaDeTexto
            rotulo="O que dificultou"
            value={dificultou}
            onChange={(e) => setDificultou(e.target.value)}
            rows={2}
          />
          <AreaDeTexto
            rotulo="O que você mudaria numa próxima vez"
            value={ajuste}
            onChange={(e) => setAjuste(e.target.value)}
            rows={2}
          />
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Botao
            variante="principal"
            onClick={() => {
              percursos.registrar(percursoId, { comoFoi, ajudou, dificultou, ajuste });
              navigate({ to: "/meu-percurso" });
            }}
          >
            Guardar este registro
          </Botao>
          <Botao variante="secundario" onClick={() => navigate({ to: "/" })}>
            Registrar depois
          </Botao>
        </div>
      </Card>

      {percurso.registros.length > 0 ? (
        <Card variante="informativo" titulo="Registros anteriores deste percurso">
          <ul className="space-y-3">
            {percurso.registros.map((r) => (
              <li key={r.id}>
                <p className="viva-legenda text-text-secondary">
                  {new Date(r.criadoEm).toLocaleDateString("pt-BR")}
                </p>
                <p className="viva-apoio text-text-primary">{r.comoFoi || "Sem descrição."}</p>
              </li>
            ))}
          </ul>
        </Card>
      ) : null}
    </>
  );
}
