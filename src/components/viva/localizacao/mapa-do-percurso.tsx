/**
 * MapaDoPercurso — mapa opcional, silencioso e substituível.
 *
 * O mapa nunca é a única forma de entender o caminho: acima dele há sempre a
 * mesma informação em palavras (documentos 04 e 22). Se a API não carregar,
 * a lista de referências continua.
 */
import { useEffect, useRef, useState } from "react";

import { Nota } from "@/components/ds";
import { carregarMapa } from "@/lib/mapas/carregar-mapa";

export type PontoDoMapa = {
  latitude: number;
  longitude: number;
  titulo: string;
};

export function MapaDoPercurso({
  pontos,
  altura = 260,
  descricao,
}: {
  pontos: PontoDoMapa[];
  altura?: number;
  descricao?: string;
}) {
  const alvo = useRef<HTMLDivElement | null>(null);
  const [disponivel, setDisponivel] = useState<boolean | null>(null);

  useEffect(() => {
    let vivo = true;
    void carregarMapa().then((pronto) => {
      if (!vivo) return;
      setDisponivel(pronto);
      if (!pronto || !alvo.current || !pontos.length) return;

      const g = (window as unknown as { google: any }).google;
      const centro = { lat: pontos[0].latitude, lng: pontos[0].longitude };
      const mapa = new g.maps.Map(alvo.current, {
        center: centro,
        zoom: pontos.length > 1 ? 13 : 15,
        disableDefaultUI: true,
        zoomControl: true,
        keyboardShortcuts: true,
      });
      const limites = new g.maps.LatLngBounds();
      for (const ponto of pontos) {
        const posicao = { lat: ponto.latitude, lng: ponto.longitude };
        new g.maps.Marker({ position: posicao, map: mapa, title: ponto.titulo });
        limites.extend(posicao);
      }
      if (pontos.length > 1) mapa.fitBounds(limites);
    });
    return () => {
      vivo = false;
    };
  }, [pontos]);

  return (
    <div className="space-y-3">
      <ul className="space-y-1">
        {pontos.map((ponto) => (
          <li key={ponto.titulo} className="viva-legenda text-text-secondary">
            • {ponto.titulo}
          </li>
        ))}
      </ul>

      {disponivel === false ? (
        <Nota>
          O mapa não está disponível agora. As referências acima continuam valendo e nada do seu
          percurso mudou.
        </Nota>
      ) : (
        <div
          ref={alvo}
          role="img"
          aria-label={descricao ?? "Mapa com os pontos do percurso"}
          style={{ height: altura }}
          className="overflow-hidden rounded-3xl border border-border-default bg-surface-muted"
        />
      )}
    </div>
  );
}
