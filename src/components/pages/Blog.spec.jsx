import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import Blog from "./Blog";

describe("Blog — render y filtro", () => {
  it("muestra título y permite cambiar filtro", () => {
    render(<Blog />);
    expect(
      screen.getByText(/Blog: Alimentación y Sostenibilidad/i)
    ).toBeInTheDocument();

    const botones = screen.getAllByRole("button", { name: /Sostenibilidad/i });
    fireEvent.click(botones[0]);

    expect(
      screen.getByText(/Blog: Alimentación y Sostenibilidad/i)
    ).toBeInTheDocument();
  });
});
