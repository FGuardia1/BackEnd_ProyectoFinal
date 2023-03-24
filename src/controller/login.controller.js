import CartsRepo from "../persistencia/repos/CartsRepo.js";
const cartsRepo = CartsRepo.getInstancia();

import { enviarMailRegistro } from "../services/sendEmail.js";
import logger from "../../utils/logger.js";

import {
  comprobarCarrito,
  crearCarritoRegistro,
} from "../negocio/login.business.js";
const logOut = (req, res) => {
  try {
    req.logout(req.user, (err) => {
      if (err) return next(err);
      res.render("logout");
    });
  } catch (error) {
    logger.error(error.message);
  }
};

const login = async (req, res) => {
  let userId = req.session.passport.user;
  comprobarCarrito(userId);

  res.redirect("/home");
};

const register = async (req, res) => {
  let emailUser = req.user.email;
  let address = req.user.address;
  let datosEmail = req.body;

  crearCarritoRegistro(emailUser, address, datosEmail);

  res.redirect("/home");
};

export { register, login, logOut };
