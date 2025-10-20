import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(stored);
  }, []);

  function removeFromCart(code) {
    const updated = products.filter((p) => p.code !== code);
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  }

  const subtotal = products.reduce((acc, p) => acc + parseFloat(p.price), 0);
  const iva = subtotal * 0.19;
  const envio = products.length > 0 ? 3000 : 0;
  const total = subtotal + iva + envio;

  return (
    <div className="container my-5">
      <h2 className="mb-4">🛒 Carrito de Compras</h2>

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
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.code}>
                  <td>
                    <img src={p.image} alt={p.name} style={{ width: "60px" }} />
                  </td>
                  <td>{p.name}</td>
                  <td>${p.price}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeFromCart(p.code)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Resumen */}
          <div className="mt-4">
            <p><strong>Subtotal:</strong> ${subtotal.toFixed(0)}</p>
            <p><strong>IVA (19%):</strong> ${iva.toFixed(0)}</p>
            <p><strong>Envío:</strong> ${envio}</p>
            <h4><strong>Total:</strong> ${total.toFixed(0)}</h4>
          </div>

          {/* Botón de compra */}
          <button
            className="btn btn-success mt-3"
            onClick={() => navigate("/checkout")}
          >
            Comprar ahora
          </button>
        </>
      )}
    </div>
  );
}
