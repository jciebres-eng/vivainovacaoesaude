/**
 * SeletorDeModo — a transformação radical entre modos de experiência.
 *
 * Não é uma lista de configurações: é uma escolha visual. Ao trocar, a
 * plataforma inteira muda de aparência, ritmo, densidade e linguagem — e a
 * pessoa pode voltar a qualquer momento (documentos 04, 10, 13, 17).
 */
import { VisualProfileCard } from "@/components/viva/visual/cards";
import { modosDeExperiencia, useModo } from "@/lib/viva-modos";

export function SeletorDeModo() {
  const { modo, trocarModo } = useModo();

  return (
    <section aria-labelledby="modos-titulo" className="space-y-3">
      <h2 id="modos-titulo" className="viva-subtitulo text-[var(--profile-text)]">
        De qual jeito você quer ver o VIVA?
      </h2>
      <p className="viva-legenda text-[var(--profile-muted)]">
        A mesma informação, apresentada de outra forma. Pode trocar quantas vezes quiser.
      </p>
      <ul className="space-y-3">
        {modosDeExperiencia.map((m) => (
          <li key={m.id}>
            <VisualProfileCard
              id={m.id}
              nome={m.nome}
              resumo={m.resumo}
              oQueMuda={m.oQueMuda}
              ativo={m.id === modo.id}
              onEscolher={() => trocarModo(m.id)}
            />
          </li>
        ))}
      </ul>
      <p aria-live="polite" className="sr-only">
        Modo em uso: {modo.nome}.
      </p>
    </section>
  );
}
