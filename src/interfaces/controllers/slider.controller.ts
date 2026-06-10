import { Request, Response } from "express";
import { CreateSliderUseCase } from "../../application/usecases/slider/CreateSlider";
import { GetAllSlidersUseCase } from "../../application/usecases/slider/GetAllSliders";
import { GetSliderByIdUseCase } from "../../application/usecases/slider/GetSliderById";
import { UpdateSliderUseCase } from "../../application/usecases/slider/UpdateSlider";
import { DeleteSliderUseCase } from "../../application/usecases/slider/DeleteSlider";
import { uploadFile } from "../../config/uploadSupabase";
import { deleteFile } from "../../config/storageSupabase";

export class SliderController {
  constructor(
    private createUseCase: CreateSliderUseCase,
    private getAllUseCase: GetAllSlidersUseCase,
    private getByIdUseCase: GetSliderByIdUseCase,
    private updateUseCase: UpdateSliderUseCase,
    private deleteUseCase: DeleteSliderUseCase,
  ) {}

create = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: "عکس الزامی است" });

    const { url } = await uploadFile(file, "sliders", "sliders");

    const result = await this.createUseCase.execute({
      ...req.body,
      image_url: url,
      is_active: false,
    });

    return res.status(201).json({
      message: "اسلایدر با موفقیت افزوده شد",
      slider: result,
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

  getAll = async (_req: Request, res: Response) => {
    try {
      const result = await this.getAllUseCase.execute();
      return res.status(200).json(result);
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const result = await this.getByIdUseCase.execute(req.params.id as string);
      return res.status(200).json(result);
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  };

update = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    let image_url: string | undefined;

    if (file) {
      const old = await this.getByIdUseCase.execute(req.params.id as string);
      if (old?.image_url) await deleteFile(old.image_url, "sliders");

      const uploaded = await uploadFile(file, "sliders", "sliders");
      image_url = uploaded.url;
    }

    const result = await this.updateUseCase.execute(req.params.id as string, {
      ...req.body,
      ...(image_url && { image_url }),
    });

    return res.status(200).json({
      message: "اسلایدر ویرایش شد",
      slider: result,
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

  delete = async (req: Request, res: Response) => {
  try {
    const slider = await this.getByIdUseCase.execute(req.params.id as string);
    
    if (slider?.image_url) await deleteFile(slider.image_url, "sliders");

    await this.deleteUseCase.execute(req.params.id as string);
    
    return res.status(200).json({ message: "اسلایدر حذف شد" });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
}