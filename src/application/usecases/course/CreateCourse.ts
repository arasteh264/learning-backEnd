import { CourseRepository } from "../../../domain/repositories/CourseRepository";

export class CreateCourseUseCase {
  constructor(
    private courseRepo: CourseRepository,
    private storageService: any
  ) {}

  async execute(data: any, file: any) {
    if (!file) {
      throw new Error("Cover is required");
    }

    const uploaded = await this.storageService.uploadFile(
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