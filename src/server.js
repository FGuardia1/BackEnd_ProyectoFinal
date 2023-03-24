import express from "express";
import routerProduct from "./routes/products.router.js";
import routerCart from "./routes/cart.router.js";
import routerLogin from "./routes/loginLogout.router.js";
import routerViews from "./routes/vistas.router.js";
import routerOrden from "./routes/orden.router.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import * as strategy from "./passport/strategy.js";
import path from "path";
import { User } from "../utils/models/user.js";
import { proyectConfig, twilioConfig } from "../utils/configs/config.js";
import logger from "../utils/logger.js";
import { cpus } from "os";
import cluster from "cluster";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import { chatService } from "./chat_sockets/sockets.js";
import exphbs from "express-handlebars";
let cantCpus = cpus().length;

const MODO = proyectConfig.MODO;

const app = express();
const httpServer = new HttpServer(app);
const socketIo = new IOServer(httpServer);
chatService(socketIo);
const PORT = proyectConfig.PORT || 3000;
const dirname = `${process.cwd()}`;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(dirname, "public")));

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
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: proyectConfig.URL_MONGO_ATLAS,
      ttl: 600,
    }),
    secret: "sh",
    resave: false,
    saveUninitialized: false,
    rolling: false,
    cookie: {
      maxAge: 600000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(
  "login",
  new LocalStrategy({ passReqToCallback: true }, strategy.login)
);

passport.use(
  "register",
  new LocalStrategy({ passReqToCallback: true }, strategy.register)
);

passport.serializeUser((user, done) => {
  done(null, user._id || user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

app.use("/api/productos", routerProduct);
app.use("/api/carrito", routerCart);
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
        await mongoose.connect(
          proyectConfig.URL_MONGO_ATLAS + "&dbName=ecommerceBackend",
          {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          }
        );
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
      await mongoose.connect(
        proyectConfig.URL_MONGO_ATLAS + "&dbName=ecommerceBackend",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      );
      logger.info("DB mongo conectada");
    } catch (error) {
      logger.error(`Error en conexión de Base de datos: ${error}`);
    }
  });
  httpServer.on("error", (err) => logger.error(err));
}
