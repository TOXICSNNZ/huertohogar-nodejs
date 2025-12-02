import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Registro() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmar: "",
    calle: "",
    depto: "",
    region: "",
    comuna: "",
  });

  const [errores, setErrores] = useState([]);

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validar() {
    const msgs = [];

    if (!form.nombre.trim()) msgs.push("El nombre es obligatorio.");
    if (!form.apellido.trim()) msgs.push("El apellido es obligatorio.");
    if (!form.email.includes("@")) msgs.push("Debes ingresar un correo válido.");
    if (!form.password || form.password.length < 6) {
      msgs.push("La contraseña debe tener al menos 6 caracteres.");
    }
    if (form.password !== form.confirmar) {
      msgs.push("Las contraseñas no coinciden.");
    }
    if (!form.calle.trim()) msgs.push("La calle es obligatoria.");
    if (!form.region.trim()) msgs.push("La región es obligatoria.");
    if (!form.comuna.trim()) msgs.push("La comuna es obligatoria.");

    return msgs;
  }

  async function onSubmit(e) {
    e.preventDefault();
    const msgs = validar();

    if (msgs.length > 0) {
      setErrores(msgs);
      return;
    }

    try {
      await register(form);
      navigate("/");
    } catch (err) {
      console.error(err);
      setErrores([
        err.response?.data?.error ||
          "Error al registrarse. Intenta nuevamente.",
      ]);
    }
  }

  function onReset() {
    setForm({
      nombre: "",
      apellido: "",
      email: "",
      password: "",
      confirmar: "",
      calle: "",
      depto: "",
      region: "",
      comuna: "",
    });
    setErrores([]);
  }

  return (
    <div className="container my-5 registro-box">
      <h2>Crear cuenta</h2>

      <form onSubmit={onSubmit} onReset={onReset}>
        <div className="row">
          <label htmlFor="nombre">Nombre *</label>
          <input
            id="nombre"
            name="nombre"
            value={form.nombre}
            onChange={onChange}
          />
        </div>

        <div className="row">
          <label htmlFor="apellido">Apellido *</label>
          <input
            id="apellido"
            name="apellido"
            value={form.apellido}
            onChange={onChange}
          />
        </div>

        <div className="row">
          <label htmlFor="email">Correo electrónico *</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
          />
        </div>

        <div className="row">
          <label htmlFor="password">Contraseña *</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
          />
        </div>

        <div className="row">
          <label htmlFor="confirmar">Confirmar contraseña *</label>
          <input
            id="confirmar"
            name="confirmar"
            type="password"
            value={form.confirmar}
            onChange={onChange}
          />
        </div>

        <div className="row">
          <label htmlFor="calle">Calle y número *</label>
          <input
            id="calle"
            name="calle"
            value={form.calle}
            onChange={onChange}
          />
        </div>

        <div className="row">
          <label htmlFor="depto">Departamento (opcional)</label>
          <input
            id="depto"
            name="depto"
            value={form.depto}
            onChange={onChange}
          />
        </div>

        <div className="row">
          <label htmlFor="region">Región *</label>
          <input
            id="region"
            name="region"
            value={form.region}
            onChange={onChange}
          />
        </div>

        <div className="row">
          <label htmlFor="comuna">Comuna *</label>
          <input
            id="comuna"
            name="comuna"
            value={form.comuna}
            onChange={onChange}
          />
        </div>

        <div className="row-buttons">
          <button type="reset">Limpiar</button>
          <button type="submit">Crear cuenta</button>
        </div>

        {errores.length > 0 && (
          <div className="alert alert-danger mt-3">
            {errores.map((m, i) => (
              <div key={i}>{m}</div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}
