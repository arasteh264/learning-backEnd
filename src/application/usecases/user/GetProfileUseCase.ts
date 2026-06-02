import { UserRepository } from "../../../domain/repositories/UserRepository";

export class GetProfileUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(userId: string) {
    const user = await this.userRepo.findById(userId);

    if (!user) throw new Error("User not found");

    return {
      id: user.id,
      username: user.user_name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      name: user.name,
      createdAt: user.created_at,
    };
  }
}