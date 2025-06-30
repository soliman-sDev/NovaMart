import db from "@/Utils/db";
import Product from "@/models/Product";


const handler = async (req, res) => {
  await db.connect();
  const products = await Product.find({
    name: { $regex: req.query.search, $options: "i" },
  });
  await db.disconnect();
  res.send(products);
};

export default handler;