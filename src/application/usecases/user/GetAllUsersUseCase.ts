import { UserRepository } from "../../../domain/repositories/UserRepository";

export class GetAllUsersUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute() {

    return this.userRepo.findAll();
  }
}