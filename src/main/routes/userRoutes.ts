import express from "express";
import { userController } from "../container";
import authMiddleware from "../../middlewares/auth";
import isAdminMiddleware from "../../middlewares/IsAdmin";


const router = express.Router();

router.get(
  "/",
  authMiddleware,
  isAdminMiddleware,
  userController.getAll
);

router.get(
  "/profile",
  authMiddleware,
  userController.profile
);

router.put(
  "/",
  authMiddleware,
  userController.update
);

router.put(
  "/role/:id",
  authMiddleware,
  isAdminMiddleware,
  userController.changeRoleUser
);

router.post(
  "/ban/:id",
  authMiddleware,
  isAdminMiddleware,
  userController.ban
);

router.delete(
  "/:id",
  authMiddleware,
  isAdminMiddleware,
  userController.remove
);

export default router;