import { ArticleRepository } from "../../../domain/repositories/ArticleRepository";

export class GetAllArticlesUseCase {
  constructor(private articleRepo: ArticleRepository) {}

  async execute(filters?: { status?: string }) {
    return await this.articleRepo.findAll(filters);
  }
}