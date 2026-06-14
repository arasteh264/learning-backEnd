import { ArticleRepository } from "../../../domain/repositories/ArticleRepository";

function slugify(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FFa-z0-9-]/g, "");
}

export class CreateArticleUseCase {
  constructor(private articleRepo: ArticleRepository) {}

  async execute(data: any) {
    if (!data.title) throw new Error("عنوان الزامی است");
    if (!data.content) throw new Error("محتوای مقاله الزامی است");

    const insertData = {
      title: data.title,
      slug: data.slug || slugify(data.title),
      summary: data.summary,
      content: data.content,
      cover: data.cover,
      category_id: data.category,
      author_id: data.author,
      status: data.status || "draft",
    };

    return await this.articleRepo.create(insertData);
  }
}