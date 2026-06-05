import { Request, Response } from "express";
import { LoginUseCase } from "../../application/usecases/auth/LoginUseCase";
import { RegisterUseCase } from "../../application/usecases/auth/RegisterUseCase";

export class AuthController {
  constructor(
    private registerUseCase: RegisterUseCase,
    private loginUseCase: LoginUseCase,
  ) {}

  register = async (req: Request, res: Response) => {
    try {
      const result = await this.registerUseCase.execute(req.body);

      return res.status(201).json({
        message: "ثبت شد",
        ...result,
      });
    } catch (err: any) {
      return res.status(400).json({
        message: err.message,
      });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { identifier, password } = req.body;

      const result = await this.loginUseCase.execute(identifier, password);

      return res.json(result);
    } catch (err: any) {
      return res.status(401).json({
        message: err.message,
      });
    }
  };
}
