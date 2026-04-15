const express = require("express");
const categoryController = require("./../../controllers/v1/category");
const authMiddleware = require("../../middlewares/auth");
const isAdminMiddleware = require("../../middlewares/IsAdmin");
const router = express.Router();
router
  .route("/")
  .post(authMiddleware, isAdminMiddleware, categoryController.createCategory)
  .get(categoryController.getAll);
router
  .route("/:id")
  .put(authMiddleware, isAdminMiddleware, categoryController.updateCategory)
  .delete(authMiddleware, isAdminMiddleware, categoryController.removeCategory);
module.exports = router;
