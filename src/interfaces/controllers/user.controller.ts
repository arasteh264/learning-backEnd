import { Request, Response } from "express";
import { GetAllUsersUseCase } from "../../application/usecases/user/GetAllUsersUseCase";
import { RemoveUserUseCase } from "../../application/usecases/user/RemoveUserUseCase";
import { UpdateUserUseCase } from "../../application/usecases/user/UpdateUserUseCase";
import { ChangeRoleUseCase } from "../../application/usecases/user/ChangeRoleUseCase";
import { GetProfileUseCase } from "../../application/usecases/user/GetProfileUseCase";

import { ApiResponse } from "../../shared/http/api-response";
import { asyncHandler } from "../../shared/asyncHandler";
import { UserMessages } from "../../shared/messages/user.messages";
import { BanUserUseCase } from "../../application/usecases/user/BanUserUseCase";

type AuthRequest = Request & {
  user: { id: string };
};

export class UserController {
  constructor(
    private banUser: BanUserUseCase,
    private getAllUsers: GetAllUsersUseCase,
    private removeUser: RemoveUserUseCase,
    private changeRole: ChangeRoleUseCase,
    private updateUser: UpdateUserUseCase,
    private getProfile: GetProfileUseCase,
  ) {}

  ban = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.banUser.execute(req.params.id as string);

    return ApiResponse.success(
      res,
      result,
      UserMessages.BANNED,
    );
  });

  getAll = asyncHandler(async (_req: Request, res: Response) => {
    const result = await this.getAllUsers.execute();

    return ApiResponse.success(
      res,
      result,
      UserMessages.FETCHED,
    );
  });

  remove = asyncHandler(async (req: Request, res: Response) => {
    await this.removeUser.execute(req.params.id as string);

    return ApiResponse.deleted(
      res,
      UserMessages.REMOVED,
    );
  });

  changeRoleUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.changeRole.execute(req.params.id as string);

    return ApiResponse.success(
      res,
      result,
      UserMessages.ROLE_CHANGED,
    );
  });

  update = asyncHandler(async (req: AuthRequest, res: Response) => {
    const result = await this.updateUser.execute(
      req.user.id,
      req.body,
    );

    return ApiResponse.success(
      res,
      result,
      UserMessages.UPDATE
    );
  });

  profile = asyncHandler(async (req: AuthRequest, res: Response) => {
    const result = await this.getProfile.execute(req.user.id);

    return ApiResponse.success(
      res,
      result,
      UserMessages.PROFILE_FETCHED,
    );
  });
}