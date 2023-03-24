import express from "express";
const routerViews = express.Router();
import Authenticated from "../middlewars/index.js";
import { renderHome } from "../controller/vistas.controller.js";

routerViews.get("/home", Authenticated, renderHome);

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

export default routerViews;
