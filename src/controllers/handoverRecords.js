import { StatusCodes } from "http-status-codes";
import { handoverRecordService } from "../services/handoverRecords.js";

const getAllHandoverRecords = async (req, res, next) => {
  try {
    const products = await handoverRecordService.getAllHandoverRecords();
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: products });
  } catch (error) {
    next(error);
  }
};

const getHandoverRecordById = async (req, res, next) => {
  try {
    const id = req.query.id;
    const product = await handoverRecordService.getHandoverRecordById(id);
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: product });
  } catch (error) {
    next(error);
  }
};

const getRecordByRole = async (req, res, next) => {
  try {
    const userId = req.userId;
    const handoverRecord = await handoverRecordService.getRecordByRole(userId);
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: handoverRecord,
    });
  } catch (error) {
    next(error);
  }
};

const createHandoverRecord = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { so_ky_hieu, can_cu, department_a, department_b, user_b, note } =
      req.body;
    const product = await handoverRecordService.createHandoverRecord(userId, {
      so_ky_hieu,
      can_cu,
      department_a,
      department_b,
      user_b,
      note,
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

const signUserB = async (req, res, next) => {
  try {
    const userId = req.userId;
    const id = req.query.id;
    const handoverRecord = await handoverRecordService.signUserB(userId, id);
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: handoverRecord,
    });
  } catch (error) {
    next(error);
  }
};

const signRepresentativeA = async (req, res, next) => {
  try {
    const userId = req.userId;
    const id = req.query.id;
    const handoverRecord = await handoverRecordService.signRepresentativeA(
      userId,
      id
    );
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: handoverRecord,
    });
  } catch (error) {
    next(error);
  }
};

const signRepresentativeB = async (req, res, next) => {
  try {
    const userId = req.userId;
    const id = req.query.id;
    const handoverRecord = await handoverRecordService.signRepresentativeB(
      userId,
      id
    );
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: handoverRecord,
    });
  } catch (error) {
    next(error);
  }
};

const deleteHandoverRecord = async (req, res, next) => {
  try {
    const id = req.query.id;
    const handoverRecord = await handoverRecordService.deleteHandoverRecord(id);
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xóa sản phẩm thành công",
      content: handoverRecord,
    });
  } catch (error) {
    next(error);
  }
};

export const handoverRecordController = {
  getAllHandoverRecords,
  getHandoverRecordById,
  getRecordByRole,
  createHandoverRecord,
  signUserB,
  signRepresentativeA,
  signRepresentativeB,
  deleteHandoverRecord,
};
