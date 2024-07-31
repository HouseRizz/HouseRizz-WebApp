import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { Product } from "@/models/Product";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("mydatabase");
  const collection = db.collection<Product>("products");

  switch (req.method) {
    case "GET":
      const products = await collection.find({}).toArray();
      res.status(200).json(products);
      break;

    case "POST":
      const newProduct: Product = req.body;
      await collection.insertOne(newProduct);
      res.status(201).json(newProduct);
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
