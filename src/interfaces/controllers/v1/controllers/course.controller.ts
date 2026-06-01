import { Request, Response } from "express";
import { UpdateCourseUseCase } from "../../../../application/usecases/course/UpdateCourse";


export class CourseController {

  constructor(
    private updateCourseUseCase: UpdateCourseUseCase
  ) {}

  updateCourse = async (req: Request, res: Response) => {
    try {

      const result =
        await this.updateCourseUseCase.execute(
          req.params.id as string,
          req.body,
          req.file as Express.Multer.File
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
}