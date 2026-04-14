import { ObjectId } from "mongodb";

export interface IUser {
  name: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserPublic extends IUser {
  _id: ObjectId;
}
