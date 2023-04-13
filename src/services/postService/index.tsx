import { publicRequest } from "../apiService";

class PostService {
  createPost(params: any) {
    return publicRequest.post("/api/post", params);
  }

  getAllPost() {
    return publicRequest.get("/api/post");
  }

  //[Post DETAILS]:
  getPostByPostId(params?: string) {
    if (!params) return;

    return publicRequest.get(`/api/post/${params}`);
  }

  //[List Post User]
  getPostByUserId(params?: string) {
    if (!params) return;

    return publicRequest.get(`/api/post/find/${params}`);
  }

  deletePost(params?: string) {
    if (!params) return;

    return publicRequest.delete(`/api/post/${params}`);
  }

  updatePost(id: string, params?: any) {
    return publicRequest.patch(`/api/post/${id}`, params);
  }
}

export const postService = new PostService();
