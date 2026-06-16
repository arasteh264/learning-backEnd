import { ArticleRepository } from "../../../domain/repositories/ArticleRepository";

export class GetArticleByIdUseCase {
  constructor(private articleRepo: ArticleRepository) {}

  async execute(id: string) {
    const article = await this.articleRepo.findById(id);
    if (!article) throw new Error("مقاله یافت نشد");
    return article;
  }
}