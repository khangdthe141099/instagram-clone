import { publicRequest } from "../apiService";

class CommentService {
  createComment(params: any) {
    return publicRequest.post("/api/comment", params);
  }

  getAllComment() {
    return publicRequest.get("/api/comment");
  }

  getCommentByPostId(params: string) {
    return publicRequest.get(`/api/comment/${params}`);
  }
}

export const commentService = new CommentService();
