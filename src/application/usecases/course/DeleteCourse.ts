
import { CourseRepository } from "../../../domain/repositories/CourseRepository";
import { ISessionRepository } from "../../../domain/repositories/ISessionRepository";
import { IStorageService } from "../../../domain/services/IStorageService";
export class DeleteCourseUseCase {

  constructor(
    private courseRepo: CourseRepository,
    private sessionRepo: ISessionRepository,
    private storageService: IStorageService
  ) {}

  async execute(courseId: string) {

    const course =
      await this.courseRepo.findById(courseId);

    if (!course) {
      throw new Error("دوره یافت نشد");
    }

    await this.sessionRepo.deleteByCourseId(
      courseId
    );

    if (course.cover) {
      await this.storageService.delete(
        course.cover,
        "images"
      );
    }

    await this.courseRepo.delete(courseId);
  }
}