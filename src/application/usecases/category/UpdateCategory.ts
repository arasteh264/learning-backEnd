import { CategoryRepository } from "../../../domain/repositories/CategoryRepository";

export class UpdateCategoryUseCase {
  constructor(private repo: CategoryRepository) {}

  async execute(id: string, data: any) {
    const updated = await this.repo.update(id, data);

    if (!updated) {
      throw new Error("Category not found");
    }

    return updated;
  }
}