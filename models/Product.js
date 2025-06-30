import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  countInStock: { type: Number, required: true, default: 0 },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;