import {
  obtenerListadoCarrito,
  buscarCarritoXuser,
  eliminarCarrito,
  crearCarrito,
  agregarProdAcarrito,
  quitarProdCarrito,
  vaciarCarrito,
} from "../negocio/carritos.business.js";

const getListProducts = async (req, res) => {
  try {
    let productos = await obtenerListadoCarrito(req.params.id);
    res.send(productos);
  } catch (error) {
    let errorMsg = encodeURIComponent(error.message);
    res.status(500).send({ error: errorMsg });
  }
};

const getCartByUser = async (req, res) => {
  try {
    let email = req.user.email;
    let cart = await buscarCarritoXuser(email);

    cart = cart[0];
    res.send({ id: cart.id });
  } catch (error) {
    let errorMsg = encodeURIComponent(error.message);
    res.status(500).send({ error: errorMsg });
  }
};

const deleteCart = (req, res) => {
  try {
    const id = req.params.id;
    eliminarCarrito(id);
    res.status(200).send("Carrito eliminado");
  } catch (error) {
    let errorMsg = encodeURIComponent(error.message);
    res.status(500).send({ error: errorMsg });
  }
};

const createCart = async (req, res) => {
  try {
    let userEmail = req.user;
    let newCartId = await crearCarrito(userEmail);
    res.send({ id: newCartId });
  } catch (error) {
    let errorMsg = encodeURIComponent(error.message);
    res.status(500).send({ error: errorMsg });
  }
};

const addProdToCart = async (req, res) => {
  try {
    const idCart = req.params.id;
    let { idProd } = req.body;
    let newList = await agregarProdAcarrito(idCart, idProd);

    res.status(200).send(newList);
  } catch (error) {
    let errorMsg = encodeURIComponent(error.message);
    res.status(500).send({ error: errorMsg });
  }
};

const removeProduct = async (req, res) => {
  try {
    const idCart = req.params.id;
    const idProd = req.params.id_prod;
    let modCart = await quitarProdCarrito(idCart, idProd);
    res.status(200).send(modCart.items);
  } catch (error) {
    let errorMsg = encodeURIComponent(error.message);
    res.status(500).send({ error: errorMsg });
  }
};

const clearCart = async (req, res) => {
  try {
    const idCart = req.params.id;
    vaciarCarrito(idCart);
    res.status(200).send("Carrito vaciado");
  } catch (error) {
    let errorMsg = encodeURIComponent(error.message);
    res.send(500).send({ error: errorMsg });
  }
};

export {
  getListProducts,
  addProdToCart,
  getCartByUser,
  deleteCart,
  createCart,
  removeProduct,
  clearCart,
};
