export interface Announcement {
  id: string;
  text: string;
  end_date: string;
  is_active: boolean;
}

export interface IAnnouncementRepository {
  getActiveAnnouncement(): Promise<Announcement | null>;
}
