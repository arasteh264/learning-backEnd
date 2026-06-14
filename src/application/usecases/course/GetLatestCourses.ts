import { CourseRepository } from "../../../domain/repositories/CourseRepository";

export class GetLatestCoursesUseCase {
  constructor(private courseRepo: CourseRepository) {}

  async execute(limit: number = 8) {
    return await this.courseRepo.findLatest(limit);
  }
}
