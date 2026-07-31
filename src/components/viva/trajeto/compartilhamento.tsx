import { Link } from "@tanstack/react-router";
import { Copy, EyeOff, ShieldCheck, Square } from "lucide-react";
import { useState } from "react";

import { Botao, Card, Nota } from "@/components/ds";
import {
  contatosDemonstrativos,
  minutosRestantes,
  niveis,
  trajeto as acoesDoTrajeto,
  type Compartilhamento,
} from "@/lib/viva-trajeto";

/**
 * Indicador permanente de acompanhamento ativo.
 * Enquanto alguém acompanha, isto fica visível — nunca escondido.
 */
export function IndicadorDeAcompanhamento({
  compartilhamento,
}: {
  compartilhamento: Compartilhamento;
}) {
  if (!compartilhamento.ativo) return null;
  const contato = contatosDemonstrativos.find((c) => c.id === compartilhamento.contatoId);
  const nivel = niveis.find((n) => n.id === compartilhamento.nivel);

  return (
    <div
      role="status"
      className="rounded-3xl border border-destaque/40 bg-destaque-suave p-4 text-destaque-texto"
    >
      <p className="flex items-center gap-2 viva-apoio font-semibold">
        <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden />
        {contato?.nome ?? "Alguém de confiança"} está acompanhando este percurso
      </p>
      <p className="mt-1 viva-legenda">
        {nivel?.titulo}
        {compartilhamento.localizacaoPausada ? " · localização pausada" : ""} · termina em{" "}
        {minutosRestantes(compartilhamento)} min
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Botao
          variante="secundario"
          tamanho="compacto"
          icone={EyeOff}
          onClick={() =>
            acoesDoTrajeto.pausarLocalizacao(!compartilhamento.localizacaoPausada)
          }
        >
          {compartilhamento.localizacaoPausada ? "Voltar a mostrar" : "Pausar localização"}
        </Botao>
        <Botao
          variante="secundario"
          tamanho="compacto"
          icone={Square}
          onClick={() => acoesDoTrajeto.encerrarCompartilhamento()}
        >
          Parar de compartilhar
        </Botao>
      </div>
    </div>
  );
}

/** Link temporário simulado, aberto no próprio navegador. */
export function LinkTemporario({ token }: { token: string }) {
  const [copiado, setCopiado] = useState(false);
  const endereco =
    typeof window === "undefined" ? `/acompanhar/${token}` : `${window.location.origin}/acompanhar/${token}`;

  return (
    <Card variante="informativo" titulo="Link temporário">
      <p className="viva-apoio text-text-secondary">
        Este link é uma simulação demonstrativa: ele abre a tela de acompanhamento neste mesmo
        navegador. Nenhum dado sai deste dispositivo.
      </p>
      <p className="mt-3 break-all rounded-2xl bg-surface-muted px-4 py-3 viva-legenda text-text-primary">
        {endereco}
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Botao
          variante="secundario"
          tamanho="compacto"
          icone={Copy}
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(endereco);
              setCopiado(true);
            } catch {
              setCopiado(false);
            }
          }}
        >
          {copiado ? "Link copiado" : "Copiar link"}
        </Botao>
        <a
          href={`/acompanhar/${token}`}
          target="_blank"
          rel="noreferrer"
          className="viva-tap inline-flex min-h-11 items-center justify-center rounded-full bg-action-primary px-4 py-2.5 viva-legenda font-semibold text-action-primary-foreground"
        >
          Ver o que a pessoa vê
        </a>
      </div>
      <Nota>
        O link deixa de funcionar quando o tempo escolhido termina, quando o percurso é concluído
        ou quando você parar de compartilhar.
      </Nota>
      <p className="mt-2 viva-legenda text-text-secondary">
        Prefere revisar antes? <Link to="/seus-dados" className="underline underline-offset-4">Ver como seus dados são tratados</Link>.
      </p>
    </Card>
  );
}
