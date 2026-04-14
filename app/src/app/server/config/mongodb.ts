import { Db, MongoClient } from "mongodb";

const uri: string = process.env.MONGODB_URI || "mongodb://localhost:27017";
const client: MongoClient = new MongoClient(uri);

const dbName: string = process.env.MONGODB_DBNAME || "";

let db: Db;

export function connect(): Db {
  db = client.db(dbName);
  return db;
}

export function getDb(): Db {
  if (!db) connect();
  return db;
}
