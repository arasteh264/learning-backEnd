import { UserRepository } from "../../../domain/repositories/UserRepository";

export class BanUserUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(userId: string) {
    return this.userRepo.banToggle(userId);
  }
}