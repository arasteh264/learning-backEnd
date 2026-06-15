import { ArticleRepository } from "../../../domain/repositories/ArticleRepository";

export class GetArticleBySlugUseCase {
  constructor(private articleRepo: ArticleRepository) {}

  async execute(id: string) {
    const article = await this.articleRepo.findById(id);

    if (!article) {
      throw new Error("مقاله یافت نشد");
    }

    await this.articleRepo.incrementViews(article.id);

    return article;
  }
}