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
import { SearchCourseUseCase } from "../application/usecases/course/SearchCourse";
import { GetLatestCoursesUseCase } from "../application/usecases/course/GetLatestCourses";
import { SupabaseArticleRepository } from "../infrastructure/repositories/SupabaseArticleRepository";
import { DeleteArticleUseCase } from "../application/usecases/article/DeleteArticle";
import { UpdateArticleUseCase } from "../application/usecases/article/UpdateArticle";
import { GetArticleBySlugUseCase } from "../application/usecases/article/GetArticleBySlug";
import { GetAllArticlesUseCase } from "../application/usecases/article/GetAllArticles";
import { CreateArticleUseCase } from "../application/usecases/article/CreateArticle";
import { ArticleController } from "../interfaces/controllers/article.controller";
import { GetPopularFreeCoursesUseCase } from "../application/usecases/course/GetPopularFreeCourses";
import { SupabaseCartRepository } from "../infrastructure/repositories/SupabaseCartRepository";
import { GetCartUseCase } from "../application/usecases/cart/GetCart";
import { AddToCartUseCase } from "../application/usecases/cart/AddToCart";
import { RemoveFromCartUseCase } from "../application/usecases/cart/RemoveFromCart";
import { SupabaseOrderRepository } from "../infrastructure/repositories/SupabaseOrderRepository";
import { SupabaseTransactionRepository } from "../infrastructure/repositories/SupabaseTransactionRepository";
import { SupabaseEnrollmentRepository } from "../infrastructure/repositories/SupabaseEnrollmentRepository";
import { ZarinpalGateway } from "../infrastructure/services/ZarinpalGateway";
import { CreateOrderUseCase } from "../application/usecases/Order/CreateOrderUseCase";
import { RequestPaymentUseCase } from "../application/usecases/payment/RequestPaymentUseCase";
import { VerifyPaymentUseCase } from "../application/usecases/payment/VerifyPaymentUseCase";
import { OrderController } from "../interfaces/controllers/order.controller";
import { PaymentController } from "../interfaces/controllers/payment.controller";
import { CartController } from "../interfaces/controllers/cart.controller";
import { GetOrderUseCase } from "../application/usecases/Order/GetOrder";
import { GetAllTransactionsUseCase } from "../application/usecases/payment/GetAllTransactions";
import { GetCourseUseCase } from "../application/usecases/course/Getcourse";
import { GetSessionsByCourseUseCase } from "../application/usecases/session/Getsessionsbycourse";
import { GetSessionByIdUseCase } from "../application/usecases/session/Getsessionbyid";

// repositories
const courseRepo = new SupabaseCourseRepository();
const authRepo = new SupabaseAuthRepository();
const sessionRepo = new SupabaseSessionRepository();
const categoryRepo = new SupabaseCategoryRepository();
const userRepo = new SupabaseUserRepository();
const teacherRepo = new SupabaseTeacherRepository();
const announcementRepo = new SupabaseAnnouncementRepository();
const sliderRepo = new SupabaseSliderRepository();
const articleRepo = new SupabaseArticleRepository();
const cartRepo = new SupabaseCartRepository();
const orderRepo = new SupabaseOrderRepository();
const transactionRepo = new SupabaseTransactionRepository();
const enrollmentRepo = new SupabaseEnrollmentRepository();
const paymentGateway = new ZarinpalGateway();

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

const createOrderUseCase = new CreateOrderUseCase(cartRepo, orderRepo);
const getOrderUseCase = new GetOrderUseCase(orderRepo);
const requestPaymentUseCase = new RequestPaymentUseCase(
  orderRepo,
  transactionRepo,
  paymentGateway,
);
const verifyPaymentUseCase = new VerifyPaymentUseCase(
  orderRepo,
  transactionRepo,
  enrollmentRepo,
  paymentGateway,
);
const getAllTransactionsUseCase = new GetAllTransactionsUseCase(
  transactionRepo,
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
  announcementRepo,
);
const getAnnouncementByIdUseCase = new GetAnnouncementByIdUseCase(
  announcementRepo,
);

const createSliderUseCase = new CreateSliderUseCase(sliderRepo);
const getAllSlidersUseCase = new GetAllSlidersUseCase(sliderRepo);
const getSliderByIdUseCase = new GetSliderByIdUseCase(sliderRepo);
const updateSliderUseCase = new UpdateSliderUseCase(sliderRepo);
const deleteSliderUseCase = new DeleteSliderUseCase(sliderRepo);

