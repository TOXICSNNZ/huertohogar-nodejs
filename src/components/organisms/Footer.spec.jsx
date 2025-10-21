import { render, screen } from "@testing-library/react";
import React from "react";
import Footer from "./Footer";

describe("Footer — render básico", () => {
  it("muestra el copyright exacto", () => {
    render(<Footer />);
    expect(screen.getByText("© HuertoHogar - Proyecto educativo")).toBeInTheDocument();
  });

  it("muestra secciones Contacto / Síguenos / Encuéntranos", () => {
    render(<Footer />);
    expect(screen.getByText("Contacto")).toBeInTheDocument();
    expect(screen.getByText("Síguenos")).toBeInTheDocument();
    expect(screen.getByText("Encuéntranos")).toBeInTheDocument();
  });
});
