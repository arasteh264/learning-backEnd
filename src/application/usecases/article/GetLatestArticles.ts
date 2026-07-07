import { ArticleRepository } from "../../../domain/repositories/ArticleRepository";

export class GetLatestArticlesUseCase {
  constructor(
    private articleRepository: ArticleRepository
  ) {
    console.log("🚀 ~ GetLatestArticlesUseCase ~ constructor ~ articleRepository:", articleRepository)
  }

  async execute(limit: number=8) {
    return await this.articleRepository.findLatest(limit);
  }
}
