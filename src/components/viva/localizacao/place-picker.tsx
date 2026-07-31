/**
 * UniversalPlacePicker — um campo, várias formas de dizer onde é.
 *
 * A pessoa pode: escrever com as próprias palavras, buscar no mapa, informar
 * um CEP ou usar onde está agora. Nenhuma via é obrigatória e nenhuma é
 * apresentada como "a certa" (documentos 04, 22 e 25).
 */
import { Loader2, MapPin, Navigation, Search } from "lucide-react";
import { useCallback, useRef, useState } from "react";

import { Botao, Nota } from "@/components/ds";
import { CampoBusca } from "@/components/ds";
import {
  buscarLugaresFn,
  geocodificarFn,
  geocodificarInversoFn,
} from "@/lib/mapas/mapas.functions";
import type { LugarEscolhido } from "@/lib/mapas/tipos";
import { pontoUnico } from "@/lib/mapas/usar-localizacao";
import { buscarCep, enderecoEmTexto, pareceCep } from "@/lib/mapas/viacep";

export type LugarDoPercurso =
  | { forma: "palavras"; descricao: string }
  | ({ forma: "mapa" } & LugarEscolhido);

export function UniversalPlacePicker({
  rotulo = "Onde isso acontece?",
  apoio = "Escreva do seu jeito. Se quiser, o mapa ajuda — mas não é obrigatório.",
  valor,
  onEscolher,
}: {
  rotulo?: string;
  apoio?: string;
  valor?: LugarDoPercurso | null;
  onEscolher: (lugar: LugarDoPercurso) => void;
}) {
  const [texto, setTexto] = useState(
    valor ? (valor.forma === "palavras" ? valor.descricao : valor.nome) : "",
  );
  const [sugestoes, setSugestoes] = useState<LugarEscolhido[]>([]);
  const [buscando, setBuscando] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);
  const tempo = useRef<number | null>(null);

  const buscar = useCallback(async (termo: string) => {
    if (termo.trim().length < 3) {
      setSugestoes([]);
      return;
    }
    setBuscando(true);
    setAviso(null);

    if (pareceCep(termo)) {
      const endereco = await buscarCep(termo);
      if (endereco) {
        const texto = enderecoEmTexto(endereco);
        const { resultados, erro } = await geocodificarFn({ data: { endereco: texto } });
        setBuscando(false);
        if (erro) setAviso(erro);
        setSugestoes(
          resultados.map((r) => ({
            placeId: r.placeId ?? texto,
            nome: endereco.rua || endereco.cidade,
            endereco: r.endereco,
            latitude: r.latitude,
            longitude: r.longitude,
            tipos: ["endereco"],
          })),
        );
        return;
      }
    }

    const { lugares, erro } = await buscarLugaresFn({ data: { texto: termo } });
    setBuscando(false);
    if (erro) setAviso(erro);
    setSugestoes(lugares);
  }, []);

  function aoDigitar(proximo: string) {
    setTexto(proximo);
    if (tempo.current) window.clearTimeout(tempo.current);
    tempo.current = window.setTimeout(() => void buscar(proximo), 450);
  }

  async function usarOndeEstou() {
    setBuscando(true);
    setAviso(null);
    const ponto = await pontoUnico();
    if (!ponto) {
      setBuscando(false);
      setAviso(
        "Não conseguimos ler sua localização agora. Você pode escrever o lugar com suas palavras.",
      );
      return;
    }
    const { resultado, erro } = await geocodificarInversoFn({
      data: { lat: ponto.latitude, lng: ponto.longitude },
    });
    setBuscando(false);
    if (erro || !resultado) {
      setAviso(erro ?? "Sua localização foi lida, mas sem endereço. Você pode descrever o lugar.");
      return;
    }
    setTexto(resultado.endereco);
    onEscolher({
      forma: "mapa",
      placeId: resultado.placeId ?? "atual",
      nome: "Onde estou agora",
      endereco: resultado.endereco,
      latitude: resultado.latitude,
      longitude: resultado.longitude,
      tipos: ["atual"],
    });
  }

  return (
    <div className="space-y-3">
      <CampoBusca
        rotulo={rotulo}
        apoio={apoio}
        value={texto}
        onChange={(evento) => aoDigitar(evento.target.value)}
        placeholder="Ex.: a unidade de saúde perto de casa, 01310-000, aeroporto…"
      />

      <div className="flex flex-wrap items-center gap-2">
        <Botao
          variante="secundario"
          tamanho="compacto"
          icone={Search}
          onClick={() => void buscar(texto)}
        >
          Procurar no mapa
        </Botao>
        <Botao
          variante="terciario"
          tamanho="compacto"
          icone={Navigation}
          onClick={() => void usarOndeEstou()}
        >
          Usar onde estou agora
        </Botao>
        {texto.trim().length > 1 ? (
          <Botao
            variante="terciario"
            tamanho="compacto"
            onClick={() => onEscolher({ forma: "palavras", descricao: texto.trim() })}
          >
            Guardar com as minhas palavras
          </Botao>
        ) : null}
      </div>

      {buscando ? (
        <p className="flex items-center gap-2 viva-legenda text-text-secondary">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          Procurando com calma…
        </p>
      ) : null}

      {aviso ? <Nota>{aviso}</Nota> : null}

      {sugestoes.length > 0 ? (
        <ul className="space-y-2" aria-label="Lugares encontrados">
          {sugestoes.map((lugar) => (
            <li key={`${lugar.placeId}-${lugar.endereco}`}>
              <button
                type="button"
                onClick={() => {
                  setTexto(lugar.nome);
                  setSugestoes([]);
                  onEscolher({ forma: "mapa", ...lugar });
                }}
                className="viva-tap flex min-h-11 w-full items-start gap-3 rounded-2xl border border-border-default bg-surface-default p-4 text-left hover:bg-background-secondary"
              >
                <MapPin className="mt-0.5 h-4 w-4 text-text-secondary" aria-hidden />
                <span>
                  <span className="block viva-texto text-text-primary">{lugar.nome}</span>
                  <span className="block viva-legenda text-text-secondary">{lugar.endereco}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {valor ? (
        <p className="viva-legenda text-text-secondary">
          Guardado:{" "}
          {valor.forma === "palavras" ? valor.descricao : `${valor.nome} — ${valor.endereco}`}
        </p>
      ) : null}
    </div>
  );
}
