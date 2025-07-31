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

  user_a_signed: { type: Boolean, default: true },
  user_b_signed: { type: Boolean, default: false },
  representative_a_signed: { type: Boolean, default: false },
  representative_b_signed: { type: Boolean, default: false },

  status: {
    type: String,
    enum: [
      "Chờ người nhận ký",
      "Chờ đại diện bên A ký",
      "Chờ đại diện bên B ký",
      "Hoàn thành",
    ],
    default: "Chờ người nhận ký",
  },
  note: String,
  user_a_signed_at: { type: Date, default: null },
  user_b_signed_at: { type: Date, default: null },
  representative_a_signed_at: { type: Date, default: null },
  representative_b_signed_at: { type: Date, default: null },
});

const HandoverRecordModel = mongoose.model(
  "HandoverRecord",
  HandoverRecordSchema
);
export default HandoverRecordModel;
