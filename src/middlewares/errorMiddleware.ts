import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../shared/http/api-response";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return ApiResponse.fromError(res, err);
};