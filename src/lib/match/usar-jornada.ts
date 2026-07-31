/**
 * useJornada — leitura e escrita de uma jornada pelo repositório.
 * Nenhuma tela guarda array próprio: tudo passa por aqui.
 */
import { useCallback, useEffect, useState } from "react";

import { repositorios } from "./repositorios";
import type { EstadoDaJornada, Journey } from "./tipos";

export function useJornada(id: string | undefined) {
  const [jornada, setJornada] = useState<Journey | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let vivo = true;
    if (!id) {
      setCarregando(false);
      return;
    }
    void repositorios.jornadas.porId(id).then((j) => {
      if (!vivo) return;
      setJornada(j);
      setCarregando(false);
    });
    return () => {
      vivo = false;
    };
  }, [id]);

  const salvar = useCallback(async (proxima: Journey) => {
    const salva = await repositorios.jornadas.salvar(proxima);
    setJornada(salva);
    return salva;
  }, []);

  const definirEstado = useCallback(
    async (estado: EstadoDaJornada) => {
      if (!jornada) return null;
      return salvar({ ...jornada, estado });
    },
    [jornada, salvar],
  );

  return { jornada, carregando, salvar, definirEstado };
}

export function useJornadas() {
  const [jornadas, setJornadas] = useState<Journey[]>([]);
  const [carregando, setCarregando] = useState(true);

  const recarregar = useCallback(async () => {
    const lista = await repositorios.jornadas.listar();
    setJornadas(lista);
    setCarregando(false);
    return lista;
  }, []);

  useEffect(() => {
    void recarregar();
  }, [recarregar]);

  const remover = useCallback(
    async (id: string) => {
      await repositorios.jornadas.remover(id);
      await recarregar();
    },
    [recarregar],
  );

  return { jornadas, carregando, recarregar, remover };
}
