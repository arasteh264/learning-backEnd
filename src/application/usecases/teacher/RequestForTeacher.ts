import { Teacher } from "../../../domain/entities/Teachers";
import { TeacherRepository } from "../../../domain/repositories/TeacherRepository";

export class RequestForTeacherUseCase {
  constructor(private repo: TeacherRepository) {}

  private normalizeExpertise(expertise: any): string[] {
    if (!expertise) return [];

    if (Array.isArray(expertise)) return expertise;

    return expertise
      .split(",")
      .map((e: string) => e.trim())
      .filter(Boolean);
  }

  async execute(userId: string, bio: string, expertise: any) {
    const existing = await this.repo.findByUserId(userId);

    if (existing) {
      throw new Error("شما قبلاً درخواست ثبت کرده‌اید");
    }

    const teacher = new Teacher(
      crypto.randomUUID(),
      userId,
      bio,
      this.normalizeExpertise(expertise),
      0,
      false,
      new Date(),
      new Date(),
    );

    return await this.repo.create(teacher);
  }
}