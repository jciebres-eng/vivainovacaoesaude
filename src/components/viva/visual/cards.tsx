/**
 * Cards visuais do VIVA.
 *
 * Cada card responde a uma pergunta e oferece no máximo duas ações. A área
 * visual domina; o texto é uma linha de apoio. Detalhes e mídia só aparecem
 * quando a pessoa pede (documentos 04, 12, 14, 17, 19).
 */
import { ChevronDown, Info, MapPin, Route, Sparkles } from "lucide-react";
import { useState } from "react";

import { IntegratedStageMedia } from "@/components/viva/visual/midia-integrada";
import {
  AcaoDoCartao,
  CartaoVisual,
  Cena,
  MapaMiniatura,
} from "@/components/viva/visual/visual-base";
import { useModo } from "@/lib/viva-modos";
import type { Peca } from "@/lib/viva-montagem";

/** Bloco de detalhes: fechado por padrão, sem texto longo à vista. */
function Detalhe({ porque }: { porque: string }) {
  const [aberto, setAberto] = useState(false);
  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        aria-expanded={aberto}
        className="viva-tap inline-flex min-h-11 items-center gap-2 viva-legenda font-medium text-[var(--profile-primary)]"
      >
        <Info className="h-4 w-4" aria-hidden />
        Por que apareceu
        <ChevronDown
          className={aberto ? "h-4 w-4 rotate-180 transition-transform" : "h-4 w-4 transition-transform"}
          aria-hidden
        />
      </button>
      {aberto ? (
        <p className="viva-legenda text-[var(--profile-muted)]">{porque}</p>
      ) : null}
    </div>
  );
}

/**
 * VisualJourneyCard — card genérico de escolha usado na montagem do percurso.
 * Escolhe automaticamente a cena e a mídia adequadas à peça.
 */
export function VisualJourneyCard({
  peca,
  etiqueta,
  onAceitar,
  onOutraOpcao,
  compacto,
}: {
  peca: Peca;
  etiqueta?: string;
  onAceitar?: () => void;
  onOutraOpcao?: () => void;
  compacto?: boolean;
}) {
  const { modo } = useModo();
  const mostrarNumeros = peca.numeros && modo.densidade !== "minima";

  const visual =
    peca.coordenada && peca.categoria === "local" ? (
      <MapaMiniatura
        latitude={peca.coordenada.latitude}
        longitude={peca.coordenada.longitude}
        descricao={`Mapa simplificado indicando ${peca.titulo}.`}
      />
    ) : (
      <Cena tipo={peca.cena} chave={peca.id} descricao={`Imagem representando ${peca.titulo}.`} />
    );

  return (
    <CartaoVisual
      visual={visual}
      etiqueta={etiqueta}
      titulo={peca.titulo}
      apoio={peca.apoio}
      compacto={compacto}
      detalhes={
        <>
          {mostrarNumeros ? (
            <p className="mt-1 viva-legenda font-semibold text-[var(--profile-primary)]">
              {peca.numeros}
            </p>
          ) : null}
          <Detalhe porque={peca.porque} />
          {modo.midiaPreferida !== "texto" || peca.categoria === "conteudo" ? (
            <IntegratedStageMedia midias={peca.midias} />
          ) : null}
        </>
      }
      acoes={
        onAceitar || onOutraOpcao ? (
          <>
            {onAceitar ? (
              <AcaoDoCartao tipo="principal" icone={Sparkles} onClick={onAceitar}>
                Quero assim
              </AcaoDoCartao>
            ) : null}
            {onOutraOpcao ? (
              <AcaoDoCartao onClick={onOutraOpcao}>Ver outra opção</AcaoDoCartao>
            ) : null}
          </>
        ) : null
      }
    />
  );
}

