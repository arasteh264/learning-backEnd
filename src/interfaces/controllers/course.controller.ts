import { Request, Response } from "express";
import { UpdateCourseUseCase } from "../../application/usecases/course/UpdateCourse";
import { CreateCourseUseCase } from "../../application/usecases/course/CreateCourse";
import { DeleteCourseUseCase } from "../../application/usecases/course/DeleteCourse";
import { GetAllCoursesUseCase } from "../../application/usecases/course/GetAllCourses";
import { SearchCourseUseCase } from "../../application/usecases/course/SearchCourse";
import { GetLatestCoursesUseCase } from "../../application/usecases/course/GetLatestCourses";
import { GetPopularFreeCoursesUseCase } from "../../application/usecases/course/GetPopularFreeCourses";
import { GetCourseUseCase } from "../../application/usecases/course/Getcourse";
import { uploadFile } from "../../config/uploadSupabase";
import { ApiResponse } from "../../shared/http/api-response";
import { asyncHandler } from "../../shared/asyncHandler";
import { CourseMessages } from "../../shared/messages/course.messages";

type MulterRequest = Request & {
  file?: Express.Multer.File;
};

export class CourseController {
  constructor(
    private createCourseUseCase: CreateCourseUseCase,
    private updateCourseUseCase: UpdateCourseUseCase,
    private deleteCourseUseCase: DeleteCourseUseCase,
    private getAllCoursesUseCase: GetAllCoursesUseCase,
    private getCourseUseCase: GetCourseUseCase,
    private searchCourseUseCase: SearchCourseUseCase,
    private getLatestCoursesUseCase: GetLatestCoursesUseCase,
    private getPopularFreeCoursesUseCase: GetPopularFreeCoursesUseCase,
  ) {}

  createCourse = asyncHandler(async (req: MulterRequest, res: Response) => {
    const file = req.file;

    if (!file) {
      throw new Error(CourseMessages.COVER_REQUIRED);
    }

    const { url } = await uploadFile(file, "courses", "covers");

    const result = await this.createCourseUseCase.execute({
      ...req.body,
      cover: url,
    });

    return ApiResponse.created(
      res,
      result,
      CourseMessages.CREATED,
    );
  });

  updateCourse = asyncHandler(async (req: MulterRequest, res: Response) => {
    const id = req.params.id;

    const result = await this.updateCourseUseCase.execute(
      id,
      req.body,
      req.file,
    );

    return ApiResponse.success(
      res,
      result,
      CourseMessages.UPDATED,
    );
  });

  deleteCourse = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;

    await this.deleteCourseUseCase.execute(id);

    return ApiResponse.deleted(
      res,
      CourseMessages.DELETED,
    );
  });

  getAllCourses = asyncHandler(async (_req: Request, res: Response) => {
    const courses = await this.getAllCoursesUseCase.execute();

    return ApiResponse.success(
      res,
      courses,
      CourseMessages.FETCHED,
    );
  });

  getCourse = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;

    const course = await this.getCourseUseCase.execute(id);

    return ApiResponse.success(
      res,
      course,
      CourseMessages.FETCHED_ONE,
    );
  });

  searchCourse = asyncHandler(async (req: Request, res: Response) => {
    const query = (req.query.q as string) || "";

    const courses = await this.searchCourseUseCase.execute(query);

    return ApiResponse.success(
      res,
      courses,
      CourseMessages.SEARCHED,
    );
  });

  getLatestCourses = asyncHandler(async (req: Request, res: Response) => {
    const limit = req.query.limit
      ? Number(req.query.limit)
      : 8;

    const courses = await this.getLatestCoursesUseCase.execute(limit);

    return ApiResponse.success(res, courses, CourseMessages.FETCHED);
  });

  getPopularFreeCourses = asyncHandler(async (req: Request, res: Response) => {
    const limit = req.query.limit
      ? Number(req.query.limit)
      : 8;

    const courses = await this.getPopularFreeCoursesUseCase.execute(limit);

    return ApiResponse.success(res, courses, CourseMessages.FETCHED);
  });
}