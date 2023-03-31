import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { asDto } from "../../dtos/ProductDTO.js";
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

    return asDto(this.productos);
  }

  async getById(idBuscado) {
    await this.#leerArchivo();
    let indice = this.#getIndex(idBuscado);
    if (indice != -1) {
      return asDto(this.productos[indice]);
    } else return false;
  }

  async getBySearch(filter) {
    await this.#leerArchivo();
    let campo = Object.keys(filter)[0];
    let valor = Object.values(filter)[0];
    let find = this.productos.filter((prod) => prod[campo] == valor);
    return asDto(find);
  }

  async create(newProd) {
    await this.#leerArchivo();
    newProd.id = this.getRandomId();
    this.productos.push(newProd);
    await this.#escribirArchivo();
    return true;
  }

  async delete(idParaBorrar) {
    await this.#leerArchivo();
    let indice = this.#getIndex(idParaBorrar);
    if (indice != -1) {
      const [borrada] = this.productos.splice(indice, 1);
      await this.#escribirArchivo();
      return true;
    } else return false;
  }

  async deleteAll() {
    this.productos = [];
    await this.#escribirArchivo();
    return true;
  }

  async modify(idParaReemplazar, newProduct) {
    await this.#leerArchivo();
    let index = this.#getIndex(idParaReemplazar);
    if (index != -1) {
      const actualizada = { ...this.productos[index], ...newProduct };
      this.productos.splice(index, 1, actualizada);
      await this.#escribirArchivo();
      return true;
    } else {
      return false;
    }
  }
}
