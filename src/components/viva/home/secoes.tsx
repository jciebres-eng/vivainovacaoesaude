import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  ChevronDown,
  Leaf,
  Settings2,
} from "lucide-react";
import { useState, type ReactNode } from "react";

import {
  Botao,
  BotaoLink,
  Card,
  Chip,
  EstadoDaInterface,
} from "@/components/ds";
import {
  indicouPoucaEnergia,
  perguntasDoMomento,
  type EstadoAtual,
  type PreferenciasDaHome,
} from "@/lib/viva-momento";
import type { Conteudo } from "@/lib/viva-data";
import type { Duvida, Estrategia, Experiencia, Preparacao } from "@/lib/viva-percurso";

/**
 * Seções da Home "Meu momento" (documentos 00, 04, 09, 13, 14).
 *
 * Cada seção apresenta possibilidades, nunca cobranças: sem metas, sem
 * sequências, sem pontuação e sem interpretação do que a pessoa registra.
 */

/* --------------------------------------------------------------- cabeçalho */

export function CabecalhoDaHome({
  nome,
  baixoEstimulo,
  onAlternarBaixoEstimulo,
}: {
  nome: string;
  baixoEstimulo: boolean;
  onAlternarBaixoEstimulo: () => void;
}) {
  const hoje = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <header className="viva-fade grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
      <div className="min-w-0">
        <h1 className="truncate viva-titulo text-text-primary">Olá, {nome}.</h1>
        <p className="mt-1 viva-legenda text-text-secondary">
          <span className="first-letter:uppercase">{hoje}</span>
        </p>
      </div>
      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <Botao
          tamanho="compacto"
          icone={Leaf}
          onClick={onAlternarBaixoEstimulo}
          aria-pressed={baixoEstimulo}
        >
          {baixoEstimulo ? "Sair da baixa estimulação" : "Baixa estimulação"}
        </Botao>
        <BotaoLink to="/minha-experiencia" tamanho="compacto" icone={Settings2}>
          Minha experiência
        </BotaoLink>
      </div>
    </header>
  );
}

/* ------------------------------------------------------ pergunta de abertura */

export type PossibilidadeDaHome = {
  id: string;
  rotulo: string;
  onSelecionar: () => void;
};

