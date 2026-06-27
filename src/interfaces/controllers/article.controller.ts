import { Request, Response } from "express";
import { CreateArticleUseCase } from "../../application/usecases/article/CreateArticle";
import { GetAllArticlesUseCase } from "../../application/usecases/article/GetAllArticles";
import { GetArticleBySlugUseCase } from "../../application/usecases/article/GetArticleBySlug";
import { UpdateArticleUseCase } from "../../application/usecases/article/UpdateArticle";
import { DeleteArticleUseCase } from "../../application/usecases/article/DeleteArticle";
import { uploadFile } from "../../config/uploadSupabase";
import { deleteFile } from "../../config/storageSupabase";
import { ApiResponse } from "../../shared/http/api-response";
import { asyncHandler } from "../../shared/asyncHandler";
import { ArticleMessages } from "../../shared/messages/article.messages";

type MulterRequest = Request & {
  file?: Express.Multer.File;
};

export class ArticleController {
  constructor(
    private createArticleUseCase: CreateArticleUseCase,
    private getAllArticlesUseCase: GetAllArticlesUseCase,
    private getArticleBySlugUseCase: GetArticleBySlugUseCase,
    private updateArticleUseCase: UpdateArticleUseCase,
    private deleteArticleUseCase: DeleteArticleUseCase,
  ) {}

  createArticle = asyncHandler(async (req: MulterRequest, res: Response) => {
    let cover: string | undefined;

    if (req.file) {
      const { url } = await uploadFile(req.file, "articles", "covers");
      cover = url;
    }

    const result = await this.createArticleUseCase.execute({
      ...req.body,
      cover,
    });

    return ApiResponse.created(
      res,
      result,
      ArticleMessages.CREATED,
    );
  });

  getAllArticles = asyncHandler(async (req: Request, res: Response) => {
    const status = req.query.status as string | undefined;

    const articles = await this.getAllArticlesUseCase.execute({ status });

    return ApiResponse.success(res, articles, ArticleMessages.FETCHED);
  });

  getArticleById = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;

    const article = await this.getArticleBySlugUseCase.execute(id);

    return ApiResponse.success(res, article, ArticleMessages.FETCHED_ONE);
  });

  updateArticle = asyncHandler(async (req: MulterRequest, res: Response) => {
    const id = req.params.id as string;

    let newCoverUrl: string | undefined;

    if (req.file) {
      const { url } = await uploadFile(req.file, "articles", "covers");
      newCoverUrl = url;
    }

    const { result, oldCover } =
      await this.updateArticleUseCase.execute(
        id,
        req.body,
        newCoverUrl,
      );

    if (newCoverUrl && oldCover) {
      await deleteFile(oldCover, "articles");
    }

    return ApiResponse.success(
      res,
      result,
      ArticleMessages.UPDATED,
    );
  });

  deleteArticle = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;

    await this.deleteArticleUseCase.execute(id);

    return ApiResponse.deleted(
      res,
      ArticleMessages.DELETED,
    );
  });
}