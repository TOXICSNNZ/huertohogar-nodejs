import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Perfil() {
  const { user, orders } = useAuth();

  if (!user) {
    return (
      <div className="container my-5 registro-box">
        <h2>Perfil</h2>
        <p>Debes <Link to="/login">iniciar sesión</Link> para ver tu perfil.</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2>👤 Perfil de {user.nombre}</h2>

      <div className="registro-box mb-4">
        <h4>Datos personales</h4>
        <p><strong>Nombre:</strong> {user.nombre} {user.apellido}</p>
        <p><strong>Correo:</strong> {user.email}</p>
        <p><strong>Dirección:</strong> {user.calle}{user.depto ? `, Depto ${user.depto}` : ""}, {user.comuna}, {user.region}</p>
        {user.instrucciones && <p><strong>Instrucciones:</strong> {user.instrucciones}</p>}
      </div>

      <div className="registro-box">
        <h4>Historial de compras</h4>
        {(!orders || orders.length === 0) ? (
          <p>No tienes compras registradas aún.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Fecha</th>
                  <th>Productos</th>
                  <th>Total</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td>#{o.id}</td>
                    <td>{new Date(o.date).toLocaleString()}</td>
                    <td>
                      {o.items.map((it) => (
                        <div key={it.code}>
                          {it.name} x{it.qty} (${Number(it.price).toFixed(0)} c/u)
                        </div>
                      ))}
                    </td>
                    <td>${o.total.toFixed(0)}</td>
                    <td>{o.status === "success" ? "Completado" : "Fallido"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
