import express from "express";
import { sessionController } from "../container";
import isAdminMiddleware from "../../middlewares/IsAdmin";
import authMiddleware from "../../middlewares/auth";
 
const router = express.Router();
 
router.post(
  "/:courseId",
  authMiddleware,
  isAdminMiddleware,
  sessionController.create
);
 
router.get(
  "/",
  sessionController.getAll
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