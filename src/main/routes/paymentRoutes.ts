import express from "express";
import { paymentController } from "../container";
import authMiddleware from "../../middlewares/auth";

const router = express.Router();

// درخواست پرداخت نیاز به لاگین داره
router.post("/request", authMiddleware, paymentController.requestPayment);

// callback از درگاه - این authMiddleware نباید داشته باشه!
// چون زرین‌پال هیچ توکنی نمی‌فرسته، فقط کاربر رو redirect می‌کنه
router.get("/verify", paymentController.verifyPayment);

export default router;