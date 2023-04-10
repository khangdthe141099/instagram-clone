import { Schema, model, models } from "mongoose";

const postSchema = new Schema(
  {
    userId: { type: String, required: false },
    postUrl: { type: Array, required: false, default: [] },
    likes: { type: Array, required: false, default: [] },
    comments: { type: Array, required: false, default: [] },
    postDesc: { type: String, required: false, default: "" },
  },
  {
    timestamps: true,
  }
);

const Posts = models.post || model("post", postSchema);

export default Posts;
