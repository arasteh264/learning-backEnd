const express=require("express");
const teacherController=require("../../controllers/v1/teacher");
const authMiddleware=require("../../middlewares/auth");
const isAdminMiddleware=require("../../middlewares/IsAdmin");
const router=express.Router();
router.route("/").post(authMiddleware,isAdminMiddleware,teacherController.createTeacher)
router.route("/").get(authMiddleware,isAdminMiddleware,teacherController.getAllTeacher)

module.exports=router;