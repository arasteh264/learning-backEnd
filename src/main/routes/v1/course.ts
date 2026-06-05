import express from "express";
import * as courseController from "../../controllers/v1/course";
import authMiddleware from "../../middlewares/auth";
import isAdminMiddleware from "../../middlewares/IsAdmin";
import uploader from "../../middlewares/upload";

const router = express.Router();

// برای دریافت لیست کلی دوره
router
  .route("/")
  .get(authMiddleware, isAdminMiddleware, courseController.getAllCourse);

// برای ایجاد جلسات
router.route("/:id/session").post(
  authMiddleware,
  isAdminMiddleware,
  uploader.single("video"),
  courseController.createSession
);

// برای دریافت لیست session ها
router
  .route("/session")
  .get(authMiddleware, isAdminMiddleware, courseController.getAllSession);

// دریافت ویدیو و فایل هر جلسه
router
  .route("/session/:id")
  .get(authMiddleware, isAdminMiddleware, courseController.getSessionDetail)
  .delete(authMiddleware, isAdminMiddleware, courseController.removeSession)
  .put(
    authMiddleware,
    isAdminMiddleware,
    uploader.single("video"),
    courseController.updateSession
  );

// برای ایجاد دوره
router.route("/").post(
  authMiddleware,
  isAdminMiddleware,
  uploader.single("cover"),
  courseController.createCourse
);

router
  .route("/:id")
  .get(authMiddleware, isAdminMiddleware, courseController.getCourseDetail)
  .delete(authMiddleware, isAdminMiddleware, courseController.removeCourse)
  .patch(
    authMiddleware,
    isAdminMiddleware,
    uploader.single("cover"),
    courseController.updateCourse
  );

export default router;