// import { StatusCodes } from "http-status-codes";
// import { handoverRecords } from "../services/handoverRecords.js";

// const getAllHandoverRecords = async (req, res, next) => {
//   try {
//     const products = await handoverRecords.getAllHandoverRecords();
//     return res
//       .status(StatusCodes.OK)
//       .json({ status: 200, message: "Xử lý thành công", content: products });
//   } catch (error) {
//     next(error);
//   }
// };

// const getHandoverRecordById = async (req, res, next) => {
//   try {
//     const id = req.query.id;
//     const product = await handoverRecords.getHandoverRecordById(id);
//     return res
//       .status(StatusCodes.OK)
//       .json({ status: 200, message: "Xử lý thành công", content: product });
//   } catch (error) {
//     next(error);
//   }
// };

// const createHandoverRecord = async (req, res, next) => {
//   try {
//     const { name, price, description } = req.body;
//     const product = await handoverRecords.createHandoverRecord(
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

// const deleteHandoverRecord = async (req, res, next) => {
//   try {
//     const id = req.query.id;
//     const handoverRecord = await handoverRecords.deleteHandoverRecord(id);
//     return res
//       .status(StatusCodes.OK)
//       .json({
//         status: 200,
//         message: "Xóa sản phẩm thành công",
//         content: handoverRecord,
//       });
//   } catch (error) {
//     next(error);
//   }
// };

// export const productController = {
//   getAllHandoverRecords,
//   getHandoverRecordById,
//   createHandoverRecord,
//   deleteHandoverRecord,
// };
