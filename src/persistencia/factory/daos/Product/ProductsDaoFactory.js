import ProductsDaoFile from "./ProductsDaoFile.js";
import ProductsDaoMongo from "./ProductsDaoMongo.js";
import productos from "../../../../../utils/models/productos.js";
import { proyectConfig } from "../../../../../utils/configs/config.js";

const OPCION_DAO = proyectConfig.PERSISTENCIA;

const rutaArchivoProds = "./src/persistencia/DBs/productos.txt";

let dao;
switch (OPCION_DAO) {
  case "File":
    dao = new ProductsDaoFile(rutaArchivoProds);
    await dao.init();
    break;
  case "Mongo":
    dao = new ProductsDaoMongo(productos);
    await dao.init();
    break;
  default:
    dao = new ProductsDaoFile(rutaArchivoProds);
    await dao.init();
    break;
}
export default class ProductsDaoFactory {
  static getDao() {
    return dao;
  }
}
