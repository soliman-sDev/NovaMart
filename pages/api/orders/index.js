import { getToken } from "next-auth/jwt";
import Order from "@/models/Order";
import db from "@/Utils/db";

const handler = async (req, res) => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
if (!token) {
  return res.status(401).send("signin required");
}


  await db.connect();
  const newOrder = new Order({
    ...req.body,
    user: token._id,
  });

  const order = await newOrder.save();
  res.status(201).send(order);
};
export default handler;
