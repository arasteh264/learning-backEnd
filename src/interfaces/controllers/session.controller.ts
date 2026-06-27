import { Request, Response } from "express";
import { GetAllSessionsUseCase } from "../../application/usecases/session/GetAllSessions";
import { GetSessionsByCourseUseCase } from "../../application/usecases/session/Getsessionsbycourse";
import { DeleteSessionUseCase } from "../../application/usecases/session/DeleteSession";
import { UpdateSessionUseCase } from "../../application/usecases/session/UpdateSession";
import { CreateSessionUseCase } from "../../application/usecases/session/CreateSession";
import { GetSessionByIdUseCase } from "../../application/usecases/session/Getsessionbyid";
import { ApiResponse } from "../../shared/http/api-response";
import { asyncHandler } from "../../shared/asyncHandler";
import { SessionMessages } from "../../shared/messages/session.messages";

type MulterRequest = Request & {
  file?: Express.Multer.File;
};

export class SessionController {
  constructor(
    private createSession: CreateSessionUseCase,
    private getAllSessions: GetAllSessionsUseCase,
    private getSessionById: GetSessionByIdUseCase,
    private getSessionsByCourse: GetSessionsByCourseUseCase,
    private updateSession: UpdateSessionUseCase,
    private deleteSession: DeleteSessionUseCase,
  ) {}

  create = asyncHandler(async (req: MulterRequest, res: Response) => {
    const result = await this.createSession.execute(
      req.body,
      req.file,
      req.params.courseId as string,
    );

    return ApiResponse.created(
      res,
      result,
      SessionMessages.CREATED,
    );
  });

  getAll = asyncHandler(async (_req: Request, res: Response) => {
    const result = await this.getAllSessions.execute();

    return ApiResponse.success(
      res,
      result,
      SessionMessages.FETCHED,
    );
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.getSessionById.execute(req.params.id as string);

    return ApiResponse.success(
      res,
      result,
      SessionMessages.FETCHED_ONE,
    );
  });

  getByCourse = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.getSessionsByCourse.execute(
      req.params.courseId as string,
    );

    return ApiResponse.success(
      res,
      result,
      SessionMessages.FETCHED_BY_COURSE,
    );
  });

  update = asyncHandler(async (req: MulterRequest, res: Response) => {
    const result = await this.updateSession.execute(
      req.params.id as string,
      req.body,
      req.file,
    );

    return ApiResponse.success(
      res,
      result,
      SessionMessages.UPDATED,
    );
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    await this.deleteSession.execute(req.params.id as string);

    return ApiResponse.deleted(
      res,
      SessionMessages.DELETED,
    );
  });
}