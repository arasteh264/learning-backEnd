import { CourseRepository } from "../../../domain/repositories/CourseRepository";

export class GetPopularFreeCoursesUseCase {
  constructor(private courseRepo: CourseRepository) {}

  async execute(limit: number = 8) {
    return await this.courseRepo.findPopularFree(limit);
  }
}