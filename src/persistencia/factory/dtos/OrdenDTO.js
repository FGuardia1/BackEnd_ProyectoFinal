export class OrdenDto {
  constructor({ timestamp, email, items, estado, numeroOrden }) {
    this.timestamp = timestamp;
    this.email = email;
    this.items = items;
    this.estado = estado;
    this.numeroOrden = numeroOrden;
  }
}
export function asDto(orden) {
  if (Array.isArray(orden)) return msjs.map((m) => new OrdenDto(m));
  else return new OrdenDto(orden);
}
