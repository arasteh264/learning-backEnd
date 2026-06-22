import { Course } from "../../../domain/entities/Course";
import { CourseRepository } from "../../../domain/repositories/CourseRepository";
 
export class GetCourseUseCase {
  constructor(private courseRepository: CourseRepository) {}
 
  async execute(id: string): Promise<Course> {
    if (!id) {
      throw new Error("شناسه دوره الزامی است");
    }
 
    const course = await this.courseRepository.findById(id);
 
    if (!course) {
      throw new Error("دوره مورد نظر یافت نشد");
    }
 
    return course;
  }
}