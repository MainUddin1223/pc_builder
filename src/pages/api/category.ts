import type { NextApiRequest, NextApiResponse } from "next";
import { Details } from "../../types/types";
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
      const products = await componentsCollection.find({}).toArray();
        const uniqueCategoriesSet = new Set(
          products.map((product:Details) => product.category)
        );
        const uniqueCategories = Array.from(uniqueCategoriesSet);
      res.send({ message: "success", status: 200, data: uniqueCategories });
    }
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
export default run;

// const handler = (req, res) => {
//   res.send({ mesage: "server created sucessfuly" });
// };
// export default handler;
