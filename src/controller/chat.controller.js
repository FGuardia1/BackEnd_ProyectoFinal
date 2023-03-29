import { obtenerMsgsEmail, agregarMsgs } from "../negocio/chat.business.js";

import logger from "../../utils/logger.js";
const getMsgs = async (req, res) => {
  try {
    let email = req.params.email;
    let resp = await obtenerMsgsEmail(email);
    if (resp) res.status(200).send(resp);
    else res.status(502).send({ Mensaje: "No encontrado" });
  } catch (error) {
    logger.error(error.message);
    let errorMsg = encodeURIComponent(error.message);
    res.status(500).send({ error: errorMsg });
  }
};

const addMsgs = async (req, res) => {
  try {
    let msg = req.body;
    await agregarMsgs(msg);
    res.status(200).send("Mensaje agregado");
  } catch (error) {
    logger.error(error.message);
    let errorMsg = encodeURIComponent(error.message);
    res.status(500).send({ error: errorMsg });
  }
};

export { getMsgs, addMsgs };
