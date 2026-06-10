import express from "express";
import { announcementController } from "../container";
import authMiddleware from "../../middlewares/auth";
import isAdminMiddleware from "../../middlewares/IsAdmin";

const router = express.Router();

router
  .route("/")
  .post(announcementController.create)
  .get(announcementController.getAll);

router.get("/active", announcementController.getActive);
router.patch("/:id/status", announcementController.isActive);

router
  .route("/:id")
  .put(announcementController.update)
  .delete(announcementController.delete)
  .get(announcementController.findById);

export default router;