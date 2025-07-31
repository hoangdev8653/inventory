import express from "express";
import { handoverItemController } from "../controllers/handoverItems.js";

const router = express.Router();

router.route("/").get(handoverItemController.getAllHandoverItem);
router.route("/getById").get(handoverItemController.getHandoverItemById);
router.route("/create").post(handoverItemController.createHandoverItem);
router.route("/delete").delete(handoverItemController.deleteHandoverItem);

export default router;
