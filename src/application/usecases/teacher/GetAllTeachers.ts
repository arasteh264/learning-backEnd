import { TeacherRepository } from "../../../domain/repositories/TeacherRepository";

export class GetAllTeachersUseCase {
  constructor(private repo: TeacherRepository) {}

  async execute() {
    return await this.repo.findAll();
  }
}