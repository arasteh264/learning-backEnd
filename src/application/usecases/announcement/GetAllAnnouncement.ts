import { AnnouncementRepository } from "../../../domain/repositories/AnnouncementRepository";

export class GetAllAnnouncementUseCase {
  constructor(private repo: AnnouncementRepository) {}

  async execute() {
    return await this.repo.findAll();
  }
}