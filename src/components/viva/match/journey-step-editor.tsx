/**
 * JourneyStepEditor — reorganizar o percurso sem perder o controle.
 *
 * A pessoa pode arrastar, remover, duplicar, marcar como opcional e criar um
 * plano alternativo. Etapas estruturais ou de segurança não são movidas em
 * silêncio: quando uma reorganização não é possível, o motivo é explicado em
 * uma frase simples (documentos 03, 04 e 24).
 */
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Copy, GripVertical, Lock, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { novoId } from "@/lib/match/repositorios";
import { gruposDaTimeline, type Journey, type JourneyStep } from "@/lib/match/tipos";

function LinhaDaEtapa({
  etapa,
  onRemover,
  onDuplicar,
  onAlternarOpcional,
}: {
  etapa: JourneyStep;
  onRemover: () => void;
  onDuplicar: () => void;
  onAlternarOpcional: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: etapa.id,
    disabled: etapa.fixa,
  });

  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform), transition }}
      className={cn(
        "grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 border border-[var(--profile-border)] bg-[var(--profile-card)] p-3",
        isDragging && "opacity-80",
      )}
    >
      {etapa.fixa ? (
        <span
          className="grid h-11 w-11 place-items-center text-[var(--profile-muted)]"
          title="Etapa estrutural: não pode ser movida"
        >
          <Lock className="h-4 w-4" aria-hidden />
          <span className="sr-only">Etapa estrutural, não pode ser movida</span>
        </span>
      ) : (
        <button
          type="button"
          {...attributes}
          {...listeners}
          aria-label={`Mover a etapa ${etapa.titulo}`}
          className="viva-tap grid h-11 w-11 place-items-center rounded-full text-[var(--profile-muted)]"
        >
          <GripVertical className="h-5 w-5" aria-hidden />
        </button>
      )}

      <span className="min-w-0">
        <span className="block viva-legenda text-[var(--profile-muted)]">
          {gruposDaTimeline.find((g) => g.id === etapa.grupo)?.titulo}
        </span>
        <span className="block viva-legenda font-semibold text-[var(--profile-text)]">
          {etapa.titulo}
        </span>
        {etapa.apoio ? (
          <span className="block viva-legenda text-[var(--profile-muted)]">{etapa.apoio}</span>
        ) : null}
      </span>

      <span className="flex items-center gap-1">
        <button
          type="button"
          onClick={onAlternarOpcional}
          aria-pressed={etapa.opcional}
          aria-label={`Marcar ${etapa.titulo} como opcional`}
          className={cn(
            "viva-tap min-h-11 rounded-full border border-[var(--profile-border)] px-3 viva-legenda",
            etapa.opcional
              ? "bg-[var(--profile-primary)] text-[var(--profile-surface)]"
              : "text-[var(--profile-muted)]",
          )}
        >
          opcional
        </button>
        <button
          type="button"
          onClick={onDuplicar}
          aria-label={`Duplicar a etapa ${etapa.titulo}`}
          className="viva-tap grid h-11 w-11 place-items-center rounded-full text-[var(--profile-muted)]"
        >
          <Copy className="h-4 w-4" aria-hidden />
        </button>
        <button
          type="button"
          onClick={onRemover}
          disabled={etapa.fixa}
          aria-label={`Remover a etapa ${etapa.titulo}`}
          className="viva-tap grid h-11 w-11 place-items-center rounded-full text-[var(--profile-muted)] disabled:opacity-40"
        >
          <Trash2 className="h-4 w-4" aria-hidden />
        </button>
      </span>
    </li>
  );
}

export function JourneyStepEditor({
  jornada,
  onMudar,
}: {
  jornada: Journey;
  onMudar: (jornada: Journey) => void;
}) {
  const [explicacao, setExplicacao] = useState<string | null>(null);
  const sensores = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function aoTerminarArraste(evento: DragEndEvent) {
    const { active, over } = evento;
    if (!over || active.id === over.id) return;
    const de = jornada.etapas.findIndex((e) => e.id === active.id);
    const para = jornada.etapas.findIndex((e) => e.id === over.id);
    if (de < 0 || para < 0) return;
    if (jornada.etapas[para].fixa) {
      setExplicacao(
        "Essa posição pertence a uma etapa estrutural do percurso. Você pode mover a etapa para antes ou depois dela.",
      );
      return;
    }
    setExplicacao(null);
    onMudar({ ...jornada, etapas: arrayMove(jornada.etapas, de, para) });
  }

  function remover(id: string) {
    onMudar({ ...jornada, etapas: jornada.etapas.filter((e) => e.id !== id) });
  }

  function duplicar(etapa: JourneyStep) {
    const copia: JourneyStep = { ...etapa, id: novoId("step"), fixa: false };
    const indice = jornada.etapas.findIndex((e) => e.id === etapa.id);
    const etapas = [...jornada.etapas];
    etapas.splice(indice + 1, 0, copia);
    onMudar({ ...jornada, etapas });
  }

  function alternarOpcional(id: string) {
    onMudar({
      ...jornada,
      etapas: jornada.etapas.map((e) => (e.id === id ? { ...e, opcional: !e.opcional } : e)),
    });
  }

  function criarPlanoAlternativo() {
    onMudar({
      ...jornada,
      etapas: [
        ...jornada.etapas,
        {
          id: novoId("step"),
          grupo: "estrategias",
          titulo: "Plano alternativo",
          apoio: "Se algo mudar, este é o outro caminho possível.",
          fixa: false,
          opcional: true,
        },
      ],
    });
  }

  return (
    <section aria-label="Reorganizar etapas" className="space-y-3">
      <div>
        <h2 className="viva-subtitulo text-[var(--profile-text)]">Reorganizar as etapas</h2>
        <p className="viva-legenda text-[var(--profile-muted)]">
          Arraste pela alça, use as setas do teclado depois de focar a alça, ou use os botões de
          cada etapa.
        </p>
      </div>

      <DndContext
        sensors={sensores}
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={aoTerminarArraste}
      >
        <SortableContext
          items={jornada.etapas.map((e) => e.id)}
          strategy={verticalListSortingStrategy}
        >
          <ul className="space-y-2">
            {jornada.etapas.map((etapa) => (
              <LinhaDaEtapa
                key={etapa.id}
                etapa={etapa}
                onRemover={() => remover(etapa.id)}
                onDuplicar={() => duplicar(etapa)}
                onAlternarOpcional={() => alternarOpcional(etapa.id)}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>

      <p aria-live="polite" className="viva-legenda text-[var(--profile-muted)]">
        {explicacao}
      </p>

      <button
        type="button"
        onClick={criarPlanoAlternativo}
        className="viva-tap inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--profile-border)] px-5 viva-legenda text-[var(--profile-text)]"
      >
        <Plus className="h-4 w-4" aria-hidden />
        Criar plano alternativo
      </button>
    </section>
  );
}
