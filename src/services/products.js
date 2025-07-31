import ProductModel from "../models/product.js";

const getAllProducts = async () => {
  try {
    const products = await ProductModel.find({});
    return products;
  } catch (error) {
    throw error;
  }
};

const getProductById = async (id) => {
  const product = await ProductModel.findById(id);
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};

const createProduct = async ({ name, code, description }) => {
  const newProduct = await ProductModel.create({ name, code, description });
  return newProduct;
};

const deleteProduct = async (id) => {
  const result = await ProductModel.findByIdAndDelete(id);
  if (!result) {
    throw new Error("Product not found");
  }
  return result;
};

export const productService = {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
};
