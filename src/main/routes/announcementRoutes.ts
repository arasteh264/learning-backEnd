import express from "express";
import { announcementController } from "../container";
import authMiddleware from "../../middlewares/auth";
import isAdminMiddleware from "../../middlewares/IsAdmin";

const router = express.Router();

router
  .route("/")
  .post(announcementController.create)
  .get(announcementController.getAll);

// ✅ patch و get /active باید قبل از /:id باشن
router.get("/active", announcementController.getActive);
router.patch("/:id/status", announcementController.isActive);

// /:id باید آخر باشه
router
  .route("/:id")
  .put(announcementController.update)
  .delete(announcementController.delete);

export default router;