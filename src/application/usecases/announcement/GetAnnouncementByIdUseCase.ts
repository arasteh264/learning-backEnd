import { AnnouncementRepository } from "../../../domain/repositories/AnnouncementRepository";

export class GetAnnouncementByIdUseCase {
  constructor(private repo: AnnouncementRepository) {}

  async execute(id: string) {
    return await this.repo.findById(id);
  }
}