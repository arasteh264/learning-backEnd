import { TeacherRepository } from "../../../domain/repositories/TeacherRepository";

export class CreateTeacherUseCase {
  constructor(private repo: TeacherRepository) {}

  private parseExpertise(value: any) {
    if (!value) return [];
    if (Array.isArray(value)) return value;

    return value
      .split(",")
      .map((e: string) => e.trim())
      .filter(Boolean);
  }

  async execute(userId: string, bio: string, expertise: any) {

    const existing = await this.repo.findByUserId(userId);

    if (existing) {
      throw new Error("این کاربر قبلاً استاد شده است");
    }

    return await this.repo.create({
      user_id: userId,
      bio,
      expertise: this.parseExpertise(expertise),
      is_verified: false,
      rating: 0,
    });
  }
}