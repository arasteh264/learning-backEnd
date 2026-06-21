import express from "express";
import { courseController } from "../container";
import upload from "../../middlewares/upload";

const router = express.Router();

router.post(
  "/",
  upload.single("cover"),
  courseController.createCourse
);

router.get(
  "/",
  courseController.getAllCourses
);

router.get(
  "/course/:id",
  courseController.getCourse
);
router.get("/latest", courseController.getLatestCourses);
router.get("/search", courseController.searchCourse);
router.put(
  "/:id",
  courseController.updateCourse
);

router.get("/free/popular", courseController.getPopularFreeCourses);
router.delete(
  "/:id",
  courseController.deleteCourse
);

export default router;