import { ArticleRepository } from "../../../domain/repositories/ArticleRepository";

export class GetArticleBySlugUseCase {
  constructor(private articleRepo: ArticleRepository) {}

  async execute(slug: string) {
    const article = await this.articleRepo.findBySlug(slug);

    if (!article) {
      throw new Error("مقاله یافت نشد");
    }

    await this.articleRepo.incrementViews(article.id);

    return article;
  }
}