import express from "express";
import { departmentController } from "../controllers/departments.js";

const router = express.Router();

router.route("/").get(departmentController.getAllDepartments);
router.route("/getById").get(departmentController.getDepartmentById);
router.route("/create").post(departmentController.createDepartment);
router
  .route("/updateDepartment")
  .patch(departmentController.updateRepresentative);
router.route("/delete").delete(departmentController.deleteDepartment);

export default router;
