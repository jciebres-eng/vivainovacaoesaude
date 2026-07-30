import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/**
 * Estado local da demonstração VIVA.
 * Somente armazenamento local (localStorage) — sem backend nesta etapa.
 * Preferências sensoriais seguem o documento 12, tela 16.
 */

export type Aparencia = "clara" | "escura" | "baixo-estimulo";
export type TamanhoTexto = "pequeno" | "padrao" | "grande";
export type Densidade = "resumida" | "padrao" | "detalhada";

export type VivaSettings = {
  aparencia: Aparencia;
  tamanhoTexto: TamanhoTexto;
  densidade: Densidade;
  sons: boolean;
  animacoes: boolean;
  menosOpcoes: boolean;
  lembretes: "nunca" | "quando-eu-escolher" | "diario";
};

export const defaultSettings: VivaSettings = {
  aparencia: "clara",
  tamanhoTexto: "padrao",
  densidade: "padrao",
  sons: false,
  animacoes: true,
  menosOpcoes: false,
  lembretes: "quando-eu-escolher",
};

export type VivaEscolhas = {
  perfil?: string;
  objetivo?: string;
  [chave: string]: unknown;
};

type VivaContextValue = {
  settings: VivaSettings;
  setSettings: (patch: Partial<VivaSettings>) => void;
  resetSettings: () => void;
  escolhas: VivaEscolhas;
  setEscolha: (chave: string, valor: unknown) => void;
  hydrated: boolean;
};

const STORAGE_SETTINGS = "viva:configuracoes";
const STORAGE_ESCOLHAS = "viva:escolhas";

const VivaContext = createContext<VivaContextValue | null>(null);

export function VivaProvider({ children }: { children: ReactNode }) {
  const [settings, setSettingsState] = useState<VivaSettings>(defaultSettings);
  const [escolhas, setEscolhasState] = useState<VivaEscolhas>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const s = window.localStorage.getItem(STORAGE_SETTINGS);
      if (s) setSettingsState({ ...defaultSettings, ...JSON.parse(s) });
      const e = window.localStorage.getItem(STORAGE_ESCOLHAS);
      if (e) setEscolhasState(JSON.parse(e));
    } catch {
      /* armazenamento indisponível — segue com os padrões */
    }
    setHydrated(true);
  }, []);

  const setSettings = useCallback((patch: Partial<VivaSettings>) => {
    setSettingsState((prev) => {
      const next = { ...prev, ...patch };
      try {
        window.localStorage.setItem(STORAGE_SETTINGS, JSON.stringify(next));
      } catch {
        /* ignora */
      }
      return next;
    });
  }, []);

  const resetSettings = useCallback(() => {
    setSettingsState(defaultSettings);
    try {
      window.localStorage.removeItem(STORAGE_SETTINGS);
    } catch {
      /* ignora */
    }
  }, []);

  const setEscolha = useCallback((chave: string, valor: unknown) => {
    setEscolhasState((prev) => {
      const next = { ...prev, [chave]: valor };
      try {
        window.localStorage.setItem(STORAGE_ESCOLHAS, JSON.stringify(next));
      } catch {
        /* ignora */
      }
      return next;
    });
  }, []);

  // Aplica as preferências ao documento imediatamente (sem reinício).
  useEffect(() => {
    if (!hydrated) return;
    const root = document.documentElement;
    root.classList.toggle("dark", settings.aparencia === "escura");
    root.classList.toggle("viva-calmo", settings.aparencia === "baixo-estimulo");
    root.dataset.texto = settings.tamanhoTexto;
    root.classList.toggle("viva-sem-animacao", !settings.animacoes);
  }, [settings, hydrated]);

  const value = useMemo(
    () => ({ settings, setSettings, resetSettings, escolhas, setEscolha, hydrated }),
    [settings, setSettings, resetSettings, escolhas, setEscolha, hydrated],
  );

  return <VivaContext.Provider value={value}>{children}</VivaContext.Provider>;
}

export function useViva() {
  const ctx = useContext(VivaContext);
  if (!ctx) throw new Error("useViva precisa estar dentro de VivaProvider");
  return ctx;
}
