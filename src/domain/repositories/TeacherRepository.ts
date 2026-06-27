export interface TeacherRepository {
  create(data: any): Promise<any>;
  findAll(): Promise<any[]>;
  findVerified(): Promise<any[]>;
  findByUserId(userId: string): Promise<any | null>;
  update(id: string, data: any): Promise<any>;
  delete(id: string): Promise<any>;
  findById(id: string): Promise<any | null>;
}