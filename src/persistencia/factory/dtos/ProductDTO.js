export class ProductDto {
  constructor({
    nombre,
    timestamp,
    descripcion,
    codigo,
    precio,
    stock,
    foto,
    categoria,
    id,
    _id,
  }) {
    (this.nombre = nombre),
      (this.timestamp = timestamp),
      (this.descripcion = descripcion),
      (this.codigo = codigo),
      (this.precio = precio),
      (this.stock = stock),
      (this.foto = foto);
    this.categoria = categoria;
    this.id = _id || id;
  }
}
export function asDto(prods) {
  if (Array.isArray(prods)) return prods.map((p) => new ProductDto(p));
  else return new ProductDto(prods);
}
