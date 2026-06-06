import { Request, Response } from "express";
import { CreateAnnouncementUseCase } from "../../application/usecases/announcement/CreateAnnouncement";
import { GetAllAnnouncementUseCase } from "../../application/usecases/announcement/GetAllAnnouncement";
import { UpdateAnnouncementUseCase } from "../../application/usecases/announcement/UpdateAnnouncement";
import { DeleteAnnouncementUseCase } from "../../application/usecases/announcement/DeleteAnnouncement";
import { IsActiveAnnouncementUseCase } from "../../application/usecases/announcement/StatueActiveAnnouncement";

export class AnnouncementController {
  constructor(
    private createUseCase: CreateAnnouncementUseCase,
    private getAllUseCase: GetAllAnnouncementUseCase,
    private updateUseCase: UpdateAnnouncementUseCase,
    private deleteUseCase: DeleteAnnouncementUseCase,
    private isActiveUseCase: IsActiveAnnouncementUseCase,
  ) {}

  create = async (req: Request, res: Response) => {
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
    try {
      await this.deleteUseCase.execute(req.params.id as string);

      return res.json({
        message: "بنر حذف شد",
      });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  };
  isActive=async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        
    }
  }
}
