import { Botao, Card } from "@/components/ds";
import type {
  Atividade,
  Duvida,
  Estrategia,
  Experiencia,
  Preparacao,
} from "@/lib/viva-percurso";

/**
 * Continuidade do Percurso (documentos 08 e 13).
 *
 * Mostra o que já foi iniciado. Nada é obrigatório, nada se perde e não
 * existe sequência a cumprir.
 */
export function ContinuidadeDoPercurso({
  ultimaAtividade,
  preparacaoSalva,
  experienciaAguardandoReflexao,
  duvidaRegistrada,
  estrategiaAdicionada,
  proximoPasso,
  onContinuar,
  onEscolherOutra,
}: {
  ultimaAtividade?: Atividade;
  preparacaoSalva?: Preparacao;
  experienciaAguardandoReflexao?: Experiencia;
  duvidaRegistrada?: Duvida;
  estrategiaAdicionada?: Estrategia;
  proximoPasso?: Atividade;
  onContinuar?: () => void;
  onEscolherOutra?: () => void;
}) {
  const itens = [
    ultimaAtividade && {
      rotulo: "Você parou aqui",
      texto: ultimaAtividade.titulo,
    },
    preparacaoSalva && {
      rotulo: "Sua preparação está salva",
      texto: preparacaoSalva.atividadeTitulo,
    },
    experienciaAguardandoReflexao && {
      rotulo: "Há uma reflexão disponível",
      texto: experienciaAguardandoReflexao.atividade,
    },
    duvidaRegistrada && {
      rotulo: "Dúvida guardada",
      texto: duvidaRegistrada.texto,
    },
    estrategiaAdicionada && {
      rotulo: "Estratégia adicionada",
      texto: estrategiaAdicionada.nome,
    },
    proximoPasso && {
      rotulo: "Próximo passo opcional",
      texto: proximoPasso.titulo,
    },
  ].filter(Boolean) as { rotulo: string; texto: string }[];

  return (
    <Card
      variante="estado-atual"
      titulo="Onde você parou"
      descricao="Nada precisa ser concluído agora."
    >
      <dl className="space-y-3">
        {itens.map((i) => (
          <div key={i.rotulo} className="grid gap-0.5">
            <dt className="viva-legenda text-text-secondary">{i.rotulo}</dt>
            <dd className="viva-apoio text-text-primary">{i.texto}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Botao variante="principal" onClick={onContinuar}>
          Continuar de onde parei
        </Botao>
        <Botao variante="terciario" onClick={onEscolherOutra}>
          Escolher outra atividade
        </Botao>
      </div>
    </Card>
  );
}
