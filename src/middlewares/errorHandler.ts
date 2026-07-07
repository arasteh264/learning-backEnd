import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../shared/http/api-response";

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error("Unhandled error:", err);
  return ApiResponse.fromError(res, err);
};