import { Request, Response } from "express";
import { CreateCategoryUseCase } from "../../../application/usecases/category/CreateCategory";
import { GetAllCategoriesUseCase } from "../../../application/usecases/category/GetAllCategories";
import { UpdateCategoryUseCase } from "../../../application/usecases/category/UpdateCategory";
import { DeleteCategoryUseCase } from "../../../application/usecases/category/DeleteCategory";
export class CategoryController {
  constructor(
    private createUseCase: CreateCategoryUseCase,
    private getAllUseCase: GetAllCategoriesUseCase,
    private updateUseCase: UpdateCategoryUseCase,
    private deleteUseCase: DeleteCategoryUseCase,
  ) {}

  create = async (req: Request, res: Response) => {
    try {
      const result = await this.createUseCase.execute(req.body);

      return res.status(201).json({
        message: "دسته بندی با موفقیت افزوده شد",
        category: result,
      });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  };

  getAll = async (_req: Request, res: Response) => {
    const result = await this.getAllUseCase.execute();
    return res.status(200).json(result);
  };

  update = async (req: Request, res: Response) => {
    try {
      const result = await this.updateUseCase.execute(
        req.params.id as string,
        req.body,
      );

      return res.json({
        message: "کتگوری ویرایش شد",
        category: result,
      });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      await this.deleteUseCase.execute(req.params.id as string);

      return res.json({
        message: "کتگوری حذف شد",
      });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  };
}
