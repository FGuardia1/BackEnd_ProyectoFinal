import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: String,
  password: String,
  name: String,
  address: String,
  age: Number,
  telephone: String,
  avatar_path: String,
});

export const User = mongoose.model("User", userSchema);
