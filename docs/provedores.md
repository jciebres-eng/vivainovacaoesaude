# Provedores externos e Modo Demonstrativo

O VIVA nunca conversa com um serviço concreto. Ele conversa com interfaces
definidas em `src/lib/providers/tipos.ts`, e o `ProviderRegistry`
(`src/lib/providers/registry.ts`) decide qual implementação atende cada uma.

## Provedores

| Interface            | Implementação padrão                | Precisa de chave? |
| -------------------- | ----------------------------------- | ----------------- |
| `PlaceProvider`      | Lugares demonstrativos VIVA         | não               |
| `RouteProvider`      | Rotas demonstrativas VIVA           | não               |
| `MapProvider`        | Mapa por pontos de referência       | não               |
| `AddressProvider`    | Endereços demonstrativos VIVA       | não               |
| `GeolocationProvider`| Localização do dispositivo          | não (permissão)   |
| `SpeechProvider`     | Reconhecimento de fala do navegador | não               |
| `MemoryProvider`     | Memória local deste dispositivo     | não               |
| `ContentProvider`    | Biblioteca demonstrativa VIVA       | não               |

## Modo Demonstrativo

Sem `VITE_MAPS_API_KEY`, `estaEmModoDemonstrativo()` devolve `true`. Nesse
modo:

- todos os dados vêm dos provedores locais;
- toda resposta traz `origem: "demonstrativo"` e o nome do provedor;
- o componente `SeloDemonstrativo` explica isso à pessoa, em linguagem simples;
- nenhuma tela deixa de funcionar.

Com a chave presente, apenas o `MapProvider` muda: passa a oferecer um link
externo, aberto somente por ação explícita da pessoa, com aviso de saída do
VIVA. Nenhum mapa carrega sozinho.

## Como usar

```ts
import { obterProvedor } from "@/lib/providers/registry";

const { dados, provedor, aviso } = await obterProvedor("lugares").buscarPorTexto("mercado");
```

Toda resposta é um `RespostaDoProvedor<T>`: além dos dados, ela sempre diz de
onde eles vieram. A interface deve mostrar essa origem quando a pessoa
perguntar.

## Trocar um provedor

```ts
import { registrarProvedor } from "@/lib/providers/registry";

registrarProvedor("lugares", meuProvedorReal);
```

Nenhum componente precisa mudar. É assim que uma integração real entra sem
reescrever a experiência.

## Privacidade

- A memória vive apenas em `localStorage`, neste aparelho, e pode ser apagada.
- Localização e microfone só são acionados após ação explícita da pessoa e a
  recusa nunca interrompe o percurso.
- Nada é enviado a serviços externos sem aviso na tela.
