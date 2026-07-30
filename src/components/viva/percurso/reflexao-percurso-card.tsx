import { useState } from "react";

import { AreaDeTexto, Botao, Card, Confirmacao, Nota } from "@/components/ds";
import { AcoesAutonomas } from "@/components/viva/humanos";
import { perguntasDeReflexao } from "@/lib/viva-jornada-dados";

/**
 * ReflexaoPercursoCard — observar a própria experiência (documentos 00 e 15).
 *
 * O resumo usa exclusivamente o que a pessoa registrou, sem interpretar,
 * classificar, pontuar ou inferir estado clínico. No máximo duas perguntas
 * opcionais aparecem por vez, e pular é uma saída legítima.
 */
export function ReflexaoPercursoCard({
  resumo,
  respostas: respostasExternas,
  onGuardar,
  onEditarRegistro,
  onPular,
  onRemoverResumo,
  className,
}: {
  /** Frases descritivas montadas a partir dos registros da própria pessoa. */
  resumo: string[];
  respostas?: Record<string, string>;
  onGuardar?: (respostas: Record<string, string>) => void;
  onEditarRegistro?: () => void;
  onPular?: () => void;
  onRemoverResumo?: () => void;
  className?: string;
}) {
  const [respostas, setRespostas] = useState<Record<string, string>>(respostasExternas ?? {});
  const [outras, setOutras] = useState(false);
  const [guardado, setGuardado] = useState(false);

  const visiveis = outras ? perguntasDeReflexao.slice(2) : perguntasDeReflexao.slice(0, 2);

  if (guardado) {
    return (
      <Card variante="reflexao" titulo="Reflexão guardada" className={className}>
        <Confirmacao>Sua reflexão ficou guardada apenas neste dispositivo.</Confirmacao>
      </Card>
    );
  }

  return (
    <Card
      variante="reflexao"
      titulo="Sobre esta experiência"
      descricao="Este resumo usa apenas o que você registrou. Nada aqui é analisado ou interpretado pela plataforma."
      className={className}
    >
      {resumo.length > 0 ? (
        <ul className="space-y-2 viva-apoio text-text-primary">
          {resumo.map((frase) => (
            <li key={frase}>{frase}</li>
          ))}
        </ul>
      ) : (
        <p className="viva-apoio text-text-secondary">
          Você ainda não registrou nada nesta atividade. Também está tudo bem seguir sem resumo.
        </p>
      )}

      <div className="mt-6 space-y-5">
        {visiveis.map((pergunta) => (
          <AreaDeTexto
            key={pergunta.id}
            rotulo={pergunta.rotulo}
            apoio="Responder é opcional."
            rows={3}
            value={respostas[pergunta.id] ?? ""}
            onChange={(e) => setRespostas((r) => ({ ...r, [pergunta.id]: e.target.value }))}
          />
        ))}
      </div>

      <Nota>
        Você escolhe o que fica registrado. Pular esta etapa não muda nada no seu percurso.
      </Nota>

      <AcoesAutonomas
        principal={
          <Botao
            variante="principal"
            onClick={() => {
              setGuardado(true);
              onGuardar?.(respostas);
            }}
          >
            Guardar esta reflexão
          </Botao>
        }
        secundarias={
          <>
            <Botao variante="terciario" tamanho="compacto" onClick={() => setOutras((v) => !v)}>
              {outras ? "Ver as primeiras perguntas" : "Ver outras perguntas"}
            </Botao>
            {onEditarRegistro ? (
              <Botao variante="terciario" tamanho="compacto" onClick={onEditarRegistro}>
                Editar registro
              </Botao>
            ) : null}
            {onPular ? (
              <Botao variante="terciario" tamanho="compacto" onClick={onPular}>
                Pular reflexão
              </Botao>
            ) : null}
            {onRemoverResumo ? (
              <Botao variante="terciario" tamanho="compacto" onClick={onRemoverResumo}>
                Remover este resumo
              </Botao>
            ) : null}
          </>
        }
      />
    </Card>
  );
}
