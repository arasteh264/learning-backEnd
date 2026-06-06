import { CourseRepository } from "../../../domain/repositories/CourseRepository";
import { Course } from "../../../domain/entities/Course";
import { IStorageService } from "../../../domain/services/IStorageService";

export class CreateCourseUseCase {
  constructor(
    private courseRepo: CourseRepository,
    private storageService: IStorageService
  ) {}

  async execute(data: Partial<Course>, file?: Express.Multer.File) {
    if (!file) {
      throw new Error("Cover is required");
    }

    const uploaded = await this.storageService.upload(
      file,
      "images",
      "courses"
    );

    return await this.courseRepo.create({
      ...data,
      cover: uploaded.url,
    });
  }
}
