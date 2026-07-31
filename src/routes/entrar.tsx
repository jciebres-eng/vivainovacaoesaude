import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { Botao, Card, CampoTexto, Nota } from "@/components/ds";
import { useSessao } from "@/lib/viva-sessao";

export const Route = createFileRoute("/entrar")({
  head: () => ({
    meta: [
      { title: "Entrar no VIVA — guardar o seu percurso" },
      {
        name: "description",
        content:
          "Entrar é opcional no VIVA. Quem entra guarda o próprio percurso na sua conta e pode sair quando quiser.",
      },
      { property: "og:title", content: "Entrar no VIVA — guardar o seu percurso" },
      {
        property: "og:description",
        content: "Conta opcional, dados seus, saída sempre disponível.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Entrar,
});

function Entrar() {
  const { entrarComEmail, criarConta, entrarComGoogle, recuperarSenha, identificado } = useSessao();
  const navigate = useNavigate();
  const [modo, setModo] = useState<"entrar" | "criar" | "recuperar">("entrar");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [aviso, setAviso] = useState<string | null>(null);
  const [ocupado, setOcupado] = useState(false);

  async function enviar(evento: React.FormEvent) {
    evento.preventDefault();
    setAviso(null);
    setOcupado(true);

    if (modo === "recuperar") {
      const { erro } = await recuperarSenha(email);
      setOcupado(false);
      setAviso(
        erro ?? "Enviamos uma mensagem para o seu e-mail. Você pode voltar aqui quando quiser.",
      );
      return;
    }

    if (modo === "criar") {
      const { erro, confirmar } = await criarConta(email, senha, nome);
      setOcupado(false);
      if (erro) return setAviso(erro);
      if (confirmar) {
        return setAviso(
          "Falta um passo: confirme o e-mail que enviamos. Depois disso, seu percurso passa a ficar guardado na sua conta.",
        );
      }
      void navigate({ to: "/inicio" });
      return;
    }

    const { erro } = await entrarComEmail(email, senha);
    setOcupado(false);
    if (erro) return setAviso(erro);
    void navigate({ to: "/inicio" });
  }

  return (
    <main className="mx-auto min-h-dvh w-full max-w-md bg-background px-5 py-12">
      <h1 className="viva-titulo text-text-primary">
        {modo === "criar"
          ? "Criar a sua conta"
          : modo === "recuperar"
            ? "Recuperar o acesso"
            : "Entrar no VIVA"}
      </h1>
      <p className="mt-3 viva-apoio text-text-secondary">
        Entrar é opcional. Serve para o seu percurso continuar disponível em outro aparelho. Nada do
        que você já fez neste aparelho é perdido.
      </p>

      {identificado ? (
        <Card variante="informativo" titulo="Você já está identificada aqui">
          <div className="mt-2">
            <Botao onClick={() => void navigate({ to: "/inicio" })}>Ir para o meu início</Botao>
          </div>
        </Card>
      ) : (
        <form onSubmit={enviar} className="mt-8 space-y-4">
          {modo === "criar" ? (
            <CampoTexto
              rotulo="Como você quer ser chamada ou chamado"
              apoio="Só isso. Nenhum dado além do necessário."
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              autoComplete="nickname"
            />
          ) : null}

          <CampoTexto
            rotulo="Seu e-mail"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />

          {modo !== "recuperar" ? (
            <CampoTexto
              rotulo="Sua senha"
              type="password"
              required
              minLength={6}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              autoComplete={modo === "criar" ? "new-password" : "current-password"}
            />
          ) : null}

          {aviso ? <Nota>{aviso}</Nota> : null}

          <Botao type="submit" carregando={ocupado}>
            {modo === "criar"
              ? "Criar a minha conta"
              : modo === "recuperar"
                ? "Enviar link de recuperação"
                : "Entrar"}
          </Botao>

          <Botao
            variante="secundario"
            onClick={() => {
              setAviso(null);
              void entrarComGoogle().then(({ erro }) => erro && setAviso(erro));
            }}
          >
            Entrar com o Google
          </Botao>

          <div className="flex flex-col gap-2 pt-2">
            {modo !== "entrar" ? (
              <Botao variante="terciario" tamanho="compacto" onClick={() => setModo("entrar")}>
                Já tenho conta
              </Botao>
            ) : null}
            {modo !== "criar" ? (
              <Botao variante="terciario" tamanho="compacto" onClick={() => setModo("criar")}>
                Ainda não tenho conta
              </Botao>
            ) : null}
            {modo !== "recuperar" ? (
              <Botao variante="terciario" tamanho="compacto" onClick={() => setModo("recuperar")}>
                Esqueci a senha
              </Botao>
            ) : null}
          </div>
        </form>
      )}

      <p className="mt-10 viva-legenda text-text-secondary">
        Você pode continuar sem conta. O VIVA funciona igual — só não acompanha você em outro
        aparelho.
      </p>
    </main>
  );
}
