import CartsRepo from "../persistencia/repos/CartsRepo.js";
const cartsRepo = CartsRepo.getInstancia();
import logger from "../../utils/logger.js";
//import { enviarMailRegistro } from "../services/sendEmail.js";
import { proyectConfig } from "../../utils/configs/config.js";

export const comprobarCarrito = async (email) => {
  let cart = await cartsRepo.getBySearch({
    email: email,
  });

  if (!cart) {
    let timestamp = new Date().toLocaleString();
    let productos = [];
    try {
      await cartsRepo.create({ timestamp, productos, email });
    } catch (error) {
      logger.error(error.message);
    }
  }
};

export const crearCarritoRegistro = async (userEmail, address, datosEmail) => {
  let timestamp = new Date().toLocaleString();
  let items = [];

  try {
    await cartsRepo.create({
      timestamp,
      direccion: address,
      items,
      email: userEmail,
    });

    if (proyectConfig.SERVICE_EXT == "YES") {
      console.log("se envio email registro");
      // enviarMailRegistro(datosEmail);
    }
  } catch (error) {
    logger.error(error);
  }
};
