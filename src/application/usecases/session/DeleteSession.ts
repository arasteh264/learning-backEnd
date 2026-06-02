import { SessionRepository } from "../../../domain/repositories/SessionRepository";

export class DeleteSessionUseCase {
  constructor(
    private sessionRepo: SessionRepository,
    private storage: any
  ) {}

  async execute(id: string) {
    const session = await this.sessionRepo.findById(id);

    if (!session) throw new Error("جلسه یافت نشد");

    if (session.video) {
      await this.storage.delete(session.video, "videos");
    }

    await this.sessionRepo.delete(id);
  }
}