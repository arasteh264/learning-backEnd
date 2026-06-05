import { TeacherRepository } from "../../../domain/repositories/TeacherRepository";

export class RemoveTeacherUseCase {
  constructor(private repo: TeacherRepository) {}

  async execute(id: string) {
    const deleted = await this.repo.delete(id);

    if (!deleted) {
      throw new Error("استاد یافت نشد");
    }

    return deleted;
  }
}