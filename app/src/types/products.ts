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

export interface IProductQuery {
  page?: number;
  limit?: number;
  search?: string;
  filter?: string;
  sort?: string;
}

export interface IProductPublic extends IProduct {
  _id: ObjectId;
}
