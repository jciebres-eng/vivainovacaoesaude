import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { Botao, CampoTexto, Nota } from "@/components/ds";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/nova-senha")({
  head: () => ({
    meta: [
      { title: "Escolher uma nova senha — VIVA" },
      {
        name: "description",
        content: "Defina uma nova senha para a sua conta do VIVA, no seu tempo.",
      },
      { property: "og:title", content: "Escolher uma nova senha — VIVA" },
      { property: "og:description", content: "Troca de senha simples e sem pressa." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: NovaSenha,
});

function NovaSenha() {
  const navigate = useNavigate();
  const [senha, setSenha] = useState("");
  const [aviso, setAviso] = useState<string | null>(null);
  const [ocupado, setOcupado] = useState(false);

  return (
    <main className="mx-auto min-h-dvh w-full max-w-md bg-background px-5 py-12">
      <h1 className="viva-titulo text-text-primary">Escolher uma nova senha</h1>
      <p className="mt-3 viva-apoio text-text-secondary">
        Use pelo menos seis caracteres. Nada além disso é exigido.
      </p>

      <form
        className="mt-8 space-y-4"
        onSubmit={async (evento) => {
          evento.preventDefault();
          setOcupado(true);
          setAviso(null);
          const { error } = await supabase.auth.updateUser({ password: senha });
          setOcupado(false);
          if (error) {
            setAviso("Não conseguimos trocar a senha agora. Você pode tentar novamente.");
            return;
          }
          void navigate({ to: "/inicio" });
        }}
      >
        <CampoTexto
          rotulo="Nova senha"
          type="password"
          required
          minLength={6}
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          autoComplete="new-password"
        />
        {aviso ? <Nota>{aviso}</Nota> : null}
        <Botao type="submit" carregando={ocupado}>
          Guardar a nova senha
        </Botao>
      </form>
    </main>
  );
}
