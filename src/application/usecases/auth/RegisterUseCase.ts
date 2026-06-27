
import { User } from "../../../domain/entities/user";
import { AuthRepository } from "../../../domain/repositories/AuthRepository";
import { BcryptPasswordService } from "../../../infrastructure/services/BcryptPasswordService";
import { JwtTokenService } from "../../../infrastructure/services/JwtTokenService";

export class RegisterUseCase {
  constructor(
    private userRepo: AuthRepository,
    private passwordService: BcryptPasswordService,
    private tokenService: JwtTokenService,
  ) {}

  async execute(data: any) {
    const bannedUser = await this.userRepo.findByPhone(data.phone);

    if (bannedUser) {
      throw new Error("حساب کاربری شما مسدود است");
    }

    const existingUser = await this.userRepo.findByEmailOrUsername(
      data.email,
    );

    if (existingUser) {
      throw new Error("کاربر تکراری است");
    }

    const count = await this.userRepo.count();
    const role: "ADMIN" | "USER" = count === 0 ? "ADMIN" : "USER";

    const hashedPassword = await this.passwordService.hash(data.password);

    const userEntity = new User(
      crypto.randomUUID(),
      data.userName,
      data.name,
      data.email,
      hashedPassword,
      data.phone,
      role,
      false,
      new Date(),
      new Date(),
    );

    const user = await this.userRepo.create(userEntity);

    const accessToken = this.tokenService.generate(user.id);

    return {
      accessToken,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    };
  }
}
