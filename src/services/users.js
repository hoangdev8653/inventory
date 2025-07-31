import UserModel from "../models/user.js";
import generateToken from "../utils/generateToken.js";
import { hashPassword, passwordMatch } from "../utils/hashPassword.js";

const getAllUsers = async () => {
  return await UserModel.find({});
};

const getUserById = async (id) => {
  const user = await UserModel.findById(id).populate({
    path: "departmentId",
    populate: {
      path: "representativeId",
      select: "_id username email",
    },
  });
  return user;
};

const register = async ({ username, email, password, phone }) => {
  const user = await UserModel.findOne({ email });
  if (user) {
    throw new Error("User already exists");
  }
  const hashedPassword = await hashPassword(password);
  const newUser = await UserModel.create({
    username,
    email,
    password: hashedPassword,
    phone,
  });
  return newUser;
};

const login = async (email, password) => {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await passwordMatch(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }
    const { accessToken, refreshToken } = generateToken(user._id);
    return { user, accessToken, refreshToken };
  } catch (error) {
    throw new Error("Login failed: " + error.message);
  }
};

const updateDepartment = async (id, { departmentId }) => {
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { departmentId },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    throw new Error("Update failed: " + error.message);
  }
};

const updateRole = async (userId, { role, id }) => {
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const updated = await UserModel.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    );
    return updated;
  } catch (error) {
    throw new Error("Update failed: " + error.message);
  }
};

const deleteUser = async (id) => {
  const user = await UserModel.findByIdAndDelete(id);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

export const userService = {
  getAllUsers,
  getUserById,
  updateDepartment,
  register,
  login,
  updateRole,
  deleteUser,
};
