import Orden from "../modelos/Orden.js";

import OrdenesDaoFactory from "../factory/daos/Orden/OrdenesDaoFactory.js";
import { asDto } from "../factory/dtos/OrdenDTO.js";

let instancia = null;

export default class OrdenesRepo {
  #dao;

  constructor() {
    this.#dao = OrdenesDaoFactory.getDao();
  }

  async getAll() {
    const ordenes = await this.#dao.getAll();
    return ordenes.map((m) => new Orden(m));
  }

  async getById(idBuscado) {
    const dto = await this.#dao.getById(idBuscado);
    return new Orden(dto);
  }

  async getBySearch(filter) {
    const dto = await this.#dao.getBySearch(filter);
    if (dto) return new Orden(dto);
    else return null;
  }

  async create(OrdenNew) {
    let newElement = await this.#dao.create(asDto(OrdenNew));
  }

  async removeById(idBuscado) {
    await this.#dao.deleteById(idBuscado);
  }

  async removeAll() {
    await this.#dao.deleteAll();
  }

  async modify(idParaReemplazar, modificates) {
    let updprod = await this.#dao.modify(idParaReemplazar, modificates);
  }

  static getInstancia = () => {
    if (!instancia) instancia = new OrdenesRepo();
    return instancia;
  };
}
