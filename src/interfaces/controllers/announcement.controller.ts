import { Request, Response } from "express";
import { CreateAnnouncementUseCase } from "../../application/usecases/announcement/CreateAnnouncement";
import { GetAllAnnouncementUseCase } from "../../application/usecases/announcement/GetAllAnnouncement";
import { UpdateAnnouncementUseCase } from "../../application/usecases/announcement/UpdateAnnouncement";
import { DeleteAnnouncementUseCase } from "../../application/usecases/announcement/DeleteAnnouncement";
import { IsActiveAnnouncementUseCase } from "../../application/usecases/announcement/StatueActiveAnnouncement";
import { GetActiveAnnouncementUseCase } from "../../application/usecases/announcement/GetActiveAnnouncement";
import { GetAnnouncementByIdUseCase } from "../../application/usecases/announcement/GetAnnouncementByIdUseCase";
import { ApiResponse } from "../../shared/http/api-response";
import { AnnouncementMessages } from "../../shared/messages/announcement.messages";
import { asyncHandler } from "../../shared/asyncHandler";

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

  create = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.createUseCase.execute(req.body);

    return ApiResponse.created(res, result, AnnouncementMessages.CREATED);
  });

  getAll = asyncHandler(async (_req: Request, res: Response) => {
    const result = await this.getAllUseCase.execute();

    return ApiResponse.success(res, result, AnnouncementMessages.FETCHED);
  });

  findById = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.getByIdUseCase.execute(req.params.id as string);

    return ApiResponse.success(res, result, AnnouncementMessages.FETCHED);
  });

  getActive = asyncHandler(async (_req: Request, res: Response) => {
    const result = await this.getActiveUseCase.execute();

    return ApiResponse.success(res, result, AnnouncementMessages.FETCHED);
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.updateUseCase.execute(req.params.id as string, req.body);

    return ApiResponse.success(res, result, AnnouncementMessages.UPDATED);
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    await this.deleteUseCase.execute(req.params.id as string);

    return ApiResponse.deleted(res, AnnouncementMessages.DELETED);
  });

  isActive = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.isActiveUseCase.execute(req.params.id as string);

    return ApiResponse.success(res, result, AnnouncementMessages.UPDATED);
  });
}
