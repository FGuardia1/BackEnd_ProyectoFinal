import express from "express";
const routerLogInOut = express.Router();
import passport from "passport";
import multer from "multer";

import { register, logOut, login } from "../controller/login.controller.js";

const myStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/avatars");
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}_${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: myStorage });

routerLogInOut.get("/logout", logOut);

routerLogInOut.post(
  "/",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  login
);

routerLogInOut.post(
  "/register",
  upload.single("myFile"),
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  register
);

export default routerLogInOut;
