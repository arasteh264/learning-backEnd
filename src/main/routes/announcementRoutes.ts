import express from "express";
import { announcementController } from "../container";
import authMiddleware from "../../middlewares/auth";
import isAdminMiddleware from "../../middlewares/IsAdmin";

const router = express.Router();

router
  .route("/")
  .post(authMiddleware, isAdminMiddleware, announcementController.create)
  .get(authMiddleware, isAdminMiddleware,announcementController.getAll);

router
  .route("/:id")
  .put(authMiddleware, isAdminMiddleware, announcementController.update)
  .patch(authMiddleware, isAdminMiddleware, announcementController.isActive)
  .delete(authMiddleware, isAdminMiddleware, announcementController.delete);
  

export default router;