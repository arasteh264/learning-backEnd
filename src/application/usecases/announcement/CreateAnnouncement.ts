import { AnnouncementRepository } from "../../../domain/repositories/AnnouncementRepository";

export class CreateAnnouncementUseCase {
  constructor(private repo: AnnouncementRepository) {}

  async execute(data: any) {
    return await this.repo.create(data);
  }
}