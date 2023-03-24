export default class Cart {
  constructor({ timestamp, email, items, _id, id, direccion }) {
    this.timestamp = timestamp;
    this.email = email;
    this.items = items;
    this.id = _id || id;
    this.direccion = direccion;
  }
}
