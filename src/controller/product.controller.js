import {
  obtenerProductos,
  agregarProducto,
  modificarProducto,
  eliminarProducto,
  obtenerXcategorias,
} from "../negocio/productos.business.js";

import logger from "../../utils/logger.js";

const getProducts = async (req, res) => {
  try {
    let resp = await obtenerProductos(req.params.id);

    if (resp) res.status(200).send(resp);
    else res.status(502).send({ Mensaje: "No encontrado" });
  } catch (error) {
    logger.error(error.message);
    let errorMsg = encodeURIComponent(error.message);
    res.status(500).send({ error: errorMsg });
  }
};

const getCategory = async (req, res) => {
  try {
    let categoria = req.params.categoria;
    res.send(await obtenerXcategorias(categoria));
  } catch (error) {
    logger.error(error.message);
    let errorMsg = encodeURIComponent(error.message);
    res.status(500).send({ error: errorMsg });
  }
};

const addProduct = async (req, res) => {
  try {
    let resp = await agregarProducto(req.body);
    if (resp) {
      res.status(200).send("Producto agregado");
    } else {
      res.status(402).send("No se pude crear el producto");
    }
  } catch (error) {
    logger.error(error.message);
    let errorMsg = encodeURIComponent(error.message);
    res.status(500).send({ error: errorMsg });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const producto = req.body;

    let resp = await modificarProducto(id, producto);
    if (resp) {
      res.status(200).send("Producto modificado");
    } else {
      res.status(402).send("No se pudo modificar el producto");
    }
  } catch (error) {
    logger.error(error.message);
    let errorMsg = encodeURIComponent(error.message);
    res.status(500).send({ error: errorMsg });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    let resp = await eliminarProducto(id);
    if (resp) {
      res.status(200).send("Producto eliminado");
    } else {
      res.status(402).send("No se pudo eliminar el producto");
    }
  } catch (error) {
    logger.error(error.message);
    let errorMsg = encodeURIComponent(error.message);
    res.status(500).send({ error: errorMsg });
  }
};

export { getProducts, addProduct, updateProduct, deleteProduct, getCategory };
