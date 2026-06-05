import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import supabase from "../config/supabase";

interface JwtPayload {
  id: string;
  iat?: number;
  exp?: number;
}

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(403)
      .json({ message: "شما دسترسی به این آدرس را ندارید." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const jwtPayload = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", jwtPayload.id)
      .single();

    if (error || !user) {
      return res.status(401).json({ message: "کاربر یافت نشد" });
    }

    // حذف پسورد
    delete (user as any).password;

    // اضافه کردن user به request
    (req as any).user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "توکن نامعتبر است" });
  }
}
