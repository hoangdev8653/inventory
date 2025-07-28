import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  phone: String,
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    default: null,
  },
  role: {
    type: String,
    enum: ["employee", "representative", "admin"],
    default: "employee",
  },
});

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
