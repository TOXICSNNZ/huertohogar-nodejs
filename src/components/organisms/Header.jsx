// src/components/organisms/Header.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <h1 className="site-title">HuertoHogar</h1>
        <nav className="main-nav">
          <Link to="/">Inicio</Link>
          <Link to="/catalogo">Catálogo</Link>
          <Link to="/registro">Registro</Link>
          <Link to="/cart">Carrito</Link>
        </nav>
      </div>
    </header>
  );
}
