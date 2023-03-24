export class CartDto {
  constructor({ timestamp, email, items, direccion }) {
    this.timestamp = timestamp;
    this.email = email;
    this.items = items;
    this.direccion = direccion;
  }
}
export function asDto(cart) {
  if (Array.isArray(cart)) return msjs.map((m) => new CartDto(m));
  else return new CartDto(cart);
}
