import { StatusCodes } from "http-status-codes";
import { handoverItemService } from "../services/handoverItem.js";

const getAllHandoverItem = async (req, res, next) => {
  try {
    const handoverItem = await handoverItemService.getAllHandoverItem();
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: handoverItem,
    });
  } catch (error) {
    next(error);
  }
};

const getHandoverItemById = async (req, res, next) => {
  try {
    const id = req.query.id;
    const handoverItem = await handoverItemService.getHandoverItemById(id);
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: handoverItem,
    });
  } catch (error) {
    next(error);
  }
};

const createHandoverItem = async (req, res, next) => {
  try {
    const { handoverRecordId, productId, quantity, unit, condition, note } =
      req.body;
    const HandoverItem = await handoverItemService.createHandoverItem({
      handoverRecordId,
      productId,
      quantity,
      unit,
      condition,
      note,
    });
    return res.status(StatusCodes.CREATED).json({
      status: 201,
      message: "Tạo sản phẩm thành công",
      content: HandoverItem,
    });
  } catch (error) {
    next(error);
  }
};

const deleteHandoverItem = async (req, res, next) => {
  try {
    const id = req.query.id;
    const handoverItem = await handoverItemService.deleteHandoverItem(id);
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xóa sản phẩm thành công",
      content: handoverItem,
    });
  } catch (error) {
    next(error);
  }
};

export const handoverItemController = {
  getAllHandoverItem,
  getHandoverItemById,
  createHandoverItem,
  deleteHandoverItem,
};
