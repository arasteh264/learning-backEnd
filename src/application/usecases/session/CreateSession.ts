import { SessionRepository } from "../../../domain/repositories/SessionRepository";

export class CreateSessionUseCase {
  constructor(
    private sessionRepo: SessionRepository,
    private storage: any
  ) {}

  async execute(data: any, file: any, courseId: string) {
    if (!file) throw new Error("ویدیو ارسال نشده");

    const uploaded = await this.storage.upload(
      file,
      "videos",
      "sessions"
    );

    return await this.sessionRepo.create({
      ...data,
      video: uploaded.url,
      course_id: courseId,
      free: data.free === "1" || data.free === 1
    });
  }
}