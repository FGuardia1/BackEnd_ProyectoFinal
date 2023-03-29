import express from "express";
const routerViews = express.Router();

import { isValidAuthToken } from "../middlewars/index.js";

import { renderHome } from "../controller/vistas.controller.js";
import { proyectConfig } from "../../utils/configs/config.js";

routerViews.get("/home", isValidAuthToken, renderHome);

routerViews.get("/chat", isValidAuthToken, (req, res, next) => {
  let admin = true;
  res.render("chat", { email: req.user.email, admin });
});

routerViews.get("/", (req, res, next) => {
  res.redirect("login");
});

routerViews.get("/login", (req, res, next) => {
  res.render("login");
});

routerViews.get("/register", (req, res, next) => {
  res.render("register");
});

routerViews.get("/failregister", (req, res) => {
  res.render("register-error");
});
routerViews.get("/faillogin", (req, res) => {
  res.render("login-error");
});

routerViews.get("/info", (req, res, next) => {
  res.render("info-server", {
    argumentos: process.argv,
    nombrePlataforma: process.platform,
    versionNode: process.version,
    memoria: process.resourceUsage().maxRSS,
    pathEjec: process.execPath,
    IdProceso: process.pid,
    carpetaProy: process.cwd(),
  });
});
routerViews.get("/errorServer", (req, res, next) => {
  let mensaje = decodeURIComponent(req.query.error);
  res.render("server-error", {
    error: mensaje,
  });
});

routerViews.get("/infoEntorno", (req, res, next) => {
  res.render("info-entorno", {
    port: proyectConfig.PORT,
    persistencia: proyectConfig.PERSISTENCIA,
    serviceExt: proyectConfig.SERVICE_EXT,
    modo: proyectConfig.MODO,
  });
});

export default routerViews;
