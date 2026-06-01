import express from "express";

import { createCourseUseCase } from "../container";
import { createCourseController } from "../../interfaces/controllers/v1/controllers/course.controller";

const router = express.Router();

router.post(
  "/courses",
  createCourseController(createCourseUseCase)
);

export default router;