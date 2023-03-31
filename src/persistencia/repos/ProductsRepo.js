import Producto from "../modelos/Product.js";

import ProductsDaoFactory from "../factory/daos/Product/ProductsDaoFactory.js";
import { asDto } from "../factory/dtos/ProductDTO.js";

let instancia = null;

export default class ProductosRepo {
  #dao;

  constructor() {
    this.#dao = ProductsDaoFactory.getDao();
  }

  async getAll() {
    const products = await this.#dao.getAll();
    if (products) return products.map((p) => new Producto(p));
    return null;
  }

  async getById(idBuscado) {
    const dto = await this.#dao.getById(idBuscado);
    if (dto) return new Producto(dto);
    return null;
  }

  async getBySearch(search) {
    const products = await this.#dao.getBySearch(search);
    return products.map((p) => new Producto(p));
  }

  async add(prodNew) {
    return await this.#dao.create(asDto(prodNew));
  }

  async removeById(idBuscado) {
    return await this.#dao.delete(idBuscado);
  }

  async removeAll() {
    return await this.#dao.deleteAll();
  }
  async modify(idParaReemplazar, newProduct) {
    return await this.#dao.modify(idParaReemplazar, newProduct);
  }

  static getInstancia = () => {
    if (!instancia) instancia = new ProductosRepo();
    return instancia;
  };
}
