import { Response } from "express";
import { HttpStatus } from "./HttpStatus";
import { ApiResponse as ApiResponseType } from "./types";
import { CommonMessages } from "../messages/common.messages";

export class ApiResponse {
private static send<T>(
  res: Response,
  status: HttpStatus,
  success: boolean,
  message: string,
  data: T | null = null,
) {
  return res.status(status).json({
    success,
    message,
    data,
  });
}

  

  static success<T>(
    res: Response,
    data: T,
    message : string ,
  ) {
    return this.send(res, HttpStatus.OK, true, message, data);
  }

  static created<T>(
    res: Response,
    data: T,
    message : string,
  ) {
    return this.send(res, HttpStatus.CREATED, true, message, data);
  }

static deleted(
  res: Response,
  message : string,
) {
  return this.send(res, HttpStatus.OK, true, message, null);
}


  static badRequest(
    res: Response,
    message : string,
  ) {
    return this.send(res, HttpStatus.BAD_REQUEST, false, message);
  }

  static unauthorized(
    res: Response,
    message = CommonMessages.UNAUTHORIZED,
  ) {
    return this.send(res, HttpStatus.UNAUTHORIZED, false, message);
  }

  static forbidden(
    res: Response,
    message = CommonMessages.FORBIDDEN,
  ) {
    return this.send(res, HttpStatus.FORBIDDEN, false, message);
  }

  static notFound(
    res: Response,
    message = CommonMessages.NOT_FOUND,
  ) {
    return this.send(res, HttpStatus.NOT_FOUND, false, message);
  }

  static conflict(
    res: Response,
    message = CommonMessages.CONFLICT,
  ) {
    return this.send(res, HttpStatus.CONFLICT, false, message);
  }

  static error(
    res: Response,
    message = CommonMessages.INTERNAL_SERVER_ERROR,
  ) {
    return this.send(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      false,
      message,
    );
  }

  static fromError(
    res: Response,
    error: unknown,
  ) {
    return this.error(
      res,
      error instanceof Error
        ? error.message
        : CommonMessages.INTERNAL_SERVER_ERROR,
    );
  }
}