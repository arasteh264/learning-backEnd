import { Request, Response } from "express";
import { CreateSliderUseCase } from "../../application/usecases/slider/CreateSlider";
import { GetAllSlidersUseCase } from "../../application/usecases/slider/GetAllSliders";
import { GetSliderByIdUseCase } from "../../application/usecases/slider/GetSliderById";
import { UpdateSliderUseCase } from "../../application/usecases/slider/UpdateSlider";
import { DeleteSliderUseCase } from "../../application/usecases/slider/DeleteSlider";
import { uploadFile } from "../../config/uploadSupabase";
import { deleteFile } from "../../config/storageSupabase";
import { ApiResponse } from "../../shared/http/api-response";
import { asyncHandler } from "../../shared/asyncHandler";
import { SliderMessages } from "../../shared/messages/slider.messages";

type MulterRequest = Request & {
  file?: Express.Multer.File;
};

export class SliderController {
  constructor(
    private createUseCase: CreateSliderUseCase,
    private getAllUseCase: GetAllSlidersUseCase,
    private getByIdUseCase: GetSliderByIdUseCase,
    private updateUseCase: UpdateSliderUseCase,
    private deleteUseCase: DeleteSliderUseCase,
  ) {}

  create = asyncHandler(async (req: MulterRequest, res: Response) => {
    const file = req.file;

    if (!file) {
      throw new Error(SliderMessages.IMAGE_REQUIRED);
    }

    const { url } = await uploadFile(file, "sliders", "sliders");

    const result = await this.createUseCase.execute({
      ...req.body,
      image_url: url,
      is_active: false,
    });

    return ApiResponse.created(
      res,
      result,
      SliderMessages.CREATED,
    );
  });

  getAll = asyncHandler(async (_req: Request, res: Response) => {
    const result = await this.getAllUseCase.execute();

    return ApiResponse.success(
      res,
      result,
      SliderMessages.FETCHED,
    );
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.getByIdUseCase.execute(req.params.id as string);

    return ApiResponse.success(
      res,
      result,
      SliderMessages.FETCHED_ONE,
    );
  });

  update = asyncHandler(async (req: MulterRequest, res: Response) => {
    const id = req.params.id as string;
    let image_url: string | undefined;

    if (req.file) {
      const old = await this.getByIdUseCase.execute(id);

      if (old?.image_url) {
        await deleteFile(old.image_url, "sliders");
      }

      const uploaded = await uploadFile(req.file, "sliders", "sliders");
      image_url = uploaded.url;
    }

    const result = await this.updateUseCase.execute(id, {
      ...req.body,
      ...(image_url && { image_url }),
    });

    return ApiResponse.success(
      res,
      result,
      SliderMessages.UPDATED,
    );
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;

    const slider = await this.getByIdUseCase.execute(id);

    if (slider?.image_url) {
      await deleteFile(slider.image_url, "sliders");
    }

    await this.deleteUseCase.execute(id);

    return ApiResponse.deleted(
      res,
      SliderMessages.DELETED,
    );
  });
}