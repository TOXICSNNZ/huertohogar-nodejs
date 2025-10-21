import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const nombreCorto = user?.nombre ? user.nombre.split(" ")[0] : null;

  return (
    <header className="site-header">
      <div className="header-inner">
        <h1 className="site-title">
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            HuertoHogar
          </Link>
        </h1>

        <nav className="main-nav" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link to="/">Inicio</Link>
          <Link to="/catalogo">Catálogo</Link>
          <Link to="/cart">Carrito</Link>
          <Link to="/blog">Blog</Link>
          <span style={{ marginLeft: 8 }}>|</span>

          {!user ? (
            <>
              <Link to="/registro">Registro</Link>
              <Link to="/login">Login</Link>
            </>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Link to="/perfil" style={{ color: "#fff", fontWeight: 700 }}>
                {nombreCorto}
              </Link>
              <button
                onClick={logout}
                style={{
                  background: "transparent",
                  border: "1px solid #fff",
                  color: "#fff",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Salir
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
