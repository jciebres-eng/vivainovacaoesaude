/**
 * PainelDeAcompanhamento — compartilhar o percurso, com limites claros.
 *
 * Nasce desligado. A pessoa escolhe o que aparece, por quanto tempo, e pode
 * encerrar num toque. Enquanto está ligado, a tela diz exatamente o que a
 * outra pessoa vê (documentos 03, 15 e 16).
 */
import { Copy, Link2, ShieldOff } from "lucide-react";
import { useEffect, useState } from "react";

import { Botao, BotaoDeOpcao, Card, Nota } from "@/components/ds";
import {
  acompanhamentosGuardados,
  criarSessaoDeAcompanhamento,
  encerrarAcompanhamentos,
  enviarPontoDoPercurso,
  precisoes,
  type PrecisaoDeAcompanhamento,
  type SessaoDeAcompanhamento,
} from "@/lib/compartilhamento/sessoes";
import { useLocalizacao } from "@/lib/mapas/usar-localizacao";
import { useSessao } from "@/lib/viva-sessao";

const duracoes = [
  { minutos: 30, rotulo: "30 minutos" },
  { minutos: 60, rotulo: "1 hora" },
  { minutos: 120, rotulo: "2 horas" },
];

export function PainelDeAcompanhamento({
  jornadaId,
  etapaAtual,
}: {
  jornadaId: string;
  etapaAtual: string;
}) {
  const { identificado } = useSessao();
  const [sessao, setSessao] = useState<SessaoDeAcompanhamento | null>(null);
  const [precisao, setPrecisao] = useState<PrecisaoDeAcompanhamento>("step_only");
  const [minutos, setMinutos] = useState(60);
  const [erro, setErro] = useState<string | null>(null);
  const [copiado, setCopiado] = useState(false);
  const localizacao = useLocalizacao();

  useEffect(() => {
    const guardadas = acompanhamentosGuardados(jornadaId);
    if (guardadas.length) setSessao(guardadas[0]);
  }, [jornadaId]);

  // Enquanto o acompanhamento está ligado, enviamos apenas a etapa (e a
  // localização só se a pessoa tiver escolhido esse nível).
  useEffect(() => {
    if (!sessao) return;
    const enviar = () =>
      void enviarPontoDoPercurso({
        sessaoId: sessao.id,
        etapaTitulo: etapaAtual,
        posicao: sessao.precisao === "step_only" ? null : localizacao.ponto,
      }).catch(() => setErro("Não conseguimos atualizar quem acompanha agora. Vamos tentar de novo."));
    enviar();
    const intervalo = window.setInterval(enviar, 60_000);
    return () => window.clearInterval(intervalo);
  }, [sessao, etapaAtual, localizacao.ponto]);

  if (!identificado) {
    return (
      <Card variante="informativo" titulo="Quer que alguém acompanhe?">
        <p className="viva-apoio text-text-secondary">
          Para criar um link temporário, é preciso entrar com a sua conta. Sem conta, o percurso
          continua funcionando só neste aparelho.
        </p>
      </Card>
    );
  }

  if (sessao) {
    const nivel = precisoes.find((p) => p.id === sessao.precisao);
    return (
      <Card variante="informativo" titulo="Alguém está acompanhando">
        <ul className="space-y-1">
          {nivel?.mostra.map((item) => (
            <li key={item} className="viva-apoio text-text-secondary">
              • {item}
            </li>
          ))}
        </ul>
        <p className="mt-3 viva-legenda text-text-secondary">
          O link deixa de funcionar em{" "}
          {new Date(sessao.expiraEm).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
          .
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Botao
            variante="secundario"
            tamanho="compacto"
            icone={Copy}
            onClick={() => {
              void navigator.clipboard.writeText(sessao.url).then(() => setCopiado(true));
            }}
          >
            {copiado ? "Link copiado" : "Copiar o link"}
          </Botao>
          {sessao.precisao !== "step_only" && localizacao.situacao !== "ligada" ? (
            <Botao variante="terciario" tamanho="compacto" onClick={localizacao.comecar}>
              Começar a enviar minha localização
            </Botao>
          ) : null}
          {localizacao.situacao === "ligada" ? (
            <Botao variante="terciario" tamanho="compacto" onClick={localizacao.parar}>
              Pausar a localização
            </Botao>
          ) : null}
          <Botao
            variante="destrutivo"
            tamanho="compacto"
            icone={ShieldOff}
            onClick={() => {
              void encerrarAcompanhamentos(jornadaId).then(() => {
                localizacao.parar();
                setSessao(null);
              });
            }}
          >
            Encerrar o acompanhamento
          </Botao>
        </div>
        {localizacao.situacao === "negada" ? (
          <Nota>
            A localização segue desligada. Quem acompanha continua vendo apenas a etapa do
            percurso.
          </Nota>
        ) : null}
        {erro ? <Nota>{erro}</Nota> : null}
      </Card>
    );
  }

  return (
    <Card variante="informativo" titulo="Quer que alguém acompanhe?">
      <p className="viva-apoio text-text-secondary">
        Compartilhar é sempre opcional. Você decide o que aparece e por quanto tempo.
      </p>

      <fieldset className="mt-4 space-y-2">
        <legend className="viva-legenda text-text-secondary">O que a pessoa vê</legend>
        {precisoes.map((opcao) => (
          <BotaoDeOpcao
            key={opcao.id}
            nome="precisao"
            rotulo={opcao.titulo}
            apoio={opcao.mostra.join(" · ")}
            selecionado={precisao === opcao.id}
            onSelect={() => setPrecisao(opcao.id)}
          />
        ))}
      </fieldset>

      <fieldset className="mt-4 space-y-2">
        <legend className="viva-legenda text-text-secondary">Por quanto tempo</legend>
        {duracoes.map((opcao) => (
          <BotaoDeOpcao
            key={opcao.minutos}
            nome="duracao"
            rotulo={opcao.rotulo}
            selecionado={minutos === opcao.minutos}
            onSelect={() => setMinutos(opcao.minutos)}
          />
        ))}
      </fieldset>

      <div className="mt-4">
        <Botao
          icone={Link2}
          onClick={() => {
            setErro(null);
            void criarSessaoDeAcompanhamento({ jornadaId, minutos, precisao })
              .then((nova) => {
                setSessao(nova);
                if (nova.precisao !== "step_only") localizacao.comecar();
              })
              .catch(() =>
                setErro("Não conseguimos criar o link agora. Nada do seu percurso foi alterado."),
              );
          }}
        >
          Criar link temporário
        </Botao>
      </div>
      {erro ? <Nota>{erro}</Nota> : null}
    </Card>
  );
}
