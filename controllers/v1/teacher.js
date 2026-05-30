const supabase = require("../../config/supabase");
const jwt = require("jsonwebtoken");

exports.createTeacher = async (req, res) => {
  try {
    const { userId, bio, expertise } = req.body;

    // check user exists
    const { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (!user) {
      return res.status(404).json({ message: "کاربر پیدا نشد" });
    }

    // check duplicate teacher
    const { data: existing } = await supabase
      .from("teachers")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (existing) {
      return res.status(409).json({
        message: "این کاربر قبلاً استاد شده است",
      });
    }

    const { data, error } = await supabase
      .from("teachers")
      .insert([
        {
          user_id: userId,
          bio,
          expertise: Array.isArray(expertise)
            ? expertise
            : expertise.split(","),
          is_verified: false,
          rating: 0,
        },
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(201).json({
      message: "استاد با موفقیت ساخته شد",
      teacher: data,
    });
  } catch (err) {
    return res.status(500).json({
      message: "خطای سرور",
      error: err.message,
    });
  }
};

exports.getAllTeacher = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("teachers")
      .select(`
        *,
        users (
          name,
          email
        )
      `);

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    const payload = data.map((t) => ({
      id: t.id,
      name: t.users?.name,
      email: t.users?.email,
      bio: t.bio,
      expertise: t.expertise,
      courses: t.courses,
      rating: t.rating,
      isVerified: t.is_verified,
      createdAt: t.created_at,
    }));

    return res.json(payload);
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.requestForTeacher = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bio, expertise } = req.body;

    const { data: existing } = await supabase
      .from("teachers")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (existing) {
      return res.status(400).json({
        message: "شما قبلاً درخواست ثبت کرده‌اید",
      });
    }

    const { data, error } = await supabase
      .from("teachers")
      .insert([
        {
          user_id: userId,
          bio,
          expertise: Array.isArray(expertise)
            ? expertise
            : expertise.split(","),
          is_verified: false,
        },
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(201).json({
      message: "درخواست شما ثبت شد و در انتظار تایید است",
      data,
    });
  } catch (err) {
    return res.status(500).json({
      message: "خطا در ثبت درخواست",
    });
  }
};

exports.verifyTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("teachers")
      .update({ is_verified: true })
      .eq("id", id)
      .select()
      .single();

    if (error || !data) {
      return res.status(404).json({ message: "پیدا نشد" });
    }

    return res.json({
      message: "استاد تایید شد",
      data,
    });
  } catch (err) {
    return res.status(500).json({ message: "خطا در تایید" });
  }
};

exports.getExpertiseList = (req, res) => {
  res.json(["react", "nodejs", "mongodb", "typescript", "nextjs"]);
};




exports.removeTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("teachers")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error || !data) {
      return res.status(404).json({
        message: "استاد یافت نشد",
      });
    }

    return res.status(200).json({
      message: "استاد مورد نظر با موفقیت حذف شد",
    });
  } catch (err) {
    return res.status(500).json({
      message: "خطای 500",
    });
  }
};



exports.getVerifyTeachers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("teachers")
      .select(`
        id,
        is_verified,
        users (
          name
        )
      `)
      .eq("is_verified", true);

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    const payload = data.map((t) => ({
      id: t.id,
      name: t.users?.name,
    }));

    return res.json({
      success: true,
      count: payload.length,
      data: payload,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "خطا در دریافت اساتید فعال",
    });
  }
};
