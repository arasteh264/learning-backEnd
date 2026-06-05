import express from "express";
import { courseController } from "../container";

const router = express.Router();

router.post(
  "/courses",
  courseController.createCourse
);

router.get(
  "/courses",
  courseController.getAllCourses
);

// router.get(
//   "/courses/:id",
//   courseController.getCourse
// );

router.put(
  "/courses/:id",
  courseController.updateCourse
);


router.delete(
  "/courses/:id",
  courseController.deleteCourse
);

export default router;