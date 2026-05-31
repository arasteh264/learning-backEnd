const jwt = require("jsonwebtoken");
const supabase = require("../config/supabase");

module.exports = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "شما دسترسی به این ادرس را ندارید." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const jwtPayload = jwt.verify(token, process.env.JWT_SECRET);

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", jwtPayload.id)
      .single();

    if (error || !user) {
      return res.status(401).json({ message: "کاربر یافت نشد" });
    }

    delete user.password;

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "توکن نامعتبر است" });
  }
};