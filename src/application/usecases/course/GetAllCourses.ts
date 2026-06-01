import { CourseRepository } from "../../../domain/repositories/CourseRepository";

export class GetAllCourses {
  constructor(private courseRepo: CourseRepository) {}

  async execute() {
    return await this.courseRepo.findAll();
  }
}