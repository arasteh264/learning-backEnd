// repositories
import { SupabaseCourseRepository } from "../infrastructure/repositories/SupabaseCourseRepository";
import { SupabaseAuthRepository } from "../infrastructure/repositories/SupabaseAuthRepository";
import { SupabaseSessionRepository } from "../infrastructure/repositories/SupabaseSessionRepository";
import { SupabaseCategoryRepository } from "../infrastructure/repositories/SupabaseCategoryRepository";
import { SupabaseUserRepository } from "../infrastructure/repositories/SupabaseUserRepository";
import { SupabaseTeacherRepository } from "../infrastructure/repositories/SupabaseTeacherRepository";
import { SupabaseAnnouncementRepository } from "../infrastructure/repositories/SupabaseAnnouncementRepository";
import { SupabaseSliderRepository } from "../infrastructure/repositories/SupabaseSliderRepository";


//  controllers
import { CourseController } from "../interfaces/controllers/course.controller";
import { AuthController } from "../interfaces/controllers/auth.controller";
import { SessionController } from "../interfaces/controllers/session.controller";
import { CategoryController } from "../interfaces/controllers/category.controller";
import { UserController } from "../interfaces/controllers/user.controller";
import { TeacherController } from "../interfaces/controllers/teacher.controller";
import { AnnouncementController } from "../interfaces/controllers/announcement.controller";
import { SliderController } from "../interfaces/controllers/slider.controller";


// services
import { BcryptPasswordService } from "../infrastructure/services/BcryptPasswordService";
import { JwtTokenService } from "../infrastructure/services/JwtTokenService";
import { SupabaseStorageService } from "../infrastructure/services/SupabaseStorageService";

// useCase
import { CreateCategoryUseCase } from "../application/usecases/category/CreateCategory";
import { GetAllCategoriesUseCase } from "../application/usecases/category/GetAllCategories";
import { UpdateCategoryUseCase } from "../application/usecases/category/UpdateCategory";
import { DeleteCategoryUseCase } from "../application/usecases/category/DeleteCategory";

import { CreateAnnouncementUseCase } from "../application/usecases/announcement/CreateAnnouncement";
import { GetAllAnnouncementUseCase } from "../application/usecases/announcement/GetAllAnnouncement";
import { UpdateAnnouncementUseCase } from "../application/usecases/announcement/UpdateAnnouncement";
import { DeleteAnnouncementUseCase } from "../application/usecases/announcement/DeleteAnnouncement";
import { IsActiveAnnouncementUseCase } from "../application/usecases/announcement/StatueActiveAnnouncement";
import { GetActiveAnnouncementUseCase } from "../application/usecases/announcement/GetActiveAnnouncement";
import { GetAnnouncementByIdUseCase } from "../application/usecases/announcement/GetAnnouncementByIdUseCase";


import { CreateSessionUseCase } from "../application/usecases/session/CreateSession";
import { GetAllSessionsUseCase } from "../application/usecases/session/GetAllSessions";
import { UpdateSessionUseCase } from "../application/usecases/session/UpdateSession";
import { DeleteSessionUseCase } from "../application/usecases/session/DeleteSession";

import { LoginUseCase } from "../application/usecases/auth/LoginUseCase";
import { RegisterUseCase } from "../application/usecases/auth/RegisterUseCase";

import { UpdateCourseUseCase } from "../application/usecases/course/UpdateCourse";
import { DeleteCourseUseCase } from "../application/usecases/course/DeleteCourse";
import { CreateCourseUseCase } from "../application/usecases/course/CreateCourse";
import { GetAllCoursesUseCase } from "../application/usecases/course/GetAllCourses";
import { RemoveUserUseCase } from "../application/usecases/user/RemoveUserUseCase";
import { GetProfileUseCase } from "../application/usecases/user/GetProfileUseCase";
import { UpdateUserUseCase } from "../application/usecases/user/UpdateUserUseCase";
import { ChangeRoleUseCase } from "../application/usecases/user/ChangeRoleUseCase";
import { GetAllUsersUseCase } from "../application/usecases/user/GetAllUsersUseCase";
import { BanUserUseCase } from "../application/usecases/user/BanUserUseCase";
import { CreateTeacherUseCase } from "../application/usecases/teacher/CreateTeacher";
import { GetVerifiedTeachersUseCase } from "../application/usecases/teacher/GetVerifiedTeachers";
import { RemoveTeacherUseCase } from "../application/usecases/teacher/RemoveTeacher";
import { VerifyTeacherUseCase } from "../application/usecases/teacher/VerifyTeacher";
import { RequestForTeacherUseCase } from "../application/usecases/teacher/RequestForTeacher";
import { GetAllTeachersUseCase } from "../application/usecases/teacher/GetAllTeachers";
import { DeleteSliderUseCase } from "../application/usecases/slider/DeleteSlider";
import { UpdateSliderUseCase } from "../application/usecases/slider/UpdateSlider";
import { GetSliderByIdUseCase } from "../application/usecases/slider/GetSliderById";
import { GetAllSlidersUseCase } from "../application/usecases/slider/GetAllSliders";
import { CreateSliderUseCase } from "../application/usecases/slider/CreateSlider";

