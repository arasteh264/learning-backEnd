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
        message: "کاربر پیدا نشد",
      });
    }

    const existingTeacher = await teacherModel.findOne({ userId });
    if (existingTeacher) {
      return res.status(409).json({
        message: "این کاربر قبلاً استاد شده است",
      });
    }

    const teacher = await teacherModel.create({
      userId,
      bio,
      expertise,
    });

    return res.status(201).json({
      message: "استاد با موفقیت ساخته شد",
      teacher,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "خطای سرور",
      error: err.message,
    });
  }
};
exports.getAllTeacher = async (req, res) => {
  const teachers = await teacherModel
    .find({}, { password: 0 })
    .populate("userId", "name email");

  const payload = teachers.map(t => ({
    id: t._id,
    name: t.userId?.name,
    email: t.userId?.email,
    bio: t.bio,
    expertise: t.expertise,
    courses: t.courses,
    rating: t.rating,
    isVerified: t.isVerified,
    createdAt: t.createdAt
  }));

  return res.json(payload);
};

exports.requestForTeacher = async (req, res) => {
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
      expertise: Array.isArray(expertise) ? expertise : expertise.split(","),
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
};

exports.verifyTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await teacherModel.findByIdAndUpdate(
      id,
      { isVerified: true },
      { new: true },
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
  res.json(["react", "nodejs", "mongodb", "typescript", "nextjs"]);
};





exports.removeTeacher=async(req,res)=>{
  try {
      const { id } = req.params;
const teacher=await teacherModel.findByIdAndDelete(id) 
if(teacher) {
  return res.status(200).json({message:"استاد مورد نظر با موفقیت حذف شد."})
}else{
       return res.status(404).json({ message: "استاد یافت نشد." });
}
  } catch (error) {
        res.status(500).json({ message: "خطای 500 با پشتیبانی تماس بگیرید." });
  }

}




exports.getVerifyTeachers = async (req, res) => {
  try {
    const teachers = await teacherModel
      .find({ isVerified: true }, { password: 0 })
      .populate("userId", "name email");

    const payload = teachers.map(t => ({
      id: t._id,
      name: t.userId?.name,
    }));

    return res.json({
      success: true,
      count: payload.length,
      data: payload
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "خطا در دریافت اساتید فعال"
    });
  }
};
