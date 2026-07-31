/**
 * Identidade mínima: o id do perfil da pessoa identificada.
 *
 * Guardamos apenas o vínculo entre a conta e o perfil. Nada de dados
 * pessoais em cache (documento 03).
 */
import { supabase } from "@/integrations/supabase/client";

let cache: { userId: string; perfilId: string } | null = null;

export async function perfilAtualId(): Promise<string | null> {
  const { data } = await supabase.auth.getSession();
  const userId = data.session?.user.id;
  if (!userId) {
    cache = null;
    return null;
  }
  if (cache?.userId === userId) return cache.perfilId;

  const { data: perfil } = await supabase
    .from("profiles")
    .select("id")
    .eq("user_id", userId)
    .maybeSingle();
  if (!perfil?.id) return null;
  cache = { userId, perfilId: perfil.id };
  return perfil.id;
}

export function esquecerPerfilAtual() {
  cache = null;
}
