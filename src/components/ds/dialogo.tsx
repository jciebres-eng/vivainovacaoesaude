import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ReactNode } from "react";

import { Botao, type VarianteBotao } from "./botao";

/**
 * Modais e diálogos do VIVA (documento 14, "Modais").
 *
 * Um modal só existe quando interromper é melhor que navegar. Sempre com
 * título, contexto, uma ação principal clara e a opção de cancelar.
 * Fechamento por teclado (Esc) e gerenciamento de foco vêm do Radix Dialog.
 */
export type TipoDialogo = "confirmacao" | "informacao" | "aviso" | "edicao" | "exclusao";

const acaoDoTipo: Record<TipoDialogo, VarianteBotao> = {
  confirmacao: "principal",
  informacao: "principal",
  aviso: "principal",
  edicao: "principal",
  exclusao: "destrutivo",
};

export function Dialogo({
  tipo = "confirmacao",
  aberto,
  onAbertoChange,
  titulo,
  contexto,
  children,
  /** Diga o que a ação faz: "Salvar este registro", nunca só "Confirmar". */
  rotuloAcao = "Continuar",
  onAcao,
  rotuloCancelar = "Cancelar",
  carregando = false,
}: {
  tipo?: TipoDialogo;
  aberto: boolean;
  onAbertoChange: (v: boolean) => void;
  titulo: string;
  /** Contexto: por que este diálogo apareceu e o que acontece em seguida. */
  contexto: string;
  children?: ReactNode;
  rotuloAcao?: string;
  onAcao?: () => void;
  rotuloCancelar?: string;
  carregando?: boolean;
}) {
  return (
    <Dialog open={aberto} onOpenChange={onAbertoChange}>
      <DialogContent className="rounded-3xl border-border-default-default bg-surface-default sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="viva-titulo-secao text-text-primary">{titulo}</DialogTitle>
          <DialogDescription className="viva-apoio text-text-secondary">
            {contexto}
          </DialogDescription>
        </DialogHeader>

        {children ? <div className="space-y-4">{children}</div> : null}

        <DialogFooter className="mt-2 flex-row flex-wrap items-center gap-3 sm:justify-start">
          {onAcao ? (
            <Botao variante={acaoDoTipo[tipo]} carregando={carregando} onClick={onAcao}>
              {rotuloAcao}
            </Botao>
          ) : null}
          <Botao variante="terciario" onClick={() => onAbertoChange(false)}>
            {tipo === "informacao" ? "Fechar" : rotuloCancelar}
          </Botao>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
