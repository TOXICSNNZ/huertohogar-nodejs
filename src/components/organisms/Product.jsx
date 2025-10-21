import React from "react";

export default function Product({ code, image, name, description, price, stock, category }) {
  function addToCart() {
  const cart = JSON.parse(localStorage.getItem("products")) || [];

  const idx = cart.findIndex((item) => item.code === code);

  if (idx >= 0) {
    cart[idx].qty = (cart[idx].qty || 1) + 1;
  } else {
    cart.push({ code, image, name, description, price, stock, category, qty: 1 });
  }

  localStorage.setItem("products", JSON.stringify(cart));
}


  return (
    <article className="card product-card">
      <img src={image} className="card-img-top" alt={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        {description && <p className="card-text">{description}</p>}
        <p className="text-success fw-bold">${price}</p>
        <button className="btn btn-success w-100 add-to-cart" onClick={addToCart}>
          Añadir al carrito
        </button>
      </div>
    </article>
  );
}
