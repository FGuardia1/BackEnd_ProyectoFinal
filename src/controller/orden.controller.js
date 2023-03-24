import CartsRepo from "../persistencia/repos/CartsRepo.js";
const cartsRepo = CartsRepo.getInstancia();
import { enviarMailPedido } from "../services/sendEmail.js";
import { sendmsj, sendwsp } from "../services/sendToPhone.js";
import logger from "../../utils/logger.js";

import { crearOrden } from "../negocio/orden.business.js";
export const createOrden = async (req, res) => {
  const { name, email, telephone } = req.user;
  crearOrden({ name, email, telephone });
  res.status(200);
};
