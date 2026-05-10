const express = require("express");
const courseController = require("../../controllers/v1/course");
const authMiddleware = require("../../middlewares/auth");
const isAdminMiddleware = require("../../middlewares/IsAdmin");
const uploader = require("../../utils/uploader");
const router = express.Router();

//برای دریافت لیست کلی دوره
router
  .route("/")
  .get(authMiddleware, isAdminMiddleware, courseController.getAllCourse);

//برای ایجاد جلسات
router.route("/:id/session").post(
  authMiddleware,
  isAdminMiddleware,
  uploader("session/videos").single("video"),
  courseController.createSession
);

//برای دریافت قسمت هایی که اپلود شدن
router
  .route("/session")
  .get(authMiddleware, isAdminMiddleware, courseController.getAllSession);

//دریافت ویديو و فایل پیوست هر جلسه از دوره
router
  .route("/session/:id")
  .get(authMiddleware, isAdminMiddleware, courseController.getSessionDetail)
  .delete(authMiddleware,isAdminMiddleware,courseController.removeSession)

//برای ایجاد دوره
router.route("/").post(
  authMiddleware,
  isAdminMiddleware,
  uploader("course/covers").single("cover"),
  courseController.createCourse
);


router
  .route("/:id")
  .get(
    authMiddleware,
    isAdminMiddleware,
    courseController.getCourseDetail
  )

  .delete(
    authMiddleware,
    isAdminMiddleware,
    courseController.removeCourse
  )

  .patch(
    authMiddleware,
    isAdminMiddleware,
    uploader("course/covers").single("cover"),
    courseController.updateCourse
  );

module.exports = router;
