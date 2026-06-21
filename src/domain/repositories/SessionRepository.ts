export interface SessionRepository {
  create(data: any): Promise<any>;
  findAll(): Promise<any[]>;
  findById(id: string): Promise<any>;
  update(id: string, data: any): Promise<any>;
  delete(id: string): Promise<any>;
  deleteByCourseId(courseId: string): Promise<void>;
 findByCourseId(courseId: string): Promise<any[]>;
}