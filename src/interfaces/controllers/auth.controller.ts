import { Request, Response } from "express";
import { LoginUseCase } from "../../application/usecases/auth/LoginUseCase";
import { RegisterUseCase } from "../../application/usecases/auth/RegisterUseCase";
import { ApiResponse } from "../../shared/http/api-response";
import { asyncHandler } from "../../shared/asyncHandler";
import { AuthMessages } from "../../shared/messages/auth.messages";


export class AuthController {
  constructor(
    private registerUseCase: RegisterUseCase,
    private loginUseCase: LoginUseCase,
  ) {}

  register = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.registerUseCase.execute(req.body);

    return ApiResponse.created(
      res,
      result,
      AuthMessages.REGISTERED,
    );
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const { identifier, password } = req.body;
   

    const result = await this.loginUseCase.execute(
      identifier,
      password,
    );

    return ApiResponse.success(
      res,
      result,
      AuthMessages.LOGIN_SUCCESS,
    );
  });
}