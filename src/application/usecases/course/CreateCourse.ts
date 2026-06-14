import { CourseRepository } from "../../../domain/repositories/CourseRepository";

export class CreateCourseUseCase {
  constructor(private courseRepo: CourseRepository) {}

  async execute(data: any) {
    if (!data.cover) {
      throw new Error("Cover is required");
    }

    const insertData = {
      name: data.name,
      description: data.description,
      support: data.support,
      href: data.href,
      price: data.price,
      status: data.status,
      discount: data.discount,
      category_id: data.category,
      creator_id: data.creator,
      cover: data.cover,
    };

    return await this.courseRepo.create(insertData);
  }
}