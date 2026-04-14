import { ObjectId } from "mongodb";

export interface IProduct {
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface IProductPublic extends IProduct {
  _id: ObjectId;
}
