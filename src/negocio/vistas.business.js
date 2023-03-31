export const obtenerCategoriasList = (products) => {
  let categoriasList = products
    .map(function (item, index) {
      return item.categoria;
    })
    .filter((item, index, arr) => arr.indexOf(item) === index);

  return categoriasList;
};
