import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import Product from "./Product";

describe("Product — añade al carrito", () => {
  beforeEach(() => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify([]));
    Storage.prototype.setItem = jest.fn();
    jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  it("guarda el producto en localStorage", () => {
    const mockProduct = {
      code: "FR001",
      image: "https://santaisabel.vtexassets.com/arquivos/ids/174684/Manzana-Fuji-granel.jpg?v=637574808673230000",
      name: "Manzanas Fuji",
      description: "Ricas y crujientes",
      price: 1200,
      stock: 10,
      category: "Frutas Frescas"
    };

    render(<Product {...mockProduct} />);
    fireEvent.click(screen.getByText(/Añadir al carrito/i));

    expect(localStorage.setItem).toHaveBeenCalled();

    const lastCall = localStorage.setItem.mock.calls.at(-1);
    expect(lastCall[0]).toBe("products");

    const payload = JSON.parse(lastCall[1]);
    expect(payload.length).toBe(1);
    expect(payload[0].code).toBe("FR001");
    expect(payload[0].name).toBe("Manzanas Fuji");
  });
});
