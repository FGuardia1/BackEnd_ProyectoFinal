import express from "express";
const routerOrden = express.Router();
import { createOrden } from "../controller/orden.controller.js";
routerOrden.post("/new", createOrden);

export default routerOrden;
