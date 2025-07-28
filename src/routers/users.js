import express from "express";
import { userController } from "../controllers/users.js";

const router = express.Router();

router.route("/").get(userController.getAllUsers);
router.route("/getById").get(userController.getUserById);
router.route("/register").post(userController.register);
router.route("/login").post(userController.login);
router.route("/updateRole").put(userController.updateRole);
router.route("/updateDepartment").patch(userController.updateDepartment);
router.route("/refreshToken").post(userController.refreshToken);
router.route("/delete").delete(userController.deleteUser);

export default router;
