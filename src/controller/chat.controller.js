import { obtenerMsgsEmail, agregarMsgs } from "../negocio/chat.business.js";

const getMsgs = async (req, res) => {
  let email = req.params.email;
  let resp = await obtenerMsgsEmail(email);

  if (resp) res.status(200).send(resp);
  else res.status(502).send({ Mensaje: "No encontrado" });
};

const addMsgs = async (req, res) => {
  let msg = req.body;
  await agregarMsgs(msg);
  res.status(200).send("Producto agregado");
};

export { getMsgs, addMsgs };
