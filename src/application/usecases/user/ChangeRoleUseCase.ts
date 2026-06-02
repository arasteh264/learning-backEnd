import { UserRepository } from "../../../domain/repositories/UserRepository";

export class ChangeRoleUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(id: string) {
    const user = await this.userRepo.findById(id);
    if (!user) throw new Error("User not found");

    const newRole = user.role === "ADMIN" ? "USER" : "ADMIN";

    return this.userRepo.update(id, { role: newRole });
  }
}