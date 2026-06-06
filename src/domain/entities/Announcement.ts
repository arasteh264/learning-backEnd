export interface Announcement {
  id: string;
  text: string;
  endDate: string; 
  isActive:boolean;
}

export interface IAnnouncementRepository {
  getActiveAnnouncement(): Promise<Announcement | null>;
}