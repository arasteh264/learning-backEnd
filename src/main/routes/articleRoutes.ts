import express from "express";
import { articleController } from "../container";
import upload from "../../middlewares/upload";

const router = express.Router();

router.post("/", upload.single("cover"), articleController.createArticle);
router.get("/", articleController.getAllArticles);
router.get("/:slug", articleController.getArticleBySlug);
router.put("/:id", upload.single("cover"), articleController.updateArticle);
router.delete("/:id", articleController.deleteArticle);

export default router;