import { getDb } from "@/app/server/config/mongodb";
import { IProduct, IProductQuery } from "@/types/products";
import { ObjectId } from "mongodb";

export default class Product {
  static getCollection() {
    const collection = getDb().collection<IProduct>("products");
    return collection;
  }

  static async getAllProducts(options: IProductQuery = {}) {
    const collection = this.getCollection();
    const { page = 1, limit = 10, search, filter, sort } = options;
    const skip = (page - 1) * limit;

    const dbQuery: Record<string, any> = {
      ...(search && { name: { $regex: search, $options: "i" } }),
      ...(filter && { tags: { $in: filter.split(",") } }),
    };

    const sortOptions: Record<string, Record<string, 1 | -1>> = {
      "price-asc": { price: 1 },
      "price-desc": { price: -1 },
      "name-asc": { name: 1 },
      "name-desc": { name: -1 },
    };

    const sortQuery = (sort && sortOptions[sort]) || { _id: -1 };

    return await collection
      .find(dbQuery)
      .sort(sortQuery as any)
      .skip(skip)
      .limit(limit)
      .toArray();
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
