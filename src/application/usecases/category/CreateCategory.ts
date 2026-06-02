import { CategoryRepository } from "../../../domain/repositories/CategoryRepository";

export class CreateCategoryUseCase {
  constructor(private repo: CategoryRepository) {}

  async execute(data: any) {
    return await this.repo.create(data);
  }
}