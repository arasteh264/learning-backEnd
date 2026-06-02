import express from "express";
import { teacherController } from "../container";
import authMiddleware from "../../middlewares/auth";
import isAdminMiddleware from "../../middlewares/IsAdmin";

const router = express.Router();

router
  .route("/")
  .post(
    authMiddleware,
    isAdminMiddleware,
    teacherController.create
  )
  .get(
    authMiddleware,
    isAdminMiddleware,
    teacherController.getAll
  );

router.post(
  "/request",
  authMiddleware,
  teacherController.request
);

router.post(
  "/verify/:id",
  authMiddleware,
  isAdminMiddleware,
  teacherController.verify
);

router.get(
  "/expertises",
  authMiddleware,
  teacherController.getExpertiseList
);

router.delete(
  "/:id",
  authMiddleware,
  isAdminMiddleware,
  teacherController.remove
);

router.get(
  "/verified",
  authMiddleware,
  isAdminMiddleware,
  teacherController.getVerified
);

export default router;