import express from "express";
import * as categoryController from "../../controllers/v1/category";
import authMiddleware from "../../middlewares/auth";
import isAdminMiddleware from "../../middlewares/IsAdmin";

const router = express.Router();

router
  .route("/")
  .post(authMiddleware, isAdminMiddleware, categoryController.createCategory)
  .get(categoryController.getAll);

router
  .route("/:id")
  .put(authMiddleware, isAdminMiddleware, categoryController.updateCategory)
  .delete(authMiddleware, isAdminMiddleware, categoryController.removeCategory);

export default router;