const createSessionUseCase = new CreateSessionUseCase(sessionRepo, storage);
const getSessionByIdUseCase = new GetSessionByIdUseCase(sessionRepo);
const getAllSessionsUseCase = new GetAllSessionsUseCase(sessionRepo);
const getSessionsByCourseUseCase = new GetSessionsByCourseUseCase(sessionRepo);
const updateSessionUseCase = new UpdateSessionUseCase(sessionRepo, storage);
const deleteSessionUseCase = new DeleteSessionUseCase(sessionRepo, storage);

const banUserUseCase = new BanUserUseCase(userRepo);
const getAllUsersUseCase = new GetAllUsersUseCase(userRepo);
const removeUserUseCase = new RemoveUserUseCase(userRepo);
const changeRoleUseCase = new ChangeRoleUseCase(userRepo);
const updateUserUseCase = new UpdateUserUseCase(userRepo);
const getProfileUseCase = new GetProfileUseCase(userRepo);

const createArticleUseCase = new CreateArticleUseCase(articleRepo);
const getAllArticlesUseCase = new GetAllArticlesUseCase(articleRepo);
const getArticleBySlugUseCase = new GetArticleBySlugUseCase(articleRepo);
const updateArticleUseCase = new UpdateArticleUseCase(articleRepo);
const deleteArticleUseCase = new DeleteArticleUseCase(articleRepo);

const createCourseUseCase = new CreateCourseUseCase(courseRepo);
const updateCourseUseCase = new UpdateCourseUseCase(courseRepo);
const getAllCoursesUseCase = new GetAllCoursesUseCase(courseRepo);

const deleteCourseUseCase = new DeleteCourseUseCase(
  courseRepo,
  sessionRepo,
  storage,
);
const getCourseUseCase = new GetCourseUseCase(courseRepo);
const searchCourseUseCase = new SearchCourseUseCase(courseRepo);
const getLatestCoursesUseCase = new GetLatestCoursesUseCase(courseRepo);
const getPopularFreeCoursesUseCase = new GetPopularFreeCoursesUseCase(
  courseRepo,
);

const createTeacherUseCase = new CreateTeacherUseCase(teacherRepo);
const getVerifiedTeachersUseCase = new GetVerifiedTeachersUseCase(teacherRepo);
const removeTeacherUseCase = new RemoveTeacherUseCase(teacherRepo);
const verifyTeacherUseCase = new VerifyTeacherUseCase(teacherRepo);
const requestForTeacherUseCase = new RequestForTeacherUseCase(teacherRepo);
const getAllTeachersUseCase = new GetAllTeachersUseCase(teacherRepo);

const getCartUseCase = new GetCartUseCase(cartRepo);
const addToCartUseCase = new AddToCartUseCase(cartRepo, courseRepo);
const removeFromCartUseCase = new RemoveFromCartUseCase(cartRepo);

// controllers
export const courseController = new CourseController(
  createCourseUseCase,
  updateCourseUseCase,
  deleteCourseUseCase,
  getAllCoursesUseCase,
  getCourseUseCase,
  searchCourseUseCase,
  getLatestCoursesUseCase,
  getPopularFreeCoursesUseCase,
);

export const categoryController = new CategoryController(
  createCategoryUseCase,
  getAllCategoriesUseCase,
  updateCategoryUseCase,
  deleteCategoryUseCase,
);

export const sessionController = new SessionController(
  createSessionUseCase,
  getAllSessionsUseCase,
  getSessionByIdUseCase,   
  getSessionsByCourseUseCase,
  updateSessionUseCase,
  deleteSessionUseCase,
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
  getAnnouncementByIdUseCase,
);
export const sliderController = new SliderController(
  createSliderUseCase,
  getAllSlidersUseCase,
  getSliderByIdUseCase,
  updateSliderUseCase,
  deleteSliderUseCase,
);
export const articleController = new ArticleController(
  createArticleUseCase,
  getAllArticlesUseCase,
  getArticleBySlugUseCase,
  updateArticleUseCase,
  deleteArticleUseCase,
  getArticleBySlugUseCase,
);
export const cartController = new CartController(
  getCartUseCase,
  addToCartUseCase,
  removeFromCartUseCase,
);
export const orderController = new OrderController(
  createOrderUseCase,
  getOrderUseCase,
);
export const paymentController = new PaymentController(
  requestPaymentUseCase,
  verifyPaymentUseCase,
  getAllTransactionsUseCase,
);
