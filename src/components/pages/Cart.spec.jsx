import { fireEvent, render, screen } from "@testing-library/react";
import Cart from "./Cart";
import React from "react";

jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

describe("Cart", () => {
  const mockProducts = [
    { code: "FR001", image: "https://santaisabel.vtexassets.com/arquivos/ids/174684/Manzana-Fuji-granel.jpg?v=637574808673230000", name: "Manzanas Fuji", price: 1200, qty: 2 },
    { code: "PO001", image: "https://terraandes.cl/wp-content/uploads/2019/02/ulmo.png", name: "Miel Orgánica", price: 5000, qty: 1 },
  ];

  beforeEach(() => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockProducts));
    Storage.prototype.setItem = jest.fn();
  });

  it("muestra los productos en el carrito", () => {
    render(<Cart />);
    expect(screen.getByText("Carrito")).toBeInTheDocument();
    expect(screen.getByText("Manzanas Fuji")).toBeInTheDocument();
    expect(screen.getByText("Miel Orgánica")).toBeInTheDocument();
  });

  it("botón '-' reduce una unidad", () => {
    render(<Cart />);
    const setSpy = jest.spyOn(Storage.prototype, "setItem");
    const menos = screen.getAllByText("-")[0];
    fireEvent.click(menos);
    const payload = JSON.parse(setSpy.mock.calls.pop()[1]);
    const manzanas = payload.find((p) => p.code === "FR001");
    expect(manzanas.qty).toBe(1);
  });
});
