const express=require("express");
const teacherController=require("../../controllers/v1/teacher");
const authMiddleware=require("../../middlewares/auth");
const isAdminMiddleware=require("../../middlewares/IsAdmin");
const router=express.Router();
router.route("/").post(authMiddleware,isAdminMiddleware,teacherController.createTeacher)
router.route("/").get(authMiddleware,isAdminMiddleware,teacherController.getAllTeacher)
router.route("/request").post(authMiddleware,teacherController.requestForTeacher)
router.route("/verify/:id").post(authMiddleware,isAdminMiddleware,teacherController.verifyTeacher)
router.route("/expertises").get( authMiddleware,teacherController.getExpertiseList);
module.exports=router;