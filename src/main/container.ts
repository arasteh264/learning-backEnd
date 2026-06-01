import { UpdateCourseUseCase } from "../application/usecases/course/UpdateCourse";
import { SupabaseStorageService } from "../infrastructure/services/SupabaseStorageService";
import { CourseController } from "../interfaces/controllers/v1/controllers/course.controller";


const courseRepo = new SupabaseCourseRepository();
const storage = new SupabaseStorageService();

const updateCourseUseCase = new UpdateCourseUseCase(
  courseRepo,
  storage
);

export const courseController =
  new CourseController(updateCourseUseCase);