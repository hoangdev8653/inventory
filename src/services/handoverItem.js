import HandoverItemModel from "../models/handoverItem.js";

const getAllHandoverItem = async () => {
  return await HandoverItemModel.find()
    .populate("productId")
    .populate("handoverRecordId");
};

const getHandoverItemById = async (id) => {
  const handoverItem = await HandoverItemModel.findById(id).populate(
    "productId"
  );
  if (!handoverItem) {
    throw new Error("Handover item not found");
  }
  return handoverItem;
};

const createHandoverItem = async ({
  handoverRecordId,
  productId,
  quantity,
  unit,
  condition,
  note,
}) => {
  const newHandoverItem = await HandoverItemModel.create({
    handoverRecordId,
    productId,
    quantity,
    unit,
    condition,
    note,
  });
  return newHandoverItem;
};

const deleteHandoverItem = async (id) => {
  const handoverItem = await HandoverItemModel.findByIdAndDelete(id);
  if (!handoverItem) {
    throw new Error("Handover item not found");
  }
  return handoverItem;
};

export const handoverItemService = {
  getAllHandoverItem,
  getHandoverItemById,
  createHandoverItem,
  deleteHandoverItem,
};
