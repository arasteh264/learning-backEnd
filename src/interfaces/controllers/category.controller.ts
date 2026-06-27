import { Request, Response } from "express";
import { CreateCategoryUseCase } from "../../application/usecases/category/CreateCategory";
import { GetAllCategoriesUseCase } from "../../application/usecases/category/GetAllCategories";
import { UpdateCategoryUseCase } from "../../application/usecases/category/UpdateCategory";
import { DeleteCategoryUseCase } from "../../application/usecases/category/DeleteCategory";
import { ApiResponse } from "../../shared/http/api-response";
import { asyncHandler } from "../../shared/asyncHandler";
import { CategoryMessages } from "../../shared/messages/category.messages";

export class CategoryController {
  constructor(
    private createUseCase: CreateCategoryUseCase,
    private getAllUseCase: GetAllCategoriesUseCase,
    private updateUseCase: UpdateCategoryUseCase,
    private deleteUseCase: DeleteCategoryUseCase,
  ) {}

  create = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.createUseCase.execute(req.body);

    return ApiResponse.created(
      res,
      result,
      CategoryMessages.CREATED,
    );
  });

  getAll = asyncHandler(async (_req: Request, res: Response) => {
    const result = await this.getAllUseCase.execute();

    return ApiResponse.success(
      res,
      result,
      CategoryMessages.FETCHED,
    );
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;

    const result = await this.updateUseCase.execute(
      id,
      req.body,
    );

    return ApiResponse.success(
      res,
      result,
      CategoryMessages.UPDATED,
    );
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;

    await this.deleteUseCase.execute(id);

    return ApiResponse.deleted(
      res,
      CategoryMessages.DELETED,
    );
  });
}