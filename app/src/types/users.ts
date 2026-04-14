import { ObjectId } from "mongodb";

export interface IUser {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface IUserPublic extends IUser {
  _id: ObjectId;
}
