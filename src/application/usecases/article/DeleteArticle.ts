import { ArticleRepository } from "../../../domain/repositories/ArticleRepository";
import { deleteFile } from "../../../config/storageSupabase";

export class DeleteArticleUseCase {
  constructor(private articleRepo: ArticleRepository) {}

  async execute(id: string) {
    const article = await this.articleRepo.findById(id);

    if (!article) {
      throw new Error("مقاله یافت نشد");
    }

    if (article.cover) {
      await deleteFile(article.cover, "articles");
    }

    await this.articleRepo.delete(id);
  }
}