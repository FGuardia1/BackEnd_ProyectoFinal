import {
  obtenerProductos,
  agregarProducto,
  modificarProducto,
  eliminarProducto,
  obtenerXcategorias,
} from "../negocio/productos.business.js";

const getProducts = async (req, res) => {
  try {
    let resp = await obtenerProductos(req.params.id);

    if (resp) res.status(200).send(resp);
    else res.status(502).send({ Mensaje: "No encontrado" });
  } catch (error) {
    let errorMsg = encodeURIComponent(error.message);
    res.status(500).send({ error: errorMsg });
  }
};

const getCategory = async (req, res) => {
  try {
    res.send(await obtenerXcategorias(req.params.categoria));
  } catch (error) {
    let errorMsg = encodeURIComponent(error.message);
    res.status(500).send({ error: errorMsg });
  }
};

const addProduct = async (req, res) => {
  try {
    await agregarProducto(req.body);
    res.status(200).send("Producto agregado");
  } catch (error) {
    let errorMsg = encodeURIComponent(error.message);
    res.status(500).send({ error: errorMsg });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const producto = req.body;

    await modificarProducto(id, producto);
    res.status(200).send("Producto modificado");
  } catch (error) {
    let errorMsg = encodeURIComponent(error.message);
    res.status(500).send({ error: errorMsg });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    await eliminarProducto(id);
    res.status(200).send("Producto eliminado");
  } catch (error) {
    let errorMsg = encodeURIComponent(error.message);
    res.status(500).send({ error: errorMsg });
  }
};

export { getProducts, addProduct, updateProduct, deleteProduct, getCategory };
