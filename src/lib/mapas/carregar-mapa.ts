/**
 * Carregamento do mapa do Google apenas no navegador.
 *
 * A chave usada aqui é a chave de navegador (restrita por domínio). Nada de
 * chave de servidor no cliente. O mapa é opcional: se não carregar, a tela
 * continua funcionando por descrição de lugar (documento 22).
 */
type Estado = "ausente" | "carregando" | "pronto" | "falhou";

let estado: Estado = "ausente";
let espera: Promise<boolean> | null = null;

declare global {
  interface Window {
    /** Objeto do Maps JS API, presente só depois do carregamento. */
    google?: Record<string, unknown>;
    vivaMapaPronto?: () => void;
  }
}

export function chaveDoNavegador() {
  return import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY as string | undefined;
}

export function carregarMapa(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (estado === "pronto") return Promise.resolve(true);
  if (espera) return espera;

  const chave = chaveDoNavegador();
  if (!chave) {
    estado = "falhou";
    return Promise.resolve(false);
  }

  estado = "carregando";
  espera = new Promise<boolean>((resolver) => {
    window.vivaMapaPronto = () => {
      estado = "pronto";
      resolver(true);
    };
    const script = document.createElement("script");
    const canal = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID as
      | string
      | undefined;
    const parametros = new URLSearchParams({
      key: chave,
      loading: "async",
      callback: "vivaMapaPronto",
      language: "pt-BR",
      region: "BR",
    });
    if (canal) parametros.set("channel", canal);
    script.src = `https://maps.googleapis.com/maps/api/js?${parametros.toString()}`;
    script.async = true;
    script.onerror = () => {
      estado = "falhou";
      resolver(false);
    };
    document.head.append(script);
  });
  return espera;
}

export function mapaDisponivel() {
  return estado === "pronto";
}
