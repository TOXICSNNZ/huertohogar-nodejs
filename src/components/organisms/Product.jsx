import React from "react";
import ProductService from "../../services/ProductService";

export default function Product(props) {
  const {
    id,
    code,
    name,
    description,
    price,
    category,
    stock,
    image,
    imageUrl,
    isAdmin = false,
    showAdminActions = false,
    onAfterDelete,
  } = props;

  const finalImage = image || imageUrl;

  function handleAddToCart() {
    const current = JSON.parse(localStorage.getItem("products") || "[]");

    current.push({
      code,
      name,
      description,
      price,
      category,
      stock,
      image: finalImage,
    });

    localStorage.setItem("products", JSON.stringify(current));
    alert("Producto añadido al carrito");
  }

  async function handleDelete() {
    if (!isAdmin || !showAdminActions) return;
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;

    try {
      await ProductService.deleteProduct(id);
      alert("Producto eliminado");

      if (onAfterDelete) onAfterDelete();
    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar el producto.");
    }
  }

  function handleEdit() {
    if (!isAdmin || !showAdminActions) return;
    alert(`Aca iiria menu de edicion "${name}" (solo admin).`);
  }

  return (
    <div className="card product-card" style={{ width: "18rem" }}>
      {finalImage && (
        <img
          src={finalImage}
          alt={name}
          className="card-img-top product-image-card"
        />
      )}

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{category}</h6>

        <p className="card-text" style={{ minHeight: "60px" }}>
          {description}
        </p>

        <p className="fw-bold mb-1">${price} CLP</p>
        <p className="text-muted">Stock disponible: {stock}</p>

        <button
          type="button"
          className="btn btn-success w-100 mt-2"
          onClick={handleAddToCart}
        >
          Añadir al carrito
        </button>

        {showAdminActions && isAdmin && (
          <div className="mt-3 d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-sm btn-warning"
              onClick={handleEdit}
            >
              Editar
            </button>
            <button
              type="button"
              className="btn btn-sm btn-danger"
              onClick={handleDelete}
            >
              Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
