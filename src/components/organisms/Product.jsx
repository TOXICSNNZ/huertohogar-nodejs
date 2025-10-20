import React from "react";

export default function Product({ code, image, name, description, price, stock, category }) {
  function addToCart() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    products.push({ code, image, name, description, price, stock, category });
    localStorage.setItem("products", JSON.stringify(products));
    alert(`${name} añadido al carrito`);
  }

  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={image} className="card-img-top" alt={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
        <p><strong>Precio:</strong> ${price} CLP</p>
        <p><strong>Stock:</strong> {stock}</p>
        <button className="btn btn-success" onClick={addToCart}>
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}
