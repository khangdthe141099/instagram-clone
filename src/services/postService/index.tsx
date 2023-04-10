import { publicRequest } from "../apiService";

class PostService {
  createPost(params: any) {
    return publicRequest.post("/api/post", params);
  }

  getAllPost() {
    return publicRequest.get("/api/post")
  }

  getPostByUserId(params?: string) {
    if(!params) return;

    return publicRequest.get(`/api/post/${params}`);
  }
}

export const postService = new PostService();
