import fs from "fs";
import { v4 as uuidv4 } from "uuid";
export default class MessagesDaoFile {
  constructor(ruta) {
    this.ruta = ruta;
    this.mensajes = [];
  }

  async init() {
    try {
      await fs.promises.readFile(this.ruta, "utf-8");
    } catch (error) {
      await fs.promises.writeFile(this.ruta, "[]");
    }
  }

  disconnect() {
    console.log("mensajes dao en archivo -> cerrado");
  }
  getRandomId() {
    return uuidv4();
  }
  async #leerArchivo() {
    const texto = await fs.promises.readFile(this.ruta, "utf-8");
    this.mensajes = JSON.parse(texto);
  }

  async #escribirArchivo() {
    const texto = JSON.stringify(this.mensajes, null, 2);
    await fs.promises.writeFile(this.ruta, texto);
  }

  #getIndex(id) {
    return this.mensajes.findIndex((mensajes) => mensajes.id == id);
  }

  async getAll() {
    await this.#leerArchivo();
    return this.mensajes;
  }

  async getById(idBuscado) {
    await this.#leerArchivo();
    return this.mensajes[this.#getIndex(idBuscado)];
  }

  async getBySearch(filter) {
    await this.#leerArchivo();
    let campo = Object.keys(filter)[0];
    let valor = Object.values(filter)[0];
    let find = this.mensajes.find((prod) => prod[campo] == valor);
    return find;
  }

  async create(newMsg) {
    await this.#leerArchivo();
    newMsg.id = this.getRandomId();
    this.mensajes.push(newMsg);
    await this.#escribirArchivo();
    return newMsg;
  }

  async delete(idParaBorrar) {
    await this.#leerArchivo();
    const [borrada] = this.mensajes.splice(this.#getIndex(idParaBorrar), 1);
    await this.#escribirArchivo();
    return borrada;
  }

  async deleteAll() {
    this.mensajes = [];
    await this.#escribirArchivo();
  }

  async modify(idParaReemplazar, newMsg) {
    await this.#leerArchivo();
    const index = this.#getIndex(idParaReemplazar);
    const actualizada = { ...this.mensajes[index], ...newMsg };
    this.mensajes.splice(index, 1, actualizada);
    await this.#escribirArchivo();
    return actualizada;
  }
}
