/**
 * Catálogo visual de situações.
 *
 * As situações substituem os antigos personagens: qualquer uma delas está
 * disponível para o perfil único de demonstração, sem vínculo com contexto
 * pessoal, diagnóstico ou nível de suporte (documentos 06, 08, 10 e 24).
 */
import { useNavigate } from "@tanstack/react-router";
import {
  Briefcase,
  Bus,
  GraduationCap,
  HeartPulse,
  Home,
  Search,
  ShoppingBasket,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useMemo, useState } from "react";

import { criarPercurso } from "@/lib/viva-percursos";
import { situacoes, sugerirSituacoes, type Situacao } from "@/lib/viva-situacoes";

const iconePorContexto: Record<string, LucideIcon> = {
  compras: ShoppingBasket,
  mobilidade: Bus,
  saude: HeartPulse,
  trabalho: Briefcase,
  academico: GraduationCap,
  indefinido: Users,
};

const rotuloPorContexto: Record<string, string> = {
  compras: "Compras e alimentação",
  mobilidade: "Transporte e deslocamento",
  saude: "Saúde e cuidado",
  trabalho: "Trabalho e serviços",
  academico: "Estudo",
  indefinido: "Convívio e rotina",
};

function CartaoDeSituacao({ situacao, onEscolher }: { situacao: Situacao; onEscolher: () => void }) {
  const Icone = iconePorContexto[situacao.contexto] ?? Home;
  return (
    <button
      type="button"
      onClick={onEscolher}
      className="viva-tap flex h-full w-full flex-col gap-2 rounded-3xl border border-border-default bg-surface-default p-4 text-left shadow-suave"
    >
      <span
        aria-hidden
        className="grid h-11 w-11 place-items-center rounded-2xl bg-destaque-suave text-destaque-texto"
      >
        <Icone className="h-5 w-5" />
      </span>
      <span className="block viva-legenda text-text-secondary">
        {rotuloPorContexto[situacao.contexto] ?? "Rotina"}
      </span>
      <span className="block viva-apoio font-semibold text-text-primary">{situacao.titulo}</span>
      <span className="block viva-legenda text-text-secondary">{situacao.resumo}</span>
      <span className="mt-auto block viva-legenda text-destaque-texto">
        {situacao.duracaoAproximada} · você pode mudar tudo depois
      </span>
    </button>
  );
}

/**
 * CatálogoDeSituacoes — busca simples por palavras e grade visual.
 * Ao escolher, o percurso é criado como rascunho e a pessoa segue montando.
 */
export function CatalogoDeSituacoes({ titulo = "Situações disponíveis" }: { titulo?: string }) {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");

  const lista = useMemo(() => {
    const texto = busca.trim();
    if (!texto) return situacoes;
    const sugeridas = sugerirSituacoes(texto, situacoes.length).map((s) => s.situacao);
    if (sugeridas.length > 0) return sugeridas;
    const alvo = texto.toLowerCase();
    return situacoes.filter(
      (s) =>
        s.titulo.toLowerCase().includes(alvo) ||
        s.resumo.toLowerCase().includes(alvo),
    );
  }, [busca]);

  function escolher(situacao: Situacao) {
    const novo = criarPercurso(situacao, situacao.titulo);
    navigate({ to: "/percurso/$id", params: { id: novo.id }, search: { fase: "preparar" } });
  }

  return (
    <section aria-labelledby="catalogo-situacoes" className="space-y-3">
      <div>
        <h2 id="catalogo-situacoes" className="viva-titulo-secao text-text-primary">
          {titulo}
        </h2>
        <p className="mt-1 viva-apoio text-text-secondary">
          Todas ficam sempre disponíveis. Escolha a que faz sentido hoje.
        </p>
      </div>

      <label className="flex min-h-12 items-center gap-2 rounded-2xl border border-border-default bg-surface-default px-4">
        <Search className="h-4 w-4 text-text-secondary" aria-hidden />
        <span className="sr-only">Buscar uma situação</span>
        <input
          type="search"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Procurar: mercado, ônibus, consulta…"
          className="min-h-11 w-full bg-transparent viva-legenda text-text-primary outline-none placeholder:text-text-secondary"
        />
      </label>

      {lista.length === 0 ? (
        <p aria-live="polite" className="viva-legenda text-text-secondary">
          Nenhuma situação com esse nome. Você pode escrever o que precisa no campo do início.
        </p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {lista.map((situacao) => (
            <li key={situacao.id} className="flex">
              <CartaoDeSituacao situacao={situacao} onEscolher={() => escolher(situacao)} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
