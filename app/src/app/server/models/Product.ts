import { getDb } from "@/app/server/config/mongodb";
import { IProduct } from "@/types/products";
import { ObjectId } from "mongodb";

export default class Product {
  static getCollection() {
    const collection = getDb().collection<IProduct>("products");
    return collection;
  }

  static async getAllProducts(
    page: number = 1,
    limit: number = 10,
    search?: string,
    filter?: string,
    sort?: string,
  ) {
    const collection = this.getCollection();
    const skip = (page - 1) * limit;

    const query: Record<string, any> = {};
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }
    if (filter) {
      query.tags = { $in: filter.split(",") };
    }
    let sortQuery: Record<string, 1 | -1> = { _id: -1 };
    if (sort === "price-asc") {
      sortQuery = { price: 1 };
    } else if (sort === "price-desc") {
      sortQuery = { price: -1 };
    } else if (sort === "name-asc") {
      sortQuery = { name: 1 };
    }

    return await collection
      .find(query)
      .sort(sortQuery)
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
