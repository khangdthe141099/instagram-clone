import { Schema, model, models } from "mongoose";

const postSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    postUrl: { type: Array },
    likes: { type: Array },
    comments: { type: Array },
    postDesc: { type: String },
  },
  {
    timestamps: true,
  }
);

const Posts = models.post || model("post", postSchema);

export default Posts;
