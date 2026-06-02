import { TeacherRepository } from "../../../domain/repositories/TeacherRepository";

export class VerifyTeacherUseCase {
  constructor(private repo: TeacherRepository) {}

  async execute(id: string) {
    return await this.repo.update(id, {
      is_verified: true
    });
  }
}