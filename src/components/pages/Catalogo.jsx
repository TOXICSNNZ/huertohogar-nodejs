import React, { useState } from "react";
import products from "../../assets/data";
import Product from "../organisms/Product";

export default function Catalogo() {
  const [filter, setFilter] = useState("Todos");

  const categories = [
    "Todos",
    "Frutas Frescas",
    "Verduras Orgánicas",
    "Productos Orgánicos",
    "Productos Lácteos",
  ];

  const filteredProducts =
    filter === "Todos" ? products : products.filter((p) => p.category === filter);

  return (
    <main className="container my-5">
      <h2 className="text-center mb-4">Catálogo de Productos</h2>

      <div className="text-center mb-4 filtros">
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

      <section className="container my-5">
        <div className="row g-4">
          {filteredProducts.map((prod) => (
            <div key={prod.code} className="col-sm-6 col-md-4 col-lg-3">
              <Product {...prod} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
