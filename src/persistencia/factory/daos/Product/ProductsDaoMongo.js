import mongoose from "mongoose";
import { asDto } from "../../dtos/ProductDTO.js";
import { proyectConfig } from "../../../../../utils/configs/config.js";
const DB_URL = proyectConfig.URL_MONGO_ATLAS;
import logger from "../../../../../utils/logger.js";

export default class ProductsDaoMongo {
  constructor(collection) {
    this.collection = collection;
  }

  async init() {
    await mongoose.connect(DB_URL);
    logger.info("conectado mongo producto");
  }

  async create(data) {
    await this.collection.create(data);
    return true;
  }

  async getById(id) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      return asDto(await this.collection.findOne({ _id: id }));
    } else {
      return null;
    }
  }

  async getBySearch(filter) {
    return asDto(await this.collection.find(filter).lean());
  }

  async getAll() {
    return asDto(await this.collection.find().lean());
  }

  async modify(id, data) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      let res = await this.collection.update({ _id: id }, { $set: data });
      if (res.matchedCount == 0) return false;
      else return true;
    } else {
      return null;
    }
  }

  async delete(id) {
    let res = await this.collection.deleteOne({ _id: id });
    if (res.deletedCount == 0) return false;
    return true;
  }

  async deleteAll() {
    await this.collection.deleteMany({});
    return true;
  }
}
