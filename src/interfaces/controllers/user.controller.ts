import { Request, Response } from "express";
import { BanUserUseCase } from "../../application/usecases/user/BanUserUseCase";
import { GetAllUsersUseCase } from "../../application/usecases/user/GetAllUsersUseCase";
import { RemoveUserUseCase } from "../../application/usecases/user/RemoveUserUseCase";
import { UpdateUserUseCase } from "../../application/usecases/user/UpdateUserUseCase";
import { ChangeRoleUseCase } from "../../application/usecases/user/ChangeRoleUseCase";
import { GetProfileUseCase } from "../../application/usecases/user/GetProfileUseCase";

export class UserController {
  constructor(
    private banUser: BanUserUseCase,
    private getAllUsers: GetAllUsersUseCase,
    private removeUser: RemoveUserUseCase,
    private changeRole: ChangeRoleUseCase,
    private updateUser: UpdateUserUseCase,
    private getProfile: GetProfileUseCase,
  ) {}

  ban = async (req: Request, res: Response) => {
    const result = await this.banUser.execute(req.params.id as string);
    return res.json({ banStatus: result });
  };

  getAll = async (_: Request, res: Response) => {
    const result = await this.getAllUsers.execute();
    return res.json(result);
  };

  remove = async (req: Request, res: Response) => {
    await this.removeUser.execute(req.params.id as string);
    return res.json({ message: "deleted" });
  };

  changeRoleUser = async (req: Request, res: Response) => {
    const result = await this.changeRole.execute(req.params.id as string);
    return res.json(result);
  };

  update = async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const result = await this.updateUser.execute(req.user.id, req.body);
    return res.json(result);
  };

  profile = async (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const result = await this.getProfile.execute(req.user.id);
    return res.json(result);
  };
}
