import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products")) || [];
    const normalized = stored.map((p) => ({ ...p, qty: p.qty ? Number(p.qty) : 1 }));
    setProducts(normalized);
    localStorage.setItem("products", JSON.stringify(normalized));
  }, []);

  function save(updated) {
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  }

  function removeOne(code) {
    const updated = products
      .map((p) => (p.code === code ? { ...p, qty: p.qty - 1 } : p))
      .filter((p) => p.qty > 0);
    save(updated);
  }

  function removeAll(code) {
    const updated = products.filter((p) => p.code !== code);
    save(updated);
  }

  function addOne(code) {
    const updated = products.map((p) =>
      p.code === code ? { ...p, qty: p.qty + 1 } : p
    );
    save(updated);
  }

  const subtotal = useMemo(
    () => products.reduce((acc, p) => acc + Number(p.price) * p.qty, 0),
    [products]
  );
  const iva = subtotal * 0.19;
  const envio = products.length > 0 ? 3000 : 0;
  const total = subtotal + iva + envio;

  return (
    <div className="container my-5 carrito-box">
      <h2>Carrito</h2>

      {products.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th style={{ width: 170 }}>Cantidad</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.code}>
                  <td><img src={p.image} alt={p.name} style={{ width: "60px" }} /></td>
                  <td>{p.name}</td>
                  <td>${Number(p.price).toFixed(0)}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => removeOne(p.code)}>-</button>
                      <span>{p.qty}</span>
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => addOne(p.code)}>+</button>
                    </div>
                  </td>
                  <td>${(Number(p.price) * p.qty).toFixed(0)}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => removeAll(p.code)}>
                      Eliminar todos
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="resumen-carrito mt-3">
            <p><strong>Subtotal:</strong> ${subtotal.toFixed(0)}</p>
            <p><strong>IVA (19%):</strong> ${iva.toFixed(0)}</p>
            <p><strong>Envío:</strong> ${envio}</p>
            <h4 className="total-final"><strong>Total:</strong> ${total.toFixed(0)}</h4>
          </div>

          <button className="btn btn-success mt-3" onClick={() => navigate("/checkout")}>
            Comprar ahora
          </button>
        </>
      )}
    </div>
  );
}
