import bcrypt from "bcrypt";
import supabase from "../../config/supabase";
import { Request, Response } from "express";

export const banUser = async (req: Request, res: Response) => {
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
      .eq("user_id", userId)
      .maybeSingle();

    if (existingBan) {
      await supabase.from("banned_users").delete().eq("user_id", userId);

      return res.status(200).json({
        message: "کاربر از حالت بن خارج شد",
        banStatus: false,
      });
    }

    await supabase.from("banned_users").insert([{ user_id: userId }]);

    return res.status(200).json({
      message: "کاربر با موفقیت بن شد",
      banStatus: true,
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id, name, email, phone, role, created_at, user_name");

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    return res.json(data);
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const removeUser = async (req: Request, res: Response) => {
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

export const changeRole = async (req: Request, res: Response) => {
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

export const updateUser = async (req: Request, res: Response) => {
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


    return res.json({
      message: "اطلاعات کاربر با موفقیت ویرایش شد",
      user: data,
    });
  } catch (err) {
    return res.status(500).json({ message: "خطا در سرور" });
  }
};

export const getProfile = async (req: Request, res: Response) => {
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
