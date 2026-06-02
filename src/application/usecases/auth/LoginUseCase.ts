
import { AuthRepository } from "../../../domain/repositories/AuthRepository";
import { BcryptPasswordService } from "../../../infrastructure/services/BcryptPasswordService";
import { JwtTokenService } from "../../../infrastructure/services/JwtTokenService";

export class LoginUseCase {
  constructor(
    private userRepo: AuthRepository,
    private passwordService: BcryptPasswordService,
    private tokenService: JwtTokenService,
  ) {}

  async execute(identifier: string, password: string) {
    const user = await this.userRepo.findByEmailOrUsername(identifier);

    if (!user) {
      throw new Error("کاربر پیدا نشد");
    }

    const isValid = await this.passwordService.compare(password, user.password);

    if (!isValid) {
      throw new Error("رمز اشتباه است");
    }

    const accessToken = this.tokenService.generate(user.id);

    const { password: _, ...safeUser } = user;

    return {
      accessToken,
      user: {
        id: safeUser.id,
        userName: safeUser.username,
        role: safeUser.role,
      },
    };
  }
}
