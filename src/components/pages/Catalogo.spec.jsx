import { render, screen } from "@testing-library/react";
import Catalogo from "./Catalogo";
import React from "react";

describe("Catalog component", () => {
  it("renderiza título del catálogo", () => {
    render(<Catalogo />);
    expect(screen.getByText("Catálogo de Productos")).toBeInTheDocument();
  });

  it("muestra algunos productos", () => {
    render(<Catalogo />);
    expect(screen.getByText("Manzanas Fuji")).toBeInTheDocument();
    expect(screen.getByText("Naranjas Valencia")).toBeInTheDocument();
  });
});
