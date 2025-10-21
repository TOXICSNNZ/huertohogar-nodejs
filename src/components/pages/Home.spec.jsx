import { render, screen } from "@testing-library/react";
import React from "react";
import Home from "./Home";

describe("Home — render básico", () => {
  it("muestra el hero y el CTA", () => {
    render(<Home />);
    expect(screen.getByText(/Directo del campo a tu casa/i)).toBeInTheDocument();
    expect(screen.getByText(/Ver Catálogo/i)).toBeInTheDocument();
  });
});
