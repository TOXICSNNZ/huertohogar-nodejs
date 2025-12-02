import api from "../api/AxiosConfig";

class BlogService {
  getAllPosts() {
    return api.get("/blog");
  }

  getPostById(id) {
    return api.get(`/blog/${id}`);
  }

  createPost(post) {
    return api.post("/blog", post);
  }

  updatePost(id, post) {
    return api.put(`/blog/${id}`, post);
  }

  deletePost(id) {
    return api.delete(`/blog/${id}`);
  }
}

export default new BlogService();
