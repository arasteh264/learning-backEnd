import { Request, Response } from "express";
import { CreateSessionUseCase } from "../../../application/usecases/session/CreateSession";
import { GetAllSessionsUseCase } from "../../../application/usecases/session/GetAllSessions";
import { DeleteSessionUseCase } from "../../../application/usecases/session/DeleteSession";
import { UpdateSessionUseCase } from "../../../application/usecases/session/UpdateSession";
export class SessionController {
  constructor(
    private createSession: CreateSessionUseCase,
    private getAllSessions: GetAllSessionsUseCase,
    private updateSession: UpdateSessionUseCase,
    private deleteSession: DeleteSessionUseCase,
  ) {}

  create = async (req: Request, res: Response) => {
    try {
      const result = await this.createSession.execute(
        req.body,
        req.file,
        req.params.id as string,
      );

      return res.status(201).json(result);
    } catch (e: any) {
      return res.status(400).json({ message: e.message });
    }
  };

  getAll = async (_: Request, res: Response) => {
    const result = await this.getAllSessions.execute();
    return res.json(result);
  };

  update = async (req: Request, res: Response) => {
    try {
      const result = await this.updateSession.execute(
        req.params.id as string,
        req.body,
        req.file,
      );

      return res.json(result);
    } catch (e: any) {
      return res.status(400).json({ message: e.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      await this.deleteSession.execute(req.params.id as string);
      return res.json({ message: "deleted" });
    } catch (e: any) {
      return res.status(400).json({ message: e.message });
    }
  };
}
