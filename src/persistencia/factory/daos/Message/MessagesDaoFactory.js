import MessagesDaoFile from "./MessageDaoFile.js";
import MessagesDaoMongo from "./MessagesDaoMongo.js";
import { Message } from "../../../../../utils/models/message.js";
import { proyectConfig } from "../../../../../utils/configs/config.js";

const OPCION_DAO = proyectConfig.PERSISTENCIA;

const rutaArchivoMsgs = "./src/persistencia/DBs/mensajes.txt";

let dao;
switch (OPCION_DAO) {
  case "File":
    dao = new MessagesDaoFile(rutaArchivoMsgs);
    await dao.init();
    break;
  case "Mongo":
    dao = new MessagesDaoMongo(Message);
    await dao.init();
    break;
  default:
    dao = new MessagesDaoFile(rutaArchivoMsgs);
    await dao.init();
    break;
}
export default class MessagesDaoFactory {
  static getDao() {
    return dao;
  }
}
