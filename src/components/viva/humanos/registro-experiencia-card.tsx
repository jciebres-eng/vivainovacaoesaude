import { useState } from "react";

import { AreaDeTexto, Botao, Card, Confirmacao } from "@/components/ds";
import {
  ajustesPossiveis,
  comoFoi,
  oQueAjudou,
  oQueDificultou,
} from "./dados-demo";
import { AcoesAutonomas, EscolhaAutonomaGroup } from "./escolha-autonoma";

/**
 * RegistroExperienciaCard — descrever, nunca avaliar (documentos 00 e 13).
 *
 * Não existe "conseguiu?", "cumpriu a meta?", "desempenho", "falhou",
 * pontuação ou correção. A experiência vira material da própria pessoa:
 * o que ajudou, o que dificultou e o que ela quer ajustar da próxima vez.
 * Ao salvar, a confirmação é neutra — sem comemoração, medalha ou elogio.
 */
export type RegistroDaExperiencia = {
  comoFoi: string | null;
  emMinhasPalavras: string;
  ajudou: string[];
  dificultou: string[];
  ajuste: string | null;
};

const vazio: RegistroDaExperiencia = {
  comoFoi: null,
  emMinhasPalavras: "",
  ajudou: [],
  dificultou: [],
  ajuste: null,
};

const blocos = ["comoFoi", "ajudou", "dificultou", "ajuste"] as const;

export function RegistroExperienciaCard({
  atividade,
  onSalvar,
  onRegistrarDepois,
  onDispensar,
  className,
}: {
  atividade?: string;
  onSalvar?: (registro: RegistroDaExperiencia) => void;
  onRegistrarDepois?: () => void;
  onDispensar?: () => void;
  className?: string;
}) {
  const [registro, setRegistro] = useState<RegistroDaExperiencia>(vazio);
  const [bloco, setBloco] = useState(0);
  const [salvo, setSalvo] = useState(false);
  const [salvando, setSalvando] = useState(false);

  const alternarLista = (campo: "ajudou" | "dificultou", id: string) =>
    setRegistro((r) => ({
      ...r,
      [campo]: r[campo].includes(id)
        ? r[campo].filter((i) => i !== id)
        : [...r[campo], id],
    }));

  if (salvo) {
    return (
      <Card variante="registro" titulo="Registro guardado" className={className}>
        <Confirmacao>
          Seu registro foi salvo. Você poderá revisá-lo quando quiser.
        </Confirmacao>
        <AcoesAutonomas
          secundarias={
            <Botao
              variante="terciario"
              tamanho="compacto"
              onClick={() => {
                setSalvo(false);
                setBloco(0);
              }}
            >
              Revisar respostas
            </Botao>
          }
        />
      </Card>
    );
  }

  const atual = blocos[bloco];

  return (
    <Card
      variante="registro"
      titulo="Como foi para você"
      descricao={
        atividade
          ? `Um registro sobre "${atividade}". Não é uma avaliação: é o seu relato.`
          : "Não é uma avaliação: é o seu relato, com as suas palavras."
      }
      className={className}
    >
      <div className="space-y-6">
        {atual === "comoFoi" ? (
          <>
            <EscolhaAutonomaGroup
              titulo="Como foi?"
              opcoes={comoFoi}
              valor={registro.comoFoi}
              onEscolher={(id) =>
                setRegistro((r) => ({
                  ...r,
                  comoFoi: r.comoFoi === id ? null : id,
                }))
              }
              nota={null}
            />
            {registro.comoFoi === "minhas-palavras" ? (
              <AreaDeTexto
                rotulo="Com minhas palavras"
                apoio="Escreva o quanto quiser. Ninguém corrige este texto."
                value={registro.emMinhasPalavras}
                onChange={(e) =>
                  setRegistro((r) => ({
                    ...r,
                    emMinhasPalavras: e.target.value,
                  }))
                }
              />
            ) : null}
          </>
        ) : null}

        {atual === "ajudou" ? (
          <EscolhaAutonomaGroup
            titulo="O que ajudou?"
            apoio="Pode marcar mais de um, ou nenhum."
            opcoes={oQueAjudou}
            valores={registro.ajudou}
            multipla
            onEscolher={(id) => alternarLista("ajudou", id)}
            nota={null}
          />
        ) : null}

        {atual === "dificultou" ? (
          <EscolhaAutonomaGroup
            titulo="O que dificultou?"
            apoio="Isto ajuda você a reconhecer condições, não a se cobrar."
            opcoes={oQueDificultou}
            valores={registro.dificultou}
            multipla
            onEscolher={(id) => alternarLista("dificultou", id)}
            nota={null}
          />
        ) : null}

        {atual === "ajuste" ? (
          <EscolhaAutonomaGroup
            titulo="Gostaria de ajustar algo para a próxima vez?"
            opcoes={ajustesPossiveis}
            valor={registro.ajuste}
            onEscolher={(id) =>
              setRegistro((r) => ({ ...r, ajuste: r.ajuste === id ? null : id }))
            }
            nota="Manter como está também é uma escolha."
          />
        ) : null}

        <p className="viva-legenda text-text-secondary">
          Parte {bloco + 1} de {blocos.length}. Você pode responder só o que
          quiser.
        </p>
      </div>

      <AcoesAutonomas
        principal={
          bloco < blocos.length - 1 ? (
            <Botao variante="principal" onClick={() => setBloco((b) => b + 1)}>
              Continuar
            </Botao>
          ) : (
            <Botao
              variante="principal"
              carregando={salvando}
              textoCarregando="Guardando seu registro…"
              onClick={() => {
                setSalvando(true);
                onSalvar?.(registro);
                setSalvando(false);
                setSalvo(true);
              }}
            >
              Salvar meu registro
            </Botao>
          )
        }
        secundarias={
          <>
            {bloco > 0 ? (
              <Botao
                variante="terciario"
                tamanho="compacto"
                onClick={() => setBloco((b) => b - 1)}
              >
                Revisar respostas
              </Botao>
            ) : null}
            {onRegistrarDepois ? (
              <Botao
                variante="terciario"
                tamanho="compacto"
                onClick={onRegistrarDepois}
              >
                Registrar depois
              </Botao>
            ) : null}
            {onDispensar ? (
              <Botao
                variante="terciario"
                tamanho="compacto"
                onClick={onDispensar}
              >
                Não quero registrar agora
              </Botao>
            ) : null}
          </>
        }
      />
    </Card>
  );
}
