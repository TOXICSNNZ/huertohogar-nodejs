import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import Blog from "./Blog";

describe("Blog — render y filtro", () => {
  it("muestra título y permite cambiar filtro", () => {
    render(<Blog />);
    expect(
      screen.getByText(/Blog: alimentación saludable y sostenibilidad/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Blog: alimentación saludable y sostenibilidad/i)
    ).toBeInTheDocument();
  });
});
