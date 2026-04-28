const teacherModel = require("../../models/teacher");
const userModel = require("../../models/user");
const jwt = require("jsonwebtoken");
const { isValidObjectId } = require("mongoose");

exports.createTeacher = async (req, res) => {
  try {
    console.log(req.body);
    
    const { userId, bio, expertise } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "کاربر پیدا نشد"
      });
    }

    const existingTeacher = await teacherModel.findOne({ userId });
    if (existingTeacher) {
      return res.status(409).json({
        message: "این کاربر قبلاً استاد شده است"
      });
    }

    const teacher = await teacherModel.create({
      userId,
      bio,
      expertise
    });

    return res.status(201).json({
      message: "استاد با موفقیت ساخته شد",
      teacher
    });

  } catch (err) {
    console.log(err);
    
    return res.status(500).json({
      message: "خطای سرور",
      error: err.message
    });
  }
};
exports.getAllTeacher = async (req, res) => {
      const teachers = await teacherModel.find({}, { password: 0 }).populate("userId", "name email");
  return res.json(teachers);
}