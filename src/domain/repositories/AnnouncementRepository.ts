export interface AnnouncementRepository {
  create(data: any): Promise<any>;
  findAll(): Promise<any[]>;
  update(id: string, data: any): Promise<any>;
  delete(id: string): Promise<any>;
  isActive(id: string): Promise<any>;
  findActive(): Promise<any[]>;
}
