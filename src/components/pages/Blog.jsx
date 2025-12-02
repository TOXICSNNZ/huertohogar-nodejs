import React, { useEffect, useState } from "react";
import BlogService from "../../services/BlogService";
import { useAuth } from "../../context/AuthContext";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isAdmin } = useAuth() || {};

  async function cargarPosts() {
    try {
      setLoading(true);
      setError("");
      const response = await BlogService.getAllPosts();
      setPosts(response.data || []);
    } catch (err) {
      console.error("Error cargando blog:", err);
      setError("No se pudieron cargar las noticias del blog.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    cargarPosts();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("¿Seguro que deseas eliminar esta entrada?")) return;
    try {
      await BlogService.deletePost(id);
      alert("Entrada eliminada");
      cargarPosts();
    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar la entrada.");
    }
  }

  function handleEdit(post) {
    alert(
      `Aca iria el menu de editar "${post.title}" (solo admin).`
    );
  }

  function handleCreate() {
    alert("Aca iria el menu crear (solo admin).");
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">
        Blog: alimentación saludable y sostenibilidad
      </h2>

      {isAdmin && (
        <div className="text-end mb-3">
          <button className="btn btn-primary" onClick={handleCreate}>
            + Nueva entrada
          </button>
        </div>
      )}

      {loading && <p>Cargando noticias...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && posts.length === 0 && (
        <p>No hay artículos publicados por el momento.</p>
      )}

      <div className="row g-4">
        {!loading &&
          !error &&
          posts.map((post) => {
            const resumen =
              post.summary && post.summary.length > 140
                ? post.summary.slice(0, 140) + "..."
                : post.summary || "";

            return (
              <div key={post.id} className="col-md-4 d-flex">
                <div className="card flex-fill blog-card">
                  {post.imageUrl && (
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="card-img-top blog-card-img"
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {post.category || "Consejos saludables"}
                    </h6>
                    <p className="card-text">{resumen}</p>
                    {post.createdAt && (
                      <small className="text-muted">
                        Publicado el{" "}
                        {new Date(post.createdAt).toLocaleDateString("es-CL")}
                      </small>
                    )}

                    {isAdmin && (
                      <div className="mt-3">
                        <button
                          type="button"
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => handleEdit(post)}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(post.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
