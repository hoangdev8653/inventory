import { StatusCodes } from "http-status-codes";
import { productService } from "../services/products.js";

const getAllProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts();
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: products });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const id = req.query.id;
    const product = await productService.getProductById(id);
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: product });
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { name, code, description } = req.body;
    const product = await productService.createProduct({
      name,
      code,
      description,
    });
    return res.status(StatusCodes.CREATED).json({
      status: 201,
      message: "Tạo sản phẩm thành công",
      content: product,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const id = req.query.id;
    const product = await productService.deleteProduct(id);
    return res
      .status(StatusCodes.OK)
      .json({
        status: 200,
        message: "Xóa sản phẩm thành công",
        content: product,
      });
  } catch (error) {
    next(error);
  }
};

export const productController = {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
};
