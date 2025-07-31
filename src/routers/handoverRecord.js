import express from "express";
import { handoverRecordController } from "../controllers/handoverRecords.js";
import validateToken from "../middlewares/auth.js";

const router = express.Router();

router.route("/").get(handoverRecordController.getAllHandoverRecords);
router.route("/getById").get(handoverRecordController.getHandoverRecordById);
router
  .route("/create")
  .post(validateToken, handoverRecordController.createHandoverRecord);
router
  .route("/getRecordByRole")
  .get(validateToken, handoverRecordController.getRecordByRole);
router
  .route("/signUserB")
  .patch(validateToken, handoverRecordController.signUserB);
router
  .route("/signRepresentativeA")
  .patch(validateToken, handoverRecordController.signRepresentativeA);
router
  .route("/signRepresentativeB")
  .patch(validateToken, handoverRecordController.signRepresentativeB);
router.route("/delete").delete(handoverRecordController.deleteHandoverRecord);

export default router;
