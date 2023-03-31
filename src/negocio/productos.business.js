import ProductosRepo from "../persistencia/repos/ProductsRepo.js";

const prodsRepo = ProductosRepo.getInstancia();

export const obtenerProductos = async (idProd) => {
  if (idProd) return await prodsRepo.getById(idProd);
  else return await prodsRepo.getAll();
};

export const obtenerXcategorias = async (categoria) => {
  return await prodsRepo.getBySearch({ categoria: categoria });
};

export const agregarProducto = async (newProd) => {
  newProd.precio = Number(newProd.precio);

  newProd.timestamp = new Date().toLocaleString();

  return await prodsRepo.add(newProd);
};

export const modificarProducto = async (id, producto) => {
  return await prodsRepo.modify(id, producto);
};

export const eliminarProducto = async (id) => {
  return await prodsRepo.removeById(id);
};
