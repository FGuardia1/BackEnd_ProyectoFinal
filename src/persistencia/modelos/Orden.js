export default class Orden {
  constructor({ timestamp, email, items, _id, id, estado, numeroOrden }) {
    this.timestamp = timestamp;
    this.email = email;
    this.items = items;
    this.id = _id || id;
    this.estado = estado;
    this.numeroOrden = numeroOrden;
  }
}
