import { useEffect, useState } from "react";

import { usePerfil } from "@/lib/viva-perfis";

/**
 * AberturaDinamica — 2 segundos de respiro antes da experiência.
 *
 * Sem logotipo girando, sem carregamento falso: apenas o nome e uma frase
 * curta. Aparece uma vez por sessão e pode ser pulada. Em modo de baixa
 * estimulação, não há animação (documentos 04, 13 e 17).
 */
export function AberturaDinamica({ baixaEstimulacao = false }: { baixaEstimulacao?: boolean }) {
  const { perfil } = usePerfil();
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem("viva.abertura.v1") === "vista") return;
      window.sessionStorage.setItem("viva.abertura.v1", "vista");
    } catch {
      /* sem sessionStorage: a abertura aparece normalmente */
    }
    setVisivel(true);
    const t = window.setTimeout(() => setVisivel(false), 2200);
    return () => window.clearTimeout(t);
    // Roda uma única vez: mudanças de preferência não devem reabrir a abertura.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  if (!visivel) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-40 grid place-items-center bg-background px-8"
      onClick={() => setVisivel(false)}
    >
      <div className={baixaEstimulacao ? "text-center" : "viva-fade text-center"}>
        <p className="viva-titulo text-text-primary">VIVA</p>
        <p className="mt-3 viva-apoio text-text-secondary">
          Olá, {perfil.nome.split(" ")[0]}. Sem pressa: começamos quando você quiser.
        </p>
        <button
          type="button"
          onClick={() => setVisivel(false)}
          className="viva-tap mt-8 min-h-11 rounded-full px-5 viva-legenda font-medium text-text-secondary underline underline-offset-4"
        >
          Ir direto para o início
        </button>
      </div>
    </div>
  );
}
