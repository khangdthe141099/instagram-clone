import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    profileImg: { type: String, required: false, default: "" },
    bio: { type: String, required: false, default: "" },
    is_private: { type: Boolean , required: false, default: false },
    media: { type: Array, required: false, default: [] },
    follower: { type: Array, required: false, default: [] },
    following: { type: Array, required: false, default: [] },
    external_url: { type: Array, required: false, default: [] }
  },
  {
    timestamps: true,
  }
);

const Users = models.user || model("user", userSchema);

export default Users;
