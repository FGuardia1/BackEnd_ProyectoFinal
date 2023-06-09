import express from "express";
import routerProduct from "./routes/products.router.js";
import routerCart from "./routes/cart.router.js";
import routerLogin from "./routes/loginLogout.router.js";
import routerViews from "./routes/vistas.router.js";
import routerOrden from "./routes/orden.router.js";
import routerChat from "./routes/chat.router.js";
import cookieParser from "cookie-parser";
import * as helmet from "helmet";
import mongoose from "mongoose";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import * as strategy from "./passport/strategy.js";
import path from "path";

import { proyectConfig } from "../utils/configs/config.js";
import logger from "../utils/logger.js";
import { cpus } from "os";
import cluster from "cluster";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import { chatService } from "./chat_sockets/sockets.js";
import exphbs from "express-handlebars";

let cantCpus = cpus().length;
//si el server se va a ejecutar como NODE O CLUSTER
const MODO = proyectConfig.MODO;
const PORT = proyectConfig.PORT || 3000;
const dirname = `${process.cwd()}`;
const app = express();
const httpServer = new HttpServer(app);
const socketIo = new IOServer(httpServer);

//Asigno todas las el socket a las funcionalidades de mi chat
chatService(socketIo);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(dirname, "public")));
//para permitir leer url de imagenes de otro server
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.set("view engine", "handlebars");
app.set("views", path.join(dirname, "src/views/view"));
app.engine(
  "handlebars",
  exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(dirname, "src", "views", "layouts"),
    partialsDir: path.join(dirname, "src", "views", "partials"),
  })
);

app.use(cookieParser());

app.use(passport.initialize());
passport.use(
  "login",
  new LocalStrategy({ passReqToCallback: true }, strategy.login)
);

passport.use(
  "register",
  new LocalStrategy({ passReqToCallback: true }, strategy.register)
);

app.use("/api/productos", routerProduct);
app.use("/api/carrito", routerCart);
app.use("/api/chat", routerChat);
app.use("/login", routerLogin);
app.use("/api/pedido", routerOrden);
app.use("/", routerViews);

app.use("*", (req, res) => {
  res.send("Pagina no encontrada");
});

if (MODO == "CLUSTER") {
  if (cluster.isPrimary) {
    for (let index = 0; index < cantCpus; index++) {
      cluster.fork();
    }
  } else {
    httpServer.listen(PORT, async () => {
      logger.info(`Servidor corriendo en puerto: ${PORT}`);
      try {
        await mongoose.connect(proyectConfig.URL_MONGO_ATLAS, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        logger.info("DB mongo conectada");
      } catch (error) {
        logger.error(`Error en conexión de Base de datos: ${error}`);
      }
    });
    httpServer.on("error", (err) => logger.error(err));
  }
} else {
  httpServer.listen(PORT, async () => {
    logger.info(`Servidor corriendo en puerto: ${PORT}`);
    try {
      await mongoose.connect(proyectConfig.URL_MONGO_ATLAS, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      logger.info("DB mongo conectada");
    } catch (error) {
      logger.error(`Error en conexión de Base de datos: ${error}`);
    }
  });
  httpServer.on("error", (err) => logger.error(err));
}
