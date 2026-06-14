import { ArticleRepository } from "../../../domain/repositories/ArticleRepository";

export class UpdateArticleUseCase {
  constructor(private articleRepo: ArticleRepository) {}

  async execute(id: string, body: any, newCoverUrl?: string) {
    const existing = await this.articleRepo.findById(id);

    if (!existing) {
      throw new Error("مقاله یافت نشد");
    }

    const updateData: any = {
      title: body.title,
      slug: body.slug,
      summary: body.summary,
      content: body.content,
      category_id: body.category,
      author_id: body.author,
      status: body.status,
    };

    if (newCoverUrl) {
      updateData.cover = newCoverUrl;
    }

    return {
      result: await this.articleRepo.update(id, updateData),
      oldCover: existing.cover,
    };
  }
}