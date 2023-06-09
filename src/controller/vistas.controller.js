import ProductosRepo from "../persistencia/repos/ProductsRepo.js";
const prodsRepo = ProductosRepo.getInstancia();
import CartsRepo from "../persistencia/repos/CartsRepo.js";
const cartsRepo = CartsRepo.getInstancia();
import logger from "../../utils/logger.js";
import { obtenerCategoriasList } from "../negocio/vistas.business.js";
export const renderHome = async (req, res) => {
  const { name, avatar_path, email } = req.user;

  try {
    const products = await prodsRepo.getAll();
    let cart = await cartsRepo.getBySearch({
      email,
    });
    let categoriasList = obtenerCategoriasList(products);

    cart = cart[0];
    let listaCarrito = cart.items;

    res.render("products", {
      products,
      name,
      listaCarrito,
      avatar_path,
      email,
      categoriasList,
    });
  } catch (error) {
    logger.error(error.message);
    let errorMsg = encodeURIComponent(error.message);
    res.redirect("/errorServer/?error=" + errorMsg);
  }
};
