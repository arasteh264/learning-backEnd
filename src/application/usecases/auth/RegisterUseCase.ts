
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
    const banned = await this.userRepo.findByPhone(data.phone);

    if (banned) {
      throw new Error("حساب کاربری شما مسدود است");
    }

    const existing = await this.userRepo.findByEmailOrUsername(data.email);

    if (existing) {
      throw new Error("کاربر تکراری است");
    }

    const count = await this.userRepo.count();

    const role = count === 0 ? "ADMIN" : "USER";

    const hashed = await this.passwordService.hash(data.password);

    const user = await this.userRepo.create({
      username: data.userName,
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: hashed,
      role,
    });

    const accessToken = this.tokenService.generate(user.id);

    const { password, ...safeUser } = user;

    return {
      user: safeUser,
      accessToken,
    };
  }
}
