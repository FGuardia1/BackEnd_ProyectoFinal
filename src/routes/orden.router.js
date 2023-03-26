import express from "express";
const routerOrden = express.Router();
import { createOrden } from "../controller/orden.controller.js";
import { isValidAuthToken } from "../middlewars/index.js";
routerOrden.post("/new", isValidAuthToken, createOrden);

export default routerOrden;
