import express from "express";
import { cartController } from "../container";
import authMiddleware from "../../middlewares/auth";


const router = express.Router();

router.use(authMiddleware); 

router.get("/", cartController.getCart);
router.post("/items", cartController.addToCart);
router.delete("/items/:courseId", cartController.removeFromCart);

export default router;