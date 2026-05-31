
const supabase = require("../../config/supabase");
const bcrypt=require("bcrypt")
const registerValidator=require("./../../validators/register")
const jwt=require("jsonwebtoken")

exports.register = async (req, res) => {
  console.log("slm");
  
  const { userName, name, email, password, phone } = req.body;

  const { data: bannedUser } = await supabase
    .from("banned_users")
    .select("*")
    .eq("phone", phone)
    .maybeSingle();

  if (bannedUser) {
    return res.status(403).json({
      message: "حساب کاربری شما مسدود است"
    });
  }

 const { data: existingUser } = await supabase
  .from("users")
  .select("id")
  .or(`email.eq."${email}",username.eq."${userName}",phone.eq."${phone}"`);

  if (existingUser?.length > 0) {
    return res.status(409).json({
      message: "کاربر تکراری است"
    });
  }


  const hashedPassword = await bcrypt.hash(password, 10);

  const { count } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true });

  const role = count === 0 ? "ADMIN" : "USER";

  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        username: userName,
        name,
        email,
        phone,
        password: hashedPassword,
        role
      }
    ])
    .select();

  if (error) {
    return res.status(500).json({
      message: error.message
    });
  }

  const { password: _, ...safeUser } = data[0];

  const accessToken = jwt.sign(
    { id: safeUser.id },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  return res.status(201).json({
    user: safeUser,
    accessToken,
    message: "ثبت شد"
  });
};
exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const { data: users, error } = await supabase
      .from("users")
      .select("*")
      .or(`email.eq.${identifier},username.eq.${identifier}`);

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    const user = users?.[0];

    if (!user) {
      return res.status(401).json({
        message: "کاربر پیدا نشد"
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "رمز اشتباه است"
      });
    }

    const { password: _, ...safeUser } = user;

    const accessToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    return res.json({
      accessToken,
      user: {
        id: safeUser.id,
        userName: safeUser.username,
        role: safeUser.role
      }
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};