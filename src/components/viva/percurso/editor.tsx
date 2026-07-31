import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

import { Botao, Card, CampoTexto, Nota } from "@/components/ds";
import { percursos, type Percurso } from "@/lib/viva-percursos";
import { rotulosDeMeio, situacaoPorId, type MeioDeDeslocamento } from "@/lib/viva-situacoes";
import { conteudoPorId } from "@/lib/viva-biblioteca-dados";

const meios: MeioDeDeslocamento[] = [
  "a-pe",
  "onibus",
  "metro",
  "carro",
  "aplicativo",
  "sem-deslocamento",
];

/**
 * JourneyEditor — o percurso é da pessoa: tudo pode ser trocado, reordenado,
 * removido ou deixado como está (documentos 00, 09 e 10).
 */
export function EditorDePercurso({ percurso }: { percurso: Percurso }) {
  const situacao = situacaoPorId(percurso.situacaoId);
  const [novaEtapa, setNovaEtapa] = useState("");

  return (
    <div className="space-y-5">
      <Card variante="informativo" titulo="Quando e como">
        <div className="grid gap-4">
          <CampoTexto
            rotulo="Nome deste percurso"
            value={percurso.titulo}
            onChange={(e) => percursos.editar(percurso.id, { titulo: e.target.value })}
          />
          <CampoTexto
            rotulo="Ponto de partida"
            value={percurso.origem}
            onChange={(e) => percursos.editar(percurso.id, { origem: e.target.value })}
          />
          <CampoTexto
            rotulo="Destino"
            value={percurso.destino}
            onChange={(e) => percursos.editar(percurso.id, { destino: e.target.value })}
          />
          <CampoTexto
            rotulo="Horário pensado"
            apoio="Uma referência, não um compromisso."
            value={percurso.horario}
            onChange={(e) => percursos.editar(percurso.id, { horario: e.target.value })}
          />
          <fieldset>
            <legend className="viva-apoio font-semibold text-text-primary">Como pretende ir</legend>
            <ul className="mt-2 flex flex-wrap gap-2">
              {meios.map((m) => (
                <li key={m}>
                  <button
                    type="button"
                    aria-pressed={percurso.meio === m}
                    onClick={() => percursos.editar(percurso.id, { meio: m })}
                    className={
                      percurso.meio === m
                        ? "viva-tap min-h-11 rounded-full bg-destaque-suave px-4 viva-legenda font-semibold text-destaque-texto"
                        : "viva-tap min-h-11 rounded-full border border-border-default px-4 viva-legenda text-text-primary"
                    }
                  >
                    {rotulosDeMeio[m]}
                  </button>
                </li>
              ))}
            </ul>
          </fieldset>
        </div>
      </Card>

      <Card variante="informativo" titulo="Etapas">
        <p className="viva-apoio text-text-secondary">
          Retire o que não fizer sentido. Um percurso com três etapas é um percurso completo.
        </p>
        <ol className="mt-4 space-y-2">
          {percurso.etapas.map((etapa, i) => (
            <li key={etapa.id} className="rounded-2xl border border-border-default p-4">
              <CampoTexto
                rotulo={`Etapa ${i + 1}`}
                value={etapa.titulo}
                onChange={(e) =>
                  percursos.editarEtapa(percurso.id, etapa.id, { titulo: e.target.value })
                }
              />
              {etapa.apoio ? (
                <p className="mt-2 viva-legenda text-text-secondary">{etapa.apoio}</p>
              ) : null}
              <div className="mt-3 flex flex-wrap gap-2">
                <Botao
                  variante="terciario"
                  tamanho="compacto"
                  icone={ArrowUp}
                  disabled={i === 0}
                  onClick={() => percursos.moverEtapa(percurso.id, etapa.id, -1)}
                >
                  Subir
                </Botao>
                <Botao
                  variante="terciario"
                  tamanho="compacto"
                  icone={ArrowDown}
                  disabled={i === percurso.etapas.length - 1}
                  onClick={() => percursos.moverEtapa(percurso.id, etapa.id, 1)}
                >
                  Descer
                </Botao>
                <Botao
                  variante="terciario"
                  tamanho="compacto"
                  icone={Trash2}
                  onClick={() => percursos.removerEtapa(percurso.id, etapa.id)}
                >
                  Retirar
                </Botao>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-4 flex flex-wrap items-end gap-3">
          <div className="min-w-[14rem] flex-1">
            <CampoTexto
              rotulo="Adicionar uma etapa sua"
              value={novaEtapa}
              onChange={(e) => setNovaEtapa(e.target.value)}
            />
          </div>
          <Botao
            variante="secundario"
            icone={Plus}
            disabled={novaEtapa.trim().length === 0}
            onClick={() => {
              percursos.adicionarEtapa(percurso.id, { titulo: novaEtapa.trim() });
              setNovaEtapa("");
            }}
          >
            Adicionar
          </Botao>
        </div>
      </Card>

      {situacao ? (
        <>
          <Card variante="informativo" titulo="Estratégias possíveis">
            <p className="viva-apoio text-text-secondary">
              Escolher nenhuma também é uma resposta válida.
            </p>
            <ul className="mt-4 space-y-2">
              {situacao.estrategias.map((e) => {
                const ativa = percurso.estrategias.some((x) => x.id === e.id);
                return (
                  <li key={e.id}>
                    <button
                      type="button"
                      aria-pressed={ativa}
                      onClick={() => percursos.alternarEstrategia(percurso.id, e)}
                      className={
                        ativa
                          ? "viva-tap w-full rounded-2xl border border-destaque bg-destaque-suave p-4 text-left"
                          : "viva-tap w-full rounded-2xl border border-border-default p-4 text-left"
                      }
                    >
                      <span className="block viva-apoio font-semibold text-text-primary">
                        {e.titulo}
                        {ativa ? " · escolhida" : ""}
                      </span>
                      <span className="block viva-legenda text-text-secondary">{e.frase}</span>
                      <span className="mt-1 block viva-legenda text-text-secondary">
                        Por quê: {e.motivo}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Card>

          <Card variante="informativo" titulo="Se algo mudar">
            <ul className="space-y-2">
              {situacao.alternativas.map((a) => {
                const ativa = percurso.alternativas.some((x) => x.id === a.id);
                return (
                  <li key={a.id}>
                    <button
                      type="button"
                      aria-pressed={ativa}
                      onClick={() => percursos.alternarAlternativa(percurso.id, a)}
                      className={
                        ativa
                          ? "viva-tap w-full rounded-2xl border border-destaque bg-destaque-suave p-4 text-left"
                          : "viva-tap w-full rounded-2xl border border-border-default p-4 text-left"
                      }
                    >
                      <span className="block viva-apoio font-semibold text-text-primary">
                        {a.titulo}
                        {ativa ? " · guardado" : ""}
                      </span>
                      <span className="block viva-legenda text-text-secondary">{a.frase}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Card>

          <Card variante="biblioteca" titulo="Leituras que combinam com esta situação">
            <ul className="space-y-2">
              {situacao.conteudos.map((cid) => {
                const c = conteudoPorId(cid);
                if (!c) return null;
                const ativa = percurso.conteudos.includes(cid);
                return (
                  <li key={cid}>
                    <button
                      type="button"
                      aria-pressed={ativa}
                      onClick={() => percursos.alternarConteudo(percurso.id, cid)}
                      className={
                        ativa
                          ? "viva-tap w-full rounded-2xl border border-destaque bg-destaque-suave p-4 text-left"
                          : "viva-tap w-full rounded-2xl border border-border-default p-4 text-left"
                      }
                    >
                      <span className="block viva-apoio font-semibold text-text-primary">
                        {c.titulo}
                        {ativa ? " · no percurso" : ""}
                      </span>
                      <span className="block viva-legenda text-text-secondary">
                        {c.resumo} · cerca de {c.minutos} minutos
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Card>
        </>
      ) : null}

      <Nota>
        Tudo o que você edita aqui fica apenas neste aparelho e pode ser apagado a qualquer momento
        em “Seus dados”.
      </Nota>
    </div>
  );
}
