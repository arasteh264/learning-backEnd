import express from "express";
import * as userController from "../../controllers/v1/user"
import authMiddleware from "../../middlewares/auth";
import isAdminMiddleware from "../../middlewares/IsAdmin";

const router = express.Router();

router
  .route("/")
  .get(authMiddleware, isAdminMiddleware, userController.getAll)
  .put(authMiddleware, userController.updateUser);

router
  .route("/profile")
  .get(authMiddleware, userController.getProfile);

router
  .route("/role/:id")
  .put(authMiddleware, isAdminMiddleware, userController.changeRole);

router
  .route("/:id")
  .delete(userController.removeUser);

router
  .route("/ban/:id")
  .post(authMiddleware, isAdminMiddleware, userController.banUser);

export default router;