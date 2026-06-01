import express from "express";
import * as teacherController from "../../controllers/v1/teacher";
import authMiddleware from "../../middlewares/auth";
import isAdminMiddleware from "../../middlewares/IsAdmin";

const router = express.Router();

router
  .route("/")
  .post(authMiddleware, isAdminMiddleware, teacherController.createTeacher)
  .get(authMiddleware, isAdminMiddleware, teacherController.getAllTeacher);

router
  .route("/request")
  .post(authMiddleware, teacherController.requestForTeacher);

router
  .route("/verify/:id")
  .post(authMiddleware, isAdminMiddleware, teacherController.verifyTeacher);

router
  .route("/expertises")
  .get(authMiddleware, teacherController.getExpertiseList);

router
  .route("/:id")
  .delete(authMiddleware, isAdminMiddleware, teacherController.removeTeacher);

router
  .route("/verifyed")
  .get(authMiddleware, isAdminMiddleware, teacherController.getVerifyTeachers);

export default router;