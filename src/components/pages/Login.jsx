import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    const res = login(email, password);
    if (res.ok) navigate("/"); else setMsg(res.msg);
  }

  return (
    <div className="container my-5 registro-box">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={onSubmit} className="checkout-form">
        <div className="mb-3"><label>Correo</label>
          <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        </div>
        <div className="mb-3"><label>Contraseña</label>
          <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        </div>
        {msg && <div className="alert alert-danger">{msg}</div>}
        <button className="btn btn-primary w-100">Entrar</button>
      </form>
    </div>
  );
}
