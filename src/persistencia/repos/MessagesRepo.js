import Message from "../modelos/Message.js";

import MessagesDaoFactory from "../factory/daos/Message/MessagesDaoFactory.js";
import { asDto } from "../factory/dtos/MessageDTO.js";

let instancia = null;

export default class MessagesRepo {
  #dao;

  constructor() {
    this.#dao = MessagesDaoFactory.getDao();
  }

  async getAll() {
    const messages = await this.#dao.getAll();
    if (messages) return messages.map((m) => new Message(m));
    return null;
  }

  async getById(idBuscado) {
    const dto = await this.#dao.getById(idBuscado);
    if (dto) return new Message(dto);
    return null;
  }

  async getBySearch(search) {
    const messages = await this.#dao.getBySearch(search);
    return messages.map((m) => new Message(m));
  }

  async add(msgNew) {
    let agregado = await this.#dao.create(asDto(msgNew));
    return new Message(agregado);
  }

  async removeById(idBuscado) {
    const removida = await this.#dao.delete(idBuscado);
  }

  async removeAll() {
    await this.#dao.deleteAll();
  }
  async modify(idParaReemplazar, newMsg) {
    let updMsg = await this.#dao.modify(idParaReemplazar, newMsg);
  }

  static getInstancia = () => {
    if (!instancia) instancia = new MessagesRepo();
    return instancia;
  };
}
