import { CourseRepository } from "../../../domain/repositories/CourseRepository";

export class SearchCourseUseCase {
  constructor(private courseRepo: CourseRepository) {}

  async execute(query: string) {
    if (!query || !query.trim()) {
      return [];
    }
    return await this.courseRepo.search(query.trim());
  }
}