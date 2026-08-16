import { Request, Response } from "express";
import { LoginUseCase } from "../../application/usecases/auth/LoginUseCase";
import { RegisterUseCase } from "../../application/usecases/auth/RegisterUseCase";
import { SendOtpUseCase } from "../../application/usecases/auth/SendOtpUseCase";
import { VerifyOtpUseCase } from "../../application/usecases/auth/VerifyOtpUseCase";
import { ResetPasswordUseCase } from "../../application/usecases/auth/ResetPasswordUseCase";
import { ApiResponse } from "../../shared/http/api-response";
import { asyncHandler } from "../../shared/asyncHandler";
import { AuthMessages } from "../../shared/messages/auth.messages";

export class AuthController {
  constructor(
    private registerUseCase: RegisterUseCase,
    private loginUseCase: LoginUseCase,
    private sendOtpUseCase: SendOtpUseCase,
    private verifyOtpUseCase: VerifyOtpUseCase,
    private resetPasswordUseCase: ResetPasswordUseCase,
  ) {}

  register = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.registerUseCase.execute(req.body);
    return ApiResponse.created(res, result, AuthMessages.REGISTERED);
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const { identifier, password } = req.body;
    const result = await this.loginUseCase.execute(identifier, password);
    return ApiResponse.success(res, result, AuthMessages.LOGIN_SUCCESS);
  });

  sendOtp = asyncHandler(async (req: Request, res: Response) => {
    const { identifier, channel, purpose } = req.body;
    const result = await this.sendOtpUseCase.execute(identifier, channel, purpose);
    return ApiResponse.success(res, result, AuthMessages.OTP_SENT);
  });

  verifyOtp = asyncHandler(async (req: Request, res: Response) => {
    const { identifier, code, purpose } = req.body;
    const result = await this.verifyOtpUseCase.execute(identifier, code, purpose);
    return ApiResponse.success(res, result, AuthMessages.OTP_VERIFIED);
  });

  resetPassword = asyncHandler(async (req: Request, res: Response) => {
    const { identifier, code, newPassword } = req.body;
    await this.resetPasswordUseCase.execute(identifier, code, newPassword);
    return ApiResponse.success(res, null, AuthMessages.PASSWORD_RESET);
  });
}