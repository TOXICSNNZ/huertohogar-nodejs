import { render, screen } from "@testing-library/react";
import React from "react";
import Header from "./Header";

jest.mock("../../context/AuthContext", () => ({
  useAuth: () => ({ user: null, logout: jest.fn() })
}));

jest.mock("react-router-dom", () => ({
  Link: ({ to, children, ...rest }) => <a href={to} {...rest}>{children}</a>
}));

describe("Header", () => {
  it("muestra enlaces principales", () => {
    render(<Header />);
    expect(screen.getByText("Inicio")).toBeInTheDocument();
    expect(screen.getByText("Catálogo")).toBeInTheDocument();
    expect(screen.getByText("Carrito")).toBeInTheDocument();
    expect(screen.getByText("Registro")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });
});
