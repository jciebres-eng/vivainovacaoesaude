import { createFileRoute } from "@tanstack/react-router";

import {
  Chip,
  Note,
  Screen,
  ScreenFooter,
  ScreenHeader,
  SectionCard,
} from "@/components/viva/screen";
import {
  useViva,
  type Aparencia,
  type Densidade,
  type TamanhoTexto,
} from "@/lib/viva-store";

export const Route = createFileRoute("/_percurso/configuracoes")({
  head: () => ({
    meta: [
      { title: "Configurações sensoriais — VIVA" },
      {
        name: "description",
        content:
          "Ajuste aparência, tamanho do texto, densidade de informação, animações, sons e lembretes.",
      },
      { property: "og:title", content: "Configurações sensoriais — VIVA" },
      {
        property: "og:description",
        content: "As alterações são aplicadas imediatamente e ficam salvas neste dispositivo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConfiguracoesScreen,
});

const aparencias: { id: Aparencia; label: string }[] = [
  { id: "clara", label: "Clara" },
  { id: "escura", label: "Escura" },
  { id: "baixo-estimulo", label: "Baixo estímulo" },
];

const tamanhos: { id: TamanhoTexto; label: string }[] = [
  { id: "pequeno", label: "A−" },
  { id: "padrao", label: "A" },
  { id: "grande", label: "A+" },
];

const densidades: { id: Densidade; label: string }[] = [
  { id: "resumida", label: "Resumida" },
  { id: "padrao", label: "Padrão" },
  { id: "detalhada", label: "Detalhada" },
];

function ConfiguracoesScreen() {
  const { settings, setSettings, resetSettings } = useViva();

  return (
    <>
      <ScreenHeader
        title="Configurações sensoriais"
        intro="Disponíveis em qualquer etapa. As mudanças valem imediatamente, sem reiniciar."
      />

      <Screen>
        <SectionCard title="Aparência">
          <div className="flex flex-wrap gap-2">
            {aparencias.map((a) => (
              <Chip
                key={a.id}
                label={a.label}
                selected={settings.aparencia === a.id}
                onClick={() => setSettings({ aparencia: a.id })}
              />
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Tamanho do texto">
          <div className="flex flex-wrap gap-2">
            {tamanhos.map((t) => (
              <Chip
                key={t.id}
                label={t.label}
                selected={settings.tamanhoTexto === t.id}
                onClick={() => setSettings({ tamanhoTexto: t.id })}
              />
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Quantidade de informação">
          <div className="flex flex-wrap gap-2">
            {densidades.map((d) => (
              <Chip
                key={d.id}
                label={d.label}
                selected={settings.densidade === d.id}
                onClick={() => setSettings({ densidade: d.id })}
              />
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Estímulos">
          <div className="space-y-3">
            <ToggleLine
              label="Sons"
              value={settings.sons}
              on="Ativados"
              off="Desativados"
              onToggle={() => setSettings({ sons: !settings.sons })}
            />
            <ToggleLine
              label="Animações"
              value={settings.animacoes}
              on="Ativadas"
              off="Desativadas"
              onToggle={() => setSettings({ animacoes: !settings.animacoes })}
            />
            <ToggleLine
              label="Mostrar menos opções por tela"
              value={settings.menosOpcoes}
              on="Ativado"
              off="Desativado"
              onToggle={() => setSettings({ menosOpcoes: !settings.menosOpcoes })}
            />
          </div>
        </SectionCard>

        <SectionCard title="Lembretes">
          <div className="flex flex-wrap gap-2">
            {(
              [
                { id: "nunca", label: "Nunca" },
                { id: "quando-eu-escolher", label: "Somente quando eu escolher" },
                { id: "diario", label: "Diário" },
              ] as const
            ).map((l) => (
              <Chip
                key={l.id}
                label={l.label}
                selected={settings.lembretes === l.id}
                onClick={() => setSettings({ lembretes: l.id })}
              />
            ))}
          </div>
        </SectionCard>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={resetSettings}
            className="viva-tap rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-card-foreground hover:bg-secondary"
          >
            Restaurar padrão
          </button>
        </div>

        <Note>
          Sons nunca são ativados automaticamente e nenhuma função essencial fica
          escondida.
        </Note>
      </Screen>

      <ScreenFooter backTo="/linha-do-tempo" nextTo="/perfil" nextLabel="Voltar ao percurso" />
    </>
  );
}

function ToggleLine({
  label,
  value,
  on,
  off,
  onToggle,
}: {
  label: string;
  value: boolean;
  on: string;
  off: string;
  onToggle: () => void;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
      <span className="min-w-0 text-card-foreground">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={value}
        onClick={onToggle}
        className={`viva-tap min-h-11 shrink-0 rounded-full border px-5 py-2.5 viva-legenda font-medium ${
          value
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-card text-muted-foreground"
        }`}
      >
        {value ? on : off}
      </button>
    </div>
  );
}
