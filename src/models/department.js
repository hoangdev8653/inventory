import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  representativeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});

const DepartmentModel = mongoose.model("Department", DepartmentSchema);
export default DepartmentModel;
