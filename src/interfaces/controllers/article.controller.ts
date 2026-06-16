import { Request, Response } from "express";
import { CreateArticleUseCase } from "../../application/usecases/article/CreateArticle";
import { GetAllArticlesUseCase } from "../../application/usecases/article/GetAllArticles";
import { GetArticleBySlugUseCase as GetArticleByIdUseCase } from "../../application/usecases/article/GetArticleBySlug";
import { UpdateArticleUseCase } from "../../application/usecases/article/UpdateArticle";
import { DeleteArticleUseCase } from "../../application/usecases/article/DeleteArticle";
import { uploadFile } from "../../config/uploadSupabase";
import { deleteFile } from "../../config/storageSupabase";

type MulterRequest = Request & {
  file?: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination: string;
    filename: string;
    path: string;
    buffer: Buffer;
  };
};

export class ArticleController {
  constructor(
    private createArticleUseCase: CreateArticleUseCase,
    private getAllArticlesUseCase: GetAllArticlesUseCase,
    private getArticleBySlugUseCase: GetArticleByIdUseCase,
    private updateArticleUseCase: UpdateArticleUseCase,
    private deleteArticleUseCase: DeleteArticleUseCase,
    private getArticleByIdUseCase: GetArticleByIdUseCase
  ) {}

  createArticle = async (req: MulterRequest, res: Response) => {
    try {
      let cover: string | undefined;

      if (req.file) {
        const { url } = await uploadFile(req.file, "articles", "covers");
        cover = url;
      }

      const result = await this.createArticleUseCase.execute({
        ...req.body,
        cover,
      });

      return res.status(201).json({
        message: "مقاله با موفقیت ایجاد شد",
        article: result,
      });
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  };

  getAllArticles = async (req: Request, res: Response) => {
    try {
      const status = req.query.status as string | undefined;
      const articles = await this.getAllArticlesUseCase.execute({ status });
      return res.status(200).json(articles);
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  };

  getArticleById = async (req: Request, res: Response) => {
    try {
      
      
      const article = await this.getArticleByIdUseCase.execute(
        req.params.id as string
      );
      return res.status(200).json(article);
    } catch (err: any) {
      return res.status(404).json({ message: err.message });
    }
  };

  updateArticle = async (req: MulterRequest, res: Response) => {
    try {
      const id = req.params.id as string;
      let newCoverUrl: string | undefined;

      if (req.file) {
        const { url } = await uploadFile(req.file, "articles", "covers");
        newCoverUrl = url;
      }

      const { result, oldCover } = await this.updateArticleUseCase.execute(
        id,
        req.body,
        newCoverUrl
      );

      if (newCoverUrl && oldCover) {
        await deleteFile(oldCover, "articles");
      }

      return res.status(200).json({
        message: "مقاله با موفقیت ویرایش شد",
        article: result,
      });
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  };

  deleteArticle = async (req: Request, res: Response) => {
    try {
      await this.deleteArticleUseCase.execute(req.params.id as string);
      return res.status(200).json({ message: "مقاله با موفقیت حذف شد" });
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  };
}