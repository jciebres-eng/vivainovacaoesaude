import { useState } from "react";

import { Botao, Card, Confirmacao } from "@/components/ds";
import {
  comoEstouHoje,
  contextoAtual,
  energiaDisponivel,
} from "./dados-demo";
import { EscolhaAutonomaGroup } from "./escolha-autonoma";

/**
 * MeuMomentoCard — leitura simples e opcional do momento atual.
 *
 * O que este componente NÃO é (documentos 15 e 16): avaliação clínica,
 * triagem, diagnóstico, monitoramento de saúde ou inferência de estado
 * mental. Nada aqui é pontuado, classificado ou comparado, e nada sai
 * deste dispositivo.
 */
export type EscolhasDoMomento = {
  comoEstou: string | null;
  energia: string | null;
  contexto: string | null;
};

const vazio: EscolhasDoMomento = {
  comoEstou: null,
  energia: null,
  contexto: null,
};

/** Sugestão leve, sempre modificável e sempre ignorável. */
export function sugestaoDoMomento(e: EscolhasDoMomento): string {
  if (e.comoEstou === "sobrecarregado" || e.energia === "baixa") {
    return "Talvez um passo breve seja suficiente agora.";
  }
  if (e.comoEstou === "inseguro") {
    return "Uma preparação tranquila pode ajudar antes de começar.";
  }
  if (e.comoEstou === "cansado") {
    return "Também é possível retomar depois.";
  }
  if (e.comoEstou === "disposto" || e.energia === "alta") {
    return "Você pode continuar de onde parou.";
  }
  return "Você pode seguir no ritmo que fizer sentido hoje.";
}

export function MeuMomentoCard({
  escolhas: escolhasExternas,
  onMudar,
  onSeguirSugestao,
  onPular,
  rotuloSugestao = "Ver este passo",
  salvo = false,
  className,
}: {
  escolhas?: EscolhasDoMomento;
  onMudar?: (escolhas: EscolhasDoMomento) => void;
  /** Ação opcional a partir da sugestão. Continua sendo só uma possibilidade. */
  onSeguirSugestao?: () => void;
  onPular?: () => void;
  rotuloSugestao?: string;
  salvo?: boolean;
  className?: string;
}) {
  const [internas, setInternas] = useState<EscolhasDoMomento>(vazio);
  const escolhas = escolhasExternas ?? internas;
  const [aberto, setAberto] = useState(false);

  const mudar = (parcial: Partial<EscolhasDoMomento>) => {
    const proximas = { ...escolhas, ...parcial };
    setInternas(proximas);
    onMudar?.(proximas);
  };

  const alguma =
    escolhas.comoEstou || escolhas.energia || escolhas.contexto ? true : false;

  return (
    <Card
      variante="estado-atual"
      titulo="Meu momento"
      descricao="Se quiser, diga como você está agora. Responder é opcional e nada disso é avaliado."
      className={className}
    >
      {!aberto && !alguma ? (
        <div className="flex flex-wrap items-center gap-3">
          <Botao variante="secundario" onClick={() => setAberto(true)}>
            Registrar como estou
          </Botao>
          {onPular ? (
            <Botao variante="terciario" tamanho="compacto" onClick={onPular}>
              Agora não
            </Botao>
          ) : null}
        </div>
      ) : (
        <div className="space-y-6">
          <EscolhaAutonomaGroup
            titulo="Como estou hoje"
            opcoes={comoEstouHoje}
            valor={escolhas.comoEstou}
            onEscolher={(id) =>
              mudar({ comoEstou: escolhas.comoEstou === id ? null : id })
            }
            nota={null}
          />

          <EscolhaAutonomaGroup
            titulo="Energia disponível"
            opcoes={energiaDisponivel}
            valor={escolhas.energia}
            onEscolher={(id) =>
              mudar({ energia: escolhas.energia === id ? null : id })
            }
            nota={null}
          />

          <EscolhaAutonomaGroup
            titulo="Contexto atual"
            opcoes={contextoAtual}
            valor={escolhas.contexto}
            onEscolher={(id) =>
              mudar({ contexto: escolhas.contexto === id ? null : id })
            }
            nota="Você pode responder só o que quiser e mudar quando precisar."
          />

          <div className="rounded-2xl bg-surface-default/70 p-4">
            <p className="viva-rotulo text-text-primary">
              {sugestaoDoMomento(escolhas)}
            </p>
            <p className="mt-1 viva-legenda text-text-secondary">
              É apenas uma sugestão. Você pode ignorá-la ou seguir por outro
              caminho.
            </p>
            {onSeguirSugestao ? (
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Botao variante="secundario" onClick={onSeguirSugestao}>
                  {rotuloSugestao}
                </Botao>
              </div>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Botao
              variante="terciario"
              tamanho="compacto"
              onClick={() => {
                setInternas(vazio);
                onMudar?.(vazio);
              }}
            >
              Limpar respostas
            </Botao>
            <Botao
              variante="terciario"
              tamanho="compacto"
              onClick={() => setAberto(false)}
            >
              Fechar por agora
            </Botao>
          </div>

          {salvo ? (
            <Confirmacao>Guardado apenas neste dispositivo.</Confirmacao>
          ) : null}
        </div>
      )}
    </Card>
  );
}
