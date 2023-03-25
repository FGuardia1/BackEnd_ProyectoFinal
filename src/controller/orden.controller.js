import { crearOrden } from "../negocio/orden.business.js";
export const createOrden = async (req, res) => {
  const { name, email, telephone } = req.user;
  crearOrden({ name, email, telephone });
  res.status(200);
};
