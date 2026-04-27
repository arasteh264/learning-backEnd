const express=require("express");
const userController=require("./../../controllers/v1/user");
const authMiddleware=require("../../middlewares/auth");
const isAdminMiddleware=require("../../middlewares/IsAdmin");
const router=express.Router();
router.route("/").get(authMiddleware,isAdminMiddleware,userController.getAll).put(authMiddleware,userController.updateUser)
router.route("/profile").get(authMiddleware,userController.getProfile)
router.route("/role/:id").put(authMiddleware,isAdminMiddleware,userController.changeRole)
router.route("/:id").delete(userController.removeUser)
router.route("/ban/:id").post(authMiddleware,isAdminMiddleware,userController.banUser)

module.exports=router;