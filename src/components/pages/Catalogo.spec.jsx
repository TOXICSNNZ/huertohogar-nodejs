import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import Catalogo from "./Catalogo";

jest.mock("../../assets/data", () => ([
  { code: "FR001", name: "Manzanas Fuji", category: "Frutas Frescas", price: 1200, image: "https://santaisabel.vtexassets.com/arquivos/ids/174684/Manzana-Fuji-granel.jpg?v=637574808673230000" },
  { code: "VR001", name: "Zanahorias Orgánicas", category: "Verduras Orgánicas", price: 900, image: "https://jumbocl.vtexassets.com/arquivos/ids/348053-250-250/Zanahorias-Jugo-1-kg.jpg?v=638776479708200000" },
  { code: "PO001", name: "Miel Orgánica", category: "Productos Orgánicos", price: 5000, image: "https://terraandes.cl/wp-content/uploads/2019/02/ulmo.png" },
]));

describe("Catalogo — filtros", () => {
  it("muestra el título y 3 productos al inicio (Todos)", () => {
    render(<Catalogo />);
    expect(screen.getByText("Catálogo de Productos")).toBeInTheDocument();
    expect(screen.getByText("Manzanas Fuji")).toBeInTheDocument();
    expect(screen.getByText("Zanahorias Orgánicas")).toBeInTheDocument();
    expect(screen.getByText("Miel Orgánica")).toBeInTheDocument();
  });

  it("filtra por 'Productos Orgánicos'", () => {
    render(<Catalogo />);
    fireEvent.click(screen.getByText("Productos Orgánicos"));
    expect(screen.getByText("Miel Orgánica")).toBeInTheDocument();
    expect(screen.queryByText("Manzanas Fuji")).toBeNull();
    expect(screen.queryByText("Zanahorias Orgánicas")).toBeNull();
  });
});
