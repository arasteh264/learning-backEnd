
import { User } from "../../../domain/entities/User";
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
    const userData = await this.userRepo.findByEmailOrUsername(identifier);

    if (!userData) {
      throw new Error("کاربر پیدا نشد");
    }

    const user = new User(
      userData.id,
      userData.username,
      userData.name,
      userData.email,
      userData.password,
      userData.phone,
      userData.role,
      userData.ban_status,
      userData.created_at,
      userData.updated_at,
    );

    if (user.isBanned()) {
      throw new Error("کاربر مسدود است");
    }

    const isValid = await this.passwordService.compare(
      password,
      user.password,
    );
    console.log("🚀 ~ LoginUseCase ~ execute ~ isValid:", isValid)

    if (!isValid) {
      throw new Error("رمز اشتباه است");
    }

    const token = this.tokenService.generate(user.id);
    console.log("🚀 ~ LoginUseCase ~ execute ~ token:", token)

    return {
      accessToken: token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    };
  }
}
