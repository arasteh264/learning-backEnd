import express from "express";
import { announcementController } from "../container";
import authMiddleware from "../../middlewares/auth";
import isAdminMiddleware from "../../middlewares/IsAdmin";

const router = express.Router();

router
  .route("/")
  .post(announcementController.create)
  .get(announcementController.getAll);

router
  .route("/:id")
  .put(announcementController.update)
  .delete(announcementController.delete);

router.patch(
  "/:id/status",
  announcementController.isActive
);
router.get("/active", announcementController.getActive);

export default router;