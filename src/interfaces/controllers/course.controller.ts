import { Request, Response } from "express";
import { UpdateCourseUseCase } from "../../application/usecases/course/UpdateCourse";
import { CreateCourseUseCase } from "../../application/usecases/course/CreateCourse";
import { DeleteCourseUseCase } from "../../application/usecases/course/DeleteCourse";
import { GetAllCoursesUseCase } from "../../application/usecases/course/GetAllCourses";
import { SearchCourseUseCase } from "../../application/usecases/course/SearchCourse";
import { uploadFile } from "../../config/uploadSupabase";
import { GetLatestCoursesUseCase } from "../../application/usecases/course/GetLatestCourses";
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
export class CourseController {
  constructor(
    private createCourseUseCase: CreateCourseUseCase,
    private updateCourseUseCase: UpdateCourseUseCase,
    private deleteCourseUseCase: DeleteCourseUseCase,
    private getAllCoursesUseCase: GetAllCoursesUseCase,
    private searchCourseUseCase: SearchCourseUseCase,
    private getLatestCoursesUseCase: GetLatestCoursesUseCase,
  ) {}

  updateCourse = async (req: MulterRequest, res: Response) => {
    try {
      const result = await this.updateCourseUseCase.execute(
        req.params.id as string,
        req.body,
        req.file,
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

createCourse = async (req: MulterRequest, res: Response) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: "عکس کاور الزامی است" });

    const { url } = await uploadFile(file, "courses", "covers");

    const result = await this.createCourseUseCase.execute({
      ...req.body,
      cover: url,
    });

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
  searchCourse = async (req: Request, res: Response) => {
    try {
      const query = (req.query.q as string) || "";

      const courses = await this.searchCourseUseCase.execute(query);

      return res.status(200).json(courses);
    } catch (err: any) {
      return res.status(500).json({
        message: err.message,
      });
    }
  };
  getLatestCourses = async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit ? Number(req.query.limit) : 8;

      const courses = await this.getLatestCoursesUseCase.execute(limit);

      return res.status(200).json(courses);
    } catch (err: any) {
      return res.status(500).json({
        message: err.message,
      });
    }
  };
}
