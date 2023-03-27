import { crearOrden } from "../negocio/orden.business.js";
export const createOrden = async (req, res) => {
  try {
    const { name, email, telephone } = req.user;
    await crearOrden({ name, email, telephone });

    res.status(200).send({ mensaje: "Orden creada" });
  } catch (error) {
    let errorMsg = encodeURIComponent(error.message);
    res.status(500).send({ error: errorMsg });
  }
};
