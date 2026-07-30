import { useState } from "react";

import { AreaDeTexto, Botao, Card, Confirmacao } from "@/components/ds";
import { dataLegivel, perguntasDeReflexao, type ReflexaoDeConteudo } from "@/lib/viva-biblioteca";

/**
 * ReflexaoBibliotecaCard — registro pessoal sobre um conteúdo.
 *
 * Todas as perguntas são opcionais, o texto pertence à pessoa e nada é
 * interpretado, resumido ou classificado pelo sistema (documentos 15 e 16).
 */
export function ReflexaoBibliotecaCard({
  conteudoId,
  reflexao,
  onSalvar,
  onApagar,
}: {
  conteudoId: string;
  reflexao?: ReflexaoDeConteudo;
  onSalvar: (respostas: Record<string, string>, id?: string) => void;
  onApagar?: (id: string) => void;
}) {
  const [aberto, setAberto] = useState(Boolean(reflexao));
  const [respostas, setRespostas] = useState<Record<string, string>>(reflexao?.respostas ?? {});
  const [guardado, setGuardado] = useState(false);

  if (!aberto) {
    return (
      <Card
        variante="reflexao"
        titulo="Registrar uma reflexão"
        descricao="Se fizer sentido agora. Você também pode registrar depois."
      >
        <Botao variante="secundario" onClick={() => setAberto(true)}>
          Escrever uma reflexão
        </Botao>
      </Card>
    );
  }

  return (
    <Card
      variante="reflexao"
      titulo="Sua reflexão sobre este conteúdo"
      descricao="Nenhuma pergunta é obrigatória. O que você escrever fica só neste dispositivo."
    >
      <div className="space-y-4">
        {perguntasDeReflexao.map((p) => (
          <AreaDeTexto
            key={p.chave}
            rotulo={p.texto}
            apoio="Escrever é opcional."
            value={respostas[p.chave] ?? ""}
            onChange={(e) => {
              setGuardado(false);
              setRespostas((r) => ({ ...r, [p.chave]: e.target.value }));
            }}
            placeholder="Escreva com suas palavras, se quiser"
          />
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Botao
          variante="principal"
          onClick={() => {
            onSalvar(respostas, reflexao?.id);
            setGuardado(true);
          }}
        >
          Guardar esta reflexão
        </Botao>
        <Botao variante="terciario" tamanho="compacto" onClick={() => setAberto(false)}>
          Registrar depois
        </Botao>
        {reflexao && onApagar ? (
          <Botao
            variante="destrutivo"
            tamanho="compacto"
            onClick={() => {
              onApagar(reflexao.id);
              setRespostas({});
              setAberto(false);
            }}
          >
            Apagar esta reflexão
          </Botao>
        ) : null}
      </div>

      {guardado ? (
        <div className="mt-3">
          <Confirmacao>Sua reflexão foi guardada neste dispositivo.</Confirmacao>
        </div>
      ) : null}

      {reflexao?.atualizadaEm ? (
        <p className="mt-3 viva-legenda text-text-secondary">
          Última edição em {dataLegivel(reflexao.atualizadaEm)}.
        </p>
      ) : null}

      <p className="sr-only">Conteúdo relacionado: {conteudoId}</p>
    </Card>
  );
}
