import { StatusCodes } from "http-status-codes";
import { departmentService } from "../services/departments.js";

const getAllDepartments = async (req, res, next) => {
  try {
    const departments = await departmentService.getAllDepartments();
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: departments });
  } catch (error) {
    next(error);
  }
};

const getDepartmentById = async (req, res, next) => {
  try {
    const id = req.query.id;
    console.log("Fetching department with ID:", id);

    const department = await departmentService.getDepartmentById(id);
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: department });
  } catch (error) {
    next(error);
  }
};

const createDepartment = async (req, res, next) => {
  try {
    const { name } = req.body;
    const department = await departmentService.createDepartment({ name });
    return res.status(StatusCodes.CREATED).json({
      status: 201,
      message: "Tạo phòng ban thành công",
      content: department,
    });
  } catch (error) {
    next(error);
  }
};

const updateRepresentative = async (req, res, next) => {
  try {
    const id = req.query.id;
    const { representativeId } = req.body;
    const department = await departmentService.updateRepresentative(id, {
      representativeId,
    });
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Cập nhật đại diện phòng ban thành công",
      content: department,
    });
  } catch (error) {
    next(error);
  }
};

const deleteDepartment = async (req, res, next) => {
  try {
    const id = req.query.id;
    const department = await departmentService.deleteDepartment(id);
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xóa phòng ban thành công",
      content: department,
    });
  } catch (error) {
    next(error);
  }
};
export const departmentController = {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateRepresentative,
  deleteDepartment,
};
