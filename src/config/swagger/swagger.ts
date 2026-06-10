import swaggerJsdoc from "swagger-jsdoc";
import { baseSwagger } from "./base";

import { authPaths } from "./paths/auth.paths";
import { categoryPaths } from "./paths/category.paths";
import { coursePaths } from "./paths/course.paths";
import { sessionPaths } from "./paths/session.paths";
import { teacherPaths } from "./paths/teacher.paths";
import { announcementPaths } from "./paths/announcement.paths";

import { CategorySchema } from "./schemas/category.schema";
import { CourseSchema } from "./schemas/course.schema";
import { SessionSchema } from "./schemas/session.schema";
import { TeacherSchema } from "./schemas/teacher.schema";
import { AuthLoginBody, AuthRegisterBody } from "./schemas/auth.schema";
import { UserSchema } from "./schemas/user.schema";
import { AnnouncementSchema } from "./schemas/announcement.schema";
import { SliderSchema } from "./schemas/slider.schema";
import { sliderPaths } from "./paths/slider.paths";


const swaggerSpec = swaggerJsdoc({
  definition: {
    ...baseSwagger,

    tags: [
      { name: "Auth" },
      { name: "Users" },
      { name: "Courses" },
      { name: "Sessions" },
      { name: "Teachers" },
      { name: "Categories" },
      { name: "Announcement" },
      { name: "Slider" },
    ],

   components: {
  ...baseSwagger.components,
  schemas: {
    Category: CategorySchema,
    Course: CourseSchema,
    Session: SessionSchema,
    Teacher: TeacherSchema,
    User:UserSchema,
    Slider: SliderSchema,
    Announcement: AnnouncementSchema,
    AuthRegisterBody,
    AuthLoginBody,
  },
},

    paths: {
      ...authPaths,
      ...categoryPaths,
      ...coursePaths,
      ...sessionPaths,
      ...teacherPaths,
      ...announcementPaths,
      ...sliderPaths,
    },
  },
  apis: [],
});

export default swaggerSpec;