import { CategoryRepository } from "../../../domain/repositories/CategoryRepository";

export class GetAllCategoriesUseCase {
  constructor(private repo: CategoryRepository) {}

  async execute() {
    return await this.repo.findAll();
  }
}