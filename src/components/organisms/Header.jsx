import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const { user, isAuthenticated, logout, role } = useAuth();

  const displayName = user?.nombre
    ? user.nombre.split(" ")[0]
    : null;

  return (
    <header className="site-header">
      <div className="header-inner">
        <h1 className="site-title">
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            HuertoHogar
          </Link>
        </h1>

        <nav className="main-nav">
          <Link to="/">Inicio</Link>
          <Link to="/catalogo">Catálogo</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/carrito">Carrito</Link>

          {!isAuthenticated && (
            <Link to="/login">Registro / Login</Link>
          )}

          {isAuthenticated && (
            <>
              <Link to="/perfil">
                {displayName ? `Hola, ${displayName}` : "Mi perfil"}
              </Link>
              <button
                type="button"
                className="btn btn-sm btn-outline-light ms-2"
                onClick={logout}
              >
                Cerrar sesión
              </button>
              {role === "ADMIN" && (
                <span className="badge bg-warning text-dark ms-2">
                  ADMIN
                </span>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
