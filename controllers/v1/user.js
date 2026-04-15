const userModel = require("./../../models/user");
const banUserModel = require("./../../models/ban-phone");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { isValidObjectId } = require("mongoose");

exports.banUser = async (req, res) => {
  const mainUser = await userModel.findOne({ _id: req.params.id }).lean();
  const banUserRes = await banUserModel.create({ phone: mainUser.phone });
  if (banUserModel) {
    return res.status(200).json({ message: "کاربر با موفقیت بن شد." });
  }

  return res.status(500).json({ message: "خطا ,با پشتیبانی تماس بگیرید." });
};
exports.getAll = async (req, res) => {
  const users = await userModel.find({}, { password: 0 });
  return res.json(users);
};
exports.removeUser = async (req, res) => {
  const userRemove = await userModel.findByIdAndDelete(req.params.id);
  if (userRemove) {
    return res.status(200).json({
      message: "کاربر با موفقیت حذف شد.",
    });
  }
  return res.status(400).json({
    message: "کاربر مورد نظر یافت نشد.",
  });
};
exports.changeRole = async (req, res) => {
  const { id } = req.body;
  const isValidUserId = isValidObjectId(id);
  if (!isValidUserId) {
    return res.status(409).json({
      message: "ایدی کاربر نامعتبر است .",
    });
  }
  const user = await userModel.findOne({ _id: id });
  let newRole = user.role === "ADMIN" ? "USER" : "ADMIN";

  const updateUser = await userModel.findByIdAndUpdate(
    { _id: id },
    {
      role: newRole,
    },
  );
  if (updateUser) {
    return res.json({
      message: "نقش کاربر با موفقیت تغییر کرد.",
    });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const { name, userName, email, phone, password } = req.body;

    const updateFields = {
      name,
      userName,
      email,
      phone,
    };

    // فقط وقتی پسورد داده شده هش کن
    if (password) {
      updateFields.password = await bcrypt.hash(password, 12);
    }

    const user = await userModel
      .findByIdAndUpdate(req.user._id, updateFields, { new: true })
      .lean();

    if (!user) {
      return res.status(404).json({ message: "کاربر مورد نظر یافت نشد." });
    }

    delete user.password;
    return res.json({
      message: "اطلاعات کاربر با موفقیت ویرایش شد.",
      user: user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "خطا,با پشتیبانی تماس بگیرید." });
  }
};
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res
        .status(400)
        .json({ message: "شناسه کاربر در درخواست یافت نشد." });
    }

    
    const userProfile = {
      id: req.user._id,
      username: req.user.userName,
      email: req.user.email,
      createdAt: req.user.createdAt,
      phon: req.user.phone,
      role: req.user.role,
      name: req.user.name,
    };

    return res.status(200).json(userProfile);
  } catch (error) {
    console.error("خطا در دریافت پروفایل کاربر:", error);
    res
      .status(500)
      .json({ message: "خطای داخلی سرور در هنگام دریافت پروفایل." });
  }
};
