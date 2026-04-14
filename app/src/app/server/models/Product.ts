import { getDb } from "@/app/server/config/mongodb";
import { IProduct } from "@/types/products";
import { ObjectId } from "mongodb";

export default class Product {
  static getCollection() {
    const collection = getDb().collection<IProduct>("Products");
    return collection;
  }

  static async getAllProducts() {
    const collection = this.getCollection();
    return await collection.find().toArray();
  }

  static async getProductById(id: string) {
    const collection = this.getCollection();

    const product = await collection.findOne({ _id: new ObjectId(id) });

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  }
}
