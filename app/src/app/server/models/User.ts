import { getDb } from "@/app/server/config/mongodb";
import { comparePassword, hashPassword } from "../helpers/bcrypt";
import { ObjectId } from "mongodb";
import z from "zod";
import { IUser } from "@/types/users";

const userSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters long"),
  email: z.email().trim(),
  password: z
    .string()
    .trim()
    .min(5, "Password must be at least 5 characters long"),
});

export default class User {
  static getCollection() {
    const collection = getDb().collection<IUser>("Users");
    return collection;
  }

  static async getUserById(id: string) {
    const collection = this.getCollection();
    return await collection.findOne({ _id: new ObjectId(id) });
  }

  static async register(body: IUser): Promise<string> {
    userSchema.parse(body);

    body.password = hashPassword(body.password);

    const collection = this.getCollection();
    await collection.insertOne({
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return "register berhasil";
  }
}
