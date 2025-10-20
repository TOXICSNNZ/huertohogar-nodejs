import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(stored);
  }, []);

  const subtotal = products.reduce((acc, p) => acc + parseFloat(p.price), 0);
  const iva = subtotal * 0.19;
  const envio = products.length > 0 ? 3000 : 0;
  const total = subtotal + iva + envio;

  function handleSubmit(e) {
    e.preventDefault();

    // Simulación: 80% éxito, 20% fallo
    if (Math.random() < 0.8) {
      localStorage.clear();
      navigate("/success");
    } else {
      navigate("/fail");
    }
  }

  return (
    <div className="container my-5">
      <h2>💳 Pago</h2>

      {/* Resumen del pedido */}
      <div className="mb-4">
        <h4>Resumen del pedido:</h4>
        <p><strong>Subtotal:</strong> ${subtotal.toFixed(0)}</p>
        <p><strong>IVA (19%):</strong> ${iva.toFixed(0)}</p>
        <p><strong>Envío:</strong> ${envio}</p>
        <h4><strong>Total:</strong> ${total.toFixed(0)}</h4>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        <h4>Datos Personales</h4>
        <div className="mb-3">
          <label>Nombre</label>
          <input className="form-control" required />
        </div>
        <div className="mb-3">
          <label>Apellidos</label>
          <input className="form-control" required />
        </div>
        <div className="mb-3">
          <label>Correo</label>
          <input type="email" className="form-control" required />
        </div>

        <h4>Dirección de Entrega</h4>
        <div className="mb-3">
          <label>Calle</label>
          <input className="form-control" required />
        </div>
        <div className="mb-3">
          <label>Departamento (opcional)</label>
          <input className="form-control" />
        </div>
        <div className="mb-3">
          <label>Región</label>
          <input className="form-control" required />
        </div>
        <div className="mb-3">
          <label>Comuna</label>
          <input className="form-control" required />
        </div>
        <div className="mb-3">
          <label>Instrucciones (opcional)</label>
          <textarea className="form-control"></textarea>
        </div>

        <button type="submit" className="btn btn-success w-100">
          Confirmar Compra
        </button>
      </form>
    </div>
  );
}
