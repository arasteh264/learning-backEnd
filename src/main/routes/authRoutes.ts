import express from "express";
import { authController } from "../container";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/otp/send", authController.sendOtp);
router.post("/otp/verify", authController.verifyOtp);
router.post("/password/reset", authController.resetPassword);

export default router;