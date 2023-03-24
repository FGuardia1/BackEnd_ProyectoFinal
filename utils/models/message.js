import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  email: String,
  tipo: String,
  date: String,
  mensaje: String,
});

export const Message = mongoose.model("message", messageSchema);
