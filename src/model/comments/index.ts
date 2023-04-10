import { Schema, model, models } from "mongoose";

const commentSchema = new Schema(
  {
    userId: { type: String, required: false, default: "" },
    postId: { type: String, required: false, default: "" },
    content: { type: String, required: false, default: [] },
    likes: { type: Array, required: false, default: [] },
    replies: { type: Array, required: false, default: [] },
  },
  {
    timestamps: true,
  }
);

const Comments = models.comment || model("comment", commentSchema);

export default Comments;
