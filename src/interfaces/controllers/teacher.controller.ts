import { Request, Response } from "express";
import { CreateTeacherUseCase } from "../../application/usecases/teacher/CreateTeacher";
import { GetAllTeachersUseCase } from "../../application/usecases/teacher/GetAllTeachers";
import { RequestForTeacherUseCase } from "../../application/usecases/teacher/RequestForTeacher";
import { VerifyTeacherUseCase } from "../../application/usecases/teacher/VerifyTeacher";
import { RemoveTeacherUseCase } from "../../application/usecases/teacher/RemoveTeacher";
import { GetVerifiedTeachersUseCase } from "../../application/usecases/teacher/GetVerifiedTeachers";
import { ApiResponse } from "../../shared/http/api-response";
import { asyncHandler } from "../../shared/asyncHandler";
import { TeacherMessages } from "../../shared/messages/teacher.messages";

type AuthRequest = Request & {
  user?: { id: string };
};

export class TeacherController {
  constructor(
    private createTeacherUC: CreateTeacherUseCase,
    private getAllTeachersUC: GetAllTeachersUseCase,
    private requestTeacherUC: RequestForTeacherUseCase,
    private verifyTeacherUC: VerifyTeacherUseCase,
    private removeTeacherUC: RemoveTeacherUseCase,
    private getVerifiedTeachersUC: GetVerifiedTeachersUseCase,
  ) {}

  create = asyncHandler(async (req: Request, res: Response) => {
    const { userId, bio, expertise } = req.body;

    const result = await this.createTeacherUC.execute(
      userId,
      bio,
      expertise,
    );

    return ApiResponse.created(
      res,
      result,
      TeacherMessages.CREATED,
    );
  });

  getAll = asyncHandler(async (_req: Request, res: Response) => {
    const result = await this.getAllTeachersUC.execute();

    return ApiResponse.success(
      res,
      result,
      TeacherMessages.FETCHED,
    );
  });

  request = asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.user?.id) {
      throw new Error(TeacherMessages.UNAUTHORIZED);
    }

    const result = await this.requestTeacherUC.execute(
      req.user.id,
      req.body.bio,
      req.body.expertise,
    );

    return ApiResponse.success(
      res,
      result,
      TeacherMessages.REQUESTED,
    );
  });

  verify = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.verifyTeacherUC.execute(req.params.id as string);

    return ApiResponse.success(
      res,
      result,
      TeacherMessages.VERIFIED,
    );
  });

  remove = asyncHandler(async (req: Request, res: Response) => {
    await this.removeTeacherUC.execute(req.params.id as string);

    return ApiResponse.deleted(
      res,
      TeacherMessages.REMOVED,
    );
  });

  getVerified = asyncHandler(async (_req: Request, res: Response) => {
    const result = await this.getVerifiedTeachersUC.execute();

    return ApiResponse.success(
      res,
      result,
      TeacherMessages.FETCHED_VERIFIED,
    );
  });
}