import logger from "../../utils/logger.js";

import ProductosRepo from "../persistencia/repos/ProductsRepo.js";
const prodsRepo = ProductosRepo.getInstancia();

import CartsRepo from "../persistencia/repos/CartsRepo.js";

const cartsRepo = CartsRepo.getInstancia();
export const obtenerListadoCarrito = async (id) => {
  try {
    let cart = await cartsRepo.getById(id);
    return cart.items;
  } catch (error) {
    logger.error(error.message);
  }
};

export const buscarCarritoXuser = async (email) => {
  try {
    let cart = await cartsRepo.getBySearch({
      email,
    });

    return cart;
  } catch (error) {
    logger.error(error.message);
  }
};

export const eliminarCarrito = (id) => {
  try {
    cartsRepo.removeById(id);
  } catch (error) {
    logger.error(error.message);
  }
};

export const crearCarrito = async (userEmail, direccionUser) => {
  let timestamp = new Date().toLocaleString();
  let items = [];

  try {
    let newCartId = await cartsRepo.add({
      timestamp,
      productos: items,
      email: userEmail,
      direccion: direccionUser,
    });
    return newCartId;
  } catch (error) {
    logger.error(error.message);
  }
};

export const agregarProdAcarrito = async (idCart, idProd) => {
  try {
    let carrito = await cartsRepo.getById(idCart);
    let producto = await prodsRepo.getById(idProd);
    let { nombre, precio, foto } = producto;
    let id = producto._id || producto.id;
    let cantidad = 1;
    carrito.items.push({ id, nombre, precio, cantidad, foto });
    cartsRepo.modify(idCart, carrito);
    return carrito.items;
  } catch (error) {
    logger.error(error.message);
  }
};

export const quitarProdCarrito = async (idCart, idProd) => {
  try {
    let carrito = await cartsRepo.getById(idCart);
    carrito.productos = carrito.productos.filter((el) => el.id != idProd);
    cartsRepo.modify(idCart, carrito);
  } catch (error) {
    logger.error(error.message);
  }
};

export const vaciarCarrito = async (idCart) => {
  try {
    let carrito = await cartsRepo.getById(idCart);
    carrito.items = [];
    cartsRepo.modify(idCart, carrito);
  } catch (error) {
    logger.error(error.message);
  }
};
