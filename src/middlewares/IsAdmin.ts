import { Request, Response, NextFunction } from "express";

export default function isAdminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user?.role !== "ADMIN") {
    return res.status(403).json({
      message: "فقط برای ادمین قابل دسترسی میباشد.",
    });
  }

  next();
}