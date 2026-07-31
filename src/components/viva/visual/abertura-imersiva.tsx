/**
 * ProfileMorphTransition — véu discreto durante a troca de modo.
 * A interface se desfaz e se recompõe: a pessoa percebe que tudo mudou de
 * propósito, sem susto e sem piscada.
 */
export function ProfileMorphTransition() {
  const { fase, proximo, movimentoReduzido } = useModo();
  if (fase === "parado" || movimentoReduzido) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40"
      style={{
        background: "var(--profile-background)",
        opacity: fase === "desfazendo" ? 0.85 : 0,
        transition: "opacity 400ms ease-in-out",
      }}
    >
      <div className="grid h-full place-items-center">
        <p className="viva-legenda text-[var(--profile-muted)]">
          {proximo ? `Preparando o modo ${proximo.nome.toLowerCase()}` : ""}
        </p>
      </div>
    </div>
  );
}
