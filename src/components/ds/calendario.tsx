import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import { Botao, BotaoIcone } from "./botao";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IndicadorDeEstado, type EstadoDoPercurso } from "./indicadores";

/**
 * Organização temporal do VIVA (documento 14, "Tempo" e documento 00).
 *
 * O tempo aqui orienta, não cobra. Vermelho nunca marca atraso em atividade
 * opcional; o que passou aparece como "Retomar quando desejar". Retomar é
 * sempre possível, sem punição visual.
 */

const diasDaSemana = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
const meses = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

export type MarcaDeDia = {
  /** Data no formato AAAA-MM-DD. */
  data: string;
  titulo: string;
  estado: EstadoDoPercurso;
};

function chaveDoDia(ano: number, mes: number, dia: number) {
  return `${ano}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
}

/** Calendário mensal: visão geral calma, sem cores de julgamento. */
export function CalendarioMensal({
  marcas = [],
  referencia = new Date(),
  onSelecionarDia,
}: {
  marcas?: MarcaDeDia[];
  referencia?: Date;
  onSelecionarDia?: (data: string) => void;
}) {
  const [mostrado, setMostrado] = useState(
    new Date(referencia.getFullYear(), referencia.getMonth(), 1),
  );

  const ano = mostrado.getFullYear();
  const mes = mostrado.getMonth();
  const diasNoMes = new Date(ano, mes + 1, 0).getDate();
  const primeiroDiaSemana = new Date(ano, mes, 1).getDay();

  const porDia = useMemo(() => {
    const mapa = new Map<string, MarcaDeDia>();
    marcas.forEach((m) => mapa.set(m.data, m));
    return mapa;
  }, [marcas]);

  return (
    <div>
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
        <BotaoIcone
          icone={ChevronLeft}
          rotulo="Mês anterior"
          onClick={() => setMostrado(new Date(ano, mes - 1, 1))}
        />
        <p aria-live="polite" className="min-w-0 text-center viva-subtitulo text-text-primary">
          {meses[mes]} de {ano}
        </p>
        <BotaoIcone
          icone={ChevronRight}
          rotulo="Próximo mês"
          onClick={() => setMostrado(new Date(ano, mes + 1, 1))}
        />
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1" aria-hidden>
        {diasDaSemana.map((d) => (
          <span key={d} className="py-1 text-center viva-legenda text-text-secondary">
            {d}
          </span>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {Array.from({ length: primeiroDiaSemana }).map((_, i) => (
          <span key={`vazio-${i}`} />
        ))}
        {Array.from({ length: diasNoMes }).map((_, i) => {
          const dia = i + 1;
          const chave = chaveDoDia(ano, mes, dia);
          const marca = porDia.get(chave);
          return (
            <button
              key={chave}
              type="button"
              onClick={() => onSelecionarDia?.(chave)}
              aria-label={
                marca ? `${dia} de ${meses[mes]} — ${marca.titulo}` : `${dia} de ${meses[mes]}`
              }
              className={cn(
                "viva-tap grid min-h-11 place-items-center rounded-xl viva-legenda",
                marca
                  ? "bg-feedback-continuidade-suave font-semibold text-text-primary"
                  : "text-text-secondary hover:bg-background-secondary",
              )}
            >
              {dia}
            </button>
          );
        })}
      </div>

      <p className="mt-4 viva-legenda text-text-secondary">
        Os dias marcados indicam registros existentes. Dias sem marca não significam falta.
      </p>
    </div>
  );
}

/** Agenda diária: poucas linhas, sempre com estado em palavras. */
export function AgendaDiaria({
  itens,
}: {
  itens: { id: string; horario?: string; titulo: string; estado: EstadoDoPercurso }[];
}) {
  return (
    <ol className="space-y-2">
      {itens.map((i) => (
        <li
          key={i.id}
          className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl bg-surface-muted px-4 py-3"
        >
          <span className="min-w-0">
            {i.horario ? (
              <span className="block viva-legenda text-text-secondary">{i.horario}</span>
            ) : null}
            <span className="block truncate viva-apoio text-text-primary">{i.titulo}</span>
          </span>
          <IndicadorDeEstado estado={i.estado} />
        </li>
      ))}
    </ol>
  );
}

/** Registro de atividade: o que aconteceu, sem nota e sem comparação. */
export function RegistroDeAtividade({
  data,
  tipo,
  titulo,
  descricao,
}: {
  data: string;
  tipo: string;
  titulo: string;
  descricao?: string;
}) {
  return (
    <article className="relative">
      <p className="viva-legenda text-text-secondary">
        {data} · {tipo}
      </p>
      <p className="mt-1 viva-rotulo font-semibold text-text-primary">{titulo}</p>
      {descricao ? <p className="viva-legenda text-text-secondary">{descricao}</p> : null}
    </article>
  );
}

/** Lembrete configurável: sempre desligável, nunca insistente. */
export function Lembrete({
  titulo,
  quando,
  ativo,
  onAlternar,
}: {
  titulo: string;
  quando: string;
  ativo: boolean;
  onAlternar: () => void;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-2xl bg-surface-muted px-4 py-3">
      <span className="min-w-0">
        <span className="block viva-rotulo text-text-primary">{titulo}</span>
        <span className="block viva-legenda text-text-secondary">{quando}</span>
      </span>
      <Botao tamanho="compacto" onClick={onAlternar} aria-pressed={ativo}>
        {ativo ? "Lembrete ativo" : "Lembrete desativado"}
      </Botao>
    </div>
  );
}
