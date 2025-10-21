import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Registro() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "", apellido: "", email: "", password: "",
    calle: "", depto: "", region: "", comuna: "", instrucciones: ""
  });
  const [errores, setErrores] = useState([]);

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validar() {
    const msgs = [];
    if (!form.nombre) msgs.push("Nombre es obligatorio.");
    if (!form.apellido) msgs.push("Apellido es obligatorio.");
    if (!form.email.includes("@")) msgs.push("Correo debe contener @.");
    if (form.password.length < 6) msgs.push("La contraseña debe tener al menos 6 caracteres.");
    if (!form.calle) msgs.push("Calle es obligatoria.");
    if (!form.region) msgs.push("Región es obligatoria.");
    if (!form.comuna) msgs.push("Comuna es obligatoria.");
    return msgs;
  }

  function onSubmit(e) {
    e.preventDefault();
    const v = validar();
    if (v.length > 0) { setErrores(v); return; }
    register(form);
    navigate("/checkout");
  }

  return (
    <div className="container my-5 registro-box">
      <h2>Crear Cuenta</h2>
      <form onSubmit={onSubmit} className="checkout-form">
        <div className="row mb-3">
          <div className="col-md-6"><label>Nombre*</label>
            <input className="form-control" name="nombre" value={form.nombre} onChange={onChange} required />
          </div>
          <div className="col-md-6"><label>Apellido*</label>
            <input className="form-control" name="apellido" value={form.apellido} onChange={onChange} required />
          </div>
        </div>
        <div className="mb-3"><label>Correo*</label>
          <input type="email" className="form-control" name="email" value={form.email} onChange={onChange} required />
        </div>
        <div className="mb-3"><label>Contraseña*</label>
          <input type="password" className="form-control" name="password" value={form.password} onChange={onChange} required />
        </div>

        <h4 className="mt-4 mb-3">Dirección de entrega</h4>
        <div className="mb-3"><label>Calle*</label>
          <input className="form-control" name="calle" value={form.calle} onChange={onChange} required />
        </div>
        <div className="mb-3"><label>Departamento (opcional)</label>
          <input className="form-control" name="depto" value={form.depto} onChange={onChange} />
        </div>
        <div className="row mb-3">
          <div className="col-md-6"><label>Región*</label>
            <input className="form-control" name="region" value={form.region} onChange={onChange} required />
          </div>
          <div className="col-md-6"><label>Comuna*</label>
            <input className="form-control" name="comuna" value={form.comuna} onChange={onChange} required />
          </div>
        </div>
        <div className="mb-3"><label>Instrucciones (opcional)</label>
          <textarea className="form-control" name="instrucciones" value={form.instrucciones} onChange={onChange} />
        </div>

        {errores.length > 0 && (
          <div className="alert alert-danger">
            {errores.map((m, i) => <div key={i}>{m}</div>)}
          </div>
        )}

        <button className="btn btn-success w-100">Crear cuenta</button>
      </form>
    </div>
  );
}
