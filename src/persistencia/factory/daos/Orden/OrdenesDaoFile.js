import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export default class OrdenesDaoFile {
  constructor(ruta) {
    this.ruta = ruta;
    this.orden = [];
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
    this.orden = JSON.parse(texto);
  }

  async #escribirArchivo() {
    const texto = JSON.stringify(this.orden, null, 2);
    await fs.promises.writeFile(this.ruta, texto);
  }

  #getIndex(id) {
    return this.orden.findIndex((orden) => orden.id == id);
  }

  async getAll() {
    await this.#leerArchivo();
    return this.orden;
  }

  async getById(idBuscado) {
    await this.#leerArchivo();
    return this.orden[this.#getIndex(idBuscado)];
  }

  async getBySearch(filter) {
    await this.#leerArchivo();
    let campo = Object.keys(filter)[0];
    let valor = Object.values(filter)[0];
    let find = this.orden.find((prod) => prod[campo] == valor);
    return find;
  }

  async create(newOrden) {
    await this.#leerArchivo();
    newOrden.id = this.getRandomId();
    this.orden.push(newOrden);
    await this.#escribirArchivo();
    return newOrden;
  }

  async delete(idParaBorrar) {
    await this.#leerArchivo();
    const [borrada] = this.orden.splice(this.#getIndex(idParaBorrar), 1);
    await this.#escribirArchivo();
    return borrada;
  }

  async deleteAll() {
    this.orden = [];
    await this.#escribirArchivo();
  }

  async modify(idParaReemplazar, modificated) {
    await this.#leerArchivo();
    const index = this.#getIndex(idParaReemplazar);
    const actualizada = { ...this.orden[index], ...modificated };
    this.orden.splice(index, 1, actualizada);
    await this.#escribirArchivo();
    return actualizada;
  }
}
