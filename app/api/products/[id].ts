import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { Product } from "@/models/Product";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db("mydatabase");
  const collection = db.collection<Product>("products");
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      const product = await collection.findOne({
        _id: new ObjectId(id as string),
      });
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ error: "Product not found" });
      }
      break;

    case "PUT":
      const updatedProduct: Product = req.body;
      await collection.updateOne(
        { _id: new ObjectId(id as string) },
        { $set: updatedProduct }
      );
      res.status(200).json(updatedProduct);
      break;

    case "DELETE":
      await collection.deleteOne({ _id: new ObjectId(id as string) });
      res.status(204).end();
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
