import { getDb } from "@/app/server/config/mongodb";
import { comparePassword, hashPassword } from "../helpers/bcrypt";
import { ObjectId } from "mongodb";
import z from "zod";
import { IUser } from "@/types/users";
import { BadRequestError, UnauthorizedError } from "../helpers/customError";
import { signToken } from "../helpers/jwt";

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
    const collection = getDb().collection<IUser>("users");
    return collection;
  }

  static async getUserById(id: string) {
    const collection = this.getCollection();
    return await collection.findOne({ _id: new ObjectId(id) });
  }

  static async register(body: IUser): Promise<string> {
    userSchema.parse(body);

    const collection = this.getCollection();
    const user = await collection.findOne({ email: body.email });

    if (user) {
      throw new BadRequestError("User already exists");
    }

    body.password = hashPassword(body.password);

    await collection.insertOne({
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return "register berhasil";
  }

  static async login(email: string, password: string): Promise<string> {
    const collection = this.getCollection();
    const user = await collection.findOne({ email });

    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const isPasswordValid = comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const token = signToken<{ _id: ObjectId; email: string }>({
      _id: user._id,
      email: user.email,
    });

    return token;
  }
}
