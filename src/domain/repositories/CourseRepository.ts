import { Course } from "../entities/Course";

export interface CourseRepository {
  create(course: Partial<Course>): Promise<Course>;
  findAll(): Promise<Course[]>;
  findById(id: string): Promise<Course | null>;
  update(id: string, data: Partial<Course>): Promise<Course>;
  delete(id: string): Promise<void>;
  search(query: string): Promise<any[]>;
  findLatest(limit?: number): Promise<any[]>;
  findPopularFree(limit?: number): Promise<any[]>;
}