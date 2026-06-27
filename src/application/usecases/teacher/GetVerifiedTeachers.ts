import { TeacherRepository } from "../../../domain/repositories/TeacherRepository";

export class GetVerifiedTeachersUseCase {
  constructor(private repo: TeacherRepository) {}

  async execute() {
    const teachers = await this.repo.findVerified();

    return (teachers || []).map((teacher) => ({
      id: teacher.id,
      userId: teacher.userId,
      bio: teacher.bio,
      expertise: teacher.expertise,
      rating: teacher.rating,
    }));
  }
}
