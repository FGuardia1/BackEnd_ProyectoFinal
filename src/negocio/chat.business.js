import logger from "../../utils/logger.js";
import MessagesRepo from "../persistencia/repos/MessagesRepo.js";

const msgsRepo = MessagesRepo.getInstancia();

export const obtenerMsgsEmail = async (email) => {
  try {
    return await msgsRepo.getBySearch({ email });
  } catch (error) {
    logger.error(error.message);
  }
};

export const agregarMsgs = async (mensaje) => {
  try {
    await msgsRepo.add(mensaje);
  } catch (error) {
    logger.error(error.message);
  }
};
