import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  code: String,
});

const ProductModel = mongoose.model("Product", ProductSchema);
export default ProductModel;
