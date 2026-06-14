import { CourseRepository } from "../../../domain/repositories/CourseRepository";

export class UpdateCourseUseCase {
  constructor(private courseRepo: CourseRepository) {}

  async execute(id: string, body: any) {
    const existingCourse = await this.courseRepo.findById(id);

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

    if (body.cover) {
      updateData.cover = body.cover;
    }

    return this.courseRepo.update(id, updateData);
  }
}