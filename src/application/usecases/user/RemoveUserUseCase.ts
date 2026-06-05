import { UserRepository } from "../../../domain/repositories/UserRepository";

export class RemoveUserUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(id: string) {
    return this.userRepo.delete(id);
  }
}