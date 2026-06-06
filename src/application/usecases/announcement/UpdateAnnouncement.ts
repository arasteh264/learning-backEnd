import { AnnouncementRepository } from "../../../domain/repositories/AnnouncementRepository";

export class UpdateAnnouncementUseCase {
  constructor(private repo: AnnouncementRepository) {}

  async execute(id: string, data: any) {
    const updated = await this.repo.update(id, data);

    if (!updated) {
      throw new Error("Announcement not found");
    }

    return updated;
  }
}