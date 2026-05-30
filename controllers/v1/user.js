const supabase = require("../../config/supabase");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { isValidObjectId } = require("mongoose");

exports.banUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (!user) {
      return res.status(404).json({ message: "کاربر پیدا نشد" });
    }

    const { data: existingBan } = await supabase
      .from("banned_users")
      .select("*")
      .eq("phone", user.phone)
      .maybeSingle();

    // UNBAN
    if (existingBan) {
      await supabase
        .from("banned_users")
        .delete()
        .eq("phone", user.phone);

      return res.status(200).json({
        message: "کاربر از حالت بن خارج شد",
        banStatus: false,
      });
    }

    // BAN
    await supabase.from("banned_users").insert([
      {
        phone: user.phone,
      },
    ]);

    return res.status(200).json({
      message: "کاربر با موفقیت بن شد",
      banStatus: true,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


exports.getAll = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*");

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    // hide password
    const users = data.map((u) => {
      delete u.password;
      return u;
    });

    return res.json(users);
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};


exports.removeUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("users")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error || !data) {
      return res.status(404).json({
        message: "کاربر مورد نظر یافت نشد",
      });
    }

    return res.status(200).json({
      message: "کاربر با موفقیت حذف شد",
    });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};
exports.changeRole = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (!user) {
      return res.status(404).json({ message: "کاربر پیدا نشد" });
    }

    const newRole = user.role === "ADMIN" ? "USER" : "ADMIN";

    const { data, error } = await supabase
      .from("users")
      .update({ role: newRole })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    return res.json({
      message: "نقش کاربر با موفقیت تغییر کرد",
      user: data,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const { name, userName, email, phone, password } = req.body;

    const updateFields = {
      name,
      user_name: userName,
      email,
      phone,
    };

    if (password) {
      updateFields.password = await bcrypt.hash(password, 12);
    }

    const { data, error } = await supabase
      .from("users")
      .update(updateFields)
      .eq("id", req.user.id)
      .select()
      .single();

    if (error || !data) {
      return res.status(404).json({
        message: "کاربر مورد نظر یافت نشد",
      });
    }

    delete data.password;

    return res.json({
      message: "اطلاعات کاربر با موفقیت ویرایش شد",
      user: data,
    });
  } catch (err) {
    return res.status(500).json({ message: "خطا در سرور" });
  }
};
exports.getProfile = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", req.user.id)
      .single();

    if (error || !data) {
      return res.status(404).json({
        message: "کاربر یافت نشد",
      });
    }

    const profile = {
      id: data.id,
      username: data.user_name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      name: data.name,
      createdAt: data.created_at,
    };

    return res.status(200).json(profile);
  } catch (err) {
    return res.status(500).json({
      message: "خطای داخلی سرور",
    });
  }
};