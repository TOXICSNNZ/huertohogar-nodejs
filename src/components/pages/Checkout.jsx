import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function genOrderId() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const base = `${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
  const rand = Math.floor(Math.random() * 9000 + 1000);
  return `${base}-${rand}`;
}

export default function Checkout() {
  const [products, setProducts] = useState([]);
  const { user, addOrder, setLastOrder } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "", apellido: "", email: "",
    calle: "", depto: "", region: "", comuna: "", instrucciones: ""
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products")) || [];
    const normalized = stored.map(p => ({ ...p, qty: p.qty ? Number(p.qty) : 1 }));
    setProducts(normalized);
  }, []);

  useEffect(() => {
    if (user) {
      setForm({
        nombre: user.nombre || "",
        apellido: user.apellido || "",
        email: user.email || "",
        calle: user.calle || "",
        depto: user.depto || "",
        region: user.region || "",
        comuna: user.comuna || "",
        instrucciones: user.instrucciones || ""
      });
    }
  }, [user]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const subtotal = useMemo(
    () => products.reduce((acc, p) => acc + Number(p.price) * p.qty, 0),
    [products]
  );
  const iva = subtotal * 0.19;
  const envio = products.length > 0 ? 3000 : 0;
  const total = subtotal + iva + envio;

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.nombre || !form.apellido || !form.email.includes("@") || !form.calle || !form.region || !form.comuna) {
      alert("Completa los campos obligatorios.");
      return;
    }

    const id = genOrderId();
    const order = {
      id,
      date: new Date().toISOString(),
      items: products,
      subtotal,
      iva,
      envio,
      total,
      customer: { ...form },
      status: "success"
    };

    if (Math.random() < 0.9) {
      addOrder(order);
      localStorage.removeItem("products");
      navigate("/success");
    } else {
      setLastOrder(id, "fail");
      navigate("/fail");
    }
  }

  return (
    <div className="container my-5">
      <h2 className="mb-2">🛒 Carrito de compra</h2>
      <p>Completa la siguiente información</p>

      <div className="table-responsive mb-3">
        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>Imagen</th><th>Nombre</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.code}>
                <td><img src={p.image} alt={p.name} style={{ width: "60px" }} /></td>
                <td>{p.name}</td>
                <td>${Number(p.price).toFixed(0)}</td>
                <td>{p.qty}</td>
                <td>${(Number(p.price) * p.qty).toFixed(0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-end mb-4">
        <h4 className="text-primary">Total a pagar: ${total.toFixed(0)}</h4>
      </div>

      <form onSubmit={handleSubmit} className="checkout-form">
        <h4 className="mb-3">Información del cliente</h4>
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Nombre*</label>
            <input className="form-control" name="nombre" value={form.nombre} onChange={onChange} required />
          </div>
          <div className="col-md-6">
            <label>Apellidos*</label>
            <input className="form-control" name="apellido" value={form.apellido} onChange={onChange} required />
          </div>
        </div>
        <div className="mb-3">
          <label>Correo*</label>
          <input type="email" className="form-control" name="email" value={form.email} onChange={onChange} required />
        </div>

        <h4 className="mt-4 mb-3">Dirección de entrega de los productos</h4>
        <div className="mb-3">
          <label>Calle*</label>
          <input className="form-control" name="calle" value={form.calle} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label>Departamento (opcional)</label>
          <input className="form-control" name="depto" value={form.depto} onChange={onChange} />
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Región*</label>
            <input className="form-control" name="region" value={form.region} onChange={onChange} required />
          </div>
          <div className="col-md-6">
            <label>Comuna*</label>
            <input className="form-control" name="comuna" value={form.comuna} onChange={onChange} required />
          </div>
        </div>
        <div className="mb-3">
          <label>Instrucciones (opcional)</label>
          <textarea className="form-control" name="instrucciones" value={form.instrucciones} onChange={onChange} />
        </div>

        <button className="btn btn-success w-100 py-2 fs-5">Pagar ahora ${total.toFixed(0)}</button>
      </form>
    </div>
  );
}
