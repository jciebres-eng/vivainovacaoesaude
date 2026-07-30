import { Botao, EstadoDaInterface } from "@/components/ds";

/**
 * Estados vazios próprios de cada área (documentos 04 e 14).
 * Sempre com no máximo uma ação principal e sem linguagem de cobrança.
 */

export function SemEstrategias({ onAdicionar }: { onAdicionar?: () => void }) {
  return (
    <EstadoDaInterface
      tipo="vazio"
      titulo="Você ainda não adicionou estratégias pessoais."
      texto="Elas podem ser registradas aos poucos, a partir do que você percebe como útil."
      acao={
        onAdicionar ? (
          <Botao variante="principal" onClick={onAdicionar}>
            Adicionar uma estratégia
          </Botao>
        ) : undefined
      }
    />
  );
}

export function SemRegistros({ onRegistrar }: { onRegistrar?: () => void }) {
  return (
    <EstadoDaInterface
      tipo="vazio"
      titulo="Ainda não há experiências registradas."
      texto="Você pode começar quando desejar."
      acao={
        onRegistrar ? (
          <Botao variante="principal" onClick={onRegistrar}>
            Registrar uma experiência
          </Botao>
        ) : undefined
      }
    />
  );
}

export function SemDuvidas({ onRegistrar }: { onRegistrar?: () => void }) {
  return (
    <EstadoDaInterface
      tipo="vazio"
      titulo="Não há dúvidas salvas neste momento."
      texto="Quando surgir uma pergunta, você pode guardá-la aqui."
      acao={
        onRegistrar ? (
          <Botao variante="principal" onClick={onRegistrar}>
            Registrar uma dúvida
          </Botao>
        ) : undefined
      }
    />
  );
}

export function SemProximoPasso({ onExplorar }: { onExplorar?: () => void }) {
  return (
    <EstadoDaInterface
      tipo="vazio"
      titulo="Não há uma atividade definida agora."
      texto="Você pode explorar as habilidades ou a biblioteca."
      acao={
        onExplorar ? (
          <Botao variante="principal" onClick={onExplorar}>
            Explorar habilidades
          </Botao>
        ) : undefined
      }
    />
  );
}

export function SemReflexoes() {
  return (
    <EstadoDaInterface
      tipo="vazio"
      titulo="Ainda não há reflexões guardadas."
      texto="Uma reflexão fica disponível depois que você registra uma experiência."
    />
  );
}

export function SemPreparacoes({ onPreparar }: { onPreparar?: () => void }) {
  return (
    <EstadoDaInterface
      tipo="vazio"
      titulo="Nenhuma preparação salva por enquanto."
      texto="Preparar é opcional e pode ser feito aos poucos."
      acao={
        onPreparar ? (
          <Botao variante="principal" onClick={onPreparar}>
            Preparar uma atividade
          </Botao>
        ) : undefined
      }
    />
  );
}
