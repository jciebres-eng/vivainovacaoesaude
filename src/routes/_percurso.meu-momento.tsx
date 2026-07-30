import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";

import { Botao } from "@/components/ds";
import { Screen } from "@/components/viva/screen";
import {
  FormularioDeEstrategia,
  ReflexaoPosExperiencia,
  RegistroDeDuvida,
  RegistroDeExperiencia,
  SemProximoPasso,
} from "@/components/viva/funcionais";
import { MeuMomentoCard, ProximoPassoCard, RetomarAtividadeCard } from "@/components/viva/humanos";
import {
  AvisoDeArmazenamento,
  BibliotecaRelacionada,
  CabecalhoDaHome,
  ComoEstouAgora,
  MinhasEstrategias,
  PerguntaDeAbertura,
  PreferenciasDaHomeSecao,
  ReflexaoOpcional,
  SecaoRecolhivel,
  RegistrosRecentes,
  montarRegistrosRecentes,
  type PossibilidadeDaHome,
} from "@/components/viva/home/secoes";
import { conteudos } from "@/lib/viva-data";
import { useMomento } from "@/lib/viva-momento";
import { usePercurso } from "@/lib/viva-percurso";
import { useViva } from "@/lib/viva-store";
import { useExperiencia } from "@/lib/viva-experiencia";