/** VisualPlaceCard — lugar confirmado, com prévia de mapa. */
export function VisualPlaceCard({
  nome,
  endereco,
  latitude,
  longitude,
  distancia,
  onEscolher,
  onVerNoMapa,
}: {
  nome: string;
  endereco: string;
  latitude?: number;
  longitude?: number;
  distancia?: string;
  onEscolher?: () => void;
  onVerNoMapa?: () => void;
}) {
  return (
    <CartaoVisual
      visual={
        latitude != null && longitude != null ? (
          <MapaMiniatura
            latitude={latitude}
            longitude={longitude}
            descricao={`Mapa simplificado indicando ${nome}, ${endereco}.`}
          />
        ) : (
          <Cena tipo="lugar" chave={nome} descricao={`Imagem representando ${nome}.`} />
        )
      }
      etiqueta={distancia}
      titulo={nome}
      apoio={endereco}
      acoes={
        <>
          {onEscolher ? (
            <AcaoDoCartao tipo="principal" icone={MapPin} onClick={onEscolher}>
              Escolher este local
            </AcaoDoCartao>
          ) : null}
          {onVerNoMapa ? <AcaoDoCartao onClick={onVerNoMapa}>Ajustar no mapa</AcaoDoCartao> : null}
        </>
      }
    />
  );
}

/** VisualStageCard — etapa do percurso, com a mídia dentro dela. */
export function VisualStageCard({
  numero,
  titulo,
  apoio,
  peca,
  atual = false,
  onConcluir,
  onPausar,
}: {
  numero: number;
  titulo: string;
  apoio?: string;
  peca?: Peca;
  atual?: boolean;
  onConcluir?: () => void;
  onPausar?: () => void;
}) {
  return (
    <CartaoVisual
      className={atual ? "ring-2 ring-[var(--profile-primary)]" : undefined}
      visual={<Cena tipo="etapa" chave={`${numero}-${titulo}`} descricao={`Imagem da etapa ${numero}: ${titulo}.`} />}
      etiqueta={`Etapa ${numero}`}
      titulo={titulo}
      apoio={apoio}
      detalhes={<IntegratedStageMedia midias={peca?.midias} />}
      acoes={
        <>
          {onConcluir ? (
            <AcaoDoCartao tipo="principal" onClick={onConcluir}>
              Concluí esta etapa
            </AcaoDoCartao>
          ) : null}
          {onPausar ? <AcaoDoCartao onClick={onPausar}>Pausar aqui</AcaoDoCartao> : null}
        </>
      }
    />
  );
}

/** VisualRouteCard — caminho, sempre com alternativa textual. */
export function VisualRouteCard({
  titulo,
  apoio,
  numeros,
  peca,
  onEscolher,
}: {
  titulo: string;
  apoio?: string;
  numeros?: string;
  peca?: Peca;
  onEscolher?: () => void;
}) {
  return (
    <CartaoVisual
      visual={<Cena tipo="rota" chave={titulo} descricao={`Traçado representando o caminho ${titulo}.`} />}
      etiqueta={numeros}
      titulo={titulo}
      apoio={apoio}
      detalhes={<IntegratedStageMedia midias={peca?.midias} />}
      acoes={
        onEscolher ? (
          <AcaoDoCartao tipo="principal" icone={Route} onClick={onEscolher}>
            Seguir por aqui
          </AcaoDoCartao>
        ) : null
      }
    />
  );
}

/** VisualProfileCard — modo de experiência apresentado visualmente. */
export function VisualProfileCard({
  id,
  nome,
  resumo,
  oQueMuda,
  ativo,
  onEscolher,
}: {
  id: string;
  nome: string;
  resumo: string;
  oQueMuda: string;
  ativo: boolean;
  onEscolher: () => void;
}) {
  return (
    <CartaoVisual
      className={ativo ? "ring-2 ring-[var(--profile-primary)]" : undefined}
      visual={<Cena tipo="perfil" chave={id} descricao={`Composição visual do modo ${nome}.`} />}
      etiqueta={ativo ? "Em uso agora" : undefined}
      titulo={nome}
      apoio={resumo}
      detalhes={<p className="mt-1 viva-legenda text-[var(--profile-muted)]">{oQueMuda}</p>}
      acoes={
        <AcaoDoCartao tipo={ativo ? "secundaria" : "principal"} onClick={onEscolher}>
          {ativo ? "Manter este modo" : "Experimentar este modo"}
        </AcaoDoCartao>
      }
    />
  );
}
