import bcrypt from "bcrypt";
import { UserRepository } from "../../../domain/repositories/UserRepository";

export class UpdateUserUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(userId: string, data: any) {
    const updateData: any = {
      name: data.name,
      user_name: data.userName,
      email: data.email,
      phone: data.phone,
    };

    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 12);
    }

    return this.userRepo.update(userId, updateData);
  }
}