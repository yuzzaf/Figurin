import { getDb } from "@/app/server/config/mongodb";
import { ObjectId } from "mongodb";

export interface IWishlist {
  _id?: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  createdAt?: string;
  updatedAt?: string;
}

export default class Wishlist {
  static getCollection() {
    return getDb().collection<IWishlist>("wishlists");
  }

  static async getWishlistByUserId(userId: string) {
    const collection = this.getCollection();

    const wishlistItems = await collection
      .aggregate([
        {
          $match: { userId: new ObjectId(userId) },
        },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $unwind: "$product",
        },
        {
          $project: {
            _id: 1,
            productId: 1,
            userId: 1,
            product: 1,
          },
        },
      ])
      .toArray();

    return wishlistItems;
  }

  static async addToWishlist(userId: string, productId: string) {
    const collection = this.getCollection();

    // Check if already exists
    const existing = await collection.findOne({
      userId: new ObjectId(userId),
      productId: new ObjectId(productId),
    });

    if (existing) {
      return { message: "Item already in wishlist" };
    }

    const result = await collection.insertOne({
      userId: new ObjectId(userId),
      productId: new ObjectId(productId),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return result;
  }

  static async removeFromWishlist(userId: string, productId: string) {
    const collection = this.getCollection();

    const result = await collection.deleteOne({
      userId: new ObjectId(userId),
      productId: new ObjectId(productId),
    });

    return result;
  }
}
