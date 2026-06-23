import express from "express";
import { sessionController } from "../container";
import isAdminMiddleware from "../../middlewares/IsAdmin";
import authMiddleware from "../../middlewares/auth";
import upload from "../../middlewares/upload";
 
const router = express.Router();
 
router.post(
  "/:courseId",
  authMiddleware,
  isAdminMiddleware,
  upload.single("video"),
  sessionController.create
);
 
router.get(
  "/",
  sessionController.getAll
);
 router.get(
  "/:id",
  authMiddleware,
  sessionController.getById
);
router.get(
  "/courses/:courseId",
  sessionController.getByCourse
);
 
router.put(
  "/:id",
  authMiddleware,
  isAdminMiddleware,
  sessionController.update
);
 
router.delete(
  "/:id",
  authMiddleware,
  isAdminMiddleware,
  sessionController.delete
);
 
export default router;