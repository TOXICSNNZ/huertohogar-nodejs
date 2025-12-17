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

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    imageUrl: "",
  });

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
      setProductos(resp.data || []);
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

  const openCreateForm = () => {
    setEditingProduct(null);
    setFormData({
      code: "",
      name: "",
      category: "",
      price: "",
      stock: "",
      description: "",
      imageUrl: "",
    });
    setShowForm(true);
  };

  const startEdit = (prod) => {
    setEditingProduct(prod);
    setFormData({
      code: prod.code || "",
      name: prod.name || "",
      category: prod.category || "",
      price: prod.price ?? "",
      stock: prod.stock ?? "",
      description: prod.description || "",
      imageUrl: prod.imageUrl || prod.image || "",
    });
    setShowForm(true);
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
      };
      await ProductService.createProduct(payload);
      setShowForm(false);
      await cargarProductos();
    } catch (err) {
      console.error(err);
      alert("Error al crear producto (revisa consola / token / rol ADMIN).");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
      };
      await ProductService.updateProduct(editingProduct.id, payload);
      setEditingProduct(null);
      setShowForm(false);
      await cargarProductos();
    } catch (err) {
      console.error(err);
      alert("Error al actualizar producto (revisa consola / token / rol ADMIN).");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Catálogo de Productos</h2>

      {isAdmin && !showForm && !editingProduct && (
        <div className="text-end mb-3">
          <button type="button" className="btn btn-primary" onClick={openCreateForm}>
            + Agregar producto
          </button>
        </div>
      )}

      {isAdmin && showForm && (
        <div className="registro-box mb-4">
          <h4 className="text-center mb-3">
            {editingProduct ? "✏️ Editar producto" : "➕ Nuevo producto"}
          </h4>

          <form onSubmit={editingProduct ? handleUpdate : handleCreate}>
            <div className="row g-2">
              <div className="col-md-4">
                <input
                  className="form-control"
                  placeholder="Código (FR001)"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  required
                />
              </div>

              <div className="col-md-8">
                <input
                  className="form-control"
                  placeholder="Nombre"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="col-md-6">
                <input
                  className="form-control"
                  placeholder="Categoría (Frutas Frescas...)"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  required
                />
              </div>

              <div className="col-md-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>

              <div className="col-md-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Stock"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  required
                />
              </div>

              <div className="col-12">
                <textarea
                  className="form-control"
                  placeholder="Descripción"
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              <div className="col-12">
                <input
                  className="form-control"
                  placeholder="URL de imagen (imageUrl)"
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="d-flex justify-content-center gap-2 mt-3">
              <button type="submit" className="btn btn-success">
                {editingProduct ? "Actualizar" : "Crear"}
              </button>
              <button type="button" className="btn btn-secondary" onClick={cancelEdit}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="text-center mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`btn mx-2 ${filter === cat ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setFilter(cat)}
            type="button"
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
                  onEdit={startEdit}
                  onAfterDelete={cargarProductos}
                />
              </div>
            ))
          ) : (
            <p className="text-center">No hay productos disponibles en esta categoría.</p>
          )}
        </div>
      )}
    </div>
  );
}
