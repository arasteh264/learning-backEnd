import { TeacherRepository } from "../../../domain/repositories/TeacherRepository";

export class RequestForTeacherUseCase {
  constructor(private repo: TeacherRepository) {}

  async execute(userId: string, bio: string, expertise: any) {

    const existing = await this.repo.findByUserId(userId);

    if (existing) {
      throw new Error("شما قبلاً درخواست ثبت کرده‌اید");
    }

    const parsed = Array.isArray(expertise)
      ? expertise
      : expertise.split(",");

    return await this.repo.create({
      user_id: userId,
      bio,
      expertise: parsed,
      is_verified: false,
    });
  }
}