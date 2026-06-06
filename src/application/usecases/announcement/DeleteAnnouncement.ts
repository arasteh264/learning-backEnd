import { AnnouncementRepository } from "../../../domain/repositories/AnnouncementRepository";

export class DeleteAnnouncementUseCase {
  constructor(private repo: AnnouncementRepository) {}

  async execute(id: string) {
    const deleted = await this.repo.delete(id);

    if (!deleted) {
      throw new Error("Announcement not found");
    }

    return deleted;
  }
}