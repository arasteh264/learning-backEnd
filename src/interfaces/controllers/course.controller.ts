import { Request, Response } from "express";
import { UpdateCourseUseCase } from "../../../application/usecases/course/UpdateCourse";
import { CreateCourseUseCase } from "../../../application/usecases/course/CreateCourse";
import { DeleteCourseUseCase } from "../../../application/usecases/course/DeleteCourse";
import { GetAllCoursesUseCase } from "../../../application/usecases/course/GetAllCourses";

export class CourseController {
  constructor(
    private createCourseUseCase: CreateCourseUseCase,
    private updateCourseUseCase: UpdateCourseUseCase,
    private deleteCourseUseCase: DeleteCourseUseCase,
    private getAllCoursesUseCase: GetAllCoursesUseCase,
  ) {}

  updateCourse = async (req: Request, res: Response) => {
    try {
      const result = await this.updateCourseUseCase.execute(
        req.params.id as string,
        req.body,
        req.file as Express.Multer.File,
      );

      return res.status(200).json({
        message: "دوره با موفقیت ویرایش شد",
        course: result,
      });
    } catch (err: any) {
      return res.status(400).json({
        message: err.message,
      });
    }
  };

  createCourse = async (req: Request, res: Response) => {
    try {
      const result = await this.createCourseUseCase.execute(
        req.body,
        req.file as Express.Multer.File,
      );

      return res.status(201).json({
        message: "دوره با موفقیت افزوده شد",
        course: result,
      });
    } catch (err: any) {
      return res.status(400).json({
        message: err.message,
      });
    }
  };

  deleteCourse = async (req: Request, res: Response) => {
    try {
      await this.deleteCourseUseCase.execute(req.params.id as string);

      return res.status(200).json({
        message: "دوره و تمام جلسات با موفقیت حذف شد",
      });
    } catch (err: any) {
      return res.status(400).json({
        message: err.message,
      });
    }
  };

  getAllCourses = async (req: Request, res: Response) => {
    try {
      const courses = await this.getAllCoursesUseCase.execute();

      return res.status(200).json(courses);
    } catch (err: any) {
      return res.status(500).json({
        message: err.message,
      });
    }
  };
}