// repositories
const courseRepo = new SupabaseCourseRepository();
const authRepo = new SupabaseAuthRepository();
const sessionRepo = new SupabaseSessionRepository();
const categoryRepo = new SupabaseCategoryRepository();
const userRepo = new SupabaseUserRepository();
const teacherRepo = new SupabaseTeacherRepository();
const announcementRepo = new SupabaseAnnouncementRepository();
const sliderRepo = new SupabaseSliderRepository();

// services
const storage = new SupabaseStorageService();
const passwordService = new BcryptPasswordService();
const tokenService = new JwtTokenService();

// course usecases

//usecases
const loginUseCase = new LoginUseCase(authRepo, passwordService, tokenService);
const registerUseCase = new RegisterUseCase(
  authRepo,
  passwordService,
  tokenService,
);

const createCategoryUseCase = new CreateCategoryUseCase(categoryRepo);
const getAllCategoriesUseCase = new GetAllCategoriesUseCase(categoryRepo);
const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepo);
const deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepo);

const createAnnouncementUseCase = new CreateAnnouncementUseCase(
  announcementRepo,
);
const getAllAnnouncementUseCase = new GetAllAnnouncementUseCase(
  announcementRepo,
);
const updateAnnouncementUseCase = new UpdateAnnouncementUseCase(
  announcementRepo,
);
const deleteAnnouncementUseCase = new DeleteAnnouncementUseCase(
  announcementRepo,
);
const isActiveAnnouncementUseCase = new IsActiveAnnouncementUseCase(
  announcementRepo,
);
const getActiveAnnouncementUseCase = new GetActiveAnnouncementUseCase(
  announcementRepo
);
const getAnnouncementByIdUseCase  = new GetAnnouncementByIdUseCase (
  announcementRepo
);


const createSliderUseCase = new CreateSliderUseCase(sliderRepo);
const getAllSlidersUseCase = new GetAllSlidersUseCase(sliderRepo);
const getSliderByIdUseCase = new GetSliderByIdUseCase(sliderRepo);
const updateSliderUseCase = new UpdateSliderUseCase(sliderRepo);
const deleteSliderUseCase = new DeleteSliderUseCase(sliderRepo);

const createSession = new CreateSessionUseCase(sessionRepo, storage);
const getAllSessions = new GetAllSessionsUseCase(sessionRepo);
const updateSession = new UpdateSessionUseCase(sessionRepo, storage);
const deleteSession = new DeleteSessionUseCase(sessionRepo, storage);

const banUserUseCase = new BanUserUseCase(userRepo);
const getAllUsersUseCase = new GetAllUsersUseCase(userRepo);
const removeUserUseCase = new RemoveUserUseCase(userRepo);
const changeRoleUseCase = new ChangeRoleUseCase(userRepo);
const updateUserUseCase = new UpdateUserUseCase(userRepo);
const getProfileUseCase = new GetProfileUseCase(userRepo);

const createCourseUseCase = new CreateCourseUseCase(courseRepo, storage);
const updateCourseUseCase = new UpdateCourseUseCase(courseRepo, storage);
const getAllCoursesUseCase = new GetAllCoursesUseCase(courseRepo);
const deleteCourseUseCase = new DeleteCourseUseCase(
  courseRepo,
  sessionRepo,
  storage,
);

const createTeacherUseCase = new CreateTeacherUseCase(teacherRepo);
const getVerifiedTeachersUseCase = new GetVerifiedTeachersUseCase(teacherRepo);
const removeTeacherUseCase = new RemoveTeacherUseCase(teacherRepo);
const verifyTeacherUseCase = new VerifyTeacherUseCase(teacherRepo);
const requestForTeacherUseCase = new RequestForTeacherUseCase(teacherRepo);
const getAllTeachersUseCase = new GetAllTeachersUseCase(teacherRepo);

// controllers
export const courseController = new CourseController(
  createCourseUseCase,
  updateCourseUseCase,
  deleteCourseUseCase,
  getAllCoursesUseCase,
);

export const categoryController = new CategoryController(
  createCategoryUseCase,
  getAllCategoriesUseCase,
  updateCategoryUseCase,
  deleteCategoryUseCase,
);

export const sessionController = new SessionController(
  createSession,
  getAllSessions,
  updateSession,
  deleteSession,
);

export const authController = new AuthController(registerUseCase, loginUseCase);

export const userController = new UserController(
  banUserUseCase,
  getAllUsersUseCase,
  removeUserUseCase,
  changeRoleUseCase,
  updateUserUseCase,
  getProfileUseCase,
);

export const teacherController = new TeacherController(
  createTeacherUseCase,
  getAllTeachersUseCase,
  requestForTeacherUseCase,
  verifyTeacherUseCase,
  removeTeacherUseCase,
  getVerifiedTeachersUseCase,
);

export const announcementController = new AnnouncementController(
  createAnnouncementUseCase,
  getAllAnnouncementUseCase,
  updateAnnouncementUseCase,
  deleteAnnouncementUseCase,
  isActiveAnnouncementUseCase,
  getActiveAnnouncementUseCase,
  getAnnouncementByIdUseCase 
);
export const sliderController = new SliderController(
  createSliderUseCase,
  getAllSlidersUseCase,
  getSliderByIdUseCase,
  updateSliderUseCase,
  deleteSliderUseCase,
);