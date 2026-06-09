
import { AnnouncementRepository } from "../../../domain/repositories/AnnouncementRepository";

export class IsActiveAnnouncementUseCase {
  constructor(
    private announcementRepository: AnnouncementRepository,
  ) {}

  async execute(id: string) {
    console.log(id);
    
    return await this.announcementRepository.isActive(id);
  }
  }