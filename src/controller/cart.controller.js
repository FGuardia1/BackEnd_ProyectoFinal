import logger from "../../utils/logger.js";

import ProductosRepo from "../persistencia/repos/ProductsRepo.js";
const prodsRepo = ProductosRepo.getInstancia();

import CartsRepo from "../persistencia/repos/CartsRepo.js";
const cartsRepo = CartsRepo.getInstancia();

import {
  obtenerListadoCarrito,
  buscarCarritoXuser,
  eliminarCarrito,
  crearCarrito,
  agregarProdAcarrito,
  quitarProdCarrito,
  vaciarCarrito,
} from "../negocio/carritos.business.js";

const getListProducts = async (req, res) => {
  let productos = await obtenerListadoCarrito(req.params.id);
  res.send(productos);
};

const getCartByUser = async (req, res) => {
  let email = req.user.email;
  let cart = await buscarCarritoXuser(email);

  res.send({ id: cart.id });
};

const deleteCart = (req, res) => {
  const id = req.params.id;

  eliminarCarrito(id);
  res.status(200).send("Carrito eliminado");
};

const createCart = async (req, res) => {
  let userEmail = req.session.passport.user;
  console.log(req);
  //let newCartId = await crearCarrito(userEmail);
  res.send({ id: newCartId });
};

const addProdToCart = async (req, res) => {
  const idCart = req.params.id;
  let { idProd } = req.body;

  let newList = await agregarProdAcarrito(idCart, idProd);

  res.status(200).send(newList);
};

const removeProduct = async (req, res) => {
  const idCart = req.params.id;
  const idProd = req.params.id_prod;
  quitarProdCarrito(idCart, idProd);
  res.status(200).send("Producto eliminado de carrito");
};

const clearCart = async (req, res) => {
  const idCart = req.params.id;
  vaciarCarrito(idCart);
  res.status(200).send("Carrito vaciado");
};

export {
  getListProducts,
  addProdToCart,
  getCartByUser,
  deleteCart,
  createCart,
  removeProduct,
  clearCart,
};
