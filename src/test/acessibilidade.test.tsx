import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";

import { Botao } from "@/components/ds/botao";
import { Card } from "@/components/ds/card";
import { CampoTexto } from "@/components/ds/campos";

/**
 * Infraestrutura inicial de acessibilidade (WCAG 2.2).
 * Não busca cobertura total: garante que os componentes centrais do
 * Design System Humano permaneçam acessíveis a cada mudança.
 */
describe("Design System Humano — acessibilidade", () => {
  it("botão principal não tem violações de acessibilidade", async () => {
    const { container } = render(<Botao variante="principal">Continuar</Botao>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("card informativo mantém hierarquia semântica", async () => {
    const { container } = render(
      <Card variante="informativo" titulo="Meu momento" descricao="Sem cobrança.">
        <p>Conteúdo de apoio.</p>
      </Card>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("campo de texto possui rótulo associado", async () => {
    const { container } = render(
      <CampoTexto rotulo="Como você prefere ser chamada?" defaultValue="" />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
