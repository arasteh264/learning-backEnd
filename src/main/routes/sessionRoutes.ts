import express from "express";
import { sessionController } from "../container";
import isAdminMiddleware from "../../middlewares/IsAdmin";
import authMiddleware from "../../middlewares/auth";



const router = express.Router();

router.post(
  "/courses/:courseId/sessions",
  authMiddleware,
  isAdminMiddleware,
  sessionController.create
);

router.get(
  "/sessions",
  authMiddleware,
  sessionController.getAll
);

router.put(
  "/sessions/:id",
  authMiddleware,
  isAdminMiddleware,
  sessionController.update
);

router.delete(
  "/sessions/:id",
  authMiddleware,
  isAdminMiddleware,
  sessionController.delete
);

export default router;