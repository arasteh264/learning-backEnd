import express from "express";
import { paymentController } from "../container";
import authMiddleware from "../../middlewares/auth";

const router = express.Router();

router.post("/request", authMiddleware, paymentController.requestPayment);

router.get("/verify", paymentController.verifyPayment);
router.get("/transactions", paymentController.getAllTransactions);
export default router;