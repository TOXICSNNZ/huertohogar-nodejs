import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setMsg("");

    const res = await login(email, password);

    if (res.ok) {
      navigate("/");
    } else {
      setMsg(res.msg);
    }
  }

  return (
    <div className="container my-5 registro-box">
      <h2>Iniciar sesión</h2>

      <form onSubmit={onSubmit} className="checkout-form">
        <div className="mb-3">
          <label>Correo</label>
          <input
            type="email"
            className="form-control"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="usuario@correo.com"
          />
        </div>

        <div className="mb-3">
          <label>Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
          />
        </div>

        {msg && <div className="alert alert-danger">{msg}</div>}

        <button type="submit" className="btn btn-success w-100 mt-3">
          Entrar
        </button>
      </form>

      <p className="mt-3">
        ¿No tienes cuenta?{" "}
        <Link to="/registro">
          Regístrate aquí
        </Link>
      </p>
    </div>
  );
}
