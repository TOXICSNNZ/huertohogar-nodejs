import React from "react";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <h1>🌱 Directo del campo a tu casa</h1>
          <p>Verduras y frutas frescas, directo del productor.</p>
          <a href="/catalogo" className="btn-primary">
            Ver Catálogo
          </a>
        </div>
      </section>

      <section className="productos">
        <div className="card">
          <img
            src="https://supermercadoonlinecosan.es/wp-content/uploads/Manzanas-fuji.jpg"
            alt="Manzanas Fuji"
          />
          <h3>Manzanas Fuji</h3>
          <p className="price">$1.200 / kg</p>
        </div>

        <div className="card">
          <img
            src="https://live.staticflickr.com/65535/52810361468_27e40092d0_b.jpg"
            alt="Naranjas Valencia"
          />
          <h3>Naranjas Valencia</h3>
          <p className="price">$1.000 / kg</p>
        </div>

        <div className="card">
          <img
            src="https://th.bing.com/th/id/R.37b4ceb34abe1b78eafda149de78efe2?rik=d8UnDbSQBL7UlA&pid=ImgRaw&r=0"
            alt="Miel Orgánica"
          />
          <h3>Miel Orgánica</h3>
          <p className="price">$5.000</p>
        </div>
      </section>

      <section className="impacto container">
        <h2>🌍 Impacto Ambiental Positivo</h2>
        <p>
          Cada compra en HuertoHogar reduce la <strong>huella de carbono</strong>{" "}
          al favorecer la agricultura local.
        </p>
        <ul>
          <li>🚜 Apoyas a los agricultores de tu región.</li>
          <li>🌱 Reduces el transporte de larga distancia y las emisiones.</li>
          <li>🥕 Promueves un consumo más saludable y sostenible.</li>
        </ul>
      </section>
    </main>
  );
}
