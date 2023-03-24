import logger from "../../utils/logger.js";

import ProductosRepo from "../persistencia/repos/ProductsRepo.js";

const prodsRepo = ProductosRepo.getInstancia();

export const obtenerProductos = async (idProd) => {
  try {
    if (idProd) return await prodsRepo.getById(idProd);
    else return await prodsRepo.getAll();
  } catch (error) {
    logger.error(error.message);
  }
};

export const obtenerXcategorias = async (categoria) => {
  return await prodsRepo.getBySearch({ categoria: categoria });
};

export const agregarProducto = async ({
  nombre,
  descripcion,
  foto,
  precio,
  stock,
  codigo,
}) => {
  precio = Number(precio);

  let timestamp = new Date().toLocaleString();
  try {
    prodsRepo.add({
      nombre,
      descripcion,
      foto,
      precio,
      stock,
      codigo,
      timestamp,
    });
  } catch (error) {
    logger.error(error.message);
  }
};

export const modificarProducto = async (id, producto) => {
  try {
    await prodsRepo.modify(id, producto);
  } catch (error) {
    logger.error(error.message);
  }
};

export const eliminarProducto = async (id) => {
  try {
    await prodsRepo.removeById(id);
  } catch (error) {
    logger.error(error.message);
  }
};
