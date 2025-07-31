import DepartmentModel from "../models/department.js";
import HandoverRecordModel from "../models/handoverRecord.js";

const getAllHandoverRecords = async () => {
  return await HandoverRecordModel.find()
    .populate("department_a")
    .populate("department_b")
    .populate("user_a")
    .populate("user_b")
    .populate("representative_a")
    .populate("representative_b");
};

const getHandoverRecordById = async (id) => {
  const record = await HandoverRecordModel.findById(id)
    .populate("department_a", "name representativeId")
    .populate("department_b", "name representativeId")
    .populate("user_a", "username email phone departmentId role")
    .populate("user_b", "username email phone departmentId role")
    .populate("representative_a", "username email phone departmentId role")
    .populate("representative_b", "username email phone departmentId role");

  if (!record) {
    throw new Error("Không tìm thấy biên bản");
  }

  return {
    id: record._id,
    so_ky_hieu: record.so_ky_hieu,
    can_cu: record.can_cu,
    handover_date: record.handover_date,
    note: record.note,
    status: record.status,

    department_a: {
      id: record.department_a._id,
      name: record.department_a.name,
    },
    department_b: {
      id: record.department_b._id,
      name: record.department_b.name,
    },

    user_a: {
      id: record.user_a._id,
      name: record.user_a.username,
      email: record.user_a.email,
      phone: record.user_a.phone,
    },
    user_b: {
      id: record.user_b._id,
      name: record.user_b.username,
      email: record.user_b.email,
      phone: record.user_b.phone,
    },

    representative_a: {
      id: record.representative_a._id,
      name: record.representative_a.username,
      email: record.representative_a.email,
      phone: record.representative_a.phone,
    },
    representative_b: {
      id: record.representative_b._id,
      name: record.representative_b.username,
      email: record.representative_b.email,
      phone: record.representative_b.phone,
    },

    user_a_signed: record.user_a_signed,
    user_b_signed: record.user_b_signed,
    representative_a_signed: record.representative_a_signed,
    representative_b_signed: record.representative_b_signed,

    user_a_signed_at: record.user_a_signed_at,
    user_b_signed_at: record.user_b_signed_at,
    representative_a_signed_at: record.representative_a_signed_at,
    representative_b_signed_at: record.representative_b_signed_at,
  };
};

const getRecordByRole = async (userId) => {
  try {
    console.log(userId);

    const record = await HandoverRecordModel.find()
      .populate("department_a")
      .populate("department_b")
      .populate("user_a")
      .populate("user_b")
      .populate("representative_a")
      .populate("representative_b");
    return record;
  } catch (error) {
    throw new Error("Error: " + error.message);
  }
};

const createHandoverRecord = async (
  userId,
  { so_ky_hieu, can_cu, department_a, department_b, user_b, note }
) => {
  const now = new Date();
  try {
    const departmentA = await DepartmentModel.findById(department_a);
    const departmentB = await DepartmentModel.findById(department_b);
    if (!departmentA || !departmentB) {
      throw new Error("One or both departments do not exist");
    }
    const representative_a = departmentA.representativeId;
    const representative_b = departmentB.representativeId;
    const newHandoverRecord = HandoverRecordModel.create({
      so_ky_hieu,
      can_cu,
      handover_date: now,
      department_a,
      department_b,
      user_a: userId,
      user_b,
      representative_a: representative_a,
      representative_b: representative_b,
      note,
      user_a_signed_at: now,
    });
    return await newHandoverRecord;
  } catch (error) {
    throw new Error("Error creating handover record: " + error.message);
  }
};

const signUserB = async (userId, id) => {
  try {
    const record = await HandoverRecordModel.findById(id)
      .populate("user_b", "_id")
      .populate("user_a", "_id")
      .populate("representative_a", "_id")
      .populate("representative_b", "_id");

    if (!record) {
      throw new Error("Không tìm thấy biên bản bàn giao");
    }
    if (record.user_b._id.toString() !== userId.toString()) {
      throw new Error("Bạn không có quyền ký biên bản này");
    }
    if (record.user_b_signed) {
      throw new Error("Bạn đã ký biên bản này rồi");
    }
    if (record.status !== "Chờ người nhận ký") {
      throw new Error("Chưa đến lượt bạn ký biên bản này");
    }
    const now = new Date();
    const updated = await HandoverRecordModel.findByIdAndUpdate(
      id,
      {
        user_b_signed: true,
        user_b_signed_at: now,
        status: "Chờ đại diện bên A ký",
      },
      { new: true }
    );
    return updated;
  } catch (error) {
    throw error;
  }
};

const signRepresentativeA = async (userId, id) => {
  try {
    const record = await HandoverRecordModel.findById(id).populate(
      "representative_a",
      "_id"
    );

    if (!record) {
      throw new Error("Không tìm thấy biên bản bàn giao");
    }
    if (record.representative_a._id.toString() !== userId.toString()) {
      throw new Error("Bạn không có quyền ký biên bản này");
    }
    if (record.representative_a_signed) {
      throw new Error("Bạn đã ký biên bản này rồi");
    }
    if (record.status !== "Chờ đại diện bên A ký") {
      throw new Error("Chưa đến lượt bạn ký biên bản này");
    }
    const now = new Date();
    const updated = await HandoverRecordModel.findByIdAndUpdate(
      id,
      {
        representative_a_signed: true,
        representative_a_signed_at: now,
        status: "Chờ đại diện bên B ký",
      },
      { new: true }
    );
    return updated;
  } catch (error) {
    throw error;
  }
};

const signRepresentativeB = async (userId, id) => {
  try {
    const record = await HandoverRecordModel.findById(id).populate(
      "representative_b",
      "_id"
    );

    if (!record) {
      throw new Error("Không tìm thấy biên bản bàn giao");
    }
    if (record.representative_b._id.toString() !== userId.toString()) {
      throw new Error("Bạn không có quyền ký biên bản này");
    }
    if (record.representative_b_signed) {
      throw new Error("Bạn đã ký biên bản này rồi");
    }
    if (record.status !== "Chờ đại diện bên B ký") {
      throw new Error("Chưa đến lượt bạn ký biên bản này");
    }
    const now = new Date();
    const updated = await HandoverRecordModel.findByIdAndUpdate(
      id,
      {
        representative_b_signed: true,
        representative_b_signed_at: now,
        status: "Hoàn thành",
      },
      { new: true }
    );
    return updated;
  } catch (error) {
    throw error;
  }
};

const deleteHandoverRecord = async (id) => {
  const result = await HandoverRecordModel.findByIdAndDelete(id);
  if (!result) {
    throw new Error("Handover record not found");
  }
  return result;
};

export const handoverRecordService = {
  getAllHandoverRecords,
  getHandoverRecordById,
  getRecordByRole,
  createHandoverRecord,
  signUserB,
  signRepresentativeA,
  signRepresentativeB,
  deleteHandoverRecord,
};
