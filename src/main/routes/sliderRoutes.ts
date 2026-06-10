import express from "express";
import { sliderController } from "../container";
import upload from "../../middlewares/upload";

const router = express.Router();

router
  .route("/")
  .get(sliderController.getAll)
  .post(upload.single("image"), sliderController.create);

router
  .route("/:id")
  .get(sliderController.getById)
  .put(upload.single("image"), sliderController.update)
  .delete(sliderController.delete);

export default router;