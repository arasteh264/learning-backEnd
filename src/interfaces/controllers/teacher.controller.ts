import { Request, Response } from "express";
import { CreateTeacherUseCase } from "../../application/usecases/teacher/CreateTeacher";
import { GetAllTeachersUseCase } from "../../application/usecases/teacher/GetAllTeachers";
import { RequestForTeacherUseCase } from "../../application/usecases/teacher/RequestForTeacher";
import { VerifyTeacherUseCase } from "../../application/usecases/teacher/VerifyTeacher";
import { RemoveTeacherUseCase } from "../../application/usecases/teacher/RemoveTeacher";
import { GetVerifiedTeachersUseCase } from "../../application/usecases/teacher/GetVerifiedTeachers";
export class TeacherController {
  constructor(
    private createTeacherUC: CreateTeacherUseCase,
    private getAllTeachersUC: GetAllTeachersUseCase,
    private requestTeacherUC: RequestForTeacherUseCase,
    private verifyTeacherUC: VerifyTeacherUseCase,
    private removeTeacherUC: RemoveTeacherUseCase,
    private getVerifiedTeachersUC: GetVerifiedTeachersUseCase,
  ) {}

  create = async (req: Request, res: Response) => {
    try {
      const { userId, bio, expertise } = req.body;

      const result = await this.createTeacherUC.execute(userId, bio, expertise);

      return res.status(201).json({
        message: "استاد ساخته شد",
        teacher: result,
      });
    } catch (e: any) {
      return res.status(400).json({ message: e.message });
    }
  };

  getAll = async (_: Request, res: Response) => {
    const result = await this.getAllTeachersUC.execute();
    return res.json(result);
  };

  request = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const result = await this.requestTeacherUC.execute(
        req.user.id,
        req.body.bio,
        req.body.expertise,
      );

      return res.json({
        message: "درخواست ثبت شد",
        data: result,
      });
    } catch (e: any) {
      return res.status(400).json({ message: e.message });
    }
  };

  verify = async (req: Request, res: Response) => {
    const result = await this.verifyTeacherUC.execute(req.params.id as string);
    return res.json({ message: "تایید شد", data: result });
  };

  remove = async (req: Request, res: Response) => {
    await this.removeTeacherUC.execute(req.params.id as string);
    return res.json({ message: "حذف شد" });
  };

  getVerified = async (_: Request, res: Response) => {
    const result = await this.getVerifiedTeachersUC.execute();
    return res.json({
      success: true,
      data: result,
    });
  };
}
