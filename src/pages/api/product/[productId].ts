import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://pc_builder:pc_builder@cluster0.kbyclso.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run(req: NextApiRequest, res: NextApiResponse) {
  try {
    await client.connect();
    const componentsCollection = client
      .db("pc_builder")
      .collection("components");
 if (req.method === "GET") {
   const { productId } = req.query;
   console.log(productId);
   const products = await componentsCollection.findOne({
     _id: new ObjectId(productId as string),
   });
   res.send({ message: "success", status: 200, data: products });
 }
  } finally {
  }
}
export default run;