export const Route = createFileRoute("/_percurso/meu-momento")({
  head: () => ({
    meta: [
      { title: "Meu momento — VIVA" },
      {
        name: "description",
        content:
          "Um espaço calmo para ver onde você está no seu percurso, registrar como está agora e escolher o que fazer em seguida.",
      },
      { property: "og:title", content: "Meu momento — VIVA" },
      {
        property: "og:description",
        content:
          "Sem metas, sem sequências, sem cobrança: apenas o que faz sentido para você agora.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MeuMomentoPage,
});

type Registro = "nenhum" | "experiencia" | "reflexao" | "duvida" | "estrategia";

function MeuMomentoPage() {
  const navigate = useNavigate();
  const percurso = usePercurso();
  const momento = useMomento();
  useViva();
  const { preferencias, ajustar } = useExperiencia();
  const baixoEstimulo = preferencias.aparencia.tema === "baixo-estimulo";
  const comAnimacao = !preferencias.movimento.reduzirAnimacoes;

  const [registro, setRegistro] = useState<Registro>("nenhum");
  const areaDeRegistro = useRef<HTMLDivElement>(null);

  const abrirRegistro = (tipo: Registro) => {
    setRegistro(tipo);
    requestAnimationFrame(() =>
      areaDeRegistro.current?.scrollIntoView({
        behavior: comAnimacao ? "smooth" : "auto",
        block: "start",
      }),
    );
  };

  const atividade =
    percurso.atividades.find((a) => a.estado === "em-preparacao") ??
    percurso.atividades.find((a) => a.estado === "disponivel") ??
    percurso.atividades[0];

  const experienciaSemReflexao = percurso.experiencias.find((e) => !e.reflexaoId);
  const preparacaoSalva = percurso.preparacoes[0];

  const relacionados = useMemo(
    () => conteudos.slice(0, momento.preferencias.conteudosRelacionados),
    [momento.preferencias.conteudosRelacionados],
  );

  const registrosRecentes = useMemo(
    () =>
      montarRegistrosRecentes({
        preparacoes: percurso.preparacoes,
        experiencias: percurso.experiencias,
        estrategias: percurso.estrategias,
        duvidas: percurso.duvidas,
        conteudosUteis: conteudos
          .filter((c) => momento.conteudos.uteis.includes(c.id))
          .map((c) => ({ id: c.id, titulo: c.titulo })),
      }),
    [
      percurso.preparacoes,
      percurso.experiencias,
      percurso.estrategias,
      percurso.duvidas,
      momento.conteudos.uteis,
    ],
  );

  const principais: PossibilidadeDaHome[] = [
    {
      id: "continuar",
      rotulo: atividade
        ? `Continuar de onde parei · ${atividade.titulo}`
        : "Continuar de onde parei",
      onSelecionar: () => navigate({ to: "/jornada/preparacao" }),
    },
    {
      id: "registrar",
      rotulo: "Registrar algo que aconteceu",
      onSelecionar: () => abrirRegistro("experiencia"),
    },
    {
      id: "explorar",
      rotulo: "Explorar um conteúdo",
      onSelecionar: () => navigate({ to: "/biblioteca" }),
    },
    {
      id: "so-olhar",
      rotulo: "Só olhar por enquanto",
      onSelecionar: () => setRegistro("nenhum"),
    },
  ];

  const outras: PossibilidadeDaHome[] = [
    {
      id: "estrategia",
      rotulo: "Guardar uma estratégia minha",
      onSelecionar: () => abrirRegistro("estrategia"),
    },
    {
      id: "duvida",
      rotulo: "Registrar uma dúvida",
      onSelecionar: () => abrirRegistro("duvida"),
    },
    {
      id: "percurso",
      rotulo: "Ver meu percurso até aqui",
      onSelecionar: () => navigate({ to: "/jornada/linha-do-tempo" }),
    },
    {
      id: "pausa",
      rotulo: "Encerrar por hoje",
      onSelecionar: () => navigate({ to: "/jornada/encerramento" }),
    },
  ];

  const reflexoes: PossibilidadeDaHome[] = [
    {
      id: "ajudou",
      rotulo: "Anotar algo que ajudou",
      onSelecionar: () => abrirRegistro("estrategia"),
    },
    {
      id: "duvida-2",
      rotulo: "Registrar uma dúvida",
      onSelecionar: () => abrirRegistro("duvida"),
    },
    {
      id: "livre",
      rotulo: "Escrever livremente",
      onSelecionar: () => abrirRegistro("experiencia"),
    },
    ...(experienciaSemReflexao
      ? [
          {
            id: "reflexao",
            rotulo: "Refletir sobre uma experiência",
            onSelecionar: () => abrirRegistro("reflexao"),
          },
        ]
      : []),
    {
      id: "depois",
      rotulo: "Deixar para outro momento",
      onSelecionar: () => setRegistro("nenhum"),
    },
  ];

  const secaoBiblioteca =
    relacionados.length && !baixoEstimulo ? (
      <BibliotecaRelacionada
        conteudos={relacionados}
        salvos={momento.conteudos.salvos}
        uteis={momento.conteudos.uteis}
        onSalvar={(id) => momento.alternarConteudo("salvos", id)}
        onMarcarUtil={(id) => momento.alternarConteudo("uteis", id)}
        onRegistrarDuvida={() => abrirRegistro("duvida")}
        onAdicionarEstrategia={() => abrirRegistro("estrategia")}
      />
    ) : null;

  const secaoEstrategias = percurso.estrategias.length ? (
    <MinhasEstrategias
      estrategias={percurso.estrategias}
      onAdicionarAoPlano={() => navigate({ to: "/jornada/preparacao" })}
      onRegistrarObservacao={() => abrirRegistro("experiencia")}
    />
  ) : null;

  return (
    <Screen>
      <div className="mx-auto w-full max-w-3xl space-y-10">
        <CabecalhoDaHome
          nome={momento.nome}
          baixoEstimulo={baixoEstimulo}
          onAlternarBaixoEstimulo={() =>
            ajustar(
              {
                aparencia: {
                  tema: baixoEstimulo ? "claro" : "baixo-estimulo",
                },
              },
              baixoEstimulo
                ? "A aparência voltou ao modo claro."
                : "A aparência está em baixa estimulação. Você pode voltar quando quiser.",
            )
          }
        />

        {momento.erro ? (
          <AvisoDeArmazenamento
            mensagem={momento.erro}
            onTentarNovamente={momento.tentarNovamente}
            onFechar={momento.dispensarErro}
          />
        ) : null}

        <PerguntaDeAbertura principais={principais} outras={outras} reduzido={baixoEstimulo} />

        {momento.preferencias.mostrarEstadoAtual ? (
          <MeuMomentoCard
            onSeguirSugestao={() => navigate({ to: "/jornada/preparacao" })}
            onPular={() => momento.definirPreferencia({ mostrarEstadoAtual: false })}
          />
        ) : null}

        {atividade ? (
          <section aria-label="Próximo passo">
            <ProximoPassoCard
              onComecar={() => navigate({ to: "/jornada/preparacao" })}
              onAdiar={() => percurso.definirEstadoDaAtividade(atividade.id, "pausado")}
              onRecusar={() => navigate({ to: "/jornada/objetivo" })}
            />
          </section>
        ) : (
          <SemProximoPasso onExplorar={() => navigate({ to: "/biblioteca" })} />
        )}

        {preparacaoSalva || experienciaSemReflexao ? (
          <section aria-label="Continuar de onde parei">
            <RetomarAtividadeCard
              nome={
                percurso.atividades.find((a) => a.id === percurso.continuidade.ultimaAtividadeId)
                  ?.titulo
              }
              onContinuar={() => navigate({ to: "/jornada/preparacao" })}
              onRevisar={() => navigate({ to: "/jornada/objetivo" })}
              onRetomarDepois={() => navigate({ to: "/jornada/encerramento" })}
            />
          </section>
        ) : null}

        <div ref={areaDeRegistro} className="space-y-4">
          <ReflexaoOpcional opcoes={baixoEstimulo ? reflexoes.slice(0, 2) : reflexoes} />

          {registro === "experiencia" ? (
            <RegistroDeExperiencia
              onSalvar={(e) => {
                percurso.salvarExperiencia(e);
                setRegistro("nenhum");
              }}
            />
          ) : null}

          {registro === "duvida" ? (
            <RegistroDeDuvida
              onSalvar={(d) => {
                percurso.salvarDuvida(d);
                setRegistro("nenhum");
              }}
            />
          ) : null}

          {registro === "estrategia" ? (
            <FormularioDeEstrategia
              onSalvar={(e) => {
                percurso.salvarEstrategia(e);
                setRegistro("nenhum");
              }}
              onCancelar={() => setRegistro("nenhum")}
            />
          ) : null}

          {registro === "reflexao" && experienciaSemReflexao ? (
            <ReflexaoPosExperiencia
              experiencia={experienciaSemReflexao}
              onSalvar={(r) => {
                percurso.salvarReflexao(r);
                setRegistro("nenhum");
              }}
            />
          ) : null}
        </div>

        {momento.preferencias.estrategiasPrimeiro ? (
          <>
            {secaoEstrategias}
            {secaoBiblioteca}
          </>
        ) : (
          <>
            {secaoBiblioteca}
            {secaoEstrategias}
          </>
        )}

        {momento.preferencias.mostrarRegistrosRecentes && !baixoEstimulo ? (
          <RegistrosRecentes
            registros={registrosRecentes}
            onOcultar={() => momento.definirPreferencia({ mostrarRegistrosRecentes: false })}
          />
        ) : null}

        <PreferenciasDaHomeSecao
          preferencias={momento.preferencias}
          onMudar={momento.definirPreferencia}
        />

        <p className="viva-legenda text-text-secondary">
          O VIVA não avalia, não classifica e não interpreta o que você registra. Tudo fica guardado
          apenas neste dispositivo.
        </p>

        <SecaoDeDemonstracao onAplicar={percurso.aplicarCenario} />
      </div>
    </Screen>
  );
}

/** Trocador de cenário fictício, recolhido por padrão para não competir com o conteúdo. */
function SecaoDeDemonstracao({
  onAplicar,
}: {
  onAplicar: (cenario: "primeiro-acesso" | "atividade-iniciada" | "apos-experiencia") => void;
}) {
  const [aberto, setAberto] = useState(false);
  return (
    <SecaoRecolhivel
      titulo="Ver esta página em outros momentos"
      apoio="Demonstração com dados fictícios."
      aberto={aberto}
      onAlternar={() => setAberto((a) => !a)}
    >
      <div className="flex flex-wrap gap-3">
        <Botao variante="terciario" tamanho="compacto" onClick={() => onAplicar("primeiro-acesso")}>
          No primeiro acesso
        </Botao>
        <Botao
          variante="terciario"
          tamanho="compacto"
          onClick={() => onAplicar("atividade-iniciada")}
        >
          Com uma atividade iniciada
        </Botao>
        <Botao
          variante="terciario"
          tamanho="compacto"
          onClick={() => onAplicar("apos-experiencia")}
        >
          Depois de uma experiência
        </Botao>
      </div>
    </SecaoRecolhivel>
  );
}
