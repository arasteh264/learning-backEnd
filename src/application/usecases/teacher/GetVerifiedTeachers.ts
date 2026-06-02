import { TeacherRepository } from "../../../domain/repositories/TeacherRepository";

export class GetVerifiedTeachersUseCase {
  constructor(private repo: TeacherRepository) {}

  async execute() {
    const data = await this.repo.findVerified();

    return (data || []).map((t: any) => ({
      id: t.id,
      name: t.users?.name || null
    }));
  }
}