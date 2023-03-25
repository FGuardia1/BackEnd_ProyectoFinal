import logger from "../../utils/logger.js";
import { JWT_UTILS } from "../../utils/jwt-utils.js";
import {
  comprobarCarrito,
  crearCarritoRegistro,
} from "../negocio/login.business.js";
const logOut = (req, res) => {
  try {
    res.clearCookie("tokenCookie");
    res.render("logout");
  } catch (error) {
    logger.error(error.message);
  }
};

const login = async (req, res) => {
  let email = req.user.email;

  comprobarCarrito(email);
  const { user } = req;
  const token = JWT_UTILS.createToken(user.toJSON(), "secret");
  res.cookie("tokenCookie", token, { maxAge: 1000 * 60 });
  res.redirect("/home");
};

const register = async (req, res) => {
  let emailUser = req.user.email;
  let address = req.user.address;
  let datosEmail = req.body;

  crearCarritoRegistro(emailUser, address, datosEmail);

  res.redirect("/login");
};

export { register, login, logOut };
