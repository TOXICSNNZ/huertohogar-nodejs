import { render, screen } from "@testing-library/react";
import React from "react";
import Footer from "./Footer";

describe("Footer", () => {
  it("muestra el copyright correcto", () => {
    render(<Footer />);
    expect(screen.getByText("© HuertoHogar")).toBeInTheDocument();
  });

  it("muestra secciones Contacto - Síguenos - Encuéntranos", () => {
    render(<Footer />);
    expect(screen.getByText("Contacto")).toBeInTheDocument();
    expect(screen.getByText("Síguenos")).toBeInTheDocument();
    expect(screen.getByText("Encuéntranos")).toBeInTheDocument();
  });
});
