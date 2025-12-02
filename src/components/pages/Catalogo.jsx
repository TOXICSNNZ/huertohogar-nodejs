import React, { useEffect, useState } from "react";
import Product from "../organisms/Product";
import ProductService from "../../services/ProductService";
import { useAuth } from "../../context/AuthContext";

export default function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [filter, setFilter] = useState("Todos");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isAdmin } = useAuth();

  const categories = [
    "Todos",
    "Frutas Frescas",
    "Verduras Orgánicas",
    "Productos Orgánicos",
    "Productos Lácteos",
  ];

  async function cargarProductos() {
    try {
      setLoading(true);
      setError("");
      const resp = await ProductService.getAllProducts();
      setProductos(resp.data);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los productos.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    cargarProductos();
  }, []);

  const filteredProducts =
    filter === "Todos"
      ? productos
      : productos.filter((p) => p.category === filter);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Catálogo de Productos</h2>

      {isAdmin && (
        <div className="text-end mb-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => alert("Aca iria el menu para crear producto (solo admin).")}
          >
            + Agregar producto
          </button>
        </div>
      )}

      <div className="text-center mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`btn mx-2 ${filter === cat ? "btn-primary" : "btn-outline-primary"
              }`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && <p className="text-center">Cargando productos...</p>}
      {error && <p className="text-center text-danger">{error}</p>}

      {!loading && !error && (
        <div className="row g-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((prod) => (
              <div
                key={prod.id ?? prod.code}
                className="col-sm-6 col-md-4 d-flex justify-content-center"
              >
                <Product
                  {...prod}
                  isAdmin={isAdmin}
                  showAdminActions={isAdmin}
                  onAfterDelete={cargarProductos}
                />
              </div>
            ))
          ) : (
            <p className="text-center">
              No hay productos disponibles en esta categoría.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
