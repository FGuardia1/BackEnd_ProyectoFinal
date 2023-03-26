import express from "express";
import passport from "passport";
const routerProduct = express.Router();
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getCategory,
} from "../controller/product.controller.js";

routerProduct.get("/c/:categoria", getCategory);
routerProduct.get("/:id?", getProducts);

routerProduct.post("/", addProduct);

routerProduct.put("/:id", updateProduct);

routerProduct.delete("/:id", deleteProduct);

export default routerProduct;
