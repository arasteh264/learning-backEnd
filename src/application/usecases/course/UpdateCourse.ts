import { CourseRepository } from "../../../domain/repositories/CourseRepository";
import { IStorageService } from "../../../domain/services/IStorageService";

export class UpdateCourseUseCase {

  constructor(
    private courseRepo: CourseRepository,
    private storage: IStorageService
  ) {}

  async execute(
    id: string,
    body: any,
    file?: Express.Multer.File
  ) {

    const existingCourse =
      await this.courseRepo.findById(id);

    if (!existingCourse) {
      throw new Error("دوره یافت نشد");
    }

    const updateData: any = {
      name: body.name,
      description: body.description,
      support: body.support,
      href: body.href,
      price: body.price,
      status: body.status,
      discount: body.discount,
      category_id: body.category,
      creator_id: body.creator,
    };

    if (file) {

      if (existingCourse.cover) {
        await this.storage.delete(
          existingCourse.cover,
          "images"
        );
      }

      const uploaded =
        await this.storage.upload(
          file,
          "images",
          "courses"
        );

      updateData.cover = uploaded.url;
    }

    return this.courseRepo.update(id, updateData);
  }
}