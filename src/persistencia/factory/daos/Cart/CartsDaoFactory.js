import CartsDaoMongo from "./CartsDaoMongo.js";
import CartsDaoFile from "./CartsDaoFile.js";
const rutaArchivoCarts = "./src/persistencia/DBs/carritos.txt";
import carritos from "../../../../../utils/models/carritos.js";
import { proyectConfig } from "../../../../../utils/configs/config.js";
const OPCION_DAO = proyectConfig.PERSISTENCIA;

let dao;
switch (OPCION_DAO) {
  case "File":
    dao = new CartsDaoFile(rutaArchivoCarts);
    await dao.init();
    break;
  case "Mongo":
    dao = new CartsDaoMongo(carritos);
    await dao.init();
    break;
  default:
    dao = "new MsjsDaoFile(rutaArchivoProds);";
    await dao.init();
}
export default class CartsDaoFactory {
  static getDao() {
    return dao;
  }
}
