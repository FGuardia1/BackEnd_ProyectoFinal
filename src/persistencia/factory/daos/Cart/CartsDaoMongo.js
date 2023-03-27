import mongoose from "mongoose";
import { proyectConfig } from "../../../../../utils/configs/config.js";
const DB_URL = proyectConfig.URL_MONGO_ATLAS;

import logger from "../../../../../utils/logger.js";
export default class CartsDaoMongo {
  constructor(collection) {
    this.collection = collection;
  }

  async init() {
    await mongoose.connect(DB_URL);
    logger.info("conectado mongo Cart");
  }

  async create(data) {
    let newElem = await this.collection.create(data);
    return newElem._id;
  }

  async getById(id) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      return await this.collection.findOne({ _id: id });
    } else {
      return null;
    }
  }

  async getBySearch(filter) {
    let res = await this.collection.find(filter).lean();

    return res;
  }
  async getAll() {
    return await this.collection.find().lean();
  }

  async modify(id, data) {
    let result = await this.collection.updateMany({ _id: id }, { $set: data });
    return data;
  }

  async delete(id) {
    await this.collection.deleteOne({ _id: id });
  }
}
