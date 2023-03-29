import CartsRepo from "../persistencia/repos/CartsRepo.js";
const cartsRepo = CartsRepo.getInstancia();
import OrdenesRepo from "../persistencia/repos/OrdenRepo.js";
const ordenesRepo = OrdenesRepo.getInstancia();
import { proyectConfig } from "../../utils/configs/config.js";
import { enviarMailPedido } from "../services/sendEmail.js";
import { sendmsj, sendwsp } from "../services/sendToPhone.js";

export const crearOrden = async ({ name, email, telephone }) => {
  let timestamp = new Date();
  let cart = await cartsRepo.getBySearch({
    email,
  });
  cart = cart[0];
  let ordenes = await ordenesRepo.getAll();

  let newOrden = {
    items: cart.items,
    numeroOrden: ordenes.length,
    timestamp,
    estado: "Generada",
    email,
  };

  await ordenesRepo.create(newOrden);

  if (proyectConfig.SERVICE_EXT == "YES") {
    await enviarMailPedido({ name, email, lista: cart.items });
    await sendmsj(telephone);
    await sendwsp({ name, email });
  }
  cart.items = [];
  await cartsRepo.modify(cart.id, cart);
};
