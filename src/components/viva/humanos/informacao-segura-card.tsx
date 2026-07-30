import type { LucideIcon } from "lucide-react";
import { BookOpen, Info, LifeBuoy, Lock, ShieldAlert, X } from "lucide-react";
import { useState, type ReactNode } from "react";

import { BotaoIcone, Card, type VarianteCard } from "@/components/ds";
import { cn } from "@/lib/utils";
import { icone as tokenIcone } from "@/components/ds";

/**
 * InformacaoSeguraCard — limites e orientações sem alarmismo (docs 15 e 16).
 *
 * Comunica o que o VIVA é e o que ele não é, em linguagem simples: nada de
 * texto jurídico extenso dentro da experiência principal, nada de tom de
 * alerta vermelho. Sempre com o motivo da informação e uma ação possível.
 */
export type TipoDeInformacao = "informacao" | "atencao" | "privacidade" | "limite" | "apoio-humano";

const aparencia: Record<
  TipoDeInformacao,
  { icone: LucideIcon; variante: VarianteCard; rotulo: string }
> = {
  informacao: { icone: Info, variante: "informativo", rotulo: "Informação" },
  atencao: { icone: ShieldAlert, variante: "aviso", rotulo: "Atenção" },
  privacidade: { icone: Lock, variante: "informativo", rotulo: "Privacidade" },
  limite: { icone: BookOpen, variante: "informativo", rotulo: "Limite do VIVA" },
  "apoio-humano": {
    icone: LifeBuoy,
    variante: "estado-atual",
    rotulo: "Apoio humano",
  },
};

export function InformacaoSeguraCard({
  tipo = "informacao",
  titulo,
  mensagem,
  motivo,
  acao,
  aoFechar,
  className,
}: {
  tipo?: TipoDeInformacao;
  titulo: string;
  /** Mensagem curta, em linguagem simples. */
  mensagem: string;
  /** Por que esta informação aparece aqui. */
  motivo?: string;
  /** Ação possível — opcional e nunca obrigatória. */
  acao?: ReactNode;
  /** Quando informado, o card pode ser fechado. */
  aoFechar?: () => void;
  className?: string;
}) {
  const [visivel, setVisivel] = useState(true);
  if (!visivel) return null;

  const { icone: Icone, variante, rotulo } = aparencia[tipo];

  return (
    <Card variante={variante} className={cn("relative", className)}>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0">
          <p className="flex items-center gap-2 viva-legenda text-text-secondary">
            <Icone className={cn(tokenIcone.padrao, "shrink-0")} aria-hidden />
            {rotulo}
          </p>
          <h2 className="mt-2 viva-subtitulo text-text-primary">{titulo}</h2>
          <p className="mt-2 viva-apoio text-text-secondary">{mensagem}</p>
          {motivo ? <p className="mt-2 viva-legenda text-text-secondary">{motivo}</p> : null}
        </div>

        {aoFechar ? (
          <BotaoIcone
            icone={X}
            rotulo={`Fechar aviso: ${titulo}`}
            variante="secundario"
            onClick={() => {
              setVisivel(false);
              aoFechar();
            }}
          />
        ) : null}
      </div>

      {acao ? <div className="mt-5 flex flex-wrap items-center gap-3">{acao}</div> : null}
    </Card>
  );
}

/** Texto padrão sobre o limite do VIVA, usado em mais de uma tela. */
export const limiteDoViva = {
  titulo: "O que o VIVA faz e o que não faz",
  mensagem:
    "O VIVA oferece apoio educativo e funcional. Ele não realiza diagnóstico nem substitui acompanhamento profissional.",
  motivo:
    "Deixamos isso visível para que você saiba o que esperar em qualquer momento do percurso.",
};
