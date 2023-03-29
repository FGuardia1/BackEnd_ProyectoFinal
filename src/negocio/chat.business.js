import MessagesRepo from "../persistencia/repos/MessagesRepo.js";

const msgsRepo = MessagesRepo.getInstancia();

export const obtenerMsgsEmail = async (email) => {
  return await msgsRepo.getBySearch({ email });
};

export const agregarMsgs = async (mensaje) => {
  await msgsRepo.add(mensaje);
};
