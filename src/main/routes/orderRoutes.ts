import express from "express";
import { orderController } from "../container";
import authMiddleware from "../../middlewares/auth";

const router = express.Router();

router.use(authMiddleware);

router.post("/", orderController.createOrder);

export default router;