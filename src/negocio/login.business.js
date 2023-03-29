import CartsRepo from "../persistencia/repos/CartsRepo.js";
const cartsRepo = CartsRepo.getInstancia();
import { enviarMailRegistro } from "../services/sendEmail.js";
import { proyectConfig } from "../../utils/configs/config.js";

export const comprobarCarrito = async (email, address) => {
  let cart = await cartsRepo.getBySearch({
    email: email,
  });
  //en caso de no encontrar un carrito de user, lo crea
  if (cart.length == 0) {
    let timestamp = new Date().toLocaleString();
    let items = [];
    await cartsRepo.create({ timestamp, items, email, direccion: address });
  }
};

export const crearCarritoRegistro = async (userEmail, address, datosEmail) => {
  let timestamp = new Date().toLocaleString();
  let items = [];

  await cartsRepo.create({
    timestamp,
    direccion: address,
    items,
    email: userEmail,
  });

  if (proyectConfig.SERVICE_EXT == "YES") {
    enviarMailRegistro(datosEmail);
  }
};
