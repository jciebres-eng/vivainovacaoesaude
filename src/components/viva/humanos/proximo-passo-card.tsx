import { useState } from "react";

import { Botao, Card, Esqueleto } from "@/components/ds";
import { passosPossiveis, type PassoPossivel } from "./dados-demo";
import { AcoesAutonomas, EscolhaAutonomaGroup } from "./escolha-autonoma";

/**
 * ProximoPassoCard — uma única ação possível por vez (documentos 04 e 13).
 *
 * Mostra uma sugestão de cada vez para reduzir decisões. Nunca há meta,
 * prazo, cobrança ou mensagem do tipo "você precisa concluir hoje".
 * Recusar, trocar e adiar são saídas legítimas, sempre visíveis.
 */
export function ProximoPassoCard({
  passo: passoExterno,
  passos = passosPossiveis,
  carregando = false,
  onComecar,
  onAdiar,
  onRecusar,
  className,
}: {
  passo?: PassoPossivel;
  /** Alternativas oferecidas em "Escolher outro". */
  passos?: PassoPossivel[];
  carregando?: boolean;
  onComecar?: (passo: PassoPossivel) => void;
  onAdiar?: () => void;
  onRecusar?: () => void;
  className?: string;
}) {
  const [escolhido, setEscolhido] = useState<PassoPossivel>(
    passoExterno ?? passos[0],
  );
  const [trocando, setTrocando] = useState(false);
  const passo = passoExterno ?? escolhido;

  if (carregando) {
    return (
      <Card variante="proximo-passo" className={className}>
        <p role="status" aria-live="polite" className="viva-legenda text-text-secondary">
          Preparando uma sugestão…
        </p>
        <div className="mt-4 space-y-3">
          <Esqueleto className="h-6 w-2/3" />
          <Esqueleto className="h-4 w-full" />
          <Esqueleto className="h-11 w-44" arredondado="grande" />
        </div>
      </Card>
    );
  }

  return (
    <Card
      variante="proximo-passo"
      titulo="Qual é o próximo pequeno passo possível?"
      descricao="Uma possibilidade por vez. Você decide se ela serve para agora."
      className={className}
    >
      {trocando ? (
        <div>
          <EscolhaAutonomaGroup
            titulo="Outras possibilidades"
            apoio="Todas são igualmente válidas."
            opcoes={passos.map((p) => ({
              id: p.id,
              rotulo: p.titulo,
              apoio: p.duracao,
            }))}
            valor={passo.id}
            onEscolher={(id) => {
              const proximo = passos.find((p) => p.id === id);
              if (proximo) setEscolhido(proximo);
              setTrocando(false);
            }}
            colunas="uma"
          />
          <AcoesAutonomas
            secundarias={
              <Botao
                variante="terciario"
                tamanho="compacto"
                onClick={() => setTrocando(false)}
              >
                Manter a sugestão anterior
              </Botao>
            }
          />
        </div>
      ) : (
        <div>
          <h3 className="viva-subtitulo text-text-primary">{passo.titulo}</h3>
          <p className="mt-2 viva-apoio text-text-secondary">{passo.descricao}</p>

          <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2 viva-legenda text-text-secondary">
            <div>
              <dt className="font-medium text-text-primary">Duração aproximada</dt>
              <dd>{passo.duracao}</dd>
            </div>
            <div>
              <dt className="font-medium text-text-primary">Esforço percebido</dt>
              <dd className="first-letter:uppercase">{passo.esforco}</dd>
            </div>
          </dl>

          <AcoesAutonomas
            principal={
              <Botao variante="principal" onClick={() => onComecar?.(passo)}>
                {passo.acao}
              </Botao>
            }
            secundarias={
              <>
                <Botao
                  variante="terciario"
                  tamanho="compacto"
                  onClick={() => setTrocando(true)}
                >
                  Escolher outro
                </Botao>
                {onAdiar ? (
                  <Botao
                    variante="terciario"
                    tamanho="compacto"
                    onClick={onAdiar}
                  >
                    Retomar depois
                  </Botao>
                ) : null}
                {onRecusar ? (
                  <Botao
                    variante="terciario"
                    tamanho="compacto"
                    onClick={onRecusar}
                  >
                    Não quero este passo
                  </Botao>
                ) : null}
              </>
            }
            nota="Não há prazo. Este passo continua disponível quando você quiser."
          />
        </div>
      )}
    </Card>
  );
}
