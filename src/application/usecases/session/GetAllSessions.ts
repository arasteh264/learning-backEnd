import { SessionRepository } from "../../../domain/repositories/SessionRepository";

export class GetAllSessionsUseCase {
  constructor(private sessionRepo: SessionRepository) {}

  async execute() {
    const sessions = await this.sessionRepo.findAll();

    return sessions.map((s: any) => ({
      id: s.id,
      title: s.title,
      time: s.time,
      free: s.free,
      courseName: s.courses?.name,
      video: s.video
    }));
  }
}