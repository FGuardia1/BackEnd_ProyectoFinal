import logger from "../../utils/logger.js";
import { JWT_UTILS } from "../../utils/jwt-utils.js";
import {
  comprobarCarrito,
  crearCarritoRegistro,
} from "../negocio/login.business.js";
import { proyectConfig } from "../../utils/configs/config.js";

const logOut = (req, res) => {
  try {
    res.clearCookie("tokenCookie");
    res.render("logout");
  } catch (error) {
    logger.error(error.message);
    let errorMsg = encodeURIComponent(error.message);
    res.status(500).send({ error: errorMsg });
  }
};

const login = async (req, res) => {
  try {
    let { email, address } = req.user;
    let cantMin = Number(proyectConfig.TIME_SESSION);
    comprobarCarrito(email, address);
    const { user } = req;
    const token = JWT_UTILS.createToken(
      user.toJSON(),
      proyectConfig.TOKEN_SECRET_WORD
    );
    res.cookie("tokenCookie", token, {
      maxAge: 1000 * 60 * cantMin,
    });
    res.redirect("/home");
  } catch (error) {
    let errorMsg = encodeURIComponent(error.message);
    res.redirect("/errorServer/?error=" + errorMsg);
  }
};

const register = async (req, res) => {
  try {
    let emailUser = req.user.email;
    let address = req.user.address;
    let datosEmail = req.body;
    crearCarritoRegistro(emailUser, address, datosEmail);
    res.redirect("/login");
  } catch (error) {
    let errorMsg = encodeURIComponent(error.message);
    res.redirect("/errorServer/?error=" + errorMsg);
  }
};

export { register, login, logOut };
