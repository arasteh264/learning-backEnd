import bcrypt from "bcrypt";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { VerifyOtpUseCase } from "./VerifyOtpUseCase";

export class ResetPasswordUseCase {
  constructor(
    private verifyOtpUseCase: VerifyOtpUseCase,
    private userRepository: UserRepository
  ) {}

  async execute(identifier: string, code: string, newPassword: string) {
    await this.verifyOtpUseCase.execute(identifier, code, "reset_password");
    const passwordHash = await bcrypt.hash(newPassword, 10);
    await this.userRepository.updatePasswordByIdentifier(identifier, passwordHash); 
  }
}