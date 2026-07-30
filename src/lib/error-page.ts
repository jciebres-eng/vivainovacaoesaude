export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <title>Não foi possível abrir esta página</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 16px/1.6 "Atkinson Hyperlegible", system-ui, -apple-system, sans-serif; background: #f7f5f0; color: #22302c; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 32rem; width: 100%; padding: 2rem; }
      h1 { font-size: 1.4rem; margin: 0 0 0.75rem; font-weight: 700; }
      p { color: #4b5b56; margin: 0 0 1.75rem; }
      .actions { display: flex; gap: 0.75rem; flex-wrap: wrap; }
      a, button { min-height: 2.75rem; display: inline-flex; align-items: center; padding: 0.65rem 1.5rem; border-radius: 999px; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #2f5d55; color: #f7f5f0; font-weight: 600; }
      .secondary { background: #fffdf9; color: #22302c; border-color: #d9d3c7; }
      :focus-visible { outline: 3px solid #2f5d55; outline-offset: 3px; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>Não foi possível abrir esta página</h1>
      <p>Isso não tem relação com nada que você fez. O que você já registrou continua guardado neste dispositivo. Você pode tentar novamente agora ou voltar mais tarde.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Tentar novamente</button>
        <a class="secondary" href="/">Voltar para o início</a>
      </div>
    </div>
  </body>
</html>`;
}
