import { Announcement } from "../entities/Announcement";

export interface AnnouncementRepository {
  create(data: Announcement): Promise<Announcement>;

  findById(id: string): Promise<Announcement | null>;

  findAll(): Promise<Announcement[]>;

  update(id: string, data: Partial<Announcement>): Promise<Announcement>;

  delete(id: string): Promise<void>;

  findActive(): Promise<Announcement | null>;
}