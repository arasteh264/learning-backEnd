import { Request, Response } from "express";
import { GetAllSessionsUseCase } from "../../application/usecases/session/GetAllSessions";
import { GetSessionsByCourseUseCase } from "../../application/usecases/session/Getsessionsbycourse";
import { DeleteSessionUseCase } from "../../application/usecases/session/DeleteSession";
import { UpdateSessionUseCase } from "../../application/usecases/session/UpdateSession";
import { CreateSessionUseCase } from "../../application/usecases/session/CreateSession";
import { GetSessionByIdUseCase } from "../../application/usecases/session/Getsessionbyid";

type MulterRequest = Request & {
  file?: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination: string;
    filename: string;
    path: string;
    buffer: Buffer;
  };
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

  create = async (req: MulterRequest, res: Response) => {
    try {
      const result = await this.createSession.execute(
        req.body,
        req.file,
        req.params.courseId as string,
      );
      return res.status(201).json(result);
    } catch (e: any) {
      console.error("[SessionController.create]", e);
      return res.status(400).json({
        message: e?.message || "خطای ناشناخته",
        detail: e?.details || e?.hint || undefined,
      });
    }
  };

  getAll = async (_: Request, res: Response) => {
    try {
      const result = await this.getAllSessions.execute();
      return res.json(result);
    } catch (e: any) {
      return res.status(500).json({ message: e.message });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const result = await this.getSessionById.execute(req.params.id as string);
      return res.json(result);
    } catch (e: any) {
      const status = e.message === "جلسه یافت نشد" ? 404 : 400;
      return res.status(status).json({ message: e.message });
    }
  };

  getByCourse = async (req: Request, res: Response) => {
    try {
      const result = await this.getSessionsByCourse.execute(
        req.params.courseId as string,
      );
      return res.json({ data: result });
    } catch (e: any) {
      return res.status(400).json({ message: e.message });
    }
  };

  update = async (req: MulterRequest, res: Response) => {
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