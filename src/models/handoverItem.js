import mongoose from "mongoose";

const HandoverItemSchema = new mongoose.Schema({
  handoverRecordId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HandoverRecord",
  },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: Number,
  unit: String,
  condition: String,
  note: String,
});

const HandoverItemModel = mongoose.model("HandoverItem", HandoverItemSchema);
export default HandoverItemModel;
