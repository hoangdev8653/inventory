import { StatusCodes } from "http-status-codes";
import { userService } from "../services/users.js";

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: users });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const id = req.query.id;
    const user = await userService.getUserById(id);
    return res
      .status(StatusCodes.OK)
      .json({ status: 200, message: "Xử lý thành công", content: user });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { username, email, password, phone } = req.body;
    const user = await userService.register({
      username,
      email,
      password,
      phone,
    });
    return res
      .status(StatusCodes.CREATED)
      .json({ status: 201, message: "Đăng ký thành công", content: user });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await userService.login(
      email,
      password
    );
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Đăng nhập thành công",
      content: user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

const updateDepartment = async (req, res, next) => {
  try {
    const id = req.query.id;
    const { departmentId } = req.body;
    const updatedUser = await userService.updateDepartment(id, {
      departmentId,
    });
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Cập nhật phòng ban thành công",
      content: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const { user, accessToken } = await userService.refreshToken(refreshToken);
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Làm mới token thành công",
      content: user,
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

const updateRole = async (req, res, next) => {
  try {
    const { userId, role } = req.body;
    const updatedUser = await userService.updateRole(userId, role);
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Cập nhật vai trò thành công",
      content: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.query.id;
    const user = await userService.deleteUser(id);
    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xóa người dùng thành công",
      content: user,
    });
  } catch (error) {
    next(error);
  }
};

export const userController = {
  getAllUsers,
  getUserById,
  updateDepartment,
  register,
  login,
  refreshToken,
  updateRole,
  deleteUser,
};
