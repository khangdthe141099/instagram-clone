import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    email: { type: String, required: false, unique: true, default: "" },
    fullname: { type: String, required: false, default: "" },
    username: { type: String, required: false, default: "" },
    password: { type: String, required: false, default: "" },
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
