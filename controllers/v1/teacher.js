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

exports.requestForTeacher=async(req,res)=>{
  
  try {
    const userId = req.user._id; 
    const { bio, expertise } = req.body;

    // چک کن قبلاً درخواست نداده باشه
    const existing = await teacherModel.findOne({ userId });
    if (existing) {
      return res.status(400).json({
        message: "شما قبلاً درخواست ثبت کرده‌اید",
      });
    }

const teacher = await teacherModel.create({
  userId,
  bio,
  expertise: Array.isArray(expertise)
    ? expertise
    : expertise.split(","),
});

    res.status(201).json({
      message: "درخواست شما ثبت شد و در انتظار تایید است",
      data: teacher,
    });
  } catch (err) {
    res.status(500).json({
      message: "خطا در ثبت درخواست",
    });
  }

}

exports.verifyTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await teacherModel.findByIdAndUpdate(
      id,
      { isVerified: true },
      { new: true }
    );

    if (!teacher) {
      return res.status(404).json({ message: "پیدا نشد" });
    }

    res.json({
      message: "استاد تایید شد",
      data: teacher,
    });
  } catch (err) {
    res.status(500).json({ message: "خطا در تایید" });
  }
};

exports.getExpertiseList = (req, res) => {
  res.json([
    "react",
    "nodejs",
    "mongodb",
    "typescript",
    "nextjs",
  ]);
};