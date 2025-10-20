import React, { useState } from "react";
import products from "../../assets/data";
import Product from "../organisms/Product";

export default function Catalogo() {
  const [filter, setFilter] = useState("Todos");

  const categories = ["Todos", "Frutas Frescas", "Verduras Orgánicas", "Productos Orgánicos", "Productos Lácteos"];

  // Filtramos productos según la categoría seleccionada
  const filteredProducts =
    filter === "Todos" ? products : products.filter((p) => p.category === filter);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Catálogo de Productos</h2>

      {/* Botones de filtro */}
      <div className="text-center mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`btn mx-2 ${filter === cat ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Mostramos los productos filtrados */}
      <div className="row g-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((prod) => (
            <div key={prod.code} className="col-md-4 d-flex justify-content-center">
              <Product {...prod} />
            </div>
          ))
        ) : (
          <p className="text-center">No hay productos disponibles en esta categoría.</p>
        )}
      </div>
    </div>
  );
}


