import ProductosRepo from "../persistencia/repos/ProductsRepo.js";

const prodsRepo = ProductosRepo.getInstancia();

export const obtenerProductos = async (idProd) => {
  if (idProd) return await prodsRepo.getById(idProd);
  else return await prodsRepo.getAll();
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

  prodsRepo.add({
    nombre,
    descripcion,
    foto,
    precio,
    stock,
    codigo,
    timestamp,
  });
};

export const modificarProducto = async (id, producto) => {
  await prodsRepo.modify(id, producto);
};

export const eliminarProducto = async (id) => {
  await prodsRepo.removeById(id);
};
