import express from "express";
import { categoryController } from "../container";
import authMiddleware from "../../middlewares/auth";
import isAdminMiddleware from "../../middlewares/IsAdmin";

const router = express.Router();

router
  .route("/")
  .post(authMiddleware, isAdminMiddleware, categoryController.create)
  .get(categoryController.getAll);

router
  .route("/:id")
  .put(authMiddleware, isAdminMiddleware, categoryController.update)
  .delete(authMiddleware, isAdminMiddleware, categoryController.delete);

export default router;