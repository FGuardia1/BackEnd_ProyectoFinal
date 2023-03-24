import mongoose, { Mongoose } from "mongoose";
const ordenesCollection = "ordenes";
const ordenesSchema = new mongoose.Schema({
  email: String,
  items: [
    {
      nombre: String,
      precio: Number,
      cantidad: Number,
      id: String,
    },
  ],
  direccion: String,
  timestamp: String,
  estado: String,
  numeroOrden: String,
});
const ordenes = new mongoose.model(ordenesCollection, ordenesSchema);
export default ordenes;
