import mongoose from "mongoose";
const productosCollection = "productos";
const productosSchema = new mongoose.Schema({
  nombre: { type: String },
  timestamp: { type: String },
  descripcion: { type: String },
  codigo: { type: String },
  precio: { type: Number },
  stock: { type: Number },
  foto: { type: String },
  categoria: { type: String },
});
const productos = new mongoose.model(productosCollection, productosSchema);
export default productos;
