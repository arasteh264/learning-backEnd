import { TeacherRepository } from "../../../domain/repositories/TeacherRepository";

export class VerifyTeacherUseCase {
  constructor(private repo: TeacherRepository) {}

  async execute(id: string) {
    const teacher = await this.repo.findById(id);

    if (!teacher) {
      throw new Error("استاد یافت نشد");
    }

    return await this.repo.update(id, {
      is_verified: true,
    });
  }
}
