export class MessageDto {
  constructor({ email, tipo, date, mensaje }) {
    this.tipo = tipo;
    this.email = email;
    this.date = date;
    this.mensaje = mensaje;
  }
}
export function asDto(msg) {
  if (Array.isArray(msg)) return msg.map((m) => new MessageDto(m));
  else return new MessageDto(msg);
}
