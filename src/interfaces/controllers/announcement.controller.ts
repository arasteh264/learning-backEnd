import { Request, Response } from "express";
import { CreateAnnouncementUseCase } from "../../application/usecases/announcement/CreateAnnouncement";
import { GetAllAnnouncementUseCase } from "../../application/usecases/announcement/GetAllAnnouncement";
import { UpdateAnnouncementUseCase } from "../../application/usecases/announcement/UpdateAnnouncement";
import { DeleteAnnouncementUseCase } from "../../application/usecases/announcement/DeleteAnnouncement";
import { IsActiveAnnouncementUseCase } from "../../application/usecases/announcement/StatueActiveAnnouncement";
import { GetActiveAnnouncementUseCase } from "../../application/usecases/announcement/GetActiveAnnouncement";
import { GetAnnouncementByIdUseCase } from "../../application/usecases/announcement/GetAnnouncementByIdUseCase";

export class AnnouncementController {
  constructor(
    private createUseCase: CreateAnnouncementUseCase,
    private getAllUseCase: GetAllAnnouncementUseCase,
    private updateUseCase: UpdateAnnouncementUseCase,
    private deleteUseCase: DeleteAnnouncementUseCase,
    private isActiveUseCase: IsActiveAnnouncementUseCase,
    private getActiveUseCase: GetActiveAnnouncementUseCase,
    private getByIdUseCase: GetAnnouncementByIdUseCase,
  ) {}

  create = async (req: Request, res: Response) => {
    console.log(req.body);

    try {
      const result = await this.createUseCase.execute(req.body);

      return res.status(201).json({
        message: " با موفقیت افزوده شد",
        Announcement: result,
      });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  };

  getAll = async (_req: Request, res: Response) => {
    const result = await this.getAllUseCase.execute();

    return res.status(200).json(result);
  };
  findById = async (req: Request, res: Response) => {
    const result = await this.getByIdUseCase.execute(req.params.id as string);

    return res.status(200).json(result);
  };
  getActive = async (_req: Request, res: Response) => {
    const result = await this.getActiveUseCase.execute();
    return res.status(200).json(result);
  };

  update = async (req: Request, res: Response) => {
    try {
      const result = await this.updateUseCase.execute(
        req.params.id as string,
        req.body,
      );

      return res.json({
        message: "بنر ویرایش شد",
        Announcement: result,
      });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    console.log(req.params.id);

    try {
      await this.deleteUseCase.execute(req.params.id as string);

      return res.json({
        message: "بنر حذف شد",
      });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  };
  isActive = async (req: Request, res: Response) => {
    try {
      const result = await this.isActiveUseCase.execute(
        req.params.id as string,
      );
      return res.status(200).json({
        message: "وضعیت بنر تغییر کرد",
        Announcement: result,
      });
    } catch (error: any) {
      console.error("FULL ERROR:", JSON.stringify(error, null, 2));
      return res.status(500).json({
        message: error.message,
        details: error,
      });
    }
  };
}
