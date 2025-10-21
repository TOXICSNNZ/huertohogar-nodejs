import React, { useMemo, useState } from "react";
import posts from "../../assets/blogData";

export default function Blog() {
  const [filtro, setFiltro] = useState("Todos");
  const [q, setQ] = useState("");

  const tags = ["Todos", "Alimentación", "Sostenibilidad"];

  const filtrados = useMemo(() => {
    let list = [...posts];

    if (filtro !== "Todos") {
      list = list.filter((p) => p.tag === filtro);
    }

    if (q.trim()) {
      const term = q.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(term));
    }

    list.sort((a, b) => (a.date < b.date ? 1 : -1));

    return list;
  }, [filtro, q]);

  return (
    <main className="container my-5">
      <header className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <h2 className="m-0">Blog: Alimentación y Sostenibilidad</h2>

        <div className="d-flex gap-2">
          {tags.map((t) => (
            <button
              key={t}
              className={`btn ${filtro === t ? "btn-success" : "btn-outline-success"}`}
              onClick={() => setFiltro(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </header>

      <div className="mb-4">
        <input
          className="form-control"
          placeholder="Buscar por título (ej: desayunos, local, snacks)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <section className="row g-4">
        {filtrados.map((post) => (
          <article key={post.id} className="col-sm-6 col-lg-4">
            <div className="card blog-card h-100">
              {post.image && (
                <img src={post.image} alt={post.title} className="card-img-top blog-card-img" />
              )}
              <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="badge bg-success">{post.tag}</span>
                  <small className="text-muted">{new Date(post.date).toLocaleDateString()}</small>
                </div>

                <h5 className="card-title">{post.title}</h5>
                <p className="card-text text-muted">{post.excerpt}</p>

                {post.bullets?.length > 0 && (
                  <ul className="small mb-3">
                    {post.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}

                <div className="mt-auto">
                  <button className="btn btn-outline-success w-100" disabled>
                    Leer más
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}

        {filtrados.length === 0 && (
          <p className="text-center text-muted">No se encontraron artículos con esos filtros.</p>
        )}
      </section>
    </main>
  );
}
