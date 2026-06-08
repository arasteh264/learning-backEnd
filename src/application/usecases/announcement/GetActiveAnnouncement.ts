import { AnnouncementRepository } from "../../../domain/repositories/AnnouncementRepository";

export class GetActiveAnnouncementUseCase {
  constructor(private repo: AnnouncementRepository) {}

  async execute() {
    return await this.repo.findActive();
  }
}