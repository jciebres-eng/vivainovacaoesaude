/**
 * GradeDeSituacoes — os cards predominantemente gráficos da Home e do
 * /explorar. Imagem ampla, título curto, quase nenhum texto secundário e uma
 * microanimação discreta ao tocar (documentos 13, 17, 23 e 24).
 */
import { useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Cena } from "@/components/viva/visual/visual-base";
import { repositorios } from "@/lib/match/repositorios";
import type { Situation } from "@/lib/match/tipos";
import { useModo } from "@/lib/viva-modos";

export function GradeDeSituacoes({
  titulo = "Situações",
  comBusca = true,
  limite,
  buscaInicial = "",
}: {
  titulo?: string;
  comBusca?: boolean;
  limite?: number;
  buscaInicial?: string;
}) {
  const navigate = useNavigate();
  const { movimentoReduzido } = useModo();
  const [situacoes, setSituacoes] = useState<Situation[]>([]);
  const [busca, setBusca] = useState(buscaInicial);

  useEffect(() => {
    let vivo = true;
    void repositorios.situacoes.listar().then((lista) => {
      if (vivo) setSituacoes(lista);
    });
    return () => {
      vivo = false;
    };
  }, []);

  const lista = useMemo(() => {
    const alvo = busca.trim().toLowerCase();
    const filtradas = alvo
      ? situacoes.filter(
          (s) =>
            s.titulo.toLowerCase().includes(alvo) ||
            (s.descricao ?? "").toLowerCase().includes(alvo) ||
            s.contexto.includes(alvo),
        )
      : situacoes;
    return limite ? filtradas.slice(0, limite) : filtradas;
  }, [busca, limite, situacoes]);

  return (
    <section aria-labelledby="grade-situacoes" className="space-y-3">
      <h2 id="grade-situacoes" className="viva-titulo-secao text-[var(--profile-text)]">
        {titulo}
      </h2>

      {comBusca ? (
        <label className="flex min-h-12 items-center gap-2 rounded-2xl border border-[var(--profile-border)] bg-[var(--profile-card)] px-4">
          <Search className="h-4 w-4 text-[var(--profile-muted)]" aria-hidden />
          <span className="sr-only">Buscar uma situação</span>
          <input
            type="search"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="mercado, ônibus, consulta…"
            className="min-h-11 w-full bg-transparent viva-legenda text-[var(--profile-text)] outline-none placeholder:text-[var(--profile-muted)]"
          />
        </label>
      ) : null}

      {lista.length === 0 ? (
        <p aria-live="polite" className="viva-legenda text-[var(--profile-muted)]">
          Nenhuma situação com esse nome. Você pode escrever o que precisa no campo do início.
        </p>
      ) : (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {lista.map((s) => (
            <li key={s.id} className="flex">
              <motion.button
                type="button"
                whileTap={movimentoReduzido ? undefined : { scale: 0.97 }}
                transition={{ duration: 0.15 }}
                onClick={() =>
                  navigate({ to: "/match/$situationId", params: { situationId: s.id } })
                }
                aria-label={`${s.titulo}. ${s.descricao ?? ""}`}
                className="viva-tap flex w-full flex-col overflow-hidden border border-[var(--profile-border)] bg-[var(--profile-card)] text-left shadow-suave"
                style={{ borderRadius: "var(--profile-radius)" }}
              >
                <span className="block h-24 w-full">
                  <Cena
                    tipo={s.cena}
                    chave={s.id}
                    descricao={`Imagem representando ${s.titulo}.`}
                    className="h-full w-full"
                  />
                </span>
                <span className="block p-3 viva-legenda font-semibold text-[var(--profile-text)]">
                  {s.titulo}
                </span>
              </motion.button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
