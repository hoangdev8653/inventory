import mongoose from "mongoose";

const HandoverRecordSchema = new mongoose.Schema({
  so_ky_hieu: String,
  can_cu: String,
  handover_date: Date,

  department_a: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  department_b: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },

  user_a: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  user_b: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  representative_a: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  representative_b: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  user_a_signed: { type: Boolean, default: false },
  user_b_signed: { type: Boolean, default: false },
  representative_a_signed: { type: Boolean, default: false },
  representative_b_signed: { type: Boolean, default: false },

  status: {
    type: String,
    enum: [
      "Chờ người giao ký",
      "Chờ người nhận ký",
      "Chờ đại diện bên nhận ký",
      "Hoàn thành",
    ],
    default: "Chờ người giao ký",
  },

  note: String,
});

const HandoverRecordModel = mongoose.model(
  "HandoverRecord",
  HandoverRecordSchema
);
export default HandoverRecordModel;
