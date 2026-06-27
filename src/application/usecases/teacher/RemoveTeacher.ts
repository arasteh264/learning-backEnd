import { TeacherRepository } from "../../../domain/repositories/TeacherRepository";

export class RemoveTeacherUseCase {
  constructor(private repo: TeacherRepository) {}

  async execute(id: string) {
    const teacher = await this.repo.findById(id);

    if (!teacher) {
      throw new Error("استاد یافت نشد");
    }

    await this.repo.delete(id);

    return { success: true };
  }
}