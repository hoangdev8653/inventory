import DepartmentModel from "../models/department.js";

const getAllDepartments = async () => {
  return await DepartmentModel.find({});
};

const getDepartmentById = async (id) => {
  console.log("Fetching department by ID:", id);

  const department = await DepartmentModel.findById(id);
  if (!department) {
    throw new Error("Department not found");
  }
  return department;
};

const createDepartment = async ({ name }) => {
  const newDepartment = await DepartmentModel.create({ name });
  return newDepartment;
};

const updateRepresentative = async (id, { representativeId }) => {
  const department = await DepartmentModel.findById(id);
  if (!department) {
    throw new Error("Department not found");
  }
  const updatedDepartment = await DepartmentModel.findByIdAndUpdate(
    id,
    { representativeId },
    { new: true }
  );
  return updatedDepartment;
};

const deleteDepartment = async (id) => {
  const result = await DepartmentModel.findByIdAndDelete(id);
  if (!result) {
    throw new Error("Department not found");
  }
  return result;
};

export const departmentService = {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateRepresentative,
  deleteDepartment,
};
