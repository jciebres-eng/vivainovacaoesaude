/**
 * Sessão da pessoa.
 *
 * Entrar é opcional: o VIVA funciona no aparelho sem conta nenhuma. Quem
 * entra passa a guardar o próprio percurso na sua conta, e pode sair a
 * qualquer momento sem perder o que já está no aparelho (documentos 03 e 16).
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";

import { lovable } from "@/integrations/lovable/index";
import { supabase } from "@/integrations/supabase/client";
import {
  SupabaseJourneyRepository,
  SupabaseProfileRepository,
  SupabaseSharingRepository,
  SupabaseSituationRepository,
} from "@/lib/match/repositorios-supabase";
import { repositoriosLocais, usarAparelho, usarNuvem } from "@/lib/match/repositorios";
import { JornadasSincronizadas } from "@/lib/match/sincronizacao";
import { esquecerPerfilAtual, perfilAtualId } from "@/lib/perfil-atual";

type EstadoDaSessao = {
  sessao: Session | null;
  identificado: boolean;
  carregando: boolean;
  perfilId: string | null;
  entrarComEmail: (email: string, senha: string) => Promise<{ erro: string | null }>;
  criarConta: (email: string, senha: string, nome: string) => Promise<{ erro: string | null; confirmar: boolean }>;
  entrarComGoogle: () => Promise<{ erro: string | null }>;
  recuperarSenha: (email: string) => Promise<{ erro: string | null }>;
  sair: () => Promise<void>;
};

const Contexto = createContext<EstadoDaSessao | null>(null);

let sincronizador: JornadasSincronizadas | null = null;

function ligarNuvem() {
  const jornadasNuvem = new SupabaseJourneyRepository(perfilAtualId);
  sincronizador = new JornadasSincronizadas(jornadasNuvem, repositoriosLocais.jornadas);
  usarNuvem({
    situacoes: new SupabaseSituationRepository(),
    jornadas: sincronizador,
    perfil: new SupabaseProfileRepository(perfilAtualId),
    compartilhamento: new SupabaseSharingRepository(perfilAtualId),
  });
  void sincronizador.sincronizar();
}

function desligarNuvem() {
  sincronizador = null;
  esquecerPerfilAtual();
  usarAparelho();
}

export function SessaoProvider({ children }: { children: React.ReactNode }) {
  const [sessao, setSessao] = useState<Session | null>(null);
  const [perfilId, setPerfilId] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((evento, proxima) => {
      setSessao(proxima);
      if (proxima) {
        ligarNuvem();
        void perfilAtualId().then(setPerfilId);
      } else if (evento === "SIGNED_OUT") {
        desligarNuvem();
        setPerfilId(null);
      }
    });

    void supabase.auth.getSession().then(({ data: atual }) => {
      setSessao(atual.session);
      if (atual.session) {
        ligarNuvem();
        void perfilAtualId().then(setPerfilId);
      }
      setCarregando(false);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  // Quando a rede volta, o que ficou pendente sobe sozinho.
  useEffect(() => {
    const aoVoltar = () => void sincronizador?.sincronizar();
    window.addEventListener("online", aoVoltar);
    return () => window.removeEventListener("online", aoVoltar);
  }, []);

  const entrarComEmail = useCallback(async (email: string, senha: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
    return { erro: error ? traduzir(error.message) : null };
  }, []);

  const criarConta = useCallback(async (email: string, senha: string, nome: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: {
        emailRedirectTo: window.location.origin,
        data: { display_name: nome || "Alex" },
      },
    });
    if (error) return { erro: traduzir(error.message), confirmar: false };
    return { erro: null, confirmar: data.session === null };
  }, []);

  const entrarComGoogle = useCallback(async () => {
    const resultado = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (resultado.error) {
      return { erro: "Não conseguimos entrar com o Google agora. Você pode usar o e-mail." };
    }
    return { erro: null };
  }, []);

  const recuperarSenha = useCallback(async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/nova-senha`,
    });
    return { erro: error ? traduzir(error.message) : null };
  }, []);

  const sair = useCallback(async () => {
    await supabase.auth.signOut();
    desligarNuvem();
    setPerfilId(null);
  }, []);

  const valor = useMemo<EstadoDaSessao>(
    () => ({
      sessao,
      identificado: Boolean(sessao),
      carregando,
      perfilId,
      entrarComEmail,
      criarConta,
      entrarComGoogle,
      recuperarSenha,
      sair,
    }),
    [sessao, carregando, perfilId, entrarComEmail, criarConta, entrarComGoogle, recuperarSenha, sair],
  );

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export function useSessao() {
  const contexto = useContext(Contexto);
  if (!contexto) {
    throw new Error("useSessao precisa estar dentro de SessaoProvider");
  }
  return contexto;
}

function traduzir(mensagem: string) {
  const texto = mensagem.toLowerCase();
  if (texto.includes("invalid login credentials")) {
    return "E-mail ou senha não conferem. Você pode tentar de novo com calma.";
  }
  if (texto.includes("already registered")) {
    return "Já existe uma conta com este e-mail. Você pode entrar por ele.";
  }
  if (texto.includes("password")) {
    return "Escolha uma senha um pouco mais longa, com pelo menos seis caracteres.";
  }
  if (texto.includes("email not confirmed")) {
    return "Falta confirmar o e-mail. Procure a mensagem que enviamos.";
  }
  return "Algo não funcionou agora. Nada do que você fez foi perdido.";
}
