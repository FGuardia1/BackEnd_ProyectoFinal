import mongoose, { Mongoose } from "mongoose";
const carritosCollection = "carritos";
const carritosSchema = new mongoose.Schema({
  timestamp: { type: String },
  email: String,
  items: [
    {
      nombre: String,
      precio: Number,
      foto: String,
      cantidad: Number,
      id: String,
    },
  ],
  direccion: String,
});
const carritos = new mongoose.model(carritosCollection, carritosSchema);
export default carritos;
