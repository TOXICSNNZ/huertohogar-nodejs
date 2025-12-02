import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Perfil() {
  const { user, orders } = useAuth();

  const misPedidos = useMemo(() => {
    if (!user?.email) return [];
    return orders.filter((o) => o.customer?.email === user.email);
  }, [orders, user]);

  if (!user) {
    return (
      <div className="container my-5">
        <h2>Perfil de usuario</h2>
        <p>Debes iniciar sesión para ver tu perfil.</p>
        <Link to="/login" className="btn btn-success">
          Ir a Login
        </Link>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4">Perfil de {user.nombre}</h2>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="registro-box">
            <h4>Datos del cliente</h4>
            <p>
              <strong>Nombre:</strong> {user.nombre} {user.apellido}
            </p>
            <p>
              <strong>Correo:</strong> {user.email}
            </p>
            <p>
              <strong>Dirección:</strong> {user.calle}
              {user.depto && `, Depto ${user.depto}`}
            </p>
            <p>
              <strong>Región / Comuna:</strong> {user.region} / {user.comuna}
            </p>
            <p>
              <strong>Rol:</strong>{" "}
              {user.role === "ADMIN" ? "Administrador" : "Cliente"}
            </p>
          </div>
        </div>

        <div className="col-md-8">
          <div className="carrito-box">
            <h4>Historial de pedidos</h4>
            {misPedidos.length === 0 ? (
              <p className="mt-3">
                Aún no has realizado compras. Puedes comenzar en el{" "}
                <Link to="/catalogo">catálogo</Link>.
              </p>
            ) : (
              <div className="table-responsive mt-3">
                <table className="table table-striped align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Folio</th>
                      <th>Fecha</th>
                      <th>Estado</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {misPedidos.map((o) => (
                      <tr key={o.id}>
                        <td>{o.id}</td>
                        <td>
                          {new Date(o.date).toLocaleString("es-CL", {
                            dateStyle: "short",
                            timeStyle: "short",
                          })}
                        </td>
                        <td>{o.status === "success" ? "Pagado" : "Fallido"}</td>
                        <td>${Number(o.total).toFixed(0)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