export function PerguntaDeAbertura({
  principais,
  outras,
  reduzido = false,
}: {
  principais: PossibilidadeDaHome[];
  outras?: PossibilidadeDaHome[];
  reduzido?: boolean;
}) {
  const [verOutras, setVerOutras] = useState(false);
  const lista = reduzido ? principais.slice(0, 3) : principais.slice(0, 4);

  return (
    <section aria-labelledby="abertura" className="space-y-3">
      <h2 id="abertura" className="viva-subtitulo text-text-primary">
        Como você gostaria de começar?
      </h2>
      <ul className="grid gap-2 sm:grid-cols-2">
        {lista.map((p) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={p.onSelecionar}
              className="viva-tap viva-anim w-full rounded-2xl border border-border-default bg-surface-default px-4 py-3 text-left viva-apoio text-text-primary hover:bg-background-secondary"
            >
              {p.rotulo}
            </button>
          </li>
        ))}
      </ul>

      {outras?.length && !reduzido ? (
        <div>
          <Botao
            variante="terciario"
            tamanho="compacto"
            icone={ChevronDown}
            onClick={() => setVerOutras((v) => !v)}
            aria-expanded={verOutras}
          >
            {verOutras ? "Ocultar outras possibilidades" : "Ver outras possibilidades"}
          </Botao>
          {verOutras ? (
            <ul className="mt-2 grid gap-2 sm:grid-cols-2">
              {outras.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={p.onSelecionar}
                    className="viva-tap viva-anim w-full rounded-2xl border border-border-default bg-surface-muted px-4 py-3 text-left viva-apoio text-text-primary hover:bg-background-secondary"
                  >
                    {p.rotulo}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

/* ------------------------------------------------------------ estado atual */

export function ComoEstouAgora({
  estado,
  onRegistrar,
  onLimpar,
  onOcultar,
  onFazerPausa,
  onConteudoCurto,
}: {
  estado: EstadoAtual;
  onRegistrar: (chave: keyof Omit<EstadoAtual, "registradoEm">, valor?: string) => void;
  onLimpar: () => void;
  onOcultar: () => void;
  onFazerPausa?: () => void;
  onConteudoCurto?: () => void;
}) {
  const [aberto, setAberto] = useState(false);

  return (
    <SecaoRecolhivel
      titulo="Como estou agora"
      apoio="Registrar é opcional. Nada aqui é avaliado ou interpretado."
      aberto={aberto}
      onAlternar={() => setAberto((a) => !a)}
      acaoExtra={
        <Botao variante="terciario" tamanho="compacto" onClick={onOcultar}>
          Ocultar esta seção
        </Botao>
      }
    >
      <div className="space-y-5">
        {perguntasDoMomento.map((p) => (
          <fieldset key={p.chave}>
            <legend className="viva-rotulo text-text-primary">{p.titulo}</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {p.opcoes.map((o) => (
                <Chip
                  key={o}
                  label={o}
                  selected={estado[p.chave] === o}
                  onClick={() =>
                    onRegistrar(p.chave, estado[p.chave] === o ? undefined : o)
                  }
                />
              ))}
            </div>
          </fieldset>
        ))}

        {indicouPoucaEnergia(estado) ? (
          <Card
            variante="informativo"
            titulo="Algumas possibilidades para agora"
            descricao="Seu percurso continua igual. Nada muda por causa deste registro."
          >
            <div className="flex flex-wrap gap-3">
              <Botao tamanho="compacto" onClick={onFazerPausa}>
                Fazer uma pausa
              </Botao>
              <Botao variante="terciario" tamanho="compacto" onClick={onConteudoCurto}>
                Explorar um conteúdo curto
              </Botao>
              <BotaoLink to="/jornada/encerramento" variante="terciario" tamanho="compacto">
                Encerrar por enquanto
              </BotaoLink>
            </div>
          </Card>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <Botao variante="terciario" tamanho="compacto" onClick={onLimpar}>
            Apagar o que registrei agora
          </Botao>
        </div>
      </div>
    </SecaoRecolhivel>
  );
}

/* ------------------------------------------------------- biblioteca da home */

export function BibliotecaRelacionada({
  conteudos,
  salvos,
  uteis,
  onSalvar,
  onMarcarUtil,
  onRegistrarDuvida,
  onAdicionarEstrategia,
}: {
  conteudos: Conteudo[];
  salvos: string[];
  uteis: string[];
  onSalvar: (id: string) => void;
  onMarcarUtil: (id: string) => void;
  onRegistrarDuvida: (c: Conteudo) => void;
  onAdicionarEstrategia: (c: Conteudo) => void;
}) {
  if (!conteudos.length) return null;

  return (
    <section aria-labelledby="biblioteca-home" className="space-y-3">
      <h2 id="biblioteca-home" className="viva-subtitulo text-text-primary">
        Talvez seja útil explorar
      </h2>
      <p className="viva-legenda text-text-secondary">
        Conteúdos relacionados às suas escolhas recentes.
      </p>
      <ul className="space-y-3">
        {conteudos.map((c) => (
          <li key={c.id}>
            <Card variante="biblioteca" icone={BookOpen} titulo={c.titulo} descricao={c.resumo}>
              <p className="viva-legenda text-text-secondary">
                {c.categoria} · leitura de cerca de {c.minutos} minutos
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <BotaoLink to={`/biblioteca/${c.id}`} tamanho="compacto">
                  Abrir
                </BotaoLink>
                <Botao
                  variante="terciario"
                  tamanho="compacto"
                  onClick={() => onSalvar(c.id)}
                  aria-pressed={salvos.includes(c.id)}
                >
                  {salvos.includes(c.id) ? "Guardado" : "Salvar"}
                </Botao>
                <Botao
                  variante="terciario"
                  tamanho="compacto"
                  onClick={() => onMarcarUtil(c.id)}
                  aria-pressed={uteis.includes(c.id)}
                >
                  {uteis.includes(c.id) ? "Marcado como útil" : "Marcar como útil"}
                </Botao>
                <Botao
                  variante="terciario"
                  tamanho="compacto"
                  onClick={() => onRegistrarDuvida(c)}
                >
                  Registrar dúvida
                </Botao>
                <Botao
                  variante="terciario"
                  tamanho="compacto"
                  onClick={() => onAdicionarEstrategia(c)}
                >
                  Adicionar estratégia ao plano
                </Botao>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* --------------------------------------------------------- reflexão opcional */

export function ReflexaoOpcional({
  opcoes,
}: {
  opcoes: PossibilidadeDaHome[];
}) {
  return (
    <section aria-labelledby="reflexao-home" className="space-y-3">
      <h2 id="reflexao-home" className="viva-subtitulo text-text-primary">
        Algo que você gostaria de registrar?
      </h2>
      <p className="viva-legenda text-text-secondary">
        Você pode registrar algo agora ou deixar para outro momento.
      </p>
      <ul className="flex flex-wrap gap-2">
        {opcoes.map((o) => (
          <li key={o.id}>
            <Botao variante="terciario" tamanho="compacto" onClick={o.onSelecionar}>
              {o.rotulo}
            </Botao>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* --------------------------------------------------------- minhas estratégias */

export function MinhasEstrategias({
  estrategias,
  onAdicionarAoPlano,
  onRegistrarObservacao,
}: {
  estrategias: Estrategia[];
  onAdicionarAoPlano: (e: Estrategia) => void;
  onRegistrarObservacao: (e: Estrategia) => void;
}) {
  if (!estrategias.length) return null;

  return (
    <section aria-labelledby="estrategias-home" className="space-y-3">
      <h2 id="estrategias-home" className="viva-subtitulo text-text-primary">
        Estratégias que você guardou
      </h2>
      <ul className="space-y-2">
        {estrategias.slice(0, 3).map((e) => (
          <li
            key={e.id}
            className="rounded-2xl border border-border-default bg-surface-muted px-4 py-3"
          >
            <p className="viva-apoio text-text-primary">{e.nome}</p>
            <p className="viva-legenda text-text-secondary">{e.quandoAjuda}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Botao
                variante="terciario"
                tamanho="compacto"
                onClick={() => onAdicionarAoPlano(e)}
              >
                Adicionar ao próximo plano
              </Botao>
              <Botao
                variante="terciario"
                tamanho="compacto"
                onClick={() => onRegistrarObservacao(e)}
              >
                Registrar observação
              </Botao>
            </div>
          </li>
        ))}
      </ul>
      <Link
        to="/biblioteca/minha"
        className="viva-tap inline-block viva-legenda font-medium text-text-secondary underline underline-offset-4 hover:text-text-primary"
      >
        Ver minhas estratégias
      </Link>
    </section>
  );
}

/* --------------------------------------------------------- registros recentes */

export type RegistroResumido = {
  id: string;
  titulo: string;
  quando: string;
};

export function RegistrosRecentes({
  registros,
  onOcultar,
}: {
  registros: RegistroResumido[];
  onOcultar: () => void;
}) {
  if (!registros.length) return null;

  return (
    <section aria-labelledby="registros-home" className="space-y-3">
      <h2 id="registros-home" className="viva-subtitulo text-text-primary">
        Registros recentes
      </h2>
      <ul className="space-y-2">
        {registros.slice(0, 3).map((r) => (
          <li
            key={r.id}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3 rounded-2xl border border-border-default bg-surface-default px-4 py-3"
          >
            <span className="min-w-0 viva-apoio text-text-primary">{r.titulo}</span>
            <span className="shrink-0 viva-legenda text-text-secondary">
              {r.quando}
            </span>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap items-center gap-3">
        <BotaoLink to="/jornada/linha-do-tempo" variante="terciario" tamanho="compacto">
          Ver meu percurso
        </BotaoLink>
        <Botao variante="terciario" tamanho="compacto" onClick={onOcultar}>
          Ocultar esta seção
        </Botao>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- utilitários */

export function SecaoRecolhivel({
  titulo,
  apoio,
  aberto,
  onAlternar,
  acaoExtra,
  children,
}: {
  titulo: string;
  apoio?: string;
  aberto: boolean;
  onAlternar: () => void;
  acaoExtra?: ReactNode;
  children: ReactNode;
}) {
  const idConteudo = `secao-${titulo.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <section aria-labelledby={`${idConteudo}-titulo`} className="space-y-3">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0">
          <h2 id={`${idConteudo}-titulo`} className="viva-subtitulo text-text-primary">
            {titulo}
          </h2>
          {apoio ? (
            <p className="viva-legenda text-text-secondary">{apoio}</p>
          ) : null}
        </div>
        <Botao
          tamanho="compacto"
          onClick={onAlternar}
          aria-expanded={aberto}
          aria-controls={idConteudo}
        >
          {aberto ? "Recolher" : "Abrir"}
        </Botao>
      </div>
      <div id={idConteudo} hidden={!aberto}>
        {children}
        {acaoExtra ? <div className="mt-4">{acaoExtra}</div> : null}
      </div>
    </section>
  );
}

/** Aviso de erro do armazenamento local, com saídas simples. */
export function AvisoDeArmazenamento({
  mensagem,
  onTentarNovamente,
  onFechar,
}: {
  mensagem: string;
  onTentarNovamente: () => void;
  onFechar: () => void;
}) {
  return (
    <EstadoDaInterface
      tipo="erro"
      titulo={mensagem}
      texto="Copie o texto que escreveu antes de sair, para não perdê-lo."
      acao={
        <>
          <Botao tamanho="compacto" onClick={onTentarNovamente}>
            Tentar novamente
          </Botao>
          <Botao variante="terciario" tamanho="compacto" onClick={onFechar}>
            Fechar
          </Botao>
        </>
      }
    />
  );
}

/** Preferências locais da Home. */
export function PreferenciasDaHomeSecao({
  preferencias,
  onMudar,
}: {
  preferencias: PreferenciasDaHome;
  onMudar: (p: Partial<PreferenciasDaHome>) => void;
}) {
  const [aberto, setAberto] = useState(false);
  return (
    <SecaoRecolhivel
      titulo="Ajustar esta página"
      apoio="Suas escolhas ficam guardadas apenas neste dispositivo."
      aberto={aberto}
      onAlternar={() => setAberto((a) => !a)}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Chip
            label="Mostrar “Como estou agora”"
            selected={preferencias.mostrarEstadoAtual}
            onClick={() =>
              onMudar({ mostrarEstadoAtual: !preferencias.mostrarEstadoAtual })
            }
          />
          <Chip
            label="Mostrar registros recentes"
            selected={preferencias.mostrarRegistrosRecentes}
            onClick={() =>
              onMudar({
                mostrarRegistrosRecentes: !preferencias.mostrarRegistrosRecentes,
              })
            }
          />
          <Chip
            label="Estratégias antes da biblioteca"
            selected={preferencias.estrategiasPrimeiro}
            onClick={() =>
              onMudar({ estrategiasPrimeiro: !preferencias.estrategiasPrimeiro })
            }
          />
        </div>
        <fieldset>
          <legend className="viva-rotulo text-text-primary">
            Conteúdos relacionados nesta página
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {([0, 1, 2, 3] as const).map((n) => (
              <Chip
                key={n}
                label={n === 0 ? "Nenhum" : `${n}`}
                selected={preferencias.conteudosRelacionados === n}
                onClick={() => onMudar({ conteudosRelacionados: n })}
              />
            ))}
          </div>
        </fieldset>
        <p className="viva-legenda text-text-secondary">
          Cor, tamanho do texto, movimento e densidade ficam em{" "}
          <Link
            to="/minha-experiencia"
            className="underline underline-offset-4 hover:text-text-primary"
          >
            Minha experiência
          </Link>
          .
        </p>
      </div>
    </SecaoRecolhivel>
  );
}

/** Resumo curto do que já foi iniciado, usado nos registros recentes. */
export function montarRegistrosRecentes({
  preparacoes,
  experiencias,
  estrategias,
  duvidas,
  conteudosUteis,
}: {
  preparacoes: Preparacao[];
  experiencias: Experiencia[];
  estrategias: Estrategia[];
  duvidas: Duvida[];
  conteudosUteis: { id: string; titulo: string }[];
}): RegistroResumido[] {
  const itens: RegistroResumido[] = [
    ...preparacoes.map((p) => ({
      id: `prep-${p.id}`,
      titulo: `Preparação salva · ${p.atividadeTitulo}`,
      quando: formatarData(p.atualizadaEm),
    })),
    ...experiencias.map((e) => ({
      id: `exp-${e.id}`,
      titulo: `Experiência registrada · ${e.atividade}`,
      quando: formatarData(e.atualizadaEm),
    })),
    ...estrategias.slice(0, 1).map((e) => ({
      id: `est-${e.id}`,
      titulo: `Estratégia adicionada · ${e.nome}`,
      quando: "recente",
    })),
    ...duvidas.slice(0, 1).map((d) => ({
      id: `duv-${d.id}`,
      titulo: "Dúvida guardada",
      quando: "recente",
    })),
    ...conteudosUteis.slice(0, 1).map((c) => ({
      id: `cont-${c.id}`,
      titulo: `Conteúdo marcado como útil · ${c.titulo}`,
      quando: "recente",
    })),
  ];
  return itens.slice(0, 3);
}

function formatarData(iso: string) {
  const data = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(data.getTime())) return iso;
  return data.toLocaleDateString("pt-BR", { day: "numeric", month: "short" });
}
