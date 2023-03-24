import OrdenesDaoMongo from "./CartsDaoMongo.js";
import OrdenesDaoFile from "./OrdenesDaoFile.js";
const rutaArchivoOrdenes = "./src/persistencia/DBs/ordenes.txt";
import ordenes from "../../../../../utils/models/ordenes.js";
import { proyectConfig } from "../../../../../utils/configs/config.js";
const OPCION_DAO = proyectConfig.PERSISTENCIA;

let dao;
switch (OPCION_DAO) {
  case "File":
    dao = new OrdenesDaoFile(rutaArchivoOrdenes);
    await dao.init();
    break;
  case "Mongo":
    dao = new OrdenesDaoMongo(ordenes);
    await dao.init();
    break;
  default:
    dao = "new MsjsDaoFile(rutaArchivoProds);";
    await dao.init();
}
export default class OrdenesDaoFactory {
  static getDao() {
    return dao;
  }
}
