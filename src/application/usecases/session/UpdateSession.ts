import { SessionRepository } from "../../../domain/repositories/SessionRepository";

export class UpdateSessionUseCase {
  constructor(
    private sessionRepo: SessionRepository,
    private storage: any
  ) {}

  async execute(id: string, data: any, file?: any) {
    const session = await this.sessionRepo.findById(id);

    if (!session) throw new Error("جلسه یافت نشد");

    const updateData: any = {
      title: data.title,
      time: data.time,
      free:
        data.free === true ||
        data.free === "1" ||
        data.free === 1 ||
        data.free === "true",
      course_id: data.course
    };

    if (file) {
      if (session.video) {
        await this.storage.delete(session.video, "videos");
      }

      const uploaded = await this.storage.upload(
        file,
        "videos",
        "sessions"
      );

      updateData.video = uploaded.url;
    }

    return await this.sessionRepo.update(id, updateData);
  }
}