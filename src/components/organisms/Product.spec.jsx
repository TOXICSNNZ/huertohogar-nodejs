import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import Product from "./Product";

describe("Product — añade al carrito", () => {
  beforeEach(() => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify([]));
    Storage.prototype.setItem = jest.fn();
    jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  it("guarda el producto con qty=1 en localStorage", () => {
    const mockProduct = {
      code: "FR001",
      image: "/img/a.jpg",
      name: "Manzanas Fuji",
      description: "Ricas y crujientes",
      price: 1200,
      stock: 10,
      category: "Frutas Frescas"
    };

    render(<Product {...mockProduct} />);
    fireEvent.click(screen.getByText(/Añadir al carrito/i));

    expect(localStorage.setItem).toHaveBeenCalled();
    const payload = JSON.parse(localStorage.setItem.mock.calls.pop()[1]);
    expect(payload[0].code).toBe("FR001");
    expect(payload[0].qty).toBe(1);
  });
});
