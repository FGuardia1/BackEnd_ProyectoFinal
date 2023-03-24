import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export default class CartsDaoFile {
  constructor(ruta) {
    this.ruta = ruta;
    this.carts = [];
  }

  async init() {
    try {
      await fs.promises.readFile(this.ruta, "utf-8");
    } catch (error) {
      await fs.promises.writeFile(this.ruta, "[]");
    }
  }

  disconnect() {
    console.log("productos dao en archivo -> cerrado");
  }

  getRandomId() {
    return uuidv4();
  }

  async #leerArchivo() {
    const texto = await fs.promises.readFile(this.ruta, "utf-8");
    this.carts = JSON.parse(texto);
  }

  async #escribirArchivo() {
    const texto = JSON.stringify(this.carts, null, 2);
    await fs.promises.writeFile(this.ruta, texto);
  }

  #getIndex(id) {
    return this.carts.findIndex((carts) => carts.id == id);
  }

  async getAll() {
    await this.#leerArchivo();
    return this.carts;
  }

  async getById(idBuscado) {
    await this.#leerArchivo();
    return this.carts[this.#getIndex(idBuscado)];
  }

  async getBySearch(filter) {
    await this.#leerArchivo();
    let campo = Object.keys(filter)[0];
    let valor = Object.values(filter)[0];
    let find = this.carts.find((prod) => prod[campo] == valor);
    return find;
  }

  async create(newCart) {
    await this.#leerArchivo();
    newCart.id = this.getRandomId();
    this.carts.push(newCart);
    await this.#escribirArchivo();
    return newCart;
  }

  async delete(idParaBorrar) {
    await this.#leerArchivo();
    const [borrada] = this.carts.splice(this.#getIndex(idParaBorrar), 1);
    await this.#escribirArchivo();
    return borrada;
  }

  async deleteAll() {
    this.carts = [];
    await this.#escribirArchivo();
  }

  async modify(idParaReemplazar, newProduct) {
    await this.#leerArchivo();
    const index = this.#getIndex(idParaReemplazar);
    const actualizada = { ...this.carts[index], ...newProduct };
    this.carts.splice(index, 1, actualizada);
    await this.#escribirArchivo();
    return actualizada;
  }
}
