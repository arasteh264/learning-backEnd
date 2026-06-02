import { CategoryRepository } from "../../../domain/repositories/CategoryRepository";

export class DeleteCategoryUseCase {
  constructor(private repo: CategoryRepository) {}

  async execute(id: string) {
    const deleted = await this.repo.delete(id);

    if (!deleted) {
      throw new Error("Category not found");
    }

    return deleted;
  }
}