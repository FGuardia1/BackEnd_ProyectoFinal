import fs from "fs";
import { v4 as uuidv4 } from "uuid";
export default class ProductsDaoFile {
  constructor(ruta) {
    this.ruta = ruta;
    this.productos = [];
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
    this.productos = JSON.parse(texto);
  }

  async #escribirArchivo() {
    const texto = JSON.stringify(this.productos, null, 2);
    await fs.promises.writeFile(this.ruta, texto);
  }

  #getIndex(id) {
    return this.productos.findIndex((productos) => productos.id == id);
  }

  async getAll() {
    await this.#leerArchivo();
    return this.productos;
  }

  async getById(idBuscado) {
    await this.#leerArchivo();
    return this.productos[this.#getIndex(idBuscado)];
  }

  async getBySearch(filter) {
    await this.#leerArchivo();
    let campo = Object.keys(filter)[0];
    let valor = Object.values(filter)[0];
    let find = this.productos.find((prod) => prod[campo] == valor);
    return find;
  }

  async create(newProd) {
    await this.#leerArchivo();
    newProd.id = this.getRandomId();
    this.productos.push(newProd);
    await this.#escribirArchivo();
    return newProd;
  }

  async delete(idParaBorrar) {
    await this.#leerArchivo();
    const [borrada] = this.productos.splice(this.#getIndex(idParaBorrar), 1);
    await this.#escribirArchivo();
    return borrada;
  }

  async deleteAll() {
    this.productos = [];
    await this.#escribirArchivo();
  }

  async modify(idParaReemplazar, newProduct) {
    await this.#leerArchivo();
    const index = this.#getIndex(idParaReemplazar);
    const actualizada = { ...this.productos[index], ...newProduct };
    this.productos.splice(index, 1, actualizada);
    await this.#escribirArchivo();
    return actualizada;
  }
}
