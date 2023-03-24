export default class Message {
  constructor({ email, tipo, date, _id, id, mensaje }) {
    this.tipo = tipo;
    this.email = email;
    this.date = date;
    this.id = _id || id;
    this.mensaje = mensaje;
  }
}
