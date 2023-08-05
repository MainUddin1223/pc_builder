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
    // Send a ping to confirm a successful connection
    const componentsCollection = client.db("pc_builder").collection("components");
    if (req.method === "GET") {
   const numberOfRandomDocuments = 6;

   const randomComponents = await componentsCollection
     .aggregate([{ $sample: { size: numberOfRandomDocuments } }])
     .toArray();
        res.send({ message: "success", status: 200, data: randomComponents });
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
