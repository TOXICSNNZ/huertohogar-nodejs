import React, { useEffect, useState } from "react";
import BlogService from "../../services/BlogService";
import { useAuth } from "../../context/AuthContext";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    summary: "",
    content: "",
    imageUrl: "",
  });

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

  function resetForm() {
    setEditingPost(null);
    setShowForm(false);
    setFormData({
      title: "",
      category: "",
      summary: "",
      content: "",
      imageUrl: "",
    });
  }

  function handleCreate() {
    setEditingPost(null);
    setShowForm(true);
    setFormData({
      title: "",
      category: "",
      summary: "",
      content: "",
      imageUrl: "",
    });
  }

  function handleEdit(post) {
    setEditingPost(post);
    setShowForm(true);
    setFormData({
      title: post.title || "",
      category: post.category || "",
      summary: post.summary || "",
      content: post.content || "",
      imageUrl: post.imageUrl || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

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

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.title.trim()) return alert("El título es obligatorio.");
    if (!formData.category.trim()) return alert("La categoría es obligatoria.");
    if (!formData.summary.trim()) return alert("El resumen es obligatorio.");
    if (!formData.content.trim()) return alert("El contenido es obligatorio.");

    if (formData.summary.length > 500) {
      return alert("El resumen no debe superar 500 caracteres.");
    }
    if (formData.content.length > 4000) {
      return alert("El contenido no debe superar 4000 caracteres.");
    }

    try {
      if (editingPost) {
        await BlogService.updatePost(editingPost.id, formData);
        alert("Entrada actualizada");
      } else {
        await BlogService.createPost(formData);
        alert("Entrada creada");
      }

      resetForm();
      cargarPosts();
    } catch (err) {
      console.error(err);
      alert("No se pudo guardar la entrada (¿token/rol admin?).");
    }
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">
        Blog: alimentación saludable y sostenibilidad
      </h2>

      {isAdmin && (
        <>
          {!showForm && !editingPost && (
            <div className="text-end mb-3">
              <button className="btn btn-primary" onClick={handleCreate}>
                + Nueva entrada
              </button>
            </div>
          )}

          {showForm && (
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="mb-3">
                  {editingPost ? "✏️ Editar entrada" : "➕ Nueva entrada"}
                </h5>

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Título</label>
                      <input
                        className="form-control"
                        type="text"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Categoría</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Ej: Alimentación / Sostenibilidad"
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label">Resumen (máx. 500)</label>
                      <textarea
                        className="form-control"
                        rows={2}
                        value={formData.summary}
                        onChange={(e) =>
                          setFormData({ ...formData, summary: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label">Contenido (máx. 4000)</label>
                      <textarea
                        className="form-control"
                        rows={5}
                        value={formData.content}
                        onChange={(e) =>
                          setFormData({ ...formData, content: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label">URL Imagen</label>
                      <input
                        className="form-control"
                        type="text"
                        value={formData.imageUrl}
                        onChange={(e) =>
                          setFormData({ ...formData, imageUrl: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="mt-3 d-flex gap-2">
                    <button type="submit" className="btn btn-success">
                      {editingPost ? "Guardar cambios" : "Crear entrada"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={resetForm}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
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
