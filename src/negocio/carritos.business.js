import ProductosRepo from "../persistencia/repos/ProductsRepo.js";
const prodsRepo = ProductosRepo.getInstancia();

import CartsRepo from "../persistencia/repos/CartsRepo.js";

const cartsRepo = CartsRepo.getInstancia();
export const obtenerListadoCarrito = async (id) => {
  let cart = await cartsRepo.getById(id);
  return cart.items;
};

export const buscarCarritoXuser = async (email) => {
  let cart = await cartsRepo.getBySearch({
    email,
  });
  return cart[0];
};

export const eliminarCarrito = async (id) => {
  await cartsRepo.removeById(id);
};

export const crearCarrito = async (userEmail, direccionUser) => {
  let timestamp = new Date().toLocaleString();
  let items = [];

  let newCartId = await cartsRepo.add({
    timestamp,
    productos: items,
    email: userEmail,
    direccion: direccionUser,
  });
  return newCartId;
};

export const agregarProdAcarrito = async (idCart, idProd) => {
  let carrito = await cartsRepo.getById(idCart);
  let producto = await prodsRepo.getById(idProd);
  let { nombre, precio, foto } = producto;
  let id = producto.id;
  let cantidad = 1;
  //verifico si el producto esta en carrito
  let indexBusq = carrito.items.findIndex((p) => p.id == producto.id);
  if (indexBusq == -1) {
    carrito.items.push({ id, nombre, precio, cantidad, foto });
  } else {
    let cantAnt = carrito.items[indexBusq].cantidad;
    carrito.items[indexBusq].cantidad = Number(cantAnt) + 1;
  }

  cartsRepo.modify(idCart, carrito);
  return carrito.items;
};

export const quitarProdCarrito = async (idCart, idProd) => {
  let carrito = await cartsRepo.getById(idCart);

  carrito.items = carrito.items.filter((el) => el.id != idProd);

  cartsRepo.modify(idCart, carrito);
  return carrito;
};

export const vaciarCarrito = async (idCart) => {
  let carrito = await cartsRepo.getById(idCart);
  carrito.items = [];
  cartsRepo.modify(idCart, carrito);
};
