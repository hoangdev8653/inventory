// import { StatusCodes } from "http-status-codes";
// import { handoverItemService } from "../services/handoverItems.js";

// const getAllHandoverItem = async (req, res, next) => {
//   try {
//     const handoverItem = await handoverItemService.getAllHandoverItem();
//     return res
//       .status(StatusCodes.OK)
//       .json({ status: 200, message: "Xử lý thành công", content: products });
//   } catch (error) {
//     next(error);
//   }
// };

// const getHandoverItemById = async (req, res, next) => {
//   try {
//     const id = req.query.id;
//     const handoverItem = await handoverItemService.getHandoverItemById(id);
//     return res
//       .status(StatusCodes.OK)
//       .json({ status: 200, message: "Xử lý thành công", content: product });
//   } catch (error) {
//     next(error);
//   }
// };

// const createHandoverItem = async (req, res, next) => {
//   try {
//     const { name, price, description } = req.body;
//     const product = await handoverItemService.createHandoverItem(
//       name,
//       price,
//       description
//     );
//     return res.status(StatusCodes.CREATED).json({
//       status: 201,
//       message: "Tạo sản phẩm thành công",
//       content: product,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// const deleteHandoverItem = async (req, res, next) => {
//   try {
//     const id = req.query.id;
//     const handoverItem = await handoverItemService.deleteHandoverItem(id);
//     return res.status(StatusCodes.OK).json({
//       status: 200,
//       message: "Xóa sản phẩm thành công",
//       content: handoverItem,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const handoverItemController = {
//   getAllHandoverItem,
//   getHandoverItemById,
//   createHandoverItem,
//   deleteHandoverItem,
// };
